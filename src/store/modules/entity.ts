import { IEntityFacetField } from "@/interfaces/api/v2/entityFilter.interface";
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import IssuerService from "@/services/api/v3/issuer.service";
import Topic from "@/services/api/v2/topic.service";
import { ICredential } from "@/interfaces/api/v2/credential.interface";
import CredentialType from "@/services/api/v2/credential-type.service"

export type Filter = { [key: string]: string | Array<string> | boolean };

const issuerService = new IssuerService();
const topicService = new Topic();
const credentialTypeService = new CredentialType();

export interface State {
  Credentials_expanded:boolean;
};

const state:State={
  Credentials_expanded : false
}

const getters = {
  getCredentialsExpanded: (state: State): boolean => state.Credentials_expanded,
};

const actions = {
  toggleCredentialsExpanded({ commit }: ActionContext<State, RootState>) {
    commit("toggleCredentialsExpanded");
  }
  
};

const mutations = {
  toggleCredentialsExpanded: (state: State): void => {
    state.Credentials_expanded = !state.Credentials_expanded;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
