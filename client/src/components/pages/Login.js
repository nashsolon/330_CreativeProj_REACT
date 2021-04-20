import React from 'react';
import { BackButton } from '../items'
import GlobalContext from '../GlobalContext'

function Login() {
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const { setPage } = React.useContext(GlobalContext);

    function handleUserChange(e) {
        console.log("set user to " + e.target.value)
        setUser(e.target.value);
    }
    function handlePassChange(e) {
        console.log("set pass to " + e.target.value)
        setPass(e.target.value);
    }
    function handleLogin(e) {
        //What to put here slash how do we access user and pass from up there
        console.log(user);
        console.log(pass);
        setPage('creator');
        e.preventDefault();
    }
    return (
        <div>

            <div id='login_header'>
                <strong>Login Screen</strong>
                <BackButton page='create'> </BackButton>
            </div>
            <form id='login_form'>
                <div id="user_form">
                    <label>Username</label><input id="user" onChange={n => handleUserChange(n)} type="text"></input>
                    <br></br>
                </div>
                <div id="pass_form">
                    <label>Password</label><input id="pass" onChange={n => handlePassChange(n)} type="text"></input>
                    <br></br>
                </div>
                <input id="sign_in" type="submit" value="Login" onClick={n => handleLogin(n)}></input>
                {/* <GameButtons buttonClick={n => buttonClick(n)}></GameButtons> */}

            </form>
        </div>
    )
}

export default Login;