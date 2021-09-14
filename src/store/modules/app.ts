import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
export interface State {
  loading: boolean;
}

const state: State = {
  loading: false,
};

const getters = {
  loading: (state: State): boolean => state.loading,
};

const actions = {
  setLoading(
    { commit }: ActionContext<State, RootState>,
    loading: boolean
  ): void {
    commit("setLoading", loading);
  },
};

const mutations = {
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
