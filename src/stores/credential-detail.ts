import { defineStore } from "pinia";
import Credential from "@/services/api/v2/credential.service";
import CredentialVerifier from "@/services/api/v3/credential-verify.service";
import { ICredentialFormatted } from "@/interfaces/api/v4/credential.interface";
import { ICredentialProof } from "@/interfaces/api/v3/credential-verified.interface";

export type Filter = { [key: string]: string | Array<string> | boolean };

const credentialService = new Credential();
const credVerificationService = new CredentialVerifier();

export interface CredentialState {
	selectedCredential: ICredentialFormatted | undefined;
	presentationId: string;
	presentationEX: ICredentialProof | undefined;
}
export const useCredentialState = defineStore("credentialState", {
	state: (): CredentialState => ({
		selectedCredential: undefined,
		presentationId: "",
		presentationEX: undefined,
	}),
	getters: {
		getSelectedCredential: (
			state: CredentialState
		): ICredentialFormatted | undefined => state.selectedCredential,
	},
	actions: {
		async fetchSelectedCredential(id: string): Promise<void> {
			try {
				const res = await credentialService.getFormattedCredential(id);
				this.setSelectedCredential(res.data);
			} catch (e) {
				console.error(e);
			}
		},
		setSelectedCredential(cred: ICredentialFormatted): void {
			this.selectedCredential = cred;
		},
		setPresId(presId: string): void {
			this.presentationId = presId;
		},
		setPresEX(presEX: ICredentialProof): void {
			this.presentationEX = presEX;
		},
	},
});
