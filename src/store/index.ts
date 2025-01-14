import Vue from "vue";
import Vuex from "vuex";
import credentialType, {
  State as CredentialTypeState,
} from "./modules/credential-type";
import doc, { State as DocState } from "./modules/doc";
import entity, { State as EntityState } from "./modules/entity";
import entityDesc, { State as EntityDescState } from "./modules/entity-desc";
import feedback from "./modules/feedback";
import icon, { State as IconState } from "./modules/icon";
import search, { State as SearchState } from "./modules/search";
import stats, { State as StatsState } from "./modules/statistics";
import like, { State as LikeState } from "./modules/like";

Vue.use(Vuex);

export interface State {
  credentialType: CredentialTypeState;
  doc: DocState;
  entity: EntityState;
  entityDesc: EntityDescState;
  icon: IconState;
  search: SearchState;
  stats: StatsState;
  like: LikeState;
}

export default new Vuex.Store({
  modules: {
    credentialType,
    doc,
    entity,
    entityDesc,
    feedback,
    icon,
    search,
    stats,
    like,
  },
});
