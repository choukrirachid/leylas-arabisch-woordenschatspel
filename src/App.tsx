import { useMemo, useState } from "react";
import { AdadMadudModule } from "./AdadMadudModule";
import { AdadModule } from "./AdadModule";
import {
  contextualPhrases,
  contextualPhrasesAreSafe,
  contextMetadataIsSafe,
  type ContextualPhraseTemplate,
} from "./contextualPhrases";
import { DarfMakaanModule } from "./DarfMakaanModule";
import { DualPracticeMode } from "./DualPracticeMode";
import { grammarWords } from "./grammarWords";
import { IraabCasesModule } from "./IraabCasesModule";
import { MubtadaKhabarModule } from "./MubtadaKhabarModule";
import { MudafMudafIlayhiModule } from "./MudafMudafIlayhiModule";
import { ReadingComprehensionModule } from "./ReadingComprehensionModule";
import { SunMoonLettersModule } from "./SunMoonLettersModule";
import { TheoryPage, VocabularyTheory, type TheoryMode } from "./TheoryPages";
import type { Mistake, Mode, Question } from "./types";
import { WordTypesModule } from "./WordTypesModule";
import {
  vocabulary,
  type Category,
  type VocabularyItem,
} from "./vocabulary";

export const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const getRandomItems = <T,>(items: T[], count: number): T[] =>
  shuffleArray(items).slice(0, count);

export const normalizeAnswer = (answer: string): string => answer.trim();

export const generateMultipleChoiceOptions = (
  correct: string,
  pool: string[],
  count = 4,
): string[] => {
  const distractors = shuffleArray([...new Set(pool.filter((value) => value && value !== correct))]);
  return shuffleArray([correct, ...distractors.slice(0, count - 1)]);
};

const categoryLabels: Record<"all" | Category, string> = {
  all: "Alles",
  school: "School",
  house: "Huis",
  food: "Eten en drinken",
  outside_transport: "Buiten en vervoer",
  fruit: "Fruit",
  numbers: "Getallen",
  verbs: "Werkwoorden",
  adjectives: "Bijvoeglijke woorden",
  grammar: "Grammatica",
};

const modeLabels: Record<Exclude<Mode, "home">, { title: string; subtitle: string }> = {
  vocabulary: { title: "Woordenschat", subtitle: "Tik, kijk en kies het juiste woord." },
  fourForms: { title: "Vier vormen", subtitle: "Enkelvoud, meervoud, bepaald en onbepaald." },
  sunMoon: { title: "Zonneletters / maanletters", subtitle: "Leer الحروف الشمسية والقمرية herkennen." },
  definiteness: { title: "Bepaald / onbepaald", subtitle: "Oefen مَعْرِفَة en نَكِرَة." },
  jar: { title: "Harfo Djar", subtitle: "Na فِي en عَلَى volgt een اِسْم مَجْرُور." },
  zarf: { title: "Darf makaan", subtitle: "Oefen ظَرْف مَكَان met bekende woorden." },
  ishara: { title: "Asmaa al ishara", subtitle: "Kies هَٰذَا of هَٰذِهِ." },
  grammar: { title: "Ism, fiʿl en ḥarf", subtitle: "Herken اِسْم، فِعْل en حَرْف" },
  gender: { title: "Mannelijk / vrouwelijk", subtitle: "Oefen مُذَكَّر en مُؤَنَّث." },
  adad: { title: "ʿAdad / Getallen", subtitle: "Leer de mannelijke en vrouwelijke vormen van 1 t/m 10." },
  mubtadaKhabar: { title: "Mubtadaʾ / Khabar", subtitle: "Leer de جُمْلَة اِسْمِيَّة stap voor stap analyseren." },
  adadMadud: { title: "ʿAdad wa Maʿdūd", subtitle: "Getal en geteld woord." },
  mudafMudafIlayhi: { title: "Muḍāf / Muḍāf ilayhi", subtitle: "Leer المضاف والمضاف إليه eenvoudig herkennen." },
  readingComprehension: { title: "Begrijpend lezen", subtitle: "Lees korte Arabische teksten en beantwoord vragen." },
  iraabCases: { title: "Marfūʿ / Manṣūb / Majrūr", subtitle: "Herken ḍamma, fatḥa en kasra aan het woordeinde." },
  writing: { title: "Schrijfexamen", subtitle: "Schrijf op papier en controleer jezelf." },
  exam: { title: "Examenmodus", subtitle: "Twintig gemengde vragen." },
};

type HomeModuleMode = Exclude<Mode, "home">;

