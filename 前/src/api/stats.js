import request from './request'
export const getLiveStats = params => request({ url:'/stats/live', method:'get', params })
export const getTodayOverview = () => request({ url:'/stats/overview', method:'get' })
export const getLiveSessions = params => request({ url:'/stats/sessions', method:'get', params })
