import { INavLink } from "@/interfaces/nav-link.interface";

export const headerLinks = [
  { path: "/search", label: "Home", name: "Search" },
  { path: "/about", label: "About", name: "About" },
  { path: "/contact", label: "Contact", name: "Contact" },
] as INavLink[];

export const footerLinks = [
  { path: "/search", label: "Home", name: "Search" },
  { path: "/disclamer", label: "Disclaimer" },
  { path: "/privacy", label: "Privacy" },
  { path: "/accessibility", label: "Accessibility" },
  { path: "/copyright", label: "Copyright" },
] as INavLink[];
