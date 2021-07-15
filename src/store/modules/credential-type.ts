import { ActionContext } from "vuex";
import { State as RootState } from "@/store";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import CredentialType from "@/services/api/v2/credential-type.service";
import { defaultPageResult } from "@/utils/result";

const credentialTypeSerivice = new CredentialType();

export interface State {
  page: IApiPagedResult<ICredentialType>;
  selected: ICredentialType | null;
}

const state: State = {
  page: defaultPageResult<ICredentialType>(),
  selected: null,
};

const getters = {
  pagedCredentialTypes: (state: State): IApiPagedResult<ICredentialType> =>
    state.page,
};

const actions = {
  async fetchCredentialTypes({
    commit,
  }: ActionContext<State, RootState>): Promise<void> {
    try {
      const res = await credentialTypeSerivice.getCredentialTypes();
      commit("setPage", res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

const mutations = {
  setPage(state: State, page: IApiPagedResult<ICredentialType>): void {
    state.page = { ...state.page, ...page };
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
