<template>
    <v-container>
        <v-card>
            <v-card-title>{{title}}</v-card-title>
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
