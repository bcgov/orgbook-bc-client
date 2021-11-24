import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import entities from "@/assets/entities.json";
import { IEntityDesc } from "@/interfaces/entity-desc";

export interface State {
  entity: IEntityDesc | undefined;
}

const state: State = {
  entity: undefined,
};

const getters = {
  entityDesc: (state: State): IEntityDesc | undefined => {
    return state.entity;
  },
};

const actions = {
  setEntityDesc(
    { commit }: ActionContext<State, RootState>,
    name: string
  ): void {
    let entity = entities.filter((ent) => ent.attributes.name === name)[0];
    if (!entity) {
      //use default value if unknown entity type
      entity = entities.filter(
        (ent) => ent.attributes.name === "bc-company"
      )[0];
    }
    commit("setEntityDesc", entity);
  },
};

const mutations = {
  setEntityDesc(state: State, entity: IEntityDesc): void {
    state.entity = entity;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
