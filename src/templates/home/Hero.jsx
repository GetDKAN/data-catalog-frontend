import React, { useState } from 'react';
import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import { SearchInput } from '@civicactions/data-catalog-components';

const Hero = ({
  alignment,
  title,
  intro
}) => {
  const [query, setQuery] = useState('');
  // const background = this.props.image 
  //     ? `url(${this.props.image})` 
  //     : `linear-gradient(${defaultTheme.primaryDark}, ${defaultTheme.primary})`;
  //style={{ backgroundImage: background }}
  function handleSubmit(event) {
    event.preventDefault();
    navigate(`/search?q=${query}`)
  }

  return(
    <div className="hero" >
      <div className={'block ' + alignment}>
        <h1 className="hero-title">{title}</h1>
        <p>{intro}</p>
        <form onSubmit={(event) => handleSubmit(event)}>
          <SearchInput
            onChangeFunction={(event) => setQuery(event.target.value)}
            onResetFunction={() => setQuery('')}
            showSubmit={true}
            value={query}
            resetContent={'Clear text'}
          />
        </form>
      </div>
    </div>
  );
}

Hero.defaultProps = {
  alignment: 'center',
  title: 'Welcome to DKAN',
  intro: 'DKAN is an open-source data management platform. It treats data as content so that you can easily publish, manage, and maintain your open data no matter the size of your team or the level of technical expertise.',
};

Hero.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  alignment: PropTypes.string,
};


export default Hero;
