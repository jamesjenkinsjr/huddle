import config from '../config'

const TokenService = {
  getPortalToken: () => {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  hasPortalToken: () => {
    return !!TokenService.getPortalToken()
  },
  setPortalToken: token => {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  clearPortalToken: () => {
    window.localStorage.removeItem(config.TOKEN_KEY)
  },
  addBearerIfPresent: () => {
    if (TokenService.hasPortalToken) {
      return {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getPortalToken()}`,
      }
    } else {
      return {
        'content-type': 'application/json',
      }
    }
  },
}

export default TokenService
