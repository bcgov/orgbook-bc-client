import Vue from "vue";
import Vuex from "vuex";
import app, { State as AppState } from "./modules/app";
import alert, { State as AlertState } from "./modules/notification";
import contact, { State as ContactState } from "./modules/contact";


Vue.use(Vuex);

export interface State {
  app: AppState;
  alert: AlertState;
  contact: ContactState;
}

export default new Vuex.Store({
  modules: {
    app,
    alert,
    contact,
  },
});
