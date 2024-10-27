import { configureStore } from "@reduxjs/toolkit";
import { userReducer, userActions } from "./reducers/userReducers"; // Adjust the import path as necessary
import { getProfileUser, updateAccessToken } from "../services/userService";
import { cartReducer } from "./reducers/cartReducers";
import { chatReducer } from "./reducers/chatReducers";

const initializeStore = async () => {
  const store = configureStore({
    reducer: {
      user: userReducer,
      cart: cartReducer,
      chatClients: chatReducer,
    },
  });

  // Dispatch the start loading action
  store.dispatch(userActions.loadUserStart());

  try {
    const profileData = await getProfileUser();
    store.dispatch(userActions.loadUserSuccess(profileData));
  } catch (error) {
    try {
      await updateAccessToken();
      const profileData = await getProfileUser();
      store.dispatch(userActions.loadUserSuccess(profileData));
    } catch (refreshError) {
      store.dispatch(userActions.loadUserFailure(refreshError.message));
    }
  }

  return store;
};

export const storePromise = initializeStore();
