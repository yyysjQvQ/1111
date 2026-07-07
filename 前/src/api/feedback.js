import request from './request'
export const getFeedbackList = params => request({ url:'/feedback', method:'get', params })
export const submitFeedback = data => request({ url:'/feedback', method:'post', data })
export const getVoiceRating = voiceModelId => request({ url:`/feedback/rating/${voiceModelId}`, method:'get' })
