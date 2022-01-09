// authAxios.js
import axios from 'axios'
import { getCookies } from './apps/helpers/Cookies/AdminCookies';

const access = getCookies('data')

let token = ''
if (access) token = access.token

let baseURL = process.env.REACT_APP_LOCAL_BASE_URL
if (process.env.REACT_APP_ENVIRONMENT == "production") {
  baseURL = process.env.REACT_APP_PRODUCTION_URL
} else if (process.env.REACT_APP_ENVIRONMENT == "development") {
  baseURL = process.env.REACT_APP_BASE_URL
}

const customInstance = axios.create({
  baseURL: baseURL,
  headers: { 'Authorization': token }
})

export default customInstance
