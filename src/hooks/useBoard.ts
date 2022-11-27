import {useState} from "react";
import {Piece, Player} from "../types";

const emptyBoard = Array(7).fill(
    Array(6).fill('')
) as Piece[][];

export const useBoard = (initialPlayer: Player) => {
    const [player, setPlayer] = useState<Player>(initialPlayer);
    const [pieces, setPieces] = useState(emptyBoard);

    const onRestart = () => {
        setPlayer(initialPlayer);
        setPieces(emptyBoard);
    };

    const lowestFreeSlotInCol = (colNum: number) =>
        pieces[colNum].findIndex(piece => piece === '');

    const onPlayColumn = (colNum: number) => {
        const floorNum = lowestFreeSlotInCol(colNum);
        if (floorNum === -1) {
            return;
        }
        setPieces(pieces.map((colOfPieces, col) =>
            col !== colNum
                ? colOfPieces
                : colOfPieces.map((piece, floor) =>
                    floor !== floorNum ? piece : player
                )
        ));
        setPlayer(player === 'R' ? 'Y' : 'R');
    };

    return {
        player,
        pieces,
        onRestart,
        onPlayColumn
    }
};
