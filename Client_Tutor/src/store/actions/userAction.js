import { logoutUser } from "../../services/userService";
import { userActions } from "../reducers/userReducers";

export const logout = () => (dispatch) => {
  dispatch(userActions.resetUserInfo());
  localStorage.removeItem("account");
  logoutUser();
};
