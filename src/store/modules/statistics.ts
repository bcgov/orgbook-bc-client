import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import { IStatistics } from "@/interfaces/api/v2/statistics.interface";
import Statistics from "@/services/api/v2/statistics.service";

const statisticsService = new Statistics();

export interface State {
  statistics: IStatistics | null;
}

const state: State = {
  statistics: null,
};

const getters = {
  statistics: (state: State): IStatistics | null => state.statistics,
};

const actions = {
  async fetchStatistics({
    commit,
  }: ActionContext<State, RootState>): Promise<void> {
    try {
      const res = await statisticsService.getStats();
      commit("setStatistics", res.data);
    } catch (e) {
      console.error(e);
      commit("setStatistics", null);
    }
  },
};

const mutations = {
  setStatistics(state: State, statistics: IStatistics): void {
    state.statistics = { ...statistics };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
