export function makeCode(): string {
  const n = Math.floor(Math.random() * 10000);
  return `${n}`.padStart(4, '0');
}
