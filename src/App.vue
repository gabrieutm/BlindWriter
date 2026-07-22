<script setup>
import { ref, watch, onMounted } from 'vue'
import Editor from './components/Editor.vue'
import Toolbar from './components/Toolbar.vue'
import PageIndicator from './components/PageIndicator.vue'
import DraftsSidebar from './components/DraftsSidebar.vue'
import { useFocusMode } from './composables/useFocusMode'
import { usePages } from './composables/usePages'
import { useDebounce } from './composables/useDebounce'
import {
  loadDrafts,
  saveDraft,
  deleteDraft,
  createEmptyDraft,
} from './composables/useDraftStorage'

const { mode, setMode } = useFocusMode()
const { pages, currentPageIndex, currentPage, addPage, goToPage, updateCurrentPageContent, loadPages } =
  usePages()

const drafts = ref([])
const currentDraftId = ref(null)
const title = ref('')
const sidebarOpen = ref(false)

function refreshDraftsList() {
  drafts.value = loadDrafts()
}

function startNewDraft() {
  const draft = createEmptyDraft('Rascunho sem titulo')
  currentDraftId.value = draft.id
  title.value = draft.title
  setMode(draft.focusMode)
  loadPages(draft.pages)
  saveDraft(draft)
  refreshDraftsList()
}

function openDraft(id) {
  const found = drafts.value.find((d) => d.id === id)
  if (!found) return
  currentDraftId.value = found.id
  title.value = found.title
  setMode(found.focusMode)
  loadPages(found.pages)
  sidebarOpen.value = false
}

function handleDeleteDraft(id) {
  deleteDraft(id)
  refreshDraftsList()
  if (id === currentDraftId.value) {
    if (drafts.value.length > 0) {
      openDraft(drafts.value[0].id)
    } else {
      startNewDraft()
    }
  }
}

// autosave: espera 2s sem alteracao antes de gravar no
// localStorage. usei debounce simples em vez de alguma lib de
// state management (tipo Pinia) porque o app e pequeno e nao
// senti necessidade de adicionar essa complexidade toda.
const debouncedSave = useDebounce(() => {
  if (!currentDraftId.value) return
  saveDraft({
    id: currentDraftId.value,
    title: title.value,
    pages: pages.value,
    focusMode: mode.value,
    createdAt: Date.now(), // sobrescrito pelo saveDraft se ja existir
    updatedAt: Date.now(),
  })
  refreshDraftsList()
}, 2000)

watch([pages, title, mode], () => {
  debouncedSave()
}, { deep: true })

onMounted(() => {
  refreshDraftsList()
  if (drafts.value.length > 0) {
    openDraft(drafts.value[0].id)
  } else {
    startNewDraft()
  }
})
</script>

<template>
  <div class="app-shell">
    <DraftsSidebar
      :drafts="drafts"
      :current-draft-id="currentDraftId"
      :open="sidebarOpen"
      @open-draft="openDraft"
      @new-draft="startNewDraft"
      @delete-draft="handleDeleteDraft"
      @toggle="sidebarOpen = !sidebarOpen"
    />

    <div class="main-area">
      <button type="button" class="sidebar-toggle" @click="sidebarOpen = !sidebarOpen">
        &#9776; Rascunhos
      </button>

      <h1>BlindWriter</h1>

      <input
        v-model="title"
        type="text"
        class="title-input"
        placeholder="Titulo do rascunho..."
      />

      <Toolbar :mode="mode" @update:mode="setMode" />
      <Editor
        :mode="mode"
        :model-value="currentPage.content"
        @update:model-value="updateCurrentPageContent"
        @break-page="addPage"
      />
      <PageIndicator
        :current-index="currentPageIndex"
        :total="pages.length"
        @prev="goToPage(currentPageIndex - 1)"
        @next="goToPage(currentPageIndex + 1)"
        @add="addPage"
      />
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100%;
}

.main-area {
  padding: 2rem;
}

.sidebar-toggle {
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 4px;
  padding: 0.4rem 0.75rem;
  cursor: pointer;
  font-family: sans-serif;
  font-size: 0.85rem;
}

h1 {
  text-align: center;
  font-weight: normal;
  letter-spacing: 1px;
}

.title-input {
  display: block;
  width: 100%;
  max-width: 700px;
  margin: 0 auto 1rem;
  font: inherit;
  font-size: 1.1rem;
  border: none;
  border-bottom: 1px solid #ccc;
  padding: 0.4rem 0.25rem;
  background: transparent;
  text-align: center;
}

.title-input:focus {
  outline: none;
  border-bottom-color: #222;
}
</style>
