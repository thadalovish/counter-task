import type { CounterSliceState } from "@/lib/redux/slices/counterSlice";

const increment = (state: CounterSliceState) => {
  state.value += 1;
};

const decrement = (state: CounterSliceState) => {
  state.value -= 1;
};

const incrementByAmount = (
  state: CounterSliceState,
  action: { payload: number }
) => {
  state.value += action.payload;
};

const handleStatus = (
  state: CounterSliceState,
  action: { payload: CounterSliceState["status"] }
) => {
  state.status = action.payload;
};

export { increment, decrement, incrementByAmount, handleStatus };
