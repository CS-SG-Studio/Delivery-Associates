import React from 'react';
import './NavBar.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


function Footer() {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Navbar.Brand href="#home">
          CS52: Delivery Associates
        </Navbar.Brand>
      </Nav>
        <ButtonGroup aria-label="Basic example" className="mr-sm-2">
            <Button variant="secondary">Index</Button>
            <Button variant="secondary">GDP</Button>
            <Button variant="secondary">Mortality</Button>
        </ButtonGroup>
      </Navbar>
  );
}

export default Footer;