import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { servicesData, ServiceType, ServiceItem } from "../data/services";
import { governorates } from "../data/governorates";
import {
  Building2,
  Utensils,
  Fuel,
  HeartPulse,
  MapPin,
  Clock,
  Phone,
  Navigation,
  Sparkles,
  Bath,
  Car,
  Compass,
  Check,
  Search,
} from "lucide-react";

interface ServicesDirectoryProps {
  t: TranslationDictionary;
  isRtl: boolean;
}

export const ServicesDirectory: React.FC<ServicesDirectoryProps> = ({ t, isRtl }) => {
  const [selectedType, setSelectedType] = useState<ServiceType | "all">("all");
  const [selectedGov, setSelectedGov] = useState<string>("all");
  const [searchWord, setSearchWord] = useState<string>("");

  const serviceCategories: { type: ServiceType | "all"; labelAr: string; labelEn: string; icon: React.ReactNode }[] = [
    { type: "all", labelAr: "جميع الخدمات", labelEn: "All Services", icon: <Building2 className="w-3.5 h-3.5" /> },
    { type: "restaurant", labelAr: "مطاعم ومقاهي", labelEn: "Dining & Cafes", icon: <Utensils className="w-3.5 h-3.5" /> },
    { type: "hospital", labelAr: "مستشفيات وطوارئ", labelEn: "Hospitals & Care", icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { type: "fuel", labelAr: "محطات وقود", labelEn: "Fuel Stations", icon: <Fuel className="w-3.5 h-3.5" /> },
    { type: "toilet", labelAr: "دورات مياه عامة", labelEn: "Public Restrooms", icon: <Bath className="w-3.5 h-3.5" /> },
    { type: "mosque", labelAr: "مساجد وجوامع", labelEn: "Mosques", icon: <Building2 className="w-3.5 h-3.5" /> },
    { type: "guide", labelAr: "مرشدون سياحيون", labelEn: "Tour Guides", icon: <Compass className="w-3.5 h-3.5" /> },
  ];

  const filteredServices = servicesData.filter((item) => {
    const matchType = selectedType === "all" || item.type === selectedType;
    const matchGov = selectedGov === "all" || item.governorateId === selectedGov;
    const q = searchWord.toLowerCase().trim();
    const matchSearch =
      !q ||
      item.nameAr.toLowerCase().includes(q) ||
      item.nameEn.toLowerCase().includes(q) ||
      item.addressAr.toLowerCase().includes(q) ||
      item.addressEn.toLowerCase().includes(q) ||
      item.wilayatAr.toLowerCase().includes(q) ||
      item.wilayatEn.toLowerCase().includes(q);

    return matchType && matchGov && matchSearch;
  });

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/25 px-3 py-1 rounded-full mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#173E35]" />
              <span>دليل الخدمات والمرافق العامة · Services Directory</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173E35]">
              {t.sectionServices}
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-2xl">
              {isRtl
                ? "دليل موثوق للوصول السريع إلى المستشفيات، محطات الوقود، دورات المياه العامة، المطاعم، والمساجد"
                : "Verified direct access to hospitals, fuel stations, clean public restrooms, dining, and local tour guides"}
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              placeholder={isRtl ? "بحث في الخدمات..." : "Search services..."}
              className={`w-full h-11 ${
                isRtl ? "pr-10 pl-3" : "pl-10 pr-3"
              } rounded-xl bg-neutral-100 text-[#202A25] placeholder:text-neutral-400 text-xs border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#173E35]`}
            />
            <Search className={`w-4 h-4 text-neutral-400 absolute top-3.5 ${isRtl ? "right-3" : "left-3"}`} />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-neutral-200">
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-100 rounded-xl">
            {serviceCategories.map((cat) => (
              <button
                key={cat.type}
                onClick={() => setSelectedType(cat.type)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedType === cat.type
                    ? "bg-[#173E35] text-white shadow-sm font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {cat.icon}
                <span>{isRtl ? cat.labelAr : cat.labelEn}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">{t.selectGovernorate}:</span>
            <select
              value={selectedGov}
              onChange={(e) => setSelectedGov(e.target.value)}
              className="px-3 py-2 bg-neutral-100 text-[#173E35] rounded-xl border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#173E35]"
            >
              <option value="all">{t.filterAll}</option>
              {governorates.map((g) => (
                <option key={g.id} value={g.id}>
                  {isRtl ? g.nameAr : g.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-[#FAF8F3] rounded-2xl border border-neutral-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className="text-[11px] font-semibold text-[#173E35] bg-white px-2 py-0.5 rounded border border-neutral-200">
                    {srv.type === "hospital"
                      ? isRtl ? "مستشفى وطوارئ" : "Hospital / Trauma"
                      : srv.type === "fuel"
                      ? isRtl ? "محطة وقود واستراحة" : "Highway Oasis"
                      : srv.type === "toilet"
                      ? isRtl ? "مرفق دورات مياه" : "Public Restroom"
                      : srv.type === "mosque"
                      ? isRtl ? "جامع ومعلم إسلامي" : "Grand Mosque"
                      : srv.type === "restaurant"
                      ? isRtl ? "مطعم ومأكولات" : "Restaurant"
                      : isRtl ? "مرشد سياحي مرخص" : "Certified Guide"}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <Sparkles className="w-3 h-3 text-[#D6B77A]" />
                    <span className="font-semibold tabular-nums text-neutral-800">{srv.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-[#173E35] mb-1.5">
                  {isRtl ? srv.nameAr : srv.nameEn}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-neutral-600 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-[#D6B77A] shrink-0" />
                  <span className="line-clamp-1">{isRtl ? srv.addressAr : srv.addressEn}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3">
                  <Clock className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                  <span>{isRtl ? srv.openHoursAr : srv.openHoursEn}</span>
                </div>

                {/* Amenities */}
                <div className="text-[11px] text-neutral-600 space-y-1 mb-4 pt-2 border-t border-neutral-200">
                  {(isRtl ? srv.amenitiesAr : srv.amenitiesEn).slice(0, 2).map((am, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Check className="w-3 h-3 text-[#173E35] shrink-0" />
                      <span className="line-clamp-1">{am}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions: Direct Phone & Map */}
              <div className="pt-3 border-t border-neutral-200 flex items-center justify-between gap-3">
                {srv.phone ? (
                  <a
                    href={`tel:${srv.phone}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#173E35] hover:text-[#245848] transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#D6B77A]" />
                    <span dir="ltr">{srv.phone}</span>
                  </a>
                ) : (
                  <span className="text-[11px] text-neutral-400">{isRtl ? "خدمة عامة مفتوحة" : "Open Public Facility"}</span>
                )}

                <a
                  href={srv.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-neutral-700 hover:text-[#173E35] transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{isRtl ? "الموقع" : "Map"}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
