<template>
  <Dialog>
    <template #activator>
      <span @click.stop><slot name="title"></slot> </span
      ><v-icon small :class="{ 'search-help': light }" class="fake-link mx-1">{{
          mdiHelpCircleOutline,

      }}</v-icon>
    </template>
    <template #content>
      <p>
        The OrgBook searching by legal name returns all of the organizations
        that have any of the words that you search on, and floats the most
        likely matches to the top of the list. In most cases, that means that
        putting the fully legal name of the entity will float that result to the
        top. However, in some cases you may find that you get both many (many!)
        search results, and the entity you are looking for is not at the top.
        This most often happens when the legal name has punctuation marks -- for
        example a period "." at the end of the name, e.g. "Co." or "Inc.". It's
        a problem with the search tool we are using -- we're working on a fix!
      </p>
      <p>
        When you get too many results and the name you are looking for is not at
        the top, we recommend that you put only the least common word (or two)
        from the name. For example, when searching for "BKV SOCIAL ENTERPRISE
        CO.", about 1300 results are returned, with the top ones having "Social"
        in them. That darn trailing period! In this case "BKV" is the least
        common word, so let's only search for that by typing "BKV" into the
        search bar and hitting ENTER (e.g. don't pick anything from the drop
        down list). The result is now just a couple of entries, one of which is
        the one we want.
      </p>
      <p>
        Remember as well that with OrgBook, you don't have to search on the
        legal name. You can also search on the BC Registries ID (has two
        characters and 7 digits, like FM1234567) and by the CRA Business Number
        (9-digits) for the entity. If you know one or both of those values,
        using those for an existing entity will always find an exact match.
      </p>
      <p>
        If you still can't find the entity you are looking for (and you are
        pretty sure it exists), please use the "Contact" link at the top of the
        page to let us know what you are looking for and that you can't find it,
        and we'll see if we can help.
      </p>
    </template>
  </Dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { mapGetters } from "vuex";
import Dialog from "@/components/shared/Dialog.vue";

@Component({
  components: {
    Dialog,
  },
  computed: {
    ...mapGetters(["mdiHelpCircleOutline"]),
  },
})
export default class SearchHelpPopup extends Vue {
  @Prop({ default: false }) light!: boolean;
}
</script>
<style lang="scss" scoped>
.search-help {
  color: $white;
}
</style>
