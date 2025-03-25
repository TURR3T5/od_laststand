type ThemeColorType = 'classic' | 'neon' | 'retro' | 'holo' | 'military' | 'minimal';

export const getStatusColor = (percentage: number, theme: ThemeColorType): string => {
  switch (theme) {
    case 'classic':
      if (percentage <= 15) return 'red.9';
      if (percentage <= 30) return 'red.8';
      if (percentage <= 50) return 'red.7';
      return 'red.6';
    
    case 'neon':
      if (percentage <= 15) return 'pink.9';
      if (percentage <= 30) return 'pink.7';
      if (percentage <= 50) return 'pink.6';
      return 'cyan.6';
    
    case 'retro':
      if (percentage <= 15) return 'red';
      if (percentage <= 30) return 'yellow';
      return 'green';
    
    case 'holo':
      if (percentage <= 15) return 'red.5';
      if (percentage <= 30) return 'orange.5';
      return 'blue.5';
    
    case 'military':
      if (percentage <= 15) return 'red.8';
      if (percentage <= 30) return 'yellow.8';
      return 'green.8';
    
    case 'minimal':
      if (percentage <= 15) return 'red.5';
      if (percentage <= 30) return 'orange.5';
      if (percentage <= 50) return 'yellow.5';
      return 'gray.5';
      
    default:
      return 'gray.5';
  }
};

export const getStatusText = (percentage: number): string => {
  if (percentage <= 15) return 'CRITICAL';
  if (percentage <= 30) return 'WARNING';
  if (percentage <= 50) return 'CAUTION';
  return 'STABLE';
};

export const getRGBString = (color: string): string => {
  switch (color) {
    case 'red': return '255, 0, 0';
    case 'pink': return '255, 20, 147';
    case 'orange': return '255, 165, 0';
    case 'yellow': return '255, 255, 0';
    case 'green': return '0, 255, 0';
    case 'cyan': return '0, 255, 255';
    case 'blue': return '0, 100, 255';
    case 'purple': return '128, 0, 255';
    case 'gray': return '128, 128, 128';
    default: return '255, 255, 255';
  }
};

export const getThemeBaseColor = (theme: ThemeColorType): string => {
  switch (theme) {
    case 'classic': return 'red';
    case 'neon': return 'cyan';
    case 'retro': return 'green';
    case 'holo': return 'blue';
    case 'military': return 'yellow';
    case 'minimal': return 'gray';
    default: return 'gray';
  }
};