import React from 'react';
import './NavBar.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
              {/* <NavDropdown title="More Info" id="basic-nav-dropdown">
                <NavDropdown.Item href="https://vaccinefinder.org/search/" className="link">
                  Find Vaccine Appointment</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" className="link">
                  COVID-19 Information</NavDropdown.Item>
                <NavDropdown.Item href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html" className="link">
                  Vaccine Information</NavDropdown.Item>
              </NavDropdown> */}
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