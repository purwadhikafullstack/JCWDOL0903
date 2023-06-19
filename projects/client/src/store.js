import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
  },
});

export default store;
