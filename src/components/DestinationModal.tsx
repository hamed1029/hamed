import React from "react";
import { TranslationDictionary } from "../data/translations";
import { Destination } from "../data/destinations";
import { CurrencyCode, formatPrice } from "../data/currencies";
import {
  X,
  MapPin,
  Clock,
  Calendar,
  Ticket,
  ShieldCheck,
  Check,
  Navigation,
  Car,
  HeartPulse,
  Info,
  Sparkles,
} from "lucide-react";

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  currentCurrency: CurrencyCode;
  t: TranslationDictionary;
  isRtl: boolean;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  currentCurrency,
  t,
  isRtl,
}) => {
  if (!destination) return null;

  const [lat, lng] = destination.coordinates;
  const googleMapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

  const priceFormatted =
    destination.entranceFeeOMR === 0
      ? t.freeEntrance
      : formatPrice(destination.entranceFeeOMR, currentCurrency, isRtl);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-neutral-200 relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Gallery Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={destination.image}
            alt={isRtl ? destination.nameAr : destination.nameEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Badge & Title */}
          <div className="absolute bottom-5 left-6 right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5 text-xs text-[#D6B77A] font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.verifiedInfo}</span>
              <span>·</span>
              <span>{isRtl ? destination.governorateNameAr : destination.governorateNameEn}</span>
              <span>·</span>
              <span>{isRtl ? destination.wilayatNameAr : destination.wilayatNameEn}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white text-balance">
              {isRtl ? destination.nameAr : destination.nameEn}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto text-start">
          {/* Unboxed Metadata Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#FAF8F3] border border-neutral-200 text-xs">
            <div>
              <span className="text-neutral-500 block mb-0.5">{t.entranceFee}</span>
              <span className="font-bold text-[#173E35] text-sm tabular-nums">
                {priceFormatted}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-0.5">{t.visitDuration}</span>
              <span className="font-semibold text-neutral-800">
                {isRtl ? destination.visitDurationAr : destination.visitDurationEn}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-0.5">{t.bestSeason}</span>
              <span className="font-semibold text-neutral-800">
                {isRtl ? destination.bestSeasonAr : destination.bestSeasonEn}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block mb-0.5">الإحداثيات الجغرافية</span>
              <span className="font-mono text-neutral-700 tabular-nums">
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-[#173E35] mb-2">
              {isRtl ? "عن الوجهة" : "About Destination"}
            </h3>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {isRtl ? destination.descriptionAr : destination.descriptionEn}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h3 className="text-base font-bold text-[#173E35] mb-2">
              {isRtl ? "أبرز التجارب والأنشطة" : "Key Experiences"}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-neutral-700">
              {(isRtl ? destination.highlightsAr : destination.highlightsEn).map((hl, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#173E35] shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to Reach */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
            <h4 className="text-xs font-bold text-[#173E35] uppercase mb-1 flex items-center gap-1.5">
              <Car className="w-4 h-4 text-[#D6B77A]" />
              <span>{t.howToReach}</span>
            </h4>
            <p className="text-xs text-neutral-700 leading-relaxed">
              {isRtl ? destination.howToReachAr : destination.howToReachEn}
            </p>
          </div>

          {/* Facilities */}
          <div>
            <h4 className="text-xs font-bold text-neutral-500 mb-2">{t.facilities}:</h4>
            <div className="flex flex-wrap gap-2 text-xs text-neutral-600">
              {destination.facilities.map((fac) => (
                <span
                  key={fac}
                  className="px-2.5 py-1 rounded-md bg-neutral-100 border border-neutral-200 text-neutral-700"
                >
                  {fac === "parking"
                    ? isRtl ? "مواقف سيارات" : "Parking"
                    : fac === "restrooms"
                    ? isRtl ? "دورات مياه" : "Restrooms"
                    : fac === "prayer_room"
                    ? isRtl ? "مصلى" : "Prayer Area"
                    : fac === "family_friendly"
                    ? isRtl ? "مناسب للعائلات" : "Family Friendly"
                    : fac === "wheelchair_accessible"
                    ? isRtl ? "مهيأ لذوي الإعاقة" : "Accessible"
                    : fac === "cafes"
                    ? isRtl ? "مقاهي واستراحات" : "Cafes"
                    : fac}
                </span>
              ))}
            </div>
          </div>

          {/* Nearby Services & Safety Guidance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-[#F5F2E9] border border-[#D6B77A]/30">
              <span className="text-xs font-bold text-[#173E35] block mb-1">
                {t.nearbyServices}
              </span>
              <p className="text-xs text-neutral-700">
                {isRtl ? destination.nearbyServicesAr : destination.nearbyServicesEn}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FAF8F3] border border-amber-200">
              <span className="text-xs font-bold text-amber-900 block mb-1">
                {t.safetyTips}
              </span>
              <p className="text-xs text-neutral-700">
                {isRtl ? destination.safetyGuidelinesAr : destination.safetyGuidelinesEn}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-neutral-500">
            {t.approximatePrice}
          </span>
          <div className="flex items-center gap-3">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 text-xs font-semibold hover:bg-white transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>{isRtl ? "الاتجاهات (Google Maps)" : "Directions"}</span>
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-[#173E35] text-[#D6B77A] text-xs font-semibold hover:bg-[#245848] transition-colors"
            >
              {t.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
