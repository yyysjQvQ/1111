<template>
  <el-tag :type="tagType" effect="light">{{ value || '未知' }}</el-tag>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ value: String })
const tagType = computed(() => {
  if (['就绪', 'completed', 'success', '已完成'].includes(props.value)) return 'success'
  if (['失败', 'failed', 'error'].includes(props.value)) return 'danger'
  if (['处理中', '训练中', 'processing', 'pending'].includes(props.value)) return 'warning'
  return 'info'
})
</script>
