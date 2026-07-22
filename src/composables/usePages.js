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

// Adicionei loadPages() porque agora as paginas podem vir de um
// rascunho carregado do localStorage, nao so criadas do zero.
export function usePages(initialPages) {
  const pages = ref(initialPages && initialPages.length ? initialPages : [makePage()])
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

  function loadPages(newPages) {
    pages.value = newPages && newPages.length ? newPages : [makePage()]
    currentPageIndex.value = 0
  }

  return {
    pages,
    currentPageIndex,
    currentPage,
    addPage,
    goToPage,
    updateCurrentPageContent,
    loadPages,
  }
}
