<template>
  <div class="card space-between">
    <div>
      <div class="stat-label">{{ label }}</div>
      <div class="stat-number">{{ value }}</div>
      <div v-if="desc" class="muted" style="font-size:13px">{{ desc }}</div>
    </div>
    <div class="stat-icon"><el-icon size="24"><component :is="icon" /></el-icon></div>
  </div>
</template>
<script setup>
defineProps({ label: String, value: [String, Number], desc: String, icon: { type: String, default: 'DataLine' } })
</script>
