import { React, useState, useContext } from 'react';
import GlobalContext from './GlobalContext';
import { CreateScreen, CreatorPage, Game, JoinScreen, Login, NameScreen, SignUp, StartScreen } from './pages';

function Page() {
    const { page, setPage } = useContext(GlobalContext);
    // const { user_obj, setUserObj } = React.useContext(UserObjContext);

    return (
        <div>
            {page === "start" && (<StartScreen></StartScreen>)}
            {page === "create" && (<CreateScreen></CreateScreen>)}
            {page === "login" && (<Login></Login>)}
            {page === "signup" && (<SignUp></SignUp>)}
            {page === "creator" && (<CreatorPage></CreatorPage>)}
            {page === "join" && (<JoinScreen></JoinScreen>)}
            {page === "name" && (<NameScreen></NameScreen>)}
            {page === "game" && (<Game></Game>)}
        </div>
    );
}

export default Page;