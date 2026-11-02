import React, { useState, useEffect } from "react";
import { SupportedLanguage, translations } from "./data/translations";
import { CurrencyCode } from "./data/currencies";
import { destinations, Destination } from "./data/destinations";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { DestinationExplorer } from "./components/DestinationExplorer";
import { DestinationModal } from "./components/DestinationModal";
import { GovernoratesDirectory } from "./components/GovernoratesDirectory";
import { InteractiveMap } from "./components/InteractiveMap";
import { AccommodationSection } from "./components/AccommodationSection";
import { ServicesDirectory } from "./components/ServicesDirectory";
import { CultureSection } from "./components/CultureSection";
import { SmartTripPlanner } from "./components/SmartTripPlanner";
import { WeatherSection } from "./components/WeatherSection";
import { AiGuideModal } from "./components/AiGuideModal";
import { CommunitySuggestionModal } from "./components/CommunitySuggestionModal";
import { AdminDashboardModal } from "./components/AdminDashboardModal";
import { Footer } from "./components/Footer";

export default function App() {
  const [currentLang, setCurrentLang] = useState<SupportedLanguage>("ar");
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>("OMR");
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Filter & Search states
  const [selectedGovFilter, setSelectedGovFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals state
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [isAiGuideOpen, setIsAiGuideOpen] = useState(false);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const t = translations[currentLang] || translations.ar;
  const isRtl = currentLang === "ar" || currentLang === "ur";

  // Synchronize document direction and lang
  useEffect(() => {
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.lang = currentLang;
  }, [currentLang, isRtl]);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const selectedDestination = selectedDestinationId
    ? destinations.find((d) => d.id === selectedDestinationId) || null
    : null;

  return (
    <div className={`min-h-screen bg-[#FAF8F3] text-[#202A25] font-['Cairo',_'Plus_Jakarta_Sans',_sans-serif]`}>
      {/* Top Bar Navigation */}
      <Navbar
        currentLang={currentLang}
        onLanguageChange={setCurrentLang}
        currentCurrency={currentCurrency}
        onCurrencyChange={setCurrentCurrency}
        t={t}
        onOpenAiGuide={() => setIsAiGuideOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          t={t}
          isRtl={isRtl}
          onNavigate={handleNavigate}
          onSelectDestination={(id) => setSelectedDestinationId(id)}
          onSearchQuery={(q) => setSearchQuery(q)}
        />

        {/* Tourist Destinations Explorer */}
        <DestinationExplorer
          t={t}
          isRtl={isRtl}
          currentCurrency={currentCurrency}
          selectedGovFilter={selectedGovFilter}
          onSetGovFilter={setSelectedGovFilter}
          onSelectDestination={(id) => setSelectedDestinationId(id)}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {/* Governorates Directory (All 11 Governorates) */}
        <GovernoratesDirectory
          t={t}
          isRtl={isRtl}
          onSelectGovernorateFilter={(govId) => setSelectedGovFilter(govId)}
          onNavigate={handleNavigate}
        />

        {/* Interactive Map of Oman */}
        <InteractiveMap
          t={t}
          isRtl={isRtl}
          onSelectDestination={(id) => setSelectedDestinationId(id)}
        />

        {/* Accommodations & Stays (Hotels, Desert Camps, Heritage Lodges) */}
        <AccommodationSection
          t={t}
          isRtl={isRtl}
          currentCurrency={currentCurrency}
        />

        {/* Services Directory (Hospitals, Fuel, Toilets, Mosques, Cafes) */}
        <ServicesDirectory
          t={t}
          isRtl={isRtl}
        />

        {/* Soul of Omani Heritage & Culture */}
        <CultureSection
          t={t}
          isRtl={isRtl}
        />

        {/* Smart Trip Planner */}
        <SmartTripPlanner
          t={t}
          isRtl={isRtl}
          onSelectDestination={(id) => setSelectedDestinationId(id)}
        />

        {/* Weather & Climate in All 11 Governorates */}
        <WeatherSection
          t={t}
          isRtl={isRtl}
        />
      </main>

      {/* Footer */}
      <Footer
        t={t}
        isRtl={isRtl}
        onNavigate={handleNavigate}
        onOpenSuggestion={() => setIsSuggestionOpen(true)}
        onOpenAiGuide={() => setIsAiGuideOpen(true)}
      />

      {/* Destination Detail Modal */}
      <DestinationModal
        destination={selectedDestination}
        onClose={() => setSelectedDestinationId(null)}
        currentCurrency={currentCurrency}
        t={t}
        isRtl={isRtl}
      />

      {/* AI Tourism Assistant Modal ("رفيق روح عُمان") */}
      <AiGuideModal
        isOpen={isAiGuideOpen}
        onClose={() => setIsAiGuideOpen(false)}
        currentLang={currentLang}
        t={t}
        isRtl={isRtl}
      />

      {/* User Suggestion & Community Contribution Modal */}
      <CommunitySuggestionModal
        isOpen={isSuggestionOpen}
        onClose={() => setIsSuggestionOpen(false)}
        t={t}
        isRtl={isRtl}
      />

      {/* Admin Moderation Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        t={t}
        isRtl={isRtl}
      />
    </div>
  );
}
