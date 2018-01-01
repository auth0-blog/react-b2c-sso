// set dependencies
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

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

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header
  // and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}//`,
  algorithms: ['RS256']
});

app.post('/buy', checkJwt, jwtAuthz([ 'get:products' ]), (req, res) => {
  res.status(201).send({message: 'Thank you for buying. You make me happy!'});
});

// launch the API Server at the port configured in the
// REACT_APP_REST_PORT environment variable
app.listen(process.env.REACT_APP_REST_PORT);
