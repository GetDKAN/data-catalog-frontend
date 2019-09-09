import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

class Menu extends React.PureComponent {

  render() {
    const heading = this.props.title ? this.props.title : "";
    const direction = this.props.horizontal ? "nav-horizontal" : "";
    const classes = `${this.props.className} ${direction}`

    return (
      <Wrapper className={classes} aria-label={this.props.className}>
        { heading ? <h3>{heading}</h3> : '' }
        <ul role="menu">
        {
          this.props.items.map(function(item){
            return (
              <li key={item.url} role="none">
                <a role="menuitem" href={item.url} target={item.target}>{item.label}</a>
              </li>
            );
          })
        }
        </ul>
      </Wrapper>
    )
  }
}

Menu.defaultProps = {
  items: [],
  className: "navigation-menu",
  target: "_top"
};

Menu.propTypes = {
  items: PropTypes.any,
  className: PropTypes.any,
  title: PropTypes.string,
  horizontal: PropTypes.bool
};

export default Menu
