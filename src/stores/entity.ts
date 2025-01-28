import { defineStore } from "pinia";
import Relationship from "@/services/api/v2/relationship.service";
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import {
	IEntityFacetField,
	IEntityFilter,
} from "@/interfaces/entity-filter.interface";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { ICredentialDisplayType } from "@/interfaces/api/v4/credential.interface";
import { isRegType } from "@/utils/entity";
import i18n from "@/i18n/index";

const relationshipService = new Relationship();

export interface EntityState {
	relationships: Relationship[];
	top: number;
	selected: {
		topic: ITopic | null;
		credentialSet: ICredentialSet | null;
	};
	entityFilter: IEntityFilter | null;
	filterValues: {
		authorities: Array<IEntityFacetField>;
		credentialType: Array<IEntityFacetField>;
		registrationType: Array<IEntityFacetField>;
	};
}

export const useEntityState = defineStore("entityState", {
	state: (): EntityState => ({
		relationships: [],
		top: 0,
		selected: {
			topic: null,
			credentialSet: null,
		},
		entityFilter: null,
		filterValues: {
			authorities: [],
			credentialType: [],
			registrationType: [],
		},
	}),
	getters: {
		getScrollY: (state: EntityState): number => state.top,
		getRelationships: (state: EntityState): Relationship[] =>
			state.relationships,
		getAuthorities: (state: EntityState): Array<IEntityFacetField> =>
			state.filterValues.authorities,
		getCredentialTypes: (state: EntityState): Array<IEntityFacetField> =>
			state.filterValues.credentialType,
		getRegistrationTypes: (state: EntityState): Array<IEntityFacetField> =>
			state.filterValues.registrationType,
		getEntityFilters: (state: EntityState): IEntityFilter => {
			if (!state.entityFilter) {
				return {
					authorities: [],
					credential_type: [],
					registration_type: [],
					date_min: "",
					date_max: "",
					show_expired: true,
				};
			} else {
				return state.entityFilter;
			}
		},
	},
	actions: {
		async fetchRelationships(topic_id: number): Promise<void> {
			try {
				console.log("fetching relationships");
				const res = await relationshipService.getRelatedTo(topic_id);
				console.log(res);
				this.setRelationships(res.data);
			} catch (e) {
				console.error(e);
			}
		},

		setScrollY(top: number): void {
			this.top = top;
		},
		//issuer filters
		setIssuers(creds: Array<ICredentialDisplayType>): void {
			const filterFields: IEntityFacetField[] = [];

			creds.forEach((cred) => {
				const idx = filterFields
					.map((field) => field.value)
					.indexOf(cred.authority);
				if (idx >= 0) {
					(filterFields[idx].count as number) += 1;
				} else {
					filterFields.push({
						text: cred.authority,
						value: cred.authority,
						count: 1,
					});
				}
			});
			this.filterValues.authorities = filterFields;
		},
		// credential type filters
		setCredentialType(creds: Array<ICredentialDisplayType>): void {
			const filterFields: IEntityFacetField[] = [];
			creds.forEach((cred) => {
				let credDesc = cred.credential_type;
				if (cred.schema_label?.[i18n.locale]?.label) {
					credDesc = cred.schema_label[i18n.locale].label;
				}
				const idx = filterFields.map((field) => field.value).indexOf(credDesc);
				if (idx >= 0) {
					(filterFields[idx].count as number) += 1;
				} else {
					// The text and value fields are backwards here
					filterFields.push({
						text: cred.credential_type,
						value: credDesc,
						count: 1,
					});
				}
			});
			this.setCredTypes(filterFields);
		},
		// registration type filters
		setRegistrationType(creds: Array<ICredentialDisplayType>): void {
			const filterFields: IEntityFacetField[] = [];

			creds.forEach((cred) => {
				if (isRegType(cred)) {
					const regDesc = cred.registration_reason;
					if (regDesc !== undefined) {
						const idx = filterFields
							.map((field) => field.value)
							.indexOf(regDesc);
						if (idx >= 0) {
							(filterFields[idx].count as number) += 1;
						} else {
							filterFields.push({
								text: regDesc,
								value: regDesc,
								count: 1,
							});
						}
					}
				}
			});

			this.setRegTypes(filterFields);
		},

		setFilter(filter: IEntityFilter): void {
			this.entityFilter = { ...filter };
			return this.entityFilter;
		},
		toggleEntityFilter(params: {
			filterString: string;
			filterField: string;
		}): void {
			const baseFilter = this.getEntityFilters;
			let currFilters: string[] | string | boolean =
				baseFilter[params.filterField] === undefined
					? []
					: baseFilter[params.filterField];
			if (typeof currFilters === "string" && currFilters !== "") {
				//we should only support clearing strings, adding strings should be done through setFilter
				currFilters = "";
			} else if (typeof currFilters === "boolean") {
				currFilters = !currFilters;
			} else {
				currFilters = currFilters as string[];
				if (!currFilters.includes(params.filterString)) {
					currFilters.push(params.filterString);
				} else {
					const idx = currFilters.indexOf(params.filterString);
					currFilters.splice(idx, 1);
				}
			}
			baseFilter[params.filterField] = currFilters;
			this.setFilter(baseFilter);
		},
		setRelationships(relationships: Relationship[]): void {
			this.relationships = relationships;
		},
		//entity filter mutations
		setCredTypes(credTypes: IEntityFacetField[]): void {
			this.filterValues.credentialType = credTypes;
		},
		setRegTypes(regTypes: IEntityFacetField[]): void {
			this.filterValues.registrationType = regTypes;
		},
		clearFilter(): void {
			this.entityFilter = null;
		},
	},
});
