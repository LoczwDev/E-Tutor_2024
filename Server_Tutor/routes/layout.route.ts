import Express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getLayoutByType,
} from "../controllers/layout.controllers";
import { updateAccessToken } from "../controllers/user.controllers";

const layoutRouter = Express.Router();

layoutRouter.post(
  "/createLayout",
  isAutheticated,
  updateAccessToken,
  // authorizeRoles("admin"),
  createLayout
);

layoutRouter.put(
  "/editLayout",
  isAutheticated,
  updateAccessToken,
  // authorizeRoles("admin"),
  editLayout
);

layoutRouter.get(
  "/getLayoutByType/:type",
  // authorizeRoles("admin"),
  getLayoutByType
);

export default layoutRouter;
