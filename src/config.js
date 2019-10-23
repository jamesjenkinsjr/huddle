export default {
  API_ENDPOINT:
    process.env.REACT_APP_API_URL || process.env.NODE_ENV === 'production'
      ? 'https://huddle-app-server.herokuapp.com/api'
      : 'http://localhost:8069/api',
  TOKEN_KEY: 'huddle-auth',
}
