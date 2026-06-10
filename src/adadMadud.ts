import type { VocabularyItem } from "./vocabulary";

export type AdadMadudPhrase = {
  number: number;
  dutch: string;
  arabic: string;
  explanation: string;
  itemId: string;
};

export const adadConstructForMasculineMadud: Record<number, string> = {
  3: "ثَلَاثَةُ",
  4: "أَرْبَعَةُ",
  5: "خَمْسَةُ",
  6: "سِتَّةُ",
  7: "سَبْعَةُ",
  8: "ثَمَانِيَةُ",
  9: "تِسْعَةُ",
  10: "عَشَرَةُ",
};

export const adadConstructForFeminineMadud: Record<number, string> = {
  3: "ثَلَاثُ",
  4: "أَرْبَعُ",
  5: "خَمْسُ",
  6: "سِتُّ",
  7: "سَبْعُ",
  8: "ثَمَانِي",
  9: "تِسْعُ",
  10: "عَشْرُ",
};

export const dutchNumberWords: Record<number, string> = {
  1: "één",
  2: "twee",
  3: "drie",
  4: "vier",
  5: "vijf",
  6: "zes",
  7: "zeven",
  8: "acht",
  9: "negen",
  10: "tien",
};

const hasGender = (item: VocabularyItem) =>
  item.gender === "mudhakkar" || item.gender === "muannath";

const isCountableNoun = (item: VocabularyItem) =>
  item.arabicType === "ism"
  && hasGender(item)
  && item.category !== "numbers"
  && item.category !== "adjectives"
  && item.hasPlural;

export function getEligibleAdadMadudItems(
  vocabulary: VocabularyItem[],
  number?: number,
): VocabularyItem[] {
  return vocabulary.filter((item) => {
    if (!isCountableNoun(item)) return false;
    if (number === 2) return Boolean(item.arabicDualRaf && item.dutchDual);
    if (number !== undefined && number >= 3) {
      return Boolean(item.arabicIndefinitePluralJarr && item.dutchIndefinitePlural);
    }
    return Boolean(item.arabicIndefiniteRaf && item.dutchIndefiniteSingular);
  });
}

export function buildAdadMadudPhrase(
  item: VocabularyItem,
  number: number,
): AdadMadudPhrase {
  if (!getEligibleAdadMadudItems([item], number).length || !dutchNumberWords[number]) {
    throw new Error(`Woord ${item.id} is niet geschikt voor getal ${number}.`);
  }

  const masculine = item.gender === "mudhakkar";
  const singular = item.arabicIndefiniteRaf!;

  if (number === 1) {
    const numberForm = masculine ? "وَاحِدٌ" : "وَاحِدَةٌ";
    return {
      number,
      itemId: item.id,
      dutch: /^een\s+/i.test(item.dutchIndefiniteSingular)
        ? item.dutchIndefiniteSingular.replace(/^een\s+/i, "één ")
        : `één ${item.dutchIndefiniteSingular}`,
      arabic: `${singular} ${numberForm}`,
      explanation: `${singular} is ${masculine ? "مُذَكَّر" : "مُؤَنَّث"}, daarom gebruiken we ${numberForm}.`,
    };
  }

  if (number === 2) {
    const numberForm = masculine ? "اِثْنَانِ" : "اِثْنَتَانِ";
    return {
      number,
      itemId: item.id,
      dutch: item.dutchDual!,
      arabic: `${item.arabicDualRaf} ${numberForm}`,
      explanation: `We gebruiken de dualis ${item.arabicDualRaf}. Het woord is ${masculine ? "مُذَكَّر" : "مُؤَنَّث"}, daarom gebruiken we ${numberForm}.`,
    };
  }

  const numberForm = masculine
    ? adadConstructForMasculineMadud[number]
    : adadConstructForFeminineMadud[number];
  const pluralJarr = item.arabicIndefinitePluralJarr!;
  return {
    number,
    itemId: item.id,
    dutch: `${dutchNumberWords[number]} ${item.dutchIndefinitePlural}`,
    arabic: `${numberForm} ${pluralJarr}`,
    explanation: `${singular} is ${masculine ? "مُذَكَّر, daarom gebruiken we de vrouwelijke" : "مُؤَنَّث, daarom gebruiken we de mannelijke"} getalvorm ${numberForm}. Het getelde woord staat in meervoud majrūr: ${pluralJarr}.`,
  };
}
