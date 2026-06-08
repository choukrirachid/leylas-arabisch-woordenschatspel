import { useMemo, useState } from "react";
import {
  adadItems,
  getAdadForm,
  type AdadGender,
  type AdadItem,
} from "./adad";

type AdadMode =
  | "menu"
  | "learn"
  | "flashcards"
  | "multipleChoice"
  | "gender"
  | "matching"
  | "writing"
  | "exam";

type FlashcardDirection = "nl-ar" | "ar-nl";
type MatchingKind = "digit-masculine" | "digit-feminine" | "masculine-feminine";

const genderLabel = (gender: AdadGender) =>
  gender === "mudhakkar" ? "Mannelijk" : "Vrouwelijk";

const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
};

export const generateAdadOptions = (
  correct: string,
  allOptions: string[],
  count = 4,
): string[] =>
  shuffleArray([
    correct,
    ...shuffleArray([...new Set(allOptions.filter((option) => option !== correct))]).slice(0, count - 1),
  ]);

const randomGender = (): AdadGender => Math.random() < 0.5 ? "mudhakkar" : "muannath";

type FlashcardQuestion = {
  item: AdadItem;
  gender: AdadGender;
  arabic: string;
};

export const generateAdadFlashcardQuestions = (): FlashcardQuestion[] =>
  shuffleArray(adadItems.flatMap((item) =>
    (["mudhakkar", "muannath"] as AdadGender[]).map((gender) => ({
      item,
      gender,
      arabic: getAdadForm(item, gender),
    })),
  ));

function AdadHeader({
  eyebrow,
  title,
  onBack,
}: {
  eyebrow: string;
  title: string;
  onBack: () => void;
}) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title adad-title">
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
    </>
  );
}

function AdadProgress({ current, total, score }: { current: number; total: number; score?: number }) {
  return (
    <div className="score-wrap">
      <div className="score-line">
        <strong>Vraag {Math.min(current + 1, total)}/{total}</strong>
        {score !== undefined && <span>Score: {score}</span>}
      </div>
      <div className="progress"><span style={{ width: `${((current + 1) / total) * 100}%` }} /></div>
    </div>
  );
}

