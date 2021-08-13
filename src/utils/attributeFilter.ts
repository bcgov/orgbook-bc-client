export function selectAllAttrItem<T extends any, U extends keyof T>(
  attr: { key: U; value: any },
  array: Array<T> | undefined
): T[] | undefined {
  return array?.filter((item) => item[attr.key] === attr.value);
}

export function selectFirstAttrItem<T extends any, U extends keyof T>(
  attr: { key: U; value: any },
  array: Array<T>
): T | undefined {
  const filtered = selectAllAttrItem(attr, array);
  return filtered !== undefined && filtered.length > 0
    ? filtered[0]
    : undefined;
}
