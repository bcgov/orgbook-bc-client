import { INavLink } from "@/interfaces/nav-link.interface";

export const headerLinks = [
  { path: "/search", label: "Home", name: "Search" },
  { path: "/about", label: "About", name: "About" },
  { path: "/contact", label: "Contact", name: "Contact" },
] as INavLink[];

export const subHeaderLinks = [
  { path: "/about/orgbook-data", label: "OrgBook Data", name: "OrgBook Data" },
  {
    path: "/about/digital-trust",
    label: "Digital Trust",
    name: "Digital Trust",
  },
  { path: "/about/orgbook-api", label: "OrgBook API", name: "OrgBook API" },
  {
    path: "/about/becoming-an-issuer",
    label: "Becoming an Issuer",
    name: "Becoming an Issuer",
  },
] as INavLink[];

export const footerLinks = [
  { path: "/search", label: "Home", name: "Search" },
  { path: "/disclamer", label: "Disclaimer" },
  { path: "/privacy", label: "Privacy" },
  { path: "/accessibility", label: "Accessibility" },
  { path: "/copyright", label: "Copyright" },
] as INavLink[];
