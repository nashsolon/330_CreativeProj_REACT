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

    // iconVis, NOT 'true'
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
    const { quizzes, setQuizzes } = useContext(QuizzesContext);
    const { setEditCode } = useContext(CreatorContext);
    const { setPage, socket } = useContext(GlobalContext);

    const sym = props.sym;
    const i = props.i;
    const id = sym.toLowerCase();

    let icon = sym === 'S' ? 'play_arrow' : 'edit';
    icon = sym === 'D' ? 'delete' : icon;

    const click = async () => {
        const name = quizzes[i].name;
        const code = quizzes[i].code;
        if (sym === 'S') {
            await setEditCode(code);
            console.log(`Start quiz ${name}`);
            setPage('hostgame')
        }
    
        else if (sym === 'E') {
            console.log(`Edit quiz ${name}`)
            await setEditCode(code);
            console.log('set edit code to ' + code);

            setPage('quiz');
        }
        else if (sym === 'D') {
            let temp = JSON.parse(JSON.stringify(quizzes));
            socket.emit('deleteQuiz', code);
            console.log(`Delete quiz ${name}`);
            temp.splice(i, 1);
            setQuizzes(temp);
        }
    }

    
    return (
        <div id={id} onClick={click} className='icon'>
            <i className="material-icons">{icon}</i>
        </div>
    )
}

const AddQuiz = () => {
    const { socket, page, setPage } = useContext(GlobalContext);
    const { quizzes, setQuizzes, setPopup, setPopIndex } = useContext(QuizzesContext);
    const { creator } = useContext(CreatorContext);
    const add = () => {
        let temp = JSON.parse(JSON.stringify(quizzes));
        console.log(`Create new quiz`);
        socket.emit('createQuiz', creator);
    };
    return (
        <div className='icon' onClick={add}>
            <i className="material-icons">add</i>
        </div>
    )
};

function CreatorPage(props) {
    const { socket, page, setPage } = useContext(GlobalContext);
    const { creator, setEditCode } = useContext(CreatorContext);

    // const [quizzes, setQuizzes] = useState([
    //     { name: '330 Quiz 1', code: '0214' },
    //     { name: '217 Quiz 2', code: '1623' },
    //     { name: 'Basic Facts', code: '1234' }
    // ]);
    const [quizzes, setQuizzes] = useState();

    // if (!quizzes || (quizzes && !quizzes[0].hasOwnProperty('name'))) {
    useEffect(() => {
        // console.log("hmm");
        socket.emit('getQuizNamesById', creator);
        // setQuizzes([{}]
    }, []);

    useEffect(() => {
        socket.on('quizCreated', async (code) => {
            await setEditCode(code);
            console.log('set edit code to ' + code);
            setPage('quiz');
        });
    }, [socket, setEditCode]);

    // else {
    //     console.log(quizzes[0].name);
    // }

    useEffect(() => {
        socket.on('getQuizNamesById', async (data) => {
            setQuizzes(data);
            console.log('got it at least');
            console.log(data);
        });
    }, [socket, setQuizzes]);

    let quizMap;
    if (quizzes) {
        quizMap = quizzes;
    }
    else {
        quizMap = [{}];
    }
    let allQuizzes = quizMap.map((quiz, index) => {
        return <QuizBox key={index} index={index}></QuizBox>
    });


    const cont = { quizzes, setQuizzes }

    return (
        <QuizzesContext.Provider value={cont}>
            <div className='questions'>
                {/* <Box just='left' name='Create a Game'></Box>
                <Box just='right' name='Manage/Start Games'></Box> */}
                {quizzes && allQuizzes}
                {/* {popup && <Popup></Popup>} */}
                <AddQuiz></AddQuiz>
                <br></br>
                <br></br>
            </div>
        </QuizzesContext.Provider>
    );
}

export default CreatorPage;