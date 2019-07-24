import axios from 'axios'

export const base = axios.create(
  {
    baseURL: process.env.VUE_APP_SERVER,
    timeout: 120000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
)
