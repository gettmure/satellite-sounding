import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/home">Satellite sounding</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/rendering">Rendering</Nav.Link>
      </Nav>
    </Navbar>
  );
}
