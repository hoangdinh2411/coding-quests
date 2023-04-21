import config from './config'
import axios from 'axios'
axios.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
}

const getToken = () => {
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')
  new URLSearchParams()
  return axios.post(config.api.authUrl, params, {
    headers: {
      Authorization:
        'Basic ' +
        new Buffer.from(
          config.api.clientId + ':' + config.api.clientSecret
        ).toString('base64'),
    },
  })
}

// const refreshToken = (refresh_token = '') => {
//   const params = new URLSearchParams()
//   params.append('grant_type', 'refresh_token')
//   params.append('refresh_token', refresh_token)
//   new URLSearchParams()
//   return axios.post(config.api.authUrl, params, {
//     headers: {
//       Authorization:
//         'Basic ' +
//         new Buffer.from(
//           config.api.clientId + ':' + config.api.clientSecret
//         ).toString('base64'),
//     },
//   })
// }

const fetching = (url) => {
  const token = JSON.parse(localStorage.getItem('token') || {})
  return axios.get(config.api.baseUrl + url, {
    headers: {
      Authorization: 'Bearer ' + token.access_token,
    },
  })
}

export { fetching, getToken }
