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
  presentationID: string;
  presentationEX: ICredentialProof | undefined;
}

const state: State = {
  selectedCredential: undefined,
  presentationID: "",
  presentationEX: undefined,
};

const getters = {
  getSelectedCredential: (state: State): ICredentialFormatted | undefined =>
    state.selectedCredential,
  getPresentationID: (state: State): string => state.presentationID,
  getPresentationEX: (state: State): ICredentialProof | undefined =>
    state.presentationEX,
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
  async fetchPresId(
    { commit }: ActionContext<State, RootState>,
    id: string
  ): Promise<void> {
    try {
      const res = await credVerificationService.credentialVerify(id);
      commit("setPresID", res.data.presentation_exchange_id);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchPresEx(
    { commit }: ActionContext<State, RootState>,
    params: { id: string; presID: string }
  ): Promise<void> {
    try {
      const res = await credVerificationService.credentialVerifyPresEx(
        params.id,
        params.presID
      );
      commit("setPresEX", res.data);
    } catch (e) {
      console.log(e);
    }
  },
};

const mutations = {
  setSelectedCredential: (state: State, cred: ICredentialFormatted): void => {
    state.selectedCredential = cred;
  },
  setPresID: (state: State, presID: string): void => {
    state.presentationID = presID;
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
