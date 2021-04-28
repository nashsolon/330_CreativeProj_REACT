import { Nav } from '../items';
import React, { useContext, useEffect, createContext, useState } from 'react'
import GlobalContext from '../GlobalContext';
import CreatorContext from '../context/CreatorContext';
// import { QuizBox, Box } from '../items';
import UserContext from '../context/UserContext';
import { useSpring, animated } from 'react-spring';
import Quiz from './Quiz';


const QuizzesContext = createContext();


// import React from 'react';

function QuizBox(props) {
    const i = props.index;
    const { quizzes, setQuizzes, setPopup, setPopIndex } = useContext(QuizzesContext);

    const click = () => {
        setPopIndex(i)
        setPopup(true);
    }

    const [iconsVis, setIconsVis] = useState(false);
    // onMouseOver={setIconsVis(true)} onMouseLeave={setIconsVis(false)}

    const enterRight = useSpring({ transform: iconsVis ? 'translate3d(0px,0px,0px)' : 'translate3d(300px,0px,0px)' });
    // style={enterRight}

    return (
        <div className='question' onMouseOver={() => setIconsVis(true)} onMouseLeave={() => setIconsVis(false)}>
            <p className='qTitle'> {quizzes[i].name} </p>
            {/* <input type='text' value={quiz.name} onChange={(e) => handleNameChange(e.target.value)}></input> */}

            {/* {iconsVis && (
                <div className='icons' >
                    <Icon sym={'S'}></Icon>
                    <Icon sym={'E'}></Icon>
                    <Icon sym={'D'}></Icon>
                </div>
            )} */}
            <animated.div className='icons' style={enterRight} >
                <Icon sym={'S'} i={i} code = {props.code}></Icon>
                <Icon sym={'E'} i={i} code = {props.code}></Icon>
                <Icon sym={'D'} i={i} code = {''}></Icon>
            </animated.div>
        </div>
    );
}

function Icon(props) {
    const { quizzes, setQuizzes, setPopup, setPopIndex } = useContext(QuizzesContext);
    const { socket, setPage } = useContext(GlobalContext);
    

    const sym = props.sym;
    const i = props.i;
    const id = sym.toLowerCase();

    const clickIcon = () => {
        
        if (sym === 'S') {
            let code = props.code
            // console.log('The quiz you want to start has a code of ' + code)
            
            socket.emit('get_one_quiz', {code: code});

        }
    
        else if (sym === 'E') {
            let code = props.code
            socket.emit('get_one_quiz', {code: code});
            
            // console.log('The quiz you want to edit has a code of ' + props.code)
           
            
        }
        else if (sym === 'D') {
            let temp = JSON.parse(JSON.stringify(quizzes));
            // console.log(`We want to delete ${i}`);
            temp.splice(i, 1);
            setQuizzes(temp);
        }
    }

    
    return (
        <div id={id} onClick={clickIcon} className='icon'>
            <p>{sym}</p>
        </div>
    )
}

function CreatorPage(props) {
    // const { page, setPage } = useContext(GlobalContext);
    const { socket, setPage } = useContext(GlobalContext)
    const { creator } = useContext(CreatorContext);
    console.log(creator)
    socket.emit('get_quizzes', { 'creator': creator })

    const [quizzes, setQuizzes] = useState([
        // { name: '330 Quiz 1', code: '0214' },
        // { name: '217 Quiz 2', code: '1623' },
        // { name: 'Basic Facts', code: '1234' }
    ]);

    useEffect(() => {
        // let data = { 'creator': creator }
        socket.once("get_quizzes", function (data) {
            // console.log(data)

            setQuizzes(data.quiz_arr);
        });
    }, [socket, setPage]);

    const [popup, setPopup] = useState(false);
    const [popIndex, setPopIndex] = useState(-1);

    const allQuizzes = quizzes.map((quiz, index) => {
        console.log(quiz);
        return <QuizBox key={index} index={index} code = {quiz.code}></QuizBox>
    });

    const cont = { quizzes, setQuizzes, popup, setPopup, popIndex, setPopIndex }

    return (
        <QuizzesContext.Provider value={cont}>
            <div className='questions'>
                {/* <Box just='left' name='Create a Game'></Box>
                <Box just='right' name='Manage/Start Games'></Box> */}
                {allQuizzes}
                {/* {popup && <Popup></Popup>} */}
            </div>
        </QuizzesContext.Provider>
    );
}

export default CreatorPage;