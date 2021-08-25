import { ActionContext } from "vuex";
import { State as RootState } from "@/store";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import CredentialType from "@/services/api/v2/credential-type.service";

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
  credentialTypes: (state: State): ICredentialType[] => state.types,
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
};

const mutations = {
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
