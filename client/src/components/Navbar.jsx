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
import * as Icon from 'react-bootstrap-icons'
import axios from '../utils/axios';

export function CustomNavbar({ activePage }) {
  
  const userMail = sessionStorage.getItem('userEmail');
  console.log(userMail);

  const baseUrl = process.env.REACT_APP_BASE_URL
  const protocol = window.location.protocol;

  const logoutUrl = `${protocol}//${baseUrl}/logout`;

  const handleLogout = async () => {
    try {
        const userEmail = sessionStorage.getItem('userEmail'); 
        await axios.delete(logoutUrl, { data: { email: userEmail } }); 
        sessionStorage.clear(); 
        localStorage.clear(); 
        window.location.href = '/'; 
    } catch (error) {
        console.error('Error logging out:', error);
    }
};


  
  
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
                  href="/"
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

            {!userMail && (

              <Navbar.Collapse className='justify-content-end signupnav'>
              <div className="d-lg-flex">
                <a type='button' href="/register" className="btn ">Sign Up</a>
                <a type='button' href="/login" className="btn btn-ytp-primary ms-1">Login</a>
              </div>
            </Navbar.Collapse>

            )}

            {userMail && (
              <NavDropdown className='nav-link' title={userMail ? `${userMail}` : "User"} id="basic-nav-dropdown" >
              <NavDropdown.Item className='px16' href="#profile"><Icon.PersonFill className='mb-1 lead me-2' />  My Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
              <Icon.Cash className='mb-1 lead me-2' /> Subscriptions
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} className='text-danger' href="#action/3.4">
                Logout <Icon.BoxArrowRight className='mb-1 lead ms-2' />
              </NavDropdown.Item>
            </NavDropdown>

            )}
            
          </Container>
        </Navbar>
    </header>
    </>
  );
}

