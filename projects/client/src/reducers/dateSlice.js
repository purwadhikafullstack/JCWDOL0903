import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initCart = {
  userCart: 0,
};

export const cartSlice = createSlice({
  name: "date",
  initialState: initCart,
  reducers: {
    setUserCart: (state, action) => {
      return {
        userCart: action.payload,
      };
    },
    clearUserCart: (state) => {
      return initCart;
    },
  },
});

export const { setUserCart, clearUserCart } = cartSlice.actions;

export function fetchUserCart(userId) {
  return async (dispatch) => {
    try {
      const data = await api.post("/cart/get", { user_id: userId });
      dispatch(setUserCart(data.data.data));
    } catch (err) {
      // console.log(err.response.data.error);
    }
  };
}

export default cartSlice.reducer;
