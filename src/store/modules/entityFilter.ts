import { IEntityFacetField } from "@/interfaces/api/v2/entityFilter.interface";
import { ITopic } from "@/interfaces/api/v2/topic.interface";
import { ICredentialSet } from "@/interfaces/api/v2/credential-set.interface";
import { ActionContext } from "vuex";
import { State as RootState } from "@/store/index";
import IssuerService from "@/services/api/v3/issuer.service";
import Topic from "@/services/api/v2/topic.service";
import { ICredential, ICredentialDisplayType } from "@/interfaces/api/v4/credential.interface";
import { selectFirstAttrItem } from "@/utils/attributeFilter";
import { isRegType } from "@/utils/entityFilter";
import { IRelationship } from "@/interfaces/api/v2/relationship.interface";

export type Filter = { [key: string]: string | Array<string> | boolean };

const issuerService = new IssuerService();
const topicService = new Topic();

export interface State {
  selected: {
    topic: ITopic | null;
    credentialSet: ICredentialSet | null;
  };
  EntityFilter: Filter | null;
  Authorities: Array<IEntityFacetField>;
  Credential_type: Array<IEntityFacetField>;
  Registration_type: Array<IEntityFacetField>;
}

const state: State = {
  selected: {
    topic: null,
    credentialSet: null,
  },
  EntityFilter: null,
  Authorities: [],
  Credential_type: [],
  Registration_type: [],
};

const getters = {
  getAuthorities: (state: State): Array<IEntityFacetField> => state.Authorities,
  getCredentialTypes: (state: State): Array<IEntityFacetField> =>
    state.Credential_type,
  getRegistrationTypes: (state: State): Array<IEntityFacetField> =>
    state.Registration_type,
  getEntityFilters: (state: State): Filter => {
    if (!state.EntityFilter) {
      return {
        Authorities: [],
        Credential_type: [],
        Registration_type: [],
        Date_min: "",
        Date_max: "",
        Show_expired: true,
      };
    } else {
      return state.EntityFilter;
    }
  },
};


const actions = {
  setIssuers(
    { commit }: ActionContext<State, RootState>,
    creds: Array<ICredentialDisplayType>
  ): void {
    const filterFields: IEntityFacetField[] = [];

    creds.forEach((cred) => {
      const idx = filterFields
        .map((field) => field.value)
        .indexOf(cred.authority);
      if (idx >= 0) {
        (filterFields[idx].count as number) += 1;
      } else {
        filterFields.push({
          text: cred.authority,
          value: cred.authority,
          count: 1,
        });
      }
    });
    commit("setIssuers", filterFields);
  },
  setCredentialType(
    { commit }: ActionContext<State, RootState>,
    creds: Array<ICredentialDisplayType>
  ): void {
    const filterFields: IEntityFacetField[] = [];

    creds.forEach((cred) => {

      const idx = filterFields
        .map((field) => field.value)
        .indexOf(cred.credential_type);
      if (idx >= 0) {
        (filterFields[idx].count as number) += 1;
      } else {
        filterFields.push({
          text: cred.credential_type,
          value: cred.credential_type,
          count: 1,
        });
      }
    });
    commit("setCredTypes", filterFields);
  },

  setRegistrationType(
    { commit }: ActionContext<State, RootState>,
    creds: Array<ICredentialDisplayType>
  ): void {
    const filterFields: IEntityFacetField[] = [];

    creds.forEach((cred) => {
      if (isRegType(cred)) {
        const regDesc = cred.registration_reason
        if (regDesc !== undefined) {
          const idx = filterFields
            .map((field) => field.value)
            .indexOf(regDesc);
          if (idx >= 0) {
            (filterFields[idx].count as number) += 1;
          } else {
            filterFields.push({
              text: regDesc,
              value: regDesc,
              count: 1,
            });
          }
        }

      }

    });

    commit("setRegTypes", filterFields);
  },

  // async fetchFilters(
  //   { commit }: ActionContext<State, RootState>,
  //   id: number
  // ): Promise<void> {
  //   const credList = await topicService.getTopicCredentialSet(id);
  //   let fullCredList: ICredential[] = [];
  //   (credList.data as unknown as Array<ICredentialSet>).forEach((credSet) => {
  //     fullCredList = [...fullCredList, ...credSet.credentials];
  //   });
  //   commit("setFilterCounts", fullCredList);
  // },
  setFilter({ commit }: ActionContext<State, RootState>, filter: Filter): void {
    commit("setFilter", filter);
  },
  toggleEntityFilter(
    { commit }: ActionContext<State, RootState>,
    params: { filterString: string; filterField: string }
  ): void {
    const baseFilter = getters.getEntityFilters(state);
    let currFilters: string[] | string | boolean =
      baseFilter[params.filterField] === undefined
        ? []
        : baseFilter[params.filterField];
    if (typeof currFilters === "string" && currFilters !== "") {
      //we should only support clearing strings, adding strings should be done through setFilter
      currFilters = "";
    } else if (typeof currFilters === "boolean") {
      currFilters = !currFilters;
    } else {
      currFilters = currFilters as string[];
      if (!currFilters.includes(params.filterString)) {
        currFilters.push(params.filterString);
      } else {
        const idx = currFilters.indexOf(params.filterString);
        currFilters.splice(idx, 1);
      }
    }
    baseFilter[params.filterField] = currFilters;
    commit("setFilter", baseFilter);
  },
};

const mutations = {
  // setFilterCounts: (state: State, fullCredList: ICredential[]): void => {
  //   state.Authorities.forEach((obj) => {
  //     obj.count = fullCredList.filter(
  //       (cred) => cred.credential_type.description === obj.text
  //     ).length;
  //   });
  // },
  setCredTypes(state: State, credTypes: IEntityFacetField[]): void {
    state.Credential_type = credTypes;
  },
  setIssuers(state: State, issuers: IEntityFacetField[]): void {
    state.Authorities = issuers;
  },
  setRegTypes(state: State, regTypes: IEntityFacetField[]): void {
    state.Registration_type = regTypes;
  },
  setFilter: (state: State, filter: Filter): Filter | null => {
    //need a deep clone since we are copying a nested object
    state.EntityFilter = { ...filter };
    return state.EntityFilter;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
