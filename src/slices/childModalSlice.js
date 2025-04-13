import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenChild: null,
  componentName: null,
};

const childModalSlice = createSlice({
  name: "childModal",
  initialState,
  reducers: {
    openChildModal(state, action) {
      if (!state.isOpenChild && !state.componentName) {
        state.isOpenChild = action.payload;
        state.componentName = action.payload;
      }
    },
    closeChildModal(state) {
      if (state.isOpenChild) {
        state.isOpenChild = null;
        state.componentName = null;
      }
    },
  },
});

export const { openChildModal, closeChildModal } = childModalSlice.actions;
export default childModalSlice.reducer;
