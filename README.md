## Installing Dependencies

```bash
npm i \
    auth0-js \
    auth0-web \
    axios \
    mask-js \
    react \
    react-dom \
    react-router \
    react-router-dom \
    react-scripts
```

## Launching the Application

- Create first api
- Add scope
- Create second api
- Add scope
- Create first client
- Add `http://localhost:3000/callback` to "Allowed Callback URLs"
- Add `http://localhost:3000` to "Allowed Web Origins"
- Create second client
- Add `http://localhost:4000/callback` to "Allowed Callback URLs"
- Add `http://localhost:4000` to "Allowed Web Origins"
- [Create "react-B2C-auth0-sso" project on Google](https://auth0.com/docs/connections/social/google)

Start first application.

```bash
export PORT=3000
export REACT_APP_AUTH0_DOMAIN=bk-samples.auth0.com
export REACT_APP_AUTH0_AUDIENCE=https://first-b2c-api.digituz.com.br
export REACT_APP_AUTH0_CLIENT_ID=JCNBfSZ3OrKqI2yoVQ3vnhp6qaNcYl2c
export REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000/callback
export REACT_APP_REST_PORT=3001

npm start &
```

Start second application.

```bash
export PORT=4000
export REACT_APP_AUTH0_DOMAIN=bk-samples.auth0.com
export REACT_APP_AUTH0_AUDIENCE=https://second-b2c-api.digituz.com.br
export REACT_APP_AUTH0_CLIENT_ID=lZizKzMTuEGuSlmtdWxsqC6vzH8qdsHQ
export REACT_APP_AUTH0_REDIRECT_URI=http://localhost:4000/callback
export REACT_APP_REST_PORT=4001

npm start
```
