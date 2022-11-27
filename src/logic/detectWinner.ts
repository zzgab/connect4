import {Coin, Player, Stack} from "../types";

const checkLine = (line: (Coin|false)[], color: Player): boolean => {
    let hasFour = 0;
    line.forEach(slot => {
        if (slot === color) {
            hasFour ++;
        } else if (hasFour < 4) {
            hasFour = 0;
        }
    });
    return hasFour === 4;
};

export const detectWinner = (boardMap: Stack[], colNum: number) => {
    const stack = boardMap[colNum];
    const topEmptyPos = stack.findIndex(coin => !coin);
    const coinFloor = topEmptyPos === -1 ? 5 : topEmptyPos - 1;
    const playerColor = stack[coinFloor] as Player;

    const horizontalLine = boardMap.map(col => col[coinFloor]);
    const diagUp = boardMap.map((col, i) => {
        const currentFloor = coinFloor - (colNum - i);
        return (currentFloor >= 0 && currentFloor < 6) && col[currentFloor];
    });
    const diagDown = boardMap.map((col, i) => {
        const currentFloor = coinFloor + (colNum -i);
        return (currentFloor >= 0 && currentFloor < 6) && col[currentFloor];
    });
    return checkLine(stack, playerColor) ||
        checkLine(horizontalLine, playerColor) ||
        checkLine(diagUp, playerColor) ||
        checkLine(diagDown, playerColor);
};
