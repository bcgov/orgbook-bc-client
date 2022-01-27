import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Contact from "@/services/api/v4/contact.service";
import { IContactRequest } from "@/interfaces/api/v4/contact.interface";

const contactService = new Contact();

export const contactReason: { [key: string]: string } = {
  FEEDBACK: "Submit a comment/suggestion about Orgbook",
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
  async sendContact(
    _: ActionContext<State, RootState>,
    contact: IContactRequest
  ): Promise<void> {
    await contactService.postContact(contact);
  },
};

const mutations = {};

export default {
  state,
  getters,
  actions,
  mutations,
};
