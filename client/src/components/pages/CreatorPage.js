import { Nav } from '../items';
import React from 'react';

function CreatorPage(props) {
    return (
        <div>
            <nav id="nav_bar">
                <Nav action='create_quiz' name='Create'></Nav>
                <Nav action='start_game' name='Start a Game'></Nav>
                <Nav action='saved_games' name='Saved Games'></Nav>
                <Nav action='user_info' name='User Info'></Nav>
                <Nav action='home' name='Home'></Nav>
                {/* <li className = 'link_nav'><a href="create.jsx">Create</a></li>
                <li className = 'link_nav'><a href="start.jsx">Start a Game</a></li>
                <li className = 'link_nav'><a href="saved.jsx">Saved Games</a></li>
                <li className = 'link_nav'><a href="user.jsx">User Info</a></li> */}
            </nav>
            <div id="welcome">
                Welcome,
            </div>
        </div>
    );
}

export default CreatorPage;