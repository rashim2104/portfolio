/** Stable anchor id for a section heading. Shared so the target and the link
 *  that points at it can never drift apart. */
export function slug(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
