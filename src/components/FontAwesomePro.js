/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react'

class FontAwesomePro extends React.PureComponent {
  render() {
    switch(this.props.icon) {
      case 'density-1':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 160 160">
            <path fill={this.props.fill} d="M141.441 46.748c0 1.664-1.35 3.014-3.014 3.014H17.572c-1.664 0-3.014-1.35-3.014-3.014V27.252c0-1.665 1.35-3.014 3.014-3.014h120.855c1.664 0 3.014 1.349 3.014 3.014v19.496zM141.441 128.748c0 1.664-1.35 3.014-3.014 3.014H17.572c-1.664 0-3.014-1.35-3.014-3.014v-19.496c0-1.665 1.35-3.014 3.014-3.014h120.855c1.664 0 3.014 1.349 3.014 3.014v19.496zM141.441 87.748c0 1.664-1.35 3.014-3.014 3.014H17.572c-1.664 0-3.014-1.35-3.014-3.014V68.252c0-1.665 1.35-3.014 3.014-3.014h120.855c1.664 0 3.014 1.349 3.014 3.014v19.496z"/>
          </svg>
        )

      case 'density-2':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 160 160">
            <path fill={this.props.fill} d="M141.551 36.002c0 1.757-1.35 3.182-3.014 3.182H17.682c-1.664 0-3.014-1.425-3.014-3.182V24.92c0-1.758 1.35-3.182 3.014-3.182h120.855c1.664 0 3.014 1.424 3.014 3.182v11.082zm0 20.943c0-1.758-1.35-3.182-3.014-3.182H17.682c-1.664 0-3.014 1.424-3.014 3.182v11.081c0 1.759 1.35 3.184 3.014 3.184h120.855c1.664 0 3.014-1.425 3.014-3.184V56.945zm0 32.026c0-1.758-1.35-3.183-3.014-3.183H17.682c-1.664 0-3.014 1.425-3.014 3.183v11.081c0 1.758 1.35 3.182 3.014 3.182h120.855c1.664 0 3.014-1.424 3.014-3.182V88.971zm0 32.025c0-1.758-1.35-3.182-3.014-3.182H17.682c-1.664 0-3.014 1.424-3.014 3.182v11.082c0 1.757 1.35 3.182 3.014 3.182h120.855c1.664 0 3.014-1.425 3.014-3.182v-11.082z"/>
          </svg>
        )

