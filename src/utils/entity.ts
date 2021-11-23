import { IIssuer } from "@/interfaces/api/v2/issuer.interface";
import { IRelationship } from "@/interfaces/api/v2/relationship.interface";
import {
  ICredential,
  ICredentialDisplayType,
} from "@/interfaces/api/v4/credential.interface";
import { IEntityFilter } from "@/interfaces/entity-filter.interface";
import { selectFirstAttrItem } from "@/utils/attribute";
import i18n from "@/i18n/index";

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

export function getRelationshipIssuer(
  relationship: IRelationship,
  credSet: ICredential[]
): IIssuer | undefined {
  return selectFirstAttrItem(
    { key: "id", value: relationship.credential.id },
    credSet
  )?.credential_type?.issuer;
}

export function credOrRelationshipToDisplay(
  item: ICredential | IRelationship,
  credSet?: ICredential[]
): ICredentialDisplayType {
  const display: ICredentialDisplayType = {
    id: 0,
    credential_type: "",
    type: "",
    authority: "",
    authorityLink: "",
    date_effective: new Date(),
    revoked: false,
    value: "",
    credential_type_id: 0,
  };
  if (isCredential(item)) {
    const credItem = item as ICredential;
    display.id = credItem.id;
    display.authority = credItem.credential_type.issuer.name;
    display.authorityLink = credItem.credential_type.issuer.url;
    display.type = credItem.names[0]?.type;
    display.credential_type = credItem.credential_type.description;
    display.date_effective = credItem.effective_date;
    const registration_reason = selectFirstAttrItem(
      { key: "type", value: "reason_description" },
      credItem.attributes
    )?.value;
    if (registration_reason !== undefined) {
      display.registration_reason = `reason_description.${registration_reason}`;
    }
    display.revoked = credItem.revoked;
    display.revoked_date = credItem.revoked_date;
    display.value = credItem.names[0]?.text;
    display.schema_label = credItem.credential_type.schema_label;
    display.highlighted_attributes =
      credItem.credential_type.highlighted_attributes;
    display.credential_title = credItem.credential_type.credential_title;
    display.attributes = credItem.attributes;
    display.credential_type_id = credItem.credential_type.id;
  } else {
    const relItem = item as IRelationship;

    display.id = relItem.credential.id;
    display.authority = "";
    display.authorityLink = "";
    if (credSet !== undefined) {
      const issuer = getRelationshipIssuer(relItem, credSet);
      if (issuer !== undefined) {
        display.authority = issuer.name;
        display.authorityLink = issuer.url;
      }
    }

    display.credential_type = relItem.credential.credential_type.description;
    //display.type = relItem.related_topic.names[0]?.type
    display.type = "entity_name";
    display.date_effective = relItem.credential.effective_date;
    display.revoked = relItem.credential.revoked;
    display.revoked_date = relItem.credential.revoked_date;
    display.relationship_types = relItem.attributes.map((attr) => attr.value);
    display.value = getRelationshipName(relItem);
    display.schema_label = relItem.credential.credential_type.schema_label;
    display.highlighted_attributes =
      relItem.credential.credential_type.highlighted_attributes;
    display.credential_title =
      relItem.credential.credential_type.credential_title;
    display.attributes = relItem.attributes;
    display.credential_type_id = relItem.credential.credential_type.id;
  }
  return display;
}

export function isEntityFilterActive(
  filterField: string,
  getEntityFilters: IEntityFilter,
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

export function getCredentialLabel(cred: ICredentialDisplayType): string {
  let credDesc = cred.credential_type;
  const locale = i18n.locale;
  if (cred.schema_label?.translations?.[locale]?.label) {
    credDesc = cred.schema_label.translations[locale].label;
  }
  return credDesc;
}

export function isRegType(cred: ICredentialDisplayType): boolean {
  return cred.credential_type === "registration.registries.ca";
}
