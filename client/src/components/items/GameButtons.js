import GameButton from './GameButton';

function GameButtons(props) {
    return (
        <div className="gameButtons">
            <GameButton name="A" onClick={() => props.buttonClick("A")}></GameButton>
            <GameButton name="B" onClick={() => props.buttonClick("B")}></GameButton>
            <GameButton name="C" onClick={() => props.buttonClick("C")}></GameButton>
            <GameButton name="D" onClick={() => props.buttonClick("D")}></GameButton>
        </div>
    )
}

export default GameButtons;