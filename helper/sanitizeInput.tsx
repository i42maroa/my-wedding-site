export function sanitize(v: string): string {
  return v.replace(/[^a-z0-9]/gi, "").toUpperCase();
}