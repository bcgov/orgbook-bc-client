export default abstract class ApiResource {
  abstract baseVersion: string;
  abstract basePath: string;

  protected formatEndpointUrl(path?: string): string {
    let url = "/api";
    if (this.baseVersion === "v4") {
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
