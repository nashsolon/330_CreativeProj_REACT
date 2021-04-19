import GlobalContext from '../GlobalContext';
import { React, useState, useContext } from 'react';
// import { socket } from '../../socket';



function JoinForm() {
    // const socket = socketClient('http://127.0.0.1:5000');
    // console.log(socket);

    const [value, setValue] = useState('');
    const [failure, setFailure] = useState(false);
    const { page, setPage, socket } = useContext(GlobalContext);

    console.log(socket);

    socket.on('connect', () => {
        console.log("um")
    });

    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        console.log('Go to room ' + value);
        socket.emit("joinRoom", value);
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

        e.preventDefault();
    }
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