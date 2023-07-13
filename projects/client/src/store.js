import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
  },
});

export default store;
