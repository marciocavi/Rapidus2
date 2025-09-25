/**
 * Utility functions for array manipulation and reordering
 */

/**
 * Moves an item from one position to another in an array
 * @param arr - The array to manipulate
 * @param from - Index to move from
 * @param to - Index to move to
 * @returns New array with item moved
 */
export function arrayMove<T>(arr: T[], from: number, to: number): T[] {
  const next = arr.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

/**
 * Updates positions in an array of objects with position property
 * @param items - Array of items with position property
 * @returns Array with updated positions (1-based)
 */
export function updatePositions<T extends { position: number }>(items: T[]): T[] {
  return items.map((item, index) => ({
    ...item,
    position: index + 1
  }));
}

/**
 * Sorts array by position property
 * @param items - Array of items with position property
 * @returns Sorted array
 */
export function sortByPosition<T extends { position: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.position - b.position);
}



