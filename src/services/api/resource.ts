export default abstract class ApiResource {
  abstract baseVersion: string;
  abstract basePath: string;

  protected formatEndpointUrl(path?: string): string {
    let url = `${this.baseVersion}/${this.basePath}`;
    if (path) {
      url += `${path}`;
    }
    return url;
  }
}
