import React from 'react';
import {render, screen, within} from "@testing-library/react";
import { App } from './App';

it('renders game board', () => {
  render(<App />);
  expect(screen.getByTestId('board')).toBeInTheDocument();
});

it('has 7 columns', () => {
  render(<App />);
  expect(screen.getAllByTestId('column').length).toBe(7);
});

it('has 6 slots in every column', () => {
  render(<App />);
  const columns = screen.getAllByTestId('column');

  columns.forEach(column => {
    const slots = within(column).getAllByTestId('slot');
    expect(slots.length).toBe(6);
  });
});

it('has a NextPlayer visual, starting Yellow', () => {
  render(<App />);
  expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
});

it('changes current player when click in free place', () => {
  render(<App />);
  screen.getAllByTestId('column')[0].click();
  expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-R');
  expect(screen.getByTestId('nextPlayer')).not.toHaveClass('Player-Y');

  screen.getAllByTestId('column')[0].click();
  expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
  expect(screen.getByTestId('nextPlayer')).not.toHaveClass('Player-R');
});

it('fills the lowest free cell when click on column', () => {
  render(<App />);
  const column = screen.getAllByTestId('column')[3];
  column.click();
  expect(within(column).getAllByTestId('slot')[0]).toHaveClass('Player-Y');

  column.click();
  expect(within(column).getAllByTestId('slot')[0]).toHaveClass('Player-Y');
  expect(within(column).getAllByTestId('slot')[1]).toHaveClass('Player-R');
});

it('does nothing when click on a full column', () => {
  render(<App />);
  Array.from({length: 7}).forEach(() => {
    screen.getAllByTestId('column')[3].click();
  });

  expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
  screen.getAllByTestId('column')[3].click();
  expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
});

it('clears the game when Restart', () => {
  render(<App />);
  const column = screen.getAllByTestId('column')[3];
  const slots = within(column).getAllByTestId('slot');
  expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
  column.click();
  expect(slots[0]).not.toHaveClass('Free');
  expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-R');

  screen.getByTestId('restart').click();
  expect(slots[0]).toHaveClass('Free');

  expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
});
