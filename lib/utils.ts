export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function countCharacters(text: string): number {
  return text.length;
}
