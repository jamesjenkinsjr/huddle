import config from '../config';

const PortalAPIService = {
  getPortalByID(id) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}`)
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('Failed to fetch portal - please try again')
    })
  },
  createNewPortal() {
    return fetch(`${config.API_ENDPOINT}/portal`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json()
      }
      throw new Error('Failed to generate new portal - please try again')
    })
  }
}

export default PortalAPIService;