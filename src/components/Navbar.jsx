// Navbar.js
import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../style/navbar.css'; 
import '../style/button.css'
import logosvg from '../img/emobuddy logo.svg'

export function CustomNavbar({ activePage }) {
  
  return (
    <>
    <header className="fixed-top">
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home"><span>
          <img src={logosvg} alt="" className='nav-logo' />
          </span></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link href="/" className={`nav-link ${activePage === "home" ? "active" : ""}`}>Home</Nav.Link>
            <Nav.Link href='/link' className='nav-link'>About Us</Nav.Link>
            <Nav.Link href='/link' className='nav-link'>Contact Us</Nav.Link>
            <Nav.Link href='/link' className='nav-link'>Pricing</Nav.Link>
            <Nav.Link href='/link' className='nav-link'>Why EmoBuddy?</Nav.Link>

            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item to="/">Action</NavDropdown.Item>
              <NavDropdown.Item to="/">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className='justify-content-end signupnav'>
          <div className="d-lg-flex">
            <a type='button' href="/register" className="btn ">Sign Up</a>
            <a type='button' href="/register" className="btn btn-ytp-primary ms-1">Login</a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
    </>
  );
}

