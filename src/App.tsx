import { useMemo, useState } from "react";
import { grammarWords } from "./grammarWords";
import type { Mistake, Mode, Question } from "./types";
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
  definiteness: { title: "Bepaald / onbepaald", subtitle: "Oefen مَعْرِفَة en نَكِرَة." },
  jar: { title: "Ism ma3roor", subtitle: "Na فِي en عَلَى volgt een اِسْم مَجْرُور." },
  zarf: { title: "Darf maqaan", subtitle: "Oefen ظَرْف مَكَان met bekende woorden." },
  ishara: { title: "Asmaa al ishara", subtitle: "Kies هَٰذَا of هَٰذِهِ." },
  grammar: { title: "Grammatica herkennen", subtitle: "Herken اِسْم, فِعْل en حَرْف." },
  gender: { title: "Mannelijk / vrouwelijk", subtitle: "Oefen مُذَكَّر en مُؤَنَّث." },
  writing: { title: "Schrijfexamen", subtitle: "Schrijf op papier en controleer jezelf." },
  exam: { title: "Examenmodus", subtitle: "Twintig gemengde vragen." },
};

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

const jarQuestions = (count: number): Question[] =>
  Array.from({ length: count }, (_, index) => {
    const jarNouns = nouns.filter((word) => word.hasJarrForm && word.dutchDefiniteSingular);
    const item = jarNouns[Math.floor(Math.random() * jarNouns.length)];
    const particle = index % 2 === 0 ? "فِي" : "عَلَى";
    const dutchParticle = particle === "فِي" ? "in" : "op";
    const definite = index % 3 !== 1;
    const answer = `${particle} ${definite ? item.arabicDefiniteJarr : item.arabicIndefiniteJarr}`;
    const wrong = [
      `${particle} ${item.arabicDefiniteRaf}`,
      `${particle} ${item.arabicIndefiniteRaf}`,
      `${particle} ${definite ? item.arabicIndefiniteJarr : item.arabicDefiniteJarr}`,
    ].filter((value): value is string => !value.includes("undefined"));
    return q(
      `jar-${item.id}`,
      `Kies de juiste constructie: ${dutchParticle} ${definite ? item.dutchDefiniteSingular : item.dutchIndefiniteSingular}`,
      answer,
      wrong,
      { source: item, explanation: "Na فِي en عَلَى komt een اِسْم مَجْرُور met kasra of kasratayn." },
    );
  });

