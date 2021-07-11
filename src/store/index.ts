import Vue from "vue";
import Vuex from "vuex";
import app, { State as AppState } from "./modules/app";
import alert, { State as AlertState } from "./modules/notification";

Vue.use(Vuex);

export interface State {
  app: AppState;
  alert: AlertState;
}

export default new Vuex.Store({
  modules: {
    app,
    alert,
  },
});
