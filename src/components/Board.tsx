import {Stack} from "../types";
import {Column} from "./Column";
import React from "react";

export const Board = ({onClick, boardMap}: {
    boardMap: Stack[]; onClick: (colNum: number) => void
}) => {
    return (
        <div data-testid="board"
             className="Board"
        >
            {boardMap.map((column, i) =>
                <Column key={i}
                        onClick={() => onClick(i)}
                        coins={column}
                />)}
        </div>
    );
};