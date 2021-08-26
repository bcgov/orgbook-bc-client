import { IDoc, IDocRoute } from "@/services/doc/doc.service";

export const defaultDoc: IDoc = {
  attributes: {
    path: "orgbook-data",
    name: "OrgBook Data",
    showcase: true,
    showcaseTitle: "Data types in OrgBook BC",
    showcaseDescription:
      "See the types of organization data, licenses, permits and other information in OrgBook BC.",
  },
  html: "",
};

export function processDocRoute(doc: IDoc): IDocRoute {
  const { path, name, index, showcase, showcaseTitle, showcaseDescription } =
    doc?.attributes;
  const { html } = doc;
  return {
    path: `/about/${path || ""}`,
    data: { index, showcase, showcaseTitle, showcaseDescription, html },
    label: name,
    name,
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  };
}
