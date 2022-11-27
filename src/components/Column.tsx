import {Coin} from "../types";
import {Slot} from "./Slot";
import React from "react";

export const Column = ({coins, onClick}: { coins: Coin[]; onClick: () => void }) => {
    return (
        <div data-testid={"column"}
             className="Column"
             onClick={onClick}
        >
            {coins.map((cell, i) =>
                <Slot key={i}
                      coin={cell}
                />)}
        </div>
    );
};