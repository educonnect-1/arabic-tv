'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, SatelliteDish } from 'lucide-react';
import ChannelCard from '@/components/ChannelCard';
import { Channel } from '@/types';

const categories = [
  { value: 'all', label: 'كل الفئات' },
  { value: 'sports', label: 'رياضة' },
  { value: 'movies', label: 'أفلام' },
  { value: 'news', label: 'أخبار' },
  { value: 'kids', label: 'أطفال' },
];

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    async function loadChannels() {
      try {
        const res = await fetch('/api/channels');
        const data = await res.json();
        setChannels(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to load channels:', error);
      } finally {
        setLoading(false);
      }
    }

    loadChannels();
  }, []);

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || channel.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="container mx-auto">
        <h1 className="font-display text-3xl font-black text-ink md:text-4xl">القنوات</h1>

        <div className="mt-8 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 right-4 h-4.5 w-4.5 -translate-y-1/2 text-mute" />
            <input
              type="text"
              placeholder="ابحث عن قناة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-line bg-panel py-3 pr-11 pl-4 text-ink outline-none placeholder:text-mute focus:border-signal focus:ring-2 focus:ring-signal-dim"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-line bg-panel px-4 py-3 text-ink outline-none focus:border-signal focus:ring-2 focus:ring-signal-dim"
          >
            {categories.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-24 text-mute">
            <Loader2 className="h-5 w-5 animate-spin" />
            جاري التحميل...
          </div>
        ) : filteredChannels.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-24 text-mute">
            <SatelliteDish className="h-8 w-8" />
            لا توجد قنوات
          </div>
        ) : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredChannels.map(channel => (
              <ChannelCard
                key={channel.id}
                channel={channel}
                frequencies={[]}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
