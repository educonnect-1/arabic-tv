import { SatelliteDish } from 'lucide-react';

// لوحة تُحاكي شريط معلومات القناة اللي بيظهر على شاشة الرسيفر الحقيقي عند تغيير القناة.
// عنصر بصري توضيحي بس (اسم القناة والبرنامج هنا افتراضيين وغير حقيقيين).
export default function TunerBanner() {
  return (
    <div className="tuning-in osd-panel w-full max-w-md p-5 shadow-2xl shadow-black/40">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-panel-raised ring-1 ring-line">
            <SatelliteDish className="h-5 w-5 text-sat" />
          </span>
          <div>
            <div className="font-display text-base font-bold text-ink">القناة النموذجية</div>
            <div className="text-xs text-mute">ترفيه عام</div>
          </div>
        </div>
        <div className="signal-bars">
          <span /><span /><span /><span />
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4">
        <span className="tally-dot" />
        <span className="text-xs font-semibold text-tally">يُعرض الآن</span>
      </div>
      <div className="mt-1 font-display text-lg font-bold text-ink">نشرة السهرة</div>

      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-panel-raised">
        <div className="h-full w-2/3 rounded-full bg-signal" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2" dir="ltr">
        <span className="osd-chip">11938&nbsp;V&nbsp;27500</span>
        <span className="osd-chip">Nilesat 301</span>
        <span className="osd-chip">FEC 5/6</span>
      </div>
    </div>
  );
}
