// comecei a introduzir TS aqui na parte de persistencia porque
// a estrutura de "rascunho salvo" tem varios campos e eu vivia
// esquecendo algum na hora de salvar/carregar. O resto do projeto
// (a logica de reveal, por exemplo) ainda ta em JS, vou migrando
// aos poucos conforme mexo em cada parte.

export type FocusModeValue = 'word' | 'sentence' | 'paragraph'

export interface PageContent {
  id: number
  content: string
}

export interface Draft {
  id: string
  title: string
  pages: PageContent[]
  focusMode: FocusModeValue
  createdAt: number
  updatedAt: number
}
