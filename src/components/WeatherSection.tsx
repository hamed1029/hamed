import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { weatherRecords, WeatherData } from "../data/weather";
import {
  Sun,
  CloudSun,
  CloudRain,
  Wind,
  Droplets,
  Sunrise,
  Sunset,
  Sparkles,
  Thermometer,
  Clock,
  Compass,
} from "lucide-react";

interface WeatherSectionProps {
  t: TranslationDictionary;
  isRtl: boolean;
}

export const WeatherSection: React.FC<WeatherSectionProps> = ({ t, isRtl }) => {
  const [selectedGovKey, setSelectedGovKey] = useState<string>("muscat");
  const [isFahrenheit, setIsFahrenheit] = useState(false);

  const currentWeather: WeatherData =
    weatherRecords[selectedGovKey] || weatherRecords.muscat;

  const toFahrenheit = (c: number) => Math.round((c * 9) / 5 + 32);

  const displayTemp = (c: number) =>
    isFahrenheit ? `${toFahrenheit(c)}°F` : `${c}°C`;

  const govKeys = Object.keys(weatherRecords);

  return (
    <section id="weather" className="py-20 bg-[#FAF8F3] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/25 px-3 py-1 rounded-full mb-3">
            <Sun className="w-3.5 h-3.5 text-[#173E35]" />
            <span>حالة الطقس والمناخ المباشرة · Weather & Climate</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173E35] mb-3">
            {t.sectionWeather}
          </h2>
          <p className="text-sm text-neutral-600">
            {isRtl
              ? "بيانات مناخية حية عبر كافة محافظات سلطنة عُمان مع إرشادات موسمية لرحلتك"
              : "Live climate overview across all 11 Oman governorates with seasonal recommendations"}
          </p>
        </div>

        {/* Governorates Selector Pills + Unit Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-3.5 rounded-2xl border border-neutral-200 shadow-sm">
          {/* Scrollable governorate tabs */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
            {govKeys.map((key) => {
              const item = weatherRecords[key];
              const isSelected = selectedGovKey === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedGovKey(key)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    isSelected
                      ? "bg-[#173E35] text-white shadow-sm font-semibold"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {isRtl ? item.governorateNameAr : item.governorateNameEn}
                </button>
              );
            })}
          </div>

          {/* Unit Toggle (°C / °F) */}
          <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setIsFahrenheit(false)}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                !isFahrenheit ? "bg-white text-[#173E35] shadow-xs" : "text-neutral-500"
              }`}
            >
              °C
            </button>
            <button
              onClick={() => setIsFahrenheit(true)}
              className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                isFahrenheit ? "bg-white text-[#173E35] shadow-xs" : "text-neutral-500"
              }`}
            >
              °F
            </button>
          </div>
        </div>

        {/* Main Weather Card Display */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-neutral-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Primary Temp & Condition Column */}
            <div className="lg:col-span-5 flex flex-col justify-center border-b lg:border-b-0 lg:border-r rtl:lg:border-r-0 rtl:lg:border-l border-neutral-200 pb-6 lg:pb-0 lg:pr-8 rtl:lg:pr-0 rtl:lg:pl-8">
              <div className="flex items-center gap-2 text-xs text-[#D6B77A] font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>{isRtl ? currentWeather.governorateNameAr : currentWeather.governorateNameEn}</span>
              </div>

              <div className="flex items-center gap-4 my-2">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F5F2E9] flex items-center justify-center text-[#D6B77A]">
                  {currentWeather.icon === "sun" ? (
                    <Sun className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500 animate-spin-slow" />
                  ) : currentWeather.icon === "cloud-rain" ? (
                    <CloudRain className="w-10 h-10 sm:w-12 sm:h-12 text-blue-500" />
                  ) : currentWeather.icon === "wind" ? (
                    <Wind className="w-10 h-10 sm:w-12 sm:h-12 text-teal-600" />
                  ) : (
                    <CloudSun className="w-10 h-10 sm:w-12 sm:h-12 text-amber-500" />
                  )}
                </div>

                <div>
                  <div className="text-4xl sm:text-6xl font-black text-[#173E35] font-mono tabular-nums tracking-tight">
                    {displayTemp(currentWeather.currentTempC)}
                  </div>
                  <div className="text-xs text-neutral-500 font-medium mt-0.5">
                    {isRtl ? "الحرارة المحسوسة:" : "Feels like:"} {displayTemp(currentWeather.feelsLikeC)}
                  </div>
                </div>
              </div>

              <div className="text-base sm:text-lg font-bold text-neutral-800 mt-2">
                {isRtl ? currentWeather.conditionAr : currentWeather.conditionEn}
              </div>

              {/* High & Low Range */}
              <div className="flex items-center gap-4 text-xs text-neutral-600 mt-3 pt-3 border-t border-neutral-100">
                <span>{isRtl ? "العظمى:" : "High:"} <strong className="text-neutral-900 tabular-nums">{displayTemp(currentWeather.highC)}</strong></span>
                <span>·</span>
                <span>{isRtl ? "الصغرى:" : "Low:"} <strong className="text-neutral-900 tabular-nums">{displayTemp(currentWeather.lowC)}</strong></span>
              </div>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-neutral-200">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                    <Droplets className="w-3.5 h-3.5 text-blue-500" />
                    <span>{isRtl ? "الرطوبة" : "Humidity"}</span>
                  </div>
                  <span className="text-lg font-bold text-[#173E35] tabular-nums">
                    {currentWeather.humidityPercent}%
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-neutral-200">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                    <Wind className="w-3.5 h-3.5 text-teal-600" />
                    <span>{isRtl ? "الرياح" : "Wind"}</span>
                  </div>
                  <span className="text-lg font-bold text-[#173E35] tabular-nums">
                    {currentWeather.windSpeedKmh} <span className="text-xs font-normal">كم/س</span>
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-neutral-200">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                    <Sunrise className="w-3.5 h-3.5 text-amber-500" />
                    <span>{isRtl ? "الشروق" : "Sunrise"}</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-800">
                    {currentWeather.sunriseTime}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[#FAF8F3] border border-neutral-200">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-1">
                    <Sunset className="w-3.5 h-3.5 text-orange-500" />
                    <span>{isRtl ? "الغروب" : "Sunset"}</span>
                  </div>
                  <span className="text-xs font-bold text-neutral-800">
                    {currentWeather.sunsetTime}
                  </span>
                </div>
              </div>

              {/* Seasonal Advisory Box */}
              <div className="p-4 rounded-2xl bg-[#F5F2E9] border border-[#D6B77A]/40 flex items-start gap-3">
                <Thermometer className="w-5 h-5 text-[#173E35] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-[#173E35] block">
                    {isRtl ? "إرشادات سياحية متعلقة بالطقس في هذه الوجهة:" : "Weather & Travel Guidance:"}
                  </span>
                  <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                    {isRtl ? currentWeather.seasonalTipAr : currentWeather.seasonalTipEn}
                  </p>
                </div>
              </div>

              {/* Timestamp Indicator */}
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{currentWeather.lastUpdated}</span>
                </span>
                <span>مصدر البيانات: الأرصاد الجوية العُمانية</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
