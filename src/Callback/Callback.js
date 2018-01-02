import React, {Component} from 'react';
import * as Auth0 from "auth0-web";

class Callback extends Component {
  componentWillMount() {
    Auth0.handleAuthCallback();
  }

  render() {
    return (
      <div>Loading profile...</div>
    );
  }
}

export default Callback;
