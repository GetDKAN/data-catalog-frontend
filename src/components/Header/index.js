import React, { Component } from "react";
import Wrapper from "./Wrapper";
import logo from "../../assets/images/logo.svg";

class Header extends Component {
  render() {
    return (
      <Wrapper className="container-fluid">
        <div className="branding row">
          <div className="col-lg-7 col-md-12">
            <a href="/" title="getdkan.com" className="logo">
              <img className="logo" alt="logo" src={logo} />
            </a>
          </div>
          <div className="col-lg-5 col-md-12"></div>
        </div>
      </Wrapper>
    );
  }
}

export default Header;
