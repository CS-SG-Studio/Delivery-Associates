import React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

class Footer extends React.Component{
  constructor() {
    super();
    this.state = {s1: "secondary", s2: "secondary", s3: "secondary", s4: "danger", s5: "danger"}
  }

  changeColor(num) {
    this.setState({s1: (num === 0) ? "danger" : "secondary", s2: (num === 1) ? "danger" : "secondary", 
                   s3: (num === 2) ? "danger" : "secondary" , s4: (num === 3) ? "danger" : "secondary"})
  }

  flipVaccButton() {
    this.setState({s5: this.state.s5 === "secondary" ? "danger" : "secondary"})
  }

  render() {
      return (
      <Navbar bg="dark" variant="dark">
        <Nav className="mr-auto">
          <Navbar.Brand> Stanford CS + Social Good Studio </Navbar.Brand>
        </Nav>
        <Button style={{marginRight: '20px'}} variant={this.state.s5} onClick={() => {this.props.parentVaccCallback(); this.flipVaccButton();}}>Percent Vaccinated</Button>
        <ButtonGroup className="mr-sm-2">
            <Button variant={this.state.s1} onClick={() => {this.props.parentCallback(0); this.changeColor(0);}}>Cases per Million</Button>
            <Button variant={this.state.s2} onClick={() => {this.props.parentCallback(1); this.changeColor(1);}}>GDP per Capita</Button>
            <Button variant={this.state.s3} onClick={() => {this.props.parentCallback(2); this.changeColor(2);}}>Life Expectancy</Button>
            <Button variant={this.state.s4} onClick={() => {this.props.parentCallback(3); this.changeColor(3);}}>None</Button>
        </ButtonGroup>
      </Navbar>
    );
  }
}

export default Footer;
