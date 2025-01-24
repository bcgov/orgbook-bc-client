import { IApiPagedResult } from "@/interfaces/api/result.interface";
import {
	ISearchFilter,
	ISearchFilterFacets,
	ISearchFilterFieldRecord,
	ISearchQuery,
	ISearchTopic,
} from "@/interfaces/api/v4/search-topic.interface";
import { useCredentialTypeState } from "./credential-type";
import { defaultFacetResult, defaultPageResult } from "@/utils/result";
import v4Search from "@/services/api/v4/search.service";
import v3Search from "@/services/api/v3/search.service";
import router from "@/router";
import { Dictionary } from "vue-router/types/router";
import { ISearchAutocomplete } from "@/interfaces/api/v3/search-autocomplete.interface";
import {
	credentialTypeSpec,
	entityStatusSpec,
	entityTypeSpec,
	pageSpec,
} from "@/data/search";
import {
	fieldKeyFormatter,
	fieldValueFormatter,
	processField,
	topFieldSelector,
	moreFieldSelector,
	getQueryValueFromFilter,
} from "@/utils/search";
import { objHasProp } from "@/utils/general";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import i18n from "@/i18n/index";
import { unwrapTranslations } from "@/utils/entity";
import { defineStore } from "pinia";
const v4SearchService = new v4Search();
const v3SearchService = new v3Search();

const topTypes: string[] = ["BC", "CP", "GP", "S", "SP"];

const filterSpec: ISearchFilter[] = [
	entityStatusSpec,
	entityTypeSpec,
	credentialTypeSpec,
	pageSpec,
];

export interface SearchState {
	query: ISearchQuery | null;
	filters: ISearchFilter[];
	page: IApiPagedResult<ISearchTopic>;
	facets: ISearchFilterFacets;
}

