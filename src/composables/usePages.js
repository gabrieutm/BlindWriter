import { ref, computed } from 'vue'

// Cada "pagina" e um objeto simples com id e conteudo.
// Pensei em fazer quebra de pagina automatica (por tamanho de
// texto), mas achei que ia ficar confuso pro usuario nao saber
// quando uma pagina termina. Decidi que quebra de pagina e manual
// (Ctrl+Enter ou botao), igual Word/LibreOffice. Mais previsivel.

let nextId = 1
function makePage() {
  return { id: nextId++, content: '' }
}

export function usePages() {
  const pages = ref([makePage()])
  const currentPageIndex = ref(0)

  const currentPage = computed(() => pages.value[currentPageIndex.value])

  function addPage() {
    pages.value.push(makePage())
    currentPageIndex.value = pages.value.length - 1
  }

  function goToPage(index) {
    if (index >= 0 && index < pages.value.length) {
      currentPageIndex.value = index
    }
  }

  function updateCurrentPageContent(content) {
    pages.value[currentPageIndex.value].content = content
  }

  return {
    pages,
    currentPageIndex,
    currentPage,
    addPage,
    goToPage,
    updateCurrentPageContent,
  }
}
