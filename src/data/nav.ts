import { INavLink } from "@/interfaces/nav-link.interface";

export const headerLinks = [
  { path: "/search", label: "Home", name: "Search" },
  { path: "/about", label: "About", name: "About" },
  { path: "/contact", label: "Contact", name: "Contact" },
] as INavLink[];

export const footerLinks = [
  { path: "/search", label: "Home", name: "Search" },
  {
    path: "https://www2.gov.bc.ca/gov/content/home/disclaimer",
    label: "Disclaimer",
    external: true,
  },
  {
    path: "https://www2.gov.bc.ca/gov/content/home/privacy",
    label: "Privacy",
    external: true,
  },
  {
    path: "https://www2.gov.bc.ca/gov/content/home/accessible-government",
    label: "Accessibility",
    external: true,
  },
  {
    path: "https://www2.gov.bc.ca/gov/content/home/copyright",
    label: "Copyright",
    external: true,
  },
] as INavLink[];