export function AdadLearnMode({ onBack }: { onBack: () => void }) {
  return (
    <section>
      <AdadHeader eyebrow="ʿAdad / Getallen" title="Leren" onBack={onBack} />
      <div className="adad-learn-list">
        {adadItems.map((item) => (
          <article className="adad-learn-card" key={item.value}>
            <div className="adad-number">{item.value}</div>
            <div className="adad-dutch">{item.dutch}</div>
            <div><span>Mannelijk</span><b className="arabic">{item.masculine}</b></div>
            <div><span>Vrouwelijk</span><b className="arabic">{item.feminine}</b></div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function AdadFlashcardsMode({ onBack }: { onBack: () => void }) {
  const [direction, setDirection] = useState<FlashcardDirection | null>(null);
  const [questions, setQuestions] = useState(generateAdadFlashcardQuestions);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const question = questions[index];

  const next = () => {
    if (index + 1 < questions.length) setIndex((value) => value + 1);
    else {
      setQuestions(generateAdadFlashcardQuestions());
      setIndex(0);
    }
    setRevealed(false);
  };

  if (!direction) {
    return (
      <section>
        <AdadHeader eyebrow="ʿAdad / Getallen" title="Flashcards" onBack={onBack} />
        <div className="practice-choice">
          <button className="module-card" onClick={() => setDirection("nl-ar")}>
            <span className="module-number">A</span>
            <span><strong>Nederlands/cijfer → Arabisch</strong><small>Raad de gevraagde mannelijke of vrouwelijke vorm.</small></span>
          </button>
          <button className="module-card" onClick={() => setDirection("ar-nl")}>
            <span className="module-number">B</span>
            <span><strong>Arabisch → Nederlands/cijfer</strong><small>Herken het getal en het geslacht.</small></span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <AdadHeader
        eyebrow={`Flashcards ${direction === "nl-ar" ? "Nederlands → Arabisch" : "Arabisch → Nederlands"}`}
        title={`${index + 1} / ${questions.length}`}
        onBack={() => setDirection(null)}
      />
      <article className="flashcard adad-flashcard">
        {direction === "nl-ar" ? (
          <>
            <div className="adad-question-number">{question.item.value}</div>
            <h3>{question.item.dutch}</h3>
            <p>Vorm: <strong>{genderLabel(question.gender)}</strong></p>
            {revealed && <div className="answer-reveal"><span>Het juiste antwoord is:</span><b className="arabic">{question.arabic}</b></div>}
          </>
        ) : (
          <>
            <b className="arabic adad-prompt">{question.arabic}</b>
            {revealed && (
              <div className="adad-answer-details">
                <p><span>Cijfer</span><strong>{question.item.value}</strong></p>
                <p><span>Nederlands</span><strong>{question.item.dutch}</strong></p>
                <p><span>Geslacht</span><strong>{genderLabel(question.gender)}</strong></p>
                <b className="arabic">{question.arabic}</b>
              </div>
            )}
          </>
        )}
        {!revealed
          ? <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>
          : <button className="primary full" onClick={next}>Volgende</button>}
      </article>
    </section>
  );
}

type ChoiceQuestion = {
  id: string;
  prompt: string;
  detail?: string;
  answer: string;
  options: string[];
  arabicPrompt?: boolean;
  arabicOptions?: boolean;
  explanation?: string;
};

const makeMultipleChoiceQuestions = (): ChoiceQuestion[] => {
  const allArabic = adadItems.flatMap((item) => [item.masculine, item.feminine]);
  return shuffleArray(adadItems.map((item, index) => {
    const gender = randomGender();
    const arabic = getAdadForm(item, gender);
    const kind = index % 3;
    if (kind === 0) {
      return {
        id: `digit-${item.value}`,
        prompt: `${item.value} — ${item.dutch}`,
        detail: `Vorm: ${genderLabel(gender)}`,
        answer: arabic,
        options: generateAdadOptions(arabic, allArabic),
        arabicOptions: true,
      };
    }
    if (kind === 1) {
      return {
        id: `arabic-digit-${item.value}`,
        prompt: arabic,
        detail: "Welk cijfer is dit?",
        answer: String(item.value),
        options: generateAdadOptions(String(item.value), adadItems.map((entry) => String(entry.value))),
        arabicPrompt: true,
      };
    }
    return {
      id: `arabic-gender-${item.value}`,
      prompt: arabic,
      detail: "Is dit mannelijk of vrouwelijk?",
      answer: genderLabel(gender),
      options: ["Mannelijk", "Vrouwelijk"],
      arabicPrompt: true,
    };
  }));
};

function ChoiceRound({
  title,
  questions: initialQuestions,
  onBack,
}: {
  title: string;
  questions: ChoiceQuestion[];
  onBack: () => void;
}) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  const restart = () => {
    setQuestions(shuffleArray(initialQuestions));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    return (
      <section className="results">
        <p className="eyebrow">{title} afgerond</p>
        <h2>{Math.round((score / questions.length) * 100)}%</h2>
        <p>Je had {score} van de {questions.length} vragen goed.</p>
        <button className="primary full" onClick={restart}>Nog een ronde</button>
        <button className="secondary full" onClick={onBack}>Terug</button>
      </section>
    );
  }

  const choose = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  };

  const next = () => {
    if (index + 1 === questions.length) setFinished(true);
    else {
      setIndex((value) => value + 1);
      setSelected(null);
    }
  };

  return (
    <section>
      <AdadHeader eyebrow="ʿAdad / Getallen" title={title} onBack={onBack} />
      <AdadProgress current={index} total={questions.length} score={score} />
      <div className="adad-question">
        <h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3>
        {question.detail && <p>{question.detail}</p>}
      </div>
      <div className="answer-grid">
        {question.options.map((option) => (
          <button
            key={option}
            className={`answer-option ${question.arabicOptions ? "arabic" : "adad-choice"} ${
              selected === option ? (option === question.answer ? "chosen-correct" : "chosen-wrong") : ""
            }`}
            disabled={Boolean(selected)}
            onClick={() => choose(option)}
          >{option}</button>
        ))}
      </div>
      {selected && (
        <div className={`feedback ${selected === question.answer ? "good" : "try"}`}>
          <strong>{selected === question.answer ? "Goed!" : "Het juiste antwoord is:"}</strong>
          {selected !== question.answer && <b className={question.arabicOptions ? "arabic" : ""}>{question.answer}</b>}
          {selected !== question.answer && question.explanation && <p>{question.explanation}</p>}
          <button className="primary full" onClick={next}>Volgende</button>
        </div>
      )}
    </section>
  );
}

export function AdadMultipleChoiceMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(makeMultipleChoiceQuestions, []);
  return <ChoiceRound title="Meerkeuze" questions={questions} onBack={onBack} />;
}

export function AdadGenderMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => generateAdadFlashcardQuestions().slice(0, 10).map((question) => ({
    id: `gender-${question.item.value}-${question.gender}`,
    prompt: question.arabic,
    detail: "Welke vorm is dit?",
    answer: genderLabel(question.gender),
    options: ["Mannelijk", "Vrouwelijk"],
    arabicPrompt: true,
    explanation: `Dit is de ${genderLabel(question.gender).toLowerCase()} vorm van ${question.item.dutch}.`,
  })), []);
  return <ChoiceRound title="Mannelijk of vrouwelijk" questions={questions} onBack={onBack} />;
}

type MatchCard = {
  id: string;
  pairId: number;
  side: "left" | "right";
  text: string;
  arabic: boolean;
};

const makeMatchCards = (kind: MatchingKind): MatchCard[] => {
  const selectedItems = shuffleArray(adadItems).slice(0, 5);
  return shuffleArray(selectedItems.flatMap((item) => {
    const left = kind === "masculine-feminine" ? item.masculine : String(item.value);
    const right = kind === "digit-masculine" ? item.masculine : item.feminine;
    return [
      { id: `${item.value}-left`, pairId: item.value, side: "left" as const, text: left, arabic: kind === "masculine-feminine" },
      { id: `${item.value}-right`, pairId: item.value, side: "right" as const, text: right, arabic: true },
    ];
  }));
};

export function AdadMatchingMode({ onBack }: { onBack: () => void }) {
  const [kind, setKind] = useState<MatchingKind | null>(null);
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selected, setSelected] = useState<MatchCard | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [feedback, setFeedback] = useState("");

  const startRound = (nextKind: MatchingKind) => {
    setKind(nextKind);
    setCards(makeMatchCards(nextKind));
    setSelected(null);
    setMatched([]);
    setFeedback("");
  };

  const choose = (card: MatchCard) => {
    if (matched.includes(card.pairId)) return;
    if (!selected) {
      setSelected(card);
      setFeedback("");
      return;
    }
    if (selected.id === card.id) {
      setSelected(null);
      return;
    }
    if (selected.pairId === card.pairId && selected.side !== card.side) {
      setMatched((values) => [...values, card.pairId]);
      setFeedback("Goed gekoppeld!");
    } else {
      setFeedback("Deze twee horen niet bij elkaar.");
    }
    setSelected(null);
  };

  if (!kind) {
    return (
      <section>
        <AdadHeader eyebrow="ʿAdad / Getallen" title="Koppelspel" onBack={onBack} />
        <div className="practice-choice adad-match-menu">
          <button className="module-card" onClick={() => startRound("digit-masculine")}><span className="module-number">A</span><span><strong>Cijfer ↔ mannelijk</strong><small>Koppel vijf cijfers aan de mannelijke vorm.</small></span></button>
          <button className="module-card" onClick={() => startRound("digit-feminine")}><span className="module-number">B</span><span><strong>Cijfer ↔ vrouwelijk</strong><small>Koppel vijf cijfers aan de vrouwelijke vorm.</small></span></button>
          <button className="module-card" onClick={() => startRound("masculine-feminine")}><span className="module-number">C</span><span><strong>Mannelijk ↔ vrouwelijk</strong><small>Koppel beide vormen van hetzelfde getal.</small></span></button>
        </div>
      </section>
    );
  }

  const complete = matched.length === 5;
  return (
    <section>
      <AdadHeader eyebrow="Koppelspel" title="Tik twee kaarten aan" onBack={() => setKind(null)} />
      <p className="adad-match-status">{matched.length}/5 paren gevonden</p>
      <div className="adad-match-grid">
        {cards.map((card) => (
          <button
            key={card.id}
            className={`adad-match-card ${card.arabic ? "arabic" : ""} ${
              selected?.id === card.id ? "selected" : ""
            } ${matched.includes(card.pairId) ? "matched" : ""}`}
            disabled={matched.includes(card.pairId)}
            onClick={() => choose(card)}
          >{card.text}</button>
        ))}
      </div>
      {feedback && <div className={`adad-inline-feedback ${feedback.startsWith("Goed") ? "good" : "try"}`}>{feedback}</div>}
      {complete && <button className="primary full" onClick={() => startRound(kind)}>Nieuwe ronde</button>}
    </section>
  );
}

