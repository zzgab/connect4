import React from "react";
import './App.css';
import {NextPlayer} from "./components/NextPlayer";
import {Player} from "./types";
import {Board} from "./components/Board";
import {useBoard} from "./hooks/useBoard";
import {RestartButton} from "./components/RestartButton";

interface Props {
  initialPlayer?: Player;
}

export const App = ({initialPlayer}: Props) => {
  const {player, boardMap, onRestart, onPlayColumn, winner} = useBoard(initialPlayer ?? "Y");

  const onClickColumn = (colNum: number) => {
      !winner && onPlayColumn(colNum);
  };

  return (
    <div className={`App Player-${player} ${winner && 'Winner'}`}>
      <NextPlayer player={player} />
      <Board onClick={onClickColumn} boardMap={boardMap} />
      <RestartButton onClick={onRestart} />
    </div>
  );
}
