import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";

export interface State {
  like: "like" | "dislike" | "";
}

const state: State = {
  like: "",
};

const getters = {
  getLikeStatus: (state: State): "like" | "dislike" | "" => {
    return state.like;
  }
};

const actions = {
  setLike(
    { commit }: ActionContext<State, RootState>,
    like: "like" | "dislike" | ""
  ): void {
    commit("setLike", like);
  },
};

const mutations = {
  setLike(state: State, like: "like" | "dislike" | ""): void {
    state.like = like;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
