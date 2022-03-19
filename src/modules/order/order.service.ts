import { CrudService } from "../../base/crudService";
import { Order, OrderModel } from "./order.model";

class OrderService extends CrudService<Order> {
  constructor() {
    super(OrderModel);
  }
}

export const orderService = new OrderService();