const preferredModuleOrder: Partial<Record<HomeModuleMode, number>> = {
  vocabulary: 1,
  fourForms: 2,
  sunMoon: 3,
  definiteness: 4,
  jar: 5,
  zarf: 6,
  ishara: 7,
  grammar: 8,
  gender: 9,
  adad: 10,
  mubtadaKhabar: 11,
  adadMadud: 12,
  mudafMudafIlayhi: 13,
  readingComprehension: 14,
  iraabCases: 15,
  writing: 998,
  exam: 999,
};

const homeModules = (Object.entries(modeLabels) as [HomeModuleMode, { title: string; subtitle: string }][])
  .sort(([left], [right]) => (preferredModuleOrder[left] ?? 500) - (preferredModuleOrder[right] ?? 500));

const arabicForms = (items = vocabulary) =>
  items.flatMap((item) => [
    item.arabicIndefiniteRaf,
    item.arabicDefiniteRaf,
    item.arabicIndefinitePluralRaf,
    item.arabicDefinitePluralRaf,
    item.arabicIndefiniteJarr,
    item.arabicDefiniteJarr,
  ]).filter((value): value is string => Boolean(value));

const nouns = vocabulary.filter((item) => item.arabicType === "ism" && item.hasDefiniteForm);

if (!contextualPhrasesAreSafe() || !contextMetadataIsSafe(vocabulary)) {
  throw new Error("Onveilige plaatszin gevonden in contextualPhrases.");
}

const q = (
  id: string,
  prompt: string,
  answer: string,
  pool: string[],
  extra: Partial<Question> = {},
): Question => ({
  id: `${id}-${Math.random()}`,
  prompt,
  answer,
  options: generateMultipleChoiceOptions(answer, pool),
  ...extra,
});

const vocabularyQuestions = (items: VocabularyItem[], count: number): Question[] => {
  const usable = items.filter((item) => item.arabicIndefiniteRaf);
  const pool = arabicForms(usable.length >= 4 ? usable : vocabulary);
  return getRandomItems(usable, count).map((item) =>
    q(`v-${item.id}`, `Kies het Arabisch voor: ${item.dutchIndefiniteSingular}`, item.arabicIndefiniteRaf!, pool, { source: item }),
  );
};

const fourFormQuestions = (count: number): Question[] => {
  const usable = nouns.filter((item) =>
    item.hasPlural && item.dutchDefiniteSingular
    && item.dutchIndefinitePlural && item.dutchDefinitePlural,
  );
  return Array.from({ length: count }, (_, index) => {
    const item = usable[Math.floor(Math.random() * usable.length)];
    const forms = [
      [item.dutchIndefiniteSingular, item.arabicIndefiniteRaf!],
      [item.dutchDefiniteSingular!, item.arabicDefiniteRaf!],
      [item.dutchIndefinitePlural!, item.arabicIndefinitePluralRaf!],
      [item.dutchDefinitePlural!, item.arabicDefinitePluralRaf!],
    ] as const;
    const [prompt, answer] = forms[index % forms.length];
    return q(`four-${item.id}`, `Welke vorm hoort bij: ${prompt}?`, answer, forms.map((form) => form[1]), { source: item });
  });
};

const definitenessQuestions = (count: number): Question[] =>
  Array.from({ length: count }, (_, index) => {
    const item = nouns[Math.floor(Math.random() * nouns.length)];
    if (index % 3 === 2) {
      const definite = Math.random() > 0.5;
      const word = definite ? item.arabicDefiniteRaf! : item.arabicIndefiniteRaf!;
      return q(`def-label-${item.id}`, `Is ${word} مَعْرِفَة of نَكِرَة?`, definite ? "مَعْرِفَة" : "نَكِرَة", ["مَعْرِفَة", "نَكِرَة"], {
        arabicPrompt: true,
        explanation: definite ? "مَعْرِفَة heeft meestal الـ." : "نَكِرَة heeft meestal tanwīn.",
      });
    }
    const makeDefinite = index % 2 === 0;
    return q(
      `def-${item.id}`,
      `${makeDefinite ? "Maak bepaald" : "Maak onbepaald"}: ${makeDefinite ? item.arabicIndefiniteRaf : item.arabicDefiniteRaf}`,
      makeDefinite ? item.arabicDefiniteRaf! : item.arabicIndefiniteRaf!,
      arabicForms(nouns),
      { arabicPrompt: true, source: item },
    );
  });

const contextualQuestions = (
  phrases: ContextualPhraseTemplate[],
  count: number,
  prefix: string,
  explanation: string,
): Question[] => {
  const selected = shuffleArray(phrases);
  const answerPool = phrases.map((phrase) => phrase.arabic);
  return Array.from({ length: count }, (_, index) => {
    const phrase = selected[index % selected.length];
    return q(
      `${prefix}-${phrase.id}-${index}`,
      `Vertaal: ${phrase.dutch}`,
      phrase.arabic,
      answerPool,
      { explanation },
    );
  });
};

