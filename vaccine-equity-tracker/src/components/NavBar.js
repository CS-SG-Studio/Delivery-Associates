import React from 'react';
import './NavBar.css';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function NavBar() {
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand href="#home">COVID Vaccine Equity Tracker</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#about">About the Index</Nav.Link>
            <NavDropdown title="More Info" id="basic-nav-dropdown">
              <NavDropdown.Item><a href="https://vaccinefinder.org/search/" className="link">
                Find Vaccine Appointment</a></NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item><a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html" className="link">
                COVID-19 Information</a></NavDropdown.Item>
              <NavDropdown.Item><a href="https://www.cdc.gov/coronavirus/2019-ncov/vaccines/index.html" className="link">
                Vaccine Information</a></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search Country" className="mr-sm-2" />
            <Button variant="danger">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
  );
}

export default NavBar;