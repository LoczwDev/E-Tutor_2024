import Express from "express";
import { isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controllers";
import { getTokenStream } from "../controllers/stream.controllers";

const streamRouter = Express.Router();

streamRouter.get(
  "/tokenStream",
  isAutheticated,
  updateAccessToken,
  getTokenStream
);

export default streamRouter;
