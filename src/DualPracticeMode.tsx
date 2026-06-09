import { useMemo, useState } from "react";
import type { VocabularyItem } from "./vocabulary";

type DualMode =
  | "intro" | "menu" | "learn" | "flashcards" | "multipleChoice"
  | "case" | "make" | "writing" | "exam";
type Direction = "nl-ar" | "ar-nl";

export function getDualEligibleItems(items: VocabularyItem[]) {
  return items.filter(
    (item) => item.arabicType === "ism" && item.arabicDualRaf && item.dutchDual,
  ) as (VocabularyItem & { arabicDualRaf: string; dutchDual: string })[];
}

export function hasDualJarr(item: VocabularyItem) {
  return Boolean(item.arabicDualJarr);
}

const shuffle = <T,>(items: T[]) => {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
};

const options = (correct: string, pool: string[], count = 4) =>
  shuffle([correct, ...shuffle([...new Set(pool.filter((value) => value && value !== correct))]).slice(0, count - 1)]);

const genderLabel = (item: VocabularyItem) =>
  item.gender === "muannath" ? "مُؤَنَّث" : "مُذَكَّر";

function Header({ title, eyebrow = "Tweevoud oefenen", onBack }: {
  title: string;
  eyebrow?: string;
  onBack: () => void;
}) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title"><p>{eyebrow}</p><h2>{title}</h2></div>
    </>
  );
}

function Progress({ index, total, score }: { index: number; total: number; score?: number }) {
  return (
    <div className="score-wrap">
      <div className="score-line"><strong>Vraag {Math.min(index + 1, total)}/{total}</strong>{score !== undefined && <span>Score: {score}</span>}</div>
      <div className="progress"><span style={{ width: `${((index + 1) / total) * 100}%` }} /></div>
    </div>
  );
}

function DualIntro({ items, onStart, onBack }: {
  items: ReturnType<typeof getDualEligibleItems>;
  onStart: () => void;
  onBack: () => void;
}) {
  const masculine = items.find((item) => item.gender === "mudhakkar") ?? items[0];
  const feminine = items.find((item) => item.gender === "muannath") ?? items[1] ?? items[0];
  return (
    <section>
      <Header title="Wat is tweevoud?" onBack={onBack} />
      <article className="dual-explanation">
        <p>In het Arabisch heeft een woord aparte vormen voor <strong>twee</strong>.</p>
        {masculine && (
          <div className="dual-example">
            <span>{masculine.dutchIndefiniteSingular}</span><b className="arabic">{masculine.arabicIndefiniteRaf}</b>
            <span>{masculine.dutchDual}</span><b className="arabic">{masculine.arabicDualRaf}</b>
            {masculine.arabicDualJarr && <><span>Na فِي of عَلَى</span><b className="arabic">{masculine.arabicDualJarr}</b></>}
          </div>
        )}
        <div className="dual-rule-grid">
          <div><b className="arabic">ـَانِ</b><span>Gewone tweevoudsvorm</span></div>
          <div><b className="arabic">ـَيْنِ</b><span>Na فِي of عَلَى</span></div>
        </div>
        {feminine && feminine.id !== masculine?.id && (
          <>
            <h3>Bij vrouwelijke woorden</h3>
            <div className="dual-example">
              <span>{feminine.dutchIndefiniteSingular}</span><b className="arabic">{feminine.arabicIndefiniteRaf}</b>
              <span>{feminine.dutchDual}</span><b className="arabic">{feminine.arabicDualRaf}</b>
              {feminine.arabicDualJarr && <><span>Na فِي of عَلَى</span><b className="arabic">{feminine.arabicDualJarr}</b></>}
            </div>
          </>
        )}
        <button className="primary full" onClick={onStart}>Start oefenen</button>
      </article>
    </section>
  );
}

