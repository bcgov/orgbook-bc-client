import Http from "../http.service";

export interface IAppConfig {
  apiUrl: string;
}

export async function getAppConfig(): Promise<IAppConfig> {
  const appConfig = await Http.get("/config/config.json");
  return Promise.resolve(appConfig.data as IAppConfig);
}
