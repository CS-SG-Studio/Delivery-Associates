import React from 'react';
import './NavBar.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Footer extends React.Component{
  
  render() {
      return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Navbar.Brand href="#home">
            CS52
          </Navbar.Brand>
        </Nav>
        <ButtonGroup aria-label="Basic example" className="mr-sm-2">
            <Button variant="secondary" onClick={() => this.props.parentCallback(0)}>Vaccination Rate</Button>
            <Button variant="secondary" onClick={() => this.props.parentCallback(1)}>GDP</Button>
            <Button variant="secondary" onClick={() => this.props.parentCallback(2)}>Life Expectancy</Button>
        </ButtonGroup>
      </Navbar>
    );
  }
}

export default Footer;
