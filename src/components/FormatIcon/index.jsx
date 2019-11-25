import React from 'react'
import Icon from './Icon'

class FormatIcon extends React.PureComponent {

  render() {
    return (
      <Icon format={this.props.format} fill={this.props.fill} width={this.props.width} height={this.props.height} />
    )
  }
}

FormatIcon.defaultProps = {
  format: "data",
  width: 50,
  height: 50,
};

export default FormatIcon