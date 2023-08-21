export type ThemeColorName = 'primary' | 'black' | 'white' | 'gray';

export type Theme = {
  color: Record<ThemeColorName, string>;
  font: string;
  unit: number;
  sizing: (...sizes: (string | number | undefined)[]) => string;
};
