import { ActionContext } from "vuex";
import { State as RootState } from "../index";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import {
  ISearchFacetRecord,
  ISearchQuery,
  ISearchTopic,
} from "@/interfaces/api/v4/search-topic.interface";
import { defaultFacetResult, defaultPageResult } from "@/utils/result";
import v4Search from "@/services/api/v4/search.service";
import router from "@/router";
import { Dictionary } from "vue-router/types/router";

const v4SearchService = new v4Search();

export interface State {
  query: ISearchQuery | null;
  page: IApiPagedResult<ISearchTopic>;
  facets: ISearchFacetRecord;
}

const state: State = {
  query: null,
  page: defaultPageResult<ISearchTopic>(),
  facets: defaultFacetResult,
};

const getters = {
  searchQuery: (state: State): ISearchQuery | null => state.query,
  pagedSearchTopics: (state: State): IApiPagedResult<ISearchTopic> =>
    state.page,
  searchTopicFacets: (state: State): ISearchFacetRecord => state.facets,
};

const actions = {
  setSearchQuery(
    { commit }: ActionContext<State, RootState>,
    query: ISearchQuery
  ): void {
    commit("setQuery", query);
    router
      .push({ query: query as unknown as Dictionary<string> })
      .catch(() => undefined);
  },
  unsetSearchQuery({ commit }: ActionContext<State, RootState>): void {
    commit("setQuery", null);
    router.replace({ query: {} }).catch(() => undefined);
  },
  async fetchSearchFacetedTopics(
    { commit }: ActionContext<State, RootState>,
    query: ISearchQuery
  ): Promise<void> {
    try {
      const res = await v4SearchService.facetedTopic(query);
      commit("setPage", res.data.objects);
      commit("setFacets", res.data.facets);
    } catch (e) {
      console.error(e);
    }
  },
};

const mutations = {
  setQuery(state: State, query: ISearchQuery): void {
    state.query = { ...query };
  },
  setPage(state: State, page: IApiPagedResult<ISearchTopic>): void {
    state.page = { ...page };
  },
  setFacets(state: State, facets: ISearchFacetRecord): void {
    state.facets = { ...facets };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
