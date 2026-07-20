import { ref } from 'vue'

// modos disponiveis: 'word' | 'sentence' | 'paragraph'
// guardei o "rotulo" junto porque ia usar em varios lugares
// (toolbar, titulo da pagina, etc) e nao queria ficar duplicando
// esse mapeamento em cada componente
export const FOCUS_MODES = [
  { value: 'word', label: 'Palavra' },
  { value: 'sentence', label: 'Frase' },
  { value: 'paragraph', label: 'Paragrafo' },
]

export function useFocusMode(initial = 'word') {
  const mode = ref(initial)

  function setMode(newMode) {
    mode.value = newMode
  }

  return { mode, setMode, FOCUS_MODES }
}
