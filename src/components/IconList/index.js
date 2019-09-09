import React from 'react'
import PropTypes from 'prop-types'
import Wrapper from './Wrapper'

function IconList(props) {
  const ComponentToRender = props.component;
  let content = (<div></div>);
  const className = props.className;

  // If we have items, render them.
  if (props.items) {
      content = props.items.map((item) => (
        <ComponentToRender key={i} item={item} />
      ));
  } else {
      // Otherwise render a single component
      content = (<ComponentToRender />);
  }

  if (props.paneTitle) {
    return (
      <Wrapper className="container-fluid">
        <h2 className="pane-title">{ props.paneTitle }</h2>
        <ul className={ className }>
          {content}
        </ul>
      </Wrapper>
    );
  }
  else {
    return (
      <Wrapper className="container-fluid">
        <ul className={ className }>
          {content}
        </ul>
      </Wrapper>
    );
  }
}

IconList.defaultProps = {
  items: [],
  className: "icon-list",
  paneTitle: "Icon List"
};

IconList.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.array,
  className: PropTypes.string,
  paneTitle: PropTypes.string
};

export default IconList;
