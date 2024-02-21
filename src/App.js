import logo from './logo.svg';
import './App.css';
import './style/base.css'
import './style/button.css'
import './style/font.css'
import './style/navbar.css'
import './style/icons.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Homepage } from './pages/Homepage';
import { NotFound } from './pages/NotFound';
import 'typeface-inter';


const App = () => {
  return (
    
        <>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
        </>
    
  );
}

export default App;
