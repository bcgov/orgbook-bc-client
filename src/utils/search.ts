import {
  ISearchFilter,
  ISearchFilterOptions,
  ISearchQuery,
} from "@/interfaces/api/v4/search-topic.interface";
import { objHasProp } from "./general";

export const defaultQuery: ISearchQuery = {
  q: null,
  "category:entity_type": "",
  credential_type_id: "",
  inactive: "",
  page: "1",
};

export function fieldKeyFormatter(value = ""): string {
  return value.split("::")[0];
}

export function fieldValueFormatter(value = ""): string {
  return value.split("::")[1];
}

export function topFieldSelector(
  options: ISearchFilterOptions,
  filters: ISearchFilter[] = []
): ISearchFilter[] {
  const inclusions = options.inclusions || [];
  return inclusions.map((inclusion) => {
    const filter = {
      ...options,
      ...filters.find((filter) => {
        return (
          options.keySelector(filter) === options.key &&
          options.valueSelector(filter) === inclusion
        );
      }),
    };
    return processFieldWithFallback(options, filter, inclusion);
  });
}

export function moreFieldSelector(
  options: ISearchFilterOptions,
  filters: ISearchFilter[] = []
): ISearchFilter[] {
  const exclusions = options.exclusions || [];
  return [...filters]
    .filter((filter) => options.keySelector(filter) === options.key)
    .filter(
      (filter) => !exclusions.includes(options.valueSelector(filter) as string)
    )
    .map((filter) => processField(options, filter));
}

export function processField(
  options: ISearchFilterOptions,
  filter: ISearchFilter
): ISearchFilter {
  return {
    ...options,
    ...filter,
    label: options?.labelFormatter
      ? options.labelFormatter(filter)
      : `${options.label}.${options.valueSelector(filter)}`,
    translated: !!(options?.labelFormatter && options.labelFormatter(filter)),
    key: options.key,
    value: options.valueSelector(filter),
  };
}

export function processFieldWithFallback(
  options: ISearchFilterOptions,
  filter: ISearchFilter,
  fallback: unknown
): ISearchFilter {
  return {
    ...options,
    ...filter,
    label: options?.labelFormatter
      ? options.labelFormatter(filter)
      : `${options.label}.${options.valueSelector(filter) || fallback}`,
    translated: !!(options?.labelFormatter && options.labelFormatter(filter)),
    key: options.key,
    value: options.valueSelector(filter) || fallback,
    count: filter.count || 0,
  };
}

export function getFilterValue(filter: ISearchFilter): unknown {
  let returnValue = undefined;
  const localValue = filter.value as string;
  if (filter?.valueMapper) {
    if (Object.values(filter.valueMapper).includes(localValue)) {
      returnValue = localValue;
    } else if (filter.valueMapper[localValue]) {
      returnValue = filter.valueMapper[localValue];
    }
  } else {
    returnValue = filter.value;
  }
  return returnValue;
}

export function isFilterActive(
  filters: ISearchFilter[],
  field: ISearchFilter
): boolean {
  return !!filters.find(
    (filter) =>
      filter.key === field.key &&
      getFilterValue(filter) === getFilterValue(field)
  );
}

export function getQueryValueFromFilter(
  query: ISearchQuery,
  filter: ISearchFilter
): unknown {
  let value = undefined;
  if (objHasProp(query, filter.queryParameter)) {
    value = getFilterValue(filter);
  }
  if (value === undefined && objHasProp(filter, "defaultValue")) {
    value = filter.defaultValue;
  }
  return value;
}
