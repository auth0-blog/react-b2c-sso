import React, {Component} from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import Header from './Header/Header.js';
import Home from './Home/Home.js';
import * as Auth0 from 'auth0-web';
import Callback from "./Callback/Callback";

Auth0.configure({
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
  redirectUri: process.env.REACT_APP_AUTH0_REDIRECT_URI,
  responseType: 'token id_token',
  scope: 'openid get:products'
});

class App extends Component {

  componentWillMount() {
    const self = this;

    Auth0.handleAuthCallback();
    Auth0.subscribe(async (signedIn) => {
      if (signedIn) {
        return self.setState({signedIn});
      }

      const ssoStatus = await Auth0.silentAuth('b2c-sso', process.env.REACT_APP_AUTH0_AUDIENCE, 'openid get:products');

      self.setState({
        signedIn: ssoStatus
      });
    });
  }

  render() {
    const {pathname} = this.props.location;
    if (Auth0.isAuthenticated() && pathname === '/callback') {
      return <Redirect to="/"/>
    }
    return (
      <div className="app">
        <Route path="/" component={Header}/>
        <Route exact path="/" component={Home}/>
        <Route path="/callback" component={Callback}/>
      </div>
    );
  }
}

// withRouter makes component route-aware so we can check `this.props.location`
export default withRouter(props => <App {...props}/>);
