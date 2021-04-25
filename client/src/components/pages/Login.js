import { React, useEffect, useState, useContext } from 'react';
import { BackButton } from '../items'
import GlobalContext from '../GlobalContext'
import CreatorContext from '../context/CreatorContext'
import firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyDurndzEwOnC_F37eV3DlqtubC8CLfa4cg",
    authDomain: "quiz-d961a.firebaseapp.com",
    projectId: "quiz-d961a",
    storageBucket: "quiz-d961a.appspot.com",
    messagingSenderId: "939117159928",
    appId: "1:939117159928:web:48013a6452deae99a3a20d",
    measurementId: "G-EBC41P964R"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth()

function Login() {
    const [failure, setFailure] = useState(false);
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");
    const { setPage, socket } = useContext(GlobalContext);
    const { setCreator } = useContext(CreatorContext);

    function handleEmailChange(e) {
        console.log("set email to " + e.target.value)
        setEmail(e.target.value);
    }
    function handlePassChange(e) {
        console.log("set pass to " + e.target.value)
        setPass(e.target.value);
    }
    function handleLogin(e) {
        //What to put here slash how do we access user and pass from up there
        
        console.log(email);
        console.log(pass);
        e.preventDefault();
        // socket.emit('login', {'email': email, 'pass': pass});

        // setPage('creator_home');

        auth.signInWithEmailAndPassword(email, pass)
        .then(userInfo => {

            console.log(userInfo);
            console.log(userInfo.user.uid)
            setCreator(userInfo.user.uid)
            setPage('creator_home');
        })
        .catch((error) => {
            setFailure(true);
            console.log(error.message);

        })
            
        

       
    }

    // useEffect(() => {
    //     socket.on("login", function (data) {
    //         // console.log(data);
    //         if (data.login_bool == true) {
    //             console.log(data);
    //             setPage('creator_home') //Need to set the new page here because this is asynchronous!!!!! Was firing before this completed before
    //             // return;
    //         }
    //         else {
    //             console.log('invalid sign in becase...' + data.err_message)
    //         }
    //     });

    // }, [socket, setPage]);

    return (
        <div className="loginForm">
            <form id='login_form'>
                <input id="email" placeholder="Email" onChange={n => handleEmailChange(n)} type="text"></input>
                <br></br>
                <input id="pass" placeholder="Password" onChange={n => handlePassChange(n)} type="password"></input>
                <br></br>
                <input id="sign_in" type="submit" value="Login" onClick={n => handleLogin(n)}></input>
                {failure && <p className="formFailure">Invalid Email/Password</p>}
            </form>
            <BackButton page='create'> </BackButton>
        </div>
    )
}

export default Login;