export const useSearchState = defineStore("searchState", {
	state: (): SearchState => ({
		query: null,
		filters: [],
		page: defaultPageResult<ISearchTopic>(),
		facets: defaultFacetResult,
	}),
	getters: {
		searchQuery: (state: SearchState): ISearchQuery | null => state.query,
		searchFilters: (state: SearchState): ISearchFilter[] => state.filters,
		pagedSearchTopics: (state: SearchState): IApiPagedResult<ISearchTopic> =>
			state.page,
		searchFilterFields: (state: SearchState): ISearchFilterFieldRecord =>
			state?.facets?.fields || defaultFacetResult.fields,
		topEntityTypeFilters: function (): ISearchFilter[] {
			return topFieldSelector(
				{
					...entityTypeSpec,
					inclusions: topTypes,
					keySelector: (filter?: ISearchFilter) =>
						fieldKeyFormatter((filter?.value || "::") as string),
					valueSelector: (filter?: ISearchFilter) =>
						fieldValueFormatter((filter?.value || "::") as string),
				},
				(this.searchFilterFields.category || []) as unknown as ISearchFilter[]
			);
		},
		moreEntityTypeFilters: function (): ISearchFilter[] {
			return moreFieldSelector(
				{
					...entityTypeSpec,
					exclusions: topTypes,
					keySelector: (filter?: ISearchFilter) =>
						fieldKeyFormatter((filter?.value || "::") as string),
					valueSelector: (filter?: ISearchFilter) =>
						fieldValueFormatter((filter?.value || "::") as string),
				},
				(this.searchFilterFields.category || []) as unknown as ISearchFilter[]
			);
		},
		entityStatusFilters() {
			const options = {
				...entityStatusSpec,
				keySelector: (filter?: ISearchFilter) =>
					fieldKeyFormatter((filter?.value || "::") as string),
				valueSelector: (filter?: ISearchFilter) =>
					fieldValueFormatter((filter?.value || "::") as string),
			};
			return (
				(this.searchFilterFields.category || []) as unknown as ISearchFilter[]
			)
				.filter((filter) => options.keySelector(filter) === options.key)
				.map((filter) => processField(options, filter));
		},
		credentialTypeFilters: function (): ISearchFilter[] {
			const options = {
				...credentialTypeSpec,
				keySelector: (filter?: ISearchFilter) => filter?.text || "",
				valueSelector: (filter?: ISearchFilter) => filter?.value || "",
				labelFormatter: (filter?: ISearchFilter) => {
					const credentialTypeStore = useCredentialTypeState();
					const credentialType: ICredentialType =
						credentialTypeStore.getCredentialTypes.find(
							(type: ICredentialType) => type.id.toString() === filter?.value
						);
					if (credentialType?.format === "vc_di") {
						// TODO: Eventually, this should be a translation from OCA
						return credentialType?.schema?.name;
					}
					return (
						unwrapTranslations(credentialType.schema_label)?.[i18n.locale]
							?.label ??
						credentialType.description ??
						""
					);
				},
			};
			return (
				(this.searchFilterFields.credential_type_id ||
					[]) as unknown as ISearchFilter[]
			).map((filter) => processField(options, filter));
		},
		extendedSearchFilterFields: function (): ISearchFilter[] {
			return [
				...this.topEntityTypeFilters,
				...this.moreEntityTypeFilters,
				...this.entityStatusFilters,
				...this.credentialTypeFilters,
			];
		},
	},
	actions: {
		resetSearch(): void {
			this.setQuery(null);
			this.setFilters([]);
			this.setPage(defaultPageResult<ISearchTopic>());
			this.setFacets(defaultFacetResult);
		},
		setSearchQuery(query: ISearchQuery): void {
			this.setQuery(query);
		},
		setSearchFilters(query: ISearchQuery): void {
			const filters = filterSpec.filter((filter) =>
				objHasProp(query, filter.queryParameter)
			);
			for (const filter of filters) {
				filter.value = query[filter.queryParameter];
			}
			this.setFilters(filters);
		},
		toggleSearchFilter(filter: ISearchFilter): void {
			const query: ISearchQuery = { ...this.searchQuery };
			const filters: ISearchFilter[] = [...this.searchFilters];
			const selectedFilter = filters.find(
				(selected) => selected.key === filter.key
			);
			if (selectedFilter) {
				const value = filter?.valueMapper
					? filter.valueMapper[filter.value as string]
					: filter.value;
				selectedFilter.value = selectedFilter.value !== value ? value : "";
				filters.splice(filters.indexOf(selectedFilter), 1, selectedFilter);
			} else {
				filters.push(filter);
			}
			for (const filter of filters) {
				query[filter.queryParameter] = getQueryValueFromFilter(query, filter);
			}
			// Reset the page back to the first
			query["page"] = 1;
			this.fetchSearch(query);
		},
		async fetchSearchFacetedTopics(): Promise<void> {
			try {
				const query: ISearchQuery = { ...this.searchQuery };
				const filters: ISearchFilter[] = [...this.searchFilters];
				const apiQuery: ISearchQuery = { q: query.q };
				for (const filter of filters) {
					apiQuery[filter.queryParameter] = getQueryValueFromFilter(
						query,
						filter
					);
				}
				const res = await v4SearchService.facetedTopic(apiQuery);
				this.setFacets(res.data.facets);
				this.setPage(res.data.objects);
			} catch (e) {
				console.error(e);
			}
		},
		async fetchAutocomplete(
			q: string
		): Promise<IApiPagedResult<ISearchAutocomplete>> {
			try {
				const res = await v3SearchService.autocomplete(q);
				return res.data;
			} catch (e) {
				console.error(e);
				return defaultPageResult<ISearchAutocomplete>();
			}
		},
		async fetchSearch(query: ISearchQuery): Promise<void> {
			this.setSearchQuery(query);
			this.setSearchFilters(query);
			router
				.push({ name: "Search", query: query as unknown as Dictionary<string> })
				.catch(() => undefined);
		},

		setQuery(query: ISearchQuery): void {
			this.query = query ? { ...query } : null;
		},
		setPage(page: IApiPagedResult<ISearchTopic>): void {
			this.page = { ...page };
		},
		setFacets(facets: ISearchFilterFacets): void {
			this.facets = { ...facets };
		},
		setFilters(filters: ISearchFilter[]): void {
			this.filters = [...filters];
		},
	},
});
