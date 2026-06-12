export const sunLetters = [
  "ت", "ث", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ل", "ن",
];

export const moonLetters = [
  "ا", "أ", "إ", "آ", "ب", "ج", "ح", "خ", "ع", "غ", "ف", "ق", "ك", "م", "ه", "هـ", "و", "ي",
];

export type SunMoonType = "sun" | "moon";

export type SunMoonExampleWord = {
  dutch: string;
  indefinite: string;
  definite: string;
  definiteNoTashkeel: string;
  type: SunMoonType;
};

const tashkeelPattern = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;

export function stripTashkeel(input: string): string {
  return input.replace(tashkeelPattern, "");
}

export function getFirstArabicLetter(word: string): string {
  const plain = stripTashkeel(word).replace(/\u0640/g, "").trim();
  const baseWord = plain.startsWith("ال") ? plain.slice(2) : plain;
  return [...baseWord].find((character) => /[\u0621-\u064A]/.test(character)) ?? "";
}

export function classifySunMoonLetter(word: string): SunMoonType {
  const firstLetter = getFirstArabicLetter(word);
  if (sunLetters.includes(firstLetter)) return "sun";
  if (moonLetters.includes(firstLetter)) return "moon";
  throw new Error(`Onbekende eerste Arabische letter in: ${word}`);
}

export const sunMoonExampleWords: SunMoonExampleWord[] = [
  {
    dutch: "de zon",
    indefinite: "شَمْسٌ",
    definite: "الشَّمْسُ",
    definiteNoTashkeel: "الشمس",
    type: "sun",
  },
  {
    dutch: "de maan",
    indefinite: "قَمَرٌ",
    definite: "الْقَمَرُ",
    definiteNoTashkeel: "القمر",
    type: "moon",
  },
  {
    dutch: "de man",
    indefinite: "رَجُلٌ",
    definite: "الرَّجُلُ",
    definiteNoTashkeel: "الرجل",
    type: "sun",
  },
];