      case 'density-3':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 160 160">
            <path fill={this.props.fill} d="M141.624 51.054a3.015 3.015 0 0 1-3.014 3.014H17.755a3.015 3.015 0 0 1-3.014-3.014v-6.496a3.014 3.014 0 0 1 3.014-3.014H138.61a3.014 3.014 0 0 1 3.014 3.014v6.496zM142.015 30.76a3.015 3.015 0 0 1-3.014 3.014H18.146a3.015 3.015 0 0 1-3.014-3.014v-6.496a3.014 3.014 0 0 1 3.014-3.014h120.855a3.014 3.014 0 0 1 3.014 3.014v6.496zM141.624 91.642a3.015 3.015 0 0 1-3.014 3.014H17.755a3.015 3.015 0 0 1-3.014-3.014v-6.496a3.014 3.014 0 0 1 3.014-3.014H138.61a3.014 3.014 0 0 1 3.014 3.014v6.496zM141.624 71.348a3.015 3.015 0 0 1-3.014 3.014H17.755a3.015 3.015 0 0 1-3.014-3.014v-6.496a3.014 3.014 0 0 1 3.014-3.014H138.61a3.014 3.014 0 0 1 3.014 3.014v6.496zM141.624 111.936a3.015 3.015 0 0 1-3.014 3.014H17.755a3.015 3.015 0 0 1-3.014-3.014v-6.496a3.014 3.014 0 0 1 3.014-3.014H138.61a3.014 3.014 0 0 1 3.014 3.014v6.496zM141.624 132.229a3.015 3.015 0 0 1-3.014 3.014H17.755a3.015 3.015 0 0 1-3.014-3.014v-6.496a3.014 3.014 0 0 1 3.014-3.014H138.61a3.014 3.014 0 0 1 3.014 3.014v6.496z"/>
          </svg>
        )

      case 'arrow-to-bottom':
        return(
          <svg width={this.props.width} height={this.props.height} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-to-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-arrow-to-left fa-w-14">
            <path fill={this.props.fill} d="M348.5 232.1l-148 148.4c-4.7 4.7-12.3 4.7-17 0l-148-148.4c-4.7-4.7-4.7-12.3 0-17l19.6-19.6c4.8-4.8 12.5-4.7 17.1.2l93.7 97.1V44c0-6.6 5.4-12 12-12h28c6.6 0 12 5.4 12 12v248.8l93.7-97.1c4.7-4.8 12.4-4.9 17.1-.2l19.6 19.6c4.9 4.7 4.9 12.3.2 17zM372 428H12c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h360c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12z" className=""></path>
          </svg>
        );

      case 'arrow-to-left':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="arrow-to-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-arrow-to-left fa-w-14">
            <path fill={this.props.fill} d="M216 412.5l-148.5-148c-4.7-4.7-4.7-12.3 0-17L216 99.5c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L124.1 239H436c6.6 0 12 5.4 12 12v10c0 6.6-5.4 12-12 12H124.1L240 388.4c4.7 4.7 4.7 12.3 0 17l-7.1 7.1c-4.6 4.7-12.2 4.7-16.9 0zM12 448h8c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12h-8C5.4 64 0 69.4 0 76v360c0 6.6 5.4 12 12 12z" className=""></path>
          </svg>
        )

      case 'info-circle':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-info-circle fa-w-16 fa-2x">
            <path fill={this.props.fill} d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-36 344h12V232h-12c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h48c6.627 0 12 5.373 12 12v140h12c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12h-72c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12zm36-240c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32z" className=""></path>
          </svg>
        )

      case 'chevron-right':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} aria-hidden="true" className="svg-inline--fa fa-chevron-right fa-w-8 fa-2x" data-icon="chevron-right" data-prefix="far" viewBox="0 0 256 512">
            <path fill={this.props.fill} d="M24.707 38.101L4.908 57.899c-4.686 4.686-4.686 12.284 0 16.971L185.607 256 4.908 437.13c-4.686 4.686-4.686 12.284 0 16.971L24.707 473.9c4.686 4.686 12.284 4.686 16.971 0l209.414-209.414c4.686-4.686 4.686-12.284 0-16.971L41.678 38.101c-4.687-4.687-12.285-4.687-16.971 0z"/>
          </svg>
        )

      case 'times':
        return (
          <svg width={this.props.width} height={this.props.height} aria-hidden="true" focusable="false" data-prefix="fal" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="svg-inline--fa fa-times fa-w-10 fa-2x">
            <path fill={this.props.fill} d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z" className=""></path>
          </svg>
        )

      case 'facebook-circle':
        return (
          <svg width={this.props.width} height={this.props.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="15" fill="#6F757C"/>
            <path fill="#FFF" d="M14.238 24v-6.621H12.02v-2.631h2.218v-2.073c0-2.252 1.376-3.479 3.386-3.479.963 0 1.79.072 2.029.104v2.354h-1.394c-1.093 0-1.303.521-1.303 1.281v1.813h2.466l-.338 2.631h-2.127V24"/>
          </svg>
        )

      case 'linkedin-circle':
        return (
          <svg width={this.props.width} height={this.props.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="15" fill="#6f757c"/>
            <path fill="#FFF" d="M12.452 22.812H9.833v-8.43h2.618v8.43zm-1.31-9.58a1.53 1.53 0 0 1-1.517-1.53 1.517 1.517 0 0 1 3.033 0c0 .837-.679 1.53-1.516 1.53zm11.11 9.58h-2.613v-4.104c0-.978-.02-2.232-1.361-2.232-1.361 0-1.57 1.062-1.57 2.162v4.174h-2.615v-8.43h2.512v1.15h.036c.35-.663 1.204-1.361 2.478-1.361 2.649 0 3.137 1.745 3.137 4.011v4.63h-.004z"/>
          </svg>
        )

      case 'twitter-circle':
          return (
            <svg width={this.props.width} height={this.props.height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="15" fill="#6F757C"/>
              <path fill="#FFF" d="M21.939 12.954c.011.133.011.266.011.398 0 4.052-3.084 8.722-8.721 8.722a8.675 8.675 0 0 1-4.707-1.376c.247.028.484.038.741.038a6.137 6.137 0 0 0 3.805-1.31 3.07 3.07 0 0 1-2.866-2.126c.189.028.379.047.579.047.275 0 .55-.037.807-.104a3.064 3.064 0 0 1-2.458-3.008v-.039c.408.229.882.371 1.385.389a3.062 3.062 0 0 1-1.366-2.552c0-.569.151-1.091.417-1.546a8.715 8.715 0 0 0 6.32 3.207 3.407 3.407 0 0 1-.076-.702 3.064 3.064 0 0 1 3.065-3.065c.882 0 1.68.37 2.239.968a6.032 6.032 0 0 0 1.945-.74 3.057 3.057 0 0 1-1.347 1.689 6.12 6.12 0 0 0 1.765-.475 6.559 6.559 0 0 1-1.538 1.585z"/>
            </svg>
          )

      case 'long-arrow-right':
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} aria-hidden="true" focusable="false" data-prefix="far" data-icon="long-arrow-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-long-arrow-right fa-w-14">
            <path fill={this.props.fill} d="M295.515 115.716l-19.626 19.626c-4.753 4.753-4.675 12.484.173 17.14L356.78 230H12c-6.627 0-12 5.373-12 12v28c0 6.627 5.373 12 12 12h344.78l-80.717 77.518c-4.849 4.656-4.927 12.387-.173 17.14l19.626 19.626c4.686 4.686 12.284 4.686 16.971 0l131.799-131.799c4.686-4.686 4.686-12.284 0-16.971L312.485 115.716c-4.686-4.686-12.284-4.686-16.97 0z" className=""></path>
          </svg>
        )
    }
  }
}

FontAwesomePro.defaultProps = {
  icon: "long-arrow-right",
  fill: "black",
  width: 20,
  height: 20
};

export default FontAwesomePro
