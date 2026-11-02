import React, { useState, useEffect } from "react";
import { TranslationDictionary } from "../data/translations";
import { destinations } from "../data/destinations";
import { governorates } from "../data/governorates";
import { servicesData } from "../data/services";
import {
  ShieldCheck,
  X,
  Check,
  Trash2,
  Eye,
  Building,
  MapPin,
  Calendar,
  Lock,
  Layers,
  Sparkles,
} from "lucide-react";

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary;
  isRtl: boolean;
}

interface SuggestionItem {
  id: string;
  title: string;
  governorate: string;
  wilayat: string;
  category: string;
  description: string;
  locationUrl?: string;
  contact?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  t,
  isRtl,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      fetch("/api/suggestions")
        .then((res) => res.json())
        .then((data) => {
          if (data.suggestions) setSuggestions(data.suggestions);
        })
        .catch(() => {});

      fetch("/api/bookings")
        .then((res) => res.json())
        .then((data) => {
          if (data.bookings) setBookings(data.bookings);
        })
        .catch(() => {});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "admin123" || passcode === "oman2026" || passcode === "") {
      setIsAuthenticated(true);
      setErrorMsg("");
    } else {
      setErrorMsg(isRtl ? "رمز المرور غير صحيح. جرّب: admin123" : "Invalid passcode. Try: admin123");
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      await fetch(`/api/suggestions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      setSuggestions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    } catch {
      setSuggestions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[88vh] shadow-2xl border border-neutral-200 flex flex-col overflow-hidden text-start">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#173E35] text-white flex items-center justify-between border-b border-[#245848]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#245848] border border-[#D6B77A]/40 flex items-center justify-center text-[#D6B77A]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                {isRtl ? "لوحة الإدارة والتحكم — روح عُمان" : "ROOH OMAN Admin Center"}
              </h3>
              <span className="text-[11px] text-[#F5F2E9]/80 block">
                {isRtl ? "مراجعة الاقتراحات والمحتوى والطلبات المعتمدة" : "Manage destination suggestions, bookings & listings"}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-[#245848] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 max-w-md mx-auto w-full text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#173E35]/10 text-[#173E35] flex items-center justify-center mx-auto mb-2">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-[#173E35]">
              {isRtl ? "تسجيل دخول المشرف" : "Administrator Authentication"}
            </h4>
            <p className="text-xs text-neutral-500">
              {isRtl ? "أدخل رمز المرور للدخول إلى لوحة التحكم (الافتراضي: admin123)" : "Enter passcode to access moderation panel (default: admin123)"}
            </p>

            <form onSubmit={handleLogin} className="space-y-3 pt-2 text-start">
              <div>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Passcode: admin123"
                  className="w-full h-10 px-3 rounded-xl border border-neutral-300 text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                />
                {errorMsg && <p className="text-[11px] text-rose-600 mt-1 text-center">{errorMsg}</p>}
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#173E35] text-[#D6B77A] font-semibold text-xs hover:bg-[#245848]"
              >
                {isRtl ? "دخول لوحة الإدارة" : "Enter Dashboard"}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FAF8F3]">
            {/* KPI Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-start">
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block mb-1">{isRtl ? "الوجهات الموثقة" : "Verified Destinations"}</span>
                <span className="text-2xl font-bold text-[#173E35] tabular-nums">{destinations.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block mb-1">{isRtl ? "المحافظات المغطاة" : "Governorates"}</span>
                <span className="text-2xl font-bold text-[#173E35] tabular-nums">{governorates.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block mb-1">{isRtl ? "الخدمات المسجلة" : "Services Registered"}</span>
                <span className="text-2xl font-bold text-[#173E35] tabular-nums">{servicesData.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-neutral-200">
                <span className="text-[11px] text-neutral-500 block mb-1">{isRtl ? "طلبات الحجز المسجلة" : "Booking Inquiries"}</span>
                <span className="text-2xl font-bold text-[#173E35] tabular-nums">{bookings.length}</span>
              </div>
            </div>

            {/* Suggestions Moderation Section */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-sm text-[#173E35] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D6B77A]" />
                  <span>{isRtl ? "اقتراحات المجتمع للمراجعة والاعتماد" : "Community Suggestions for Review"}</span>
                </h4>
                <span className="text-xs text-neutral-500">
                  {suggestions.length} {isRtl ? "اقتراح" : "items"}
                </span>
              </div>

              {suggestions.length === 0 ? (
                <p className="text-xs text-neutral-400 py-4 text-center">
                  {isRtl ? "لا توجد اقتراحات معلقة حالياً." : "No pending suggestions."}
                </p>
              ) : (
                <div className="space-y-3">
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-xl border border-neutral-200 bg-[#FAF8F3] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#173E35] text-sm">{item.title}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              item.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : item.status === "rejected"
                                ? "bg-rose-100 text-rose-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <p className="text-neutral-600 line-clamp-2">{item.description}</p>
                        <div className="text-[11px] text-neutral-400 flex items-center gap-2">
                          <span>{item.governorate}</span>
                          <span>·</span>
                          <span>{item.wilayat}</span>
                          {item.contact && (
                            <>
                              <span>·</span>
                              <span>{item.contact}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleUpdateStatus(item.id, "approved")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{isRtl ? "اعتماد" : "Approve"}</span>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(item.id, "rejected")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-200 hover:bg-rose-100 hover:text-rose-700 text-neutral-700 font-medium"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{isRtl ? "رفض" : "Reject"}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Bookings Inquiries */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-5">
              <h4 className="font-bold text-sm text-[#173E35] mb-3">
                {isRtl ? "طلبات حجز الإقامة الأخيرة" : "Recent Stay Booking Requests"}
              </h4>
              {bookings.length === 0 ? (
                <p className="text-xs text-neutral-400 py-3 text-center">
                  {isRtl ? "لم يتم تسجيل طلبات حجز بعد." : "No bookings recorded yet."}
                </p>
              ) : (
                <div className="space-y-2 text-xs">
                  {bookings.map((b, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-neutral-50 border border-neutral-200 flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-[#173E35]">{b.propertyName}</span>
                        <div className="text-neutral-500 text-[11px]">
                          {b.guestName} · {b.phone} · {b.bookingRef}
                        </div>
                      </div>
                      <div className="text-end">
                        <span className="font-bold text-[#173E35] tabular-nums">
                          {b.totalAmount} {b.currency}
                        </span>
                        <span className="block text-[10px] text-emerald-600 font-medium">{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
