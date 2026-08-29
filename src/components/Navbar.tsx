'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-primary-800">
            📡 دليل الترددات
          </Link>

          <div className="hidden md:flex gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600">الرئيسية</Link>
            <Link href="/channels" className="text-gray-700 hover:text-primary-600">القنوات</Link>
            <Link href="/onboarding" className="text-gray-700 hover:text-primary-600">الاهتمامات</Link>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/" className="block text-gray-700 hover:text-primary-600">الرئيسية</Link>
            <Link href="/channels" className="block text-gray-700 hover:text-primary-600">القنوات</Link>
            <Link href="/onboarding" className="block text-gray-700 hover:text-primary-600">الاهتمامات</Link>
          </div>
        )}
      </div>
    </nav>
  );
}