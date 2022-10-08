import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const App = () => {
  return (
    <Container>
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Container>
          <Navbar.Brand className="font-weight-bold text-muted">
            Pito Escurre
          </Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
    </Container>
  );
};

export default App;
