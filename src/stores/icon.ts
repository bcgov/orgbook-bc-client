import {
	mdiAlertOutline,
	mdiArrowDown,
	mdiArrowLeft,
	mdiArrowUp,
	mdiCalendar,
	mdiCheckBold,
	mdiChevronLeft,
	mdiChevronRight,
	mdiCircleMedium,
	mdiClose,
	mdiFilterOutline,
	mdiHelpCircleOutline,
	mdiInformationOutline,
	mdiMagnify,
	mdiMapMarker,
	mdiOpenInNew,
	mdiShieldCheckOutline,
	mdiThumbDown,
	mdiThumbUp,
} from "@mdi/js";
import { defineStore } from "pinia";
export interface IconState {
	icons: Record<string, string>;
}
const state = {
	icons: {
		mdiAlertOutline,
		mdiArrowDown,
		mdiArrowLeft,
		mdiArrowUp,
		mdiCalendar,
		mdiCheckBold,
		mdiChevronLeft,
		mdiChevronRight,
		mdiCircleMedium,
		mdiClose,
		mdiFilterOutline,
		mdiHelpCircleOutline,
		mdiInformationOutline,
		mdiMagnify,
		mdiMapMarker,
		mdiOpenInNew,
		mdiShieldCheckOutline,
		mdiThumbDown,
		mdiThumbUp,
	},
};
export const useIconState = defineStore("iconState", {
	state: (): IconState => state,
	getters: Object.keys(state.icons).reduce((acc, name) => {
		return { ...acc, [name]: (state: IconState) => state.icons[name] };
	}, {}),
});
