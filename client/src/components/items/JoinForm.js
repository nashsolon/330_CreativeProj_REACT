import GlobalContext from '../GlobalContext';
import React, { useState, useContext, useEffect } from 'react';
// import { socket } from '../../socket';



function JoinForm() {
    // const socket = socketClient('http://127.0.0.1:5000');
    // console.log(socket);

    const [value, setValue] = useState('');
    const [failure, setFailure] = useState(false);
    const { setPage, socket } = useContext(GlobalContext);

    // console.log(socket);

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log("uh")
    //     });
    // });

    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        console.log('Go to room ' + value);
        socket.emit("joinRoom", value);


        e.preventDefault();
    }
    useEffect(() => {
        socket.once("joinRoom", function (ans) {
            if (ans == 1) {
                console.log("Let's go!");
                setPage('name');
            }
            else {
                console.log("rip");
                setFailure(true);
            }
        });
    }, [socket]);
    return (
        <form onSubmit={handleSubmit}>
            <input id="code" value={value} onChange={handleChange} type="text" maxLength="4"></input>
            <br></br>
            <input id="joinRoom" type="submit" value="Join"></input>
            <br></br>
            {failure && <p className="formFailure">Invalid Room</p>}
        </form>
    );
}

export default JoinForm;