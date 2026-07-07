import request from './request'
export const getScriptList = params => request({ url:'/scripts', method:'get', params })
export const getScriptDetail = id => request({ url:`/scripts/${id}`, method:'get' })
export const createScript = data => request({ url:'/scripts', method:'post', data })
export const updateScript = (id,data) => request({ url:`/scripts/${id}`, method:'put', data })
export const deleteScript = id => request({ url:`/scripts/${id}`, method:'delete' })
