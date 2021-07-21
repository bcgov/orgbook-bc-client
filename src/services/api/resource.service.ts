import store from "@/store";

export default abstract class ApiResource {
  abstract baseVersion: string;
  abstract basePath: string;

  protected formatEndpointUrl(path?: string): string {
    let url = `${(store.getters.apiUrl as URL).toString()}`;
    if (this.baseVersion === "v2") {
      url += `/${this.basePath}`;
    } else {
      url += `/${this.baseVersion}/${this.basePath}`;
    }
    if (path) {
      url += `/${path}`;
    }
    return url;
  }
}
