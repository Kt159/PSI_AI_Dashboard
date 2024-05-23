"use client"

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

export default function UserNavbar() {
  return (
    <Navbar data-bs-theme="dark" expand="lg" style={{background: "#010057"}}>
      <Container>
        <Navbar.Brand as={Link} href="/">
          PSI AI Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">Overview</Nav.Link>
            <Nav.Link as={Link} href="/individual">Individual</Nav.Link>
            <Nav.Link as={Link} href="/model">Model Test</Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <NavDropdown title="Admin" align={{lg: 'end'}} id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} href="/settings">
                Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
