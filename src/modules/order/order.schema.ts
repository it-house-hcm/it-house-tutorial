import { gql } from "apollo-server-express";
import { OrderStatus } from "./order.model";

export default gql`
    
    extend type Query {
        getAllOrder(q: QueryInput): OrderPageData
        getOneOrder(id: ID!): Order
    }
    extend type Mutation {
        createOrder(data: CreateOrderInput!): Order
        updateOrder(id: ID!, data: UpdateOrderInput!): Order
        deleteOrder(id: ID!): Boolean
    }
    type OrderPageData {
        data: [Order]
        pagination: Pagination
    }
    type Order {
        id: ID!
        createdAt: DateTime
        updatedAt: DateTime

        "Mã đơn hàng"
        code: String
        "ID người mua"
        buyerId: ID
        "Tên người mua"
        buyerName: String
        "Số điện thoại người mua"
        buyerPhone: String
        "Địa chỉ người mua"
        buyerAddress: String
        "Vị trí người mua"
        buyerLocation: Mixed
        "Tổng tiền"
        subtotal: Float
        "Giảm giá"
        discount: Float
        "Phí vận chuyển"
        shipfee: Float
        "Tổng tiền"
        amount: Float
        "Trạng thái ${Object.values(OrderStatus)}"
        status: String
        "Tên khuyến mãi"
        promotionName: String
        "ID khuyến mãi"
        promotionId: ID
        "Mã khuyến mãi"
        promotionCode: String
        "Điểm thưởng"
        rewardPoint: Float
        "Sử dụng điểm thưởng"
        useRewardPoint: Boolean
        "Giảm giá điểm thưởng"
        rewardPointDiscount: Float
        "Sản phẩm"
        items: [OrderItem]

        "Người mua"
        buyer: User
    }

    input CreateOrderInput {
        
    }

    input UpdateOrderInput {
        
    }

`;
