import axios, { type AxiosInstance } from 'axios'

export interface IResponseAPI {
  message: string
}

class HTTP {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        // add any authorization header or other request interceptors
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        // add any response interceptors like checking for 401 errors and refreshing tokens
        return response
      },
      (error) => {
        return Promise.reject(error)
      }
    )
  }
}

const http = new HTTP().instance

export default http
