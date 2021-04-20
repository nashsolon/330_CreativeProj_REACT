import { React, useContext, useState } from 'react';
import { GameHeader, GameButtons } from '../items';
import UserContext from '../context/UserContext';

function Game(props) {
    const [clicked, setClicked] = useState("");
    const { username } = useContext(UserContext);

    return (
        <div>
            <GameHeader name={username} rank={21} score={150}></GameHeader>
            <GameButtons buttonClick={n => setClicked(n)}></GameButtons>
        </div>
    )
}
export default Game;