import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { cultureStories, CultureStory } from "../data/culture";
import { Sparkles, Award, Check, ChevronRight } from "lucide-react";

interface CultureSectionProps {
  t: TranslationDictionary;
  isRtl: boolean;
}

export const CultureSection: React.FC<CultureSectionProps> = ({ t, isRtl }) => {
  const [activeStoryId, setActiveStoryId] = useState<string>(cultureStories[0].id);

  const activeStory =
    cultureStories.find((s) => s.id === activeStoryId) || cultureStories[0];

  return (
    <section id="culture" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/25 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#173E35]" />
            <span>روح التراث العُماني الأصيل · Soul of Omani Heritage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173E35] mb-3">
            {t.sectionCulture}
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {isRtl
              ? "تعرّف على عراقة الخنجر العُماني، شجرة اللبان الأسطورية، هندسة الأفلاج المائية، وطقوس كرم الضيافة"
              : "Immerse in the timeless legacy of the silver Khanjar, ancient frankincense, aflaj engineering, and legendary hospitality"}
          </p>
        </div>

        {/* Culture Tabs Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {cultureStories.map((story) => {
            const isSelected = activeStory.id === story.id;
            return (
              <button
                key={story.id}
                onClick={() => setActiveStoryId(story.id)}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  isSelected
                    ? "bg-[#173E35] text-[#D6B77A] border-[#173E35] shadow-md"
                    : "bg-[#FAF8F3] text-neutral-700 border-neutral-200 hover:border-[#D6B77A]"
                }`}
              >
                {isRtl ? story.titleAr.split(":")[0] : story.titleEn.split(":")[0]}
              </button>
            );
          })}
        </div>

        {/* Story Feature Spotlight Card */}
        <div className="bg-[#FAF8F3] rounded-3xl border border-neutral-200/90 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[460px]">
              <img
                src={activeStory.image}
                alt={isRtl ? activeStory.titleAr : activeStory.titleEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {activeStory.unescoStatus && (
                <div className="absolute top-4 left-4 bg-[#173E35]/90 backdrop-blur-md text-[#D6B77A] text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-[#D6B77A]/40 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  <span>{activeStory.unescoStatus}</span>
                </div>
              )}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs text-[#D6B77A] font-semibold block mb-1">
                  {isRtl ? activeStory.subtitleAr : activeStory.subtitleEn}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold">
                  {isRtl ? activeStory.titleAr : activeStory.titleEn}
                </h3>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between text-start">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-[#173E35] uppercase tracking-wider mb-2">
                    {isRtl ? "الأصل والمعنى الثقافي" : "Origins & Cultural Significance"}
                  </h4>
                  <p className="text-sm text-neutral-700 leading-relaxed">
                    {isRtl ? activeStory.contentAr : activeStory.contentEn}
                  </p>
                </div>

                {/* Key Facts List */}
                <div>
                  <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-3">
                    {isRtl ? "حقائق وسمات أصيلة:" : "Distinctive Authentic Highlights:"}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {(isRtl ? activeStory.keyFactsAr : activeStory.keyFactsEn).map((fact, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-2.5 rounded-xl bg-white border border-neutral-200 text-xs text-neutral-800">
                        <Check className="w-4 h-4 text-[#173E35] shrink-0 mt-0.5" />
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cultural Quote Footer */}
              <div className="mt-8 pt-4 border-t border-neutral-200 text-xs text-neutral-500 italic">
                {isRtl
                  ? "«عُمان ملتقى الحضارات، وتراثها الحي أمانة تتوارثها الأجيال بكل فخر ووفاء»"
                  : "“Oman is a crossroads of civilizations, where living heritage is treasured and preserved with pride.”"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
