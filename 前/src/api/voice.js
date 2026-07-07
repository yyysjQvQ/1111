import request from './request'
export const getVoiceList = () => request({ url:'/voices', method:'get' })
export const getVoiceDetail = id => request({ url:`/voices/${id}`, method:'get' })
export const deleteVoice = id => request({ url:`/voices/${id}`, method:'delete' })
export const updateVoice = (id,data) => request({ url:`/voices/${id}`, method:'put', data })
export const createVoice = data => request({ url:'/voices', method:'post', data })
export const uploadAudio = formData => request({ url:'/audio/upload', method:'post', data: formData })
export const startVoiceTrain = data => request({ url:'/voice/train', method:'post', data })
export const getTrainStatus = taskId => request({ url:`/voice/train/status/${taskId}`, method:'get' })
