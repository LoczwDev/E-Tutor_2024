import Express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  getCoursesAnalytics,
  getOrdersAnalytics,
  getOverviewAnalytics,
  getUsersAnalytics,
} from "../controllers/analytics.controllers";
import { updateAccessToken } from "../controllers/user.controllers";

const analyticsRouter = Express.Router();

analyticsRouter.get(
  "/getUsersAnalytics",
  isAutheticated,
  updateAccessToken,
  // authorizeRoles("admin"),
  getUsersAnalytics
);
analyticsRouter.get(
  "/getCoursesAnalytics",
  isAutheticated,
  updateAccessToken,
  // authorizeRoles("admin"),
  getCoursesAnalytics
);
analyticsRouter.get(
  "/getOrdersAnalytics",
  isAutheticated,
  updateAccessToken,
  // authorizeRoles("admin"),
  getOrdersAnalytics
);

analyticsRouter.get(
  "/getOverviewAnalytics",
  isAutheticated,
  updateAccessToken,
  // authorizeRoles("admin"),
  getOverviewAnalytics
);

export default analyticsRouter;
