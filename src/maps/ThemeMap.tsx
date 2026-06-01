import { ThemeColor } from '@/store/useTheme'

type ThemeItem = {
  id: ThemeColor
  color: string
  name: string
}

export const themeColorsMap:
  Record<ThemeColor, ThemeItem> = {

  //------------------------------------------
  // RED / PINK
  //------------------------------------------

  cherry: {
    id: 'cherry',
    color: '#dc2626',
    name: 'Cherry',
  },

  ruby: {
    id: 'ruby',
    color: '#be123c',
    name: 'Ruby',
  },

  rose: {
    id: 'rose',
    color: '#e11d48',
    name: 'Rose',
  },

  sakura: {
    id: 'sakura',
    color: '#db2777',
    name: 'Sakura',
  },

  //------------------------------------------
  // ORANGE / GOLD
  //------------------------------------------

  coral: {
    id: 'coral',
    color: '#f97316',
    name: 'Coral',
  },

  gold: {
    id: 'gold',
    color: '#ca8a04',
    name: 'Gold',
  },

  coffee: {
    id: 'coffee',
    color: '#6f4e37',
    name: 'Coffee',
  },

  //------------------------------------------
  // GREEN
  //------------------------------------------

  emerald: {
    id: 'emerald',
    color: '#059669',
    name: 'Esmeralda',
  },

  forest: {
    id: 'forest',
    color: '#166534',
    name: 'Forest',
  },

  //------------------------------------------
  // BLUE
  //------------------------------------------

  sky: {
    id: 'sky',
    color: '#0ea5e9',
    name: 'Sky',
  },

  ocean: {
    id: 'ocean',
    color: '#0284c7',
    name: 'Oceano',
  },

  //------------------------------------------
  // PURPLE
  //------------------------------------------

  lavender: {
    id: 'lavender',
    color: '#5e2db4',
    name: 'Lavanda',
  },

  //------------------------------------------
  // DARK / NEUTRAL
  //------------------------------------------

  storm: {
    id: 'storm',
    color: '#475569',
    name: 'Storm',
  },

  midnight: {
    id: 'midnight',
    color: '#1e293b',
    name: 'Midnight',
  },

}