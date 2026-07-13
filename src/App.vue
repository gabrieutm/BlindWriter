<script setup>
import Editor from './components/Editor.vue'
</script>

<template>
  <div class="app-shell">
    <h1>BlindWriter</h1>
    <Editor />
  </div>
</template>

<style scoped>
.app-shell {
  padding: 2rem;
}

h1 {
  text-align: center;
  font-weight: normal;
  letter-spacing: 1px;
}
</style>
