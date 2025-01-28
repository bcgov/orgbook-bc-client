import { defineStore } from "pinia";
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import Topic from "@/services/api/v2/topic.service";
import V4Topic from "@/services/api/v4/topic.service";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";

const topicService = new Topic();
const v4topicService = new V4Topic();

export interface TopicState {
	selected: {
		topic: ITopic | null;
		credentialSet: ICredentialSet | null;
	};
}

export const useTopicState = defineStore("topicState", {
	state: (): TopicState => ({
		selected: {
			topic: null,
			credentialSet: null,
		},
	}),
	getters: {
		selectedTopic: (state: TopicState): ITopic | null => state?.selected?.topic,
		selectedTopicCredentialSet: (state: TopicState): ICredentialSet | null =>
			state?.selected?.credentialSet,
		selectedTopicFullCredentialSet: (
			state: TopicState
		): ICredentialSet | null => state?.selected?.credentialSet,
	},
	actions: {
		async fetchFormattedIdentifiedTopic({
			sourceId,
			type,
		}: {
			sourceId: string;
			type: string;
		}): Promise<void> {
			try {
				const res = await topicService.getFormattedIdentifiedTopic(
					sourceId,
					type
				);
				console.log(res.data);
				this.setSelectedTopic(res.data);
			} catch (e) {
				console.error(e);
				this.setSelectedTopic(null);
			}
		},
		async fetchTopicCredentialSet(id: number): Promise<void> {
			try {
				const res = await topicService.getTopicCredentialSet(id);
				this.setSelectedCredentialSet(res.data);
			} catch (e) {
				console.error(e);
				this.setSelectedCredentialSet(null);
			}
		},

		async fetchTopicFullCredentialSet(id: number): Promise<void> {
			try {
				const res = await v4topicService.getTopicCredentialSet(id);
				this.setSelectedCredentialSet(res.data);
			} catch (e) {
				console.error(e);
				this.setSelectedCredentialSet(null);
			}
		},
		setSelectedTopic(topic: ITopic): void {
			this.selected = { ...this.selected, topic };
		},
		setSelectedCredentialSet(credentialSet: ICredentialSet): void {
			this.selected = {
				...this.selected,
				credentialSet,
			};
		},
	},
});
