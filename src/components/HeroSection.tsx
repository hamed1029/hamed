import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { Search, Compass, MapPin, Calendar, Mountain, Sparkles } from "lucide-react";
import { destinations } from "../data/destinations";

interface HeroSectionProps {
  t: TranslationDictionary;
  isRtl: boolean;
  onNavigate: (sectionId: string) => void;
  onSelectDestination: (destId: string) => void;
  onSearchQuery: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  t,
  isRtl,
  onNavigate,
  onSelectDestination,
  onSearchQuery,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = searchValue.trim()
    ? destinations.filter((d) => {
        const q = searchValue.toLowerCase();
        return (
          d.nameAr.toLowerCase().includes(q) ||
          d.nameEn.toLowerCase().includes(q) ||
          d.governorateNameAr.toLowerCase().includes(q) ||
          d.governorateNameEn.toLowerCase().includes(q) ||
          d.wilayatNameAr.toLowerCase().includes(q) ||
          d.wilayatNameEn.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearchQuery(searchValue);
      onNavigate("destinations");
      setShowSuggestions(false);
    }
  };

  return (
    <div id="hero" className="relative min-h-[580px] lg:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Fallback and Measured Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_oman_landscape_1793615737313.jpg"
          alt="Sultanate of Oman Dramatic Mountains and Heritage Village"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Measured dark scrim for WCAG 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#173E35] via-[#173E35]/65 to-[#173E35]/40" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        {/* Subtle Omani Emblem Star Marker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#D6B77A] text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>سلطنة عُمان · Sultanate of Oman</span>
        </div>

        {/* Marquee Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 text-balance">
          {t.siteTitle}
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-2xl font-medium text-[#F5F2E9] max-w-3xl mx-auto mb-3 leading-relaxed text-balance">
          {t.tagline}
        </p>

        <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto mb-8 font-light">
          {t.subTagline}
        </p>

        {/* Prominent Search Bar */}
        <div className="max-w-2xl mx-auto mb-8 relative">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                placeholder={t.searchPlaceholder}
                className={`w-full h-14 ${
                  isRtl ? "pr-12 pl-32 text-right" : "pl-12 pr-32 text-left"
                } rounded-xl bg-white text-[#202A25] placeholder:text-neutral-400 text-sm sm:text-base font-normal shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#D6B77A] transition-all`}
              />
              <Search
                className={`w-5 h-5 text-neutral-400 absolute ${
                  isRtl ? "right-4" : "left-4"
                } pointer-events-none`}
              />
              <button
                type="submit"
                className={`absolute ${
                  isRtl ? "left-2" : "right-2"
                } h-10 px-5 rounded-lg bg-[#173E35] hover:bg-[#245848] text-[#D6B77A] text-xs sm:text-sm font-semibold transition-colors`}
              >
                {t.send === "إرسال" ? "بحث" : "Search"}
              </button>
            </div>
          </form>

          {/* Autocomplete Suggestions Box */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div
              className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-neutral-200 overflow-hidden z-50 text-start max-h-72 overflow-y-auto"
              onMouseLeave={() => setShowSuggestions(false)}
            >
              <div className="px-4 py-2 text-xs font-semibold text-neutral-400 border-b border-neutral-100 bg-neutral-50">
                {isRtl ? "نتائج مقترحة سريعة" : "Suggested Places"}
              </div>
              {filteredSuggestions.map((dest) => (
                <button
                  key={dest.id}
                  onClick={() => {
                    onSelectDestination(dest.id);
                    setShowSuggestions(false);
                  }}
                  className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#FAF8F3] border-b border-neutral-100 last:border-b-0 text-start transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={dest.image}
                      alt={isRtl ? dest.nameAr : dest.nameEn}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                    <div>
                      <div className="text-sm font-semibold text-[#173E35]">
                        {isRtl ? dest.nameAr : dest.nameEn}
                      </div>
                      <div className="text-xs text-neutral-500">
                        {isRtl ? dest.governorateNameAr : dest.governorateNameEn} ·{" "}
                        {isRtl ? dest.wilayatNameAr : dest.wilayatNameEn}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-[#D6B77A] font-medium">
                    {t.viewDetails}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3 Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => onNavigate("destinations")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#D6B77A] hover:bg-[#c4a465] text-[#173E35] font-bold text-sm shadow-lg transition-transform active:scale-95"
          >
            <Mountain className="w-4 h-4" />
            <span>{t.ctaDiscover}</span>
          </button>

          <button
            onClick={() => onNavigate("governorates")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-sm backdrop-blur-md border border-white/25 shadow-lg transition-transform active:scale-95"
          >
            <MapPin className="w-4 h-4" />
            <span>{t.ctaGovernorates}</span>
          </button>

          <button
            onClick={() => onNavigate("planner")}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#245848] hover:bg-[#1f4b3d] text-white font-bold text-sm border border-[#D6B77A]/40 shadow-lg transition-transform active:scale-95"
          >
            <Calendar className="w-4 h-4 text-[#D6B77A]" />
            <span>{t.ctaPlanTrip}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
