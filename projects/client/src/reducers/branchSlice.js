import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import {
  successAlert,
  errorAlert,
  errorAlertWithMessage,
} from "../helper/alerts";
import Axios from "axios";

const BASE_URL = "/branch";

export const branchSlice = createSlice({
  name: "Branch",
  initialState: {
    //
    branchList: [],
    adminAllBranchList: [],
  },

  reducers: {
    setBranchList: (state, action) => {
      state.branchList = action.payload;
    },
    setBrancAdmin: (state, action) => {
      state.branchList.push(action.payload);
    },

    setAllAdminBranch: (state, action) => {
      state.adminAllBranchList = action.payload;
    },
  },
});

export const { setBranchList, setBrancAdmin, setAllAdminBranch } =
  branchSlice.actions;
// menampilkan di global state melalui store.js
export default branchSlice.reducer;

export function fetchBranch() {
  return async (dispatch) => {
    // ambil data
    let response = await Axios.get("http://localhost:2000/admin");
    // console.log("response", response);
    // melempar data ke setBranchList
    dispatch(setBranchList(response.data.data));
  };
}

export function addBranchAdmin(data) {
  // console.log("ini dta", data);
  return async (dispatch) => {
    try {
      const response = await api.post("/admin/branchAdmin", data);
      console.log("response", response);

      successAlert(response.data.message);
    } catch (error) {
      console.log("error", error.response.data.message);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export function fetchAllAdminBranch() {
  return async (dispatch) => {
    const response = await Axios.get(
      "http://localhost:2000/admin/fetchbranchadmin"
    );

    console.log("rrrr", response.data.data);
    dispatch(setAllAdminBranch(response.data.data));
  };
}
