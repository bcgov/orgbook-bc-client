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
  mdiHelpCircle,
  mdiInformationOutline,
  mdiMagnify,
  mdiMapMarker,
  mdiOpenInNew,
  mdiShieldCheckOutline,
  mdiThumbDown,
  mdiThumbUp,
} from "@mdi/js";

export interface State {
  icons: Record<string, string>;
}

const state: State = {
  icons: {
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
    mdiHelpCircle,
    mdiInformationOutline,
    mdiMagnify,
    mdiMapMarker,
    mdiOpenInNew,
    mdiShieldCheckOutline,
    mdiThumbDown,
    mdiThumbUp,
  },
};

const getters = Object.keys(state.icons).reduce((acc, name) => {
  return { ...acc, [name]: (state: State) => state.icons[name] };
}, {});

export default {
  state,
  getters,
};
