import Express from "express";
import {
  getAllNotification,
  getNotificationByUser,
  updateNotification,
} from "../controllers/notification.controllers";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controllers";

const notificationRouter = Express.Router();

notificationRouter.get(
  "/getAllNotification",
  isAutheticated,
  updateAccessToken,
  getAllNotification
);

notificationRouter.get(
  "/getNofificationByUser/:userId",
  isAutheticated,
  updateAccessToken,
  getNotificationByUser
);

notificationRouter.put(
  "/updateNotification/:notificationId",
  isAutheticated,
  updateAccessToken,
  updateNotification
);
export default notificationRouter;
