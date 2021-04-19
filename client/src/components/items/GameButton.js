import React from 'react';

function GameButton(props) {
    const name = props.name;
    return (
        <div className="gameButton" id={props.name} onClick={props.onClick}>
            <p>{props.name}</p>
        </div>
    )
}

export default GameButton;