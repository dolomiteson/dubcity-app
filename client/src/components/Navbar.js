import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import EventForm from './EventForm';
import logo from '../assets/images/favicon.png'
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  return (
    <>
      <Navbar expand='lg' className="navbar-container bg-black">
        <Container fluid>
          <Navbar.Brand as={Link} to='/' className="text-primary">
            <img className="logo" alt="dubcity logo" src={logo} />
            Dub City VR Tournaments
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' className="bg-primary" />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/about' className="text-white">
                About
              </Nav.Link>
              <Nav.Link as={Link} to='/' className="text-white">
                Homepage
              </Nav.Link>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link onClick={Auth.logout} className="text-white">Logout</Nav.Link>
                  {/* <Nav.Link as={Link} to='/eventForm' className="text-white">
                    Event Form
                  </Nav.Link> */}
                  <Nav.Link onClick={() => setShowEventModal(true)} className="text-white">Event Form</Nav.Link>
                  <Nav.Link as={Link} to='/userPage' className="text-white">
                    <img className='avatarImage' src={userData.avatar}></img>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} className="text-white">Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='nav-bottom' id='nav-bottom-1'>

      </div>
      <div className='nav-bottom' id='nav-bottom-2'>

      </div>
      <div className='nav-bottom' id='nav-bottom-3'>

      </div>
      {/* set modal data up */}
      {/*Event Modal*/}
      <Modal
        size='lg'
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
        aria-labelledby='event-modal'>
        <Tab.Container defaultActiveKey='event'>
          <Modal.Header closeButton>
            <Modal.Title id='event-modal'>
              <Nav.Item>
                <Nav.Link eventKey='event'>Event Form</Nav.Link>
              </Nav.Item>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='event'>
                <EventForm handleModalClose={() => setShowEventModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>

        </Tab.Container>

      </Modal>
       {/*Login/Signup Modal*/}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignupForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;