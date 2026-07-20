<script setup>
import Editor from './components/Editor.vue'
import Toolbar from './components/Toolbar.vue'
import { useFocusMode } from './composables/useFocusMode'

const { mode, setMode } = useFocusMode()
</script>

<template>
  <div class="app-shell">
    <h1>BlindWriter</h1>
    <Toolbar :mode="mode" @update:mode="setMode" />
    <Editor :mode="mode" />
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
