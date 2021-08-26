export interface IDoc {
  attributes: {
    name: string;
    path?: string;
    index?: boolean;
    showcase?: boolean;
    showcaseTitle?: string;
    showcaseDescription?: string;
  };
  html: string;
}

export interface IDocRoute {
  path: string;
  name: string;
  label: string;
  data?: IDocRouteData;
  component?: unknown;
}

export interface IDocRouteData {
  index?: boolean;
  showcase?: boolean;
  showcaseTitle?: string;
  showcaseDescription?: string;
  html: string;
}

export async function getDocs(): Promise<IDoc[]> {
  const docs = await import(
    /* webpackChunkName: "docs" */ "@/assets/docs.json"
  );
  return Promise.resolve(docs.default as IDoc[]);
}
