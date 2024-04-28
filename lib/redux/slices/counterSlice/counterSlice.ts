/* Core */
import { createSlice } from "@reduxjs/toolkit";
import * as reducers from "@/lib/redux/slices/counterSlice/reducers";

const initialState: CounterSliceState = {
  value: 0,
  status: "idle",
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: reducers.increment,
    decrement: reducers.decrement,
    incrementByAmount: reducers.incrementByAmount,
    handleStatus: reducers.handleStatus,
  },
});

export const { increment, decrement, incrementByAmount, handleStatus } =
  counterSlice.actions;

/* Types */
export interface CounterSliceState {
  value: number;
  status: "idle" | "loading" | "failed";
}
