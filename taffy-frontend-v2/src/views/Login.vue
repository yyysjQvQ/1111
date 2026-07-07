<template>
  <div class="auth-page">
    <div class="card auth-card">
      <div class="auth-logo">🎙️</div>
      <h1 class="auth-title">登录 Taffy</h1>
      <p class="auth-subtitle">进入直播助手后台，管理声音、脚本与 TTS 任务。</p>
      <ErrorBlock :message="error" />
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @keyup.enter="submit">
        <el-form-item label="用户名" prop="username"><el-input v-model.trim="form.username" size="large" placeholder="请输入用户名" /></el-form-item>
        <el-form-item label="密码" prop="password"><el-input v-model="form.password" size="large" type="password" show-password placeholder="请输入密码" /></el-form-item>
        <el-button class="full" size="large" type="primary" :loading="loading" @click="submit">登录</el-button>
      </el-form>
      <div style="margin-top:18px" class="muted">还没有账号？<router-link to="/register">立即注册</router-link></div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../stores/user'
import ErrorBlock from '../components/ErrorBlock.vue'

const router = useRouter()
const userStore = useUserStore()
const formRef = ref()
const loading = ref(false)
const error = ref('')
const form = reactive({ username: '', password: '' })
const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}
async function submit() {
  error.value = ''
  await formRef.value.validate()
  loading.value = true
  try {
    await userStore.doLogin(form)
    ElMessage.success('登录成功')
    router.push('/dashboard')
  } catch (e) { error.value = e.message || '登录失败' }
  finally { loading.value = false }
}
</script>
