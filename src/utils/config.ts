export type ThemeColorType = 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';
export type VisualizationType = 'timer' | 'reaper' | 'glitch' | 'gameover';

export const themeOptions = [
  { value: 'classic', label: 'Classic' },
  { value: 'neon', label: 'Neon' },
  { value: 'retro', label: 'Retro' },
  { value: 'holo', label: 'Holographic' },
  { value: 'military', label: 'Military' },
  { value: 'minimal', label: 'Minimal' },
];

export const visualizationOptions = [
  { value: 'timer', label: 'Doom Timer' },
  { value: 'reaper', label: 'Reaper Approach' },
  { value: 'glitch', label: 'Glitch Effect' },
  { value: 'gameover', label: 'Game Over' },
];

export const defaultValues = {
  timeRemaining: 45,
  maxTime: 60,
  percentRemaining: 30,
};