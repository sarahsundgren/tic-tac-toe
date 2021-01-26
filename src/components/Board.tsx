import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { GetWinner } from "../utils/GetWinner";
import TicTacToeValue from "../utils/TicTacToeValue";
import TicTacToeSquare from "./TicTacToeSquare";

const Board: React.FC = () => {
  const defaultBoardSize = 3;
  const [boardSize, setBoardSize] = useState<number | "">(defaultBoardSize);
  const [currentPlayer, setCurrentPlayer] = useState(TicTacToeValue.X);
  const [winner, setWinner] = useState<TicTacToeValue | null>(null);
  const [boardState, setBoardState] = useState(
    new Array(defaultBoardSize)
      .fill(null)
      .map(
        (row) => (row = new Array(defaultBoardSize).fill(TicTacToeValue.Empty))
      )
  );

  const changeBoardSize = (event: any): void => {
    if (event.target.value === "" && boardSize !== "") {
      setBoardSize("");
      return;
    }

    const newBoardSize = Number(event.target.value);

    if (isNaN(newBoardSize)) {
      setBoardSize(defaultBoardSize);
    } else {
      setBoardSize(newBoardSize);
    }
  };

  const clickSquare = (row: number, col: number): void => {
    if (boardState[row][col] === TicTacToeValue.Empty) {
      const nextBoardState = boardState.slice();
      nextBoardState[row][col] = currentPlayer;

      setBoardState(nextBoardState);
      checkWinConditions(nextBoardState);

      switchPlayer();
    }
  };

  const switchPlayer = (): void => {
    if (currentPlayer === TicTacToeValue.X) {
      setCurrentPlayer(TicTacToeValue.O);
    } else {
      setCurrentPlayer(TicTacToeValue.X);
    }
  };

  const checkWinConditions = (currentBoard: TicTacToeValue[][]): void => {
    setWinner(GetWinner(currentBoard));
  };

  const resetGame = useCallback((): void => {
    setCurrentPlayer(TicTacToeValue.X);
    setWinner(null);

    const resetBoardSize =
      boardSize === "" || boardSize < defaultBoardSize
        ? defaultBoardSize
        : boardSize;

    setBoardState(
      new Array(resetBoardSize)
        .fill(null)
        .map(
          (row) => (row = new Array(resetBoardSize).fill(TicTacToeValue.Empty))
        )
    );
  }, [boardSize]);

  useEffect(() => {
    if (boardSize !== "") {
      resetGame();
    }
  }, [boardSize, resetGame]);

  const renderBoard = (): ReactElement[] => {
    const boardElements = [];

    for (let i = 0; i < boardState.length; i++) {
      const rowElements = [];

      for (let j = 0; j < boardState[i].length; j++) {
        rowElements.push(
          <TicTacToeSquare
            key={`[${i}, ${j}]`}
            disabled={winner !== null}
            currentValue={boardState[i][j]}
            clickSquare={() => {
              clickSquare(i, j);
            }}
          />
        );
      }

      boardElements.push(<div key={i}>{rowElements}</div>);
    }

    return boardElements;
  };

  const renderPlayerOrWinner = (): ReactElement => {
    if (winner !== null) {
      return (
        <div>
          <h2>
            {winner === TicTacToeValue.Empty
              ? "Stalemate"
              : `Winner is ${winner}`}
          </h2>
          <button onClick={resetGame}>Play Again</button>
          <hr />
        </div>
      );
    }

    return <h3>Current Player: {currentPlayer} </h3>;
  };

  return (
    <>
      <div>
        Choose a board size (minimum of 3):
        <input type="number" value={boardSize} onChange={changeBoardSize} />
      </div>
      {renderPlayerOrWinner()}
      {renderBoard()}
    </>
  );
};

export default Board;
