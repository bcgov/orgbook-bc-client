import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import axios from "axios";

export interface ContactRequest {
    reason: string;
    name: string;
    email: string;
    message: string;
}

export interface IncorrectInfoContactRequest extends ContactRequest {
    reason: string;
    error: string;
    identifier: string;
}

export interface webData{
  url:string;
  data:any;
}

export interface State {
    credentialTypes: Array<string>;
    requestTypes: Array<string>;
  }
  
  const state: State = {
    credentialTypes: [],
    requestTypes: [],
  };
  
  const getters = {
    credentialTypes: (state: State): Array<string> => state.credentialTypes,
    requestTypes: (state: State): Array<string> => state.requestTypes,
  };
  
  const actions = {
      async fetchRequestTypes({ commit }: ActionContext<State, RootState>, webParams:webData): Promise<void> {
        await axios.get(webParams.url).then(resp => commit("addContactReasons", resp.data))
      },
      async fetchCredentialTypes({ commit }: ActionContext<State, RootState>, webParams: webData): Promise<void> {
        await axios.get(webParams.url).then(resp => commit("addCredentialTypes", resp.data))
      },
      async postRequest({ commit }: ActionContext<State, RootState>, webParams: webData): Promise<void> {
        await axios.post(webParams.url, webParams.data)
      },
  };
  
  const mutations = {
    addContactReasons: (state: State, contactReasons: Array<string>): Array<string> => {
        console.log(contactReasons)
        state.requestTypes = contactReasons;
        return state.requestTypes;
    },
    addCredentialTypes: (state: State, credentialTypes: Array<string>): Array<string> => {
        state.credentialTypes = credentialTypes;
        return state.credentialTypes;
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  