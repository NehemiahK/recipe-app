import React from 'react';

import {BrowserRouter as Router,} from "react-router-dom";

import Routes from './components/Routes'
import UserContextProvider from './context/UserContext'
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <Routes />
      </Router>
    </UserContextProvider>

  );
}

export default App;
