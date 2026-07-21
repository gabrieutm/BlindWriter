<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { buildSegments } from '../composables/useTextReveal'

const props = defineProps({
  mode: { type: String, required: true },
  modelValue: { type: String, required: true }, // conteudo da pagina atual
})
const emit = defineEmits(['update:modelValue', 'break-page'])

const textareaRef = ref(null)
const overlayRef = ref(null)

const segments = computed(() => buildSegments(props.modelValue, props.mode))

function syncScroll() {
  if (!overlayRef.value || !textareaRef.value) return
  overlayRef.value.scrollTop = textareaRef.value.scrollTop
  overlayRef.value.scrollLeft = textareaRef.value.scrollLeft
}

async function onInput(e) {
  emit('update:modelValue', e.target.value)
  await nextTick()
  syncScroll()
}

function onKeydown(e) {
  // Ctrl+Enter (ou Cmd+Enter no mac) = quebra de pagina manual
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    e.preventDefault()
    emit('break-page')
  }
}

// sempre que troca de pagina, o textarea precisa refletir o valor
// novo (o v-model comum ja resolveria isso, mas como aqui eu
// controlo o value manualmente via onInput, preciso sincronizar
// na mao quando o modelValue muda "de fora" - ex: trocou de pagina)
watch(
  () => props.modelValue,
  async (newVal) => {
    if (textareaRef.value && textareaRef.value.value !== newVal) {
      textareaRef.value.value = newVal
      await nextTick()
      syncScroll()
    }
  }
)
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
      class="input-layer"
      spellcheck="false"
      placeholder="Comece a escrever... (Ctrl+Enter para nova pagina)"
      :value="modelValue"
      @scroll="syncScroll"
      @input="onInput"
      @keydown="onKeydown"
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
