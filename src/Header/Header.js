import React, {Component} from 'react';
import './Header.css';
import * as Auth0 from 'auth0-web';
import Button from "../DOMElements/Button/Button";
import Link from "../DOMElements/Link/Link";

class Header extends Component {
  render() {
    const authenticated = Auth0.isAuthenticated();
    return (
      <div className="app-header">
        <h1>B2C Store</h1>
        <div className="app-header-links">
          {!authenticated && <Button text="Sign In with Auth0" onClick={Auth0.signIn} />}
          {authenticated && <Link text="Products" to="/products" />}
          {authenticated && <Button text="Sign Out" onClick={Auth0.signOut} />}
        </div>
      </div>
    );
  }
}

export default Header;
