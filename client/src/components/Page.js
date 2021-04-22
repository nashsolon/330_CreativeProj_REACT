import { React, useState, useContext } from 'react';
import GlobalContext from './GlobalContext';
import { CreateScreen, CreatorPage, Game, JoinScreen, Login, NameScreen, SignUp, StartScreen, HostGame } from './pages';
import UserContext from './context/UserContext';

function Page() {
    const { page } = useContext(GlobalContext);
    // const page = "hostgame";
    // const { user_obj, setUserObj } = React.useContext(UserObjContext);
    const [username, setUsername] = useState('');
    const [roomcode, setRoomcode] = useState('');
    const userContInfo = { username, roomcode, setUsername, setRoomcode }

    return (
        <div>
            {page === "start" && (<StartScreen></StartScreen>)}
            {page === "create" && (<CreateScreen></CreateScreen>)}
            {page === "login" && (<Login></Login>)}
            {page === "signup" && (<SignUp></SignUp>)}
            {page === "creator" && (<CreatorPage></CreatorPage>)}
            {page === "hostgame" && (<HostGame></HostGame>)}
            <UserContext.Provider value={userContInfo}>
                {page === "join" && (<JoinScreen></JoinScreen>)}
                {page === "name" && (<NameScreen></NameScreen>)}
                {page === "game" && (<Game></Game>)}
            </UserContext.Provider>
        </div>
    );
}

export default Page;