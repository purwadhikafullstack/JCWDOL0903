import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:2000/products";

const initProduct = {
  totalPages: 0,
  totalItems: 0,
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initProduct,
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export function fetchProducts(query = "") {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}?${query}`);
      dispatch(
        setProducts({
          products: res.data.products.rows,
          totalItems: res.data.products.count,
          totalPages: Math.ceil(res.data.products.count / 12),
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };
}

export default productSlice.reducer;
