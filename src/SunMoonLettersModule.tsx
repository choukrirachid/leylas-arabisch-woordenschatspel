import { useMemo, useState } from "react";
import {
  classifySunMoonLetter,
  getFirstArabicLetter,
  moonLetters,
  stripTashkeel,
  sunLetters,
  sunMoonExampleWords,
  type SunMoonType,
} from "./sunMoonLetters";
import { vocabulary } from "./vocabulary";

type SunMoonMode = "menu" | "learn" | "letter" | "definite" | "word" | "plain" | "writing";

type PracticeWord = {
  id: string;
  dutch: string;
  indefinite: string;
  definite: string;
  definiteNoTashkeel: string;
  type: SunMoonType;
};

type ChoiceQuestion = {
  prompt: string;
  answer: string;
  options: string[];
  explanation: string;
  arabicPrompt?: boolean;
  arabicOptions?: boolean;
  letterPrompt?: boolean;
};

const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
};

const typeLabel = (type: SunMoonType) => type === "sun" ? "Zonneletter" : "Maanletter";
const arabicTypeLabel = (type: SunMoonType) => type === "sun" ? "حَرْف شَمْسِيّ" : "حَرْف قَمَرِيّ";

const vocabularyWords: PracticeWord[] = vocabulary
  .filter((item) =>
    item.arabicType === "ism"
    && item.category !== "numbers"
    && item.category !== "adjectives"
    && item.arabicIndefiniteRaf
    && item.arabicDefiniteRaf,
  )
  .map((item) => ({
    id: item.id,
    dutch: item.dutchDefiniteSingular ?? item.dutchIndefiniteSingular,
    indefinite: item.arabicIndefiniteRaf!,
    definite: item.arabicDefiniteRaf!,
    definiteNoTashkeel: stripTashkeel(item.arabicDefiniteRaf!),
    type: classifySunMoonLetter(item.arabicDefiniteRaf!),
  }));

const practiceWords: PracticeWord[] = [
  ...sunMoonExampleWords.map((word, index) => ({ ...word, id: `fixed-${index}` })),
  ...vocabularyWords,
];

const removeFirstShadda = (word: string) => word.replace("ّ", "");

const addWrongShadda = (word: string) => {
  const withoutArticleSukun = word.replace(/^الْ/, "ال");
  let index = 2;
  while (index < withoutArticleSukun.length && /[\u0610-\u061A\u064B-\u065F\u0670]/.test(withoutArticleSukun[index])) index += 1;
  if (index >= withoutArticleSukun.length) return `${withoutArticleSukun}ّ`;
  let insertionPoint = index + 1;
  while (insertionPoint < withoutArticleSukun.length && /[\u0610-\u061A\u064B-\u065F\u0670]/.test(withoutArticleSukun[insertionPoint])) insertionPoint += 1;
  return `${withoutArticleSukun.slice(0, insertionPoint)}ّ${withoutArticleSukun.slice(insertionPoint)}`;
};

const wrongDefiniteForm = (word: PracticeWord) =>
  word.type === "sun" ? removeFirstShadda(word.definite) : addWrongShadda(word.definite);

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title sm-title">
        <p>الحروف الشمسية والقمرية</p>
        <h2>{title}</h2>
      </div>
    </>
  );
}

function Progress({ index, total }: { index: number; total: number }) {
  return (
    <div className="score-wrap">
      <div className="score-line"><strong>Vraag {index + 1}/{total}</strong></div>
      <div className="progress"><span style={{ width: `${((index + 1) / total) * 100}%` }} /></div>
    </div>
  );
}

const menuItems: { mode: Exclude<SunMoonMode, "menu">; title: string; subtitle: string }[] = [
  { mode: "learn", title: "Leren", subtitle: "Leer de letters, de shadda en duidelijke voorbeelden." },
  { mode: "letter", title: "Herken de lettergroep", subtitle: "Kies bij één letter: zonneletter of maanletter." },
  { mode: "definite", title: "Kies de juiste bepaalde vorm", subtitle: "Kies de correcte vorm met الـ." },
  { mode: "word", title: "Zonneletter of maanletter?", subtitle: "Herken bepaalde woorden met tashkīl." },
  { mode: "plain", title: "Zonder tashkīl herkennen", subtitle: "Kijk naar de eerste letter na الـ." },
  { mode: "writing", title: "Schrijf op papier", subtitle: "Schrijf de bepaalde vorm en controleer jezelf." },
];

function SunMoonMenu({ onSelect, onBack }: {
  onSelect: (mode: Exclude<SunMoonMode, "menu">) => void;
  onBack: () => void;
}) {
  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title sm-title">
        <p>الحروف الشمسية والقمرية</p>
        <h2>Zonneletters / maanletters</h2>
      </div>
      <div className="module-grid sm-menu">
        {menuItems.map((item, index) => (
          <button className="module-card" key={item.mode} onClick={() => onSelect(item.mode)}>
            <span className="module-number">{index + 1}</span>
            <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
          </button>
        ))}
      </div>
    </section>
  );
}

