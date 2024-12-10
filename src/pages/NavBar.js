import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FaHome, FaTruck, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaKey } from 'react-icons/fa';
import '../assets/css/navbar.css';

const NavBar = ({ user }) => {
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 992) {
      setExpanded(false);
    }
  };

  return (
    <Navbar 
      bg="light" 
      expand="lg" 
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className="navbar-custom"
    >
      <Navbar.Brand href="/" onClick={handleLinkClick}>Rodud React.js website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {user ? (
            <>
              <Nav.Link as={NavLink} to="/dashboard" onClick={handleLinkClick}>
                <FaHome className="nav-icon" /> Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/order-request" onClick={handleLinkClick}>
                <FaTruck className="nav-icon" /> Order Request
              </Nav.Link>
              <Nav.Link as={NavLink} to="/profile" onClick={handleLinkClick}>
                <FaUser className="nav-icon" /> Profile
              </Nav.Link>
              <Nav.Link as={NavLink} to="/logout" onClick={handleLinkClick}>
                <FaSignOutAlt className="nav-icon" /> Logout
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login" onClick={handleLinkClick}>
                <FaSignInAlt className="nav-icon" /> Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/register" onClick={handleLinkClick}>
                <FaUserPlus className="nav-icon" /> Register
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
