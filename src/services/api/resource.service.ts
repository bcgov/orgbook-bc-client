import store from "@/store";

export default abstract class ApiResource {
  abstract baseVersion: string;
  abstract basePath: string;

  protected formatEndpointUrl(path?: string): string {
    let url = `${(store.getters.apiUrl as URL).toString()}/${
      this.baseVersion
    }/${this.basePath}`;
    if (path) {
      url += `${path}`;
    }
    return url;
  }
}
