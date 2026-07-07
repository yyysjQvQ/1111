import request from './request'
export const convertTTS = data => request({ url:'/tts/convert', method:'post', data })
export const getTTSStatus = taskId => request({ url:`/tts/status/${taskId}`, method:'get' })
export const getTTSHistory = () => request({ url:'/tts/history', method:'get' })
export const downloadTTS = taskId => request({ url:`/tts/download/${taskId}`, method:'get', responseType:'blob' })
