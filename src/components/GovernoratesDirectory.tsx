import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { governorates, Governorate } from "../data/governorates";
import {
  MapPin,
  Building,
  Thermometer,
  Compass,
  ArrowRight,
  ChevronDown,
  Sparkles,
  Hotel,
  Utensils,
  Fuel,
  HeartPulse,
} from "lucide-react";

interface GovernoratesDirectoryProps {
  t: TranslationDictionary;
  isRtl: boolean;
  onSelectGovernorateFilter: (govId: string) => void;
  onNavigate: (sectionId: string) => void;
}

export const GovernoratesDirectory: React.FC<GovernoratesDirectoryProps> = ({
  t,
  isRtl,
  onSelectGovernorateFilter,
  onNavigate,
}) => {
  const [selectedGov, setSelectedGov] = useState<Governorate>(governorates[0]);
  const [selectedWilayatId, setSelectedWilayatId] = useState<string | null>(null);

  const handleGovClick = (gov: Governorate) => {
    setSelectedGov(gov);
    setSelectedWilayatId(null);
  };

  const handleExploreGovernorate = (govId: string) => {
    onSelectGovernorateFilter(govId);
    onNavigate("destinations");
  };

  return (
    <section id="governorates" className="py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/25 px-3 py-1 rounded-full mb-3">
            <Building className="w-3.5 h-3.5 text-[#173E35]" />
            <span>محافظات سلطنة عُمان الـ 11 · The 11 Governorates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173E35] mb-3">
            {t.sectionGovernorates}
          </h2>
          <p className="text-sm text-neutral-600 leading-relaxed">
            {isRtl
              ? "استكشف كل محافظة وولاياتها وتنوعها الطبيعي والتاريخي والمرافق الخدمية المتاحة لزوارها"
              : "Discover each governorate, its official wilayats, natural landscapes, and essential visitor services"}
          </p>
        </div>

        {/* Governorates Selector Tabs / Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3 mb-10">
          {governorates.map((gov) => {
            const isSelected = selectedGov.id === gov.id;
            return (
              <button
                key={gov.id}
                onClick={() => handleGovClick(gov)}
                className={`p-3 rounded-xl text-start transition-all border ${
                  isSelected
                    ? "bg-[#173E35] text-white border-[#173E35] shadow-md scale-[1.02]"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-[#D6B77A] hover:bg-neutral-50"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[11px] font-mono ${isSelected ? "text-[#D6B77A]" : "text-neutral-400"}`}>
                    {gov.wilayats.length} {isRtl ? "ولايات" : "Wilayats"}
                  </span>
                  {isSelected && <Sparkles className="w-3 h-3 text-[#D6B77A]" />}
                </div>
                <div className="font-bold text-xs sm:text-sm line-clamp-1">
                  {isRtl ? gov.nameAr : gov.nameEn}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Governorate Deep-Dive Showcase */}
        <div className="bg-white rounded-3xl shadow-sm border border-neutral-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Visual Photography Column */}
            <div className="lg:col-span-5 relative min-h-[320px] lg:min-h-[460px]">
              <img
                src={selectedGov.heroImage}
                alt={isRtl ? selectedGov.nameAr : selectedGov.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest text-[#D6B77A] font-semibold">
                  {isRtl ? "المركز الإداري" : "Administrative Capital"}: {isRtl ? selectedGov.capitalAr : selectedGov.capitalEn}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-1 mb-2">
                  {isRtl ? selectedGov.nameAr : selectedGov.nameEn}
                </h3>
                <p className="text-xs text-white/90 line-clamp-3">
                  {isRtl ? selectedGov.descriptionAr : selectedGov.descriptionEn}
                </p>
              </div>
            </div>

            {/* Content & Wilayats Column */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                {/* Climate & Weather Brief */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#F5F2E9] border border-[#D6B77A]/30 mb-6">
                  <Thermometer className="w-5 h-5 text-[#173E35] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#173E35]">
                      {isRtl ? "طبيعة المناخ ومواسم الزيارة:" : "Climate & Ideal Season:"}
                    </span>
                    <p className="text-xs text-neutral-700 mt-0.5">
                      {isRtl ? selectedGov.climateSummaryAr : selectedGov.climateSummaryEn}
                    </p>
                  </div>
                </div>

                {/* Facilities Counter Row */}
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6 text-center">
                  <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span className="block text-sm font-bold text-[#173E35] tabular-nums">
                      {selectedGov.facilitiesCount.attractions}
                    </span>
                    <span className="text-[10px] text-neutral-500">{isRtl ? "معالم" : "Sights"}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span className="block text-sm font-bold text-[#173E35] tabular-nums">
                      {selectedGov.facilitiesCount.hotels}
                    </span>
                    <span className="text-[10px] text-neutral-500">{isRtl ? "فنادق" : "Hotels"}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span className="block text-sm font-bold text-[#173E35] tabular-nums">
                      {selectedGov.facilitiesCount.restaurants}
                    </span>
                    <span className="text-[10px] text-neutral-500">{isRtl ? "مطاعم" : "Dining"}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span className="block text-sm font-bold text-[#173E35] tabular-nums">
                      {selectedGov.facilitiesCount.hospitals}
                    </span>
                    <span className="text-[10px] text-neutral-500">{isRtl ? "مستشفيات" : "Clinics"}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span className="block text-sm font-bold text-[#173E35] tabular-nums">
                      {selectedGov.facilitiesCount.fuelStations}
                    </span>
                    <span className="text-[10px] text-neutral-500">{isRtl ? "محطات وقود" : "Fuel"}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-50 border border-neutral-100">
                    <span className="block text-sm font-bold text-[#173E35] tabular-nums">
                      {selectedGov.facilitiesCount.mosques}
                    </span>
                    <span className="text-[10px] text-neutral-500">{isRtl ? "مساجد" : "Mosques"}</span>
                  </div>
                </div>

                {/* Wilayats Interactive List */}
                <h4 className="text-sm font-bold text-[#173E35] mb-3 flex items-center justify-between">
                  <span>{isRtl ? "ولايات المحافظة وأبرز معالمها:" : "Wilayats & Key Highlights:"}</span>
                  <span className="text-xs font-normal text-neutral-500">
                    {isRtl ? "انقر على الولاية للاطلاع" : "Click wilayat to view"}
                  </span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                  {selectedGov.wilayats.map((wil) => {
                    const isWilActive = selectedWilayatId === wil.id;
                    return (
                      <div
                        key={wil.id}
                        onClick={() => setSelectedWilayatId(isWilActive ? null : wil.id)}
                        className={`p-2.5 rounded-xl border text-start cursor-pointer transition-colors ${
                          isWilActive
                            ? "bg-[#173E35]/5 border-[#173E35]"
                            : "bg-white border-neutral-200 hover:border-[#D6B77A]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#173E35]">
                            {isRtl ? `ولاية ${wil.nameAr}` : `${wil.nameEn} Wilayat`}
                          </span>
                          <MapPin className="w-3.5 h-3.5 text-[#D6B77A]" />
                        </div>
                        <p className="text-[11px] text-neutral-600 mt-1 line-clamp-2">
                          {isRtl ? wil.keyHighlightAr : wil.keyHighlightEn}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between gap-4">
                <span className="text-xs text-neutral-500">
                  {isRtl ? "تصفح جميع الوجهات المسجلة في هذه المحافظة" : "Explore all destinations in this governorate"}
                </span>
                <button
                  onClick={() => handleExploreGovernorate(selectedGov.id)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#173E35] hover:bg-[#245848] text-[#D6B77A] text-xs font-semibold shadow transition-colors shrink-0"
                >
                  <span>{isRtl ? `استكشف معالم ${selectedGov.nameAr}` : `Explore ${selectedGov.nameEn}`}</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRtl ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
