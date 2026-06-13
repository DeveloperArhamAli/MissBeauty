import axios from 'axios'

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response?.data || error)
)

export default axiosClient