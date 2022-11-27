import {useState} from "react";
import {Player, Stack} from "../types";
import {detectWinner} from "../logic/detectWinner";

const emptyBoard = Array(7).fill(
    Array(6).fill('')
) as Stack[];


export const useBoard = (initialPlayer: Player) => {
    const [player, setPlayer] = useState<Player>(initialPlayer);
    const [boardMap, setBoardMap] = useState(emptyBoard);
    const [winner, setWinner] = useState(false);

    const onRestart = () => {
        setPlayer(initialPlayer);
        setBoardMap(emptyBoard);
        setWinner(false);
    };

    const lowestFreeSlotInCol = (colNum: number) =>
        boardMap[colNum].findIndex(piece => piece === '');

    const onPlayColumn = (colNum: number) => {
        const floorNum = lowestFreeSlotInCol(colNum);
        if (floorNum === -1) {
            return;
        }
        setBoardMap((prevBoard) => {
            const newBoard = prevBoard.map((colOfPieces, col) =>
                col !== colNum
                    ? colOfPieces
                    : colOfPieces.map((piece, floor) =>
                        floor !== floorNum ? piece : player
                    )
            );

            const isGameWon = detectWinner(newBoard, colNum);
            if (!isGameWon) {
                setPlayer(player === 'R' ? 'Y' : 'R');
            }
            else {
                setWinner(true);
            }
            return newBoard;
        });
    };

    return {
        player,
        boardMap,
        onRestart,
        onPlayColumn,
        winner
    }
};
