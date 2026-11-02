import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { Destination, DestinationCategory, destinations } from "../data/destinations";
import { governorates } from "../data/governorates";
import { CurrencyCode, formatPrice } from "../data/currencies";
import {
  Compass,
  MapPin,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Search,
} from "lucide-react";

interface DestinationExplorerProps {
  t: TranslationDictionary;
  isRtl: boolean;
  currentCurrency: CurrencyCode;
  selectedGovFilter: string;
  onSetGovFilter: (govId: string) => void;
  onSelectDestination: (destId: string) => void;
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  t,
  isRtl,
  currentCurrency,
  selectedGovFilter,
  onSetGovFilter,
  onSelectDestination,
  searchQuery,
  onSearchQueryChange,
}) => {
  const [activeCategory, setActiveCategory] = useState<DestinationCategory | "all">("all");

  const categories: { key: DestinationCategory | "all"; label: string }[] = [
    { key: "all", label: t.filterAll },
    { key: "nature", label: t.filterNature },
    { key: "heritage", label: t.filterHeritage },
    { key: "adventure", label: t.filterAdventure },
    { key: "hidden_gem", label: t.filterHiddenGems },
  ];

  const filteredDestinations = destinations.filter((dest) => {
    const matchCategory = activeCategory === "all" || dest.category === activeCategory;
    const matchGov = selectedGovFilter === "all" || dest.governorateId === selectedGovFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      dest.nameAr.toLowerCase().includes(q) ||
      dest.nameEn.toLowerCase().includes(q) ||
      dest.governorateNameAr.toLowerCase().includes(q) ||
      dest.governorateNameEn.toLowerCase().includes(q) ||
      dest.wilayatNameAr.toLowerCase().includes(q) ||
      dest.wilayatNameEn.toLowerCase().includes(q);

    return matchCategory && matchGov && matchSearch;
  });

  return (
    <section id="destinations" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/25 px-3 py-1 rounded-full mb-3">
              <Compass className="w-3.5 h-3.5 text-[#173E35]" />
              <span>استكشف عُمان · Discover Oman</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173E35]">
              {t.sectionFeaturedDestinations}
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-2xl">
              {isRtl
                ? "دليل موثق يجمع أشهر الأودية والعيون والشواطئ والقلاع التاريخية والكنوز الجبلية الخفية"
                : "A verified guide to breathtaking wadis, dramatic mountains, historic forts, and secluded oases"}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder={isRtl ? "تصفية الوجهات بالاسم..." : "Filter places..."}
              className={`w-full h-11 ${
                isRtl ? "pr-10 pl-3" : "pl-10 pr-3"
              } rounded-xl bg-neutral-100 text-[#202A25] placeholder:text-neutral-400 text-xs border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#173E35]`}
            />
            <Search className={`w-4 h-4 text-neutral-400 absolute top-3.5 ${isRtl ? "right-3" : "left-3"}`} />
          </div>
        </div>

        {/* Filter Controls Row: Interactive Segmented Category Buttons + Governorate Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
          {/* Category Tabs (Functional buttons, clean segmented style) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-xl">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat.key
                    ? "bg-[#173E35] text-white shadow-sm font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Governorate Select */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">
              {t.selectGovernorate}:
            </span>
            <select
              value={selectedGovFilter}
              onChange={(e) => onSetGovFilter(e.target.value)}
              className="px-3 py-2 bg-neutral-100 text-[#173E35] rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#173E35]"
            >
              <option value="all">{t.filterAll} ({destinations.length})</option>
              {governorates.map((gov) => (
                <option key={gov.id} value={gov.id}>
                  {isRtl ? gov.nameAr : gov.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDestinations.map((dest) => {
              const feeText =
                dest.entranceFeeOMR === 0
                  ? t.freeEntrance
                  : formatPrice(dest.entranceFeeOMR, currentCurrency, isRtl);

              return (
                <div
                  key={dest.id}
                  onClick={() => onSelectDestination(dest.id)}
                  className="group bg-[#FAF8F3] rounded-2xl border border-neutral-200/90 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-neutral-200">
                    <img
                      src={dest.image}
                      alt={isRtl ? dest.nameAr : dest.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                    {/* Top corner category text (unboxed) */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] text-white">
                      <span className="px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md">
                        {dest.category === "nature"
                          ? isRtl ? "طبيعة وأودية" : "Nature"
                          : dest.category === "heritage"
                          ? isRtl ? "تراث وقلاع" : "Heritage"
                          : dest.category === "adventure"
                          ? isRtl ? "مغامرات وجبال" : "Adventure"
                          : isRtl ? "كنز مخفي" : "Hidden Gem"}
                      </span>
                      <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-2 py-1 rounded-md text-[#D6B77A]">
                        <Sparkles className="w-3 h-3" />
                        <span className="tabular-nums font-mono font-semibold">{dest.rating}</span>
                      </div>
                    </div>

                    {/* Bottom Title over photo */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-[11px] text-[#D6B77A] font-medium">
                        {isRtl ? dest.governorateNameAr : dest.governorateNameEn}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold line-clamp-1 group-hover:text-[#D6B77A] transition-colors">
                        {isRtl ? dest.nameAr : dest.nameEn}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content with ZERO-PILL METADATA DISCIPLINE (§1.A) */}
                  <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                      {isRtl ? dest.descriptionAr : dest.descriptionEn}
                    </p>

                    <div>
                      {/* Quiet unboxed metadata with dot separators */}
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-4 pt-3 border-t border-neutral-200">
                        <span>{isRtl ? dest.wilayatNameAr : dest.wilayatNameEn}</span>
                        <span aria-hidden="true">·</span>
                        <span>{isRtl ? dest.visitDurationAr : dest.visitDurationEn}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-[#173E35]">{feeText}</span>
                      </div>

                      {/* Action Link */}
                      <div className="flex items-center justify-between text-xs font-semibold text-[#173E35] group-hover:text-[#245848]">
                        <span>{t.viewDetails}</span>
                        <ArrowUpRight className="w-4 h-4 text-[#D6B77A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#FAF8F3] rounded-2xl border border-neutral-200">
            <Compass className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h4 className="text-sm font-semibold text-neutral-700 mb-1">
              {isRtl ? "لم يتم العثور على وجهات مطابقة" : "No matching destinations found"}
            </h4>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mb-4">
              {isRtl ? "جرّب تغيير فئة البحث أو اختيار محافظة أخرى" : "Try resetting your search query or governorate filter"}
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                onSetGovFilter("all");
                onSearchQueryChange("");
              }}
              className="px-4 py-2 rounded-lg bg-[#173E35] text-white text-xs font-semibold"
            >
              {isRtl ? "إعادة ضبط التصفية" : "Reset Filters"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
