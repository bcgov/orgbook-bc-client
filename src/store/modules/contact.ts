import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Contact from "@/services/api/v2/contact.service";


const contactService = new Contact();

export const contactReason:{[key:string]:string} = {
  "INCORRECT_INFO" : "My organization's information is incorrect",
  "REGISTER_ORGANIZATION" : "I want my organization listed on OrgBook BC",
  "REGISTER_ISSUER" : "I want to become an OrgBook BC issuer",
  "API_INFO" : "I want more information about APIs",
  "OTHER" : "Other",
}

export interface ContactRequest {
    reason: string;
    from_name: string;
    from_email: string;
    comments: string;
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
      
      async postRequest({ commit }: ActionContext<State, RootState>, feedback: ContactRequest|IncorrectInfoContactRequest): Promise<void> {
        await contactService.postFeedback(feedback)
      },
  };
  
  const mutations = {
    
  };
  
  export default {
    state,
    getters,
    actions,
    mutations,
  };
  