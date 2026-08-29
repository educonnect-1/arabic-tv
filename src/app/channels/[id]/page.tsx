'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Loader2, SatelliteDish, Radio, RadioTower, Gauge, SignalHigh, Clock } from 'lucide-react';
import { Channel, Frequency, Program } from '@/types';
import { getCategoryMeta } from '@/lib/categoryIcons';

export default function ChannelPage() {
  const params = useParams();
  const [channel, setChannel] = useState<Channel | null>(null);
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);
  const [currentProgram, setCurrentProgram] = useState<Program | null>(null);
  const [upcomingPrograms, setUpcomingPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadChannel() {
      setLoading(true);
      try {
        const res = await fetch(`/api/channels/${params.id}`);
        if (!res.ok) {
          setChannel(null);
          return;
        }
        const data = await res.json();
        setChannel(data.channel ?? null);
        setFrequencies(data.frequencies ?? []);
        setCurrentProgram(data.currentProgram ?? null);
        setUpcomingPrograms(data.upcomingPrograms ?? []);
      } catch (error) {
        console.error('Failed to load channel:', error);
        setChannel(null);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadChannel();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center gap-2 text-mute">
        <Loader2 className="h-5 w-5 animate-spin" />
        جاري التحميل...
      </div>
    );
  }

  if (!channel) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-mute">
        <SatelliteDish className="h-8 w-8" />
        القناة غير موجودة
      </div>
    );
  }

  const category = getCategoryMeta(channel.category);
  const CategoryIcon = category.icon;

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-4">
          {channel.logo ? (
            <img src={channel.logo} alt={channel.name} className="h-20 w-20 rounded-xl object-cover ring-1 ring-line" />
          ) : (
            <span className="flex h-20 w-20 items-center justify-center rounded-xl bg-panel ring-1 ring-line">
              <SatelliteDish className="h-8 w-8 text-mute" />
            </span>
          )}
          <div>
            <h1 className="font-display text-3xl font-black text-ink">{channel.name}</h1>
            <span className="mt-1 inline-flex items-center gap-1.5 text-sm text-mute">
              <CategoryIcon className="h-4 w-4" style={{ color: category.color }} />
              {category.label}
            </span>
          </div>
        </div>

        {currentProgram && (
          <div className="osd-panel mb-8 border-signal-dim p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-tally">
                <span className="tally-dot" />
                <span className="text-sm font-semibold">يُعرض الآن</span>
              </div>
              <div className="signal-bars">
                <span /><span /><span /><span />
              </div>
            </div>
            <div className="mt-2 font-display text-2xl font-bold text-ink">{currentProgram.title}</div>
            {currentProgram.description && (
              <div className="mt-2 text-ink-dim">{currentProgram.description}</div>
            )}
            <div className="mt-4 flex items-center gap-1.5 text-sm text-mute" dir="ltr">
              <Clock className="h-4 w-4" />
              {new Date(currentProgram.startTime).toLocaleTimeString('ar-EG')} –{' '}
              {new Date(currentProgram.endTime).toLocaleTimeString('ar-EG')}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-ink">
            <SatelliteDish className="h-5 w-5 text-signal" />
            الترددات
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {frequencies.map(freq => (
              <div key={freq.id} className="osd-panel p-5">
                <div className="font-display text-lg font-bold text-ink">{freq.satellite}</div>
                <div className="mt-3 grid grid-cols-2 gap-2.5 text-sm text-ink-dim">
                  <div className="flex items-center gap-1.5">
                    <Radio className="h-3.5 w-3.5 text-mute" />
                    <span dir="ltr" className="font-data">{freq.frequency}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RadioTower className="h-3.5 w-3.5 text-mute" />
                    الاستقطاب: {freq.polarization}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Gauge className="h-3.5 w-3.5 text-mute" />
                    <span dir="ltr" className="font-data">{freq.symbolRate}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <SignalHigh className="h-3.5 w-3.5 text-mute" />
                    FEC: {freq.fec}
                  </div>
                  {freq.quality && (
                    <div className="col-span-2 text-signal">الجودة: {freq.quality}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 font-display text-xl font-bold text-ink">
            <Clock className="h-5 w-5 text-sat" />
            البرامج القادمة
          </h2>
          <div className="space-y-3">
            {upcomingPrograms.map(program => (
              <div key={program.id} className="osd-panel flex items-start justify-between p-4">
                <div>
                  <div className="font-medium text-ink">{program.title}</div>
                  {program.description && (
                    <div className="mt-1 text-sm text-mute">{program.description}</div>
                  )}
                </div>
                <div className="whitespace-nowrap font-data text-sm text-mute">
                  {new Date(program.startTime).toLocaleTimeString('ar-EG')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
