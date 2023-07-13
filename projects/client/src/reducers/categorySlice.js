import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

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

export function fetchCategories(query = "") {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${BASE_URL}?${query}`);
      dispatch(setCategory(res.data.categories));
    } catch (err) {
      console.log(err.message);
    }
  };
}

export default categorySlice.reducer;
