import { React, useState } from 'react';
import { GameHeader, GameButtons } from '../items';

function Game(props) {
    const [clicked, setClicked] = useState("");

    function buttonClick(n) {
        setClicked(n);
    }
    return (
        <div>
            <GameHeader name="Sasha" rank={21} score={150}></GameHeader>
            <GameButtons buttonClick={n => buttonClick(n)}></GameButtons>
        </div>
    )
}
export default Game;