import { React, useState, useContext } from 'react';
import GlobalContext from './GlobalContext';
import { CreateScreen, CreatorPage, Game, JoinScreen, Login, NameScreen, SignUp, StartScreen, CreateGame, SavedGames, StartGame, UserInfo, HostGame} from './pages';
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
            {page === "creator_home" && (<CreatorPage></CreatorPage>)}
            {/* {page === "join" && (<JoinScreen></JoinScreen>)} */}
            <UserContext.Provider value={userContInfo}>
                {page === "creator" && (<CreatorPage></CreatorPage>)}
                {page === "hostgame" && (<HostGame></HostGame>)}
                                                    
                {page === "join" && (<JoinScreen></JoinScreen>)}
                {page === "name" && (<NameScreen></NameScreen>)}
                {page === "game" && (<Game></Game>)}
            </UserContext.Provider>
            {page === "create_game" && (<CreateGame></CreateGame>)}
            {page === "start_game" && (<StartGame></StartGame>)}
            {page === "user_info" && (<UserInfo></UserInfo>)}
            {page === "saved_games" && (<SavedGames></SavedGames>)}
        </div>
    );
}

export default Page;