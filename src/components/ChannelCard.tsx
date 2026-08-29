import Link from 'next/link';
import { SatelliteDish } from 'lucide-react';
import { Channel, Program } from '@/types';
import { getCategoryMeta } from '@/lib/categoryIcons';

interface ChannelCardProps {
  channel: Channel;
  currentProgram?: Program;
  frequencies: Array<{
    satellite: string;
    frequency: number;
    polarization: string;
    symbolRate: number;
  }>;
}

export default function ChannelCard({ channel, currentProgram, frequencies }: ChannelCardProps) {
  const category = getCategoryMeta(channel.category);
  const CategoryIcon = category.icon;

  return (
    <Link href={`/channels/${channel.id}`}>
      <div className="osd-panel group cursor-pointer p-6 transition-colors hover:border-line-strong">
        <div className="flex items-start gap-4">
          {channel.logo ? (
            <img src={channel.logo} alt={channel.name} className="h-14 w-14 rounded-lg object-cover ring-1 ring-line" />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-panel-raised ring-1 ring-line">
              <SatelliteDish className="h-6 w-6 text-mute" />
            </span>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg font-bold text-ink truncate">{channel.name}</h3>
            <span className="mt-0.5 inline-flex items-center gap-1.5 text-xs text-mute">
              <CategoryIcon className="h-3.5 w-3.5" style={{ color: category.color }} />
              {category.label}
            </span>

            {currentProgram && (
              <div className="mt-3 rounded-lg bg-panel-raised p-3">
                <div className="flex items-center gap-1.5 text-xs text-tally">
                  <span className="tally-dot" />
                  الآن
                </div>
                <div className="mt-1 font-medium text-ink truncate">{currentProgram.title}</div>
              </div>
            )}

            {frequencies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5" dir="ltr">
                {frequencies.slice(0, 2).map((freq, i) => (
                  <span key={i} className="osd-chip">
                    {freq.satellite} · {freq.frequency} {freq.polarization} · {freq.symbolRate}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
