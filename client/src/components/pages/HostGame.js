
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

function HostGame() {
    const q1 = { q: 'How many days are in a week?', a: ['7', '4', '9', '2'] }
    return (
        <InGame data={q1}></InGame>
    );
}

export default HostGame;