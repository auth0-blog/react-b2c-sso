import React, {Component} from 'react';
import Panel from '../DOMElements/Panel/Panel';
import Table from '../DOMElements/Table/Table';
import {withRouter} from 'react-router-dom';
import {loadEntityList} from '../RestFlex/RestFlex';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
    this.loadProductsList = loadEntityList('products', process.env.REACT_APP_AUTH0_AUDIENCE,
      'get:products').bind(this);
    this.componentDidMount = this.loadProductsList;
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
