import { ActionContext } from "vuex";
import { State as RootState } from "../index";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import {
  ISearchQuery,
  ISearchTopic,
} from "@/interfaces/api/v4/search-topic.interface";
import { defaultPageResult } from "@/utils/result";
import v4Search from "@/services/api/v4/search.service";
import router from "@/router";
import { Dictionary } from "vue-router/types/router";

const v4SearchService = new v4Search();

export interface State {
  query: ISearchQuery | null;
  page: IApiPagedResult<ISearchTopic>;
}

const state: State = {
  query: null,
  page: defaultPageResult<ISearchTopic>(),
};

const getters = {
  searchQuery: (state: State): ISearchQuery | null => state.query,
  pagedSerchTopics: (state: State): IApiPagedResult<ISearchTopic> => state.page,
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
  async fetchSearchTopics(
    { commit }: ActionContext<State, RootState>,
    query: ISearchQuery
  ): Promise<void> {
    try {
      const res = await v4SearchService.topic(query);
      commit("setPage", res.data);
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
