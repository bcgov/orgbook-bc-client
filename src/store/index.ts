import Vue from "vue";
import Vuex from "vuex";
import app, { State as AppState } from "./modules/app";
import contact, { State as ContactState } from "./modules/contact";
import credentialDetail, {State as CredentialDetailState} from "./modules/credential-detail"
import credentialType, {
  State as CredentialTypeState,
} from "./modules/credential-type";
import doc, { State as DocState } from "./modules/doc";
import entity, { State as EntityState } from "./modules/entity";
import icon, { State as IconState } from "./modules/icon";
import search, { State as SearchState } from "./modules/search";
import stats, { State as StatsState } from "./modules/statistics";
import topic, { State as TopicState } from "./modules/topic";

Vue.use(Vuex);

export interface State {
  app: AppState;
  contact: ContactState;
  credentialDetail: CredentialDetailState;
  credentialType: CredentialTypeState;
  doc: DocState;
  entity: EntityState;
  icon: IconState;
  search: SearchState;
  stats: StatsState;
  topic: TopicState;
}

export default new Vuex.Store({
  modules: {
    app,
    contact,
    credentialDetail,
    credentialType,
    doc,
    entity,
    icon,
    search,
    stats,
    topic,
  },
});
