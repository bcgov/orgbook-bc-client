import Vue from "vue";
import Vuex from "vuex";
import app, { State as AppState } from "./modules/app";
import alert, { State as AlertState } from "./modules/notification";
import credentialType, {
  State as CredentialTypeState,
} from "./modules/credential-type";
import search, { State as SearchState } from "./modules/search";
import topic, { State as TopicState } from "./modules/topic";

Vue.use(Vuex);

export interface State {
  app: AppState;
  alert: AlertState;
  credentialType: CredentialTypeState;
  search: SearchState;
  topic: TopicState;
}

export default new Vuex.Store({
  modules: {
    app,
    alert,
    credentialType,
    search,
    topic,
  },
});