export function DualLearnMode({ items, onBack }: {
  items: ReturnType<typeof getDualEligibleItems>;
  onBack: () => void;
}) {
  return (
    <section>
      <Header title="Leren" onBack={onBack} />
      <div className="dual-learn-list">
        {items.map((item) => (
          <article className="dual-learn-card" key={item.id}>
            <section><h3>Nederlands</h3><b>{item.dutchIndefiniteSingular}</b><span>{item.dutchDual}</span></section>
            <section><h3>Arabisch</h3>
              <div><span>Enkelvoud</span><b className="arabic">{item.arabicIndefiniteRaf}</b></div>
              <div><span>Tweevoud rafʿ</span><b className="arabic">{item.arabicDualRaf}</b></div>
              {item.arabicDualJarr && <div><span>Na فِي / عَلَى</span><b className="arabic">{item.arabicDualJarr}</b></div>}
            </section>
            <section><h3>Grammatica</h3><span>Type: اِسْم</span><span>Geslacht: <b className="arabic dual-grammar">{genderLabel(item)}</b></span></section>
          </article>
        ))}
      </div>
    </section>
  );
}

export function DualFlashcardsMode({ items, onBack }: {
  items: ReturnType<typeof getDualEligibleItems>;
  onBack: () => void;
}) {
  const [direction, setDirection] = useState<Direction | null>(null);
  const [cards, setCards] = useState(() => shuffle(items));
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const item = cards[index];
  const next = () => {
    if (index + 1 === cards.length) { setCards(shuffle(items)); setIndex(0); }
    else setIndex((value) => value + 1);
    setRevealed(false);
  };
  if (!direction) {
    return (
      <section>
        <Header title="Flashcards" onBack={onBack} />
        <div className="practice-choice">
          <button className="module-card" onClick={() => setDirection("nl-ar")}><span className="module-number">A</span><span><strong>Nederlands → Arabisch</strong><small>Raad de Arabische tweevoudsvorm.</small></span></button>
          <button className="module-card" onClick={() => setDirection("ar-nl")}><span className="module-number">B</span><span><strong>Arabisch → Nederlands</strong><small>Herken de Nederlandse twee-vorm.</small></span></button>
        </div>
      </section>
    );
  }
  return (
    <section>
      <Header title={`${index + 1} / ${cards.length}`} eyebrow={`Flashcards ${direction === "nl-ar" ? "Nederlands → Arabisch" : "Arabisch → Nederlands"}`} onBack={() => setDirection(null)} />
      <article className="flashcard dual-flashcard">
        {direction === "nl-ar"
          ? <h3 className="dual-dutch-question">{item.dutchDual}</h3>
          : <h3 className="arabic flashcard-question">{item.arabicDualRaf}</h3>}
        {revealed && (
          <div className="dual-answer">
            {direction === "nl-ar"
              ? <><div><span>Tweevoud rafʿ</span><b className="arabic">{item.arabicDualRaf}</b></div><div><span>Enkelvoud</span><b className="arabic">{item.arabicIndefiniteRaf}</b></div>{item.arabicDualJarr && <div><span>Majrūr</span><b className="arabic">{item.arabicDualJarr}</b></div>}</>
              : <><div><span>Nederlands</span><b>{item.dutchDual}</b></div><div><span>Enkelvoud</span><b className="arabic">{item.arabicIndefiniteRaf}</b></div><div><span>Vorm</span><b>Tweevoud rafʿ</b></div></>}
          </div>
        )}
      </article>
      {!revealed ? <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button> : <button className="primary full" onClick={next}>Volgende</button>}
    </section>
  );
}

type ChoiceQuestion = {
  id: string;
  prompt: string;
  answer: string;
  options: string[];
  arabicPrompt?: boolean;
  arabicOptions?: boolean;
  explanation?: string;
};

