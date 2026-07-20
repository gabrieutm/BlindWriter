// Generalizei a logica pra cobrir os 3 modos de foco.
// Ficou um pouco menos elegante do que eu queria (o modo palavra
// usa contagem de token, os outros usam indice de caractere e
// depois eu converto pra token de novo), mas funciona e da pra
// refatorar depois se sobrar tempo.

export function tokenize(str) {
  return str.split(/(\s+)/).filter((t) => t.length > 0)
}

function tokenIndexFromCharIndex(tokens, charIndex) {
  let acc = 0
  for (let i = 0; i < tokens.length; i++) {
    acc += tokens[i].length
    if (acc >= charIndex) return i
  }
  return tokens.length
}

function findWordBoundaryToken(tokens) {
  for (let i = tokens.length - 1; i >= 0; i--) {
    if (tokens[i].trim().length > 0) return i
  }
  return tokens.length
}

function findSentenceBoundaryToken(text, tokens) {
  // "frase" aqui = trecho depois da ultima quebra de linha.
  // pensei em usar pontuacao (. ! ?) mas ficava estranho com
  // abreviacoes e numeros decimais, entao simplifiquei pra quebra
  // de linha mesmo, que e mais previsivel.
  const lastBreak = text.lastIndexOf('\n')
  return tokenIndexFromCharIndex(tokens, lastBreak + 1)
}

function findParagraphBoundaryToken(text, tokens) {
  const lastBreak = text.lastIndexOf('\n\n')
  return tokenIndexFromCharIndex(tokens, lastBreak > -1 ? lastBreak + 2 : 0)
}

export function buildSegments(text, mode) {
  const tokens = tokenize(text)
  let visibleFromToken

  if (mode === 'sentence') {
    visibleFromToken = findSentenceBoundaryToken(text, tokens)
  } else if (mode === 'paragraph') {
    visibleFromToken = findParagraphBoundaryToken(text, tokens)
  } else {
    visibleFromToken = findWordBoundaryToken(tokens)
  }

  return tokens.map((t, i) => ({
    text: t,
    hidden: i < visibleFromToken,
  }))
}
