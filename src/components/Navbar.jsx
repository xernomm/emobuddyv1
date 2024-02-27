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

export function CustomNavbar({ activePage }) {
  
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
              <Link
                to="home"
                smooth={true}
                duration={500}
                className={`nav-link ${activePage === "home" ? "active" : ""}`}
              >
                Home
              </Link>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className={`nav-link ${activePage === "about" ? "active" : ""}`}

              >
                About Us
              </Link>
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className={`nav-link ${activePage === "contact" ? "active" : ""}`}

              >
                Contact Us
              </Link>
              <Link
                to="pricing"
                smooth={true}
                duration={500}
                className={`nav-link ${activePage === "pricing" ? "active" : ""}`}

              >
                Pricing
              </Link>
              <Link
                to="why-emobuddy"
                smooth={true}
                duration={500}
                className={`nav-link ${activePage === "why-emobuddy" ? "active" : ""}`}

              >
                Why EmoBuddy?
              </Link>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className='justify-content-end signupnav'>
            <div className="d-lg-flex">
              <a type='button' href="/register" className="btn ">Sign Up</a>
              <a type='button' href="/login" className="btn btn-ytp-primary ms-1">Login</a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </>
  );
}

