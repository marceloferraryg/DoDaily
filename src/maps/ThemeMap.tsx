import { ThemeColor } from '@/store/useTheme'

type ThemeItem = {
  id: ThemeColor
  color: string
  name: string
}

export const themeColorsMap:
  Record<ThemeColor, ThemeItem> = {

  lavender: {
    id: 'lavender',
    color: '#5e2db4',
    name: 'Lavanda',
  },

  ocean: {
    id: 'ocean',
    color: '#0284c7',
    name: 'Oceano',
  },

  emerald: {
    id: 'emerald',
    color: '#059669',
    name: 'Esmeralda',
  },

  coral: {
    id: 'coral',
    color: '#f97316',
    name: 'Coral',
  },

  sakura: {
    id: 'sakura',
    color: '#db2777',
    name: 'Sakura',
  },

  midnight: {
    id: 'midnight',
    color: '#1e293b',
    name: 'Midnight',
  },

  forest: {
    id: 'forest',
    color: '#166534',
    name: 'Forest',
  },

  rose: {
    id: 'rose',
    color: '#e11d48',
    name: 'Rose',
  },

  gold: {
    id: 'gold',
    color: '#ca8a04',
    name: 'Gold',
  },

  sky: {
    id: 'sky',
    color: '#0ea5e9',
    name: 'Sky',
  },

  cherry: {
    id: 'cherry',
    color: '#dc2626',
    name: 'Cherry',
  },

  coffee: {
    id: 'coffee',
    color: '#6f4e37',
    name: 'Coffee',
  },

  storm: {
    id: 'storm',
    color: '#475569',
    name: 'Storm',
  },

  ruby: {
    id: 'ruby',
    color: '#be123c',
    name: 'Ruby',
  },

}