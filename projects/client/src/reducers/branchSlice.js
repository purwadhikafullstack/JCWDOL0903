import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import {
  successAlert,
  errorAlert,
  errorAlertWithMessage,
} from "../helper/alerts";

const initBranch = {
  allBranches: [],
  selectedBranch: {
    id: "",
    kota: "",
    kecamatan: "",
    provinsi: "",
    kode_pos: "",
  },
  adminAllBranchList: [],
};

export const branchSlice = createSlice({
  name: "branch",
  initialState: initBranch,
  reducers: {
    setBranch: (state, action) => {
      return {
        ...state,
        allBranches: action.payload,
      };
    },

    setSelectedBranch: (state, action) => {
      return {
        ...state,
        selectedBranch: action.payload,
      };
    },

    setAllAdminBranch: (state, action) => {
      state.adminAllBranchList = action.payload;
    },
  },
});

export const { setBranch, setSelectedBranch, setAllAdminBranch } =
  branchSlice.actions;

export function fetchAllBranches() {
  return async (dispatch) => {
    try {
      const data = await api.get("/branch");
      dispatch(setBranch(data.data.data));
      dispatch(setSelectedBranch(data.data.data[0]));
    } catch (err) {
      errorAlert();
      // console.log(err.response.data.error);
    }
  };
}

export function fetchAllAdminBranch() {
  return async (dispatch) => {
    const response = await api.get("/admin/fetchbranchadmin");
    dispatch(setAllAdminBranch(response.data.data));
  };
}

export function addBranchAdmin(data) {
  return async (dispatch) => {
    try {
      const response = await api.post("/admin/branchAdmin", data);
      dispatch(fetchAllAdminBranch());
      successAlert(response.data.message);
    } catch (error) {
      // console.log("error", error.response.data.message);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export default branchSlice.reducer;
