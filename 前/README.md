# 直播助手前端 · Galaxy UI

Vue 3 + Vite + Element Plus + Pinia + Axios 标准工程版。

## 启动

```bash
npm install
cp .env.example .env
npm run dev
```

访问：`http://localhost:5173`

## 后端对接

默认按项目需求代理到三个 Spring Boot 服务：

- 主后端服务 8081：`/api/auth`、`/api/users`、`/api/voices`
- 语音 AI 服务 8082：`/api/audio`、`/api/tts`、`/api/voice`
- 拓展功能服务 8083：`/api/feedback`、`/api/stats`、`/api/scripts`、`/api/help`

环境变量见 `.env.example`。

## Mock 演示

后端未启动时可把 `.env` 中 `VITE_USE_MOCK=true`，用于前端独立演示。

## 功能页面

- `/login`, `/register`：用户登录注册、JWT 存储、路由守卫
- `/dashboard`：快速入口、声音模型、统计概览
- `/voices`：音频上传、浏览器录音、声音训练、声音库管理
- `/tts`：文本转语音、语速/音调/音量、试听下载
- `/live`：直播平台选择、OBS 连接状态、实时 TTS、脚本切换
- `/scripts`：脚本 CRUD、分类、排练计时
- `/feedback`：评分、评论、历史评价
- `/stats`：直播数据统计展示
- `/help`：帮助文章、搜索、API说明
