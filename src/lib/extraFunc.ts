import NepaliDate from "nepali-date-converter";

const wordMap: Record<string, string> = {
  appointment: "अपोइन्टमेन्ट",
  book: "बुक",
  booking: "बुकिङ",
  doctor: "डाक्टर",
  schedule: "तालिका",
  cancel: "रद्द",
  confirm: "पुष्टि",
  cardiology: "कार्डियोलोजी",
  dr: "डाक्टर",
  ram: "राम",

  //   reschedule: "पुनः तालिका",
};

export function toFullNepali(text: string): string {
  let result = text;

  const sortedKeys = Object.keys(wordMap).sort((a, b) => b.length - a.length);

  for (const word of sortedKeys) {
    const regex = new RegExp(word, "gi");
    result = result.replace(regex, wordMap[word]);
  }
  return result;
}

const bsMonths: string[] = [
  "बैशाख",
  "जेठ",
  "असार",
  "साउन",
  "भदौ",
  "असोज",
  "कार्तिक",
  "मंसिर",
  "पुस",
  "माघ",
  "फागुन",
  "चैत्र",
];

const nepaliDayWords: Record<number, string> = {
  1: "एक",
  2: "दुई",
  3: "तीन",
  4: "चार",
  5: "पाँच",
  6: "छ",
  7: "सात",
  8: "आठ",
  9: "नौ",
  10: "दस",
  11: "एघार",
  12: "बाह्र",
  13: "तेह्र",
  14: "चौध",
  15: "पन्ध्र",
  16: "सोह्र",
  17: "सत्र",
  18: "अठार",
  19: "उन्नाइस",
  20: "बिस",
  21: "एक्काइस",
  22: "बाइस",
  23: "तेइस",
  24: "चौबिस",
  25: "पच्चिस",
  26: "छब्बिस",
  27: "सत्ताइस",
  28: "अट्ठाइस",
  29: "उनन्तिस",
  30: "तिस",
  31: "एकतिस",
  32: "बत्तिस",
};

export function formatNepaliMonthDay(month: number, day: number): string {
  const monthName = bsMonths[month - 1];
  const dayWord = nepaliDayWords[day];
  if (!monthName) throw new Error(`Invalid BS month: ${month}`);
  if (!dayWord) throw new Error(`Unknown day: ${day}`);
  return `${monthName} ${dayWord}`;
}

export function convertEnglishDatesToNepali(text: string): string {
  return text.replace(/\d{4}-\d{2}-\d{2}/g, (match) => {
    const [year, month, day] = match.split("-").map(Number);
    const nepaliDate = new NepaliDate(new Date(year, month - 1, day));
    const nm = nepaliDate.getMonth() + 1;
    const nd = nepaliDate.getDate();
    return formatNepaliMonthDay(nm, nd);
  });
}
const nepaliHours: Record<number, string> = {
  1: "एक",
  2: "दुई",
  3: "तीन",
  4: "चार",
  5: "पाँच",
  6: "छ",
  7: "सात",
  8: "आठ",
  9: "नौ",
  10: "दस",
  11: "एघार",
  12: "बाह्र",
};

export function convertTimesToNepali(text: string): string {
  return text.replace(/\b(\d{1,2}):(\d{2}):\d{2}\b/g, (match, hour, minute) => {
    const h = parseInt(hour, 10);
    const m = parseInt(minute, 10);
    const nepaliHour = nepaliHours[h];

    if (!nepaliHour) return match;

    if (m === 0) return `${nepaliHour} बजे`;
    if (m === 30) return `साढे ${nepaliHour} बजे`;

    return match;
  });
}
