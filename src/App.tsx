import React from "react";
import './App.css';
import {NextPlayer} from "./components/NextPlayer";
import {Player} from "./types";
import {Board} from "./components/Board";
import {useBoard} from "./hooks/useBoard";

interface Props {
  initialPlayer?: Player;
}

export const App = ({initialPlayer}: Props) => {
  const {player, pieces, onRestart, onPlayColumn} = useBoard(initialPlayer ?? "Y");

  const onClickColumn = (colNum: number) => {
      onPlayColumn(colNum);
  };

  return (
    <div className={`App Player-${player}`}>
      <NextPlayer player={player} />
      <Board onClick={onClickColumn} pieces={pieces} />
      <button data-testid="restart"
              className="Restart"
              onClick={onRestart} />
    </div>
  );
}
