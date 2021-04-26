import { Nav } from '../items';
import { React, useContext, useEffect } from 'react'
import GlobalContext from '../GlobalContext';
import CreatorContext from '../context/CreatorContext';
import { QuizBox, Box } from '../items';
import UserContext from '../context/UserContext';


// import React from 'react';

function CreatorPage(props) {
    // const { page, setPage } = useContext(GlobalContext);
    

    return (
        <div>
            
            <Box just = 'left' name='Create a Game'></Box>
            <Box just = 'right' name='Manage/Start Games'></Box>

            
                
              
            
        </div>
    );
}

export default CreatorPage;