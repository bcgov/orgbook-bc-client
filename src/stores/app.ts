import { defineStore } from "pinia";
interface AppState {
	loading: boolean;
}

export const useAppState = defineStore("appState", {
	state: (): AppState => ({
		loading: false,
	}),
	getters: {
		getLoading: (state: AppState): boolean => state.loading,
	},
	actions: {
		setLoading(loading: boolean): void {
			this.loading = loading;
		},
	},
});
