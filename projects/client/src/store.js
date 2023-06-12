import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";
import userReducer from "./reducers/userSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    user: userReducer,
  },
});

export default store;
