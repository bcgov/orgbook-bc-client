import { Filter } from "@/store/modules/entityFilter";

export function isEntityFilterActive(
  filterField: string,
  getEntityFilters: Filter,
  filterString?: string
): boolean {
  //filter string only applies if we're filtering array
  const filterList = getEntityFilters[filterField];
  let retval = false;
  if (typeof filterList === "boolean") {
    retval = filterList;
  } else if (typeof filterList === "string") {
    retval = filterList !== "";
  } else if (filterString) {
    retval = filterList.includes(filterString);
  }
  if (filterString === "Amalgamation") {
    console.log(`${filterField}: ${filterString}: ${filterList}`);
  }

  return retval;
}
