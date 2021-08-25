import Vue from "vue";
import Vuex from "vuex";
import app, { State as AppState } from "./modules/app";
import alert, { State as AlertState } from "./modules/notification";
import contact, { State as ContactState } from "./modules/contact";
import credentialType, {
  State as CredentialTypeState,
} from "./modules/credential-type";
import doc, { State as DocState } from "./modules/doc";
import search, { State as SearchState } from "./modules/search";
import topic, { State as TopicState } from "./modules/topic";

Vue.use(Vuex);

export interface State {
  app: AppState;
  alert: AlertState;
  contact: ContactState;
  credentialType: CredentialTypeState;
  doc: DocState;
  search: SearchState;
  topic: TopicState;
}

export default new Vuex.Store({
  modules: {
    app,
    alert,
    contact,
    credentialType,
    doc,
    search,
    topic,
  },
});
