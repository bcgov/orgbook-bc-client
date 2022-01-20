<template>
  <div>
    <v-container :fluid="$vuetify.breakpoint.smAndDown" class="pa-5">
      <BackTo />
      <p class="font-weight-bold">Advanced Search</p>
      <v-select
        outlined
        dense
        v-model="selectedId"
        :items="formattedCredentialTypes"
        label="Credential Type"
      ></v-select>
      <router-link :to="`/search?credential_type_id=${selectedId}&page=1`" v-if="selectedId">
        <v-btn
          id="contactSubmitButton"
          depressed
          :disabled="loading"
          aria-label="submit-button"
          >Submit</v-btn
        >
      </router-link>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BackTo from "@/components/shared/BackTo.vue";
import { mapActions, mapGetters } from "vuex";
import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import { unwrapTranslations } from "@/utils/entity";

interface Data {
  selectedId: number;
}

@Component({
  components: {
    BackTo,
  },
  computed: {
    ...mapGetters(["credentialTypes", "loading"]),
  },
  methods: {
    ...mapActions(["setLoading", "fetchCredentialTypes"]),
  },
})
export default class AdvancedSearch extends Vue {
  setLoading!: (loading: boolean) => void;
  fetchCredentialTypes!: (paged: boolean) => Promise<void>;
  loading!: boolean;
  credentialTypes!: ICredentialType[];

  data(): Data {
    return { selectedId: 0 };
  }

  get formattedCredentialTypes(): Array<{ text: string; value: number }> {
    return this.credentialTypes.map((type) => ({
      // TODO: remove unwrap translations functions after backend update
      text: unwrapTranslations(type.schema_label)?.[this.$i18n.locale]?.label
        ? (
            unwrapTranslations(type.schema_label) as Record<
              string,
              { label: string; description: string }
            >
          )[this.$i18n.locale].label
        : type.description,
      value: type.id,
    }));
  }

  async created(): Promise<void> {
    this.setLoading(true);
    this.fetchCredentialTypes(false);
    this.setLoading(false);
  }
}
</script>

<style lang="scss" scoped>
#contactSubmitButton {
  background: $primary-color !important;
  color: $white !important;
}
</style>