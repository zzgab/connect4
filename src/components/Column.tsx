import {Piece} from "../types";
import {Slot} from "./Slot";
import React from "react";

export const Column = ({pieces, onClick}: { pieces: Piece[]; onClick: () => void }) => {
    return (
        <div data-testid={"column"}
             className="Column"
             onClick={onClick}
        >
            {pieces.map((cell, i) =>
                <Slot key={i}
                      piece={cell}
                />)}
        </div>
    );
};