type WritingQuestion = {
  id: string;
  prompt: string;
  answer: string;
};

const makeWritingQuestions = (): WritingQuestion[] =>
  shuffleArray(adadItems.flatMap((item) => ([
    {
      id: `write-m-${item.value}`,
      prompt: `Schrijf in het Arabisch: ${item.dutch}, mannelijk`,
      answer: item.masculine,
    },
    {
      id: `write-f-${item.value}`,
      prompt: `Schrijf in het Arabisch: ${item.dutch}, vrouwelijk`,
      answer: item.feminine,
    },
    {
      id: `convert-f-${item.value}`,
      prompt: `Maak vrouwelijk: ${item.masculine}`,
      answer: item.feminine,
    },
    {
      id: `convert-m-${item.value}`,
      prompt: `Maak mannelijk: ${item.feminine}`,
      answer: item.masculine,
    },
  ])));

export function AdadWritingMode({ onBack }: { onBack: () => void }) {
  const [questions, setQuestions] = useState(makeWritingQuestions);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const question = questions[index];

  const mark = (correct: boolean) => {
    setMarked(correct);
    if (correct) setScore((value) => value + 1);
  };
  const next = () => {
    if (index + 1 === questions.length) {
      setQuestions(makeWritingQuestions());
      setIndex(0);
      setScore(0);
    } else setIndex((value) => value + 1);
    setRevealed(false);
    setMarked(null);
  };

  return (
    <section>
      <AdadHeader eyebrow="ʿAdad / Getallen" title="Schrijf op papier" onBack={onBack} />
      <AdadProgress current={index} total={questions.length} score={score} />
      <div className="self-check adad-writing">
        <h3>{question.prompt}</h3>
        <p>Schrijf je antwoord met volledige tashkīl en eind-iʿrāb.</p>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && (
          <>
            <div className="answer-reveal"><span>Het juiste antwoord is:</span><b className="arabic">{question.answer}</b></div>
            {marked === null
              ? <div className="two-buttons"><button className="correct" onClick={() => mark(true)}>Ik had het juist</button><button className="wrong" onClick={() => mark(false)}>Ik had het fout</button></div>
              : <button className="primary full" onClick={next}>Volgende</button>}
          </>
        )}
      </div>
    </section>
  );
}

