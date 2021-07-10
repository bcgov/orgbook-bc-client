import { NavLink } from "@/interfaces/nav-link";

export const headerLinks = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
] as NavLink[];

export const footerLinks = [
  { path: "/", label: "Home" },
  { path: "disclamer", label: "Disclaimer" },
  { path: "privacy", label: "Privacy" },
  { path: "accessibility", label: "Accessibility" },
  { path: "copyright", label: "Copyright" },
] as NavLink[];
