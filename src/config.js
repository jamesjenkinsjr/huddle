export default {
  API_ENDPOINT:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT.APP.API.KEY
      : 'http://localhost:8069/api',
}
