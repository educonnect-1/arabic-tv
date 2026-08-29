'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Film, Tv, Trophy, Newspaper, Baby, Globe2 } from 'lucide-react';

const interests = [
  { id: 'movies', label: 'أفلام', icon: Film },
  { id: 'series', label: 'مسلسلات', icon: Tv },
  { id: 'sports', label: 'رياضة', icon: Trophy },
  { id: 'news', label: 'أخبار', icon: Newspaper },
  { id: 'kids', label: 'أطفال', icon: Baby },
  { id: 'documentary', label: 'وثائقي', icon: Globe2 },
];

const genres = ['أكشن', 'كوميدي', 'دراما', 'رعب', 'رومانسي', 'خيال علمي', 'جريمة', 'مغامرة'];
const teams = ['الأهلي', 'الزمالك', 'ريال مدريد', 'برشلونة', 'ليفربول', 'مانشستر سيتي'];

export default function Onboarding() {
  const router = useRouter();
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

  const finishOnboarding = () => {
    router.push('/channels');
  };

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 flex justify-center gap-2">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`h-2 w-12 rounded-full transition-colors ${
                s <= step ? 'bg-signal' : 'bg-panel-raised'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink mb-4">اختر اهتماماتك</h2>
            <p className="mb-8 text-ink-dim">هنستخدم دي عشان نبلغك بالبرامج اللي تهمك</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {interests.map(interest => {
                const Icon = interest.icon;
                const selected = selectedInterests.includes(interest.id);
                return (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`rounded-xl border-2 p-6 transition-all ${
                      selected
                        ? 'border-signal bg-signal-dim'
                        : 'border-line bg-panel hover:border-line-strong'
                    }`}
                  >
                    <Icon className={`mx-auto mb-2 h-8 w-8 ${selected ? 'text-signal' : 'text-mute'}`} />
                    <div className="font-medium text-ink">{interest.label}</div>
                  </button>
                );
              })}
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
            <h2 className="font-display text-3xl font-bold text-ink mb-4">أنواع الأفلام المفضلة</h2>
            <p className="mb-8 text-ink-dim">اختر الأنواع اللي بتحبها (اختياري)</p>
            <div className="flex flex-wrap justify-center gap-3">
              {genres.map(genre => {
                const selected = selectedGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    onClick={() => toggleGenre(genre)}
                    className={`rounded-full border-2 px-6 py-3 transition-all ${
                      selected
                        ? 'border-signal bg-signal text-void'
                        : 'border-line bg-panel text-ink hover:border-line-strong'
                    }`}
                  >
                    {genre}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={() => setStep(1)} className="btn-secondary">السابق</button>
              <button onClick={() => setStep(3)} className="btn-primary">التالي</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold text-ink mb-4">الفرق المفضلة</h2>
            <p className="mb-8 text-ink-dim">هنبلغك لما يكون في مباراة للفرق دي (اختياري)</p>
            <div className="flex flex-wrap justify-center gap-3">
              {teams.map(team => {
                const selected = selectedTeams.includes(team);
                return (
                  <button
                    key={team}
                    onClick={() => toggleTeam(team)}
                    className={`rounded-full border-2 px-6 py-3 transition-all ${
                      selected
                        ? 'border-signal bg-signal text-void'
                        : 'border-line bg-panel text-ink hover:border-line-strong'
                    }`}
                  >
                    {team}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex justify-center gap-4">
              <button onClick={() => setStep(2)} className="btn-secondary">السابق</button>
              <button onClick={finishOnboarding} className="btn-primary">ابدأ الاستخدام</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
