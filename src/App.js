import React, {Component} from 'react';
import {Route, withRouter} from 'react-router-dom';
import Header from './Header/Header.js';
import Home from './Home/Home.js';

class App extends Component {
  render() {
    const {pathname} = this.props.location;
    return (
      <div className="app">
        <Route path="/" component={Header}/>
        <Route exact path="/" component={Home}/>
      </div>
    );
  }
}

// withRouter makes component route-aware so we can check `this.props.location`
export default withRouter(props => <App {...props}/>);
