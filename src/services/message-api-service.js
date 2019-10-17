import config from '../config'
import TokenService from '../services/token-service'

const MessageService = {
  addMessage: (data) => {
    return fetch(`${config.API_ENDPOINT}/message`, {
      method: 'POST',
      headers: TokenService.addBearerIfPresent(),
      body: JSON.stringify(data)
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('Message send failed - please try again')
    })
  },
  getMessageByID: (id) => {
    return fetch(`${config.API_ENDPOINT}/message/${id}`, {
      method: 'GET',
      headers: TokenService.addBearerIfPresent(),
    })
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('Failed to fetch message')
    })
  }
}

export default MessageService