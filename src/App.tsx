import React, {useMemo, useState} from "react";
import './App.css';

type Player = 'R' | 'Y';
type Piece = Player | '';

const Slot = ({piece, firstFree}: {firstFree: boolean; piece: Piece}) => {
  return (
    <div data-testid="slot"
         className={`Slot ${piece !== '' ? `Player-${piece}` : ''} ${firstFree && 'FirstFree'}`}
    />
  );
};

const Column = ({pieces, onClick}: {pieces: Piece[]; onClick: () => void}) => {
  const lowestFreeIndex = useMemo(() => pieces.findIndex(slot => slot === ''),
  [pieces]);

  return (
    <div data-testid={"column"}
         className="Column"
         onClick={onClick}
    >
      {pieces.map((cell, i) =>
        <Slot key={i}
              piece={cell}
              firstFree={i === lowestFreeIndex}
      />)}
    </div>
  );
};

const Board = ({onClick, pieces}: {pieces: Piece[][]; onClick: (colNum: number) => void}) => {
  return (
    <div data-testid="board"
         className="Board"
    >
      {pieces.map((columnOfPieces, i) =>
        <Column key={i}
          onClick={() => onClick(i)}
          pieces={columnOfPieces}
        />)}
    </div>
  );
};


const NextPlayer = ({player}: {player: Player}) => {
  return (
    <div data-testid="nextPlayer"
         className={`Slot NextPlayer Player-${player}`}
    />
  );
};

function App() {
  const [player, setPlayer] = useState('Y' as Player);

  const [pieces, setPieces] = useState(
    Array(7).fill(
      Array(6).fill('')
    ) as Piece[][]
  );

  const lowestFreeSlotInCol = (colNum: number) =>
    pieces[colNum].findIndex(piece => piece === '');

  const onClickColumn = (colNum: number) => {
    const floorNum = lowestFreeSlotInCol(colNum);
    if (floorNum === -1) {
      return;
    }
    setPieces(pieces.map((colOfPieces, col) => col !== colNum ? colOfPieces :
      colOfPieces.map((piece, floor) => floor !== floorNum ? piece : player)));
    setPlayer(player === 'R' ? 'Y' : 'R');
  };

  return (
    <div className={`App Player-${player}`}>
      <NextPlayer player={player} />
      <Board onClick={onClickColumn} pieces={pieces} />
    </div>
  );
}

export default App;
