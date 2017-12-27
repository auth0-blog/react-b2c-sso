import React, { Component } from 'react';
import Input from '../Input/Input';
import './LabeledInput.css';

class LabeledInput extends Component {
  render() {
    return(
      <label className="react-auth0">
        {this.props.label}
        <Input {...this.props}/>
      </label>
    )
  }
}

export default LabeledInput;
