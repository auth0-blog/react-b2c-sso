// set dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();

// enable the use of request body parsing middleware
app.use(bodyParser.json());

// enable cross-origin request
app.use(cors());

// serve images
app.use(express.static('static'));

// deciding the portal type based on
// the REACT_APP_REST_PORT env variable
const products = process.env.REACT_APP_REST_PORT === '3001'
  ? require('./producs-house.json')
  : require('./producs-kids.json');

// API endpoint to list products
app.get('/products', (req, res) => {
  res.status(201).send(products);
});

// launch the API Server at the port configured in the
// REACT_APP_REST_PORT environment variable
app.listen(process.env.REACT_APP_REST_PORT);
