<script setup>
const props = defineProps({
  currentIndex: { type: Number, required: true },
  total: { type: Number, required: true },
})
const emit = defineEmits(['prev', 'next', 'add'])
</script>

<template>
  <div class="page-indicator">
    <button
      type="button"
      :disabled="currentIndex === 0"
      @click="emit('prev')"
    >
      &larr;
    </button>
    <span>Pagina {{ currentIndex + 1 }} de {{ total }}</span>
    <button
      type="button"
      :disabled="currentIndex === total - 1"
      @click="emit('next')"
    >
      &rarr;
    </button>
    <button type="button" class="add-page" @click="emit('add')">
      + Nova pagina
    </button>
  </div>
</template>

<style scoped>
.page-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-family: sans-serif;
  font-size: 0.85rem;
  color: #555;
  margin-top: 0.5rem;
}

.page-indicator button {
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  padding: 0.25rem 0.6rem;
  cursor: pointer;
}

.page-indicator button:disabled {
  opacity: 0.4;
  cursor: default;
}

.add-page {
  margin-left: 0.5rem;
}
</style>
