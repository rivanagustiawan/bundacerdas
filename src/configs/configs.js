const ENV = 'prod'

const SERVER_URL_LOCAL = 'http://127.0.0.1:8000'
const SERVER_URL_PROD = 'https://api-wi.schverse.my.id'

const BASE_URL = ENV === 'local' ? SERVER_URL_LOCAL : SERVER_URL_PROD

const configs = {
  BASE_URL: BASE_URL,
  API_URL: `${BASE_URL}/api`
}

export default configs
