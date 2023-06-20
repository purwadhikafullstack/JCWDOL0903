import { createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

const initBranch = {
    allBranches:[],
    selectedBranch:{
        id: "",
        kota:"",
        kecamatan:"",
        provinsi:"",
        kode_pos:""
    }
  };

  export const branchSlice = createSlice({
    name: "branch",
    initialState: initBranch,
    reducers: {
      setBranch: (state, action) => {
        return {
            ...state,
            allBranches: action.payload
        };
      },

      setSelectedBranch: (state, action) => {
        return{
            ...state,
            selectedBranch: action.payload
        }
      }
    },
  });

  export const { setBranch, setSelectedBranch } = branchSlice.actions;
  
  export function fetchAllBranches() {
    return async (dispatch) => {
      try {
        const data = await api.get("/branch");
        dispatch(setBranch(data.data.data));
        dispatch(setSelectedBranch(data.data.data[0]))
      } catch (err) {
        console.log(err.response.data.error);
      }
    };
  }


export default branchSlice.reducer;