/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
//import Menu from '../Menu';
import { Menu } from '@civicactions/data-catalog-components';
import Branding from './Branding';
import logo from '../../assets/images/logo-white.svg'

class Footer extends React.Component {

  render() {
    const menu1 = this.props.links ? <Menu items={this.props.links.footer1} /> : null;
    const menu2 = this.props.links ? <Menu items={this.props.links.footer2} /> : null;

    return (
      <Wrapper className="container-fluid">
        <div className="page-footer">
          
            <Branding>
              <img src={logo} />
              <p>
                ICMA is known for its Code of Ethics and for the resources, networks, and expertise that help municipal leaders around the world grow professionally and make communities better, where we live, work, and play.
              </p>
              <p>
                Powered by <a href="http://getdkan.com">DKAN</a>
              </p>
              <div className="social">
                <a href="https://www.facebook.com/GetDKAN/"><i className="fa fa-facebook" aria-hidden="true" /></a>
                <a href="https://twitter.com/getdkan"><i className="fa fa-twitter" aria-hidden="true" /></a>
                <a href="https://dkan.slack.com/"><i className="fa fa-slack" aria-hidden="true" /></a>
                <a href="https://github.com/getdkan"><i className="fa fa-github" aria-hidden="true" /></a>
              </div>
            </Branding>

            {menu1}
            {menu2}

        </div>
      </Wrapper>
    );
  }
}

Footer.defaultProps = {
    state: "loading",
};

Footer.propTypes = {
    state: PropTypes.string,
    item: PropTypes.any,
    links: PropTypes.object
};

export default Footer;
