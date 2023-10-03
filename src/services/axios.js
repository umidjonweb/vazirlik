import axios from 'axios'
import router from '../router'
import { _loginStore } from './login'

export const axiosInstance = axios.create({
  baseURL: 'https://3b80-188-113-217-61.ngrok-free.app/api/v1/',
  timeout: 20000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use(
  (config) => {
    
    const token = _loginStore.value?.access
    if (config.url === '/auth/v1/login') {
      return config
    }

    if (token) {
      config.headers.authorization = `Bearer ${token}`
    } else {
      setTimeout(() => {
        location.reload()
      }, 500)
      localStorage.clear()
      router.push(`/login?redirect=${location.pathname}`)
      return
    }

    return config
  },
  (error) => {

    return Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
   (error) => {
    if (error?.response?.status === 401) {
      _loginStore.value.access = ''
      router.push({name: 'login'})
    }
    return Promise.reject(error)
  }
)