function ChoiceRound({ title, initialQuestions, onBack }: {
  title: string;
  initialQuestions: ChoiceQuestion[];
  onBack: () => void;
}) {
  const [questions, setQuestions] = useState(initialQuestions);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  if (finished) {
    return (
      <section className="results"><p className="eyebrow">{title} afgerond</p><h2>{Math.round(score / questions.length * 100)}%</h2><p>{score} van {questions.length} goed.</p>
        <button className="primary full" onClick={() => { setQuestions(shuffle(initialQuestions)); setIndex(0); setScore(0); setSelected(null); setFinished(false); }}>Nog een ronde</button>
        <button className="secondary full" onClick={onBack}>Terug</button>
      </section>
    );
  }
  const choose = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    if (answer === question.answer) setScore((value) => value + 1);
  };
  const next = () => {
    if (index + 1 === questions.length) setFinished(true);
    else { setIndex((value) => value + 1); setSelected(null); }
  };
  return (
    <section>
      <Header title={title} onBack={onBack} />
      <Progress index={index} total={questions.length} score={score} />
      <div className="dual-question"><h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3></div>
      <div className="answer-grid">
        {question.options.map((answer) => <button key={answer} disabled={Boolean(selected)} onClick={() => choose(answer)} className={`answer-option ${question.arabicOptions ? "arabic" : "dual-text-option"} ${selected === answer ? answer === question.answer ? "chosen-correct" : "chosen-wrong" : ""}`}>{answer}</button>)}
      </div>
      {selected && <div className={`feedback ${selected === question.answer ? "good" : "try"}`}><strong>{selected === question.answer ? "Goed!" : "Het juiste antwoord is:"}</strong>{selected !== question.answer && <b className={question.arabicOptions ? "arabic" : ""}>{question.answer}</b>}{question.explanation && <p>{question.explanation}</p>}<button className="primary full" onClick={next}>Volgende</button></div>}
    </section>
  );
}

const multipleChoiceQuestions = (items: ReturnType<typeof getDualEligibleItems>): ChoiceQuestion[] => {
  const arabicPool = items.flatMap((item) => [item.arabicDualRaf, item.arabicDualJarr, item.arabicIndefiniteRaf, item.arabicIndefinitePluralRaf].filter(Boolean) as string[]);
  const dutchPool = items.flatMap((item) => [item.dutchDual, item.dutchIndefiniteSingular, item.dutchIndefinitePlural].filter(Boolean) as string[]);
  return shuffle(items.slice(0, 12).map((item, index) => {
    if (index % 4 === 0) return { id: `nl-${item.id}`, prompt: item.dutchDual, answer: item.arabicDualRaf, options: options(item.arabicDualRaf, arabicPool), arabicOptions: true };
    if (index % 4 === 1) return { id: `ar-${item.id}`, prompt: item.arabicDualRaf, answer: item.dutchDual, options: options(item.dutchDual, dutchPool), arabicPrompt: true };
    if (index % 4 === 2) return { id: `make-${item.id}`, prompt: `Maak tweevoud van: ${item.arabicIndefiniteRaf}`, answer: item.arabicDualRaf, options: options(item.arabicDualRaf, arabicPool), arabicPrompt: true, arabicOptions: true };
    const useJarr = Boolean(item.arabicDualJarr) && index % 2 === 1;
    return { id: `case-${item.id}`, prompt: useJarr ? item.arabicDualJarr! : item.arabicDualRaf, answer: useJarr ? "Tweevoud majrūr" : "Tweevoud rafʿ", options: ["Tweevoud rafʿ", "Tweevoud majrūr"], arabicPrompt: true };
  }));
};

export function DualMultipleChoiceMode({ items, onBack }: { items: ReturnType<typeof getDualEligibleItems>; onBack: () => void }) {
  const questions = useMemo(() => multipleChoiceQuestions(items), [items]);
  return <ChoiceRound title="Meerkeuze" initialQuestions={questions} onBack={onBack} />;
}

