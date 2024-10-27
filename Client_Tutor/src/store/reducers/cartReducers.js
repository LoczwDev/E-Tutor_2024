import { createSlice } from "@reduxjs/toolkit";

const loadCartFromLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

const initialState = {
  items: loadCartFromLocalStorage || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

// Exporting the actions to be used in components
const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

// Exporting the reducer to be used in the store configuration
export { cartActions, cartReducer };
