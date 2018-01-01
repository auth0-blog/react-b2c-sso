## Running

```bash
npm i
export REACT_APP_AUTH0_DOMAIN=bk-samples.auth0.com

export REACT_APP_AUTH0_AUDIENCE=https://homeproducts.ourcompany.com
export REACT_APP_REST_PORT=3001
npm start &

export REACT_APP_AUTH0_AUDIENCE=https://kidsproducts.ourcompany.com
export REACT_APP_REST_PORT=4001
npm start &
```
