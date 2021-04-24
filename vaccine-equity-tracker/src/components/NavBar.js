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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">About the Index</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="cdc.gov/coronavirus/2019-ncov/index.html">COVID Information</NavDropdown.Item>
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