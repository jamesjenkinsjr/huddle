import config from '../config'
import TokenService from './token-service'

const PortalAPIService = {
  
  getPortalByID(id) {
    return fetch(
      `${config.API_ENDPOINT}/portal/${id}`,
      {
        method: 'GET',
        headers: TokenService.addBearerIfPresent()
      }
    ).then(res => {
      if (res.ok) {
        return res.json()
      }
      if (res.status === 401) {
        throw new Error('Unauthorized portal request')
      }
      throw new Error('Failed to fetch portal - please try again')
    })
  },
  createNewPortal(data) {
    return fetch(`${config.API_ENDPOINT}/portal`, {
      method: 'POST',
      headers: TokenService.addBearerIfPresent(),
      body: JSON.stringify(data),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Failed to generate new portal - please try again')
    })
  },
  getPortalMessages(id) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}/messages`, {
      method: 'GET',
      headers: TokenService.addBearerIfPresent(),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        throw new Error('No messages found')
    })
  },
  createPortalMessage(id, data) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}`, {
      method: 'POST',
      headers: TokenService.addBearerIfPresent(),
      body: JSON.stringify(data),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Message send failed - please try again')
    })
  },
  authorizeGatedPortal(id, data) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}/auth`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('Authentication failed!')
    })
  },
}

export default PortalAPIService
