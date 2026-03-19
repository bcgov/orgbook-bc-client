const faq = {
  categories: [
    {
      id: "about",
      title: "About OrgBook BC",
      items: [
        {
          id: "what-is-orgbook",
          question: "What is OrgBook BC?",
          answer: `
**OrgBook BC** is a publicly accessible, searchable directory of organizations
registered to do business in British Columbia. It contains verifiable credentials
— digital records issued by trusted government sources — about organizations such
as business registrations, licences, and permits.

OrgBook BC is part of BC's [Digital Trust](https://digital.gov.bc.ca/digital-trust/)
initiative, which aims to make government services simpler and more trustworthy.
          `.trim(),
        },
        {
          id: "who-operates",
          question: "Who operates OrgBook BC?",
          answer: `
OrgBook BC is operated by the **BC Digital Trust Service** within the Province of
British Columbia. The underlying data is issued by government bodies such as
[BC Registries](https://www.bcregistry.gov.bc.ca/) and other provincial licensing
authorities.
          `.trim(),
        },
        {
          id: "what-data",
          question: "What types of information are in OrgBook BC?",
          answer: `
OrgBook BC contains information about registered legal entities in BC, including
the legal name, BC Registries ID, CRA Business Number (when available), entity
type, registration status, and a timeline of registration events such as name
changes and dissolutions.

OrgBook BC does **not** display addresses, director names, contact information,
or ownership details. This is a legislative restriction. For that additional
information, please contact [BC Registries](https://www.bcregistry.gov.bc.ca/).
          `.trim(),
        },
        {
          id: "is-it-free",
          question: "Is OrgBook BC free to use?",
          answer: `
Yes. OrgBook BC is a free, publicly accessible service. No account or login is
required to search the directory or view organization information.

The [OrgBook BC API](/about) is also freely available for use in your own
applications, subject to the
[BC Government Terms of Use](https://www2.gov.bc.ca/gov/content/home/disclaimer).
          `.trim(),
        },
      ],
    },
    {
      id: "more-information",
      title: "Getting More Information About an Entity",
      items: [
        {
          id: "what-info-available",
          question: "What information can I find about an organization on OrgBook BC?",
          answer: `
OrgBook BC shows the information that BC Registries is permitted to publish
publicly, including:

- Legal name and any registered "Doing Business As" (DBA) names
- BC Registries ID and CRA Business Number (when available)
- Entity type (e.g. BC Company, Sole Proprietorship, Society)
- Registration status (Active or Historical)
- Timeline of registration events (incorporations, name changes, dissolutions)

OrgBook BC data is updated within approximately 30 minutes of changes at
BC Registries.
          `.trim(),
        },
        {
          id: "no-address",
          question: "Why can't I find the address or contact information for a business?",
          answer: `
OrgBook BC is not permitted to display address or contact information for
registered entities. This is a legislative restriction — it is not a technical
limitation.

To obtain address or contact details, please visit the
[BC Registries searches and certificates page](https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies/searches-certificates),
or contact BC Registries directly:

- **Email:** bcregistries@gov.bc.ca
- **Phone:** 1-800-663-6102 (Mon–Fri, 8:00 am – 5:00 pm)
          `.trim(),
        },
        {
          id: "no-directors",
          question: "Can I find out who owns or directs a company through OrgBook BC?",
          answer: `
No. OrgBook BC does not provide owner, director, or shareholder information.
This information may be available from BC Registries, potentially for a fee.

Please contact BC Registries at bcregistries@gov.bc.ca or 1-800-663-6102
to enquire about obtaining a business summary.
          `.trim(),
        },
        {
          id: "need-more-details",
          question: "I found a company on OrgBook BC but need more details — where do I go?",
          answer: `
For information beyond what OrgBook BC is permitted to show, please use the
[BC Registries searches and certificates page](https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies/searches-certificates),
or contact the BC Registries Help Desk:

- **Email:** bcregistries@gov.bc.ca
- **Phone:** 1-800-663-6102 (Mon–Fri, 8:00 am – 5:00 pm)
          `.trim(),
        },
        {
          id: "incorrect-info",
          question: "The information for an organization appears incorrect. How do I report it?",
          answer: `
OrgBook BC displays exactly what is held in BC Registries — it does not
independently create or modify records.

If information appears incorrect, contact BC Registries directly:

- **Email:** bcregistries@gov.bc.ca
- **Phone:** 1-800-663-6102 (Mon–Fri, 8:00 am – 5:00 pm)

Once BC Registries corrects the data, OrgBook BC will reflect the change
automatically within approximately 30 minutes.
          `.trim(),
        },
        {
          id: "remove-info",
          question: "Can I request my organization's information be removed from OrgBook BC?",
          answer: `
OrgBook BC publishes information that has been issued by government authorities
through official channels. Because this information reflects public government
records, removal requests should be directed to BC Registries.

For privacy concerns, please refer to the
[BC Government Privacy Policy](https://www2.gov.bc.ca/gov/content/home/privacy).
          `.trim(),
        },
      ],
    },
    {
      id: "registration",
      title: "Updating or Managing Your Own Registration",
      items: [
        {
          id: "update-info",
          question: "How do I update the information shown for my business on OrgBook BC?",
          answer: `
OrgBook BC is a read-only view of BC Registries data and cannot be used to
update registration information. Changes must be made directly through
BC Registries. OrgBook BC will automatically reflect updates within
approximately 30 minutes.

- **Sole proprietorship or general partnership:** Log in to the
  [BC Business Registry](https://www.account.bcregistry.gov.bc.ca/decide-business)
- **Corporation:** Use [BC OnLine](https://www.bconline.gov.bc.ca/)

If you need help, contact BC Registries at bcregistries@gov.bc.ca or
1-800-663-6102.
          `.trim(),
        },
        {
          id: "add-business",
          question: "How do I get my business added to OrgBook BC?",
          answer: `
Register your business with BC Registries. Once registered, it will
automatically appear on OrgBook BC within approximately 30 minutes. There
is no separate submission process for OrgBook BC.

- [Register your business in BC](https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies)
- [Step-by-step guide to starting a BC business](https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/starting-a-business)

If you need additional information, contact the BC Registries Help Desk
at bcregistries@gov.bc.ca or 1-800-663-6102.
          `.trim(),
        },
        {
          id: "sole-prop-not-required",
          question: "Do I need to register my sole proprietorship with BC Registries?",
          answer: `
No. Sole proprietorships are **not required** to register with BC Registries in
BC. However, many do register for practical reasons — such as opening a business
bank account, applying for grants, or establishing a formal business name.

If your sole proprietorship is not registered with BC Registries, it will not
appear on OrgBook BC. If you would like to register, see:

- [Register your business in BC](https://www2.gov.bc.ca/gov/content/employment-business/business/managing-a-business/permits-licences/businesses-incorporated-companies)
          `.trim(),
        },
        {
          id: "dissolve",
          question: "How do I dissolve my company?",
          answer: `
Dissolution must be done through BC Registries, not through OrgBook BC.

- **Corporation:** Go to [BC OnLine](https://www.bconline.gov.bc.ca/)
  to initiate the dissolution.
- **Sole proprietorship or general partnership:** Use the
  [BC Business Registry](https://www.account.bcregistry.gov.bc.ca/decide-business).

If you need help, contact BC Registries at bcregistries@gov.bc.ca or
1-800-663-6102.
          `.trim(),
        },
      ],
    },
    {
      id: "searching",
      title: "Searching for Organizations",
      items: [
        {
          id: "how-to-search",
          question: "How do I search for an organization?",
          answer: `
Use the search bar on the [home page](/search) to search by:

- **Legal name** — enter the full or partial name
- **BC Registries ID** — formatted like \`FM1234567\` or \`BC1234567\`
- **CRA Business Number** — a 9-digit number

OrgBook BC floats the closest matches to the top of the results.
          `.trim(),
        },
        {
          id: "too-many-results",
          question: "I'm getting too many results and can't find the entity I'm looking for — what should I do?",
          answer: `
Try searching for just the **least common word** in the name rather than the
full name. For example, searching \`BKV\` instead of \`BKV SOCIAL ENTERPRISE CO.\`
will return far fewer results and float the right match to the top.

Names with punctuation (e.g. a trailing period in \`"Inc."\` or \`"Co."\`) can
cause unexpectedly large result sets — narrowing your search term usually helps.

You can also search by **BC Registries ID** or **CRA Business Number** for an
exact match, if you have those values.

There is a **help icon (?)** above the search box on the OrgBook BC site with
further guidance.
          `.trim(),
        },
        {
          id: "cant-find-org",
          question: "Why can't I find the organization I'm looking for?",
          answer: `
There are a few common reasons:

1. **Not registered with BC Registries** — Sole proprietorships are not required
   to register, so many are not in the system.
2. **Dissolved or inactive** — Dissolved entities are marked "Historical" and
   may be hidden by default. Enable the **Show Archived** option in the search
   results to include them.
3. **Spelling variation** — Try a shorter or differently worded search term.
4. **Registered in another jurisdiction** — OrgBook BC only lists entities
   registered with BC Registries.

If you believe an organization should be listed, contact BC Registries at
bcregistries@gov.bc.ca or 1-800-663-6102.
          `.trim(),
        },
        {
          id: "filter-results",
          question: "Can I filter search results?",
          answer: `
Yes. After performing a search, you can filter results by **entity type** and
**status** (active or historical/archived) using the options displayed alongside
the results.
          `.trim(),
        },
      ],
    },
    {
      id: "business-numbers",
      title: "CRA Business Numbers and Registration IDs",
      items: [
        {
          id: "id-difference",
          question: "What is the difference between a BC Registries ID and a CRA Business Number?",
          answer: `
These are separate identifiers from different government systems:

- **BC Registries ID** (e.g. \`FM1234567\` or \`BC0001234\`) — issued by BC
  Registries and specific to your BC registration.
- **CRA Business Number** — a 9-digit number issued by the Canada Revenue Agency,
  independent of BC registration.

OrgBook BC displays both when available. Having a CRA Business Number does
**not** automatically mean a business is registered with BC Registries.
          `.trim(),
        },
        {
          id: "bn-not-found",
          question: "I searched by my CRA Business Number but can't find my business — why?",
          answer: `
There are two likely reasons:

1. **Not registered with BC Registries** — Sole proprietorships can obtain a
   CRA Business Number independently, without registering with BC Registries.
   If your business is not registered with BC Registries, it will not appear
   on OrgBook BC.
2. **BC Registries does not have the BN on file** — Your business may be
   registered but BC Registries may not yet have linked the CRA Business Number.
   Try searching by your legal name or BC Registries ID instead, and contact
   BC Registries to establish the linkage.
          `.trim(),
        },
        {
          id: "bn-not-showing",
          question: "My business is registered but its CRA Business Number doesn't appear on OrgBook BC — why?",
          answer: `
BC Registries receives CRA Business Numbers for many entities but not all.
If the Business Number is missing from your OrgBook BC listing, contact BC
Registries at bcregistries@gov.bc.ca or 1-800-663-6102 to request that the
linkage be established. Once updated, the number will appear on OrgBook BC
automatically within approximately 30 minutes.
          `.trim(),
        },
      ],
    },
    {
      id: "dissolution",
      title: "Dissolved and Historical Entities",
      items: [
        {
          id: "what-is-historical",
          question: "What does 'Historical' mean on OrgBook BC?",
          answer: `
**Historical** means the entity has been dissolved and is no longer an active
registered legal entity in BC. The entity's full timeline — including the
dissolution event, reason, and date — is visible on its OrgBook BC page.

Dissolution can happen:
- At the entity's own request
- Automatically after **two consecutive years** of missed Annual Report filings
- As part of an amalgamation with another entity
          `.trim(),
        },
        {
          id: "unexpected-dissolution",
          question: "Why was my company dissolved without my knowledge?",
          answer: `
BC Registries automatically dissolves entities that fail to file Annual Reports
for **two consecutive years**. This is the most common cause of unexpected
dissolutions.

If your company has been marked as Historical unexpectedly, contact BC Registries
as soon as possible to discuss options for restoring the entity:

- **Email:** bcregistries@gov.bc.ca
- **Phone:** 1-800-663-6102 (Mon–Fri, 8:00 am – 5:00 pm)
          `.trim(),
        },
        {
          id: "d1-d2-codes",
          question: "What do the status codes 'System to D1' and 'System to D2' mean?",
          answer: `
These codes indicate that an entity is in the process of being dissolved due to
missed Annual Report filings:

- **System to D1** — the first Annual Report is overdue
- **System to D2** — two consecutive Annual Reports have been missed, which
  triggers automatic dissolution

If you see these codes on your entity, contact BC Registries as soon as possible
at bcregistries@gov.bc.ca or 1-800-663-6102.
          `.trim(),
        },
        {
          id: "find-dissolution-date",
          question: "Can I find the dissolution date for a historical entity?",
          answer: `
Yes. The dissolution event and date appear in the registration timeline on the
entity's OrgBook BC page.

Dissolved entities may be hidden by default in search results — enable the
**Show Archived** option to find them.
          `.trim(),
        },
        {
          id: "historical-includes-old",
          question: "Does OrgBook BC include entities that were dissolved years ago?",
          answer: `
Yes. OrgBook BC includes all entities ever registered with BC Registries, both
active and historical. Use **Show Archived** in the search results to include
dissolved entities.
          `.trim(),
        },
      ],
    },
    {
      id: "bulk-data-api",
      title: "Data Downloads, the API, and Terms of Use",
      items: [
        {
          id: "is-there-api",
          question: "Does OrgBook BC have an API?",
          answer: `
Yes. OrgBook BC provides a public API that supports the same search capabilities
as the website — searching by legal name, BC Registries ID, and CRA Business
Number. It is well suited for embedding an entity-name lookup into web forms or
applications.

Full API documentation is available on the [About](/about) page. No
authentication is required for read access.
          `.trim(),
        },
        {
          id: "api-terms",
          question: "Are there terms of use for the API?",
          answer: `
Use is subject to the
[BC Government Terms of Use](https://www2.gov.bc.ca/gov/content/home/disclaimer).
Automated scraping of the full database is against the terms of service.
Please use the API responsibly — high-volume requests should be throttled to
avoid impacting other users.
          `.trim(),
        },
        {
          id: "page-limit",
          question: "Why is search limited to 10 pages of results?",
          answer: `
The 10-page limit is in place because automated scripts have attempted to scrape
the entire OrgBook BC database, which is against the terms of service. The limit
is based on the principle that someone looking for a specific entity should refine
their search rather than paginating through hundreds of results.

If you are not finding what you need within the first few pages, try adjusting
your search terms (see [Search Tips](#searching)).
          `.trim(),
        },
        {
          id: "bulk-data",
          question: "Can I download bulk data from OrgBook BC?",
          answer: `
No. Bulk downloading of the database is not permitted under the OrgBook BC terms
of service. The service is designed for individual entity lookups and
application-embedded search, not bulk data extraction.

If you have a large-scale data need, contact BC Registries directly to enquire
about available data products:

- **Email:** bcregistries@gov.bc.ca
- **Phone:** 1-800-663-6102 (Mon–Fri, 8:00 am – 5:00 pm)
          `.trim(),
        },
      ],
    },
    {
      id: "dba",
      title: "Doing Business As (DBA) Names",
      items: [
        {
          id: "what-is-dba",
          question: "What is a 'Doing Business As' (DBA) name in BC?",
          answer: `
In BC, a **Doing Business As (DBA)** name allows a company to operate under a
name different from its registered legal name. In BC Registries terms, a DBA is
a **Sole Proprietorship owned by a BC Company**.

For example, a numbered company like \`1234567 BC Ltd.\` might own a Sole Prop
called \`Acme Services\` — that is its DBA. Both the parent company and the DBA
appear as separate entities on OrgBook BC, connected via the **Relationships**
section on each entity's page.
          `.trim(),
        },
        {
          id: "sole-prop-vs-dba",
          question: "I see a Sole Proprietorship on OrgBook BC — does that always mean a person owns it?",
          answer: `
Not necessarily. In BC, a Sole Proprietorship can be owned by either an individual
or a corporation. When a corporation owns a Sole Proprietorship, it is functioning
as a DBA — an alternate operating name for the corporation.

The entity page on OrgBook BC will show the **Relationship** indicating whether
the Sole Prop is owned by an individual or a corporation.
          `.trim(),
        },
        {
          id: "register-dba",
          question: "How do I register a DBA name for my company?",
          answer: `
DBA registration is done through BC Registries, not through OrgBook BC.

For a corporation, go to [BC OnLine](https://www.bconline.gov.bc.ca/) to create
a new Sole Proprietorship owned by your BC Company. Once registered, the DBA
relationship will appear on OrgBook BC automatically within approximately
30 minutes.

If you need help, contact BC Registries at bcregistries@gov.bc.ca or
1-800-663-6102.
          `.trim(),
        },
      ],
    },
    {
      id: "credentials",
      title: "Understanding Credentials",
      items: [
        {
          id: "what-is-credential",
          question: "What is a verifiable credential?",
          answer: `
A **verifiable credential** is a tamper-evident digital record, similar to a
paper certificate or licence but in digital form. It is issued by an authoritative
source (the *issuer*), held by an organization (the *holder*), and can be verified
by anyone without contacting the issuer.

OrgBook BC stores and displays these credentials publicly so that businesses,
individuals, and services can verify an organization's status at any time.
          `.trim(),
        },
        {
          id: "active-vs-inactive",
          question: "What is the difference between an active and inactive credential?",
          answer: `
- **Active** credentials are currently valid and have not been revoked or expired.
- **Inactive** credentials have been revoked, superseded, or have passed their
  expiry date.

An inactive credential does not mean the organization no longer exists — it may
simply mean the credential was renewed and a new one was issued, or the licence
period ended.
          `.trim(),
        },
        {
          id: "who-are-issuers",
          question: "Who are the credential issuers?",
          answer: `
Issuers are the government bodies that publish credentials to OrgBook BC. Current
issuers include:

- **BC Registries and Online Services** — issues incorporation and registration
  credentials
- Other provincial ministries and agencies as they join the Digital Trust ecosystem

Each credential on an organization's page shows which issuer provided it.
          `.trim(),
        },
        {
          id: "credential-expired",
          question: "A credential shows as expired — does this mean the business is closed?",
          answer: `
Not necessarily. An expired or inactive credential means that *specific credential*
is no longer valid, but the organization may still be active under a renewed
credential or a different credential type.

Always check whether there is a more recent **active** credential for the same
organization before drawing conclusions about its operating status.
          `.trim(),
        },
      ],
    },
    {
      id: "fraud",
      title: "Reporting Suspected Fraud or Misconduct",
      items: [
        {
          id: "report-fraud",
          question: "I think a business registered on OrgBook BC is committing fraud — who do I contact?",
          answer: `
OrgBook BC and BC Registries maintain registration records but do not regulate
business conduct.

- For **criminal matters** (fraud, theft, etc.), contact the **RCMP**.
- For **civil matters**, you may wish to consult a lawyer. The
  [BC Business Corporations Act — Part 8, Division 1 (Court Proceedings)](https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/02057_09#division_d2e22209)
  may be relevant to your situation.

OrgBook BC itself cannot investigate or act on the conduct of registered businesses.
          `.trim(),
        },
        {
          id: "registrar-role",
          question: "Can BC Registries shut down a fraudulent company?",
          answer: `
The role of the Registrar of Companies is to maintain the records that companies
are required to file, and to make those records available to the public. The
Registrar does **not** regulate company conduct beyond ensuring required filings
are made.

For regulatory action, contact the appropriate authority:

- **RCMP** for criminal matters
- A lawyer or legal counsel for civil proceedings
          `.trim(),
        },
      ],
    },
  ],
};

export default faq;