import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initTransactionHeader = {
  transactionHeaderCategory: [],
};

const transactionHeaderSlice = createSlice({
  name: "transactionHeaderCategory",
  initialState: initTransactionHeader,
  reducers: {
    setTransactionHeaderCategory: (state, action) => {
      state.transactionHeaderCategory = action.payload;
    },
  },
});

export const { setTransactionHeaderCategory } = transactionHeaderSlice.actions;
export default transactionHeaderSlice.reducer;

export const fetchTransactionHeaderCategory = (id) => async (dispatch) => {
  try {
    console.log("id", id);
    let response = await api.get(`transaction-header/${id}`);
    console.log("response 12", response.data.data);
    dispatch(setTransactionHeaderCategory(response.data.data));
  } catch (error) {
    console.log("error nih", error.message);
  }
};
