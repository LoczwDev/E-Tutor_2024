import express from "express";
import {
  activateUser,
  addLectureNote,
  changeRoleUserByAdmin,
  deleteLectureNote,
  deleteUserByAdmin,
  getAllUsersByAdmin,
  getLectureNotes,
  getProfileUser,
  getTeacherInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  toggleFavoriteCourse,
  updateAccessToken,
  updateLectureNote,
  updateProfileAvatar,
  updateUserInfo,
  updateUserPassword,
} from "../controllers/user.controllers";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { completeLecture } from "../controllers/courses.controllers";
const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/activate-User", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAutheticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get(
  "/profileUser",
  updateAccessToken,
  isAutheticated,
  getProfileUser
);

userRouter.post("/socialAuth", socialAuth);

userRouter.put(
  "/updateUserInfo",
  updateAccessToken,
  isAutheticated,
  updateUserInfo
);

userRouter.put(
  "/updatePasswordUser",
  updateAccessToken,
  isAutheticated,
  updateUserPassword
);

userRouter.put(
  "/updateProfileAvatar",
  updateAccessToken,
  isAutheticated,
  updateProfileAvatar
);

userRouter.get(
  "/getAllUsersAdmin",
  isAutheticated,
  // updateAccessToken,
  // authorizeRoles("admin"),
  getAllUsersByAdmin
);

userRouter.put(
  "/changeRoleUser",
  isAutheticated,
  updateAccessToken,
  authorizeRoles("user"),
  changeRoleUserByAdmin
);

userRouter.delete(
  "/deleteUser/:id",
  isAutheticated,
  updateAccessToken,
  // authorizeRoles("user"),
  deleteUserByAdmin
);

// Ghi chú
userRouter.get(
  "/courseNote",
  isAutheticated,
  updateAccessToken,
  getLectureNotes
);

userRouter.post(
  "/createNote",
  isAutheticated,
  updateAccessToken,
  addLectureNote
);

userRouter.put(
  "/updateNode",
  isAutheticated,
  updateAccessToken,
  updateLectureNote
);

userRouter.delete(
  "/deleteNote",
  isAutheticated,
  updateAccessToken,
  deleteLectureNote
);

userRouter.post(
  "/toggleFavorite",
  isAutheticated,
  updateAccessToken,
  toggleFavoriteCourse
);

userRouter.get("/teacher/:teacherId", getTeacherInfo);

export default userRouter;
