import { IDoc } from "@/services/doc/doc.service";

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
