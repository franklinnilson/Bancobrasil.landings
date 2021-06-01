const client = require('./client')
const ENDPOINT = '/bbmServicosPortalAdmin/svc/CallMeNow/call'

const callMeNow = async (telefone) => {
    let config = { headers: { 'Content-Type': 'application/json' }}
    try {
      let response = await client.post(ENDPOINT, {numTelefone: telefone, numOrigem : "42"}, config)
      console.log(response);
      return { status: response.status, data: response.data }
    } catch (e) {
        console.log(e);
      return e.response ? { status: e.response.status, error: e.response.data } : 'Not Internet Found'
    }
  }
  
module.exports = {
    callMeNow
}