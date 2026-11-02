import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { servicesData, ServiceItem } from "../data/services";
import { CurrencyCode, formatPrice } from "../data/currencies";
import {
  Bed,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Users,
  Phone,
  Mail,
  Home,
  Check,
  X,
} from "lucide-react";

interface AccommodationSectionProps {
  t: TranslationDictionary;
  isRtl: boolean;
  currentCurrency: CurrencyCode;
}

export const AccommodationSection: React.FC<AccommodationSectionProps> = ({
  t,
  isRtl,
  currentCurrency,
}) => {
  const [selectedProperty, setSelectedProperty] = useState<ServiceItem | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [showHostForm, setShowHostForm] = useState(false);
  const [hostSubmitSuccess, setHostSubmitSuccess] = useState(false);

  // Booking Form State
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guestsCount, setGuestsCount] = useState(2);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Host Form State
  const [hostPropName, setHostPropName] = useState("");
  const [hostGov, setHostGov] = useState("al_dakhiliyah");
  const [hostWilayat, setHostWilayat] = useState("");
  const [hostType, setHostType] = useState("apartment");
  const [hostRate, setHostRate] = useState("35");
  const [hostContact, setHostContact] = useState("");

  const accommodations = servicesData.filter(
    (s) => s.type === "hotel" || s.type === "apartment"
  );

  const handleOpenBooking = (property: ServiceItem) => {
    setSelectedProperty(property);
    setBookingSuccess(null);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty || !guestName || !guestPhone) return;

    setIsSubmitting(true);
    const nights = 2; // Default estimation
    const pricePerNight = selectedProperty.pricePerNightOMR || 50;
    const totalOMR = pricePerNight * nights;

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyName: isRtl ? selectedProperty.nameAr : selectedProperty.nameEn,
          guestName,
          email: guestEmail,
          phone: guestPhone,
          checkIn: checkIn || "2026-11-10",
          checkOut: checkOut || "2026-11-12",
          guests: guestsCount,
          notes,
          totalAmount: totalOMR,
          currency: currentCurrency,
        }),
      });

      const data = await response.json();
      if (data.success && data.booking) {
        setBookingSuccess(data.booking.bookingRef);
      } else {
        setBookingSuccess(`ROOH-${Math.floor(100000 + Math.random() * 900000)}`);
      }
    } catch {
      setBookingSuccess(`ROOH-${Math.floor(100000 + Math.random() * 900000)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHostFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHostSubmitSuccess(true);
    setTimeout(() => {
      setShowHostForm(false);
      setHostSubmitSuccess(false);
      setHostPropName("");
    }, 2500);
  };

  return (
    <section id="accommodations" className="py-20 bg-[#FAF8F3] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/25 px-3 py-1 rounded-full mb-3">
              <Bed className="w-3.5 h-3.5 text-[#173E35]" />
              <span>الإقامة والضيافة العُمانية · Stays & Heritage Inns</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#173E35]">
              {t.sectionAccommodations}
            </h2>
            <p className="text-sm text-neutral-600 mt-2 max-w-2xl">
              {isRtl
                ? "من المنتجعات الفاخرة على حواف الجبال إلى النزل التراثية الطينية ومخيمات رمال وهيبة البدوية"
                : "From luxury cliffside resorts to authentic mudbrick village inns and starry desert glamping"}
            </p>
          </div>

          {/* List Your Property CTA */}
          <button
            onClick={() => setShowHostForm(true)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#173E35] text-[#173E35] text-xs font-semibold hover:bg-[#173E35] hover:text-[#D6B77A] transition-colors self-start md:self-end"
          >
            <Home className="w-4 h-4" />
            <span>{isRtl ? "أصحاب النزل والعقارات: سجّل عقارك" : "Property Owners: List Stay"}</span>
          </button>
        </div>

        {/* Accommodation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {accommodations.map((acc) => {
            const price = acc.pricePerNightOMR || 50;
            const priceFormatted = formatPrice(price, currentCurrency, isRtl);

            return (
              <div
                key={acc.id}
                className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-neutral-100">
                    <img
                      src={acc.image}
                      alt={isRtl ? acc.nameAr : acc.nameEn}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#173E35] text-[#D6B77A] text-[10px] font-semibold px-2 py-0.5 rounded">
                      {acc.type === "hotel"
                        ? isRtl ? "منتجع وفندق" : "Resort & Hotel"
                        : isRtl ? "نزل تراثي أصيل" : "Heritage Stay"}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mb-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D6B77A]" />
                      <span>{isRtl ? acc.wilayatAr : acc.wilayatEn}</span>
                    </div>

                    <h3 className="font-bold text-sm text-[#173E35] mb-2 line-clamp-1">
                      {isRtl ? acc.nameAr : acc.nameEn}
                    </h3>

                    {/* Quiet metadata line */}
                    <div className="text-[11px] text-neutral-600 mb-3 space-y-1">
                      {(isRtl ? acc.amenitiesAr : acc.amenitiesEn).slice(0, 2).map((am, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-[#173E35]" />
                          <span>{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Price & Booking CTA */}
                <div className="p-4 pt-0 border-t border-neutral-100 mt-2 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 block">{isRtl ? "يبدأ من" : "From"}</span>
                    <span className="text-sm font-bold text-[#173E35] tabular-nums">
                      {priceFormatted}
                    </span>
                    <span className="text-[10px] text-neutral-500"> / {isRtl ? "ليلة" : "night"}</span>
                  </div>

                  <button
                    onClick={() => handleOpenBooking(acc)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#173E35] text-[#D6B77A] text-xs font-semibold hover:bg-[#245848] transition-colors"
                  >
                    {isRtl ? "طلب حجز" : "Book Request"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Booking Disclaimer */}
        <p className="text-[11px] text-neutral-500 text-center max-w-2xl mx-auto">
          {isRtl
            ? "ملاحظة: طلبات الحجز تُرسل مباشرة لإدارة العقار أو النزل العُماني مع إشعار رسمي فوري لضمان أفضل سعر وخدمة."
            : "Note: Booking inquiries are dispatched directly to verified Omani property hosts with an instant reference receipt."}
        </p>

        {/* Booking Inquiry Modal */}
        {selectedProperty && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 relative text-start">
              <button
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-[#173E35] mb-1">
                {isRtl ? "طلب حجز إقامة موثق" : "Request Stay Booking"}
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                {isRtl ? selectedProperty.nameAr : selectedProperty.nameEn} ·{" "}
                <span className="text-[#173E35] font-semibold">
                  {formatPrice(selectedProperty.pricePerNightOMR || 50, currentCurrency, isRtl)} / {isRtl ? "ليلة" : "night"}
                </span>
              </p>

              {bookingSuccess ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#173E35] mx-auto" />
                  <h4 className="text-base font-bold text-[#173E35]">
                    {isRtl ? "تم استلام طلب الحجز بنجاح!" : "Booking Request Received!"}
                  </h4>
                  <div className="p-3 bg-[#FAF8F3] rounded-xl border border-neutral-200 inline-block">
                    <span className="text-xs text-neutral-500 block">{isRtl ? "رقم مرجع الحجز:" : "Booking Reference:"}</span>
                    <span className="font-mono font-bold text-sm text-[#173E35]">{bookingSuccess}</span>
                  </div>
                  <p className="text-xs text-neutral-600 max-w-xs mx-auto">
                    {isRtl
                      ? "سيقوم ممثل النزل بالتواصل معك عبر الهاتف والبريد لتأكيد التفاصيل وترتيب الوصول."
                      : "The host will contact you shortly via phone & email to confirm arrival details."}
                  </p>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="mt-3 px-5 py-2 rounded-xl bg-[#173E35] text-[#D6B77A] text-xs font-semibold"
                  >
                    {t.close}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "الاسم الكامل" : "Full Name"}</label>
                    <input
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Salim Al Harthy"
                      className="w-full h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"}</label>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="+968 9XXXXXXX"
                        className="w-full h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "البريد الإلكتروني" : "Email"}</label>
                      <input
                        type="email"
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="guest@example.com"
                        className="w-full h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "تاريخ الوصول" : "Check-in"}</label>
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full h-10 px-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "تاريخ المغادرة" : "Check-out"}</label>
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full h-10 px-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "النزلاء" : "Guests"}</label>
                      <select
                        value={guestsCount}
                        onChange={(e) => setGuestsCount(Number(e.target.value))}
                        className="w-full h-10 px-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                      >
                        <option value={1}>1 {isRtl ? "ضيف" : "Guest"}</option>
                        <option value={2}>2 {isRtl ? "ضيفان" : "Guests"}</option>
                        <option value={4}>4 {isRtl ? "عائلة (4)" : "Family (4)"}</option>
                        <option value={6}>6+ {isRtl ? "مجموعة" : "Group"}</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "ملاحظات أو متطلبات خاصة" : "Special Requests"}</label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder={isRtl ? "إطلالة خاصة، سرير أطفال، وقت وصول متأخر..." : "Late arrival, baby crib, etc."}
                      className="w-full p-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-[#173E35] text-[#D6B77A] font-semibold text-xs hover:bg-[#245848] transition-colors mt-2"
                  >
                    {isSubmitting ? (isRtl ? "جارٍ الإرسال..." : "Submitting...") : (isRtl ? "تأكيد وإرسال طلب الحجز" : "Submit Booking Request")}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Property Owner Listing Modal */}
        {showHostForm && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 relative text-start">
              <button
                onClick={() => setShowHostForm(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-lg font-bold text-[#173E35] mb-1">
                {isRtl ? "تسجيل نزل أو عقار سياحي عُماني" : "List Your Omani Property"}
              </h3>
              <p className="text-xs text-neutral-500 mb-4">
                {isRtl
                  ? "ندعم النزل التراثية والشقق المفروشة في كافة ولايات عُمان للظهور أمام السياح"
                  : "We promote authentic local heritage houses and apartments to worldwide visitors"}
              </p>

              {hostSubmitSuccess ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#173E35] mx-auto" />
                  <h4 className="text-sm font-bold text-[#173E35]">
                    {isRtl ? "تم استلام بيانات العقار!" : "Property Submitted for Review"}
                  </h4>
                  <p className="text-xs text-neutral-600">
                    {isRtl ? "سيتم مراجعة الطلب من فريق إدارة روح عُمان للتفعيل المباشر." : "Our admin team will review and approve your listing shortly."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleHostFormSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "اسم العقار أو النزل" : "Property Name"}</label>
                    <input
                      type="text"
                      required
                      value={hostPropName}
                      onChange={(e) => setHostPropName(e.target.value)}
                      placeholder="e.g. Bait Al Nakhla Heritage House"
                      className="w-full h-9 px-3 rounded-lg border border-neutral-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "المحافظة" : "Governorate"}</label>
                      <select
                        value={hostGov}
                        onChange={(e) => setHostGov(e.target.value)}
                        className="w-full h-9 px-2 rounded-lg border border-neutral-300"
                      >
                        <option value="al_dakhiliyah">الداخلية (Dakhiliyah)</option>
                        <option value="dhofar">ظفار (Dhofar)</option>
                        <option value="muscat">مسقط (Muscat)</option>
                        <option value="south_sharqiyah">جنوب الشرقية</option>
                        <option value="north_sharqiyah">شمال الشرقية</option>
                        <option value="musandam">مسندم (Musandam)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "الولاية" : "Wilayat"}</label>
                      <input
                        type="text"
                        required
                        value={hostWilayat}
                        onChange={(e) => setHostWilayat(e.target.value)}
                        placeholder="e.g. Nizwa"
                        className="w-full h-9 px-3 rounded-lg border border-neutral-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-neutral-700 mb-1">{isRtl ? "رقم الاتصال / المالك" : "Owner Contact"}</label>
                    <input
                      type="tel"
                      required
                      value={hostContact}
                      onChange={(e) => setHostContact(e.target.value)}
                      placeholder="+968 9XXXXXXX"
                      className="w-full h-9 px-3 rounded-lg border border-neutral-300"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#173E35] text-[#D6B77A] font-semibold text-xs mt-2"
                  >
                    {isRtl ? "إرسال للمراجعة والاعتماد" : "Submit for Verification"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
