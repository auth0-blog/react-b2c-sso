## Installing Dependencies

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
export REACT_APP_AUTH0_AUDIENCE=https://homeproducts.ourcompany.com
export REACT_APP_AUTH0_CLIENT_ID=3J9rjUbkMZIgT1zVZ7wejKax5wEx9tg7
export REACT_APP_AUTH0_REDIRECT_URI=http://app.local:3000/callback
export REACT_APP_AUTH0_SIGN_OUT_REDIRECT_URI=http://app.local:3000/
export REACT_APP_REST_PORT=3001

npm start &
```

Start second application.

```bash
export PORT=4000
export REACT_APP_AUTH0_DOMAIN=bk-samples.auth0.com
export REACT_APP_AUTH0_AUDIENCE=https://kidsproducts.ourcompany.com
export REACT_APP_AUTH0_CLIENT_ID=oHMyRQoGiuSrBOoKZxNu6X1voSNHT1LS
export REACT_APP_AUTH0_REDIRECT_URI=http://app.local:4000/callback
export REACT_APP_AUTH0_SIGN_OUT_REDIRECT_URI=http://app.local:4000/
export REACT_APP_REST_PORT=4001

npm start &
```
