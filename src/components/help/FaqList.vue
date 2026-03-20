<template>
  <div>
    <nav class="faq-toc mb-8">
      <p class="text-subtitle-2 font-weight-bold toc-heading mb-2">Jump to a topic</p>
      <ul class="toc-list">
        <li v-for="category in categories" :key="category.id">
          <a :href="'#' + category.id" class="toc-link" @click.prevent="scrollToCategory(category.id)">{{ category.title }}</a>
        </li>
      </ul>
    </nav>

    <div v-for="category in categories" :key="category.id" class="mb-8">
      <h2 :id="category.id" class="category-title text-h6 font-weight-bold mb-3">
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
      <div class="text-right mt-3">
        <a href="#" class="back-to-top-link" @click.prevent="scrollToTop">&#8593; Back to top</a>
      </div>
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
    scrollToCategory(id: string): void {
      const el = document.getElementById(id);
      if (!el) return;
      const vMain = document.querySelector(".v-main") as HTMLElement;
      const fixedOffset = vMain
        ? parseInt(getComputedStyle(vMain).paddingTop)
        : 80;
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - fixedOffset;
      window.scrollTo({ top, behavior: "smooth" });
    },
    scrollToTop(): void {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
});
</script>

<style scoped>
.faq-toc {
  background-color: #f0f4f8;
  border-left: 4px solid #fcba19;
  border-radius: 4px;
  padding: 1em 1.25em;
}

.toc-heading {
  color: #003366;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  columns: 2;
}

.toc-list li {
  margin-bottom: 0.35em;
}

@media (max-width: 600px) {
  .toc-list {
    columns: 1;
  }
}

.toc-link {
  color: #1a5a96;
  text-decoration: none;
  font-size: 0.9rem;
  line-height: 1.4;
}

.toc-link::before {
  content: "› ";
}

.toc-link:hover {
  text-decoration: underline;
}

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

.back-to-top-link {
  color: #1a5a96;
  font-size: 0.9rem;
  text-decoration: none;
}

.back-to-top-link:hover {
  text-decoration: underline;
}
</style>
