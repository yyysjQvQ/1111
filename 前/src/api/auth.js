import request from './request'
export const login = data => request({ url:'/auth/login', method:'post', data })
export const register = data => request({ url:'/auth/register', method:'post', data })
export const getUserInfo = () => request({ url:'/auth/userinfo', method:'get' })
