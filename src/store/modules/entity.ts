import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import Relationship from "@/services/api/v2/relationship.service";

export type Filter = { [key: string]: string | Array<string> | boolean };

const relationshipService = new Relationship();

export interface State {
  Credentials_expanded: boolean;
  Relationships: Relationship[];
}

const state: State = {
  Credentials_expanded: false,
  Relationships: [],
};

const getters = {
  getCredentialsExpanded: (state: State): boolean => state.Credentials_expanded,
  getRelationships: (state: State): Relationship[] => state.Relationships,
};

const actions = {
  toggleCredentialsExpanded({ commit }: ActionContext<State, RootState>): void {
    commit("toggleCredentialsExpanded");
  },

  async fetchRelationships(
    { commit }: ActionContext<State, RootState>,
    topic_id: number
  ): Promise<void> {
    try {
      const res = await relationshipService.getRelatedTo(topic_id);
      console.log(res.data);
      commit("setRelationships", res.data);
    } catch (e) {
      console.error(e);
    }
  },
};

const mutations = {
  toggleCredentialsExpanded: (state: State): void => {
    state.Credentials_expanded = !state.Credentials_expanded;
  },
  setRelationships: (state: State, relationships: Relationship[]): void => {
    state.Relationships = relationships;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
