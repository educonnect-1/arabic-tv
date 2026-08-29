import { Trophy, Film, Newspaper, Baby, Globe2, Tv, LucideIcon } from 'lucide-react';

// خريطة أيقونات الفئات — تُستخدم بدل الإيموجي في كل مكان يظهر فيه تصنيف القناة/البرنامج
export const categoryMeta: Record<string, { label: string; icon: LucideIcon; color: string }> = {
  sports: { label: 'رياضة', icon: Trophy, color: 'var(--color-tally)' },
  movies: { label: 'أفلام', icon: Film, color: 'var(--color-freq)' },
  movie: { label: 'أفلام', icon: Film, color: 'var(--color-freq)' },
  series: { label: 'مسلسلات', icon: Tv, color: 'var(--color-sat)' },
  news: { label: 'أخبار', icon: Newspaper, color: 'var(--color-ink-dim)' },
  kids: { label: 'أطفال', icon: Baby, color: 'var(--color-signal)' },
  documentary: { label: 'وثائقي', icon: Globe2, color: 'var(--color-sat)' },
  other: { label: 'عام', icon: Tv, color: 'var(--color-mute)' },
};

export function getCategoryMeta(category?: string) {
  return categoryMeta[category ?? 'other'] ?? categoryMeta.other;
}
