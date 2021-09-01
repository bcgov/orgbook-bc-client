import {
  mdiAlertOutline,
  mdiArrowDown,
  mdiArrowLeft,
  mdiArrowUp,
  mdiCalendar,
  mdiCheckBold,
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiFilterOutline,
  mdiMagnify,
  mdiMapMarker,
  mdiShieldCheckOutline,
} from "@mdi/js";

export interface State {
  icons: Record<string, string>;
}

const state: State = {
  icons: {
    mdiAlertOutline: mdiAlertOutline,
    mdiArrowDown: mdiArrowDown,
    mdiArrowLeft: mdiArrowLeft,
    mdiArrowUp: mdiArrowUp,
    mdiCalendar: mdiCalendar,
    mdiCheckBold: mdiCheckBold,
    mdiChevronLeft: mdiChevronLeft,
    mdiChevronRight: mdiChevronRight,
    mdiClose: mdiClose,
    mdiFilterOutline: mdiFilterOutline,
    mdiMagnify: mdiMagnify,
    mdiMapMarker: mdiMapMarker,
    mdiShieldCheckOutline: mdiShieldCheckOutline,
  },
};

const getters = Object.keys(state.icons).reduce((acc, name) => {
  return { ...acc, [name]: (state: State) => state.icons[name] };
}, {});

export default {
  state,
  getters,
};
