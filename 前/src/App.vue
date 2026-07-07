<template>
  <router-view v-if="isAuthPage" />
  <div v-else class="galaxy-shell">
    <aside class="sidebar glass-panel">
      <div class="brand"><span class="brand-orb">◉</span><div><b>Live Assistant</b><small>AI Voice Studio</small></div></div>
      <nav class="nav-list">
        <router-link v-for="item in nav" :key="item.path" :to="item.path"><component :is="item.icon" /><span>{{ item.label }}</span></router-link>
      </nav>
      <div class="pro-card"><b>银河 Pro</b><p>实时TTS · 声音克隆 · OBS直播支持</p><button>立即升级</button></div>
      <div class="user-card"><span class="avatar">{{ username.slice(0,1).toUpperCase() }}</span><div><b>{{ username || '主播用户' }}</b><small>已登录</small></div><el-button link @click="logout">退出</el-button></div>
    </aside>
    <main class="content-wrap">
      <header class="topbar"><div><p>Live Streaming Assistant</p><h1>{{ title }}</h1></div><div class="top-actions"><el-tag effect="dark" type="success">后端对接版</el-tag><el-button round @click="$router.push('/tts')">快速合成</el-button></div></header>
      <router-view />
    </main>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { House, Microphone, Headset, VideoPlay, Document, Star, DataAnalysis, QuestionFilled } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
const route = useRoute(), router = useRouter(), user = useUserStore()
const isAuthPage = computed(() => ['/login','/register'].includes(route.path))
const username = computed(() => user.username || 'streamer')
const title = computed(() => route.meta.title || '仪表盘')
const nav = [
  { path:'/dashboard', label:'首页仪表盘', icon:House }, { path:'/voices', label:'声音管理', icon:Microphone }, { path:'/tts', label:'TTS转换', icon:Headset }, { path:'/live', label:'直播面板', icon:VideoPlay }, { path:'/scripts', label:'脚本编辑', icon:Document }, { path:'/feedback', label:'声音评价', icon:Star }, { path:'/stats', label:'直播统计', icon:DataAnalysis }, { path:'/help', label:'帮助中心', icon:QuestionFilled }
]
function logout(){ user.logout(); router.push('/login') }
</script>
