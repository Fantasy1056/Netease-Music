import axios from 'axios'

export const $http = axios.create({
  baseURL: 'http://127.0.0.1:3000/',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
})
