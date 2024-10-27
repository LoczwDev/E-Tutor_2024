import { createSlice } from "@reduxjs/toolkit";

const userInitialState = {
  userInfo: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
      state.loading = false; // Set loading to false when user info is set
      state.error = null;    // Clear any previous errors
    },
    resetUserInfo(state) {
      state.userInfo = null;
      state.loading = false; // Ensure loading is false when reset
      state.error = null;    // Clear error on reset
    },
    loadUserStart(state) {
      state.loading = true;  // Set loading to true when starting to load user data
      state.error = null;    // Clear previous errors
    },
    loadUserSuccess(state, action) {
      state.userInfo = action.payload; // Set user info on successful load
      state.loading = false;            // Set loading to false
      state.error = null;               // Clear any errors
    },
    loadUserFailure(state, action) {
      state.loading = false;            // Set loading to false on failure
      state.error = action.payload;     // Set error message
    },
  },
});

// Export actions and reducer
const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export { userActions, userReducer };
