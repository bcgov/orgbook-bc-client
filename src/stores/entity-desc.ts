import entities from "@/assets/entities.json";
import { IEntityDesc } from "@/interfaces/entity-desc";
import { defineStore } from "pinia";

export interface EntityDescState {
	entity: IEntityDesc | undefined;
}

export const useEntityDescState = defineStore("entityDescState", {
	state: (): EntityDescState => ({
		entity: undefined,
	}),
	getters: {
		entityDesc: (state: EntityDescState): IEntityDesc | undefined => {
			return state.entity;
		},
	},
	actions: {
		setEntityDesc(params: {
			code: string;
			fileName: string;
			displayName: string | undefined;
		}): void {
			// find the entity description file name
			let entity = entities.filter(
				(ent) => ent.attributes.name === params.fileName
			)[0];
			if (!entity) {
				//use default value if unknown entity type
				entity = entities.filter(
					(ent) => ent.attributes.name === "undefined"
				)[0];
				let entityTypeDisplay = params.code;
				if (params.displayName) {
					entityTypeDisplay += `, ${params.displayName}`;
				}
				entity.html = entity.html.replace("@placeholder@", entityTypeDisplay);
			}
			this.entity = entity;
		},
	},
});
