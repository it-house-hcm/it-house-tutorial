import _ from "lodash";
import { Context } from "../../helpers/graphql/context";
import { GraphqlResolver } from "../../helpers/graphql/resolver";
import { UserLoader } from "../user/user.model";
import { OrderModel, OrderStatus } from "./order.model";
import { orderService } from "./order.service";
import Ajv from "ajv";
import { ProductLoader } from "../product/product.model";
import { OrderItem } from "./orderItem.graphql";
import { OrderItemAttribute } from "./orderItemAttribute.graphql";
import { BranchLoader } from "./branch/branch.model";
import { nanoid } from "nanoid";
import { getDistance } from "../../helpers/functions/location";

export default {
  Query: {
    getAllOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN", "USER"]);
      const { q } = args;
      if (!context.isAdmin) {
        _.set(args, "q.filter.buyerId", context.userId);
      }
      return await orderService.fetch(q);
    },
    getOneOrder: async (root: any, args: any, context: any) => {
      const { id } = args;

      return orderService.findById(id);
    },
  },
  Mutation: {
    createOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN", "USER"]);
      const { data } = args;

      let buyerId = data.buyerId;
      if (!context.isAdmin) {
        buyerId = context.userId;
      }

      // check buyer user is exist
      const user = await UserLoader.load(buyerId);
      if (!user) {
        throw new Error("Không tìm thấy người mua");
      }

      const orderItems: OrderItem[] = await getOrderItems(data);

      // check branch is exist
      var { branch, distance } = await getBranchAndCalculateDistance(data);

      // calculate shipfee
      const shipfee = Math.round(branch.shipfeePerKm! * distance);

      // TODO: calculate discount
      const discount = 0;
      const rewardPointDiscount = 0;

      // TODO: calculate reward point
      const rewardPoint = 0;

      // calculate total amount
      const subtotal = _.sumBy(orderItems, "amount");
      const total = subtotal + shipfee;
      const amount = total - discount;

      // create order
      const order = await orderService.create({
        code: nanoid(),
        buyerId: buyerId,
        buyerName: data.buyerName,
        buyerPhone: data.buyerPhone,
        buyerAddress: data.buyerAddress,
        buyerLocation: data.buyerLocation,
        subtotal: subtotal,
        discount: discount,
        shipfee: shipfee,
        amount: amount,
        status: OrderStatus.PENDING,
        promotionCode: data.promotionCode,
        rewardPoint: rewardPoint,
        useRewardPoint: data.useRewardPoint,
        rewardPointDiscount: rewardPointDiscount,
        items: orderItems,
        branchId: branch._id,
      });

      // TODO: send notification to branch

      // TODO: send notification to buyer

      return order;
    },
    updateOrder: async (root: any, args: any, context: Context) => {
      context.auth(["ADMIN"]);
      const { id, data } = args;
      return await orderService.update(id, data);
    },
    deleteOrder: async (root: any, args: any, context: any) => {
      context.auth(["ADMIN"]);
      const { id } = args;
      return await orderService.delete(id);
    },
  },
  Order: {
    buyer: GraphqlResolver.load(UserLoader, "buyerId"),
    branch: GraphqlResolver.load(BranchLoader, "branchId"),
  },
};

async function getBranchAndCalculateDistance(data: any) {
  let distance = 0;
  const branch = await BranchLoader.load(data.branchId);
  if (!branch) {
    throw new Error("Không tìm thấy chi nhánh");
  }
  // check branch is active
  if (!branch.active) {
    throw new Error("Chi nhánh không hoạt động");
  }
  // check distance is valid
  // calculate distance between buyer and branch
  if (!branch.place) {
    throw new Error("Chi nhánh không có địa chỉ");
  }

  const branchLat = branch.place.location.coordinates[1];
  const branchLng = branch.place.location.coordinates[0];
  const buyerLat = data.buyerLocation.coordinates[1];
  const buyerLng = data.buyerLocation.coordinates[0];
  distance = getDistance(branchLng, branchLat, buyerLng, buyerLat);

  // if distance is greater 10km, throw error
  if (distance > 10) {
    throw new Error("Khoảng cách quá xa");
  }
  return { branch, distance };
}

async function getOrderItems(data: any) {
  const orderItems: OrderItem[] = [];
  const items = data.items;
  // check items is empty
  if (!items || items.length === 0) {
    throw new Error("Không có sản phẩm");
  }
  // get all product from items
  const productIds = items.map((item: any) => item.productId);
  const products = await ProductLoader.loadMany(productIds);
  const productMap = _.keyBy(products, "_id");
  for (const item of items) {
    const product = productMap[item.productId];
    if (!product || product instanceof Error) {
      throw new Error("Không tìm thấy sản phẩm");
    }
    const orderItem: OrderItem = {
      productId: item.productId,
      productName: product.name,
      productImage: product.images ? product.images[0] : "",
      productPrice: product.basePrice,
      productSellPrice: product.sellPrice,
      qty: item.quantity,
      amount: 0,
      attrAmount: 0,
      attrs: [],
    };

    if (item.attrs.length > 0) {
      const productAttrsMap = _.keyBy(product.attributes, "name");
      const orderItemAttrs: OrderItemAttribute[] = [];
      let attrAmount = 0;
      for (const attr of item.attrs) {
        // check attr is exist
        const productAttr = productAttrsMap[attr.attrName];
        if (!productAttr) {
          throw new Error("Không tìm thấy thuộc tính");
        }
        // check attr option by attrOptionName
        const productAttrOption = productAttr.options.find(
          (o) => o.name === attr.attrOptionName
        );
        if (!productAttrOption) {
          throw new Error("Không tìm thấy thuộc tính");
        }
        attrAmount += productAttrOption.price!;
        orderItemAttrs.push({
          attrId: productAttr._id,
          attrName: productAttr.name,
          attrOptionName: productAttrOption.name,
          attrOptionPrice: productAttrOption.price!,
        });
      }

      orderItem.attrs = orderItemAttrs;
      orderItem.attrAmount = attrAmount;
    }

    // calculate orderItem amount
    orderItem.amount =
      (orderItem.productSellPrice! + orderItem.attrAmount!) * orderItem.qty!;

    orderItems.push(orderItem);
  }
  return orderItems;
}
