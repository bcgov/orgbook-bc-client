import { defineStore } from "pinia";
import { State as RootState } from "@/store/index";
import { IStatistics } from "@/interfaces/api/v2/statistics.interface";
import Statistics from "@/services/api/v2/statistics.service";

const statisticsService = new Statistics();

interface State {
	statistics: IStatistics | null;
}

export const useStatisticsState = defineStore("appState", {
	state: (): State => ({
		statistics: null,
	}),
	getters: {
		getStatistics: (state: State): IStatistics | null => state.statistics,
	},
	actions: {
		async fetchStatistics(): Promise<void> {
			try {
				const res = await statisticsService.getStats();
				this.setStatistics(res.data);
			} catch (e) {
				console.error(e);
				this.setStatistics(null);
			}
		},
		setStatistics(statistics: IStatistics): void {
			this.statistics = { ...statistics };
		},
	},
});
