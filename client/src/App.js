import './App.css';
import './style/base.css'
import './style/button.css'
import './style/font.css'
import './style/navbar.css'
import './style/icons.css'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Homepage } from './pages/Homepage';
import { NotFound } from './pages/NotFound';
import 'typeface-inter';
import { Login } from './pages/Login';
import  PersistLogin  from './components/Auth/PersistLogin'
import { RegisterPage } from './pages/RegisterPage';
import Payment from './components/Payment/Payment';
import Completion from './components/Payment/Completion';


const App = () => {
  return (
    
        <>
        <Routes>

            <Route path='*' element={<NotFound />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<RegisterPage />} />

          {/* <Route element={<PersistLogin />}> */}
            <Route path='/payment' element= { <Payment /> } />
            <Route path='/payment-completion' element= { <Completion /> } />
          {/* </Route> */}
        </Routes>
        </>
    
  );
}

export default App;
