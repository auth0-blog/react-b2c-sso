import React, {Component} from 'react';
import './Panel.css';
import '../Shadow/Shadow.css';

class Panel extends Component {
  render() {
    return (
      <div className='react-auth0 shadow-center'>
        {this.props.children}
      </div>
    )
  }
}

export default Panel;
