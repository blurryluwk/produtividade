export function getXPForLevel(level: number): number {
  if (level <= 1) return 100;
  return 100 + (level - 1) * 30 + Math.floor(Math.pow(level - 1, 1.5));
}
