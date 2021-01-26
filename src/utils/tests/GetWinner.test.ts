import { GetWinner } from "../GetWinner";
import TicTacToeValue from "../TicTacToeValue";

test("No winner should be found", () => {
  const emptyBoard = new Array(3)
    .fill(null)
    .map((row) => (row = new Array(3).fill(TicTacToeValue.Empty)));

  expect(GetWinner(emptyBoard)).toBe(null);
});

test("X should be the winner", () => {
  const xBoard = new Array(3)
    .fill(null)
    .map((row) => (row = new Array(3).fill(TicTacToeValue.X)));

  expect(GetWinner(xBoard)).toBe(TicTacToeValue.X);
});

test("O should be the winner", () => {
  const oBoard = new Array(3)
    .fill(null)
    .map((row) => (row = new Array(3).fill(TicTacToeValue.O)));

  expect(GetWinner(oBoard)).toBe(TicTacToeValue.O);
});

test("A draw should be found", () => {
  const filledBoard = [
    [TicTacToeValue.O, TicTacToeValue.X, TicTacToeValue.O],
    [TicTacToeValue.O, TicTacToeValue.X, TicTacToeValue.O],
    [TicTacToeValue.X, TicTacToeValue.O, TicTacToeValue.X],
  ];

  expect(GetWinner(filledBoard)).toBe(TicTacToeValue.Empty);
});
