import TicTacToeValue from "./TicTacToeValue";

export interface PotentialWinner {
  couldWin: boolean;
  priorCellValue: TicTacToeValue;
}
