import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import img1 from '../../files/tv.png';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './nav-view.css'


export class NavBar extends React.Component {
  onLoggedOut() {
    localStorage.removeItem('token'); //removing the data from storgae
    localStorage.removeItem('user');
    this.setState({
        user:null
    })
}

  render() {
    let user = this.props.user;

    return(
    //the card is set up by hiearchy
    <Navbar expand="lg">
            <Navbar.Brand href="#home">
                <img className = 'navBarImage' src={img1} alt=""/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="User" className='dropDown'>
              <Nav.Link variant='primary' href={`/users/${user}`}><p className="linkText">User Profile</p></Nav.Link>
                <button className='navButton' onClick={() => {
                  this.onLoggedOut(), window.location.reload()
                    }}>
                      Sign Out
                </button>
              </NavDropdown>
            </Nav>
            </Navbar.Collapse>
    </Navbar>
    );
  }
}