const zarfQuestions = (count: number): Question[] => {
  const zarfs = grammarWords.filter((word) => word.grammarRole === "zarf_makaan");
  const usable = nouns.filter((item) => item.arabicDefiniteJarr && item.dutchDefiniteSingular);
  return Array.from({ length: count }, () => {
    const zarf = zarfs[Math.floor(Math.random() * zarfs.length)];
    const item = usable[Math.floor(Math.random() * usable.length)];
    const answer = `${zarf.arabic} ${item.arabicDefiniteJarr}`;
    return q(
      `zarf-${zarf.id}-${item.id}`,
      `Vertaal: ${zarf.dutch} ${item.dutchDefiniteSingular}`,
      answer,
      zarfs.map((word) => `${word.arabic} ${item.arabicDefiniteJarr}`),
      { source: item, explanation: `${zarf.arabic} is een اِسْم / ظَرْف مَكَان.` },
    );
  });
};

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
    ...grammarWords.map((word) => ({
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

const makeQuestions = (mode: Exclude<Mode, "home">, items: VocabularyItem[], count = 10): Question[] => {
  if (mode === "vocabulary") return vocabularyQuestions(items, count);
  if (mode === "fourForms") return fourFormQuestions(count);
  if (mode === "definiteness") return definitenessQuestions(count);
  if (mode === "jar") return jarQuestions(count);
  if (mode === "zarf") return zarfQuestions(count);
  if (mode === "ishara") return isharaQuestions(count);
  if (mode === "grammar") return grammarQuestions(count);
  if (mode === "gender") return genderQuestions(count);
  if (mode === "writing") return writingQuestions(count);
  return shuffleArray([
    ...vocabularyQuestions(items, 4),
    ...fourFormQuestions(4),
    ...definitenessQuestions(3),
    ...jarQuestions(3),
    ...zarfQuestions(2),
    ...isharaQuestions(2),
    ...grammarQuestions(2),
  ]);
};

function CategoryFilter({
  value,
  onChange,
}: {
  value: "all" | Category;
  onChange: (category: "all" | Category) => void;
}) {
  return (
    <label className="category-filter">
      <span>Categorie</span>
      <select value={value} onChange={(event) => onChange(event.target.value as "all" | Category)}>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </label>
  );
}

function HomeScreen({
  category,
  onCategory,
  onStart,
}: {
  category: "all" | Category;
  onCategory: (category: "all" | Category) => void;
  onStart: (mode: Exclude<Mode, "home">) => void;
}) {
  return (
    <>
      <header className="hero">
        <p className="eyebrow">أَهْلًا وَسَهْلًا</p>
        <h1>Leyla's Arabisch Woordenschatspel</h1>
        <p>Oefen rustig, tik op grote antwoorden en leer van elke fout.</p>
      </header>
      <CategoryFilter value={category} onChange={onCategory} />
      <section className="module-grid" aria-label="Oefenmodules">
        {(Object.entries(modeLabels) as [Exclude<Mode, "home">, { title: string; subtitle: string }][]).map(([key, info], index) => (
          <button className="module-card" key={key} onClick={() => onStart(key)}>
            <span className="module-number">{index + 1}</span>
            <span><strong>{info.title}</strong><small>{info.subtitle}</small></span>
          </button>
        ))}
      </section>
    </>
  );
}

function ScoreBar({ current, total, score }: { current: number; total: number; score: number }) {
  const progress = Math.min(100, ((current + 1) / total) * 100);
  return (
    <div className="score-wrap">
      <div className="score-line"><strong>Vraag {Math.min(current + 1, total)}/{total}</strong><span>Score: {score}</span></div>
      <div className="progress"><span style={{ width: `${progress}%` }} /></div>
    </div>
  );
}

type FlashcardDirection = "nl-ar" | "ar-nl";
type ArabicFormKind = "indefiniteSingular" | "definiteSingular" | "indefinitePlural" | "definitePlural";

const dutchForArabicForm = (item: VocabularyItem, form: ArabicFormKind): string => {
  if (form === "indefiniteSingular") return item.dutchIndefiniteSingular;
  if (form === "definiteSingular") return item.dutchDefiniteSingular ?? "bepaalde Nederlandse vorm ontbreekt";
  if (form === "indefinitePlural") return item.dutchIndefinitePlural ?? item.dutchIndefiniteSingular;
  return item.dutchDefinitePlural ?? "bepaalde Nederlandse vorm ontbreekt";
};

function FlashcardMode({
  items,
  direction,
  onBack,
}: {
  items: VocabularyItem[];
  direction: FlashcardDirection;
  onBack: () => void;
}) {
  const cards = useMemo(() => {
    const vocabularyCards = items
      .filter((item) => item.arabicIndefiniteRaf)
      .map((item) => {
        const forms = [
          { kind: "indefiniteSingular" as const, arabic: item.arabicIndefiniteRaf! },
          item.arabicDefiniteRaf && item.dutchDefiniteSingular
            ? { kind: "definiteSingular" as const, arabic: item.arabicDefiniteRaf }
            : undefined,
          item.arabicIndefinitePluralRaf && item.dutchIndefinitePlural
            ? { kind: "indefinitePlural" as const, arabic: item.arabicIndefinitePluralRaf }
            : undefined,
          item.arabicDefinitePluralRaf && item.dutchDefinitePlural
            ? { kind: "definitePlural" as const, arabic: item.arabicDefinitePluralRaf }
            : undefined,
        ].filter((form): form is { kind: ArabicFormKind; arabic: string } => Boolean(form));
        return {
          kind: "vocabulary" as const,
          item,
          reverseForm: forms[Math.floor(Math.random() * forms.length)],
        };
      });
    const includeGrammar = items === vocabulary || items.some((item) => item.category === "grammar");
    const grammarCards = includeGrammar
      ? grammarWords.map((word) => ({ kind: "grammar" as const, word }))
      : [];
    return shuffleArray([...vocabularyCards, ...grammarCards]);
  }, [items, direction]);
  const [index, setIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  const [showDefiniteForms, setShowDefiniteForms] = useState(false);
  const card = cards[index % cards.length];
  if (!card) return <EmptyState onBack={onBack} />;

  const nextCard = () => {
    setIndex((value) => value + 1);
    setIsAnswerVisible(false);
    setShowDefiniteForms(false);
  };

  const progressLabel = direction === "nl-ar"
    ? "Flashcards NL → Arabisch"
    : "Flashcards Arabisch → NL";

  if (card.kind === "grammar") {
    const roleLabels = {
      harf_jar: "حَرْف جَرّ",
      ism_ishara: "اِسْم إِشَارَة",
      zarf_makaan: "ظَرْف مَكَان",
    };
    const question = direction === "nl-ar" ? card.word.dutch : card.word.arabic;
    return (
      <section>
        <button className="back-link" onClick={onBack}>← Terug naar start</button>
        <div className="screen-title"><p>{progressLabel} • {index + 1}/{cards.length}</p><h2>Wat betekent dit?</h2></div>
        <article className="flashcard">
          <h3 className={direction === "ar-nl" ? "arabic flashcard-question" : undefined}>{question}</h3>
          {isAnswerVisible && (
            <>
              <div className="flashcard-row">
                <span>{direction === "nl-ar" ? "Arabisch" : "Nederlands"}</span>
                {direction === "nl-ar"
                  ? <b className="arabic">{card.word.arabic}</b>
                  : <b>{card.word.dutch}</b>}
              </div>
              <div className="flashcard-row"><span>Grammaticale rol</span><b className="arabic role">{roleLabels[card.word.grammarRole]}</b></div>
            </>
          )}
        </article>
        {!isAnswerVisible
          ? <button className="primary full" onClick={() => setIsAnswerVisible(true)}>Toon antwoord</button>
          : <button className="primary full" onClick={nextCard}>Volgende woord</button>}
      </section>
    );
  }

  const item = card.item;
  const isVerb = item.arabicType === "fi3l";
  const isNumber = item.category === "numbers";
  const hasDefiniteStep = !isVerb && !isNumber && item.hasDefiniteForm && Boolean(item.arabicDefiniteRaf);
  const typeLabel = isVerb ? "فِعْل" : "اِسْم";
  const genderLabel = item.gender === "mudhakkar" ? "مُذَكَّر" : item.gender === "muannath" ? "مُؤَنَّث" : undefined;

  if (direction === "ar-nl") {
    const formLabels: Record<ArabicFormKind, string> = {
      indefiniteSingular: "onbepaald enkelvoud",
      definiteSingular: "bepaald enkelvoud",
      indefinitePlural: "onbepaald meervoud",
      definitePlural: "bepaald meervoud",
    };
    return (
      <section>
        <button className="back-link" onClick={onBack}>← Terug naar start</button>
        <div className="screen-title"><p>{progressLabel} • {index + 1}/{cards.length}</p><h2>Wat betekent dit?</h2></div>
        <article className="flashcard">
          <h3 className="arabic flashcard-question">{card.reverseForm.arabic}</h3>
          {isAnswerVisible && (
            <>
              <div className="flashcard-row"><span>Nederlands</span><b>{dutchForArabicForm(item, card.reverseForm.kind)}</b></div>
              {!isVerb && !isNumber && <div className="flashcard-row"><span>Vorm</span><b>{formLabels[card.reverseForm.kind]}</b></div>}
              <div className="flashcard-row"><span>Type</span><b className="arabic role">{typeLabel}</b></div>
              {genderLabel && !isVerb && <div className="flashcard-row"><span>Geslacht</span><b className="arabic role">{genderLabel}</b></div>}
            </>
          )}
        </article>
        {!isAnswerVisible
          ? <button className="primary full" onClick={() => setIsAnswerVisible(true)}>Toon antwoord</button>
          : <button className="primary full" onClick={nextCard}>Volgende woord</button>}
      </section>
    );
  }

  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title">
        <p>{progressLabel} • {index + 1}/{cards.length}</p>
        <h2>{!isAnswerVisible ? "Wat is het Arabische woord?" : showDefiniteForms ? "Bepaalde vormen" : "Onbepaalde vormen"}</h2>
      </div>
      <article className="flashcard">
        <h3>{item.dutchIndefiniteSingular}</h3>
        {isAnswerVisible && (
          <>
            <div className="flashcard-row"><span>{isVerb || isNumber ? "Arabisch" : "Onbepaald"}</span><b className="arabic">{item.arabicIndefiniteRaf}</b></div>
            {!isVerb && !isNumber && item.hasPlural && item.arabicIndefinitePluralRaf && (
              <div className="flashcard-row"><span>Meervoud</span><b className="arabic">{item.arabicIndefinitePluralRaf}</b></div>
            )}
            {(isVerb || isNumber) && <div className="flashcard-row"><span>Grammaticaal type</span><b className="arabic role">{typeLabel}</b></div>}
            {showDefiniteForms && (
              <>
                <div className="flashcard-row definite"><span>Bepaald</span><b className="arabic">{item.arabicDefiniteRaf}</b></div>
                {item.hasPlural && item.arabicDefinitePluralRaf && (
                  <div className="flashcard-row definite"><span>Bepaald meervoud</span><b className="arabic">{item.arabicDefinitePluralRaf}</b></div>
                )}
              </>
            )}
          </>
        )}
      </article>
      {!isAnswerVisible
        ? <button className="primary full" onClick={() => setIsAnswerVisible(true)}>Toon antwoord</button>
        : hasDefiniteStep && !showDefiniteForms
          ? <button className="primary full" onClick={() => setShowDefiniteForms(true)}>Toon bepaalde vormen</button>
        : <button className="primary full" onClick={nextCard}>Volgende woord</button>}
    </section>
  );
}

type ListCategory = "all" | Category;
type ListArabicType = "all" | "ism" | "fi3l" | "harf" | "zarf";
type ListGender = "all" | "mudhakkar" | "muannath";

const typeLabels: Record<Exclude<ListArabicType, "all">, string> = {
  ism: "اِسْم",
  fi3l: "فِعْل",
  harf: "حَرْف",
  zarf: "ظَرْف",
};

const genderLabels = {
  mudhakkar: "مُذَكَّر",
  muannath: "مُؤَنَّث",
};

const grammarRoleLabels = {
  harf_jar: "حَرْف جَرّ",
  ism_ishara: "اِسْم إِشَارَة",
  zarf_makaan: "ظَرْف مَكَان",
};

function VocabularyListMode() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ListCategory>("all");
  const [arabicType, setArabicType] = useState<ListArabicType>("all");
  const [gender, setGender] = useState<ListGender>("all");
  const [expandedDefiniteForms, setExpandedDefiniteForms] = useState<Record<string, boolean>>({});

  const entries = useMemo(() => {
    const vocabularyEntries = vocabulary.map((item) => ({
      kind: "vocabulary" as const,
      id: item.id,
      dutch: [
        item.dutchIndefiniteSingular,
        item.dutchDefiniteSingular,
        item.dutchIndefinitePlural,
        item.dutchDefinitePlural,
      ].filter(Boolean).join(" "),
      arabic: [
        item.arabicIndefiniteRaf,
        item.arabicDefiniteRaf,
        item.arabicIndefinitePluralRaf,
        item.arabicDefinitePluralRaf,
      ].filter(Boolean).join(" "),
      category: item.category,
      arabicType: item.arabicType,
      gender: item.gender,
      item,
    }));
    const grammarEntries = grammarWords.map((word) => ({
      kind: "grammar" as const,
      id: `grammar-${word.id}`,
      dutch: word.dutch,
      arabic: word.arabic,
      category: "grammar" as const,
      arabicType: word.arabicType,
      gender: word.gender ?? "none",
      word,
    }));
    const normalizedSearch = search.trim().toLocaleLowerCase("nl");
    return [...vocabularyEntries, ...grammarEntries].filter((entry) => {
      const matchesSearch = !normalizedSearch
        || entry.dutch.toLocaleLowerCase("nl").includes(normalizedSearch)
        || entry.arabic.includes(search.trim());
      return matchesSearch
        && (category === "all" || entry.category === category)
        && (arabicType === "all" || entry.arabicType === arabicType)
        && (gender === "all" || entry.gender === gender);
    });
  }, [search, category, arabicType, gender]);

  const Field = ({ label, value }: { label: string; value?: string }) => value ? (
    <div className="word-list-row">
      <span>{label}</span>
      <b className="arabic" dir="rtl">{value}</b>
    </div>
  ) : null;

  return (
    <>
      <div className="list-filters">
        <label className="search-field">
          <span>Zoeken</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Zoek Nederlands of Arabisch..."
          />
        </label>
        <label><span>Categorie</span><select value={category} onChange={(event) => setCategory(event.target.value as ListCategory)}>
          {Object.entries(categoryLabels)
            .filter(([key]) => key !== "adjectives")
            .map(([key, label]) => <option key={key} value={key}>{label}</option>)}
        </select></label>
        <label><span>Type</span><select value={arabicType} onChange={(event) => setArabicType(event.target.value as ListArabicType)}>
          <option value="all">Alles</option>
          <option value="ism">اِسْم</option>
          <option value="fi3l">فِعْل</option>
          <option value="harf">حَرْف</option>
          <option value="zarf">ظَرْف</option>
        </select></label>
        <label><span>Geslacht</span><select value={gender} onChange={(event) => setGender(event.target.value as ListGender)}>
          <option value="all">Alles</option>
          <option value="mudhakkar">مُذَكَّر</option>
          <option value="muannath">مُؤَنَّث</option>
        </select></label>
      </div>
      <p className="list-count">{entries.length} woorden gevonden</p>
      <div className="word-list">
        {entries.map((entry) => {
          if (entry.kind === "grammar") {
            return (
              <article className="word-list-card" key={entry.id}>
                <section><h3>Nederlands</h3><p className="dutch-word">{entry.word.dutch}</p></section>
                <section><h3>Arabisch</h3><b className="arabic main-form">{entry.word.arabic}</b></section>
                <section><h3>Grammatica</h3>
                  <Field label="Type" value={typeLabels[entry.word.arabicType]} />
                  <Field label="Rol" value={grammarRoleLabels[entry.word.grammarRole]} />
                  <div className="word-list-meta"><span>Categorie</span><b>Grammatica</b></div>
                </section>
              </article>
            );
          }
          const item = entry.item;
          const isSimple = item.arabicType === "fi3l" || item.category === "numbers";
          const canShowDefinite = !isSimple && Boolean(item.arabicDefiniteRaf);
          const definiteIsExpanded = Boolean(expandedDefiniteForms[item.id]);
          return (
            <article className="word-list-card" key={entry.id}>
              <section><h3>Nederlands</h3>
                <p className="dutch-word">{item.dutchIndefiniteSingular}</p>
                {item.dutchIndefinitePlural && <p className="dutch-plural">Meervoud: {item.dutchIndefinitePlural}</p>}
              </section>
              <section><h3>Arabisch</h3>
                <Field label={isSimple ? "Arabisch" : "Enkelvoud"} value={item.arabicIndefiniteRaf} />
                {!isSimple && <Field label="Meervoud" value={item.arabicIndefinitePluralRaf} />}
                {canShowDefinite && (
                  <button
                    className="definite-toggle"
                    aria-expanded={definiteIsExpanded}
                    onClick={() => setExpandedDefiniteForms((current) => ({
                      ...current,
                      [item.id]: !current[item.id],
                    }))}
                  >
                    {definiteIsExpanded ? "Verberg bepaalde vormen" : "Toon bepaalde vormen"}
                  </button>
                )}
              </section>
              {definiteIsExpanded && (
                <section className="definite-section"><h3>Bepaalde vormen</h3>
                  <Field label="Bepaald" value={item.arabicDefiniteRaf} />
                  <Field label="Bepaald meervoud" value={item.arabicDefinitePluralRaf} />
                </section>
              )}
              <section><h3>Grammatica</h3>
                <Field label="Type" value={typeLabels[item.arabicType]} />
                {item.gender !== "none" && <Field label="Geslacht" value={genderLabels[item.gender]} />}
                <div className="word-list-meta"><span>Categorie</span><b>{categoryLabels[item.category]}</b></div>
              </section>
            </article>
          );
        })}
        {!entries.length && <div className="no-results">Geen woorden gevonden. Pas de filters aan.</div>}
      </div>
    </>
  );
}

function VocabularyMode({ items, onBack }: { items: VocabularyItem[]; onBack: () => void }) {
  const [activeVocabularyTab, setActiveVocabularyTab] = useState<"practice" | "list">("practice");
  const [style, setStyle] = useState<"choose" | FlashcardDirection | "quiz">("choose");
  if (style === "nl-ar" || style === "ar-nl") {
    return <FlashcardMode items={items} direction={style} onBack={() => setStyle("choose")} />;
  }
  if (style === "quiz") return <QuizMode title="Woordenschat • meerkeuze" initialQuestions={vocabularyQuestions(items, 10)} onBack={() => setStyle("choose")} />;
  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title"><p>Woordenschat</p><h2>{activeVocabularyTab === "practice" ? "Hoe wil je oefenen?" : "Woordenlijst"}</h2></div>
      <div className="vocabulary-tabs" role="tablist" aria-label="Woordenschatweergave">
        <button role="tab" aria-selected={activeVocabularyTab === "practice"} className={activeVocabularyTab === "practice" ? "active" : ""} onClick={() => setActiveVocabularyTab("practice")}>Oefenen</button>
        <button role="tab" aria-selected={activeVocabularyTab === "list"} className={activeVocabularyTab === "list" ? "active" : ""} onClick={() => setActiveVocabularyTab("list")}>Woordenlijst</button>
      </div>
      {activeVocabularyTab === "practice" ? (
        <div className="practice-choice">
          <button className="module-card" onClick={() => setStyle("nl-ar")}><span className="module-number">A</span><span><strong>Nederlands → Arabisch</strong><small>Lees het Nederlands en raad het Arabische woord.</small></span></button>
          <button className="module-card" onClick={() => setStyle("ar-nl")}><span className="module-number">B</span><span><strong>Arabisch → Nederlands</strong><small>Lees de Arabische vorm en raad de betekenis.</small></span></button>
          <button className="module-card" onClick={() => setStyle("quiz")}><span className="module-number">C</span><span><strong>Meerkeuze</strong><small>Kies het juiste Arabische woord uit vier opties.</small></span></button>
        </div>
      ) : <VocabularyListMode />}
    </section>
  );
}

function EmptyState({ onBack }: { onBack: () => void }) {
  return <div className="empty"><h2>Geen woorden in deze categorie</h2><p>Kies op het startscherm een andere categorie.</p><button onClick={onBack}>Terug naar start</button></div>;
}

function ResultsScreen({
  score,
  total,
  mistakes,
  onRetry,
  onHome,
}: {
  score: number;
  total: number;
  mistakes: Mistake[];
  onRetry: () => void;
  onHome: () => void;
}) {
  const percent = Math.round((score / total) * 100);
  return (
    <section className="results">
      <p className="eyebrow">Ronde klaar</p>
      <h2>{percent}%</h2>
      <p>Je had {score} van de {total} vragen goed.</p>
      {mistakes.length ? (
        <>
          <h3>Mijn fouten</h3>
          <div className="mistake-list">
            {mistakes.map((mistake, index) => (
              <article key={`${mistake.question.id}-${index}`}>
                <span>{mistake.question.prompt}</span>
                <b className="arabic">{mistake.question.answer}</b>
              </article>
            ))}
          </div>
          <button className="primary full" onClick={onRetry}>Oefen mijn fouten opnieuw</button>
        </>
      ) : <div className="perfect">Alles goed. Knap gedaan!</div>}
      <button className="secondary full" onClick={onHome}>Terug naar start</button>
    </section>
  );
}

function QuizMode({
  title,
  initialQuestions,
  onBack,
}: {
  title: string;
  initialQuestions: Question[];
  onBack: () => void;
}) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState<Mistake[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  if (!questions.length) return <EmptyState onBack={onBack} />;
  if (finished) {
    return <ResultsScreen score={score} total={questions.length} mistakes={mistakes} onHome={onBack} onRetry={() => {
      setQuestions(mistakes.map((mistake) => mistake.question));
      setIndex(0); setScore(0); setMistakes([]); setSelected(null); setRevealed(false); setFinished(false);
    }} />;
  }

  const choose = (answer: string) => {
    if (selected || revealed) return;
    setSelected(answer);
    if (normalizeAnswer(answer) === normalizeAnswer(question.answer)) setScore((value) => value + 1);
    else setMistakes((values) => [...values, { question, chosen: answer }]);
  };

  const selfMark = (correct: boolean) => {
    setSelected(correct ? question.answer : "Zelf als fout beoordeeld");
    if (correct) setScore((value) => value + 1);
    else setMistakes((values) => [...values, { question, chosen: "Zelf als fout beoordeeld" }]);
  };

  const next = () => {
    if (index + 1 >= questions.length) setFinished(true);
    else { setIndex((value) => value + 1); setSelected(null); setRevealed(false); }
  };

  const resetRound = () => {
    setQuestions(shuffleArray(initialQuestions));
    setIndex(0);
    setScore(0);
    setMistakes([]);
    setSelected(null);
    setRevealed(false);
    setFinished(false);
  };

  const answered = Boolean(selected);
  const isCorrect = selected === question.answer;
  return (
    <section>
      <div className="quiz-actions">
        <button className="back-link" onClick={onBack}>← Terug</button>
        <button className="back-link" onClick={resetRound}>Ronde opnieuw</button>
      </div>
      <div className="screen-title"><p>{title}</p><h2>{question.prompt}</h2>{question.detail && <span>{question.detail}</span>}</div>
      <ScoreBar current={index} total={questions.length} score={score} />
      {question.selfCheck ? (
        <div className="self-check">
          <p>Schrijf je antwoord met volledige tashkīl en eind-iʿrāb.</p>
          {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
          {revealed && (
            <>
              <div className="answer-reveal"><span>Het juiste antwoord is:</span><b className="arabic">{question.answer}</b></div>
              {!answered && <div className="two-buttons"><button className="correct" onClick={() => selfMark(true)}>Ik had het juist</button><button className="wrong" onClick={() => selfMark(false)}>Ik had het fout</button></div>}
              {answered && <button className="primary full" onClick={next}>Volgende</button>}
            </>
          )}
        </div>
      ) : (
        <div className="answer-grid">
          {question.options.map((option) => (
            <button
              key={option}
              className={`answer-option arabic ${selected === option ? (option === question.answer ? "chosen-correct" : "chosen-wrong") : ""}`}
              disabled={answered}
              onClick={() => choose(option)}
              dir="rtl"
            >{option}</button>
          ))}
          {!answered && <button className="show-answer" onClick={() => { setRevealed(true); setMistakes((values) => [...values, { question, chosen: "Antwoord getoond" }]); }}>Toon antwoord</button>}
        </div>
      )}
      {!question.selfCheck && (answered || revealed) && (
        <div className={`feedback ${isCorrect ? "good" : "try"}`}>
          <strong>{isCorrect ? "Goed!" : "Bijna. Het juiste antwoord is:"}</strong>
          {!isCorrect && <b className="arabic">{question.answer}</b>}
          {question.explanation && <p>{question.explanation}</p>}
          {answered && <button className="primary full" onClick={next}>Volgende</button>}
          {revealed && !question.selfCheck && <button className="primary full" onClick={next}>Volgende</button>}
        </div>
      )}
    </section>
  );
}

export default function App() {
  const [mode, setMode] = useState<Mode>("home");
  const [category, setCategory] = useState<"all" | Category>("all");
  const [roundKey, setRoundKey] = useState(0);
  const filtered = useMemo(
    () => category === "all" ? vocabulary : vocabulary.filter((item) => item.category === category),
    [category],
  );

  const goHome = () => { setMode("home"); setRoundKey((value) => value + 1); };
  const start = (nextMode: Exclude<Mode, "home">) => { setMode(nextMode); setRoundKey((value) => value + 1); };

  return (
    <main className="app-shell">
      {mode === "home" && <HomeScreen category={category} onCategory={setCategory} onStart={start} />}
      {mode === "vocabulary" && <VocabularyMode key={roundKey} items={filtered} onBack={goHome} />}
      {mode !== "home" && mode !== "vocabulary" && (
        <QuizMode
          key={`${mode}-${roundKey}`}
          title={modeLabels[mode].title}
          initialQuestions={makeQuestions(mode, filtered, mode === "exam" ? 20 : 10)}
          onBack={goHome}
        />
      )}
    </main>
  );
}
