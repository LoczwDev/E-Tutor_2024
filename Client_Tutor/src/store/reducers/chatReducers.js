// chatSlice.js
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  client: null,
};

const chatSlice = createSlice({
  name: "chatClients",
  initialState,
  reducers: {
    setClient: (state, action) => {
      state.client = action.payload; // Chỉnh sửa từ clients thành client
    },
  },
});

const chatActions = chatSlice.actions;
const chatReducer = chatSlice.reducer;

export { chatActions, chatReducer };
