import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatXP(xp: number): string {
  return new Intl.NumberFormat('pt-BR').format(xp);
}

export function calculateLevel(xp: number) {
  let level = 1;
  let xpNeededForNext = 100;
  let currentLevelBaseXP = 0;

  const levelThresholds = [
    0,     // L1
    100,   // L2
    250,   // L3
    500,   // L4
    850,   // L5
    1300,  // L6
    1900,  // L7
    2600,  // L8
    3500,  // L9
    4600,  // L10
    6000,  // L11
    8000,  // L12
  ];

  for (let i = 0; i < levelThresholds.length - 1; i++) {
    if (xp >= levelThresholds[i + 1]) {
      level = i + 2;
    } else {
      currentLevelBaseXP = levelThresholds[i];
      xpNeededForNext = levelThresholds[i + 1] - levelThresholds[i];
      break;
    }
  }

  if (xp >= levelThresholds[levelThresholds.length - 1]) {
    level = levelThresholds.length;
    currentLevelBaseXP = levelThresholds[levelThresholds.length - 1];
    xpNeededForNext = 2500;
  }

  const xpInCurrentLevel = xp - currentLevelBaseXP;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForNext) * 100)));

  return {
    level,
    currentXP: xp,
    xpInCurrentLevel,
    xpNeededForNext,
    progressPercent,
  };
}
