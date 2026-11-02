import React, { useState } from "react";
import { SupportedLanguage, TranslationDictionary } from "../data/translations";
import { CurrencyCode, currencies } from "../data/currencies";
import {
  Globe,
  Coins,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
  Compass,
} from "lucide-react";

interface NavbarProps {
  currentLang: SupportedLanguage;
  onLanguageChange: (lang: SupportedLanguage) => void;
  currentCurrency: CurrencyCode;
  onCurrencyChange: (curr: CurrencyCode) => void;
  t: TranslationDictionary;
  onOpenAiGuide: () => void;
  onOpenAdmin: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const languageOptions: { code: SupportedLanguage; label: string; nativeName: string }[] = [
  { code: "ar", label: "العربية", nativeName: "العربية (Oman)" },
  { code: "en", label: "English", nativeName: "English" },
  { code: "zh", label: "中文", nativeName: "简体中文" },
  { code: "hi", label: "हिन्दी", nativeName: "हिन्दी" },
  { code: "de", label: "Deutsch", nativeName: "Deutsch" },
  { code: "fr", label: "Français", nativeName: "Français" },
  { code: "ru", label: "Русский", nativeName: "Русский" },
  { code: "ur", label: "اردو", nativeName: "اردو" },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentCurrency,
  onCurrencyChange,
  t,
  onOpenAiGuide,
  onOpenAdmin,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const isRtl = currentLang === "ar" || currentLang === "ur";

  const navLinks = [
    { id: "destinations", label: t.navDestinations },
    { id: "governorates", label: t.navGovernorates },
    { id: "accommodations", label: t.navAccommodations },
    { id: "services", label: t.navServices },
    { id: "culture", label: t.navCulture },
    { id: "planner", label: t.navPlanner },
    { id: "weather", label: t.navWeather },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#173E35] text-white shadow-md border-b border-[#245848]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark (Single text element) */}
          <button
            onClick={() => onNavigate("hero")}
            className="flex items-center gap-2 text-start focus:outline-none group shrink-0"
          >
            <div className="w-10 h-10 rounded-lg bg-[#245848] border border-[#D6B77A]/40 flex items-center justify-center text-[#D6B77A] group-hover:border-[#D6B77A] transition-colors">
              <Compass className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap">
                ROOH OMAN <span className="text-[#D6B77A] font-light">|</span> روح عُمان
              </span>
            </div>
          </button>

          {/* Zone 2: Concise Nav Links (Single line, text with hover underlines) */}
          <nav className="hidden xl:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 relative ${
                  activeSection === link.id
                    ? "text-[#D6B77A] font-semibold"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D6B77A] rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Action + Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setCurrencyDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#245848]/80 hover:bg-[#245848] text-xs font-medium text-white transition-colors border border-white/10"
                aria-label="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#D6B77A]" />
                <span className="whitespace-nowrap uppercase tracking-wider">{currentLang}</span>
              </button>

              {langDropdownOpen && (
                <div
                  className={`absolute mt-2 w-44 rounded-lg bg-white text-[#202A25] shadow-xl border border-neutral-200 py-1.5 z-50 text-xs ${
                    isRtl ? "left-0" : "right-0"
                  }`}
                >
                  {languageOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        onLanguageChange(opt.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 flex items-center justify-between hover:bg-[#FAF8F3] ${
                        currentLang === opt.code
                          ? "bg-[#173E35]/10 text-[#173E35] font-semibold"
                          : "text-neutral-700"
                      }`}
                    >
                      <span>{opt.label}</span>
                      <span className="text-[10px] text-neutral-400">{opt.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setCurrencyDropdownOpen(!currencyDropdownOpen);
                  setLangDropdownOpen(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#245848]/80 hover:bg-[#245848] text-xs font-medium text-white transition-colors border border-white/10"
                aria-label="Change Currency"
              >
                <Coins className="w-3.5 h-3.5 text-[#D6B77A]" />
                <span className="whitespace-nowrap font-mono">{currentCurrency}</span>
              </button>

              {currencyDropdownOpen && (
                <div
                  className={`absolute mt-2 w-48 rounded-lg bg-white text-[#202A25] shadow-xl border border-neutral-200 py-1.5 z-50 text-xs max-h-64 overflow-y-auto ${
                    isRtl ? "left-0" : "right-0"
                  }`}
                >
                  {Object.values(currencies).map((curr) => (
                    <button
                      key={curr.code}
                      onClick={() => {
                        onCurrencyChange(curr.code);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-start px-3 py-2 flex items-center justify-between hover:bg-[#FAF8F3] ${
                        currentCurrency === curr.code
                          ? "bg-[#173E35]/10 text-[#173E35] font-semibold"
                          : "text-neutral-700"
                      }`}
                    >
                      <span className="font-mono font-medium">{curr.code} ({curr.symbol})</span>
                      <span className="text-[11px] text-neutral-500">
                        {isRtl ? curr.nameAr : curr.nameEn}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* AI Concierge Trigger Button */}
            <button
              onClick={onOpenAiGuide}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-[#173E35] bg-[#D6B77A] hover:bg-[#c9a764] rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-4 h-4 text-[#173E35]" />
              <span className="hidden sm:inline font-semibold">{t.navAiGuide}</span>
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={onOpenAdmin}
              title={t.navAdmin}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-[#245848] transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-[#245848] transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden py-4 border-t border-[#245848] space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-start px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? "bg-[#245848] text-[#D6B77A]"
                    : "text-white/90 hover:bg-[#245848]/60"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
