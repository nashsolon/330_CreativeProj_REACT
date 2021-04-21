import GlobalContext from '../GlobalContext';
import { React, useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';

function NameForm() {
    const [value, setValue] = useState('');
    const [failure, setFailure] = useState(false);
    const { setPage, socket } = useContext(GlobalContext);
    const { setUsername, roomcode } = useContext(UserContext);

    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        console.log('Room code: ' + roomcode);
        socket.emit('join-with-name', { name: value, room: roomcode });
    }
    useEffect(() => {
        socket.on('join-with-name', (data) => {
            if (data.res == 1) {
                console.log("Name: " + value);
                setUsername(value);
                setPage('game');
            }
            else {
                const rsn = data.reason;
                console.log("Failed: " + rsn);
                setFailure(true);
            }
        });
    }, [socket]);

    return (
        <form onSubmit={handleSubmit}>
            <input id="code" value={value} onChange={handleChange} type="text" maxLength="10"></input>
            <br></br>
            <input id="joinRoom" type="submit" value="Join"></input>
            <br></br>
            {failure && <p className="formFailure">Invalid Name</p>}
        </form>
    )
}

export default NameForm;