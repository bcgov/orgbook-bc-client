export function objHasProp(obj: unknown, prop: string): boolean {
  return Object.hasOwnProperty.call(obj, prop);
}
