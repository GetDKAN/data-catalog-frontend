import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem } from "reactstrap";
import Wrapper from './Wrapper';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../assets/images/logo-color.svg'

const NavBar = ({navItems, expand, defaultStyling, customClasses}) => {
  const [isOpen, toggleOpen] = useState(false);

  return (
    <Wrapper className={`${customClasses} ${defaultStyling ? ' base-styles' : ''}`}>
      {expand && 
        <Navbar expand="md navbar-light">
          <NavbarBrand href="/"><img src={logo} alt="Civic DNA"/></NavbarBrand>
          <NavbarToggler onClick={() => toggleOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="navbar-nav mr-auto">
              {navItems.map((item, index) => (
                <NavItem key={index}>
                  {item}
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </Navbar>
      }
      {!expand && 
        <Navbar expand={false} className="container">
          <ul>
            {navItems.map((item, index) => (
              <NavItem key={index}>
                {item}
              </NavItem>
            ))}
          </ul>
        </Navbar>
      }
    </Wrapper>
  );
}

NavBar.defaultProps = {
  defaultStyling: true,
  expand: true,
  customClasses: ""
}

export default NavBar;
