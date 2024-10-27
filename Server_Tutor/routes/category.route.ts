import express from "express";
import { isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controllers";
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  getSingleCategory,
} from "../controllers/category.controllers";

const categoryRouter = express.Router();

categoryRouter.post(
  "/createCategory",
  isAutheticated,
  updateAccessToken,
  createCategory
);

categoryRouter.put(
  "/editCategory/:categoryId",
  isAutheticated,
  updateAccessToken,
  editCategory
);

categoryRouter.get(
  "/",
  getAllCategory
);

categoryRouter.get(
  "/getSingleCategory/:categoryId",
  getSingleCategory
);

categoryRouter.delete(
  "/deleteCategory/:categoryId",
  isAutheticated,
  updateAccessToken,
  deleteCategory
);

export default categoryRouter;
