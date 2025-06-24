import { createSlice } from "@reduxjs/toolkit";

// const initialState = []
const initialState = [{}];

const taskSlice = createSlice({
  name: "taskSlice",
  initialState,
  reducers: {
    addTask(state, action) {
      //payload is new task
      state.taskSlice.push(action.payload);
    },
  },
});
export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
