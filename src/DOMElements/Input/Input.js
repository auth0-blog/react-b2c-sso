import React, {Component} from 'react';
import './Input.css';
import '../Shadow/Shadow.css';
import {applyMask, convertToObject} from "../../utils";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const value = convertToObject(this.props.type, event.target.value);
    this.setState({value});
    this.props && this.props.onChange(value);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: convertToObject(nextProps.type, nextProps.value || '')
    });
  }

  render() {
    const maskedValue = applyMask(this.props.type, this.state.value);
    return (
      <input
        className='react-auth0 shadow-lighter default-font-size'
        value={maskedValue}
        onChange={this.onChange}
        placeholder={'e.g. ' + this.props.placeholder}/>
    )
  }
}

export default Input;
