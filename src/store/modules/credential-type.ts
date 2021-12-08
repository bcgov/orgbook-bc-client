import { ActionContext } from "vuex";
import { State as RootState } from "@/store";
import {
  ICredentialType,
  ICredentialTypeByIssuer,
} from "@/interfaces/api/v2/credential-type.interface";
import CredentialType from "@/services/api/v4/credential-type.service";
import SchemaType from "@/services/api/v4/schema.service";

const credentialTypeSerivice = new CredentialType();
const schemaTypeService = new SchemaType();

export interface State {
  schemaTypes: Record<string, ICredentialType[]>;
  types: ICredentialType[];
  selected: ICredentialType | null;
}

const state: State = {
  schemaTypes: {},
  types: [],
  selected: null,
};

const getters = {
  credentialType: (state: State): ICredentialType | null => state.selected,
  credentialTypes: (state: State): ICredentialType[] => state.types,
  schemaTypes: (state: State): Record<string, ICredentialType[]> =>
    state.schemaTypes,
  credentialTypesByIssuer: (state: State): ICredentialTypeByIssuer[] =>
    Object.values(
      state.types.reduce(
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
      commit("setTypes", res.data);
    } catch (e) {
      console.error(e);
      commit("setTypes", []);
    }
  },
  async fetchSchemaTypes({
    commit,
  }: ActionContext<State, RootState>): Promise<void> {
    try {
      const res = await schemaTypeService.getSchemaTypes();
      commit("setSchemaTypes", res.data);
    } catch (e) {
      console.error(e);
      commit("setSchemaTypes", {});
    }
  },
};

const mutations = {
  setSchemaTypes(state: State, types: Record<string, ICredentialType[]>): void {
    state.schemaTypes = { ...types };
  },
  setTypes(state: State, types: ICredentialType[]): void {
    state.types = [...types];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
