import {
  mdiAlertOutline,
  mdiArrowLeft,
  mdiCheckBold,
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiFilterOutline,
  mdiMagnify,
  mdiShieldCheckOutline,
} from "@mdi/js";

export interface State {
  icons: Record<string, string>;
}

const state: State = {
  icons: {
    mdiAlertOutline: mdiAlertOutline,
    mdiArrowLeft: mdiArrowLeft,
    mdiCheckBold: mdiCheckBold,
    mdiChevronLeft: mdiChevronLeft,
    mdiChevronRight: mdiChevronRight,
    mdiClose: mdiClose,
    mdiFilterOutline: mdiFilterOutline,
    mdiMagnify: mdiMagnify,
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