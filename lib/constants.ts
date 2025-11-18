export const SITE_NAME = 'High Adventure Camps';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const ADVENTURE_TYPES = {
  TREKKING: 'trekking',
  MOUNTAINEERING: 'mountaineering',
  CAMPING: 'camping',
  PARAGLIDING: 'paragliding',
  RAFTING: 'rafting',
  ROCK_CLIMBING: 'rock-climbing',
  SKIING: 'skiing',
  HIKING: 'hiking',
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MODERATE: 'moderate',
  DIFFICULT: 'difficult',
  EXPERT: 'expert',
} as const;

export const SEASON_MONTHS = {
  SUMMER: [5, 6, 7, 8],
  MONSOON: [7, 8, 9],
  AUTUMN: [9, 10, 11],
  WINTER: [11, 12, 1, 2],
  SPRING: [2, 3, 4, 5],
} as const;
