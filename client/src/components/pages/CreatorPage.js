import { Nav } from '../items';
import React, { useContext, useEffect, createContext, useState } from 'react'
import GlobalContext from '../GlobalContext';
import CreatorContext from '../context/CreatorContext';
// import { QuizBox, Box } from '../items';
import UserContext from '../context/UserContext';
import { useSpring, animated } from 'react-spring';


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
                <Icon sym={'S'} i={i}></Icon>
                <Icon sym={'E'} i={i}></Icon>
                <Icon sym={'D'} i={i}></Icon>
            </animated.div>
        </div>
    );
}

function Icon(props) {
    const { quizzes, setQuizzes, setPopup, setPopIndex } = useContext(QuizzesContext);

    const sym = props.sym;
    const i = props.i;
    const id = sym.toLowerCase();
    const click = () => {
        if (sym === 'S') {

        }
        else if (sym === 'E') {

        }
        else if (sym === 'D') {
            let temp = JSON.parse(JSON.stringify(quizzes));
            // console.log(`We want to delete ${i}`);
            temp.splice(i, 1);
            setQuizzes(temp);
        }

    }
    return (
        <div id={id} onClick={click} className='icon'>
            <p>{sym}</p>
        </div>
    )
}

// function Popup(props) {

//     const { quizzes, setQuizzes, setPopup, popIndex, setPopIndex } = useContext(QuizzesContext);


//     return (
//         <div className='popup'>
//             <p className='title'>{quizzes[popIndex].name}</p>
//         </div>
//     );
// }

function CreatorPage(props) {
    // const { page, setPage } = useContext(GlobalContext);

    const [quizzes, setQuizzes] = useState([
        { name: '330 Quiz 1', code: '0214' },
        { name: '217 Quiz 2', code: '1623' },
        { name: 'Basic Facts', code: '1234' }
    ]);

    const [popup, setPopup] = useState(false);
    const [popIndex, setPopIndex] = useState(-1);

    const allQuizzes = quizzes.map((quiz, index) => {
        return <QuizBox key={index} index={index}></QuizBox>
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