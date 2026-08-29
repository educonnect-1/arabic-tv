'use client';

import { useState, useEffect } from 'react';
import ChannelCard from '@/components/ChannelCard';
import { Channel, Program } from '@/types';

export default function ChannelsPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    // هنا هنجيب البيانات من Firebase
    setLoading(false);
  }, []);

  const filteredChannels = channels.filter(channel => {
    const matchesSearch = channel.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || channel.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-[#20160E] mb-8">القنوات</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="ابحث عن قناة..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C442E] focus:border-transparent outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C442E] outline-none"
          >
            <option value="all">كل الفئات</option>
            <option value="sports">رياضة</option>
            <option value="movies">أفلام</option>
            <option value="news">أخبار</option>
            <option value="kids">أطفال</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-20">جاري التحميل...</div>
        ) : filteredChannels.length === 0 ? (
          <div className="text-center py-20 text-gray-500">لا توجد قنوات</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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