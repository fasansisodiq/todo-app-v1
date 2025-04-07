import React from 'react';
  
  const ModalSlice = () =>  {
	return (
	  <div>
	  </div>
	);
  }
  
  export default ModalSlice;
  import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: null, id: null, componentName: "" };

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal(state, action) {
      if (!state.isOpen) {
        state.isOpen = action.payload;
        state.id = action.payload;
        componentName = action.payload;
      }
    },
    closeModal(state) {
      if (state.isOpen) {
        state.isOpen = null;
        state.id = null;
        componentName = "";
      }
    },
  },
});
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
