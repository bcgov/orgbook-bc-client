import { IIssuer } from "@/interfaces/api/v2/issuer.interface";
import { IRelationship } from "@/interfaces/api/v2/relationship.interface";
import {
  ICredential,
  ICredentialDisplayType,
  ICredentialAttribute,
  ISchemaLabel,
} from "@/interfaces/api/v4/credential.interface";
import { IEntityFilter } from "@/interfaces/entity-filter.interface";
import { selectFirstAttrItem } from "@/utils/attribute";
import i18n from "@/i18n/index";

export function isCredential(item: ICredential | IRelationship): boolean {
  return (item as ICredential)?.credential_type !== undefined;
}

// Used to append entity_type to the suffix of the string. This is needed to work with 
// entries from the LEAR database
export function toTranslationFormat(base: string, entityType?: string): string {
  if (entityType) {
    const entityTypeSplit = entityType.split('.')
    if (entityTypeSplit.length >= 2) {
      return base + "." + entityTypeSplit[1]
    }
  }
  return base
}

export function getHighlightedAttributes(
  item: ICredential | IRelationship,
  title: string | undefined,
  highlighted: string[] | undefined
): string[] | undefined {
  if (!title && !highlighted) {
    return (item.attributes as ICredentialAttribute[]).map((attr) => attr.type);
  }
  return highlighted;
}

export function isExpired(attrs: ICredentialAttribute[] | undefined): string {
  const date = selectFirstAttrItem({ key: "type", value: "expiry_date" }, attrs)
    ?.value as string | undefined;
  return date && Date.now() > new Date(date).getTime() ? date : "";
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

// TODO: remove after backend update
export function unwrapTranslations(
  label:
    | ISchemaLabel
    | Record<string, { label: string; description: string }>
    | undefined
): Record<string, { label: string; description: string }> | undefined {
  if (label?.translations) {
    return label.translations as
      | Record<string, { label: string; description: string }>
      | undefined;
  }
  return label as
    | Record<string, { label: string; description: string }>
    | undefined;
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
    // TODO: remove unwrap func after backend update
    display.schema_label = unwrapTranslations(
      credItem.credential_type.schema_label
    );
    display.highlighted_attributes = getHighlightedAttributes(
      credItem,
      credItem.credential_type.credential_title,
      credItem.credential_type.highlighted_attributes
    );
    display.credential_title = credItem.credential_type.credential_title;
    display.attributes = credItem.attributes;
    display.credential_type_id = credItem.credential_type.id;
  } else {
    const relItem = item as IRelationship;

    display.id = relItem.credential.id;
    display.rel_id = relItem.related_topic?.source_id;
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
    // TODO: remove unwrap func after backend update
    display.schema_label = unwrapTranslations(
      relItem.credential.credential_type.schema_label
    );
    display.highlighted_attributes = getHighlightedAttributes(
      relItem,
      relItem.credential.credential_type.credential_title,
      relItem.credential.credential_type.highlighted_attributes
    );
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
  if (cred.schema_label?.[locale]?.label) {
    credDesc = cred.schema_label[locale].label;
  }
  return credDesc;
}

export function isRegType(cred: ICredentialDisplayType): boolean {
  return cred.credential_type === "registration.registries.ca";
}
