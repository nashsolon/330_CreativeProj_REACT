import React, { useState, useEffect, useContext, createContext } from 'react';
import GlobalContext from '../GlobalContext';
import CreatorContext from '../context/CreatorContext';

const QuizContext = createContext();

function Question(props) {
    const i = props.index;
    const { quiz, setQuiz } = useContext(QuizContext);
    // let question = props.question;
    // console.log(question);
    const handleChange = (field, change) => {
        let temp = JSON.parse(JSON.stringify(quiz));
        temp.questions[i][field] = change;
        setQuiz(temp);
    };

    const deleteQuestion = (index) => {
        let temp = JSON.parse(JSON.stringify(quiz));
        console.log(`We want to delete ${index}`);
        temp.questions.splice(index, 1);
        setQuiz(temp);
    }



    return (

        <div className='question'>
            <p className='qTitle'>Question</p>
            <input type='text' value={quiz.questions[i].q} onChange={(e) => handleChange('q', e.target.value)}></input>
            <p>Answer</p>
            <input type='text' value={quiz.questions[i].c} onChange={(e) => handleChange('c', e.target.value)}></input>
            <p>Incorrect Answer</p>
            <input type='text' value={quiz.questions[i].i1} onChange={(e) => handleChange('i1', e.target.value)}></input>
            <p>Incorrect Answer</p>
            <input type='text' value={quiz.questions[i].i2} onChange={(e) => handleChange('i2', e.target.value)}></input>
            <p>Incorrect Answer</p>
            <input type='text' value={quiz.questions[i].i3} onChange={(e) => handleChange('i3', e.target.value)}></input>
            <p id='delete' onClick={() => deleteQuestion(i)}>&#215;</p>
        </div>

    );
}

function LooksEmpty() {
    return (
        <div className='noQs'>
            <p>This looks empty; add a question?</p>
        </div>
    );
}

function AddQuestion() {
    const { quiz, setQuiz } = useContext(QuizContext);

    const addQuestion = () => {
        let temp = JSON.parse(JSON.stringify(quiz));
        let obj = { q: '', c: '', i1: '', i2: '', i3: '' };
        temp.questions.push(obj);
        setQuiz(temp);
    };

    return (
        <div className='addQuestion' onClick={addQuestion}>
            <p>+</p>
        </div>
    );
}

function QuizName() {
    const { quiz, setQuiz } = useContext(QuizContext);

    const handleNameChange = (change) => {
        let temp = JSON.parse(JSON.stringify(quiz));
        temp.name = change;
        setQuiz(temp);

    };


    return (
        <div className='question'>
            <p className='qTitle'> Quiz Name </p>
            <input type='text' value={quiz.name} onChange={(e) => handleNameChange(e.target.value)}></input>
        </div>
    );
}

function SubmitQuiz() {
    const { socket } = useContext(GlobalContext);
    const { quiz, setQuiz } = useContext(QuizContext);
    const { creator } = useContext(CreatorContext);




    function handleSubmitQuiz() {
        let gen_code = Math.floor(Math.random() * 10000)
        console.log(gen_code)

        let temp = JSON.parse(JSON.stringify(quiz));
        temp.creatorId = creator;
        temp.roomCode = gen_code;
        setQuiz(temp);
        console.log('submitted');
        socket.emit('submit_quiz', { temp })

    }


    console.log(quiz)

    useEffect(() => {
        // socket.
    })
    return (

        <div className='submitQuiz' onClick={handleSubmitQuiz}>
            <p>Save Quiz</p>
        </div>
    )
}

function Quiz(props) {
    const [quiz, setQuiz] = useState({
        name: 'This Quiz',
        creatorId: 0,
        roomCode: 0,
        questions: [
            {
                i2: '9',
                i3: '2',
                q: 'How many days are in a week?',
                i1: '4',
                c: '7'
            },
            {
                i2: '16',
                i1: '9',
                i3: '3',
                c: '12',
                q: 'How many months are in a year?'
            },
            {
                i3: 'Mt. Nash',
                c: 'Mt. Everest',
                q: "What's the tallest mountain in the world?",
                i2: 'Mt. Denali',
                i1: 'K2'
            }
        ]
    });
    // const [quiz, setQuiz] = useState(props.quiz);
    let questions = quiz.questions;
    // console.log(`Question type is ${Array.isArray(questions)}`);
    const questionsComp = questions.map((q, index) => {
        return <Question key={index} index={index}></Question>
        // return <p>q</p>;
    });
    // console.log("is it an array?" + Array.isArray(questionsComp));
    return (
        <QuizContext.Provider value={{ quiz, setQuiz }}>
            <div className='questions'>
                <QuizName></QuizName>
                {quiz.questions[0] && questionsComp}
                {/* {!quiz.questions[0] && (<LooksEmpty></LooksEmpty>)} */}
                <AddQuestion></AddQuestion>
                <SubmitQuiz></SubmitQuiz>
                <br></br>
            </div>
        </QuizContext.Provider>
    );
}

export default Quiz;