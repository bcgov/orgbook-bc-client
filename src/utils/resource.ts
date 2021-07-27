import { IApiProperty } from "@/interfaces/api/resource.interface";

export function pluck<T extends IApiProperty>(
  list: T[] = [],
  type: string
): T | undefined {
  return list.find((entry) => entry && entry.type === type);
}
