/* Instruments */
import type { ReduxThunkAction } from "@/lib/redux";
import { incrementByAmount, handleStatus } from "@/lib/redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

export const incrementIfOddAsync = (
  amount: number,
  count: number
): ReduxThunkAction => {
  return async (
    dispatch: ThunkDispatch<{}, unknown, AnyAction>
  ): Promise<void> => {
    dispatch(handleStatus("loading"));
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (count % 2 !== 0) {
          dispatch(incrementByAmount(amount));
          dispatch(handleStatus("idle"));
          resolve();
        } else {
          dispatch(handleStatus("failed"));
          reject();
        }
      }, 500);
    });
  };
};
