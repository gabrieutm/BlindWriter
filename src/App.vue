<script setup>
import Editor from './components/Editor.vue'
import Toolbar from './components/Toolbar.vue'
import PageIndicator from './components/PageIndicator.vue'
import { useFocusMode } from './composables/useFocusMode'
import { usePages } from './composables/usePages'

const { mode, setMode } = useFocusMode()
const { pages, currentPageIndex, currentPage, addPage, goToPage, updateCurrentPageContent } =
  usePages()
</script>

<template>
  <div class="app-shell">
    <h1>BlindWriter</h1>
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
