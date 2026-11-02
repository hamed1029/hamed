import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { destinations, Destination } from "../data/destinations";
import { servicesData, ServiceItem } from "../data/services";
import { governorates } from "../data/governorates";
import {
  MapPin,
  Compass,
  Bed,
  Utensils,
  Fuel,
  HeartPulse,
  Navigation,
  Eye,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface InteractiveMapProps {
  t: TranslationDictionary;
  isRtl: boolean;
  onSelectDestination: (destId: string) => void;
}

type MapCategoryFilter = "all" | "attractions" | "stays" | "dining" | "fuel" | "medical";

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  t,
  isRtl,
  onSelectDestination,
}) => {
  const [selectedGovId, setSelectedGovId] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<MapCategoryFilter>("all");
  const [activeItem, setActiveItem] = useState<{
    id: string;
    title: string;
    category: string;
    govName: string;
    image: string;
    description: string;
    coords: [number, number];
    isDestination: boolean;
    destId?: string;
    mapUrl?: string;
  } | null>(null);

  // Combine destinations and key services for map representation
  const mapPoints = [
    ...destinations.map((d) => ({
      id: `dest-${d.id}`,
      destId: d.id,
      title: isRtl ? d.nameAr : d.nameEn,
      category: "attractions" as const,
      subCategory: d.category,
      govId: d.governorateId,
      govName: isRtl ? d.governorateNameAr : d.governorateNameEn,
      image: d.image,
      description: isRtl ? d.descriptionAr : d.descriptionEn,
      coords: d.coordinates,
      isDestination: true,
      mapUrl: `https://maps.google.com/?q=${d.coordinates[0]},${d.coordinates[1]}`,
    })),
    ...servicesData.map((s) => ({
      id: `serv-${s.id}`,
      destId: undefined,
      title: isRtl ? s.nameAr : s.nameEn,
      category: (s.type === "hotel" || s.type === "apartment"
        ? "stays"
        : s.type === "restaurant"
        ? "dining"
        : s.type === "fuel"
        ? "fuel"
        : s.type === "hospital"
        ? "medical"
        : "attractions") as MapCategoryFilter,
      subCategory: s.type,
      govId: s.governorateId,
      govName: isRtl ? s.wilayatAr : s.wilayatEn,
      image: s.image,
      description: isRtl ? s.addressAr : s.addressEn,
      coords: s.coordinates,
      isDestination: false,
      mapUrl: s.mapUrl,
    })),
  ];

  const filteredPoints = mapPoints.filter((pt) => {
    const matchGov = selectedGovId === "all" || pt.govId === selectedGovId;
    const matchCat = activeCategory === "all" || pt.category === activeCategory;
    return matchGov && matchCat;
  });

  return (
    <section id="map" className="py-16 bg-[#F5F2E9]/60 border-y border-[#D6B77A]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/30 px-3 py-1 rounded-full mb-3">
            <Compass className="w-4 h-4 text-[#173E35]" />
            <span>خارطة سلطنة عُمان التفاعلية · Interactive Oman Map</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#173E35] mb-2">
            {isRtl ? "استكشف معالم ومرافق عُمان على الخريطة" : "Explore Oman Destinations & Services on the Map"}
          </h2>
          <p className="text-sm text-neutral-600">
            {isRtl
              ? "انقر على النقاط لاكتشاف تفاصيل الوجهات السياحية، الفنادق، المستشفيات، ومحطات الوقود في مختلف المحافظات"
              : "Click markers to discover attractions, hotels, fuel stations, and emergency facilities across all governorates"}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 bg-white p-3.5 rounded-xl shadow-sm border border-neutral-200">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === "all"
                  ? "bg-[#173E35] text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              {isRtl ? "الكل" : "All"}
            </button>
            <button
              onClick={() => setActiveCategory("attractions")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === "attractions"
                  ? "bg-[#173E35] text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#D6B77A]" />
              <span>{isRtl ? "المعالم والوجهات" : "Attractions"}</span>
            </button>
            <button
              onClick={() => setActiveCategory("stays")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === "stays"
                  ? "bg-[#173E35] text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <Bed className="w-3.5 h-3.5 text-blue-500" />
              <span>{isRtl ? "الإقامة والفنادق" : "Stays"}</span>
            </button>
            <button
              onClick={() => setActiveCategory("dining")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === "dining"
                  ? "bg-[#173E35] text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-amber-600" />
              <span>{isRtl ? "مطاعم ومقاهي" : "Dining"}</span>
            </button>
            <button
              onClick={() => setActiveCategory("fuel")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === "fuel"
                  ? "bg-[#173E35] text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <Fuel className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isRtl ? "محطات الوقود" : "Fuel Stations"}</span>
            </button>
            <button
              onClick={() => setActiveCategory("medical")}
              className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeCategory === "medical"
                  ? "bg-[#173E35] text-white"
                  : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
              }`}
            >
              <HeartPulse className="w-3.5 h-3.5 text-rose-600" />
              <span>{isRtl ? "طوارئ ومستشفيات" : "Emergency Care"}</span>
            </button>
          </div>

          {/* Governorate Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-500 font-medium">
              {isRtl ? "تصفية بالمحافظة:" : "Filter by Governorate:"}
            </span>
            <select
              value={selectedGovId}
              onChange={(e) => setSelectedGovId(e.target.value)}
              className="px-3 py-1.5 bg-neutral-100 text-[#173E35] rounded-lg border border-neutral-300 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#173E35]"
            >
              <option value="all">{isRtl ? "جميع المحافظات (11)" : "All Governorates (11)"}</option>
              {governorates.map((gov) => (
                <option key={gov.id} value={gov.id}>
                  {isRtl ? gov.nameAr : gov.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Map Visual Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Map Canvas */}
          <div className="lg:col-span-2 bg-[#E9E4D4] rounded-2xl p-4 sm:p-6 shadow-md border border-[#D6B77A]/30 relative overflow-hidden min-h-[460px] flex flex-col justify-between">
            {/* Map Header Overlay */}
            <div className="flex items-center justify-between text-xs text-[#173E35] font-semibold bg-white/80 backdrop-blur-md px-3 py-2 rounded-lg border border-black/5 z-10 w-fit">
              <span>{isRtl ? "المعروض حالياً:" : "Showing:"} {filteredPoints.length} {isRtl ? "موقع موثق" : "verified locations"}</span>
            </div>

            {/* Stylized Geographical Vector Visualization of Oman */}
            <div className="relative w-full h-[360px] my-4 flex items-center justify-center">
              <svg
                viewBox="0 0 600 480"
                className="w-full h-full max-h-[380px] drop-shadow-sm select-none"
              >
                {/* Sea Backdrop */}
                <rect width="600" height="480" fill="#E2EBE9" rx="12" />

                {/* Oman Land Outline Polygon */}
                <path
                  d="M 330 60 L 350 70 L 355 85 L 340 95 L 345 110 L 375 140 L 400 155 L 440 180 L 470 200 L 490 220 L 470 240 L 420 260 L 380 290 L 340 330 L 290 380 L 250 420 L 220 440 L 190 430 L 180 390 L 200 350 L 240 310 L 260 260 L 280 210 L 300 160 Z"
                  fill="#F4EFE6"
                  stroke="#D6B77A"
                  strokeWidth="2.5"
                />

                {/* Musandam Enclave Tip */}
                <path
                  d="M 320 25 L 335 30 L 340 45 L 330 50 L 315 40 Z"
                  fill="#F4EFE6"
                  stroke="#D6B77A"
                  strokeWidth="2"
                />

                {/* Sea Waves / Labels */}
                <text x="440" y="110" fill="#245848" fontSize="11" opacity="0.4" fontWeight="bold">بحر عُمان · Sea of Oman</text>
                <text x="360" y="420" fill="#245848" fontSize="11" opacity="0.4" fontWeight="bold">بحر العرب · Arabian Sea</text>
                <text x="210" y="270" fill="#173E35" fontSize="12" opacity="0.5" fontWeight="bold">الربع الخالي</text>
                <text x="310" y="42" fill="#173E35" fontSize="9" fontWeight="bold">مسندم</text>
                <text x="410" y="185" fill="#173E35" fontSize="10" fontWeight="bold">مسقط</text>
                <text x="365" y="210" fill="#173E35" fontSize="10" fontWeight="bold">الداخلية</text>
                <text x="440" y="225" fill="#173E35" fontSize="10" fontWeight="bold">الشرقية</text>
                <text x="235" y="405" fill="#173E35" fontSize="10" fontWeight="bold">ظفار (صلالة)</text>
                <text x="320" y="320" fill="#173E35" fontSize="10" fontWeight="bold">الوسطى</text>

                {/* Dynamic Pins */}
                {filteredPoints.map((pt, idx) => {
                  // Project Oman coordinates roughly onto SVG 600x480 box
                  // Lat 16 to 26 -> Y 450 to 50
                  // Lng 52 to 60 -> X 150 to 500
                  const [lat, lng] = pt.coords;
                  const x = 160 + ((lng - 53) / 7.2) * 330;
                  const y = 430 - ((lat - 16.5) / 10) * 370;

                  const isSelected = activeItem?.id === pt.id;

                  const pinColor =
                    pt.category === "attractions"
                      ? "#173E35"
                      : pt.category === "stays"
                      ? "#1D4ED8"
                      : pt.category === "dining"
                      ? "#D97706"
                      : pt.category === "fuel"
                      ? "#059669"
                      : "#E11D48";

                  return (
                    <g
                      key={pt.id}
                      onClick={() => setActiveItem(pt)}
                      className="cursor-pointer transition-transform hover:scale-125"
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 10 : 6}
                        fill={pinColor}
                        stroke="#FFFFFF"
                        strokeWidth={isSelected ? 3 : 1.5}
                        className="transition-all"
                      />
                      {isSelected && (
                        <circle
                          cx={x}
                          cy={y}
                          r={16}
                          fill="none"
                          stroke={pinColor}
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-neutral-600 bg-white/70 backdrop-blur-sm p-2 rounded-lg border border-black/5">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#173E35]" /> {isRtl ? "وجهات سياحية" : "Attractions"}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> {isRtl ? "إقامة وفنادق" : "Stays"}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-600" /> {isRtl ? "مطاعم" : "Dining"}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> {isRtl ? "محطات وقود" : "Fuel"}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-600" /> {isRtl ? "طوارئ ومستشفيات" : "Medical"}</span>
            </div>
          </div>

          {/* Location Detail Information Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-neutral-200 flex flex-col justify-between">
            {activeItem ? (
              <div className="space-y-4">
                <div className="relative h-44 rounded-xl overflow-hidden">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#173E35] text-[#D6B77A] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow">
                    {activeItem.govName}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#173E35] mb-1">
                    {activeItem.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#D6B77A]" />
                    <span>{activeItem.coords[0].toFixed(4)}, {activeItem.coords[1].toFixed(4)}</span>
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed line-clamp-4">
                    {activeItem.description}
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  {activeItem.isDestination && activeItem.destId && (
                    <button
                      onClick={() => onSelectDestination(activeItem.destId!)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#173E35] text-[#D6B77A] text-xs font-semibold hover:bg-[#245848] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>{t.viewDetails}</span>
                    </button>
                  )}

                  <a
                    href={activeItem.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-medium hover:bg-neutral-50 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
                    <span>{isRtl ? "فتح الاتجاهات في خرائط Google" : "Get Directions in Google Maps"}</span>
                  </a>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-neutral-400">
                <Navigation className="w-12 h-12 text-[#D6B77A] mb-3 animate-pulse" />
                <h4 className="text-sm font-semibold text-neutral-700 mb-1">
                  {isRtl ? "اختر نقطة من الخريطة" : "Select a Point on the Map"}
                </h4>
                <p className="text-xs text-neutral-500 max-w-xs">
                  {isRtl
                    ? "انقر على أي علامة في الخريطة لعرض تفاصيل الموقع والصور وطرق الوصول"
                    : "Click any marker on the map to preview destination details, photos, and directions"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
