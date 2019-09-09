import React, { useState } from "react";
import { Link } from "gatsby";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem } from "reactstrap";
import Wrapper from './Wrapper';



const NavBar = () => {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <Wrapper className="container-fluid main-navigation">
      <Navbar expand="md navbar-dark">
        <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto">
            <NavItem>
              <Link activeClassName="active" to="/">Home</Link>
            </NavItem>
            <NavItem>
              <Link activeClassName="active" to="/search">Datasets</Link>
            </NavItem>
            <NavItem>
              <Link activeClassName="active" to="/topics">Topics</Link>
            </NavItem>
            <NavItem>
              <Link activeClassName="active" to="/about">About</Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </Wrapper>
  );
}

export default NavBar;
