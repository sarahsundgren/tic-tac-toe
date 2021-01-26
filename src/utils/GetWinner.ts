import { PotentialWinner } from "./PotentialWinner";
import TicTacToeValue from "./TicTacToeValue";

export const GetWinner = (
  currentBoard: TicTacToeValue[][]
): TicTacToeValue | null => {
  // can win on row, col, or diagonal
  let fullBoard = true;
  let row: PotentialWinner = {
    couldWin: false,
    priorCellValue: TicTacToeValue.Empty,
  };
  let col: PotentialWinner = {
    couldWin: false,
    priorCellValue: TicTacToeValue.Empty,
  };
  let leftDiagonal: PotentialWinner = {
    couldWin: false,
    priorCellValue: TicTacToeValue.Empty,
  };
  let rightDiagonal: PotentialWinner = {
    couldWin: false,
    priorCellValue: TicTacToeValue.Empty,
  };

  for (let i = 0; i < currentBoard.length; i++) {
    // initialize to each type of wins' first square
    row = { priorCellValue: currentBoard[i][0], couldWin: true };

    col = { priorCellValue: currentBoard[0][i], couldWin: true };

    // diagonals will only be checked when i === 0
    if (i === 0) {
      // [0][0] is the top left corner
      leftDiagonal = { priorCellValue: currentBoard[i][0], couldWin: true };
      // [length - 1][0] is the top right corner
      rightDiagonal = {
        priorCellValue: currentBoard[currentBoard.length - 1 - i][i],
        couldWin: true,
      };
    }

    for (let j = 0; j < currentBoard[i].length; j++) {
      const updatedRow = updateWinType(fullBoard, row, currentBoard, i, j);
      row = updatedRow.potentialWinner;
      fullBoard = updatedRow.fullBoard;

      const updatedCol = updateWinType(fullBoard, col, currentBoard, j, i);
      col = updatedCol.potentialWinner;
      fullBoard = updatedCol.fullBoard;

      // check diagonals only from the first corner
      if (i === 0) {
        const updatedLeftDiagonal = updateWinType(
          fullBoard,
          leftDiagonal,
          currentBoard,
          j,
          j
        );
        leftDiagonal = updatedLeftDiagonal.potentialWinner;
        fullBoard = updatedLeftDiagonal.fullBoard;

        const updatedRightDiagonal = updateWinType(
          fullBoard,
          rightDiagonal,
          currentBoard,
          currentBoard.length - 1 - j,
          j
        );
        rightDiagonal = updatedRightDiagonal.potentialWinner;
        fullBoard = updatedRightDiagonal.fullBoard;
      }

      // if no types can win, move to the next start of col/row
      if (
        !row.couldWin &&
        !col.couldWin &&
        !leftDiagonal.couldWin &&
        !rightDiagonal.couldWin
      ) {
        break;
      }
    }

    // return winner
    if (row.couldWin) {
      return row.priorCellValue;
    }

    if (col.couldWin) {
      return col.priorCellValue;
    }

    if (leftDiagonal.couldWin) {
      return leftDiagonal.priorCellValue;
    }

    if (rightDiagonal.couldWin) {
      return rightDiagonal.priorCellValue;
    }
  }

  // return draw or nothing
  if (fullBoard) {
    return TicTacToeValue.Empty;
  }

  return null;
};

const updateWinType = (
  fullBoard: boolean,
  potentialWinner: PotentialWinner,
  currentBoard: TicTacToeValue[][],
  rowIndex: number,
  colIndex: number
): {
  fullBoard: boolean;
  potentialWinner: PotentialWinner;
} => {
  if (potentialWinner.couldWin) {
    const currentCell = currentBoard[rowIndex][colIndex];

    if (currentCell === TicTacToeValue.Empty) {
      fullBoard = false;

      potentialWinner = { ...potentialWinner, couldWin: false };
    } else {
      potentialWinner = {
        ...potentialWinner,
        couldWin: potentialWinner.priorCellValue === currentCell,
      };
    }
  }
  return {
    fullBoard,
    potentialWinner,
  };
};
