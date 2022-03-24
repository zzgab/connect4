import React from 'react';
import {getAllByTestId, render, screen} from "@testing-library/react";
import App from './App';

describe('connect4',  () => {
  beforeEach(() => {
    render(<App />);
  });

  it('renders game board', () => {
    expect(screen.getByTestId('board')).toBeInTheDocument();
  });

  it('has 7 columns', () => {
    expect(screen.getAllByTestId('column').length).toBe(7);
  });

  it('has 6 slots in every column', () => {
    const columns = screen.getAllByTestId('column');
    columns.forEach(column => {
      const slots = getAllByTestId(column, 'slot');
      expect(slots.length).toBe(6);
    });
  });

  it('has a NextPlayer visual, starting Yellow', () => {
    expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
  });

  it('changes current player when click in free place', () => {
    screen.getAllByTestId('column')[0].click();
    expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-R');
    expect(screen.getByTestId('nextPlayer')).not.toHaveClass('Player-Y');

    screen.getAllByTestId('column')[0].click();
    expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
    expect(screen.getByTestId('nextPlayer')).not.toHaveClass('Player-R');
  });

  it('fills the lowest free cell when click on column', () => {
    const column = screen.getAllByTestId('column')[3];
    column.click();
    expect(getAllByTestId(column, 'slot')[0]).toHaveClass('Player-Y');

    column.click();
    expect(getAllByTestId(column, 'slot')[0]).toHaveClass('Player-Y');
    expect(getAllByTestId(column, 'slot')[1]).toHaveClass('Player-R');
  });

  it('does nothing when click on a full column', () => {
    Array.from({length: 7}).forEach(() => {
      screen.getAllByTestId('column')[3].click();
    });

    expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
    screen.getAllByTestId('column')[3].click();
    expect(screen.getByTestId('nextPlayer')).toHaveClass('Player-Y');
  });

  it ('highlights the possible play when hover', () => {
    const column = screen.getAllByTestId('column')[3];
    const slots = getAllByTestId(column, 'slot');

    expect(slots[0]).toHaveClass('FirstFree');
    expect(slots[1]).not.toHaveClass('FirstFree');

    column.click();
    expect(slots[1]).toHaveClass('FirstFree');
  });
});