export function DualCaseMode({ items, onBack }: { items: ReturnType<typeof getDualEligibleItems>; onBack: () => void }) {
  const questions = useMemo(() => shuffle(items.filter(hasDualJarr)).slice(0, 12).flatMap((item, index) => {
    const isJarr = index % 2 === 0;
    return [{
      id: `${item.id}-${isJarr ? "jarr" : "raf"}`,
      prompt: isJarr ? item.arabicDualJarr! : item.arabicDualRaf,
      answer: isJarr ? "Tweevoud majrūr" : "Tweevoud rafʿ",
      options: ["Tweevoud rafʿ", "Tweevoud majrūr"],
      arabicPrompt: true,
      explanation: isJarr ? "ـَيْنِ gebruik je na فِي en عَلَى." : "ـَانِ hoort bij de gewone tweevoudsvorm.",
    }];
  }), [items]);
  return <ChoiceRound title="Rafʿ of majrūr" initialQuestions={questions} onBack={onBack} />;
}

export function DualMakeDualMode({ items, onBack }: { items: ReturnType<typeof getDualEligibleItems>; onBack: () => void }) {
  const pool = items.flatMap((item) => [item.arabicDualRaf, item.arabicDualJarr, item.arabicIndefinitePluralRaf, item.arabicDefiniteRaf].filter(Boolean) as string[]);
  const questions = useMemo(() => shuffle(items).slice(0, 12).map((item) => ({
    id: item.id, prompt: `Maak tweevoud van: ${item.arabicIndefiniteRaf}`, answer: item.arabicDualRaf,
    options: options(item.arabicDualRaf, pool), arabicPrompt: true, arabicOptions: true,
  })), [items]);
  return <ChoiceRound title="Maak tweevoud" initialQuestions={questions} onBack={onBack} />;
}

type WritingQuestion = { id: string; prompt: string; answer: string };

const writingQuestions = (items: ReturnType<typeof getDualEligibleItems>): WritingQuestion[] =>
  shuffle(items).slice(0, 12).map((item, index) => {
    if (index % 4 === 0) return { id: `write-${item.id}`, prompt: `Schrijf: ${item.dutchDual}`, answer: item.arabicDualRaf };
    if (index % 4 === 1) return { id: `make-${item.id}`, prompt: `Schrijf het tweevoud van: ${item.arabicIndefiniteRaf}`, answer: item.arabicDualRaf };
    if (index % 4 === 2 && item.arabicDualJarr) return { id: `jarr-${item.id}`, prompt: `Schrijf de majrūr-vorm van: ${item.arabicDualRaf}`, answer: item.arabicDualJarr };
    const particle = index % 2 === 0 ? "فِي" : "عَلَى";
    const dutchParticle = particle === "فِي" ? "in" : "op";
    return { id: `particle-${item.id}`, prompt: `Schrijf: ${dutchParticle} ${item.dutchDual}`, answer: `${particle} ${item.arabicDualJarr ?? item.arabicDualRaf}` };
  });

function WritingRound({ title, initialQuestions, onBack, onFinish }: {
  title: string;
  initialQuestions: WritingQuestion[];
  onBack: () => void;
  onFinish?: (score: number, mistakes: WritingQuestion[]) => void;
}) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(false);
  const [mistakes, setMistakes] = useState<WritingQuestion[]>([]);
  const question = initialQuestions[index];
  const mark = (correct: boolean) => {
    setMarked(true);
    if (correct) setScore((value) => value + 1);
    else setMistakes((values) => [...values, question]);
  };
  const next = () => {
    if (index + 1 === initialQuestions.length && onFinish) onFinish(score + (marked && !mistakes.includes(question) ? 0 : 0), mistakes);
    else if (index + 1 < initialQuestions.length) { setIndex((value) => value + 1); setRevealed(false); setMarked(false); }
    else { setIndex(0); setScore(0); setRevealed(false); setMarked(false); setMistakes([]); }
  };
  return (
    <section>
      <Header title={title} onBack={onBack} /><Progress index={index} total={initialQuestions.length} score={score} />
      <div className="self-check dual-writing"><h3>{question.prompt}</h3><p>Schrijf je antwoord met volledige tashkīl en eind-iʿrāb.</p>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && <><div className="answer-reveal"><span>Het juiste antwoord is:</span><b className="arabic">{question.answer}</b></div>{!marked ? <div className="two-buttons"><button className="correct" onClick={() => mark(true)}>Ik had het juist</button><button className="wrong" onClick={() => mark(false)}>Ik had het fout</button></div> : <button className="primary full" onClick={next}>Volgende</button>}</>}
      </div>
    </section>
  );
}

