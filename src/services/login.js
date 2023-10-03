import { axiosInstance } from './axios'
import { useStorage } from '@vueuse/core'
import axios from 'axios'
export const _loginStore = useStorage('_customer', {})

export async function Login_API(login) {
  try {
     const response = await axios.post('https://3b80-188-113-217-61.ngrok-free.app/api/v1/user/login/', {
        ...login
     })
    return [response.data, null]
  } catch (error) {
    return [null, error]
  }
}