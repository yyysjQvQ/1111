# Taffy 直播助手前端 v2

成员1前端交付版，按开发指南实现 Vue 3 + Vite + Element Plus + Pinia + Axios + Vue Router。

## 启动

```bash
cd taffy-frontend-v2
npm install
npm run dev
```

访问：`http://localhost:5173`

## 构建

```bash
npm run build
```

产物目录：`dist/`

## 已实现页面

- 登录：`/login`
- 注册：`/register`
- 仪表盘：`/dashboard`
- 声音管理：`/voices`
- TTS 转换：`/tts`
- 直播面板：`/live`
- 脚本编辑：`/scripts`
- 声音评价：`/feedback`
- 直播统计：`/stats`
- 帮助中心：`/help`

## API 代理

开发环境下所有接口均通过 Vite 代理转发：

- `/api/auth/*`、`/api/voices/*` → `http://localhost:8081`
- `/api/audio/*`、`/api/tts/*`、`/api/voice/*` → `http://localhost:8082`
- `/api/scripts/*`、`/api/feedback/*`、`/api/stats/*`、`/api/help/*` → `http://localhost:8083`

## 主要功能

- JWT 登录状态管理与路由守卫
- Axios 统一响应处理与错误提示
- 声音上传、编辑、删除、训练提交、训练状态轮询
- TTS 合成、任务状态查询、播放、历史记录、Blob 下载
- 直播面板快捷话术、脚本填入、Ctrl+Enter 发送
- 脚本 CRUD 与本地筛选
- 声音评价提交、历史评价、评分统计
- 统计卡片、会话列表、趋势展示
- 帮助文章分类、搜索、详情弹窗
- 统一布局、卡片、空状态、加载状态、响应式基础适配
