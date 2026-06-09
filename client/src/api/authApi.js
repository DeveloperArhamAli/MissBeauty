import axiosClient from './axiosClient'

export const registerUser = async (data) => {
  return axiosClient.post('/api/users/register', data)
}

export const loginUser = async (data) => {
  return axiosClient.post('/api/users/login', data)
}

export const logoutUser = async () => {
  return axiosClient.get('/api/users/logout')
}

export const isLoggedIn = async () => {
  return axiosClient.get('/api/users/isLoggedIn')
}