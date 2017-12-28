import React, {Component} from 'react';
import Panel from '../DOMElements/Panel/Panel';
import Table from '../DOMElements/Table/Table';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import * as Auth0 from "auth0-web";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
    this.componentDidMount = loadProducts.bind(this);
  }

  render() {
    const headers = [
      {key: 'name', text: 'Name'},
      {key: 'phone', text: 'Phone'},
      {key: 'email', text: 'Email'},
      {key: 'heritage', text: 'Patrimony', type: 'currency'}
    ];
    const rows = this.state.products;
    return (
      <Panel>
        <h2>List of Products</h2>
        <Table headers={headers} rows={rows}/>
      </Panel>
    );
  }
}

export default withRouter(props => <Products {...props} />);

async function loadProducts() {
  const accessToken = localStorage.getItem(Auth0.ACCESS_TOKEN);
  const config = {
    url: `http://localhost:${process.env.REACT_APP_REST_PORT}/products`,
    headers: {'Authorization': `Bearer ${accessToken}`}
  };

  const products = (await axios(config)).data;
  this.setState({ products });
}
