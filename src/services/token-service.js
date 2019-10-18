import config from '../config'

const TokenService = {
  getPortalToken: id => {
    return window.localStorage.getItem(`${config.TOKEN_KEY}-${id}`)
  },
  hasPortalToken: id => {
    return !!TokenService.getPortalToken(id)
  },
  setPortalToken: (id, token) => {
    window.localStorage.setItem(`${config.TOKEN_KEY}-${id}`, token)
  },
  clearPortalToken: id => {
    window.localStorage.removeItem(`${config.TOKEN_KEY}-${id}`)
  },
  addBearerIfPresent: id => {
    if (TokenService.hasPortalToken(id)) {
      return {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getPortalToken(id)}`,
      }
    } else {
      return {
        'content-type': 'application/json',
      }
    }
  },
}

export default TokenService
