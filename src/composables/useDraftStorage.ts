import type { Draft } from '../types'

// Guardo todos os rascunhos numa unica chave do localStorage, como
// um array JSON. Pra um app desse tamanho achei que nao compensava
// criar uma chave por rascunho - fica tudo mais facil de listar e
// debugar assim (da pra abrir o devtools e olhar o JSON inteiro).
const STORAGE_KEY = 'blindwriter:drafts'

function readAll(): Draft[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Draft[]
  } catch (e) {
    // se por algum motivo o JSON ficou corrompido, nao quero
    // quebrar o app inteiro - so perde os rascunhos salvos.
    console.error('BlindWriter: falha ao ler rascunhos do localStorage', e)
    return []
  }
}

function writeAll(drafts: Draft[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts))
}

export function loadDrafts(): Draft[] {
  return readAll().sort((a, b) => b.updatedAt - a.updatedAt)
}

export function saveDraft(draft: Draft) {
  const drafts = readAll()
  const idx = drafts.findIndex((d) => d.id === draft.id)
  const updated = { ...draft, updatedAt: Date.now() }
  if (idx >= 0) {
    drafts[idx] = updated
  } else {
    drafts.push(updated)
  }
  writeAll(drafts)
}

export function deleteDraft(id: string) {
  const drafts = readAll().filter((d) => d.id !== id)
  writeAll(drafts)
}

export function createEmptyDraft(title: string): Draft {
  const now = Date.now()
  return {
    id: crypto.randomUUID(),
    title: title || 'Rascunho sem titulo',
    pages: [{ id: 1, content: '' }],
    focusMode: 'word',
    createdAt: now,
    updatedAt: now,
  }
}
