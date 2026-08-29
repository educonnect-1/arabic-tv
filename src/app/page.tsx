import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7F5F0] to-white py-20 px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-[#20160E] mb-6">
            دليل ترددات القنوات التلفزيونية
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            كل ترددات القنوات مع البرامج الحالية والإشعارات الذكية حسب اهتماماتك
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/onboarding">
              <button className="btn-primary">ابدأ الآن</button>
            </Link>
            <Link href="/channels">
              <button className="btn-secondary">تصفح القنوات</button>
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow text-center">
            <div className="text-5xl mb-4">📡</div>
            <h3 className="text-xl font-bold mb-3 text-[#20160E]">كل الترددات</h3>
            <p className="text-gray-600">
              ترددات كل القنوات على كل الأقمار الصناعية
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow text-center">
            <div className="text-5xl mb-4">📺</div>
            <h3 className="text-xl font-bold mb-3 text-[#20160E]">البرامج الحالية</h3>
            <p className="text-gray-600">
              اعرف إيه اللي شغال دلوقتي على كل قناة
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow text-center">
            <div className="text-5xl mb-4">🔔</div>
            <h3 className="text-xl font-bold mb-3 text-[#20160E]">إشعارات ذكية</h3>
            <p className="text-gray-600">
              إشعارات للأفلام والمسلسلات والمباريات اللي بتحبها
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}