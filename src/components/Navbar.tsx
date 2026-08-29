'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SatelliteDish, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'الرئيسية' },
  { href: '/channels', label: 'القنوات' },
  { href: '/onboarding', label: 'الاهتمامات' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-void/85 backdrop-blur">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-lg font-bold text-ink">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-panel ring-1 ring-line">
              <SatelliteDish className="h-5 w-5 text-signal" strokeWidth={2} />
              <span className="tally-dot absolute -top-1 -left-1" />
            </span>
            <span className="font-display">دليل الترددات</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-4 py-2 text-sm font-medium text-ink-dim transition-colors hover:bg-panel hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <button
            className="rounded-md p-2 text-ink-dim hover:bg-panel md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="space-y-1 border-t border-line py-3 md:hidden">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium text-ink-dim hover:bg-panel hover:text-ink"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
