import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Credential from "@/services/api/v2/credential.service";
import CredentialVerifier from "@/services/api/v3/credential-verify.service";
import { ICredentialFormatted } from "@/interfaces/api/v4/credential.interface";
import { ICredentialProof } from "@/interfaces/api/v3/credential-verified.interface";

export type Filter = { [key: string]: string | Array<string> | boolean };

const credentialService = new Credential();
const credVerificationService = new CredentialVerifier();

export interface State {
  selectedCredential: ICredentialFormatted | undefined;
  presentationId: string;
  presentationEX: ICredentialProof | undefined;
}

const state: State = {
  selectedCredential: undefined,
  presentationId: "",
  presentationEX: undefined,
};

const getters = {
  getSelectedCredential: (state: State): ICredentialFormatted | undefined =>
    state.selectedCredential,
};

const actions = {
  async fetchSelectedCredential(
    { commit }: ActionContext<State, RootState>,
    id: string
  ): Promise<void> {
    try {
      const res = await credentialService.getFormattedCredential(id);
      commit("setSelectedCredential", res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

const mutations = {
  setSelectedCredential: (state: State, cred: ICredentialFormatted): void => {
    state.selectedCredential = cred;
  },
  setPresId: (state: State, presId: string): void => {
    state.presentationId = presId;
  },

  setPresEX: (state: State, presEX: ICredentialProof): void => {
    state.presentationEX = presEX;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
