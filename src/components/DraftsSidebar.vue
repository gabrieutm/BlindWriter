<script setup lang="ts">
import type { Draft } from '../types'

defineProps<{
  drafts: Draft[]
  currentDraftId: string | null
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'open-draft', id: string): void
  (e: 'new-draft'): void
  (e: 'delete-draft', id: string): void
  (e: 'toggle'): void
}>()

function handleDelete(id: string) {
  // sei que confirm() nativo e feio, mas nao deu tempo de fazer um
  // modal de confirmacao bonito - fica na lista de melhorias.
  if (confirm('Excluir este rascunho? Essa acao nao pode ser desfeita.')) {
    emit('delete-draft', id)
  }
}
</script>

<template>
  <aside class="sidebar" :class="{ open }">
    <div class="sidebar-header">
      <strong>Rascunhos</strong>
      <button type="button" class="close-btn" @click="emit('toggle')">
        &times;
      </button>
    </div>

    <button type="button" class="new-draft-btn" @click="emit('new-draft')">
      + Novo rascunho
    </button>

    <ul class="drafts-list">
      <li
        v-for="d in drafts"
        :key="d.id"
        :class="{ active: d.id === currentDraftId }"
      >
        <button
          type="button"
          class="draft-item"
          @click="emit('open-draft', d.id)"
        >
          {{ d.title || 'Rascunho sem titulo' }}
        </button>
        <button
          type="button"
          class="delete-btn"
          title="Excluir"
          @click="handleDelete(d.id)"
        >
          &times;
        </button>
      </li>
      <li v-if="drafts.length === 0" class="empty-hint">
        Nenhum rascunho salvo ainda.
      </li>
    </ul>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: -280px;
  width: 260px;
  height: 100%;
  background: #f5f5f2;
  border-right: 1px solid #ddd;
  padding: 1rem;
  font-family: sans-serif;
  font-size: 0.9rem;
  transition: left 0.25s ease;
  z-index: 20;
}

.sidebar.open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-btn {
  border: none;
  background: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.new-draft-btn {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #222;
  background: #222;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.drafts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.drafts-list li {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.draft-item {
  flex: 1;
  text-align: left;
  background: none;
  border: none;
  padding: 0.5rem 0.25rem;
  cursor: pointer;
  border-radius: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.draft-item:hover {
  background: #e8e8e4;
}

li.active .draft-item {
  font-weight: bold;
}

.delete-btn {
  border: none;
  background: none;
  color: #999;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
}

.delete-btn:hover {
  color: #c0392b;
}

.empty-hint {
  color: #999;
  font-size: 0.8rem;
  padding: 0.5rem 0.25rem;
}
</style>
