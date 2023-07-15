import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";
import Axios from "axios";
import {
  successAlert,
  errorAlert,
  errorAlertWithMessage,
} from "../helper/alerts";
const BASE_URL = "/branch";

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
  // console.log("dispatch");
  return async (dispatch) => {
    // console.log("disp", dispatch);
    try {
      const data = await api.get("/branch");
      dispatch(setBranch(data.data.data));
      dispatch(setSelectedBranch(data.data.data[0]));
    } catch (err) {
      console.log("bransc slice", err.response.data.error);
    }
  };
}

export function fetchAllAdminBranch() {
  return async (dispatch) => {
    const response = await api.get("/admin/fetchbranchadmin");

    // console.log("rrrr", response.data.data);
    dispatch(setAllAdminBranch(response.data.data));
  };
}

export function addBranchAdmin(data) {
  // console.log("ini dta", data);
  return async (dispatch) => {
    try {
      const response = await api.post("/admin/branchAdmin", data);
      console.log("response", response);

      dispatch(fetchAllAdminBranch());
      successAlert(response.data.message);
    } catch (error) {
      console.log("error", error.response.data.message);
      errorAlertWithMessage(error.response.data.message);
    }
  };
}

export default branchSlice.reducer;
// ===============================================

// export const branchSlice = createSlice({
//   name: "Branch",
//   initialState: {
//     //
//     branchList: [],
//     // adminAllBranchList: [],
//   },

//   reducers: {
//     setBranchList: (state, action) => {
//       state.branchList = action.payload;
//     },
//     setBrancAdmin: (state, action) => {
//       state.branchList.push(action.payload);
//     },

//     setAllAdminBranch: (state, action) => {
//       state.adminAllBranchList = action.payload;
//     },
//   },
// });

// // export const { setBranchList, setBrancAdmin, setAllAdminBranch } =
// //   branchSlice.actions;
// // menampilkan di global state melalui store.js
// export default branchSlice.reducer;

// export function fetchBranch() {
//   return async (dispatch) => {
//     // ambil data
//     let response = await Axios.get("http://localhost:2000/admin");
//     // console.log("response", response);
//     // melempar data ke setBranchList
//     dispatch(setBranchList(response.data.data));
//   };
// }

// export function addBranchAdmin(data) {
//   // console.log("ini dta", data);
//   return async (dispatch) => {
//     try {
//       const response = await api.post("/admin/branchAdmin", data);
//       console.log("response", response);

//       successAlert(response.data.message);
//     } catch (error) {
//       console.log("error", error.response.data.message);
//       errorAlertWithMessage(error.response.data.message);
//     }
//   };
// }

// export function fetchAllAdminBranch() {
//   return async (dispatch) => {
//     const response = await Axios.get(
//       "http://localhost:2000/admin/fetchbranchadmin"
//     );

//     console.log("rrrr", response.data.data);
//     dispatch(setAllAdminBranch(response.data.data));
//   };
// }
