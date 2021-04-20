import GlobalContext from '../GlobalContext';
import { React, useContext, useState } from 'react';
import UserContext from '../context/UserContext';

function NameForm() {
    const [value, setValue] = useState('');
    const [failure, setFailure] = useState(false);
    const { setPage } = useContext(GlobalContext);
    const { setUsername } = useContext(UserContext);

    function handleChange(e) {
        setValue(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (value == "Nash") {
            setFailure(true);
            console.log("Invalid name");
        }
        else {
            console.log("Name: " + value);
            setUsername(value);
            setPage('game');
        }
    }
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