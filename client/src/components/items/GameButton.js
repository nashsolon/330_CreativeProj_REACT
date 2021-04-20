import React from 'react';

function GameButton(props) {
    return (
        <div className="gameButton" id={props.name} onClick={props.onClick}>
            <p>{props.name}</p>
        </div>
    )
}

export default GameButton;