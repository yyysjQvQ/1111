import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const useMock = String(import.meta.env.VITE_USE_MOCK).toLowerCase() === 'true'
const mockDelay = () => new Promise(r => setTimeout(r, 280))

const request = axios.create({ baseURL: import.meta.env.VITE_API_BASE || '/api', timeout: 30000 })

function unwrap(payload) {
  if (payload && typeof payload === 'object') {
    if ('code' in payload && ![0, 200, '0', '200'].includes(payload.code)) throw new Error(payload.message || payload.msg || '请求失败')
    if ('success' in payload && payload.success === false) throw new Error(payload.message || payload.msg || '请求失败')
    if ('data' in payload && Object.keys(payload).some(k => ['code','success','message','msg'].includes(k))) return payload.data
  }
  return payload
}

const mock = {
  '/auth/login': d => ({ token:'mock-token', username:d.username || 'demo', userId:1, user:{ id:1, username:d.username || 'demo', role:'streamer' } }),
  '/auth/register': d => ({ token:'mock-token', username:d.username, userId:Date.now(), user:{ id:Date.now(), username:d.username, role:'streamer' } }),
  '/voices': () => ([{id:1,name:'银河主播声线',description:'清晰、有亲和力，适合带货直播',status:'就绪',created_at:'2026-07-06'},{id:2,name:'沉浸讲解声线',description:'平稳自然，适合知识类直播',status:'训练中',created_at:'2026-07-07'}]),
  '/audio/upload': () => ({ filePath:'/uploads/audio/sample.wav' }),
  '/voice/train': () => ({ taskId:'train-'+Date.now(), status:'训练中' }),
  '/tts/convert': () => ({ taskId:'tts-'+Date.now(), status:'完成', audioUrl:'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' }),
  '/scripts': () => ([{id:1,title:'开场欢迎词',category:'开场',content:'欢迎进入直播间，今天给大家准备了专属福利。'},{id:2,title:'促单话术',category:'促单',content:'喜欢的朋友可以先拍下，库存有限，错过就要等下一场。'}]),
  '/feedback': () => ([{id:1,voice_model_id:1,rating:5,comment:'声音自然，适合直播场景。',created_at:'2026-07-07'}]),
  '/stats/live': () => ({ liveMinutes: 126, ttsCount: 89, avgRating: 4.8, conversionRate: '12.6%', viewers:[120,180,260,320,420,390,510], interactions:[35,58,94,110,160,142,190] }),
  '/help/articles': () => ([{id:1,title:'如何上传音频并训练声音？',category:'声音训练',content:'进入声音管理，上传清晰音频，填写名称后提交训练。'},{id:2,title:'如何连接 OBS？',category:'直播支持',content:'在直播面板查看 OBS 状态，使用实时 TTS 播报。'}])
}

async function mockRequest(config) {
  await mockDelay()
  const url = config.url.replace(/^\/api/, '')
  const key = Object.keys(mock).find(k => url === k || (url.startsWith(k + '/') && config.method !== 'get'))
  if (config.method === 'post' && url === '/scripts') return { id: Date.now(), ...config.data }
  if (config.method === 'post' && url === '/feedback') return { id: Date.now(), ...config.data }
  if (config.method === 'delete') return { ok:true }
  if (key) return mock[key](config.data || config.params || {})
  return { ok:true }
}

request.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  config.headers = config.headers || {}
  if (token) config.headers.Authorization = `Bearer ${token}`
  if (config.data instanceof FormData) delete config.headers['Content-Type']
  return config
})

request.interceptors.response.use(res => unwrap(res.data), err => {
  const msg = err.response?.data?.message || err.response?.data?.msg || err.message || '请求失败'
  if (err.response?.status === 401) {
    localStorage.removeItem('token'); localStorage.removeItem('username'); localStorage.removeItem('userId')
    router.push('/login'); ElMessage.error('登录已过期，请重新登录')
  } else ElMessage.error(msg)
  return Promise.reject(err)
})

export default function apiRequest(config) { return useMock ? mockRequest(config) : request(config) }
