export function sortByStringField <T> (array: T[],field: keyof T, direction: "asc" | "desc" = "asc") {
    return [...array].sort((a, b) => {
    const aValue = String(a[field] ?? "");
    const bValue = String(b[field] ?? "");

    const result = aValue.localeCompare(bValue, undefined, { sensitivity: "base" });

    return direction === "asc" ? result : -result;
  });
}