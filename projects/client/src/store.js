import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducers/productSlice";
import categoryReducer from "./reducers/categorySlice";
import userReducer from "./reducers/userSlice";
import voucherReducer from "./reducers/voucherSlice";
import branchReducer from "./reducers/branchSlice";
import cartReducer from "./reducers/cartSlice";
import transactionHeaderReducer from "./reducers/transactionHeaderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    voucher: voucherReducer,
    branch: branchReducer,
    cart: cartReducer,
    transactionHeader: transactionHeaderReducer,
  },
});

export default store;
