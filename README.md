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

```bash
docker network create b2c

docker run --name b2c-mongo-db \
  --network b2c \
  -p 27017:27017 \
  -d mongo

docker run --name first-b2c-api \
  --network b2c \
  -e "DOMAIN=products" \
  -e "MONGODB_URL=b2c-mongo-db:27017/first-b2c-api" \
  -e "AUTH0_DOMAIN=bk-samples.auth0.com" \
  -e "AUTH0_AUDIENCE=https://first-b2c-api.digituz.com.br" \
  -p 3001:3001 \
  -d brunokrebs/secured-wildcard

docker run --name second-b2c-api \
  --network b2c \
  -e "DOMAIN=products" \
  -e "MONGODB_URL=b2c-mongo-db:27017/second-b2c-api" \
  -e "AUTH0_DOMAIN=bk-samples.auth0.com" \
  -e "AUTH0_AUDIENCE=https://second-b2c-api.digituz.com.br" \
  -p 4001:3001 \
  -d brunokrebs/secured-wildcard
```

Start first application.

```bash
export REACT_APP_AUTH0_DOMAIN=bk-samples.auth0.com
export REACT_APP_AUTH0_AUDIENCE=https://first-b2c-api.digituz.com.br
export REACT_APP_AUTH0_CLIENT_ID=JCNBfSZ3OrKqI2yoVQ3vnhp6qaNcYl2c
export REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000/callback
export REACT_APP_REST_PORT=3001

npm start
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
