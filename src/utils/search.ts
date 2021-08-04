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
  const top = [] as ISearchFilter[];
  const inclusions = options.inclusions || [];
  for (const value of inclusions) {
    const filter = {
      ...options,
      ...filters.find((filter) => {
        return (
          options.keySelector(filter) === options.key &&
          options.valueSelector(filter) === value
        );
      }),
    };
    // In the case where the inclusions are not in the returned filters we set sensible defaults
    top.push({
      ...filter,
      label: `${options.label}.${options.valueSelector(filter) || value}`,
      key: options.key,
      value: options.valueSelector(filter) || value,
      count: filter.count || 0,
    });
  }
  return top;
}

export function moreFieldSelector(
  options: ISearchFilterOptions,
  filters: ISearchFilter[] = []
): ISearchFilter[] {
  const more = [] as ISearchFilter[];
  const exclusions = options.exclusions || [];
  for (const filter of filters.filter(
    (filter) => options.keySelector(filter) === options.key
  )) {
    if (!exclusions.includes(options.valueSelector(filter))) {
      more.push({
        ...filter,
        label: `${options.label}.${options.valueSelector(filter)}`,
        key: options.key,
        value: options.valueSelector(filter),
      });
    }
  }
  return more;
}
