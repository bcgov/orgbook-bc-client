import { ActionContext } from "vuex";
import { State as RootState } from "@/store";
import {
  ICredentialType,
  ICredentialTypeByIssuer,
} from "@/interfaces/api/v2/credential-type.interface";
import CredentialType from "@/services/api/v4/credential-type.service";

const credentialTypeSerivice = new CredentialType();

export interface State {
  types: ICredentialType[];
  selected: ICredentialType | null;
}

const state: State = {
  types: [],
  selected: null,
};

const getters = {
  credentialType: (state: State): ICredentialType|null => state.selected,
  credentialTypes: (state: State): ICredentialType[] => state.types,
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
  async fetchCredentialTypeByID(
    { commit }: ActionContext<State, RootState>,
    id:number
  ): Promise<void> {
    try {
      const res = await credentialTypeSerivice.getCredentialType(id);
      commit("setType", res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

const mutations = {
  setTypes(state: State, types: ICredentialType[]): void {
    state.types = [...types];
  },
  setType(state:State, type:ICredentialType): void{
    state.selected = type;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
