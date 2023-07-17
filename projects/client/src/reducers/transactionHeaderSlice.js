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

export const fetchTransactionHeaderCategory =
  (branchId) => async (dispatch) => {
    try {
      // console.log("id", id);
      // alert(branchId);
      // console.log(branchId);
      let response = await api.get(`transaction-header`, {
        params: {
          branch_Id: branchId,
        },
      });
      // console.log("response 12", response.data.data);
      dispatch(setTransactionHeaderCategory(response.data.data));
    } catch (error) {
      console.log("error nih", error.message);
    }
  };