type ExamQuestion = ChoiceQuestion & {
  selfCheck?: boolean;
};

export const generateAdadExamQuestions = (): ExamQuestion[] => {
  const allArabic = adadItems.flatMap((item) => [item.masculine, item.feminine]);
  const digitToArabic = shuffleArray(adadItems).slice(0, 5).map((item) => {
    const gender = randomGender();
    const answer = getAdadForm(item, gender);
    return {
      id: `exam-digit-${item.value}-${gender}`,
      prompt: `${item.value} — ${item.dutch}`,
      detail: `Kies de ${genderLabel(gender).toLowerCase()} vorm.`,
      answer,
      options: generateAdadOptions(answer, allArabic),
      arabicOptions: true,
    };
  });
  const arabicToDigit = shuffleArray(adadItems).slice(0, 5).map((item) => {
    const gender = randomGender();
    return {
      id: `exam-arabic-${item.value}-${gender}`,
      prompt: getAdadForm(item, gender),
      detail: "Welk cijfer is dit?",
      answer: String(item.value),
      options: generateAdadOptions(String(item.value), adadItems.map((entry) => String(entry.value))),
      arabicPrompt: true,
    };
  });
  const genderQuestions = generateAdadFlashcardQuestions().slice(0, 4).map((question) => ({
    id: `exam-gender-${question.item.value}-${question.gender}`,
    prompt: question.arabic,
    detail: "Is dit mannelijk of vrouwelijk?",
    answer: genderLabel(question.gender),
    options: ["Mannelijk", "Vrouwelijk"],
    arabicPrompt: true,
  }));
  const toFeminine = shuffleArray(adadItems).slice(0, 3).map((item) => ({
    id: `exam-to-f-${item.value}`,
    prompt: `Maak vrouwelijk: ${item.masculine}`,
    answer: item.feminine,
    options: [],
    selfCheck: true,
  }));
  const toMasculine = shuffleArray(adadItems).slice(0, 3).map((item) => ({
    id: `exam-to-m-${item.value}`,
    prompt: `Maak mannelijk: ${item.feminine}`,
    answer: item.masculine,
    options: [],
    selfCheck: true,
  }));
  return shuffleArray([...digitToArabic, ...arabicToDigit, ...genderQuestions, ...toFeminine, ...toMasculine]);
};

