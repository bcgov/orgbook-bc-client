export interface State {
  loading: boolean;
}

const state: State = {
  loading: false,
};

const getters = {
  loading: (state: State): boolean => state.loading,
};

const actions = {};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
