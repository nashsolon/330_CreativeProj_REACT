
import React, { useState, useContext, useEffect } from 'react';
import GlobalContext from '../GlobalContext';
import CreatorContext from '../context/CreatorContext';

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

function PlayerBox(props) {
    if (props.id === "startBtn") {
        return (
            <div onClick={props.click} id={props.id} className='playerBox'>
                <p>{props.name}</p>
            </div>
        );
    }
    else {
        return (
            <div className='playerBox'>
                <p>{props.name}</p>
            </div>
        );
    }
}

function Scores(props) {
    const data = props.data;
    let places = data.map((user, index) => {
        return <PlayerRank key={index} rank={rankify(index + 1)} name={user.name} score={user.score}></PlayerRank>
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

function Wait(props) {
    const data = props.data;
    console.log("Waiting...")
    // console.log(data);
    let users;
    if (data) {
        users = data.map((user, index) => {
            return <PlayerBox key={index} name={user.name}></PlayerBox>
        });
    }

    return (
        <div>
            <HostGameHeader text={`Join with code: ${props.code}`}></HostGameHeader>
            {/* <div onClick={props.click}>Start</div> */}
            <div className='playerBoxes'>
                <PlayerBox click={props.click} id="startBtn" name="Start"></PlayerBox>
                {users}
            </div>
        </div>
    )
}

function HostGame() {
    const { socket } = useContext(GlobalContext);
    const { editCode } = useContext(CreatorContext);
    const [qs, setQs] = useState();
    // const code = '1234';

    useEffect(() => {
        socket.emit('hostGame', editCode);
    }, [socket]);

    const [data, setData] = useState();
    //     { name: "Nick", score: 120 },
    //     { name: "Jason", score: 110 },
    //     { name: "Paul", score: 50 },
    //     { name: "Nash", score: 20 },
    //     { name: "Max", score: 10 },
    //     { name: "Sasha", score: 8 },
    //     { name: "Michael", score: 8 },
    //     { name: "Kyle", score: 6 },
    //     { name: "Pranay", score: 1 }
    // ]);
    // console.log(data)
    const [mode, setMode] = useState('wait');
    const startGame = () => {
        socket.emit('startGame', { code: editCode });
        // setMode('play');
    };
    useState(() => {
        socket.on('startGame', (question) => {
            setQs({ q: question.q, a: question.a });
            setMode('play');
        });
    }, [socket, setMode]);
    useState(() => {
        socket.on('playerChange', ({ players }) => {
            console.log(players);
            setData(players);
        });
    }, [socket, setData]);

    useState(() => {
        socket.on('roundOver', () => {
            setMode('scores');
            setTimeout(() => socket.emit('startGame', { code: editCode }), 5000);
        });
    })

    if (mode === 'play') {
        return (
            <InGame data={qs}></InGame>
        );
    }
    else if (mode === 'scores') {
        return (
            <Scores data={data}></Scores>
        );
    }
    else if (mode === 'wait') {
        return (
            <Wait data={data} code={editCode} click={startGame}></Wait>
        );
    }
}

export default HostGame;