const jarQuestions = (count: number): Question[] =>
  contextualQuestions(
    contextualPhrases.filter((phrase) => phrase.grammarFocus === "fi" || phrase.grammarFocus === "ala"),
    count,
    "jar",
    "Na فِي en عَلَى komt een اِسْم مَجْرُور. Daarom krijgt het woord kasra.",
  );

const zarfQuestions = (count: number): Question[] =>
  contextualQuestions(
    contextualPhrases.filter((phrase) => phrase.grammarFocus === "zarf_makaan"),
    count,
    "zarf",
    "Dit is een ظَرْف مَكَان. We gebruiken alleen zinnen die logisch zijn.",
  );

const isharaQuestions = (count: number): Question[] => {
  const usable = nouns.filter((item) => item.gender !== "none");
  return Array.from({ length: count }, (_, index) => {
    const item = usable[Math.floor(Math.random() * usable.length)];
    const demonstrative = item.gender === "muannath" ? "هَٰذِهِ" : "هَٰذَا";
    const answer = index % 2 ? `${demonstrative} ${item.arabicIndefiniteRaf}` : demonstrative;
    return q(
      `ishara-${item.id}`,
      index % 2 ? `Bouw de zin: dit is ${item.dutchIndefiniteSingular}` : `Welk اِسْم إِشَارَة hoort bij ${item.arabicIndefiniteRaf}?`,
      answer,
      index % 2
        ? [`هَٰذَا ${item.arabicIndefiniteRaf}`, `هَٰذِهِ ${item.arabicIndefiniteRaf}`]
        : ["هَٰذَا", "هَٰذِهِ"],
      {
        arabicPrompt: index % 2 === 0,
        source: item,
        explanation: `Dit woord is ${item.gender === "muannath" ? "مُؤَنَّث, dus gebruik هَٰذِهِ" : "مُذَكَّر, dus gebruik هَٰذَا"}.`,
      },
    );
  });
};

const grammarQuestions = (count: number): Question[] => {
  const words = [
    ...vocabulary.map((item) => ({
      id: item.id,
      arabic: item.arabicIndefiniteRaf!,
      answer: item.arabicType === "fi3l" ? "فِعْل" : "اِسْم",
    })),
    ...grammarWords.filter((word) => word.arabicType !== "zarf").map((word) => ({
      id: word.id,
      arabic: word.arabic,
      answer: word.arabicType === "harf" ? "حَرْف" : "اِسْم",
    })),
  ].filter((word) => word.arabic);
  return getRandomItems(words, count).map((word) =>
    q(`grammar-${word.id}`, `Is ${word.arabic} een اِسْم, فِعْل of حَرْف?`, word.answer, ["اِسْم", "فِعْل", "حَرْف"], { arabicPrompt: true }),
  );
};

const genderQuestions = (count: number): Question[] => {
  const pairs = vocabulary.filter((item) => item.hasGenderPair);
  return Array.from({ length: count }, (_, index) => {
    const item = pairs[Math.floor(Math.random() * pairs.length)];
    if (index % 2 === 0) {
      const feminine = item.gender === "muannath";
      return q(`gender-label-${item.id}`, `Is ${item.arabicIndefiniteRaf} مُذَكَّر of مُؤَنَّث?`, feminine ? "مُؤَنَّث" : "مُذَكَّر", ["مُذَكَّر", "مُؤَنَّث"], { arabicPrompt: true });
    }
    const makeFeminine = Math.random() > 0.5;
    const definite = Math.random() > 0.5;
    const from = definite
      ? (makeFeminine ? item.masculineDefiniteRaf : item.feminineDefiniteRaf)
      : (makeFeminine ? item.masculineIndefiniteRaf : item.feminineIndefiniteRaf);
    const answer = definite
      ? (makeFeminine ? item.feminineDefiniteRaf : item.masculineDefiniteRaf)
      : (makeFeminine ? item.feminineIndefiniteRaf : item.masculineIndefiniteRaf);
    return q(`gender-change-${item.id}`, `${makeFeminine ? "Maak vrouwelijk" : "Maak mannelijk"}: ${from}`, answer!, [
      item.masculineIndefiniteRaf!, item.feminineIndefiniteRaf!,
      item.masculineDefiniteRaf!, item.feminineDefiniteRaf!,
    ], { arabicPrompt: true, source: item });
  });
};

const writingQuestions = (count: number): Question[] => {
  const sets = [
    ...fourFormQuestions(count),
    ...jarQuestions(count),
    ...zarfQuestions(count),
    ...isharaQuestions(count),
    ...genderQuestions(count),
  ];
  return getRandomItems(sets, count).map((question) => ({
    ...question,
    id: `write-${question.id}`,
    prompt: `Schrijf op papier: ${question.prompt}`,
    options: [],
    selfCheck: true,
  }));
};

