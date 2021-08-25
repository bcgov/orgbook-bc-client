import { ActionContext } from "vuex";
import store, { State as RootState } from "@/store/index";
import { IDoc, IDocRoute } from "@/services/doc/doc.service";
import router from "@/router";
import { defaultDoc } from "@/utils/doc";

export interface State {
  docs: IDoc[];
}

const state: State = {
  docs: [],
};

const getters = {
  docs: (state: State): IDoc[] => state.docs,
  docLinks: (state: State): IDocRoute[] => {
    return state.docs
      .filter((doc) => !doc.attributes.index)
      .map(processDocRoute);
  },
  showcaseLinks: (state: State): IDocRoute[] => {
    return state.docs
      .filter((doc) => doc.attributes.showcase)
      .map(processDocRoute);
  },
  docRoutes: (state: State): IDocRoute[] => {
    return state.docs.map(processDocRoute);
  },
  docRoute:
    (state: State) =>
    (name: string): IDocRoute => {
      return state.docs
        .filter((doc) => doc.attributes.name === name)
        .map(processDocRoute)[0];
    },
};

const actions = {
  setDocs({ commit }: ActionContext<State, RootState>, docs: IDoc[]): void {
    commit("setDocs", docs);
    store.getters.docRoutes.forEach((docRoute: IDocRoute) => {
      router.addRoute("About", docRoute);
    });
  },
};

const mutations = {
  setDocs(state: State, docs: IDoc[]): void {
    state.docs = [defaultDoc, ...docs];
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

function processDocRoute(doc: IDoc) {
  const { path, name, index, showcase, showcaseTitle, showcaseDescription } =
    doc?.attributes;
  const { html } = doc;
  return {
    path: `/about/${path || ""}`,
    data: { index, showcase, showcaseTitle, showcaseDescription, html },
    label: name,
    name,
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  };
}
