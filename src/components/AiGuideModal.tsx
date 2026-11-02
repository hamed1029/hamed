import React, { useState, useRef, useEffect } from "react";
import { SupportedLanguage, TranslationDictionary } from "../data/translations";
import {
  Sparkles,
  X,
  Send,
  Compass,
  MapPin,
  Bot,
  User,
  RotateCcw,
} from "lucide-react";

interface AiGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: SupportedLanguage;
  t: TranslationDictionary;
  isRtl: boolean;
}

interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
  source?: string;
}

export const AiGuideModal: React.FC<AiGuideModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  t,
  isRtl,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting message when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "msg-welcome",
          sender: "ai",
          text: t.aiGuideGreeting,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          source: "gemini-3.8-flash",
        },
      ]);
    }
  }, [isOpen, messages.length, t.aiGuideGreeting]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const quickPrompts = isRtl
    ? [
        "ما هو أفضل جدول لزيارة عُمان في 5 أيام؟",
        "أماكن خفية وغير معروفة في الجبل الأخضر ونزوى؟",
        "ما هو أفضل وقت لزيارة خريف ظفار وما هي أهم الأنشطة؟",
        "ما هي آداب اللباس والتصوير العامة في سلطنة عُمان؟",
      ]
    : [
        "What is the best 5-day itinerary in Oman?",
        "What are the best hidden gems in Jabal Akhdar & Nizwa?",
        "When is the best time to visit Salalah Khareef season?",
        "What is the local cultural etiquette and dress code?",
      ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/guide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          language: currentLang,
          conversationHistory: messages.map((m) => ({
            role: m.sender === "user" ? "user" : "model",
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const aiReply: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        sender: "ai",
        text: data.reply || "يسعدني خدمتكم في رحلتكم العُمانية.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch {
      const fallbackAi: ChatMessage = {
        id: `msg-ai-fallback-${Date.now()}`,
        sender: "ai",
        text: isRtl
          ? "أهلاً بك! سلطنة عُمان ترحب بضيوفها الكرام. يمكنك استكشاف مسقط ونزوى والجبل الأخضر ووادي شاب ورمال وهيبة وظفار. كيف يمكنني إفادتكم بمزيد من التفاصيل الدقيقة؟"
          : "Welcome to Oman! You can explore Muscat, Nizwa Fort, Jabal Akhdar, Wadi Shab, Wahiba Sands, and Dhofar. How may I assist your itinerary details?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "demonstration_assistant",
      };
      setMessages((prev) => [...prev, fallbackAi]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        sender: "ai",
        text: t.aiGuideGreeting,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: "gemini-3.8-flash",
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full h-[620px] max-h-[90vh] shadow-2xl border border-neutral-200 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#173E35] text-white flex items-center justify-between border-b border-[#245848]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#245848] border border-[#D6B77A]/40 flex items-center justify-center text-[#D6B77A]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white flex items-center gap-2">
                <span>{isRtl ? "رفيق روح عُمان" : "ROOH OMAN AI Guide"}</span>
                <span className="text-[10px] bg-[#D6B77A] text-[#173E35] font-semibold px-2 py-0.5 rounded">
                  Gemini 3.8
                </span>
              </h3>
              <span className="text-[11px] text-[#F5F2E9]/80 block">
                {isRtl ? "مرشدك السياحي الذكي المعتمد لكافة محافظات عُمان" : "Your intelligent tourism & culture travel concierge"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleResetChat}
              title={isRtl ? "بدء محادثة جديدة" : "New Chat"}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-[#245848] transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-[#245848] transition-colors"
              aria-label={t.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-[#FAF8F3] text-start">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  msg.sender === "user"
                    ? "bg-neutral-700 text-white"
                    : "bg-[#173E35] text-[#D6B77A]"
                }`}
              >
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#173E35] text-white rounded-tr-none"
                    : "bg-white text-neutral-800 border border-neutral-200/90 shadow-sm rounded-tl-none whitespace-pre-line"
                }`}
              >
                <div>{msg.text}</div>
                <div className="mt-1 flex items-center justify-end gap-1.5 text-[10px] text-neutral-400">
                  <span>{msg.timestamp}</span>
                  {msg.source === "demonstration_assistant" && (
                    <span className="text-amber-600 font-medium">({isRtl ? "مساعد تجريبي" : "Demo Mode"})</span>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#173E35] text-[#D6B77A] flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white text-neutral-500 rounded-2xl p-3 text-xs border border-neutral-200 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#173E35] animate-ping" />
                <span>{isRtl ? "رفيق روح عُمان يفكر ويكتب..." : "Rooh Oman is thinking..."}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="px-4 py-2 bg-neutral-100 border-t border-neutral-200 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-neutral-500 whitespace-nowrap font-medium px-1">
            {isRtl ? "أسئلة شائعة:" : "Quick Ideas:"}
          </span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(p)}
              className="px-2.5 py-1 rounded-md bg-white text-neutral-700 hover:text-[#173E35] hover:bg-[#F5F2E9] border border-neutral-200 whitespace-nowrap shrink-0 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-neutral-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t.aiGuidePlaceholder}
              className="flex-1 h-11 px-4 rounded-xl border border-neutral-300 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#173E35]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="h-11 px-5 rounded-xl bg-[#173E35] hover:bg-[#245848] text-[#D6B77A] text-xs font-semibold disabled:opacity-50 transition-colors flex items-center justify-center shrink-0"
            >
              <Send className={`w-4 h-4 ${isRtl ? "rotate-180" : ""}`} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
