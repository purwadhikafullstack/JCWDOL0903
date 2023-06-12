import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { successAlert, errorAlert } from "../helper/alerts";

const BASE_URL = "http://localhost:2000/category";

const categorySlice = createSlice({
  name: "category",
  initialState: [],
  reducers: {
    setCategory(state, action) {
      return action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;

export function fetchCategories() {
  return async (dispatch) => {
    try {
      const res = await axios.get(BASE_URL);
      dispatch(setCategory(res.data.categories));
    } catch (err) {
      errorAlert();
      console.log(err.message);
    }
  };
}

export function createCategory(name) {
  return async (dispatch) => {
    try {
      const res = await axios.post(BASE_URL, { name });
      dispatch(fetchCategories());
      const newCategory = res.data.category.name;
      successAlert(`${newCategory} added`);
    } catch (err) {
      errorAlert();
      console.log(err.message);
    }
  };
}

export function updateCategory(id, data) {
  return async (dispatch) => {
    try {
      await axios.put(`${BASE_URL}/${id}`, data);
      dispatch(fetchCategories());
      successAlert("Updated!");
    } catch (err) {
      errorAlert();
      console.log(err.message);
    }
  };
}

export function deleteCategory(id) {
  return async (dispatch) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      dispatch(fetchCategories());
      successAlert("Deleted!");
    } catch (err) {
      errorAlert();
      console.log(err.message);
    }
  };
}

export default categorySlice.reducer;
