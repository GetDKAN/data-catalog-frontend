/* eslint-disable */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import { Menu } from '@civicactions/data-catalog-components';
import Branding from './Branding';
import logo from '../../assets/images/logo-color.svg'

class Footer extends React.Component {

  render() {
    const menu1 = this.props.links ? <Menu items={this.props.links.footer1} menuId="leftnav"/> : null;
    const menu2 = this.props.links ? <Menu items={this.props.links.footer2} menuId="rightnav"/> : null;

    return (
      <Wrapper className="container-fluid">
        <div className="page-footer container">
          
            <Branding>
              <img src={logo} />
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
