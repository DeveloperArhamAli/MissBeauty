import axiosClient from './axiosClient'

export const registerUser = async (data) => {
  return axiosClient.post('/users/register', data)
}

export const loginUser = async (data) => {
  return axiosClient.post('/users/login', data)
}

export const logoutUser = async () => {
  return axiosClient.get('/users/logout')
}

export const isLoggedIn = async () => {
  return axiosClient.get('/users/isLoggedIn')
}