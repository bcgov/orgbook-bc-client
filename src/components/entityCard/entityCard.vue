<template>
    <v-container>
        <v-card>
            <v-card-title v-if="title">{{title}}</v-card-title>
            <v-expansion-panels v-if="$slots.expansionPanels" accordion>
                <slot name="expansionPanels"></slot>
            </v-expansion-panels>
            <slot></slot>
        </v-card>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    props:['title']
})

export default class EntityCard extends Vue {}
</script>
