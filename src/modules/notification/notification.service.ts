import { CrudService } from "../../base/crudService";
import { Notification, NotificationModel } from "./notification.model";

class NotificationService extends CrudService<Notification> {
  constructor() {
    super(NotificationModel);
  }
}

export const notificationService = new NotificationService();
