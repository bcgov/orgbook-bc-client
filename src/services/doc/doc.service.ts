export interface IDoc {
  attributes: {
    path: string;
    name: string;
    index?: boolean;
    showcase?: boolean;
  };
  html: string;
}

export interface IDocRoute {
  path: string;
  name: string;
  label: string;
  data?: {
    showcase?: boolean;
    html: string;
  };
  component?: unknown;
}

export async function getDocs(): Promise<IDoc[]> {
  const docs = await import(
    /* webpackChunkName: "docs" */ "@/assets/docs.json"
  );
  return Promise.resolve(docs.default as IDoc[]);
}
