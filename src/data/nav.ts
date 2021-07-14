import { INavLink } from "@/interfaces/nav-link.interface";

export const headerLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
] as INavLink[];

export const subHeaderLinks = [
  { path: "/about/orgbook-data", label: "OrgBook Data" },
  { path: "/about/digital-trust", label: "Digital Trust" },
  { path: "/about/orgbook-api", label: "OrgBook API" },
  { path: "/about/becoming-an-issuer", label: "Becoming an Issuer" },
] as INavLink[];

export const footerLinks = [
  { path: "/", label: "Home" },
  { path: "disclamer", label: "Disclaimer" },
  { path: "privacy", label: "Privacy" },
  { path: "accessibility", label: "Accessibility" },
  { path: "copyright", label: "Copyright" },
] as INavLink[];
