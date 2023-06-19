import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // value: {
  id: 0,
  branch_id: 0,
  username: "",
  email: "",
  phone_num: "",
  gender: "",
  birthdate: "",
  profile_picture: "",
  isVerified: "",

  // role: "",
  // },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.id = action.payload.id;
      state.branch_id = action.payload.branch_id;
      state.gender = action.payload.gender;
      state.phone_num = action.payload.phone_num;
      state.birthdate = action.payload.birthdate;
      state.username = action.payload.username;
      state.profile_picture = action.payload.profile_picture
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone_num = action.payload.phone_num;
      state.role = action.payload.role;
    },
    logout: (state) => {
      return initialState;
      // state.value.id = 0;
      // state.value.username = "";
      // state.value.email = "";
      // state.value.phone_number = "";
      // state.value.merchant_status = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
