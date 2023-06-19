import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";
import userReducer from "./reducers/userSlice";
import voucherReducer from "./reducers/voucherSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    user: userReducer,
    voucher: voucherReducer,
  },
});

export default store;
