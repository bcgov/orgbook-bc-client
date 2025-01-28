import { defineStore } from "pinia";
import { State as RootState } from "@/store/index";
import { IDocRoute } from "@/interfaces/doc.interface";

interface DocState {
	docRoutes: IDocRoute[];
}

export const useDocState = defineStore("docState", {
	state: (): DocState => ({
		docRoutes: [],
	}),
	getters: {
		docLinks: (state: DocState): IDocRoute[] => {
			return state.docRoutes.filter((docRoute) => !docRoute?.data?.index);
		},
		showcaseLinks: (state: DocState): IDocRoute[] => {
			return state.docRoutes.filter((docRoute) => docRoute?.data?.showcase);
		},
		getDocRoutes: (state: DocState): IDocRoute[] => {
			return state.docRoutes;
		},
		getDocRoute:
			(state: DocState) =>
			(name: string): IDocRoute => {
				return state.docRoutes.filter((docRoute) => docRoute.name === name)[0];
			},
	},
	actions: {
		setDocRoutes(docRoutes: IDocRoute[]): void {
			this.setDocRoutes(docRoutes);
		},
	},
});
