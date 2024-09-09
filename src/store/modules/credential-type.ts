import { ActionContext } from "vuex";
import { State as RootState } from "@/store";
import {
  ICredentialType,
  ICredentialTypeByIssuer,
} from "@/interfaces/api/v2/credential-type.interface";
import CredentialType from "@/services/api/v4/credential-type.service";
import Schema from "@/services/api/v4/schema.service";

const credentialTypeSerivice = new CredentialType();
const schemaService = new Schema();

export interface State {
  schemas: Record<string, ICredentialType[]>;
  credentialTypes: ICredentialType[];
  selected: ICredentialType | null;
}

const state: State = {
  schemas: {},
  credentialTypes: [],
  selected: null,
};

const getters = {
  credentialType: (state: State): ICredentialType | null => state.selected,
  credentialTypes: (state: State): ICredentialType[] => state.credentialTypes,
  schemas: (state: State): Record<string, ICredentialType[]> => state.schemas,
  credentialTypesByIssuer: (state: State): ICredentialTypeByIssuer[] =>
    Object.values(
      state.credentialTypes.reduce(
        (
          acc: Record<number | string, ICredentialTypeByIssuer>,
          type: ICredentialType
        ) => {
          if (!acc[type.issuer.id]) {
            acc[type.issuer.id] = {
              issuer: type.issuer,
              credentialTypes: [type],
            };
          } else {
            acc[type.issuer.id].credentialTypes.push(type);
          }
          return acc;
        },
        {}
      )
    ),
};

const actions = {
  async fetchCredentialTypes(
    { commit }: ActionContext<State, RootState>,
    paging = true
  ): Promise<void> {
    try {
      const res = await credentialTypeSerivice.getCredentialTypes(paging);
      commit("setCredentialTypes", res.data);
    } catch (e) {
      console.error(e);
      commit("setCredentialTypes", []);
    }
  },
  async fetchSchemas({
    commit,
  }: ActionContext<State, RootState>): Promise<void> {
    try {
      const res = await schemaService.getSchemas();
      commit("setSchemas", res.data);
    } catch (e) {
      console.error(e);
      commit("setSchemas", {});
    }
  },
};

const mutations = {
  setSchemas(state: State, schemas: Record<string, ICredentialType[]>): void {
    state.schemas = { ...schemas };
  },
  setCredentialTypes(state: State, credentialTypes: ICredentialType[]): void {
    state.credentialTypes = [...credentialTypes];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
