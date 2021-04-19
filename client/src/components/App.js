// import '../App.css';
import { React, useState } from 'react';
import GlobalContext from './GlobalContext';
import Page from './Page'
// import '../../public/index.html';
import io from 'socket.io-client';

const socket = io();

// const socket = io();

function App() {
  const [page, setPage] = useState('start');
  const contextInfo = { page, setPage, socket };

  return (
    <div>
      <GlobalContext.Provider value={contextInfo}>
        <Page />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
