const axios = require('axios')
const config = require('../../../config/config');
const BASE_URL = config.urlApiCallMeNow;

const post = (endpoint, body, config) => axios.post(`${BASE_URL}${endpoint}`, body, config)
const put = (endpoint, body, config) => axios.put(`${BASE_URL}${endpoint}`, body, config)
const patch = (endpoint, body, config) => axios.patch(`${BASE_URL}${endpoint}`, body, config)
const get = (endpoint, config) => axios.get(`${BASE_URL}${endpoint}`, config)

module.exports = {
  post,
  get,
  put,
  patch
}
