import React, { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { LinkContainer } from 'react-router-bootstrap';
import { useRecoilState } from 'recoil';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import userState from './atoms/user.atom';
import Routes from './Routes';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(userState);

  useEffect(() => {
    const logIn = async () => {
      await Auth.signIn('mvp-user@gmail.com', 'Passw0rd!');
      setIsAuthenticated(true);
    };

    if (!isAuthenticated) {
      logIn();
    }
  }, [isAuthenticated, setIsAuthenticated]);

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
                <Nav.Link>Upload</Nav.Link>
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
