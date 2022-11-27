import {Piece} from "../types";
import {Column} from "./Column";
import React from "react";

export const Board = ({onClick, pieces}: {
    pieces: Piece[][]; onClick: (colNum: number) => void
}) => {
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