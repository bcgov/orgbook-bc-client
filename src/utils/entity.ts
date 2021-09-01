import { IRelationship } from "@/interfaces/api/v2/relationship.interface";
import {
  ICredential,
  ICredentialDisplayType,
} from "@/interfaces/api/v4/credential.interface";
import { Filter } from "@/store/modules/entity";
import { selectFirstAttrItem } from "@/utils/attribute";

export function isCredential(item: ICredential | IRelationship): boolean {
  return (item as ICredential)?.credential_type !== undefined;
}

export function getRelationshipName(relationship: IRelationship): string {
  let ret = "";
  const relNameLength = relationship?.related_topic?.names?.length;
  if (relNameLength === undefined || relNameLength <= 0) {
    ret = relationship?.related_topic?.source_id;
  } else {
    ret = selectFirstAttrItem(
      { key: "type", value: "entity_name" },
      relationship?.related_topic.names
    )?.text as string;
  }
  return ret;
}

export function credOrRelationshipToDisplay(
  item: ICredential | IRelationship
): ICredentialDisplayType {
  const display: ICredentialDisplayType = {
    credential_type: "",
    type: "",
    authority: "",
    authorityLink: "",
    date_effective: new Date(),
    revoked: false,
    value: "",
  };
  if (isCredential(item)) {
    const credItem = item as ICredential;
    display.authority = credItem.credential_type.issuer.name;
    display.authorityLink = credItem.credential_type.issuer.url;
    display.type = credItem.names[0]?.type;
    display.credential_type = credItem.credential_type.description;
    display.date_effective = credItem.effective_date;
    display.registration_reason = selectFirstAttrItem(
      { key: "type", value: "reason_description" },
      credItem.attributes
    )?.value as string | undefined;
    display.revoked = credItem.revoked;
    display.revoked_date = credItem.revoked_date;
    display.value = credItem.names[0]?.text;
  } else {
    const relItem = item as IRelationship;
    // display.authority = relItem.credential.credential_type.issuer.name
    display.authority = "BC Corporate Registry";
    //display.authorityLink = relItem.credential.credential_type.issuer.url
    display.authorityLink = "#";
    display.credential_type = relItem.credential.credential_type.description;
    //display.type = relItem.related_topic.names[0]?.type
    display.type = "entity_name";
    display.date_effective = relItem.credential.effective_date;
    display.revoked = relItem.credential.revoked;
    display.revoked_date = relItem.credential.revoked_date;
    display.relationship_types = relItem.attributes.map((attr) => attr.value);
    display.value = getRelationshipName(relItem);
  }
  return display;
}

export function isEntityFilterActive(
  filterField: string,
  getEntityFilters: Filter,
  filterString?: string
): boolean {
  //filter string only applies if we're filtering array
  const filterList = getEntityFilters[filterField];
  let retval = false;
  if (typeof filterList === "boolean") {
    retval = filterList;
  } else if (typeof filterList === "string") {
    retval = filterList !== "";
  } else if (filterString) {
    retval = filterList.includes(filterString);
  }

  return retval;
}

export function isRegType(cred: ICredentialDisplayType): boolean {
  return cred.credential_type === "registration.registries.ca";
}
