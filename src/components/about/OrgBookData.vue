<template>
  <div>
    <p class="font-weight-bold">Data types in OrgBook BC</p>
    <p>OrgBook BC contains:</p>
    <v-simple-table class="mb-4" dense>
      <template v-slot:default>
        <thead>
          <tr>
            <th
              class="
                text-left text-body-2 text--primary
                font-weight-bold
                pl-0
                pr-0
                pt-2
                pb-2
                ml-2
                mr-2
              "
            >
              Issuer
            </th>
            <th
              class="
                text-left text-body-2 text--primary
                font-weight-bold
                pl-0
                pr-0
                pt-2
                pb-2
                ml-2
                mr-2
              "
            >
              Credentials
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in credentialTypesByIssuer" :key="entry.issuer.id">
            <td class="float-top pl-0 pr-0 pt-2 pb-2 ml-2 mr-2">
              {{ entry.issuer.name }}
            </td>
            <td class="float-top pl-0 pr-0 pr-0 pt-2 pb-2 ml-2 mr-2">
              <div v-for="type in entry.credentialTypes" :key="type.id">
                {{ type.description }}
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <p>More data types will be added in the future.</p>

    <p>
      Find out how you can add your organization’s data to OrgBook BC by
      <router-link to="/about/becoming-an-issuer"
        >becoming an “issuer”</router-link
      >.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";

@Component({
  computed: {
    ...mapGetters(["credentialTypesByIssuer"]),
  },
})
export default class OrgBookData extends Vue {}
</script>

<style lang="scss" scoped>
.float-top {
  vertical-align: top;
}
</style>
