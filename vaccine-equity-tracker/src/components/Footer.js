import React from 'react';
import './NavBar.css';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          CS52: Delivery Associates
        </Navbar.Brand>
      </Navbar>
  );
}

export default Footer;