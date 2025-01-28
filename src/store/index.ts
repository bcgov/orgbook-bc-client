import Vue from "vue";
import Vuex from "vuex";
import doc, { State as DocState } from "./modules/doc";
import search, { State as SearchState } from "./modules/search";

Vue.use(Vuex);

export interface State {
  doc: DocState;
  search: SearchState;
}

export default new Vuex.Store({
  modules: {
    doc,
    // TODO: For some reason removing search results in SearchTopicPage.vue:25 Uncaught ReferenceError: Cannot access 'useSearchState' before initialization
    search,
  },
});