function LetterBadge({ type }: { type: SunMoonType }) {
  return (
    <div className="sm-badges">
      <span>{typeLabel(type)}</span>
      <span className="arabic">{arabicTypeLabel(type)}</span>
    </div>
  );
}

function Example({ word }: { word: PracticeWord }) {
  return (
    <div className="sm-example">
      <b className="arabic">{word.definite}</b>
      <span className="arabic sm-plain-word">{word.definiteNoTashkeel}</span>
      <span>{word.dutch}</span>
      <LetterBadge type={word.type} />
    </div>
  );
}

export function SunMoonLearnMode({ onBack }: { onBack: () => void }) {
  const examples = useMemo(() => {
    const sun = vocabularyWords.filter((word) => word.type === "sun").slice(0, 5);
    const moon = vocabularyWords.filter((word) => word.type === "moon").slice(0, 5);
    return [...sun, ...moon];
  }, []);
  return (
    <section>
      <Header title="Leren" onBack={onBack} />
      <div className="sm-learn-list">
        <article className="sm-theory-card">
          <h3>1. Wat zijn zonneletters en maanletters?</h3>
          <p>Als een woord bepaald wordt met <strong>الـ</strong>, kijken we naar de eerste letter van het woord.</p>
          <p>Bij <strong>الحروف الشمسية</strong> krijgt de eerste letter shadda en spreken we de ل niet uit. Bij <strong>الحروف القمرية</strong> blijft de lām van الـ hoorbaar.</p>
        </article>
        <article className="sm-theory-card">
          <h3>2. Zonneletters — الحروف الشمسية</h3>
          <div className="sm-letter-row arabic">{sunLetters.join(" ")}</div>
          <div className="sm-example-grid">
            <Example word={practiceWords.find((word) => word.id === "fixed-0")!} />
            <Example word={practiceWords.find((word) => word.id === "fixed-2")!} />
            <Example word={vocabularyWords.find((word) => word.id === "car")!} />
          </div>
        </article>
        <article className="sm-theory-card">
          <h3>3. Maanletters — الحروف القمرية</h3>
          <div className="sm-letter-row arabic">ا ب ج ح خ ع غ ف ق ك م هـ و ي</div>
          <div className="sm-example-grid">
            <Example word={practiceWords.find((word) => word.id === "fixed-1")!} />
            <Example word={vocabularyWords.find((word) => word.id === "book")!} />
            <Example word={vocabularyWords.find((word) => word.id === "pen")!} />
          </div>
        </article>
        <article className="sm-theory-card">
          <h3>4. Let op de shadda</h3>
          <div className="sm-compare">
            <div><b className="arabic">شَمْسٌ ← الشَّمْسُ</b><span>Shadda op ش</span></div>
            <div><b className="arabic">قَمَرٌ ← الْقَمَرُ</b><span>Sukūn op ل, geen shadda op ق</span></div>
          </div>
        </article>
        <article className="sm-theory-card">
          <h3>5. Met en zonder tashkīl</h3>
          <p>Zonder tashkīl kijk je nog steeds naar de eerste letter na <strong>الـ</strong>.</p>
          <div className="sm-plain-grid">
            <span><b className="arabic">الشمس</b> → ش → zonneletter</span>
            <span><b className="arabic">القمر</b> → ق → maanletter</span>
            <span><b className="arabic">السيارة</b> → س → zonneletter</span>
            <span><b className="arabic">الكتاب</b> → ك → maanletter</span>
          </div>
        </article>
        <article className="sm-theory-card">
          <h3>6. Voorbeelden uit de woordenlijst</h3>
          <div className="sm-example-grid">{examples.map((word) => <Example word={word} key={word.id} />)}</div>
        </article>
      </div>
    </section>
  );
}

