import GlobalContext from '../GlobalContext';
import { React, useState, useContext } from 'react';
import { BackButton } from '../items';

function SignUp() {
    const [signin_user, setUser] = useState("");
    const [signin_email, setEmail] = useState("");
    const [signin_pass, setPass] = useState("");
    const { page, setPage } = useContext(GlobalContext);


    function handleUser(e) {
        console.log("set user to " + e.target.value)
        setUser(e.target.value);
    }
    function handleEmail(e) {
        console.log("set pass to " + e.target.value)
        setEmail(e.target.value);
    }
    function handlePass(e) {
        console.log("set pass to " + e.target.value)
        setPass(e.target.value);
    }
    function handleSignUp(e) {
        //What to put here slash how do we access user and pass from up there
        console.log(signin_user)
        console.log(signin_email)
        console.log(signin_pass)
        // console.log(firebase)
        e.preventDefault();

        // firebase.auth().createUserWithEmailAndPassword(signin_email, signin_pass)
        //     // userCredential is the promise (response) from createUser... function
        //     .then((userCredential) => {
        //         // Signed in 
        //         let user = userCredential.user;
        //         console.log(user)
        //         user.updateProfile({
        //             displayName: signin_user
        //         })

        //         // ...
        //     })
        //     .catch((error) => {
        //         let errorCode = error.code;

        //         let errorMessage = error.message;
        //         console.log("You have not been signed up")
        //         console.log(errorCode)
        //         console.log(errorMessage)
        //         // ..
        //     });
        setPage('creator_home') //Need to set the new page here because this is asynchronous!!!!! Was firing before this completed before

    }
    return (
        <div>
            <BackButton page='create'> </BackButton>
            <form id='sigup_form'>
                <div id="user_sigup_form">
                    <label>Username</label><input id="user" onChange={n => handleUser(n)} type="text"></input>
                    <br></br>
                </div>
                <div id="email_signup_form">
                    <label>Email</label><input onChange={n => handleEmail(n)} type="text"></input>
                    <br></br>
                </div>
                <div id="pass_signup_form">
                    <label>Password</label><input onChange={n => handlePass(n)} type="text"></input>
                    <br></br>
                </div>
                <input id="sign_up" type="submit" value="Sign Up" onClick={n => handleSignUp(n)}></input>
                {/* <GameButtons buttonClick={n => buttonClick(n)}></GameButtons> */}

            </form>
        </div>
    )
}

export default SignUp;