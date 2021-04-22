import GlobalContext from '../GlobalContext';
import React, { useState, useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

function JoinForm() {

    const [value, setValue] = useState('');
    const [failure, setFailure] = useState(false);
    // const [tempCode, setTempCode] = useState('');
    const { setPage, socket } = useContext(GlobalContext);
    const { setRoomcode } = useContext(UserContext);

    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        setFailure(false);
        // setTempCode(value)
        console.log('Go to room ' + value);
        socket.emit("joinRoom", value);
        e.preventDefault();
    }
    useEffect(() => {
        socket.on("joinRoom", function (data) {
            if (data.res === 1) {
                console.log("Successfully joined room: " + data.room);
                setRoomcode(data.room);
                setPage('name');
            }
            else {
                console.log("Join room unsuccessful");
                setFailure(true);
            }
        });
    }, [socket, setRoomcode, setPage]);
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