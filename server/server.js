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

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://bk-samples.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://bk-samples.auth0.com/`,
  algorithms: ['RS256']
});

// create timesheets upload API endpoint
app.get('/products', checkJwt, jwtAuthz([ 'get:products' ]), function(req, res){
  res.status(201).send([]);
});

// launch the API Server at localhost:8080
app.listen(process.env.REACT_APP_REST_PORT);
