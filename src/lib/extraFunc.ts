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
