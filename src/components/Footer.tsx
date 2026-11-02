import React from "react";
import { TranslationDictionary } from "../data/translations";
import {
  Compass,
  PhoneCall,
  ShieldCheck,
  Heart,
  Share2,
  ExternalLink,
} from "lucide-react";

interface FooterProps {
  t: TranslationDictionary;
  isRtl: boolean;
  onNavigate: (sectionId: string) => void;
  onOpenSuggestion: () => void;
  onOpenAiGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  t,
  isRtl,
  onNavigate,
  onOpenSuggestion,
  onOpenAiGuide,
}) => {
  return (
    <footer className="bg-[#173E35] text-white border-t border-[#245848] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 text-start">
          {/* Brand & Vision */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-[#245848] border border-[#D6B77A]/40 flex items-center justify-center text-[#D6B77A]">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ROOH OMAN <span className="text-[#D6B77A] font-light">|</span> روح عُمان
              </span>
            </div>
            <p className="text-xs text-[#F5F2E9]/80 leading-relaxed">
              {t.tagline}
            </p>
            <p className="text-[11px] text-white/60 leading-relaxed">
              {isRtl
                ? "منصة سياحية وثقافية مستقلة تحتفي بجمال وتاريخ وطبيعة وكرم أهل سلطنة عُمان."
                : "An authentic cultural and tourism showcase celebrating the heritage, hospitality, and natural wonders of the Sultanate of Oman."}
            </p>
          </div>

          {/* Navigation Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D6B77A] mb-4">
              {isRtl ? "أقسام المنصة" : "Explore Rooh Oman"}
            </h4>
            <ul className="space-y-2 text-xs text-white/80">
              <li>
                <button onClick={() => onNavigate("destinations")} className="hover:text-white transition-colors">
                  {t.navDestinations}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("governorates")} className="hover:text-white transition-colors">
                  {t.navGovernorates}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("map")} className="hover:text-white transition-colors">
                  {isRtl ? "خارطة عُمان التفاعلية" : "Interactive Map"}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("accommodations")} className="hover:text-white transition-colors">
                  {t.navAccommodations}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("services")} className="hover:text-white transition-colors">
                  {t.navServices}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("culture")} className="hover:text-white transition-colors">
                  {t.navCulture}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("planner")} className="hover:text-white transition-colors">
                  {t.navPlanner}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("weather")} className="hover:text-white transition-colors">
                  {t.navWeather}
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Assistance Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D6B77A] mb-4">
              {t.emergencyTitle}
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-[#245848]/60 border border-white/10">
                <span className="text-[11px] text-[#D6B77A] font-semibold block mb-0.5">
                  {isRtl ? "الطوارئ العامة والإسعاف" : "Police & Medical Emergency"}
                </span>
                <a href="tel:9999" className="text-base font-bold text-white font-mono hover:text-[#D6B77A] transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-4 h-4 text-[#D6B77A]" />
                  <span>9999</span>
                </a>
                <span className="text-[10px] text-white/60 block mt-0.5">{t.policeEmergency}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#245848]/60 border border-white/10">
                <span className="text-[11px] text-[#D6B77A] font-semibold block mb-0.5">
                  {isRtl ? "مركز الاتصال السياحي العُماني" : "Oman Tourism Hotline"}
                </span>
                <a href="tel:80077799" className="text-sm font-bold text-white font-mono hover:text-[#D6B77A] transition-colors flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-[#D6B77A]" />
                  <span>80077799</span>
                </a>
                <span className="text-[10px] text-white/60 block mt-0.5">{t.tourismHotline}</span>
              </div>
            </div>
          </div>

          {/* Community & Interactive Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D6B77A] mb-4">
              {isRtl ? "خدمات تفاعلية" : "Interactive Services"}
            </h4>
            <div className="space-y-2.5">
              <button
                onClick={onOpenAiGuide}
                className="w-full text-start p-3 rounded-xl bg-[#245848] hover:bg-[#1f4b3d] text-white text-xs font-medium border border-[#D6B77A]/30 transition-colors flex items-center justify-between"
              >
                <span>{t.navAiGuide} (Gemini AI)</span>
                <span className="text-[#D6B77A]">→</span>
              </button>

              <button
                onClick={onOpenSuggestion}
                className="w-full text-start p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-medium border border-white/10 transition-colors flex items-center justify-between"
              >
                <span>{t.submitSuggestion}</span>
                <Share2 className="w-3.5 h-3.5 text-[#D6B77A]" />
              </button>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 border-t border-[#245848] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>{t.footerRights}</div>
          <div className="flex items-center gap-1">
            <span>{isRtl ? "صُنع بحب لأرض الأصالة والجمال" : "Crafted with reverence for the Sultanate of Oman"}</span>
            <Heart className="w-3 h-3 text-[#D6B77A] fill-[#D6B77A] inline ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
};
