import Link from 'next/link';
import { Channel, Program } from '@/types';

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
  return (
    <Link href={`/channels/${channel.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-start gap-4">
          {channel.logo && (
            <img src={channel.logo} alt={channel.name} className="w-16 h-16 rounded-lg" />
          )}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary-800">{channel.name}</h3>
            <span className="text-sm text-gray-500">{channel.category}</span>
            
            {currentProgram && (
              <div className="mt-3 p-3 bg-primary-50 rounded-lg">
                <div className="text-xs text-gray-500">الآن</div>
                <div className="font-medium text-primary-700">{currentProgram.title}</div>
              </div>
            )}

            <div className="mt-3 text-xs text-gray-600">
              {frequencies.slice(0, 2).map((freq, i) => (
                <div key={i}>
                  {freq.satellite} | {freq.frequency} {freq.polarization} | {freq.symbolRate}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}