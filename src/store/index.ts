import Vue from "vue";
import Vuex from "vuex";
import app, { State as AppState } from "./modules/app";
import contact, { State as ContactState } from "./modules/contact";
import credentialType, {
  State as CredentialTypeState,
} from "./modules/credential-type";
import doc, { State as DocState } from "./modules/doc";
import icon, { State as IconState } from "./modules/icon";
import search, { State as SearchState } from "./modules/search";
import topic, { State as TopicState } from "./modules/topic";
import entity, { State as EntityState } from "./modules/entity";

Vue.use(Vuex);

export interface State {
  app: AppState;
  contact: ContactState;
  credentialType: CredentialTypeState;
  doc: DocState;
  icon: IconState;
  search: SearchState;
  topic: TopicState;
  entity: EntityState;
}

export default new Vuex.Store({
  modules: {
    app,
    contact,
    credentialType,
    doc,
    icon,
    search,
    topic,
    entity,
  },
});
