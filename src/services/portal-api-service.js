import config from '../config'
import TokenService from './token-service'

const PortalAPIService = {
  getPortalByID(id) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}`, {
      method: 'GET',
      headers: TokenService.addBearerIfPresent(id),
    }).then(res => {
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
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(res => {
      if (res.ok) {
        return res.json()
      } else if (res.status === 400) {
        return res.json().then(resJSON => {
          if (resJSON.error === 'expiry_timestamp is invalid') {
            throw new Error(
              'Invalid expiration. Please check format and that date and time are in the future.'
            )
          } else if (resJSON.error === 'Expiry is required') {
            throw new Error('Expiration is required')
          }
        })
      }
      throw new Error('Failed to fetch portal - please try again')
    })
  },
  getPortalMessages(id) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}/messages`, {
      method: 'GET',
      headers: TokenService.addBearerIfPresent(id),
    }).then(res => {
      if (res.ok) {
        return res.json()
      }
      throw new Error('No messages found')
    })
  },
  createPortalMessage(id, data) {
    return fetch(`${config.API_ENDPOINT}/portal/${id}`, {
      method: 'POST',
      headers: TokenService.addBearerIfPresent(id),
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
