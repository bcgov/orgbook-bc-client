import { ActionContext } from "vuex";
import { State as RootState } from "../index";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import {
  ISearchFilter,
  ISearchFilterFacets,
  ISearchFilterFieldRecord,
  ISearchQuery,
  ISearchTopic,
} from "@/interfaces/api/v4/search-topic.interface";
import { defaultFacetResult, defaultPageResult } from "@/utils/result";
import v4Search from "@/services/api/v4/search.service";
import v3Search from "@/services/api/v3/search.service";
import router from "@/router";
import { Dictionary } from "vue-router/types/router";
import { ISearchAutocomplete } from "@/interfaces/api/v3/search-autocomplete.interface";
import {
  credentialTypeSpec,
  entityStatusSpec,
  entityTypeSpec,
  pageSpec,
} from "@/data/search";
import { getFilterValue } from "@/utils/search";
import { objHasProp } from "@/utils/general";

const v4SearchService = new v4Search();
const v3SearchService = new v3Search();

const filterSpec: ISearchFilter[] = [
  entityStatusSpec,
  entityTypeSpec,
  credentialTypeSpec,
  pageSpec,
];

export interface State {
  query: ISearchQuery | null;
  filters: ISearchFilter[];
  page: IApiPagedResult<ISearchTopic>;
  facets: ISearchFilterFacets;
}

const state: State = {
  query: null,
  filters: [],
  page: defaultPageResult<ISearchTopic>(),
  facets: defaultFacetResult,
};

const getters = {
  searchQuery: (state: State): ISearchQuery | null => state.query,
  searchFilters: (state: State): ISearchFilter[] => state.filters,
  pagedSearchTopics: (state: State): IApiPagedResult<ISearchTopic> =>
    state.page,
  searchFilterFields: (state: State): ISearchFilterFieldRecord =>
    state?.facets?.fields || defaultFacetResult.fields,
};

const actions = {
  setSearchQuery(
    { commit }: ActionContext<State, RootState>,
    query: ISearchQuery
  ): void {
    commit("setQuery", query);
  },
  setSearchFilters(
    { commit }: ActionContext<State, RootState>,
    query: ISearchQuery
  ): void {
    const filters = filterSpec.filter((filter) =>
      objHasProp(query, filter.queryParameter)
    );
    for (const filter of filters) {
      filter.value = query[filter.queryParameter];
    }
    commit("setFilters", filters);
  },
  toggleSearchFilter(
    { dispatch, getters }: ActionContext<State, RootState>,
    filter: ISearchFilter
  ): void {
    const query: ISearchQuery = { ...getters.searchQuery };
    const filters: ISearchFilter[] = [...getters.searchFilters];
    const selectedFilter = filters.find(
      (selected) => selected.key === filter.key
    );
    if (selectedFilter) {
      const value = filter?.valueMapper
        ? filter.valueMapper[filter.value as string]
        : filter.value;
      selectedFilter.value = selectedFilter.value !== value ? value : "";
      filters.splice(filters.indexOf(selectedFilter), 1, selectedFilter);
    } else {
      filters.push(filter);
    }
    for (const filter of filters) {
      query[filter.queryParameter] = getQueryValueFromFilter(query, filter);
    }
    // Reset the page back to the first
    query["page"] = 1;
    dispatch("fetchSearch", query);
  },

  async fetchSearchFacetedTopics({
    commit,
    getters,
  }: ActionContext<State, RootState>): Promise<void> {
    try {
      const query: ISearchQuery = { ...getters.searchQuery };
      const filters: ISearchFilter[] = [...getters.searchFilters];
      const apiQuery: ISearchQuery = { q: query.q };
      for (const filter of filters) {
        apiQuery[filter.queryParameter] = getQueryValueFromFilter(
          query,
          filter
        );
      }
      const res = await v4SearchService.facetedTopic(apiQuery);
      commit("setFacets", res.data.facets);
      commit("setPage", res.data.objects);
    } catch (e) {
      console.error(e);
    }
  },
  async fetchAutocomplete(
    _: ActionContext<State, RootState>,
    q: string
  ): Promise<IApiPagedResult<ISearchAutocomplete>> {
    try {
      const res = await v3SearchService.autocomplete(q);
      return res.data;
    } catch (e) {
      console.error(e);
      return defaultPageResult<ISearchAutocomplete>();
    }
  },
  async fetchSearch(
    { dispatch }: ActionContext<State, RootState>,
    query: ISearchQuery
  ): Promise<void> {
    dispatch("setSearchQuery", query);
    dispatch("setSearchFilters", query);
    router
      .push({ name: "Search", query: query as unknown as Dictionary<string> })
      .catch(() => undefined);
  },
};

const mutations = {
  setQuery(state: State, query: ISearchQuery): void {
    state.query = { ...query };
  },
  setPage(state: State, page: IApiPagedResult<ISearchTopic>): void {
    state.page = { ...page };
  },
  setFacets(state: State, facets: ISearchFilterFacets): void {
    state.facets = { ...facets };
  },
  setFilters(state: State, filters: ISearchFilter[]): void {
    state.filters = [...filters];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

// Helper functions

function getQueryValueFromFilter(
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
