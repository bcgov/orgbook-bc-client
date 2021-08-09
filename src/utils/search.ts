import {
  ISearchFilter,
  ISearchFilterOptions,
  ISearchQuery,
} from "@/interfaces/api/v4/search-topic.interface";

export const defaultQuery: ISearchQuery = {
  q: null,
  entity_status: "",
  entity_type: "",
  credential_type_id: "",
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
    ...filter,
    label: `${options.label}.${options.valueSelector(filter)}`,
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
    ...filter,
    label: `${options.label}.${options.valueSelector(filter) || fallback}`,
    key: options.key,
    value: options.valueSelector(filter) || fallback,
    count: filter.count || 0,
  };
}
