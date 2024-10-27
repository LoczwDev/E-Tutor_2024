import Express from "express";
import { isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/user.controllers";
import {
  createComment,
  deleteComment,
  getCommentByLecture,
  updateComment,
} from "../controllers/comment.controllers";
const commentRouter = Express.Router();

commentRouter.post(
  "/createComment",
  isAutheticated,
  updateAccessToken,
  createComment
);

commentRouter.get(
  "/getCommentByLecture/:lectureId",
  isAutheticated,
  updateAccessToken,
  getCommentByLecture
);

commentRouter.put(
  "/editComment/:commentId",
  isAutheticated,
  updateAccessToken,
  updateComment
);
commentRouter.delete(
  "/deleteComment/:commentId",
  isAutheticated,
  updateAccessToken,
  deleteComment
);

export default commentRouter;
