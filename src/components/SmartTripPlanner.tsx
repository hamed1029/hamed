import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { governorates } from "../data/governorates";
import {
  Calendar,
  Compass,
  MapPin,
  Clock,
  Sparkles,
  Printer,
  Copy,
  Check,
  Car,
  Utensils,
  Bed,
} from "lucide-react";

interface SmartTripPlannerProps {
  t: TranslationDictionary;
  isRtl: boolean;
  onSelectDestination: (destId: string) => void;
}

interface ItineraryDay {
  day: number;
  titleAr: string;
  titleEn: string;
  locationAr: string;
  locationEn: string;
  morningAr: string;
  morningEn: string;
  afternoonAr: string;
  afternoonEn: string;
  eveningAr: string;
  eveningEn: string;
  travelDistance: string;
  diningTipAr: string;
  diningTipEn: string;
  staySuggestionAr: string;
  staySuggestionEn: string;
}

export const SmartTripPlanner: React.FC<SmartTripPlannerProps> = ({
  t,
  isRtl,
  onSelectDestination,
}) => {
  const [daysCount, setDaysCount] = useState<number>(5);
  const [budgetTier, setBudgetTier] = useState<"economic" | "moderate" | "luxury">("moderate");
  const [travelParty, setTravelParty] = useState<"family" | "couple" | "solo" | "adventure">("family");
  const [primaryInterest, setPrimaryInterest] = useState<"nature" | "heritage" | "adventure" | "balanced">("balanced");
  const [selectedGovs, setSelectedGovs] = useState<string[]>(["muscat", "al_dakhiliyah", "south_sharqiyah"]);
  const [itinerary, setItinerary] = useState<ItineraryDay[] | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleGov = (id: string) => {
    if (selectedGovs.includes(id)) {
      if (selectedGovs.length > 1) {
        setSelectedGovs(selectedGovs.filter((g) => g !== id));
      }
    } else {
      setSelectedGovs([...selectedGovs, id]);
    }
  };

  const handleGeneratePlan = () => {
    const plan: ItineraryDay[] = [];

    for (let i = 1; i <= daysCount; i++) {
      if (i === 1) {
        plan.push({
          day: 1,
          titleAr: "استكشاف مسقط العامرة: عراقة الأسواق والتراث البحري",
          titleEn: "Muscat Discovery: Grand Mosques & Coastal Corniche",
          locationAr: "محافظة مسقط",
          locationEn: "Muscat Governorate",
          morningAr: "زيارة جامع السلطان قابوس الأكبر والتجول في صالته المعمارية وثريا الكريستال الضخمة (الدخول للزوار 8-11 ص).",
          morningEn: "Tour Sultan Qaboos Grand Mosque, marveling at handwoven carpet and crystal chandelier (visitor hours 8-11 AM).",
          afternoonAr: "التجول في سوق مطرح التراثي واستنشاق عبق اللبان وتجربة القهوة العُمانية في مقهى الكورنيش.",
          afternoonEn: "Explore Mutrah Souq, browsing frankincense and silver Khanjars, then stroll the seaside Corniche.",
          eveningAr: "عشاء بحري عُماني أصيل في مطعم بيت اللبان مع إطلالة مسائية ساحرة على ميناء السلطان قابوس.",
          eveningEn: "Authentic Omani dinner at Bait Al Luban overlooking the illuminated historic harbor.",
          travelDistance: "35 كم داخل العاصمة",
          diningTipAr: "وجبة شواء عُماني تقليدي مع خبز الرقاق والعسل",
          diningTipEn: "Traditional slow-cooked Shuwa lamb with local honey",
          staySuggestionAr: "فندق شاطئي في القرم أو الغبرة",
          staySuggestionEn: "Boutique seaside hotel in Al Qurum",
        });
      } else if (i === 2) {
        plan.push({
          day: 2,
          titleAr: "قلب التاريخ العُماني: قلعة نزوى وسوق الفضة وحارة العقر",
          titleEn: "Historic Heartland: Nizwa Fort & Old Alleyways",
          locationAr: "محافظة الداخلية (نزوى)",
          locationEn: "Al Dakhiliyah (Nizwa)",
          morningAr: "الانطلاق صباحاً عبر طريق مسقط-نزوى السريع وزيارة قلعة نزوى الشهيرة ببرجها الدائري الهائل.",
          morningEn: "Drive scenic Muscat-Nizwa highway to explore the massive circular cannon tower of Nizwa Fort.",
          afternoonAr: "جولة في سوق نزوى القديم لشراء الحلوى العُمانية الساخنة وتفقد أزقة حارة العقر الطينية المرممة.",
          afternoonEn: "Sample freshly stirred Omani Halwa in Nizwa Souq and stroll the mudbrick alleys of Harat Al Aqr.",
          eveningAr: "زيارة قلعة بهلاء المدرجة في قائمة اليونسكو للتراث العالمي وتناول العشاء في مطعم شعبي.",
          eveningEn: "Tour UNESCO-listed Bahla Fort and enjoy local evening barbecue skewers (Mishkak).",
          travelDistance: "165 كم (ساعة و45 دقيقة)",
          diningTipAr: "حلوى عُمانية بالهيل والزعفران والمكسرات مع القهوة",
          diningTipEn: "Fresh warm Omani Halwa paired with cardamom Kahwa",
          staySuggestionAr: "نزل تراثي طيني أصيل في حارة العقر",
          staySuggestionEn: "Restored clay heritage inn in Nizwa",
        });
      } else if (i === 3) {
        plan.push({
          day: 3,
          titleAr: "مرتفعات الجبال: مسفاة العبريين وشرفة وادي النخر في جبل شمس",
          titleEn: "Mountain Heights: Misfat Al Abriyeen & Jabal Shams",
          locationAr: "محافظة الداخلية (الحمراء / جبل شمس)",
          locationEn: "Al Dakhiliyah (Al Hamra & Jabal Shams)",
          morningAr: "زيارة قرية مسفاة العبريين التراثية المعلقة والمشي على طول قنوات الفلج المائية بين مزارع الموز والنخيل.",
          morningEn: "Walk through UN Tourism-awarded Misfat Al Abriyeen village along ancient falaj water channels.",
          afternoonAr: "الصعود بسيارة الدفع الرباعي إلى جبل شمس (أعلى قمة في عمان) والمشي على مسار ممشى الشرفة المطل على جراند كانيون عمان.",
          afternoonEn: "Ascend via 4WD to Jabal Shams summit for the iconic Balcony Walk overlooking the 1,000m abyss.",
          eveningAr: "مشاهدة غروب الشمس من قمة الجبل وجلسة سمر دافئة تحت سماء مرصعة بالنجوم في منتجع الجبل.",
          eveningEn: "Catch golden sunset from the cliff edge and enjoy crisp mountain stargazing.",
          travelDistance: "85 كم (طرق جبلية 4WD)",
          diningTipAr: "خبز محلي مع الجبن العُماني والشاي الكرك في مقهى المسفاة",
          diningTipEn: "Local bread with mountain honey and Karak tea",
          staySuggestionAr: "منتجع جبل شمس أو نزل مسفاة القديم",
          staySuggestionEn: "Jabal Shams Cliff Resort or Misfat Old House",
        });
      } else if (i === 4) {
        plan.push({
          day: 4,
          titleAr: "سحر الرمال الذهبية: بدية ومخيمات رمال الشرقية",
          titleEn: "Golden Dunes: Wahiba Sands Desert Safari",
          locationAr: "محافظة شمال الشرقية (بدية)",
          locationEn: "North Al Sharqiyah (Wahiba Sands)",
          morningAr: "النزول من الجبل وزيارة برك وادي بني خالد الفيروزية العذبة والاسترخاء في مياهها النقية.",
          morningEn: "Descend to swim in the crystal-clear emerald pools of Wadi Bani Khalid oasis.",
          afternoonAr: "دخول رمال وهيبة الذهبية وتجربة التزلج على الرمال وركوب الجمال مع عائلات البادية.",
          afternoonEn: "Enter the towering golden dunes of Wahiba Sands for sunset camel trekking and dune bashing.",
          eveningAr: "عشاء بدوي تقليدي مطهو على الحطب وجلسة موسيقية حول نار المخيم الفاخر.",
          eveningEn: "Traditional Bedouin campfire dinner and folklore music under the desert stars.",
          travelDistance: "190 كم",
          diningTipAr: "وجبة المكبوس باللحم والبهارات البدوية",
          diningTipEn: "Fragrant spiced Majboos rice with tender meat",
          staySuggestionAr: "مخيم صحراوي فاخر وسط الكثبان",
          staySuggestionEn: "Luxury desert glamping tent with AC",
        });
      } else if (i === 5) {
        plan.push({
          day: 5,
          titleAr: "روعة السواحل والوديان: وادي شاب ورأس الجنز وميناء صور",
          titleEn: "Coastal Wonders: Wadi Shab & Sur Dhow Shipyards",
          locationAr: "محافظة جنوب الشرقية (صور / طيوي)",
          locationEn: "South Al Sharqiyah (Sur & Tiwi)",
          morningAr: "مغامرة المشي والسباحة في وادي شاب الساحر والوصول إلى كهف الشلال المخفي.",
          morningEn: "Hike and swim the canyon pools of Wadi Shab up to the secluded waterfall cave.",
          afternoonAr: "التوقف عند منارة العيجة التاريخية وزيارة ورش صناعة السفن الخشبية التقليدية (الداو) في صور.",
          afternoonEn: "Visit Sur’s historic dhow shipyards where master craftsmen build ocean vessels by hand.",
          eveningAr: "زيارة محمية رأس الجنز لمشاهدة السلاحف الخضراء النادرة تضع بيوضها على الشاطئ تحت إشراف المرشدين.",
          eveningEn: "Guided evening tour at Ras Al Jinz Turtle Sanctuary to witness nesting green sea turtles.",
          travelDistance: "140 كم على الطريق الساحلي",
          diningTipAr: "سمك طازج مقلي ومشوي على الطريقة الصورية مع الأرز بالزعفران",
          diningTipEn: "Fresh Gulf catch of the day with Suri saffron rice",
          staySuggestionAr: "منتجع شاطئي في رأس الحد أو صور",
          staySuggestionEn: "Ras Al Hadd beachfront hotel",
        });
      } else {
        plan.push({
          day: i,
          titleAr: `يوم ${i}: استكشاف كنوز إضافية في المحافظات العُمانية`,
          titleEn: `Day ${i}: Further Discoveries & Coastal Escapes`,
          locationAr: "محافظة ظفار أو مسندم أو الباطنة",
          locationEn: "Dhofar, Musandam or Al Batinah",
          morningAr: "رحلة بحرية لمشاهدة الدلافين أو جولة في القلاع الساحلية العريقة والأسواق الشعبية.",
          morningEn: "Dolphin watching boat cruise or exploring coastal forts and traditional souqs.",
          afternoonAr: "زيارة العيون المائية الطبيعية ومزارع الفواكه العُمانية وتذوق التمور والمياه العذبة.",
          afternoonEn: "Visit fresh mineral springs and date palm plantations, tasting local produce.",
          eveningAr: "جلسة هادئة على شاطئ البحر والاستمتاع بالنسيم العليل والوجبات المحلية.",
          eveningEn: "Relaxing evening by the shoreline enjoying authentic hospitality.",
          travelDistance: "100-150 كم",
          diningTipAr: "مشاكيك لحم عُماني مشوي طازج مع صلصة التمر الهندي",
          diningTipEn: "Tender Mishkak skewers with spiced tamarind dip",
          staySuggestionAr: "منتجع هادئ مطل على الطبيعة",
          staySuggestionEn: "Scenic boutique resort",
        });
      }
    }

    setItinerary(plan);
  };

  const handleCopyPlan = () => {
    if (!itinerary) return;
    const text = itinerary
      .map(
        (day) =>
          `Day ${day.day}: ${isRtl ? day.titleAr : day.titleEn}\n` +
          `Location: ${isRtl ? day.locationAr : day.locationEn}\n` +
          `Morning: ${isRtl ? day.morningAr : day.morningEn}\n` +
          `Afternoon: ${isRtl ? day.afternoonAr : day.afternoonEn}\n` +
          `Evening: ${isRtl ? day.eveningAr : day.eveningEn}\n` +
          `Food: ${isRtl ? day.diningTipAr : day.diningTipEn}\n`
      )
      .join("\n---\n\n");

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="planner" className="py-20 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/25 px-3 py-1 rounded-full mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#173E35]" />
            <span>مخطط الرحلات الذكي · Smart Trip Planner</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173E35] mb-3">
            {t.tripPlannerTitle}
          </h2>
          <p className="text-sm text-neutral-600">
            {t.tripPlannerSubtitle}
          </p>
        </div>

        {/* Configuration Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-neutral-200 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-start">
            {/* Days Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-neutral-700">
                  {t.daysLabel}:
                </label>
                <span className="text-sm font-bold text-[#173E35] tabular-nums">
                  {daysCount} {isRtl ? "أيام" : "Days"}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full accent-[#173E35] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1">
                <span>1 {isRtl ? "يوم" : "Day"}</span>
                <span>5 {isRtl ? "أيام" : "Days"}</span>
                <span>10 {isRtl ? "أيام" : "Days"}</span>
              </div>
            </div>

            {/* Travel Party */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">
                {t.travelStyleLabel}:
              </label>
              <select
                value={travelParty}
                onChange={(e) => setTravelParty(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-neutral-300 text-xs text-[#173E35] font-semibold bg-neutral-50"
              >
                <option value="family">{isRtl ? "عائلة وأطفال (راحة وخدمات)" : "Family with Kids"}</option>
                <option value="couple">{isRtl ? "شخصان / زوجان (رومانسية وهدوء)" : "Couples / Leisure"}</option>
                <option value="solo">{isRtl ? "مسافر منفرد (استكشاف وثقافة)" : "Solo Traveler"}</option>
                <option value="adventure">{isRtl ? "مجموعة أصدقاء ومغامرات" : "Adventure Seekers"}</option>
              </select>
            </div>

            {/* Budget Level */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">
                {t.budgetLabel}:
              </label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-neutral-300 text-xs text-[#173E35] font-semibold bg-neutral-50"
              >
                <option value="economic">{isRtl ? "اقتصادي (نزل وشقق مريحة)" : "Budget / Value"}</option>
                <option value="moderate">{isRtl ? "متوسط / تراثي أصيل (موصى به)" : "Authentic Heritage (Recommended)"}</option>
                <option value="luxury">{isRtl ? "فاخر (منتجعات 5 نجوم ومخيمات خاصة)" : "Luxury 5-Star Resorts"}</option>
              </select>
            </div>

            {/* Primary Focus */}
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-2">
                {isRtl ? "التركيز السياحي:" : "Main Focus:"}
              </label>
              <select
                value={primaryInterest}
                onChange={(e) => setPrimaryInterest(e.target.value as any)}
                className="w-full h-10 px-3 rounded-xl border border-neutral-300 text-xs text-[#173E35] font-semibold bg-neutral-50"
              >
                <option value="balanced">{isRtl ? "برنامج شامل ومتوازن" : "Balanced Experience"}</option>
                <option value="nature">{isRtl ? "طبيعة وأودية وشواطئ" : "Nature, Wadis & Sea"}</option>
                <option value="heritage">{isRtl ? "تاريخ وقلاع وقرى قديمة" : "Heritage & Historic Forts"}</option>
                <option value="adventure">{isRtl ? "جبال ورمال ومغامرات مشي" : "Mountains & Desert Hikes"}</option>
              </select>
            </div>
          </div>

          {/* Governorates Checkboxes */}
          <div className="mb-6 pt-4 border-t border-neutral-100 text-start">
            <span className="text-xs font-bold text-neutral-700 block mb-2.5">
              {isRtl ? "المحافظات المشمولة بالمسار:" : "Included Governorates:"}
            </span>
            <div className="flex flex-wrap gap-2">
              {governorates.slice(0, 6).map((gov) => {
                const isChecked = selectedGovs.includes(gov.id);
                return (
                  <button
                    key={gov.id}
                    type="button"
                    onClick={() => toggleGov(gov.id)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-colors border ${
                      isChecked
                        ? "bg-[#173E35] text-white border-[#173E35] font-semibold"
                        : "bg-neutral-100 text-neutral-600 border-neutral-200 hover:bg-neutral-200"
                    }`}
                  >
                    {isRtl ? gov.nameAr : gov.nameEn}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGeneratePlan}
            className="w-full py-3.5 rounded-xl bg-[#173E35] text-[#D6B77A] font-bold text-sm hover:bg-[#245848] transition-colors flex items-center justify-center gap-2 shadow"
          >
            <Sparkles className="w-4 h-4" />
            <span>{t.calculateTrip}</span>
          </button>
        </div>

        {/* Generated Itinerary Display */}
        {itinerary && (
          <div className="space-y-6 text-start">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-[#173E35]">
                  {isRtl ? `خطة رحلتك المقترحة (${daysCount} أيام)` : `Suggested Itinerary (${daysCount} Days)`}
                </h3>
                <span className="text-xs text-neutral-500">
                  {isRtl ? "مسار مرتب جغرافياً لتقليل وقت القيادة والاستمتاع بأفضل الأوقات" : "Optimized driving route minimizing travel exhaustion"}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyPlan}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-white transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (isRtl ? "تم النسخ!" : "Copied!") : (isRtl ? "نسخ الخطة" : "Copy")}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-medium text-neutral-700 hover:bg-white transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isRtl ? "طباعة" : "Print"}</span>
                </button>
              </div>
            </div>

            {/* Day Cards */}
            <div className="space-y-4">
              {itinerary.map((item) => (
                <div
                  key={item.day}
                  className="bg-white rounded-2xl border border-neutral-200 p-5 sm:p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#173E35] text-[#D6B77A] font-bold text-sm flex items-center justify-center font-mono">
                        {item.day}
                      </div>
                      <div>
                        <h4 className="font-bold text-base text-[#173E35]">
                          {isRtl ? item.titleAr : item.titleEn}
                        </h4>
                        <span className="text-xs text-neutral-500 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#D6B77A]" />
                          {isRtl ? item.locationAr : item.locationEn}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 bg-neutral-100 px-3 py-1 rounded-md">
                      <Car className="w-3.5 h-3.5 text-[#173E35]" />
                      <span>{item.travelDistance}</span>
                    </div>
                  </div>

                  {/* Day Schedule (Morning, Afternoon, Evening) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#FAF8F3] border border-neutral-200">
                      <span className="font-bold text-[#173E35] block mb-1">
                        {isRtl ? "صباحاً (8:00 - 12:00)" : "Morning (8:00 - 12:00)"}
                      </span>
                      <p className="text-neutral-700 leading-relaxed">
                        {isRtl ? item.morningAr : item.morningEn}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F3] border border-neutral-200">
                      <span className="font-bold text-[#173E35] block mb-1">
                        {isRtl ? "ظهراً وعصراً (12:30 - 17:00)" : "Afternoon (12:30 - 17:00)"}
                      </span>
                      <p className="text-neutral-700 leading-relaxed">
                        {isRtl ? item.afternoonAr : item.afternoonEn}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FAF8F3] border border-neutral-200">
                      <span className="font-bold text-[#173E35] block mb-1">
                        {isRtl ? "مساءً وليلاً (18:00 - 22:00)" : "Evening (18:00 - 22:00)"}
                      </span>
                      <p className="text-neutral-700 leading-relaxed">
                        {isRtl ? item.eveningAr : item.eveningEn}
                      </p>
                    </div>
                  </div>

                  {/* Dining & Lodging Tips */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-neutral-100 text-xs">
                    <div className="flex items-center gap-1.5 text-neutral-700">
                      <Utensils className="w-3.5 h-3.5 text-amber-600" />
                      <span><strong>{isRtl ? "طعام مقترح:" : "Food tip:"}</strong> {isRtl ? item.diningTipAr : item.diningTipEn}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-700">
                      <Bed className="w-3.5 h-3.5 text-[#173E35]" />
                      <span><strong>{isRtl ? "الإقامة:" : "Stay:"}</strong> {isRtl ? item.staySuggestionAr : item.staySuggestionEn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
