import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Contact from "@/services/api/v2/contact.service";
import axios from "axios";
import CredentialType from "@/services/api/v2/credential-type.service";
import { IApiPagedResult } from "@/interfaces/api/result.interface";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import { defaultPageResult } from "@/utils/result";
import Http, { HttpResponse } from "@/services/http.service";

const contactService = new Contact();
const httpService = new Http();

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

export interface State {
    requestTypes: Array<string>;
  }
  
  const state: State = {
    requestTypes: [],
  };
  
  const getters = {
    requestTypes: (state: State): Array<string> => state.requestTypes,
  };
  
  const actions = {
      async fetchRequestTypes({ commit }: ActionContext<State, RootState>, url:string): Promise<void> {
        await Http.get<HttpResponse<string>>(
          url
        ).then(resp=> commit("addContactReasons", resp.data));
        //await axios.get(webParams.url).then(resp => commit("addContactReasons", resp.data))
      },
      async postRequest({ commit }: ActionContext<State, RootState>, feedback: ContactRequest|IncorrectInfoContactRequest): Promise<void> {
        await contactService.postFeedback(feedback)
      },
  };
  
  const mutations = {
    addContactReasons: (state: State, contactReasons: Array<string>): Array<string> => {
        state.requestTypes = contactReasons;
        return state.requestTypes;
    },
    
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  