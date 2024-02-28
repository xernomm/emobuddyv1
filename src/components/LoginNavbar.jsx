// Navbar.js
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../style/navbar.css'; 
import '../style/button.css'
import logosvg from '../img/emobuddy logo.svg'
import { Link } from 'react-scroll';

export function LoginNavbar({ activePage }) {
  
  return (
    <>
   <header className="fixed-top">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <img src={logosvg} alt="" className='nav-logo' />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <a
                href="/"
                className='nav-link'
              >
                Home
              </a>
              <a
                href="/login"
                className='nav-link'
              >
                Login
              </a>
              <a
                href='/register'
                className='nav-link'
              >
                Register
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </>
  );
}

