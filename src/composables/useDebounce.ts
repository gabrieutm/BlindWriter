// debounce basico. cheguei a pensar em usar alguma lib (lodash)
// so pra isso, mas e tao pouco codigo que nao compensava adicionar
// uma dependencia inteira.
export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delayMs: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delayMs)
  }
}
