import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
export interface State {
  loading: boolean;
  apiUrl: URL;
}

const state: State = {
  loading: false,
  apiUrl: new URL("http://localhost:8080/api"),
};

const getters = {
  apiUrl: (state: State): URL => state.apiUrl,
  loading: (state: State): boolean => state.loading,
};

const actions = {
  setApiUrl({ commit }: ActionContext<State, RootState>, url: string): void {
    commit("setApiUrl", url);
  },
  setLoading(
    { commit }: ActionContext<State, RootState>,
    loading: boolean
  ): void {
    commit("setLoading", loading);
  },
};

const mutations = {
  setApiUrl(state: State, url: URL): void {
    state.apiUrl = url;
  },
  setLoading(state: State, loading: boolean): void {
    state.loading = loading;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
