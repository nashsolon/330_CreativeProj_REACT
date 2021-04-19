import React from 'react';
import Box from '../items/Box';

function StartScreen(props) {

    return (
        <div>
            <Box name="Create" just="right"></Box>
            <Box name="Join" just="left"></Box>
        </div>
    );
}

export default StartScreen;