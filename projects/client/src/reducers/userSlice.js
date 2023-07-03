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
  role: "",
  isVerified: "",
  referral_code: "",

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
      state.profile_picture = action.payload.profile_picture;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.phone_num = action.payload.phone_num;
      state.role = action.payload.role;
      state.isVerified = action.payload.isVerified;
      state.referral_code = action.payload.referral_code;
    },
    logout: (state) => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
