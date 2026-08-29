import { parseStringPromise } from 'xml2js';

export interface EPGProgram {
  channel: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
}

export async function fetchEPG(url: string): Promise<EPGProgram[]> {
  try {
    const res = await fetch(url);
    const xml = await res.text();
    const parsed = await parseStringPromise(xml);
    
    const programs: EPGProgram[] = [];
    
    for (const programme of parsed.tv.programme || []) {
      programs.push({
        channel: programme.$.channel,
        title: programme.title?.[0] || 'Unknown',
        description: programme.desc?.[0]?._ || '',
        startTime: new Date(programme.$.start),
        endTime: new Date(programme.$.stop),
      });
    }
    
    return programs;
  } catch (error) {
    console.error('EPG fetch error:', error);
    return [];
  }
}

export function detectCategory(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('مباراة') || lower.includes('match') || lower.includes('live')) return 'sports';
  if (lower.includes('فيلم') || lower.includes('movie')) return 'movie';
  if (lower.includes('مسلسل') || lower.includes('series')) return 'series';
  if (lower.includes('نشرة') || lower.includes('news')) return 'news';
  if (lower.includes('أطفال') || lower.includes('kids')) return 'kids';
  return 'other';
}