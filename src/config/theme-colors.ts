// 主题颜色配置（20 套高区分度色板，4×5 整齐排列）
export const themeColors = {
  // --- 品牌 & 中性 ---
  'original-cyan': {
    name: '经典青 (默认)',
    light: { primary: '173 80% 40%', 'primary-foreground': '210 40% 98%', ring: '173 80% 40%' },
    dark: { primary: '173 80% 42%', 'primary-foreground': '210 40% 98%', ring: '173 80% 42%' },
  },
  zinc: {
    name: '曜石黑',
    light: { primary: '240 5.9% 12%', 'primary-foreground': '0 0% 98%', ring: '240 5.9% 12%' },
    dark: { primary: '0 0% 96%', 'primary-foreground': '240 5.9% 10%', ring: '0 0% 96%' },
  },
  slate: {
    name: '高级灰',
    light: { primary: '215.4 16.3% 46.9%', 'primary-foreground': '210 40% 98%', ring: '215.4 16.3% 46.9%' },
    dark: { primary: '215.4 16.3% 58%', 'primary-foreground': '222.2 47.4% 11.2%', ring: '215.4 16.3% 58%' },
  },
  navy: {
    name: '午夜蓝',
    light: { primary: '224 64% 28%', 'primary-foreground': '210 40% 98%', ring: '224 64% 28%' },
    dark: { primary: '220 70% 54%', 'primary-foreground': '210 40% 98%', ring: '220 70% 54%' },
  },
  coffee: {
    name: '摩卡咖',
    light: { primary: '24 38% 32%', 'primary-foreground': '0 0% 100%', ring: '24 38% 32%' },
    dark: { primary: '24 35% 48%', 'primary-foreground': '0 0% 100%', ring: '24 35% 48%' },
  },

  // --- 暖色调 ---
  burgundy: {
    name: '勃艮第红',
    light: { primary: '345 66% 36%', 'primary-foreground': '0 0% 100%', ring: '345 66% 36%' },
    dark: { primary: '345 68% 52%', 'primary-foreground': '0 0% 100%', ring: '345 68% 52%' },
  },
  red: {
    name: '中国红',
    light: { primary: '0 84% 56%', 'primary-foreground': '0 0% 100%', ring: '0 84% 56%' },
    dark: { primary: '0 76% 54%', 'primary-foreground': '0 0% 100%', ring: '0 76% 54%' },
  },
  coral: {
    name: '珊瑚橘',
    light: { primary: '14 88% 58%', 'primary-foreground': '0 0% 100%', ring: '14 88% 58%' },
    dark: { primary: '14 88% 60%', 'primary-foreground': '0 0% 100%', ring: '14 88% 60%' },
  },
  orange: {
    name: '落日橙',
    light: { primary: '27 95% 50%', 'primary-foreground': '60 9.1% 97.8%', ring: '27 95% 50%' },
    dark: { primary: '25 92% 52%', 'primary-foreground': '60 9.1% 97.8%', ring: '25 92% 52%' },
  },
  amber: {
    name: '琥珀金',
    light: { primary: '43 96% 46%', 'primary-foreground': '26 83.3% 14.1%', ring: '43 96% 46%' },
    dark: { primary: '43 96% 52%', 'primary-foreground': '26 83.3% 14.1%', ring: '43 96% 52%' },
  },

  // --- 绿色 & 天青 ---
  olive: {
    name: '橄榄绿',
    light: { primary: '82 44% 36%', 'primary-foreground': '0 0% 100%', ring: '82 44% 36%' },
    dark: { primary: '82 46% 48%', 'primary-foreground': '0 0% 10%', ring: '82 46% 48%' },
  },
  lime: {
    name: '青柠绿',
    light: { primary: '76 82% 44%', 'primary-foreground': '0 0% 5%', ring: '76 82% 44%' },
    dark: { primary: '76 88% 52%', 'primary-foreground': '0 0% 5%', ring: '76 88% 52%' },
  },
  green: {
    name: '翡翠绿',
    light: { primary: '142.1 72% 36%', 'primary-foreground': '0 0% 100%', ring: '142.1 72% 36%' },
    dark: { primary: '142.1 70% 45%', 'primary-foreground': '144.9 80.4% 10%', ring: '142.1 70% 45%' },
  },
  neon: {
    name: '易构绿',
    light: { primary: '157 96% 42%', 'primary-foreground': '0 0% 0%', ring: '157 96% 42%' },
    dark: { primary: '157 100% 50%', 'primary-foreground': '0 0% 0%', ring: '157 100% 50%' },
  },
  sky: {
    name: '天空蓝',
    light: { primary: '199 89% 48%', 'primary-foreground': '0 0% 100%', ring: '199 89% 48%' },
    dark: { primary: '199 89% 52%', 'primary-foreground': '0 0% 100%', ring: '199 89% 52%' },
  },

  // --- 蓝紫 & 粉调 ---
  blue: {
    name: '海洋蓝',
    light: { primary: '221.2 83.2% 53.3%', 'primary-foreground': '210 40% 98%', ring: '221.2 83.2% 53.3%' },
    dark: { primary: '217.2 91.2% 59.8%', 'primary-foreground': '222.2 47.4% 11.2%', ring: '217.2 91.2% 59.8%' },
  },
  violet: {
    name: '罗兰紫',
    light: { primary: '262.1 83.3% 57.8%', 'primary-foreground': '210 40% 98%', ring: '262.1 83.3% 57.8%' },
    dark: { primary: '263.4 76% 62%', 'primary-foreground': '210 40% 98%', ring: '263.4 76% 62%' },
  },
  plum: {
    name: '深梅紫',
    light: { primary: '282 54% 36%', 'primary-foreground': '0 0% 100%', ring: '282 54% 36%' },
    dark: { primary: '282 58% 56%', 'primary-foreground': '0 0% 100%', ring: '282 58% 56%' },
  },
  fuchsia: {
    name: '魅惑玫',
    light: { primary: '302 82% 54%', 'primary-foreground': '0 0% 100%', ring: '302 82% 54%' },
    dark: { primary: '302 86% 62%', 'primary-foreground': '0 0% 100%', ring: '302 86% 62%' },
  },
  pink: {
    name: '樱花粉',
    light: { primary: '334 82% 60%', 'primary-foreground': '0 0% 100%', ring: '334 82% 60%' },
    dark: { primary: '334 82% 62%', 'primary-foreground': '0 0% 100%', ring: '334 82% 62%' },
  },
} as const

export type ThemeColor = keyof typeof themeColors

export const themeColorOptions = Object.entries(themeColors).map(([key, value]) => ({
  value: key as ThemeColor,
  label: value.name,
}))
