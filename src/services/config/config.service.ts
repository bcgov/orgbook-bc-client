import Http from "../http.service";

export interface AppConfig {
  apiUrl: string;
}

export async function getAppConfig(): Promise<AppConfig> {
  const appConfig = await Http.get("/config/config.json");
  return Promise.resolve(appConfig.data as AppConfig);
}
