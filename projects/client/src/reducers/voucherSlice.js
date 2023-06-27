import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import {
  successAlert,
  errorAlert,
  errorAlertWithMessage,
} from "../helper/alerts";

const BASE_URL = "/vouchers";

const initVoucher = {
  totalPages: 0,
  totalItems: 0,
  vouchers: [],
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState: initVoucher,
  reducers: {
    setVouchers(state, action) {
      return action.payload;
    },
  },
});

export const { setVouchers } = voucherSlice.actions;

export function fetchVouchers(query = "") {
  return async (dispatch) => {
    try {
      const res = await api.get(`${BASE_URL}?${query}`);
      dispatch(
        setVouchers({
          vouchers: res.data.vouchers.rows,
          totalItems: res.data.vouchers.count,
          totalPages: Math.ceil(res.data.vouchers.count / 12),
        })
      );
    } catch (err) {
      errorAlert();
      console.log(err.response.data.error);
    }
  };
}

export function createVoucher(data, currPage = 1) {
  return async (dispatch) => {
    try {
      const res = await api.post(BASE_URL, data);
      dispatch(fetchVouchers(`page=${currPage}`));
      const newVoucher = res.data.voucher.voucher_type;
      successAlert(`Voucher ${newVoucher} added`);
    } catch (err) {
      errorAlertWithMessage(err.response.data.error);
      console.log(err.response.data.error);
    }
  };
}

export function updateVoucher(id, data, currPage = 1) {
  return async (dispatch) => {
    try {
      await api.patch(`${BASE_URL}/${id}`, data);
      dispatch(fetchVouchers(`page=${currPage}`));
      successAlert("Updated!");
    } catch (err) {
      errorAlertWithMessage(err.response.data.error);
      console.log(err.response.data.error);
    }
  };
}

export function deleteVoucher(id, currPage = 1) {
  return async (dispatch) => {
    try {
      await api.delete(`${BASE_URL}/${id}`);
      dispatch(fetchVouchers(`page=${currPage}`));
      successAlert("Deleted!");
    } catch (err) {
      errorAlert();
      console.log(err.response.data.error);
    }
  };
}

export default voucherSlice.reducer;
