<template>
  <div class="space-between" style="margin-bottom:16px">
    <div>
      <h2 style="margin:0 0 6px;font-size:26px;font-weight:900">{{ title }}</h2>
      <div v-if="subtitle" class="muted">{{ subtitle }}</div>
    </div>
    <div><slot /></div>
  </div>
</template>
<script setup>
defineProps({ title: { type: String, required: true }, subtitle: { type: String, default: '' } })
</script>
