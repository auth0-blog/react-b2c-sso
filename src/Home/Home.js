import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="app-home">
        <p>
          You have to <strong>sign in</strong> to see the products. After signing in, you will be able to
          navigate to <Link to="/products" className="dashed">Products</Link>.
        </p>
      </div>
    );
  }
}

export default Home;
