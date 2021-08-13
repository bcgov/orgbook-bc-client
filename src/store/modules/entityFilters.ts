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
  selected: {
    topic: ITopic | null;
    credentialSet: ICredentialSet | null;
  };
  EntityFilter: Filter | null;
  Authorities: Array<IEntityFacetField>;
  Credential_type: Array<IEntityFacetField>;
  Registration_type: Array<IEntityFacetField>;
}

const state: State = {
  selected: {
    topic: null,
    credentialSet: null,
  },
  EntityFilter: null,
  Authorities: [],
  Credential_type: [],
  Registration_type: [
    { text: "AMALGAMATION", value: "Amalgamation", count: 0 },
    {
      text: "CHANGE",
      value: "Change of name, address, or other articles",
      count: 0,
    },
    { text: "DISSOLUTION", value: "Dissolution", count: 0 },
    { text: "INCORP", value: "Incorporation or registration", count: 0 },
    { text: "REINSTATEMENT", value: "Reinstatement", count: 0 },
    { text: "WARNING", value: "Warning issued", count: 0 },
  ],
};

const getters = {
  getAuthorities: (state: State): Array<IEntityFacetField> => state.Authorities,
  getCredentialTypes: (state: State): Array<IEntityFacetField> =>
    state.Credential_type,
  getRegistrationTypes: (state: State): Array<IEntityFacetField> =>
    state.Registration_type,
  getEntityFilters: (state: State): Filter => {
    if (!state.EntityFilter) {
      return {
        Authorities: [],
        Credential_type: [],
        Registration_type: [],
        Date_min: "",
        Date_max: "",
        Show_expired: true,
      };
    } else {
      return state.EntityFilter;
    }
  },
};

const actions = {
  async fetchIssuers({
    commit,
  }: ActionContext<State, RootState>): Promise<void> {
    try {
      const res = await (await issuerService.getIssuerList()).data.results.map(issuer => { return { text: issuer.abbreviation, value: issuer.name, count: 0 } });
      commit("setIssuers", res)
      console.log(res);
    } catch (e) {
      console.error(e);
    }

  },
  async fetchCredntialType({ commit }: ActionContext<State, RootState>): Promise<void> {
    const credTypeListResp = await credentialTypeService.getCredentialTypes();
    const credTypeList: IEntityFacetField[] = credTypeListResp.data.results.map(credType => {
      return { text: credType.schema.name, value: credType.schema.name, count: 0 }
    })
    commit("setCredTypes", credTypeList);
  },
  async fetchFilters(
    { commit }: ActionContext<State, RootState>,
    id: number
  ): Promise<void> {
    const credList = await topicService.getTopicCredentialSet(id);
    let fullCredList: ICredential[] = [];
    (credList.data as unknown as Array<ICredentialSet>).forEach((credSet) => {
      fullCredList = [...fullCredList, ...credSet.credentials];
    });
    commit("setFilterCounts", fullCredList);
  },
  setFilter({ commit }: ActionContext<State, RootState>, filter: Filter): void {
    console.log(filter);
    commit("setFilter", filter);
  },
};

const mutations = {
  setFilterCounts: (state: State, fullCredList: ICredential[]): void => {
    state.Authorities.forEach((obj) => {
      obj.count = fullCredList.filter(
        (cred) => cred.local_name.text === obj.text
      ).length;
    });
    state.Credential_type.forEach((obj) => {
      obj.count = fullCredList.filter(
        (cred) => cred.credential_type.description === obj.text
      ).length;
    });
  },
  setCredTypes(state: State, credTypes: IEntityFacetField[]) {
    state.Credential_type = credTypes;
  },
  setIssuers(state: State, issuers: IEntityFacetField[]) {
    state.Authorities = issuers;
  },
  setFilter: (state: State, filter: Filter): Filter | null => {
    //need a deep clone since we are copying a nested object
    state.EntityFilter = { ...filter };
    return state.EntityFilter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
