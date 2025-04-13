import { createSlice } from "@reduxjs/toolkit";

const initialState = { id: null, isOpen: false };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      state.isOpen = action.payload;
    },
    closeModal(state) {
      if (state.isOpen) {
        state.isOpen = { id: null, isOpen: false };
      }
    },
  },
});
// const modalSelector = (state) => state.modal;

// export const isOpenSelector = createSelector(
//   [modalSelector],
//   (modal) => modal.isOpen
// );

// export const modalIsOpenSelector = createSelector(
//   [isOpenSelector, (state, id) => id],
//   (isOpen, id) => isOpen[id]
// );
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
