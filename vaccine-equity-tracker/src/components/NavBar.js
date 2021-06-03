import React from 'react';
import './NavBar.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';


class NavBar extends React.Component{

  constructor() {
    super();
    this.state = {val : ""}
  }

  render() {
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
          <Navbar.Brand>COVID Vaccine Equity Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={() => {this.props.showModal();}}>About the Site</Nav.Link>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search Country" 
                           className="mr-sm-2" value={this.state.val}
                           onChange={e => {this.setState({ val: e.target.value });}}
                           onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}/>
              <Button variant="danger" onClick={() => {this.props.searchCountry(this.state.val);}}>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
    );
  }
}

export default NavBar;