type ExamMistake = {
  question: ExamQuestion;
  chosen: string;
};

export function AdadExamMode({ onBack }: { onBack: () => void }) {
  const [questions, setQuestions] = useState(generateAdadExamQuestions);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [mistakes, setMistakes] = useState<ExamMistake[]>([]);
  const [finished, setFinished] = useState(false);
  const question = questions[index];

  const mark = (correct: boolean, chosen: string) => {
    setSelected(chosen);
    if (correct) setScore((value) => value + 1);
    else setMistakes((values) => [...values, { question, chosen }]);
  };
  const next = () => {
    if (index + 1 === questions.length) setFinished(true);
    else {
      setIndex((value) => value + 1);
      setSelected(null);
      setRevealed(false);
    }
  };
  const restart = (retryMistakes: boolean) => {
    setQuestions(retryMistakes && mistakes.length ? shuffleArray(mistakes.map((mistake) => mistake.question)) : generateAdadExamQuestions());
    setIndex(0);
    setScore(0);
    setSelected(null);
    setRevealed(false);
    setMistakes([]);
    setFinished(false);
  };

  if (finished) {
    return (
      <section className="results">
        <p className="eyebrow">Examen ʿAdad afgerond</p>
        <h2>{Math.round((score / questions.length) * 100)}%</h2>
        <p>Je had {score} van de {questions.length} vragen goed.</p>
        {mistakes.length > 0 && (
          <>
            <h3>Foutenlijst</h3>
            <div className="mistake-list">
              {mistakes.map((mistake, mistakeIndex) => (
                <article key={`${mistake.question.id}-${mistakeIndex}`}>
                  <span>{mistake.question.prompt}</span>
                  <b className="arabic">{mistake.question.answer}</b>
                </article>
              ))}
            </div>
            <button className="primary full" onClick={() => restart(true)}>Oefen mijn fouten opnieuw</button>
          </>
        )}
        <button className="secondary full" onClick={onBack}>Terug naar start</button>
      </section>
    );
  }

  const answered = selected !== null;
  return (
    <section>
      <AdadHeader eyebrow="ʿAdad / Getallen" title="Examen ʿAdad" onBack={onBack} />
      <AdadProgress current={index} total={questions.length} score={score} />
      <div className="adad-question">
        <h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3>
        {question.detail && <p>{question.detail}</p>}
      </div>
      {question.selfCheck ? (
        <div className="self-check">
          <p>Schrijf je antwoord op papier met volledige tashkīl en eind-iʿrāb.</p>
          {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
          {revealed && (
            <>
              <div className="answer-reveal"><span>Het juiste antwoord is:</span><b className="arabic">{question.answer}</b></div>
              {!answered
                ? <div className="two-buttons"><button className="correct" onClick={() => mark(true, question.answer)}>Ik had het juist</button><button className="wrong" onClick={() => mark(false, "Zelf als fout beoordeeld")}>Ik had het fout</button></div>
                : <button className="primary full" onClick={next}>Volgende</button>}
            </>
          )}
        </div>
      ) : (
        <>
          <div className="answer-grid">
            {question.options.map((option) => (
              <button
                key={option}
                className={`answer-option ${question.arabicOptions ? "arabic" : "adad-choice"} ${
                  selected === option ? (option === question.answer ? "chosen-correct" : "chosen-wrong") : ""
                }`}
                disabled={answered}
                onClick={() => mark(option === question.answer, option)}
              >{option}</button>
            ))}
          </div>
          {answered && (
            <div className={`feedback ${selected === question.answer ? "good" : "try"}`}>
              <strong>{selected === question.answer ? "Goed!" : "Het juiste antwoord is:"}</strong>
              {selected !== question.answer && <b className={question.arabicOptions ? "arabic" : ""}>{question.answer}</b>}
              <button className="primary full" onClick={next}>Volgende</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

const menuItems: { mode: Exclude<AdadMode, "menu">; title: string; subtitle: string }[] = [
  { mode: "learn", title: "Leren", subtitle: "Bekijk alle mannelijke en vrouwelijke vormen." },
  { mode: "flashcards", title: "Flashcards", subtitle: "Raad het antwoord en draai de kaart om." },
  { mode: "multipleChoice", title: "Meerkeuze", subtitle: "Oefen cijfers, Arabisch en geslacht." },
  { mode: "gender", title: "Mannelijk of vrouwelijk", subtitle: "Herken de twee getallenreeksen." },
  { mode: "matching", title: "Koppelspel", subtitle: "Vind vijf bij elkaar horende paren." },
  { mode: "writing", title: "Schrijf op papier", subtitle: "Schrijf en controleer je eigen antwoord." },
  { mode: "exam", title: "Examen ʿAdad", subtitle: "Maak twintig gemengde vragen." },
];

export function AdadModule({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<AdadMode>("menu");
  if (mode === "learn") return <AdadLearnMode onBack={() => setMode("menu")} />;
  if (mode === "flashcards") return <AdadFlashcardsMode onBack={() => setMode("menu")} />;
  if (mode === "multipleChoice") return <AdadMultipleChoiceMode onBack={() => setMode("menu")} />;
  if (mode === "gender") return <AdadGenderMode onBack={() => setMode("menu")} />;
  if (mode === "matching") return <AdadMatchingMode onBack={() => setMode("menu")} />;
  if (mode === "writing") return <AdadWritingMode onBack={() => setMode("menu")} />;
  if (mode === "exam") return <AdadExamMode onBack={onBack} />;

  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title adad-title">
        <p>Getallen 1 t/m 10</p>
        <h2>ʿAdad / Getallen</h2>
        <span>Oefen de mannelijke en vrouwelijke vormen.</span>
      </div>
      <div className="module-grid adad-module-grid">
        {menuItems.map((item, index) => (
          <button className="module-card" key={item.mode} onClick={() => setMode(item.mode)}>
            <span className="module-number">{index + 1}</span>
            <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
          </button>
        ))}
      </div>
    </section>
  );
}
