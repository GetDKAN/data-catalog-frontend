import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './Wrapper';

function IconList(props) {
  const ComponentToRender = props.component;
  let content = (<div></div>);
  let styles = {
    textAlign: props.titleAlign
  };
  console.log(props.items);
  // If we have items, render them
  if (props.items) {
      content = props.items.map((item, i) => (
          <ComponentToRender key={i} 
            title={item.title} 
            image={item.image}
            link={item.link}
            color={item.color}
            size={item.size}
            index={i}
          />
      ));
  } else {
      // Otherwise render a single component
      content = (<ComponentToRender />);
  }

  if (props.paneTitle) {
    return (
      <Wrapper className={ props.containerClass }>
        <h2 className="pane-title" style={styles}>{ props.paneTitle }</h2>
        <ul className={ props.listClass }>
          {content}
        </ul>
      </Wrapper>
    );
  }
  else {
    return (
      <Wrapper className={ props.containerClass }>
        <ul className={ props.listClass }>
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
  listClass: PropTypes.string,
  containerClass: PropTypes.string,
  paneTitle: PropTypes.string,
  titleAlign: PropTypes.string
};

export default IconList;
