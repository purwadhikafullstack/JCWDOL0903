import api from "../api/api";
import { createSlice } from "@reduxjs/toolkit";
import {
  successAlert,
  errorAlertWithMessage,
  errorAlert,
} from "../helper/alerts";

const BASE_URL = "/products";

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
      const res = await api.get(`${BASE_URL}?${query}`);
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

export function createProduct(data, currPage = 1, branchId = "") {
  return async (dispatch) => {
    try {
      await api.post(BASE_URL, data);
      dispatch(fetchProducts(`page=${currPage}&branchId=${branchId}`));
      successAlert(`Product added`);
    } catch (err) {
      errorAlertWithMessage(err.response.data.error);
      console.log(err.response.data.error);
    }
  };
}

export function updateProduct(id, data, currPage = 1, branchId = "") {
  return async (dispatch) => {
    try {
      await api.patch(`${BASE_URL}/${id}`, data);
      dispatch(fetchProducts(`page=${currPage}&branchId=${branchId}`));
      successAlert("Updated!");
    } catch (err) {
      errorAlertWithMessage(err.response.data.error);
      console.log(err.response.data.error);
    }
  };
}

export function deleteProduct(id, currPage = 1, branchId = "") {
  return async (dispatch) => {
    try {
      await api.delete(`${BASE_URL}/${id}`);
      dispatch(fetchProducts(`page=${currPage}&branchId=${branchId}`));
      successAlert("Deleted!");
    } catch (err) {
      errorAlert();
      console.log(err.response.data.error);
    }
  };
}

export default productSlice.reducer;
