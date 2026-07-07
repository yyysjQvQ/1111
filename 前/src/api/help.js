import request from './request'
export const getHelpArticles = params => request({ url:'/help/articles', method:'get', params })
export const getHelpArticleDetail = id => request({ url:`/help/articles/${id}`, method:'get' })
export const searchHelpArticles = keyword => request({ url:'/help/search', method:'get', params:{ keyword } })
