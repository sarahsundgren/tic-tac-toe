import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Board from "../Board";

test("renders board size, current player, and board", () => {
  render(<Board />);

  const boardSizeLabel = screen.getByText(/Choose a board size/i);
  expect(boardSizeLabel).toBeInTheDocument();

  const currentPlayerLabel = screen.getByText(/Current Player/i);
  expect(currentPlayerLabel).toBeInTheDocument();

  const squares = screen.getAllByRole("button");
  expect(squares.length).toBe(9);
});

test("can switch players", () => {
  render(<Board />);

  const currentPlayerLabel = screen.getByText(/Current Player/i);
  expect(currentPlayerLabel).toHaveTextContent(/X/);

  const squares = screen.getAllByRole("button");
  squares[0].click();

  expect(currentPlayerLabel).toHaveTextContent(/O/);

  squares[1].click();

  expect(currentPlayerLabel).toHaveTextContent(/X/);
});

test("prevents changing the same square value", () => {
  render(<Board />);

  const currentPlayerLabel = screen.getByText(/Current Player/i);
  expect(currentPlayerLabel).toHaveTextContent(/X/);

  const squares = screen.getAllByRole("button");
  squares[0].click();

  expect(squares[0]).toHaveValue("X");

  squares[0].click();

  expect(squares[0]).toHaveValue("X");
});

test("can change board size", () => {
  render(<Board />);

  let squares = screen.getAllByRole("button");
  expect(squares.length).toBe(9);

  const boardSizeInput = screen.getByRole("spinbutton");
  fireEvent.change(boardSizeInput, { target: { value: 5 } });

  squares = screen.getAllByRole("button");
  expect(squares.length).toBe(25);
});
