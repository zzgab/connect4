import React from "react";
import {Piece} from "../types";

export const Slot = ({piece}: { piece: Piece }) => {
    return (
        <div data-testid="slot"
             className={`Slot ${piece ? `PlayerColor Player-${piece}` : 'Free'}`}
        />
    );
};