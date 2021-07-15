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
  data:ContactRequest|IncorrectInfoContactRequest;
}

export interface State {
    credentialTypes: Array<string>;
    requestTypes: Array<string>;
    contactLoading: boolean
  }
  
  const state: State = {
    credentialTypes: [],
    requestTypes: [],
    contactLoading:false,
  };
  
  const getters = {
    credentialTypes: (state: State): Array<string> => state.credentialTypes,
    requestTypes: (state: State): Array<string> => state.requestTypes,
    contactLoading: (state: State): boolean => state.contactLoading,
  };
  
  const actions = {
      async fetchRequestTypes({ commit }: ActionContext<State, RootState>, webParams:webData): Promise<void> {
        await axios.get(webParams.url).then(resp => commit("addContactReasons", resp.data))
      },
      async fetchCredentialTypes({ commit }: ActionContext<State, RootState>, webParams: webData): Promise<void> {
        await axios.get(webParams.url).then(resp => commit("addCredentialTypes", resp.data))
      },
      async setContactLoading({ commit }: ActionContext<State, RootState>, loading: boolean): Promise<void>{
        commit("setContactLoadingState", loading)
      },
      async postRequest({ commit }: ActionContext<State, RootState>, webParams: webData): Promise<void> {
        await axios.post(webParams.url, webParams.data)
      },
  };
  
  const mutations = {
    addContactReasons: (state: State, contactReasons: Array<string>): Array<string> => {
        state.requestTypes = contactReasons;
        return state.requestTypes;
    },
    addCredentialTypes: (state: State, credentialTypes: Array<string>): Array<string> => {
        state.credentialTypes = credentialTypes;
        return state.credentialTypes;
    },
    setContactLoadingState:(state: State, loading: boolean): boolean =>{
      state.contactLoading = loading;
      return state.contactLoading;
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  