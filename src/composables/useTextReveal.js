// Primeira versao da logica de "sumico" do texto.
// Por enquanto so cobre o modo palavra (esconde tudo, menos a
// ultima palavra que a pessoa esta digitando). Os outros modos
// (frase / paragrafo) vem depois, ainda vou pensar melhor em como
// generalizar isso sem duplicar codigo.

export function tokenize(str) {
  // separa por espacos mas mantem os espacos como tokens tambem,
  // assim da pra remontar o texto igualzinho depois
  return str.split(/(\s+)/).filter((t) => t.length > 0)
}

export function buildWordModeSegments(text) {
  const tokens = tokenize(text)
  let visibleFromToken = tokens.length

  for (let i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i].trim().length > 0) {
      visibleFromToken = i
      break
    }
  }

  return tokens.map((t, i) => ({
    text: t,
    hidden: i < visibleFromToken,
  }))
}
