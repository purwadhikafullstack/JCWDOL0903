import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";
import userReducer from "./reducers/userSlice";
import voucherReducer from "./reducers/voucherSlice";
import branchReducer from "./reducers/branchSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    voucher: voucherReducer,
    branch: branchReducer
  },
});

export default store;
