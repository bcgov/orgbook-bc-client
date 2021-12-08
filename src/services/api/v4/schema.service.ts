import { ICredentialType } from "@/interfaces/api/v2/credential-type.interface";
import Http, { HttpResponse } from "@/services/http.service";
import ApiResource from "@/services/api/resource.service";

export default class SchemaType extends ApiResource {
  baseVersion = "v4";
  basePath = "schemas";

  async getSchemaTypes(): Promise<
    HttpResponse<Record<string, ICredentialType[]>>
  > {
    return await Http.get<Record<string, ICredentialType[]>>(
      this.formatEndpointUrl("")
    );
  }
}
