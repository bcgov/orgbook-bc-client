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
    params: { code: string; fileName: string; displayName: string | undefined }
  ): void {
    // find the entity description file name
    let entity = entities.filter(
      (ent) => ent.attributes.name === params.fileName
    )[0];
    if (!entity) {
      //use default value if unknown entity type
      entity = entities.filter((ent) => ent.attributes.name === "undefined")[0];
      let entityTypeDisplay = params.code;
      if (params.displayName) {
        entityTypeDisplay += `, ${params.displayName}`;
      }
      entity.html = entity.html.replace("@placeholder@", entityTypeDisplay);
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
