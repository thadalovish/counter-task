"use client";

/* Core */
import { useState, useCallback } from "react";
/* Instruments */
import {
  useSelector,
  selectCount,
  useDispatch,
  increment,
  decrement,
  incrementByAmount,
  selectStatus,
} from "@/lib/redux";
import { incrementIfOddAsync } from "@/lib/redux/slices/counterSlice/thunks";
import styles from "./counter.module.css";

export const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const status = useSelector(selectStatus);
  const [incrementAmount, setIncrementAmount] = useState<number>(0);
  // Create a state named incrementAmount

  const isDecrementButtonDisable = () => {
    return count === 0;
  };

  const isAddButtonDisabled = () => {
    return incrementAmount < 1;
  };

  const isOddButtonDisabled = () => {
    return incrementAmount < 1 || count % 2 === 0;
  };

  const handleInputValueChange = (value: number) => {
    setIncrementAmount(value);
  };

  const handleAddAmount = useCallback(() => {
    if (!Number.isNaN(incrementAmount)) {
      dispatch(incrementByAmount(incrementAmount));
      setIncrementAmount(0);
    }
  }, [incrementAmount]);

  const handleIfOddAmount = () => {
    dispatch(incrementIfOddAsync(incrementAmount, count));
    setIncrementAmount(0);
  };

  return (
    <div>
      {/* count UI ON Top to avoid CLS  */}
      {status === "loading" ? (
        <span className={styles.value}>...</span>
      ) : (
        <span className={styles.value}>{count}</span>
      )}
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          disabled={isDecrementButtonDisable()}
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          type="number"
          value={incrementAmount === 0 ? "" : incrementAmount}
          aria-label="Set increment amount"
          onChange={(event) => {
            handleInputValueChange(Number(event.target.value));
          }}
          min="0"
        />
        <button
          className={styles.button}
          onClick={handleAddAmount}
          disabled={isAddButtonDisabled()}
        >
          Add Amount
        </button>
        <button
          className={styles.button}
          onClick={handleIfOddAmount}
          disabled={isOddButtonDisabled()}
        >
          Add If Odd
        </button>
      </div>
      {status === "failed" && (
        <span className={styles.error}>Something went wrong</span>
      )}
    </div>
  );
};
