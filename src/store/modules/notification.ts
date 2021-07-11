import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";

export enum AlertType {
  INFO = "blue",
  SUCCESS = "green",
  WARNING = "orange",
  ERROR = "red",
}

export interface Alert {
  id?: number;
  timeout?: number;
  type: AlertType;
  msg: string;
}

export interface State {
  alerts: Alert[];
}

const state: State = {
  alerts: [],
};

const getters = {
  alerts: (state: State): Alert[] => state.alerts,
};

const actions = {
  notify({ commit }: ActionContext<State, RootState>, alert: Alert): void {
    commit("addAlert", alert);
  },
  denotify({ commit }: ActionContext<State, RootState>, alert: Alert): void {
    commit("removeAlert", alert);
  },
};

const mutations = {
  addAlert: (state: State, alert: Alert): Alert[] => {
    state.alerts = [...state.alerts, { id: state.alerts.length + 1, ...alert }];
    return state.alerts;
  },
  removeAlert: (state: State, alert: Alert): Alert[] => {
    state.alerts = [...state.alerts];
    state.alerts.splice(
      state.alerts.findIndex((a) => a.id === alert.id),
      1
    );
    return state.alerts;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
