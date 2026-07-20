<script setup>
import { FOCUS_MODES } from '../composables/useFocusMode'

defineProps({
  mode: { type: String, required: true },
})
const emit = defineEmits(['update:mode'])
</script>

<template>
  <div class="toolbar">
    <span class="toolbar-label">Modo de foco:</span>
    <button
      v-for="m in FOCUS_MODES"
      :key="m.value"
      type="button"
      class="mode-btn"
      :class="{ active: mode === m.value }"
      @click="emit('update:mode', m.value)"
    >
      {{ m.label }}
    </button>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  max-width: 700px;
  margin: 0 auto;
  font-family: sans-serif;
  font-size: 0.9rem;
}

.toolbar-label {
  color: #666;
  margin-right: 0.25rem;
}

.mode-btn {
  border: 1px solid #ccc;
  background: #fff;
  padding: 0.35rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.mode-btn:hover {
  border-color: #999;
}

.mode-btn.active {
  background: #222;
  color: #fff;
  border-color: #222;
}
</style>
