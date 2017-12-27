import axios from 'axios';
import * as Auth0 from 'auth0-web';

export {
  loadEntityList
}

function loadEntityList(entity, audience, scope, sort) {
  return async function () {
    const accessToken = localStorage.getItem(Auth0.ACCESS_TOKEN);
    const config = {
      url: `http://localhost:${process.env.REACT_APP_REST_PORT}/`,
      params: {
        sort: sort || {}
      },
      headers: {'Authorization': `Bearer ${accessToken}`}
    };

    const entities = (await axios(config)).data;
    this.setState({
      [entity]: entities
    })
  }
}
