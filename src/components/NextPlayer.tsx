import React from "react";
import { Player } from "../types";
import styled from "@emotion/styled";

const StyledDiv = styled.div`
    width: 70vw;
    height: 1vh;
    max-width: 70vh;
    border: solid thin black;
    margin: auto auto 20px;
`;

export const NextPlayer = ({player}: { player: Player }) => {
    return (
        <StyledDiv data-testid="nextPlayer"
             className={`PlayerColor Player-${player}`}
        />
    );
};