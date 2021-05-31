const client = require('./client')
const ENDPOINT = '/sistema/authenticate'

const getToken = async (username, password) => {
  let config = { headers: { 'Content-Type': 'application/json' } }
  try {
    let response = await client.post(ENDPOINT, { username, password }, config)
    return { status: response.status, data: response.data
  }
  } catch (e) {
    return e.response ? { status: e.response.status, error: e.response.data.errors[0] } : 'Not Internet Found'
  }
}
module.exports = {
  getToken
};
