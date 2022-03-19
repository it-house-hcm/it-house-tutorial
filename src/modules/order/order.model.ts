import { Document, Schema } from "mongoose";
import { BaseDocument } from "../../base/baseModel";
import { Mongo } from "../../helpers/mongo";
import { getModelDataLoader } from "../../helpers/dataloader";
import { OrderItem, OrderItemSchema } from "./orderItem.graphql";

export enum OrderStatus {
  PENDING = "PENDING", // Chờ xử lý
  PROCESSING = "PROCESSING", // Đang xử lý
  SHIPPING = "SHIPPING", // Đang vận chuyển
  DELIVDED = "DELIVDED", // Đã giao hàng
  CANCELED = "CANCELED", // Đã hủy
}

export type Order = BaseDocument & {
  code?: string; // Mã đơn hàng
  buyerId?: string; // ID người mua
  buyerName?: string; // Tên người mua
  buyerPhone?: string; // Số điện thoại người mua
  buyerAddress?: string; // Địa chỉ người mua
  buyerLocation?: any; // Vị trí người mua
  subtotal?: number; // Tổng tiền
  discount?: number; // Giảm giá
  shipfee?: number; // Phí vận chuyển
  amount?: number; // Tổng tiền
  status?: OrderStatus; // Trạng thái
  promotionName?: string; // Tên khuyến mãi
  promotionId?: string; // ID khuyến mãi
  promotionCode?: string; // Mã khuyến mãi
  rewardPoint?: number; // Điểm thưởng
  useRewardPoint?: boolean; // Sử dụng điểm thưởng
  rewardPointDiscount?: number; // Giảm giá điểm thưởng
  items?: OrderItem[]; // Sản phẩm
};

const orderSchema = new Schema(
  {
    code: { type: String, required: true },
    buyerId: { type: Schema.Types.ObjectId, required: true },
    buyerName: { type: String, required: true },
    buyerPhone: { type: String, required: true },
    buyerAddress: { type: String, required: true },
    buyerLocation: { type: Schema.Types.Mixed, required: true },
    subtotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    shipfee: { type: Number, default: 0 },
    amount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      default: OrderStatus.PENDING,
    },
    promotionName: { type: String },
    promotionId: { type: Schema.Types.ObjectId },
    promotionCode: { type: String },
    rewardPoint: { type: Number, default: 0 },
    useRewardPoint: { type: Boolean, default: false },
    rewardPointDiscount: { type: Number, default: 0 },
    items: { type: [OrderItemSchema], default: [] },
  },
  { timestamps: true }
);

orderSchema.index({ code: 1 }, { unique: true });
orderSchema.index({ code: "text" }, { weights: { code: 10 } });

export const OrderModel = Mongo.model<Order>("Order", orderSchema);

export const OrderLoader = getModelDataLoader(OrderModel);
