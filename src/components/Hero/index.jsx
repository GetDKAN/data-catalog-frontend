/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';
import defaultTheme from '../../theme/default'
import SearchInput from '../SearchInput'

class Hero extends React.Component {

  render() {
    const Background = this.props.image 
      ? `url(${this.props.image})` 
      : `linear-gradient(${defaultTheme.primaryDark}, ${defaultTheme.primary})`;
    const Align = this.props.alignment;

    return (
      <Wrapper className="hero" style={{ backgroundImage: Background }}>
        <div className={'block ' + Align}>
          <h1 className="hero-title">{this.props.title}{this.props.title2}</h1>
          <p>{this.props.intro}</p>
          <SearchInput/>
        </div>
      </Wrapper>
    );
  }
}

Hero.defaultProps = {
    state: "loading",
    title: "Welcome to DKAN",
    intro: "DKAN is an open-source data management platform. It treats data as content so that you can easily publish, manage, and maintain your open data no matter the size of your team or the level of technical expertise.",
    alignment: "center",
};

Hero.propTypes = {
    state: PropTypes.string,
    item: PropTypes.any,
};

export default Hero;
