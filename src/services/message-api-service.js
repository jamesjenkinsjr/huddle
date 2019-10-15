import config from '../config'

const MessageService = {
  addMessage: (data) => {
    return fetch(`${config.API_ENDPOINT}/message`, {
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
  },
  getMessageByID: (id) => {
    return fetch(`${config.API_ENDPOINT}/message/${id}`)
    .then(res => {
      if(res.ok) {
        return res.json()
      }
      throw new Error('Failed to fetch message')
    })
  }
}

export default MessageService