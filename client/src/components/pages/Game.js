import { React, useContext, useEffect, useState } from 'react';
import { GameHeader, GameButtons } from '../items';
import UserContext from '../context/UserContext';
import GlobalContext from '../GlobalContext';

function InGame(props) {
    return (
        <div>
            <GameHeader name={props.username} rank={props.rank} score={props.score}></GameHeader>
            <GameButtons clicked={props.clicked} buttonClick={n => props.click(n)}></GameButtons>
        </div>
    )
}

function Waiting(props) {
    return (
        <div className='waiting'>
            <GameHeader name={props.username} rank={props.rank} score={props.score}></GameHeader>
            <br></br><br></br>
            <strong id='message'>{props.message}</strong>
        </div>
    )
}

function Game(props) {
    const [clicked, setClicked] = useState("");
    const [playing, setPlaying] = useState(false);
    const [rank, setRank] = useState('1');
    const [score, setScore] = useState('0');
    const { socket } = useContext(GlobalContext);
    const { username } = useContext(UserContext);

    useEffect(() => {
        socket.on('startGame', () => {
            setClicked("");
            setPlaying(true);
        });
    }, [socket, setPlaying]);

    const userClick = ((n) => {
        if (clicked === "") {
            setClicked(n);
            socket.emit('userClick', { user: username, ans: n });
        }
    });

    return (
        <div>
            {playing && (<InGame username={username} rank={rank} score={score} clicked={clicked} click={n => userClick(n)}></InGame>)}
            {!playing && (<Waiting username={username} rank={rank} score={score} message={"The game will begin soon!"}></Waiting>)}
        </div>
    )
}
export default Game;