export function DualWritingMode({ items, onBack }: { items: ReturnType<typeof getDualEligibleItems>; onBack: () => void }) {
  const questions = useMemo(() => writingQuestions(items), [items]);
  return <WritingRound title="Schrijf op papier" initialQuestions={questions} onBack={onBack} />;
}

type ExamQuestion = ChoiceQuestion & { selfCheck?: boolean };
type ExamMistake = { question: ExamQuestion; chosen: string };

const examQuestions = (items: ReturnType<typeof getDualEligibleItems>): ExamQuestion[] => {
  const selected = shuffle(items);
  const arabicPool = items.flatMap((item) => [item.arabicDualRaf, item.arabicDualJarr, item.arabicIndefinitePluralRaf].filter(Boolean) as string[]);
  const dutchPool = items.map((item) => item.dutchDual);
  const nlAr = selected.slice(0, 2).map((item) => ({ id: `nl-${item.id}`, prompt: item.dutchDual, answer: item.arabicDualRaf, options: options(item.arabicDualRaf, arabicPool), arabicOptions: true }));
  const arNl = selected.slice(2, 4).map((item) => ({ id: `ar-${item.id}`, prompt: item.arabicDualRaf, answer: item.dutchDual, options: options(item.dutchDual, dutchPool), arabicPrompt: true }));
  const make = selected.slice(4, 6).map((item) => ({ id: `make-${item.id}`, prompt: `Maak tweevoud van: ${item.arabicIndefiniteRaf}`, answer: item.arabicDualRaf, options: options(item.arabicDualRaf, arabicPool), arabicPrompt: true, arabicOptions: true }));
  const cases = selected.filter(hasDualJarr).slice(0, 2).map((item, index) => ({ id: `case-${item.id}`, prompt: index ? item.arabicDualRaf : item.arabicDualJarr!, answer: index ? "Tweevoud rafʿ" : "Tweevoud majrūr", options: ["Tweevoud rafʿ", "Tweevoud majrūr"], arabicPrompt: true }));
  const writes = writingQuestions(selected.slice(6, 8)).slice(0, 2).map((question) => ({ ...question, options: [], selfCheck: true }));
  return shuffle([...nlAr, ...arNl, ...make, ...cases, ...writes]);
};

export function DualMiniExamMode({ items, onBack }: { items: ReturnType<typeof getDualEligibleItems>; onBack: () => void }) {
  const [questions, setQuestions] = useState(() => examQuestions(items));
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
    else { setIndex((value) => value + 1); setSelected(null); setRevealed(false); }
  };
  const retry = () => {
    setQuestions(shuffle(mistakes.map((mistake) => mistake.question))); setIndex(0); setScore(0); setSelected(null); setRevealed(false); setMistakes([]); setFinished(false);
  };
  if (finished) {
    return (
      <section className="results"><p className="eyebrow">Mini-examen afgerond</p><h2>{Math.round(score / questions.length * 100)}%</h2><p>{score} van {questions.length} goed.</p>
        {mistakes.length > 0 && <><h3>Foutenlijst</h3><div className="mistake-list">{mistakes.map((mistake, i) => <article key={`${mistake.question.id}-${i}`}><span>{mistake.question.prompt}</span><b className="arabic">{mistake.question.answer}</b></article>)}</div><button className="primary full" onClick={retry}>Oefen mijn fouten opnieuw</button></>}
        <button className="secondary full" onClick={onBack}>Terug naar Woordenschat</button>
      </section>
    );
  }
  const answered = selected !== null;
  return (
    <section>
      <Header title="Mini-examen" onBack={onBack} /><Progress index={index} total={questions.length} score={score} />
      <div className="dual-question"><h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3></div>
      {question.selfCheck ? (
        <div className="self-check"><p>Schrijf je antwoord op papier.</p>{!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}{revealed && <><div className="answer-reveal"><span>Het juiste antwoord is:</span><b className="arabic">{question.answer}</b></div>{!answered ? <div className="two-buttons"><button className="correct" onClick={() => mark(true, question.answer)}>Ik had het juist</button><button className="wrong" onClick={() => mark(false, "Zelf als fout beoordeeld")}>Ik had het fout</button></div> : <button className="primary full" onClick={next}>Volgende</button>}</>}</div>
      ) : (
        <><div className="answer-grid">{question.options.map((answer) => <button key={answer} disabled={answered} onClick={() => mark(answer === question.answer, answer)} className={`answer-option ${question.arabicOptions ? "arabic" : "dual-text-option"} ${selected === answer ? answer === question.answer ? "chosen-correct" : "chosen-wrong" : ""}`}>{answer}</button>)}</div>{answered && <div className={`feedback ${selected === question.answer ? "good" : "try"}`}><strong>{selected === question.answer ? "Goed!" : "Het juiste antwoord is:"}</strong>{selected !== question.answer && <b className={question.arabicOptions ? "arabic" : ""}>{question.answer}</b>}<button className="primary full" onClick={next}>Volgende</button></div>}</>
      )}
    </section>
  );
}

