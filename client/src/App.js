import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Routes from './Routes';

const App = () => {
  return (
    <Container>
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Pito Escurre
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              <LinkContainer to="/posts/new">
                <Nav.Link>Create</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes />
    </Container>
  );
};

export default App;
