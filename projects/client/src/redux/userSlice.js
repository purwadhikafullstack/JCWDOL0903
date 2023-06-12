import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    branch_id: 0,
    username: "",
    name: "",
    email: "",
    phone_num: "",
    gender: "",
    birthdate: "",
    profile_picture: "",
    // role: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.branch_id = action.payload.branch_id;
      state.value.username = action.payload.username;
      state.value.name = action.payload.name;
      state.value.email = action.payload.email;
      state.value.phone_num = action.payload.phone_num;
      state.value.role = action.payload.role;
    },
    // logout: (state) => {
    //   state.value.id = 0;
    //   state.value.username = "";
    //   state.value.email = "";
    //   state.value.phone_number = "";
    //   state.value.merchant_status = false;
    // },
  },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
