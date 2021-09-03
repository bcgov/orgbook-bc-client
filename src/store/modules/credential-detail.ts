import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Relationship from "@/services/api/v2/relationship.service";
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import { IEntityFacetField } from "@/interfaces/api/v2/entityFilter.interface";
import { ICredential, ICredentialDetailView, ICredentialDisplayType } from "@/interfaces/api/v4/credential.interface";
import { IRelationship } from "@/interfaces/api/v2/relationship.interface";
import { credOrRelationshipToCredView } from "@/utils/credential-verified";

export type Filter = { [key: string]: string | Array<string> | boolean };

const relationshipService = new Relationship();

export interface State {
  selectedCredential: ICredential | undefined
}

const state: State = {
  selectedCredential: undefined
};

const getters = {
  getSelectedCredential:(state:State):ICredential|undefined=>state.selectedCredential,
};

const actions = {

  setSelectedCredential(
    { commit }: ActionContext<State, RootState>,
    cred: ICredential
  ): void {
    
    const credFormatted = cred;
    commit("setSelectedCredential", credFormatted);
    
  },

  
};

const mutations = {
  setSelectedCredential: (state: State, cred:ICredential ): void => {
    state.selectedCredential = cred;
  },

 
};

export default {
  state,
  getters,
  actions,
  mutations,
};
