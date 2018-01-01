import React, {Component} from 'react';
import Panel from '../DOMElements/Panel/Panel';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import './Home.css';
import Button from "../DOMElements/Button/Button";
import * as Auth0 from 'auth0-web';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {products: []};
    this.componentDidMount = loadProducts.bind(this);
  }

  render() {
    const rows = this.state.products;
    const authenticated = Auth0.isAuthenticated();
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
                {authenticated && <Button text='Buy' onClick={buy} />}
              </div>
            );
          })}
        </div>
      </Panel>
    );
  }
}

export default withRouter(props => <Home {...props} />);

async function loadProducts() {
  const config = {
    url: `http://localhost:${process.env.REACT_APP_REST_PORT}/products`,
  };

  const products = (await axios(config)).data;
  this.setState({ products });
}

async function buy() {
  const config = {
    method: 'POST',
    url: `http://localhost:${process.env.REACT_APP_REST_PORT}/buy`,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem(Auth0.ACCESS_TOKEN)}`
    }
  };

  const response = (await axios(config)).data;
  alert(response.message);
}
