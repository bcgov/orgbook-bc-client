import { defineStore } from "pinia";
import {
	ICredentialType,
	ICredentialTypeByIssuer,
} from "@/interfaces/api/v2/credential-type.interface";
import CredentialType from "@/services/api/v4/credential-type.service";
import Schema from "@/services/api/v4/schema.service";

const credentialTypeSerivice = new CredentialType();
const schemaService = new Schema();

interface CredentialTypeState {
	schemas: Record<string, ICredentialType[]>;
	credentialTypes: ICredentialType[];
	selected: ICredentialType | null;
}

export const useCredentialTypeState = defineStore("credentialTypeState", {
	state: (): CredentialTypeState => ({
		schemas: {},
		credentialTypes: [],
		selected: null,
	}),
	getters: {
		credentialType: (state: CredentialTypeState): ICredentialType | null =>
			state.selected,
		getCredentialTypes: (state: CredentialTypeState): ICredentialType[] =>
			state.credentialTypes,
		getSchemas: (
			state: CredentialTypeState
		): Record<string, ICredentialType[]> => state.schemas,
		credentialTypesByIssuer: (
			state: CredentialTypeState
		): ICredentialTypeByIssuer[] =>
			Object.values(
				state.credentialTypes.reduce(
					(
						acc: Record<number | string, ICredentialTypeByIssuer>,
						type: ICredentialType
					) => {
						if (!acc[type.issuer.id]) {
							acc[type.issuer.id] = {
								issuer: type.issuer,
								credentialTypes: [type],
							};
						} else {
							acc[type.issuer.id].credentialTypes.push(type);
						}
						return acc;
					},
					{}
				)
			),
	},
	actions: {
		async fetchCredentialTypes(paging = true): Promise<void> {
			try {
				const res = await credentialTypeSerivice.getCredentialTypes(paging);
				this.setCredentialTypes(res.data);
			} catch (e) {
				console.error(e);
				this.setCredentialTypes([]);
			}
		},
		async fetchSchemas(): Promise<void> {
			try {
				const res = await schemaService.getSchemas();
				this.setSchemas(res.data);
			} catch (e) {
				console.error(e);
				this.setSchemas({});
			}
		},
		setSchemas(schemas: Record<string, ICredentialType[]>): void {
			this.schemas = { ...schemas };
		},
		setCredentialTypes(credentialTypes: ICredentialType[]): void {
			this.credentialTypes = [...credentialTypes];
		},
	},
});
