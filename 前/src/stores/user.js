import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, register } from '@/api/auth'

function normalizeAuth(res, fallbackUsername='') {
  const token = res?.token || res?.jwt || res?.accessToken || res?.access_token || res?.data?.token || ''
  const user = res?.user || res?.data?.user || {}
  return {
    token,
    username: user.username || res?.username || res?.data?.username || fallbackUsername || 'streamer',
    userId: user.id || res?.userId || res?.data?.userId || 1
  }
}

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const username = ref(localStorage.getItem('username') || '')
  const userId = ref(localStorage.getItem('userId') || '')
  const isLoggedIn = computed(() => !!token.value)
  async function doLogin(form) {
    const auth = normalizeAuth(await login(form), form.username)
    token.value = auth.token; username.value = auth.username; userId.value = auth.userId
    localStorage.setItem('token', auth.token); localStorage.setItem('username', auth.username); localStorage.setItem('userId', auth.userId)
    return auth
  }
  async function doRegister(form) { return register(form) }
  function logout() { token.value=''; username.value=''; userId.value=''; localStorage.removeItem('token'); localStorage.removeItem('username'); localStorage.removeItem('userId') }
  return { token, username, userId, isLoggedIn, doLogin, doRegister, logout }
})
