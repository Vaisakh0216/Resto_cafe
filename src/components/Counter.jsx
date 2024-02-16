import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { decrementCount, incrementCount } from "../store/cartSlice.js";

const Counter = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const add = () => {
    setCount(count + 1);
    dispatch(incrementCount());
  };
  const remove = () => {
    setCount(count - 1);
    dispatch(decrementCount());
  };

  return (
    <div className="counter">
      <span style={{ cursor: "pointer" }} onClick={() => count > 0 && remove()}>
        -
      </span>
      <span>{count}</span>
      <span style={{ cursor: "pointer" }} onClick={() => add()}>
        +
      </span>
    </div>
  );
};

export default Counter;
