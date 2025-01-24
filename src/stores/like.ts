import { defineStore } from "pinia";
export interface LikeState {
	like: "like" | "dislike" | "";
}

export const useLikeState = defineStore("likeState", {
	state: (): LikeState => ({
		like: "",
	}),
	getters: {
		getLikeStatus: (state: LikeState): "like" | "dislike" | "" => {
			return state.like;
		},
	},
	actions: {
		setLike(like: "like" | "dislike" | ""): void {
			this.like = like;
		},
	},
});
