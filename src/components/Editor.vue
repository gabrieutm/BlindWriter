<script setup>
import { ref, computed, nextTick } from 'vue'
import { buildSegments } from '../composables/useTextReveal'

const props = defineProps({
  mode: { type: String, required: true },
})

const text = ref('')
const textareaRef = ref(null)
const overlayRef = ref(null)

const segments = computed(() => buildSegments(text.value, props.mode))

function syncScroll() {
  if (!overlayRef.value || !textareaRef.value) return
  overlayRef.value.scrollTop = textareaRef.value.scrollTop
  overlayRef.value.scrollLeft = textareaRef.value.scrollLeft
}

async function onInput() {
  await nextTick()
  syncScroll()
}
</script>

<template>
  <div class="editor-wrapper">
    <div ref="overlayRef" class="overlay">
      <span
        v-for="(seg, i) in segments"
        :key="i"
        :class="{ 'seg-hidden': seg.hidden }"
        >{{ seg.text }}</span
      >
    </div>
    <textarea
      ref="textareaRef"
      v-model="text"
      class="input-layer"
      spellcheck="false"
      placeholder="Comece a escrever..."
      @scroll="syncScroll"
      @input="onInput"
    ></textarea>
  </div>
</template>

<style scoped>
.editor-wrapper {
  position: relative;
  width: 100%;
  max-width: 700px;
  height: 420px;
  margin: 1.5rem auto;
  font-size: 1.25rem;
  line-height: 1.8;
}

.overlay,
.input-layer {
  position: absolute;
  inset: 0;
  padding: 1.25rem;
  font: inherit;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: auto;
  margin: 0;
  border-radius: 4px;
}

.overlay {
  pointer-events: none;
  color: #222;
}

.overlay .seg-hidden {
  opacity: 0;
  transition: opacity 0.35s ease;
}

.input-layer {
  color: transparent;
  background: transparent;
  caret-color: #222;
  border: 1px solid #ccc;
  resize: none;
}

.input-layer:focus {
  outline: none;
  border-color: #999;
}
</style>
