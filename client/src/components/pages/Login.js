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
        setPage('creator_home');
        e.preventDefault();
    }
    return (
        <div className="loginForm">
            <form id='login_form'>
                <input id="user" placeholder="Username" onChange={n => handleUserChange(n)} type="text"></input>
                <br></br>
                <input id="pass" placeholder="Password" onChange={n => handlePassChange(n)} type="password"></input>
                <br></br>
                <input id="sign_in" type="submit" value="Login" onClick={n => handleLogin(n)}></input>
            </form>
            <BackButton page='create'> </BackButton>
        </div>
    )
}

export default Login;