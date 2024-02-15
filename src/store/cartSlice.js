import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    count: 0,
  },
  reducers: {
    incrementCount(state) {
      state.count++;
    },
    decrementCount(state) {
      state.count--;
    },
  },
});

export const { incrementCount, decrementCount } = cartSlice.actions;

export default cartSlice.reducer;
