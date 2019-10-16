import config from '../config';

const PortalAPIService = {
  getPortalByID(id, password = '') {
    return fetch(`${config.API_ENDPOINT}/portal/${id}`, {
      method: 'GET',
      headers: {
        password: password
      }
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      if(res.status === 401) {
        throw new Error('Unauthorized portal request')
      }
      throw new Error('Failed to fetch portal - please try again')
    })
  },
  createNewPortal(data) {
    return fetch(`${config.API_ENDPOINT}/portal`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('Failed to generate new portal - please try again')
    })
  },
  getPortalMessages(id) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}/messages`)
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('No messages found')
    })
  },
  createPortalMessage(id, data) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('Message send failed - please try again')
    })
  }
}

export default PortalAPIService;