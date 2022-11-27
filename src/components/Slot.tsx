import React from "react";
import {Coin} from "../types";

export const Slot = ({coin}: { coin: Coin }) => {
    return (
        <div data-testid="slot"
             className={`Slot ${coin ? `PlayerColor Player-${coin}` : 'Free'}`}
        />
    );
};