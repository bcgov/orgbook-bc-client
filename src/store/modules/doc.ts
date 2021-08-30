import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import { IDocRoute } from "@/interfaces/doc.interface";

export interface State {
  docRoutes: IDocRoute[];
}

const state: State = {
  docRoutes: [],
};

const getters = {
  docLinks: (state: State): IDocRoute[] => {
    return state.docRoutes.filter((docRoute) => !docRoute?.data?.index);
  },
  showcaseLinks: (state: State): IDocRoute[] => {
    return state.docRoutes.filter((docRoute) => docRoute?.data?.showcase);
  },
  docRoutes: (state: State): IDocRoute[] => {
    return state.docRoutes;
  },
  docRoute:
    (state: State) =>
    (name: string): IDocRoute => {
      return state.docRoutes.filter((docRoute) => docRoute.name === name)[0];
    },
};

const actions = {
  setDocRoutes(
    { commit }: ActionContext<State, RootState>,
    docRoutes: IDocRoute[]
  ): void {
    commit("setDocRoutes", docRoutes);
  },
};

const mutations = {
  setDocRoutes(state: State, docRoutes: IDocRoute[]): void {
    state.docRoutes = [...docRoutes];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
