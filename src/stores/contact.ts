import { defineStore } from "pinia";
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

interface ContactState {
	requestTypes: Array<string>;
}

export const useContactState = defineStore("contactState", {
	state: (): ContactState => ({
		requestTypes: [],
	}),
	getters: {
		getRequestTypes: (state: ContactState): Array<string> => state.requestTypes,
	},
	actions: {
		async sendContact(contact: IContactRequest): Promise<void> {
			await contactService.postContact(contact);
		},
	},
});
