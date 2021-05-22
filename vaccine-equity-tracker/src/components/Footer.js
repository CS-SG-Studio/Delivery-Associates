import React from 'react';
import './NavBar.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Footer extends React.Component{
  constructor() {
    super();
    this.state = {s1: "danger", s2: "secondary", s3: "secondary", s4: "secondary"}
  }

  changeColor(num) {
    this.setState({s1: (num === 0) ? "danger" : "secondary", s2: (num === 1) ? "danger" : "secondary", 
                   s3: (num === 2) ? "danger" : "secondary" , s4: (num === 3) ? "danger" : "secondary"})
  }

  render() {
      return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Navbar.Brand href="#home">
            CS52
          </Navbar.Brand>
        </Nav>
        <ButtonGroup aria-label="Basic example" className="mr-sm-2">
            <Button variant={this.state.s1} onClick={() => {this.props.parentCallback(0); this.changeColor(0);}}>Cases per Million</Button>
            <Button variant={this.state.s2} onClick={() => {this.props.parentCallback(1); this.changeColor(1);}}>GDP per Capita</Button>
            <Button variant={this.state.s3} onClick={() => {this.props.parentCallback(2); this.changeColor(2);}}>Life Expectancy</Button>
            <Button variant={this.state.s3} onClick={() => {this.props.parentCallback(3); this.changeColor(3);}}>Vaccination Rate</Button>
        </ButtonGroup>
      </Navbar>
    );
  }
}

export default Footer;
