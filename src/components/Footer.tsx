import { SatelliteDish } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-line bg-void-2">
      <div className="container mx-auto flex flex-col items-center gap-3 px-6 py-10 text-center">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-panel ring-1 ring-line">
          <SatelliteDish className="h-4 w-4 text-mute" strokeWidth={2} />
        </span>
        <p className="text-sm text-mute">
          © 2024 دليل ترددات القنوات. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
