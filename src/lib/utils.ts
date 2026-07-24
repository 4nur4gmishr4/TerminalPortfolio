export function generateId(value: string): string {
  return value.replace(/[^a-z0-9]/gi, "-").toLowerCase();
}

export function formatIndex(index: number): string {
  return String(index).padStart(2, "0");
}