function ChoiceRound({ title, questions, onBack }: {
  title: string;
  questions: ChoiceQuestion[];
  onBack: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const question = questions[index];
  const next = () => {
    setIndex((value) => (value + 1) % questions.length);
    setSelected(null);
  };
  return (
    <section>
      <Header title={title} onBack={onBack} />
      <Progress index={index} total={questions.length} />
      <div className="sm-question">
        <h3 className={`${question.arabicPrompt ? "arabic" : ""} ${question.letterPrompt ? "sm-letter-prompt" : ""}`}>{question.prompt}</h3>
      </div>
      <div className="answer-grid sm-answer-grid">
        {question.options.map((option) => (
          <button
            key={option}
            className={`answer-option ${question.arabicOptions ? "arabic" : "sm-text-option"} ${selected === option ? option === question.answer ? "chosen-correct" : "chosen-wrong" : ""}`}
            disabled={Boolean(selected)}
            onClick={() => setSelected(option)}
          >{option}</button>
        ))}
      </div>
      {selected && (
        <div className={`feedback ${selected === question.answer ? "good" : "try"}`}>
          <strong>{selected === question.answer ? "Goed!" : `Het juiste antwoord is: ${question.answer}.`}</strong>
          <p>{question.explanation}</p>
          <button className="primary full" onClick={next}>Volgende</button>
        </div>
      )}
    </section>
  );
}

export function SunMoonRecognizeLetterMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray([
    ...sunLetters.map((letter) => ({ letter, type: "sun" as const })),
    ...moonLetters.map((letter) => ({ letter, type: "moon" as const })),
  ]).map(({ letter, type }) => ({
    prompt: letter,
    answer: typeLabel(type),
    options: ["Zonneletter", "Maanletter"],
    explanation: `${letter} is een ${typeLabel(type).toLowerCase()}.`,
    arabicPrompt: true,
    letterPrompt: true,
  })), []);
  return <ChoiceRound title="Herken de lettergroep" questions={questions} onBack={onBack} />;
}

export function SunMoonChooseDefiniteFormMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(practiceWords).slice(0, 20).map((word) => ({
    prompt: word.indefinite,
    answer: word.definite,
    options: shuffleArray([word.definite, wrongDefiniteForm(word)]),
    explanation: word.type === "sun"
      ? `De eerste letter is ${getFirstArabicLetter(word.indefinite)}. Dat is een zonneletter, dus die letter krijgt shadda.`
      : `De eerste letter is ${getFirstArabicLetter(word.indefinite)}. Dat is een maanletter, dus de lām van الـ blijft hoorbaar.`,
    arabicPrompt: true,
    arabicOptions: true,
  })), []);
  return <ChoiceRound title="Kies de juiste bepaalde vorm" questions={questions} onBack={onBack} />;
}

const classifyQuestions = (withoutTashkeel: boolean): ChoiceQuestion[] =>
  shuffleArray(practiceWords).slice(0, 20).map((word) => {
    const firstLetter = getFirstArabicLetter(word.definite);
    return {
      prompt: withoutTashkeel ? word.definiteNoTashkeel : word.definite,
      answer: typeLabel(word.type),
      options: ["Zonneletter", "Maanletter"],
      explanation: `De eerste letter na الـ is ${firstLetter}. Dat is een ${typeLabel(word.type).toLowerCase()}.`,
      arabicPrompt: true,
    };
  });

export function SunMoonClassifyWordMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => classifyQuestions(false), []);
  return <ChoiceRound title="Zonneletter of maanletter?" questions={questions} onBack={onBack} />;
}

export function SunMoonNoTashkeelMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => classifyQuestions(true), []);
  return <ChoiceRound title="Zonder tashkīl herkennen" questions={questions} onBack={onBack} />;
}

export function SunMoonWritingMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(practiceWords).slice(0, 15), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(false);
  const word = questions[index];
  const next = () => {
    setIndex((value) => (value + 1) % questions.length);
    setRevealed(false);
    setMarked(false);
  };
  return (
    <section>
      <Header title="Schrijf op papier" onBack={onBack} />
      <Progress index={index} total={questions.length} />
      <div className="self-check sm-writing">
        <h3>Schrijf bepaald:</h3>
        <b className="arabic">{word.indefinite}</b>
        <p>Let op الـ, shadda en volledige tashkīl.</p>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && (
          <>
            <div className="answer-reveal">
              <span>Het juiste antwoord is:</span>
              <b className="arabic">{word.definite}</b>
              <p>De eerste letter is {getFirstArabicLetter(word.indefinite)}: {typeLabel(word.type).toLowerCase()}.</p>
            </div>
            {!marked
              ? <div className="two-buttons"><button className="correct" onClick={() => setMarked(true)}>Ik had het juist</button><button className="wrong" onClick={() => setMarked(true)}>Ik had het fout</button></div>
              : <button className="primary full" onClick={next}>Volgende</button>}
          </>
        )}
      </div>
    </section>
  );
}

export function SunMoonLettersModule({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<SunMoonMode>("menu");
  if (mode === "menu") return <SunMoonMenu onSelect={setMode} onBack={onBack} />;
  const backToMenu = () => setMode("menu");
  if (mode === "learn") return <SunMoonLearnMode onBack={backToMenu} />;
  if (mode === "letter") return <SunMoonRecognizeLetterMode onBack={backToMenu} />;
  if (mode === "definite") return <SunMoonChooseDefiniteFormMode onBack={backToMenu} />;
  if (mode === "word") return <SunMoonClassifyWordMode onBack={backToMenu} />;
  if (mode === "plain") return <SunMoonNoTashkeelMode onBack={backToMenu} />;
  return <SunMoonWritingMode onBack={backToMenu} />;
}

