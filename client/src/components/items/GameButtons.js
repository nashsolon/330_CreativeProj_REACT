import GameButton from './GameButton';

function GameButtons(props) {

    if (props.clicked === "") {
        return (
            <div className="gameButtons">
                <GameButton name="A" id="A" onClick={() => props.buttonClick("A")}></GameButton>
                <GameButton name="B" id="B" onClick={() => props.buttonClick("B")}></GameButton>
                <GameButton name="C" id="C" onClick={() => props.buttonClick("C")}></GameButton>
                <GameButton name="D" id="D" onClick={() => props.buttonClick("D")}></GameButton>
            </div>
        );
    }
    else {
        return (
            <div className="gameButtons">
                <GameButton name="A" id={"A" === props.clicked ? "A" : "O"} onClick={() => props.buttonClick("A")}></GameButton>
                <GameButton name="B" id={"B" === props.clicked ? "B" : "O"} onClick={() => props.buttonClick("B")}></GameButton>
                <GameButton name="C" id={"C" === props.clicked ? "C" : "O"} onClick={() => props.buttonClick("C")}></GameButton>
                <GameButton name="D" id={"D" === props.clicked ? "D" : "O"} onClick={() => props.buttonClick("D")}></GameButton>
            </div>
        );
    }

}

export default GameButtons;