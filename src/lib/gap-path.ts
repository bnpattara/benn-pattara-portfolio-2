/**
 * True for `/gap` and any nested Gap-only routes (e.g. `/gap/project`).
 * Keep in sync with wayfinding banner and gap hub links.
 */
export function isGapPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname === "/gap" || pathname === "/gap/index.html") return true;
  return pathname.startsWith("/gap/");
}
