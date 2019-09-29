import React from 'react'
import PropTypes from 'prop-types';
import StyledLink from './StyledLink'
import TopicImage from './TopicImage'

class IconListItem extends React.PureComponent {

  render() {
    let content = '';

    if (this.props.image) {
      // Image provided as a url.
      content = (
        <StyledLink to={this.props.link}>
          <img src={this.props.image} alt={this.props.title} />
          <div>{this.props.title}</div>
        </StyledLink>
      )
    }
    else {
      // Image provided by custom component.
      content = ( 
        <StyledLink to={this.props.link}>
          <TopicImage 
            title={this.props.title} 
            size={this.props.size} 
            fill={this.props.color}
          />
          <div>{this.props.title}</div>
        </StyledLink>
      )
    };

    return (
      <li key={this.props.identifier}>{content}</li>
    )
  }
}

IconListItem.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  image: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  identifier: PropTypes.string
};

export default IconListItem
