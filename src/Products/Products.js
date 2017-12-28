import React, {Component} from 'react';
import Panel from '../DOMElements/Panel/Panel';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import * as Auth0 from "auth0-web";
import './Products.css';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
    this.componentDidMount = loadProducts.bind(this);
  }

  render() {
    const rows = this.state.products;
    return (
      <Panel>
        <h2>List of Products</h2>
        <div className='productsList'>
          {rows.map((product, index) => {
            const productImage = `http://localhost:${process.env.REACT_APP_REST_PORT}/images/${product.image}`;
            const imageStyle = {
              maxWidth: '200px'
            };
            return (
              <div className='product' key={index}>
                <img style={imageStyle} src={productImage} alt="The nice product illustration" />
                <p>{product.title} - $ {product.price}</p>
              </div>
            );
          })}
        </div>
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
