import express from "express";
import {
  createOrder,
  getAllOrdersByAdmin,
  getOrderByUser,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/orders.controllers";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controllers";
const orderRouter = express.Router();

orderRouter.post(
  "/createOrder",
  updateAccessToken,
  isAutheticated,
  createOrder
);

orderRouter.get(
  "/getAllOrdersAdmin",
  isAutheticated,
  updateAccessToken,
  authorizeRoles("user"),
  getAllOrdersByAdmin
);

orderRouter.get("/payment/stripepublishableKey", sendStripePublishableKey);
orderRouter.post("/payment", isAutheticated, newPayment);

orderRouter.get(
  "/getOrderByUser",
  isAutheticated,
  updateAccessToken,
  getOrderByUser
);

export default orderRouter;
