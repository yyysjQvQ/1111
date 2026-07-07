<template>
  <div>
    <audio v-if="url" :src="url" controls class="audio-player"></audio>
    <EmptyState v-else description="暂无音频结果" />
  </div>
</template>
<script setup>
import EmptyState from './EmptyState.vue'
defineProps({ url: String })
</script>
