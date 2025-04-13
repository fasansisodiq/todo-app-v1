import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import childModalReducer from "./slices/childModalSlice";
const store = configureStore({
  reducer: {
    modal: modalReducer,
    childModal: childModalReducer,
  },
});
export default store;
