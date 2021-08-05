import { IEntityFacetField } from "@/interfaces/api/v2/entityFilter.interface"
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import _, { filter } from "lodash-es"

export type Filter = { [key:string]: string | Array<string> | boolean}




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
  Authorities: [
    { text: "CRA", value: "Canada Revenue Agency", count: 0 },
    { text: "BCREG", value: "BC Corporate Registry", count: 0 },
    { text: "LIQUOR", value: "Liquor & Cannabis Regulation Branch", count: 0 },
    { text: "MINES", value: "Ministry of Energy, Mines and Low Carbon Innovation", count: 0 }
  ],
  Credential_type: [
    { text: "BN", value: "Business number", count: 0 },
    { text: "MINES", value: "BC Mines Act permit", count: 0 },
    { text: "CANNABIS_MARKETING", value: "Cannabis marketing license", count: 0 },
    { text: "CANNABIS_RETAIL", value: "Cannabis retail license", count: 0 },
    { text: "REGISTRATION", value: "Registration", count: 0 }
  ],
  Registration_type: [
    { text: "AMALGAMATION", value: "Amalgamation", count: 5 },
    { text: "CHANGE", value: "Change of name, address, or other articles", count: 0 },
    { text: "DISSOLUTION", value: "Dissolution", count: 0 },
    { text: "INCORP", value: "Incorporation or registration", count: 0 },
    { text: "REINSTATEMENT", value: "Reinstatement", count: 0 },
    { text: "WARNING", value: "Warning issued", count: 0 }
  ]
};

const getters = {
  getAuthorities: (state: State): Array<IEntityFacetField> => state.Authorities,
  getCredentialTypes: (state: State): Array<IEntityFacetField> => state.Credential_type,
  getRegistrationTypes: (state: State): Array<IEntityFacetField> => state.Registration_type,
  getEntityFilters: (state: State): Filter => {
    if (!state.EntityFilter) {
      return {
        Authorities: [],
        Credential_type: [],
        Registration_type: [],
        Date_min: "",
        Date_max: "",
        Show_expired: true,
      }
    } else {
      return state.EntityFilter
    }
  }
};

const actions = {
  setFilter({ commit }: ActionContext<State, RootState>, filter: Filter): void {
    commit("setFilter", filter);
  },
};

const mutations = {
  setFilter: (state: State, filter: Filter): Filter | null => {
    //need a deep clone since we are copying a nested object
    state.EntityFilter = {...filter};
    return state.EntityFilter
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
