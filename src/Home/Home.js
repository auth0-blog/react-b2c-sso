import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="app-home">
        <p>This React application is secured with <a className="dashed" href="https://auth0.com/">Auth0</a>. Right now, the only option is
          to sign in. After signing in, you will be able to navigate to <Link to="/products" className="dashed">Products</Link>.</p>
      </div>
    );
  }
}

export default Home;
