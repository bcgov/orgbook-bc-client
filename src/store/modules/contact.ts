import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Contact from "@/services/api/v2/contact.service";
import {
  IContactRequest,
  IIncorrectInfoContactRequest,
} from "@/interfaces/api/v2/contact.interface";

const contactService = new Contact();

export const contactReason: { [key: string]: string } = {
  INCORRECT_INFO: "My organization's information is incorrect",
  REGISTER_ORGANIZATION: "I want my organization listed on OrgBook BC",
  REGISTER_ISSUER: "I want to become an OrgBook BC issuer",
  API_INFO: "I want more information about APIs",
  OTHER: "Other",
};

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
  async sendFeedback(
    _: ActionContext<State, RootState>,
    feedback: IContactRequest | IIncorrectInfoContactRequest
  ): Promise<void> {
    await contactService.postFeedback(feedback);
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
