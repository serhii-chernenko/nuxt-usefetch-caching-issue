export function useKv() {
  return (globalThis as any).__env__.items;
}