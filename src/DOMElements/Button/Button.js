import React, {Component} from 'react';
import './Button.css';
import '../Shadow/Shadow.css';

class Button extends Component {
  render() {
    const className = 'react-auth0 shadow default-font-size ' + this.props.className;
    return (
      <button className={className}
              onClick={this.props.onClick}>
        {this.props.text}
      </button>
    )
  }
}

export default Button;
