import React from "react";

export const RestartButton = (props: { onClick: () => void }) => {
    return <button data-testid="restart"
                   className="Restart"
                   onClick={props.onClick}/>;
}
