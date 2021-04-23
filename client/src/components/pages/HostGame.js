
import React, { useState } from 'react';

function HostGameHeader(props) {
    return (
        <div className="hostGameHeader">
            <p>{props.text}</p>
        </div>
    )
}

function GameChoice(props) {
    return (
        <div className="gameChoice" id={props.id}>
            <p>{`${props.name}: ${props.text}`}</p>
        </div>
    )
}

function GameChoices(props) {
    const choices = props.choices;
    console.log(choices);
    if (props.correct === "") {
        return (
            <div className='gameChoices'>
                <GameChoice name="A" text={choices[0]} id="A"></GameChoice>
                <GameChoice name="B" text={choices[1]} id="B"></GameChoice>
                <GameChoice name="C" text={choices[2]} id="C"></GameChoice>
                <GameChoice name="D" text={choices[3]} id="D"></GameChoice>
            </div>
        );
    }
    else {
        return (
            <div className='gameChoices'>
                <GameChoice name="A" text={choices[0]} id={"A" === props.correct ? "A" : "O"}></GameChoice>
                <GameChoice name="B" text={choices[1]} id={"B" === props.correct ? "B" : "O"}></GameChoice>
                <GameChoice name="C" text={choices[2]} id={"C" === props.correct ? "C" : "O"}></GameChoice>
                <GameChoice name="D" text={choices[3]} id={"D" === props.correct ? "D" : "O"}></GameChoice>
            </div>
        );
    }
}

function InGame(props) {
    const data = props.data;
    console.log(data);
    const [correct, setCorrect] = useState('');
    return (
        <div>
            <HostGameHeader text={data.q}></HostGameHeader>
            <GameChoices correct={correct} choices={data.a}></GameChoices>
        </div >
    )
}

function rankify(place) {
    let dig = parseInt(place, 10) % 10;
    let end;
    switch (dig) {
        case '':
            end = '';
            break;
        case 1:
            end = "st";
            break;
        case 2:
            end = "nd";
            break;
        case 3:
            end = "rd";
            break;
        default:
            end = "th";
            break;
    }
    return place + end;
}

function PlayerRank(props) {
    return (
        <div className='playerRank'>
            <span className='rank'>{props.rank}</span>
            <span className='name'>{props.name}</span>
            <span className='score'>{props.score}</span>
        </div>
    );
}

function Waiting(props) {
    const data = props.data;
    let places = data.map((user, index) => {
        return <PlayerRank rank={rankify(index + 1)} name={user.name} score={user.score}></PlayerRank>
    });

    return (
        <div>
            <HostGameHeader text={'Scores'}></HostGameHeader>
            <div className='playerRanks'>
                {places}
            </div>
        </div>
    );
}

function HostGame() {
    const q1 = { q: 'How many days are in a week?', a: ['7', '4', '9', '2'] }
    const data =
        [
            { name: "Nick", score: 120 },
            { name: "Jason", score: 110 },
            { name: "Paul", score: 50 },
            { name: "Nash", score: 20 },
            { name: "Max", score: 10 }
        ];
    const [play, setPlay] = useState(false);
    if (play) {
        return (
            <InGame data={q1}></InGame>
        );
    }
    else {
        return (
            <Waiting data={data}></Waiting>
        );
    }
}

export default HostGame;