import React, {Component} from 'react';
import './Header.css';
import * as Auth0 from 'auth0-web';
import Button from '../DOMElements/Button/Button';

class Header extends Component {

  logout() {
    Auth0.signOut({
      returnTo: process.env.REACT_APP_AUTH0_SIGN_OUT_REDIRECT_URI,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID
    });
  }

  render() {
    const authenticated = Auth0.isAuthenticated();
    return (
      <div className="app-header">
        <h1>B2C Store</h1>
        <div className="app-header-links">
          {!authenticated && <Button text="Sign In with Auth0" onClick={Auth0.signIn}/>}
          {authenticated && <Button text="Sign Out" onClick={this.logout}/>}
        </div>
      </div>
    );
  }
}

export default Header;
