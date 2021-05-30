const front_url = 'https://www.matchistador.com';
const api_url = 'https://api.matchistador.com';

const front_url_dev = 'http://127.0.0.1:3000';
const api_url_dev = 'http://localhost:4000';

const dev = false;

const env_vars = {
  front_url: dev ? front_url_dev : front_url,
  api_url: dev ? api_url_dev : api_url,
};

export default env_vars;
