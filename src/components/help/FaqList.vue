<template>
  <div>
    <div v-for="category in categories" :key="category.id" class="mb-8">
      <h2 class="category-title text-h6 font-weight-bold mb-3">
        {{ category.title }}
      </h2>
      <v-expansion-panels multiple flat>
        <v-expansion-panel
          v-for="item in category.items"
          :key="item.id"
          class="faq-panel mb-2"
        >
          <v-expansion-panel-header class="faq-question font-weight-medium">
            {{ item.question }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              class="faq-answer"
              v-html="renderMarkdown(item.answer)"
            ></div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import marked from "marked";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface FaqCategory {
  id: string;
  title: string;
  items: FaqItem[];
}

export default Vue.extend({
  name: "FaqList",
  props: {
    categories: {
      type: Array as () => FaqCategory[],
      required: true,
    },
  },
  methods: {
    renderMarkdown(text: string): string {
      return marked(text) as string;
    },
  },
});
</script>

<style scoped>
.category-title {
  color: #003366;
  padding-bottom: 0.4em;
  border-bottom: 3px solid #fcba19;
}

.faq-panel {
  border: 1px solid #d0d0d0;
  border-radius: 4px !important;
  border-left: 4px solid #38598a !important;
  background-color: #ffffff;
}

.faq-question {
  line-height: 1.4;
  color: #313132;
}

.faq-answer {
  border-top: 1px solid #e8e8e8;
  padding-top: 0.75em;
  background-color: #f7f9fc;
  margin: 0 -24px -16px;
  padding: 0.75em 24px 1em;
}

.faq-answer :deep(p) {
  margin-bottom: 0.75em;
}

.faq-answer :deep(p:last-child) {
  margin-bottom: 0;
}

.faq-answer :deep(ul),
.faq-answer :deep(ol) {
  padding-left: 1.5em;
  margin-bottom: 0.75em;
}

.faq-answer :deep(a) {
  color: #1a5a96;
}

.faq-answer :deep(strong) {
  color: #003366;
}
</style>
