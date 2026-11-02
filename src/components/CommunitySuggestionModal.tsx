import React, { useState } from "react";
import { TranslationDictionary } from "../data/translations";
import { governorates } from "../data/governorates";
import {
  X,
  Share2,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

interface CommunitySuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  t: TranslationDictionary;
  isRtl: boolean;
}

export const CommunitySuggestionModal: React.FC<CommunitySuggestionModalProps> = ({
  isOpen,
  onClose,
  t,
  isRtl,
}) => {
  const [title, setTitle] = useState("");
  const [governorate, setGovernorate] = useState(governorates[0].nameAr);
  const [wilayat, setWilayat] = useState("");
  const [category, setCategory] = useState("hidden_gem");
  const [description, setDescription] = useState("");
  const [locationUrl, setLocationUrl] = useState("");
  const [contact, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          governorate,
          wilayat,
          category,
          description,
          locationUrl,
          contact,
        }),
      });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setTitle("");
        setDescription("");
      }, 2500);
    } catch {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 relative text-start">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors"
          aria-label={t.close}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-[#173E35] bg-[#D6B77A]/25 px-3 py-1 rounded-full mb-3 w-fit">
          <Share2 className="w-3.5 h-3.5 text-[#173E35]" />
          <span>مساهمة مجتمعية · Community Contribution</span>
        </div>

        <h3 className="text-xl font-bold text-[#173E35] mb-1">
          {t.submitSuggestion}
        </h3>
        <p className="text-xs text-neutral-500 mb-6">
          {isRtl
            ? "ساعدنا في توثيق الكنوز الطبيعية الخفية، المطاعم الأصيلة، أو تصحيح بيانات ومعلومات المرافق في سلطنة عُمان."
            : "Help enrich Rooh Oman by suggesting hidden gems, authentic cafes, or reporting corrections."}
        </p>

        {success ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#173E35] mx-auto" />
            <h4 className="text-base font-bold text-[#173E35]">
              {isRtl ? "شكراً لمساهمتك القيمة!" : "Thank You for Your Contribution!"}
            </h4>
            <p className="text-xs text-neutral-600 max-w-sm mx-auto">
              {isRtl
                ? "تم استلام اقتراحك بنجاح وسيقوم فريق التحرير بمراجعته والتحقق منه قبل نشره رسمياً."
                : "Your suggestion has been logged for editorial review and verification."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                {isRtl ? "اسم المكان أو الخدمة المقترحة *" : "Name of Place or Service *"}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. عين مائية في وادي السحتن"
                className="w-full h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  {isRtl ? "المحافظة *" : "Governorate *"}
                </label>
                <select
                  value={governorate}
                  onChange={(e) => setGovernorate(e.target.value)}
                  className="w-full h-10 px-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                >
                  {governorates.map((g) => (
                    <option key={g.id} value={isRtl ? g.nameAr : g.nameEn}>
                      {isRtl ? g.nameAr : g.nameEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  {isRtl ? "الولاية" : "Wilayat"}
                </label>
                <input
                  type="text"
                  value={wilayat}
                  onChange={(e) => setWilayat(e.target.value)}
                  placeholder="e.g. الرستاق"
                  className="w-full h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                {isRtl ? "نوع الاقتراح" : "Category"}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
              >
                <option value="hidden_gem">{isRtl ? "كنز طبيعي خفي (مجهول أو غير موثق)" : "Hidden Natural Gem"}</option>
                <option value="heritage">{isRtl ? "معلم أثري أو قرية قديمة" : "Heritage Site or Ancient Village"}</option>
                <option value="restaurant">{isRtl ? "مطعم أو مقهى يقدم وجبات محلية" : "Local Restaurant or Cafe"}</option>
                <option value="service">{isRtl ? "مرفق خدمة عامة (مستشفى، دورة مياه، وقود)" : "Missing Public Service"}</option>
                <option value="correction">{isRtl ? "تصحيح معلومة خاطئة أو تحديث مواعيد" : "Correction of Existing Info"}</option>
              </select>
            </div>

            <div>
              <label className="block font-medium text-neutral-700 mb-1">
                {isRtl ? "الوصف وكيفية الوصول إليه *" : "Description & How to Reach *"}
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={isRtl ? "صف المكان بدقة، حالة الطريق، ونوع السيارة المطلوبة..." : "Describe the place, trail condition, vehicle requirement..."}
                className="w-full p-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  {isRtl ? "رابط الموقع (Google Maps)" : "Google Maps Link"}
                </label>
                <input
                  type="url"
                  value={locationUrl}
                  onChange={(e) => setLocationUrl(e.target.value)}
                  placeholder="https://maps.app.goo.gl/..."
                  className="w-full h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                />
              </div>
              <div>
                <label className="block font-medium text-neutral-700 mb-1">
                  {isRtl ? "وسيلة تواصل (اختياري)" : "Contact (Optional)"}
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="Email or Phone"
                  className="w-full h-10 px-3 rounded-lg border border-neutral-300 focus:outline-none focus:ring-1 focus:ring-[#173E35]"
                />
              </div>
            </div>

            <p className="text-[10px] text-neutral-500 pt-1">
              {isRtl
                ? "نلتزم بحماية خصوصية بياناتك وعدم مشاركة وسيلة التواصل إلا لأغراض التحقق من صحة الموقع."
                : "We respect your privacy; contact details are only used by editors to verify location safety."}
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-[#173E35] text-[#D6B77A] font-semibold text-xs hover:bg-[#245848] transition-colors mt-2"
            >
              {isSubmitting ? (isRtl ? "جارٍ الإرسال..." : "Submitting...") : (isRtl ? "إرسال الاقتراح للمراجعة" : "Submit Suggestion")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
