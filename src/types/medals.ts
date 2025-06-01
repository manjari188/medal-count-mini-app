export interface MedalData {
  code: string; // Country code (e.g., 'USA', 'NOR')
  gold: number; // Number of gold medals
  silver: number; // Number of silver medals
  bronze: number; // Number of bronze medals
  total: number; // Total number of medals
}

export interface CountryData {
  index: number;
  code: string;
}
