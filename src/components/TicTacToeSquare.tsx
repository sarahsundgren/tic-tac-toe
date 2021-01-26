import React from "react";
import TicTacToeValue from "../utils/TicTacToeValue";

const TicTacToeSquare: React.FC<{
  currentValue: TicTacToeValue;
  clickSquare: () => void;
  disabled: boolean;
}> = ({ currentValue, clickSquare, disabled }) => {
  return (
    <input
      type="button"
      style={{ width: 50, height: 50, textAlign: "center" }}
      onClick={clickSquare}
      disabled={disabled}
      value={currentValue}
    />
  );
};

export default TicTacToeSquare;
