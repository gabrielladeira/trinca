import axios from 'axios'

const baseUrl = 'http://localhost:5000'

const get = (url) => {
  return axios.get(`${baseUrl}/${url}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
}

const post = (url, data) => {
  return axios.post(`${baseUrl}/${url}`, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
}

const put = (url, data) => {
  return axios.put(`${baseUrl}/${url}`, data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
    }
  })
}

export {
  get,
  post,
  put
}
