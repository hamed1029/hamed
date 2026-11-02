import express from "express";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const rawApiKey = process.env.GEMINI_API_KEY;
const isLiveKey =
  rawApiKey &&
  rawApiKey !== "MY_GEMINI_API_KEY" &&
  !rawApiKey.startsWith("MY_") &&
  rawApiKey.trim().length > 15;

const ai = isLiveKey
  ? new GoogleGenAI({
      apiKey: rawApiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// In-memory store for user community suggestions & bookings
interface Suggestion {
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

const suggestionsStore: Suggestion[] = [
  {
    id: "sug-1",
    title: "ممشى شرفة وادي النخر في جبل شمس",
    governorate: "الداخلية",
    wilayat: "الحمراء",
    category: "nature",
    description: "مسار مشي جبلي مذهل يطل على جراند كانيون عمان بارتفاع يتجاوز 2000 متر.",
    locationUrl: "https://maps.google.com/?q=23.2104,57.1950",
    contact: "ahmed@example.om",
    status: "approved",
    createdAt: new Date().toISOString(),
  },
  {
    id: "sug-2",
    title: "مغارة عين جرزيز وشلالاتها الموسمية",
    governorate: "ظفار",
    wilayat: "صلالة",
    category: "nature",
    description: "عين مائية نقية محاطة بأشجار التين البري وتتدفق بقوة في موسم الخريف.",
    locationUrl: "https://maps.google.com/?q=17.1122,54.0761",
    contact: "salim@example.om",
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

const bookingsStore: any[] = [];

// API: AI Tourism Assistant
app.post("/api/ai/guide", async (req, res) => {
  try {
    const { prompt, language = "ar", conversationHistory = [] } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const systemInstruction = `
You are "رفيق روح عُمان — ROOH OMAN AI Guide", the official cultural and tourism travel concierge for the Sultanate of Oman.
Your tone is deeply hospitable, respectful, knowledgeable, warm, and authentic ("كرم الضيافة العُمانية الأصيلة").
You have comprehensive knowledge of all 11 Governorates of Oman (Muscat, Dhofar, Musandam, Al Buraimi, Al Dakhiliyah, North Al Batinah, South Al Batinah, North Al Sharqiyah, South Al Sharqiyah, Al Dhahirah, Al Wusta) and their respective Wilayats.

Key Responsibilities:
1. Provide accurate, practical tourism recommendations, itineraries, hidden gems, cultural etiquette, best visiting seasons (e.g. Khareef in Salalah June-Sept, winter mountain coolness in Jabal Akhdar & Jabal Shams Nov-March).
2. Always respect Omani culture, modest dress code advice for public areas and mosques, and photography norms.
3. Help users plan trips (1 to 14 days), recommend local Omani food (Shuwa, Majboos, Omani Halwa, Kahwa with cardamom), traditional markets (Mutrah, Nizwa Souq), and outdoor adventures.
4. Respond in the user's requested language (${language}). If language is 'ar', write in fluent, warm, elegant Arabic. If 'en', write in eloquent English. Also support Chinese, Hindi, German, French, Russian, and Urdu if requested.
5. Keep your recommendations concise, organized with bullet points, and directly actionable.
`;

    let generatedReply: string | null = null;
    let replySource = "demonstration_assistant";

    if (ai) {
      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("AI generation timed out")), 7000)
        );
        const generatePromise = ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction,
          },
        });

        const response: any = await Promise.race([generatePromise, timeoutPromise]);
        if (response && response.text) {
          generatedReply = response.text;
          replySource = "gemini-3.8-flash";
        }
      } catch (genError) {
        console.warn("Gemini API call failed or timed out, using curated guide response:", genError);
      }
    }

    if (!generatedReply) {
      // Intelligent curated fallback per prompt analysis
      const lower = prompt.toLowerCase();
      if (language === "ar") {
        if (lower.includes("مسقط") || lower.includes("muscat")) {
          generatedReply = "أهلاً بك في مسقط العامرة! ننصحك بزيارة جامع السلطان قابوس الأكبر في الصباح، ثم التجول في سوق مطرح التراثي والكورنيش عند العصر، وزيارة دار الأوبرا السلطانية وقصر العلم العامر ومتحف بيت الزبير. لتناول وجبة عُمانية أصيلة، ننصح بمطعم بيت اللبان في مطرح.";
        } else if (lower.includes("ظفار") || lower.includes("صلالة") || lower.includes("خريف")) {
          generatedReply = "مرحباً بك في ظفار أرض اللبان والجمال الاستوائي! أفضل موسم للزيارة هو موسم الخريف (أواخر يونيو إلى سبتمبر). ننصحك بزيارة وادي دربات وشلالاته، عين أثوم، شاطئ المغسيل والنافورات الطبيعية، وحافة جبل سمحان. لا تفوت تذوق اللحم المظبي وزيارة سوق الحافة للبان الظفاري الحوجري الأصيل.";
        } else if (lower.includes("جبل") || lower.includes("أخضر") || lower.includes("شمس")) {
          generatedReply = "الجبال العُمانية توفر تجربة استثنائية! الجبل الأخضر يشتهر ببرودة طقسه ومزارع الرمان والورد الجبلي، بينما جبل شمس هو أعلى قمة في عمان ويتميز بممشى الشرفة المطل على وادي النخر المسمى 'جراند كانيون عمان'. تأكد من استخدام سيارة دفع رباعي (4WD) للصعود.";
        } else if (lower.includes("أيام") || lower.includes("جدول") || lower.includes("خطة")) {
          generatedReply = "إليك مقترح خطة ذهبية لمدة 5 أيام في عُمان:\n• اليوم 1: مسقط (جامع السلطان قابوس، مطرح والكورنيش)\n• اليوم 2: نزوى (قلعة نزوى، سوق الفضة، حارة العقر، قلعة بهلاء)\n• اليوم 3: مرتفعات الجبل الأخضر أو جبل شمس وقرية مسفاة العبريين\n• اليوم 4: رمال الشرقية (بدية) ووادي بني خالد للسباحة\n• اليوم 5: وادي شاب ورأس الجنز للسلاحف ثم العودة لمسقط.";
        } else {
          generatedReply = "مرحباً بكم في سلطنة عُمان! يسعدني إرشادكم في أي استفسار حول المحافظات الـ 11، الكنوز المخفية، خطط الرحلات، وأفضل مواسم الزيارة. تفضل بسؤالي عن أي وجهة ترغب باستكشافها!";
        }
      } else {
        generatedReply = "Welcome to the Sultanate of Oman! I am your Rooh Oman AI concierge. Oman offers dramatic mountain ranges like Jabal Akhdar & Jabal Shams, emerald wadis like Wadi Shab and Wadi Bani Khalid, golden desert dunes in Wahiba Sands, tropical mist in Salalah during Khareef, and historical forts in Nizwa and Bahla. How can I assist your journey?";
      }
    }

    return res.json({
      reply: generatedReply,
      source: replySource,
    });
  } catch (error: any) {
    console.error("AI Guide error:", error);
    res.status(500).json({
      error: "Failed to generate AI response",
      details: error.message,
    });
  }
});