const menuItems: { mode: Exclude<DualMode, "intro" | "menu">; title: string; subtitle: string }[] = [
  { mode: "learn", title: "Leren", subtitle: "Bekijk enkelvoud, tweevoud rafʿ en majrūr." },
  { mode: "flashcards", title: "Flashcards", subtitle: "Raad de twee-vorm in twee richtingen." },
  { mode: "multipleChoice", title: "Meerkeuze", subtitle: "Oefen verschillende soorten dualisvragen." },
  { mode: "case", title: "Rafʿ of majrūr", subtitle: "Herken ـَانِ en ـَيْنِ." },
  { mode: "make", title: "Maak tweevoud", subtitle: "Kies het tweevoud bij een enkelvoud." },
  { mode: "writing", title: "Schrijf op papier", subtitle: "Schrijf en controleer je eigen antwoord." },
  { mode: "exam", title: "Mini-examen", subtitle: "Tien gemengde vragen met foutenherhaling." },
];

export function DualPracticeMode({ items, onBack }: { items: VocabularyItem[]; onBack: () => void }) {
  const eligible = useMemo(() => getDualEligibleItems(items), [items]);
  const [mode, setMode] = useState<DualMode>("intro");
  if (!eligible.length) return <section className="empty"><h2>Geen tweevoudsvormen in deze categorie</h2><button onClick={onBack}>Terug naar Woordenschat</button></section>;
  if (mode === "intro") return <DualIntro items={eligible} onStart={() => setMode("menu")} onBack={onBack} />;
  if (mode === "learn") return <DualLearnMode items={eligible} onBack={() => setMode("menu")} />;
  if (mode === "flashcards") return <DualFlashcardsMode items={eligible} onBack={() => setMode("menu")} />;
  if (mode === "multipleChoice") return <DualMultipleChoiceMode items={eligible} onBack={() => setMode("menu")} />;
  if (mode === "case") return <DualCaseMode items={eligible} onBack={() => setMode("menu")} />;
  if (mode === "make") return <DualMakeDualMode items={eligible} onBack={() => setMode("menu")} />;
  if (mode === "writing") return <DualWritingMode items={eligible} onBack={() => setMode("menu")} />;
  if (mode === "exam") return <DualMiniExamMode items={eligible} onBack={onBack} />;
  return (
    <section>
      <Header title="Tweevoud oefenen" onBack={onBack} />
      <div className="module-grid dual-menu">
        {menuItems.map((item, index) => <button className="module-card" key={item.mode} onClick={() => setMode(item.mode)}><span className="module-number">{index + 1}</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span></button>)}
      </div>
    </section>
  );
}
