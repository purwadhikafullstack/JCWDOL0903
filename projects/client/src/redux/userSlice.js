import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: 0,
    username: "",
    name: "",
    email: "",
    phone_num: "",
    // gender: "",
    role: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
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
