import { React, useState, useContext } from 'react';
import GlobalContext from './GlobalContext';
import { CreateScreen, CreatorPage, Game, JoinScreen, Login, NameScreen, SignUp, StartScreen } from './pages';
import UserContext from './context/UserContext';

function Page() {
    const { page } = useContext(GlobalContext);
    // const { user_obj, setUserObj } = React.useContext(UserObjContext);
    const [username, setUsername] = useState('');
    const contInfo = { username, setUsername }

    return (
        <div>
            {page === "start" && (<StartScreen></StartScreen>)}
            {page === "create" && (<CreateScreen></CreateScreen>)}
            {page === "login" && (<Login></Login>)}
            {page === "signup" && (<SignUp></SignUp>)}
            {page === "creator" && (<CreatorPage></CreatorPage>)}
            {page === "join" && (<JoinScreen></JoinScreen>)}
            <UserContext.Provider value={contInfo}>
                {page === "name" && (<NameScreen></NameScreen>)}
                {page === "game" && (<Game></Game>)}
            </UserContext.Provider>
        </div>
    );
}

export default Page;