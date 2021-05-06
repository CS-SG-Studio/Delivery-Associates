import React from 'react';
import './NavBar.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

var data = 1;

function setValue(val) {
  data = val;
  console.log(data);
}

function Footer() {
  return (
    <Navbar bg="dark" variant="dark">
      <Nav className="mr-auto">
        <Navbar.Brand href="#home">
          CS52
        </Navbar.Brand>
      </Nav>
      <ButtonGroup aria-label="Basic example" className="mr-sm-2">
          <Button variant="secondary" onClick={() => setValue(1)}>Vaccination Rate</Button>
          <Button variant="secondary" onClick={() => setValue(2)}>GDP per Capita</Button>
          <Button variant="secondary" onClick={() => setValue(3)}>Life Expectancy</Button>
      </ButtonGroup>
    </Navbar>
  );
}

export default Footer;