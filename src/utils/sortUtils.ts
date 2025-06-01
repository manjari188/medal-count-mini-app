import { MedalData } from '@/types/medals';

/**
 * Sorts an array of Olympic medal data based on a specified medal type
 *
 * @param data - The array of medal data to sort (each item represents a country's medal counts)
 * @param sortBy - The type of medals to sort by: "total", "gold", "silver", or "bronze"
 *
 * @returns A new sorted array of medal data, sorted according to the provided criteria
 */
export const sortMedals = (data: MedalData[], sortBy: string) => {
  // Define sorting logic for each medal type
  const sorters: Record<string, (a: MedalData, b: MedalData) => number> = {
    total: (a, b) => b.total - a.total || b.gold - a.gold,
    gold: (a, b) => b.gold - a.gold || b.silver - a.silver,
    silver: (a, b) => b.silver - a.silver || b.gold - a.gold,
    bronze: (a, b) => b.bronze - a.bronze || b.gold - a.gold,
  };

  return data.sort(sorters[sortBy] || sorters.gold);
};
