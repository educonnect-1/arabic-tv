'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Channel, Frequency, Program } from '@/types';

export default function ChannelPage() {
  const params = useParams();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [upcomingPrograms, setUpcomingPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // هنا هنجيب البيانات من Firebase
    setLoading(false);
  }, [params.id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحميل...</div>;
  }

  if (!channel) {
    return <div className="min-h-screen flex items-center justify-center">القناة غير موجودة</div>;
  }

  return (
    <main className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          {channel.logo && (
            <img src={channel.logo} alt={channel.name} className="w-20 h-20 rounded-lg" />
          )}
          <div>
            <h1 className="text-3xl font-bold text-[#20160E]">{channel.name}</h1>
            <span className="text-gray-500">{channel.category}</span>
          </div>
        </div>

        {currentProgram && (
          <div className="bg-gradient-to-r from-[#5C442E] to-[#3E2C1E] text-white p-6 rounded-xl mb-8">
            <div className="text-sm opacity-80 mb-2">الآن يُعرض</div>
            <div className="text-2xl font-bold">{currentProgram.title}</div>
            <div className="mt-2 opacity-90">{currentProgram.description}</div>
            <div className="text-sm mt-3">
              {new Date(currentProgram.startTime).toLocaleTimeString('ar-EG')} - 
              {new Date(currentProgram.endTime).toLocaleTimeString('ar-EG')}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-[#20160E] mb-4">📡 الترددات</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {frequencies.map(freq => (
              <div key={freq.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="font-bold text-lg text-[#20160E]">{freq.satellite}</div>
                <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                  <div> التردد: <span className="font-mono">{freq.frequency}</span></div>
                  <div>🔄 الاستقطاب: {freq.polarization}</div>
                  <div>⚡ معدل الترميز: <span className="font-mono">{freq.symbolRate}</span></div>
                  <div>📡 FEC: {freq.fec}</div>
                  {freq.quality && <div> الجودة: {freq.quality}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#20160E] mb-4">📺 البرامج القادمة</h2>
          <div className="space-y-3">
            {upcomingPrograms.map(program => (
              <div key={program.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-[#20160E]">{program.title}</div>
                    <div className="text-sm text-gray-500 mt-1">{program.description}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(program.startTime).toLocaleTimeString('ar-EG')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}