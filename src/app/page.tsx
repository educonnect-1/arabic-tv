import Link from 'next/link';
import { SatelliteDish, Tv, BellRing } from 'lucide-react';
import TunerBanner from '@/components/TunerBanner';

const menuItems = [
  {
    index: '01',
    icon: SatelliteDish,
    title: 'كل الترددات',
    desc: 'ترددات كل القنوات على كل الأقمار الصناعية',
  },
  {
    index: '02',
    icon: Tv,
    title: 'البرامج الحالية',
    desc: 'اعرف إيه اللي شغال دلوقتي على كل قناة',
  },
  {
    index: '03',
    icon: BellRing,
    title: 'إشعارات ذكية',
    desc: 'إشعارات للأفلام والمسلسلات والمباريات اللي بتحبها',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-16 md:py-24">
      <div className="container mx-auto">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="osd-chip inline-block text-signal">
              📡 دليل ترددات محدّث أول بأول
            </span>
            <h1 className="mt-5 font-display text-4xl font-black leading-tight text-ink md:text-5xl">
              دليل ترددات القنوات التلفزيونية
            </h1>
            <p className="mt-5 max-w-lg text-lg text-ink-dim">
              كل ترددات القنوات مع البرامج الحالية والإشعارات الذكية حسب اهتماماتك
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/onboarding">
                <button className="btn-primary">ابدأ الآن</button>
              </Link>
              <Link href="/channels">
                <button className="btn-secondary">تصفح القنوات</button>
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <TunerBanner />
          </div>
        </div>

        <div className="mt-24 grid gap-4 md:grid-cols-3">
          {menuItems.map(item => (
            <div
              key={item.index}
              className="osd-panel group relative overflow-hidden p-7 transition-colors hover:border-line-strong"
            >
              <span className="font-data text-sm text-mute">{item.index}</span>
              <div className="mt-4 flex h-11 w-11 items-center justify-center rounded-lg bg-panel-raised ring-1 ring-line">
                <item.icon className="h-5 w-5 text-signal" strokeWidth={2} />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
