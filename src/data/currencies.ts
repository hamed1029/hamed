export type CurrencyCode = "OMR" | "USD" | "SAR" | "AED" | "EUR" | "INR" | "CNY" | "GBP" | "PKR";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  nameAr: string;
  nameEn: string;
  ratePerOMR: number; // 1 OMR in foreign currency
  decimalPlaces: number;
}

export const currencies: Record<CurrencyCode, CurrencyConfig> = {
  OMR: {
    code: "OMR",
    symbol: "ر.ع.",
    nameAr: "ريال عُماني",
    nameEn: "Omani Rial",
    ratePerOMR: 1.0,
    decimalPlaces: 3,
  },
  USD: {
    code: "USD",
    symbol: "$",
    nameAr: "دولار أمريكي",
    nameEn: "US Dollar",
    ratePerOMR: 2.60,
    decimalPlaces: 2,
  },
  SAR: {
    code: "SAR",
    symbol: "ر.س.",
    nameAr: "ريال سعودي",
    nameEn: "Saudi Riyal",
    ratePerOMR: 9.75,
    decimalPlaces: 2,
  },
  AED: {
    code: "AED",
    symbol: "د.إ.",
    nameAr: "درهم إماراتي",
    nameEn: "UAE Dirham",
    ratePerOMR: 9.55,
    decimalPlaces: 2,
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    nameAr: "يورو أوروبي",
    nameEn: "Euro",
    ratePerOMR: 2.45,
    decimalPlaces: 2,
  },
  INR: {
    code: "INR",
    symbol: "₹",
    nameAr: "روبية هندية",
    nameEn: "Indian Rupee",
    ratePerOMR: 226.5,
    decimalPlaces: 1,
  },
  CNY: {
    code: "CNY",
    symbol: "¥",
    nameAr: "يوان صيني",
    nameEn: "Chinese Yuan",
    ratePerOMR: 18.9,
    decimalPlaces: 2,
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    nameAr: "جنيه إسترليني",
    nameEn: "British Pound",
    ratePerOMR: 2.05,
    decimalPlaces: 2,
  },
  PKR: {
    code: "PKR",
    symbol: "₨",
    nameAr: "روبية باكستانية",
    nameEn: "Pakistani Rupee",
    ratePerOMR: 728.0,
    decimalPlaces: 0,
  },
};

export function formatPrice(amountInOMR: number, currency: CurrencyCode, isAr: boolean = true): string {
  const curr = currencies[currency] || currencies.OMR;
  const converted = amountInOMR * curr.ratePerOMR;
  const formattedNumber = converted.toLocaleString(undefined, {
    minimumFractionDigits: curr.decimalPlaces,
    maximumFractionDigits: curr.decimalPlaces,
  });

  return isAr ? `${formattedNumber} ${curr.symbol}` : `${curr.symbol} ${formattedNumber}`;
}
