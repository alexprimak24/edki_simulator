export function useRandom(count: number, max: number = 1000): number[] {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }

  return Array.from(numbers);
}
