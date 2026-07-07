<template>
  <div class="page page-narrow">
    <PageHeader title="仪表盘" subtitle="查看今日数据、最近会话和前端联调入口。">
      <el-button type="primary" @click="$router.push('/tts')">开始合成</el-button>
    </PageHeader>
    <div class="grid grid-4" v-loading="loading">
      <StatCard label="声音模型" :value="overview.voiceCount || 0" desc="已创建模型" icon="Microphone" />
      <StatCard label="TTS 次数" :value="overview.ttsCount || 0" desc="累计合成任务" icon="Headset" />
      <StatCard label="脚本数量" :value="overview.scriptCount || 0" desc="可用于直播" icon="Document" />
      <StatCard label="直播场次" :value="overview.liveCount || 0" desc="历史会话" icon="VideoPlay" />
    </div>
    <div class="grid grid-2" style="margin-top:16px">
      <div class="card">
        <h3 class="panel-title">快速操作</h3>
        <el-space wrap>
          <el-button type="primary" @click="$router.push('/voices')">上传声音</el-button>
          <el-button @click="$router.push('/tts')">文本转语音</el-button>
          <el-button @click="$router.push('/scripts')">新建脚本</el-button>
          <el-button @click="$router.push('/live')">直播面板</el-button>
        </el-space>
      </div>
      <div class="card">
        <h3 class="panel-title">联调检查</h3>
        <el-steps direction="vertical" :active="4" finish-status="success" style="height:220px">
          <el-step title="登录注册" description="/api/auth/* → 8081" />
          <el-step title="声音管理" description="/api/voices/* 与 /api/audio/*" />
          <el-step title="TTS 合成" description="/api/tts/* → 8082" />
          <el-step title="拓展功能" description="scripts / feedback / stats / help → 8083" />
        </el-steps>
      </div>
    </div>
    <div class="card" style="margin-top:16px">
      <div class="space-between"><h3 class="panel-title">最近直播会话</h3><el-button link @click="$router.push('/stats')">查看全部</el-button></div>
      <el-table :data="sessions.slice(0,5)" empty-text="暂无直播会话">
        <el-table-column prop="platform" label="平台" width="120" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <el-table-column prop="statsData" label="统计数据" show-overflow-tooltip />
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import StatCard from '../components/StatCard.vue'
import { getStatsOverview, getLiveSessions } from '../api/stats'
const loading = ref(false)
const overview = ref({})
const sessions = ref([])
async function load() {
  loading.value = true
  try {
    overview.value = await getStatsOverview().catch(() => ({})) || {}
    sessions.value = await getLiveSessions().catch(() => []) || []
  } finally { loading.value = false }
}
onMounted(load)
</script>
