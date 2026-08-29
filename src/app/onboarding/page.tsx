'use client';

import { useState } from 'react';

const interests = [
  { id: 'movies', label: 'أفلام', icon: '🎬' },
  { id: 'series', label: 'مسلسلات', icon: '📺' },
  { id: 'sports', label: 'رياضة', icon: '⚽' },
  { id: 'news', label: 'أخبار', icon: '📰' },
  { id: 'kids', label: 'أطفال', icon: '' },
  { id: 'documentary', label: 'وثائقي', icon: '' },
];

const genres = ['أكشن', 'كوميدي', 'دراما', 'رعب', 'رومانسي', 'خيال علمي', 'جريمة', 'مغامرة'];
const teams = ['الأهلي', 'الزمالك', 'ريال مدريد', 'برشلونة', 'ليفربول', 'مانشستر سيتي'];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  const toggleTeam = (team: string) => {
    setSelectedTeams(prev =>
      prev.includes(team) ? prev.filter(t => t !== team) : [...prev, team]
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7F5F0] to-white py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center gap-2 mb-12">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`w-12 h-2 rounded-full transition-colors ${
                s <= step ? 'bg-[#5C442E]' : 'bg-[#D4C5A9]'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#20160E] mb-4">اختر اهتماماتك</h2>
            <p className="text-gray-600 mb-8">هنستخدم دي عشان نبلغك بالبرامج اللي تهمك</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {interests.map(interest => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'border-[#5C442E] bg-[#F7F5F0]'
                      : 'border-gray-200 bg-white hover:border-[#D4C5A9]'
                  }`}
                >
                  <div className="text-4xl mb-2">{interest.icon}</div>
                  <div className="font-medium text-[#20160E]">{interest.label}</div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(2)}
              className="btn-primary mt-8"
              disabled={selectedInterests.length === 0}
            >
              التالي
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#20160E] mb-4">أنواع الأفلام المفضلة</h2>
            <p className="text-gray-600 mb-8">اختر الأنواع اللي بتحبها (اختياري)</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-6 py-3 rounded-full border-2 transition-all ${
                    selectedGenres.includes(genre)
                      ? 'border-[#5C442E] bg-[#5C442E] text-white'
                      : 'border-gray-200 bg-white text-[#20160E] hover:border-[#D4C5A9]'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
            <div className="flex gap-4 justify-center mt-8">
              <button onClick={() => setStep(1)} className="btn-secondary">السابق</button>
              <button onClick={() => setStep(3)} className="btn-primary">التالي</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#20160E] mb-4">الفرق المفضلة</h2>
            <p className="text-gray-600 mb-8">هنبلغك لما يكون في مباراة للفرق دي (اختياري)</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {teams.map(team => (
                <button
                  key={team}
                  onClick={() => toggleTeam(team)}
                  className={`px-6 py-3 rounded-full border-2 transition-all ${
                    selectedTeams.includes(team)
                      ? 'border-[#5C442E] bg-[#5C442E] text-white'
                      : 'border-gray-200 bg-white text-[#20160E] hover:border-[#D4C5A9]'
                  }`}
                >
                  {team}
                </button>
              ))}
            </div>
            <div className="flex gap-4 justify-center mt-8">
              <button onClick={() => setStep(2)} className="btn-secondary">السابق</button>
              <button className="btn-primary">ابدأ الاستخدام</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}