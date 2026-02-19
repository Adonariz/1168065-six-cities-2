export function createStringUnionGuard<T extends readonly string[]>(values: T) {
  const set = new Set(values);

  return (value: string): value is T[number] => set.has(value as T[number]);
}