// API: Suggestions (Community contributions)
app.get("/api/suggestions", (req, res) => {
  res.json({ suggestions: suggestionsStore });
});

app.post("/api/suggestions", (req, res) => {
  const { title, governorate, wilayat, category, description, locationUrl, contact } = req.body;
  if (!title || !governorate || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const newSuggestion: Suggestion = {
    id: `sug-${Date.now()}`,
    title,
    governorate,
    wilayat: wilayat || "العامة",
    category: category || "nature",
    description,
    locationUrl,
    contact,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  suggestionsStore.unshift(newSuggestion);
  res.status(201).json({ success: true, suggestion: newSuggestion });
});

app.patch("/api/suggestions/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const item = suggestionsStore.find((s) => s.id === id);
  if (item && (status === "approved" || status === "rejected" || status === "pending")) {
    item.status = status;
    return res.json({ success: true, item });
  }
  res.status(404).json({ error: "Suggestion not found" });
});

// API: Bookings inquiry
app.post("/api/bookings", (req, res) => {
  const { propertyName, guestName, email, phone, checkIn, checkOut, guests, notes, totalAmount, currency } = req.body;
  if (!propertyName || !guestName || !phone) {
    return res.status(400).json({ error: "Missing required booking fields" });
  }

  const bookingRef = `ROOH-${Math.floor(100000 + Math.random() * 900000)}`;
  const booking = {
    bookingRef,
    propertyName,
    guestName,
    email,
    phone,
    checkIn,
    checkOut,
    guests: guests || 2,
    notes,
    totalAmount,
    currency: currency || "OMR",
    status: "confirmed_request",
    createdAt: new Date().toISOString(),
  };

  bookingsStore.unshift(booking);
  res.status(201).json({ success: true, booking });
});

app.get("/api/bookings", (req, res) => {
  res.json({ bookings: bookingsStore });
});

// Setup Vite in Dev or serve static in Prod
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ROOH OMAN Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
