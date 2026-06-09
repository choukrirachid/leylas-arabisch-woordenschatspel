import { useMemo, useState } from "react";
import {
  getSentenceWords,
  getSentencesByLevel,
  mubtadaKhabarSentences,
  type MubtadaKhabarLevel,
  type MubtadaKhabarSentence,
} from "./mubtadaKhabarSentences";

type ExerciseMode =
  | "menu" | "learn" | "identify" | "nl-ar" | "ar-nl"
  | "build" | "analysis" | "writing" | "exam";

type ChoiceQuestion = {
  id: string;
  prompt: string;
  sentence?: string;
  answer: string;
  options: string[];
  arabicPrompt?: boolean;
  arabicOptions?: boolean;
  explanation: string;
};

export const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
};

const choiceOptions = (correct: string, pool: string[], count = 4) =>
  shuffleArray([correct, ...shuffleArray([...new Set(pool.filter((value) => value && value !== correct))]).slice(0, count - 1)]);

const sentenceTypeLabel = (sentence: MubtadaKhabarSentence) =>
  sentence.sentenceType === "jumlah_ismiyyah" ? "جُمْلَة اِسْمِيَّة" : "جُمْلَة فِعْلِيَّة";

export function generateTranslationOptions(
  sentence: MubtadaKhabarSentence,
  direction: "nl-ar" | "ar-nl",
  pool = mubtadaKhabarSentences,
) {
  const correct = direction === "nl-ar" ? sentence.arabic : sentence.dutch;
  const candidates = pool.map((item) => direction === "nl-ar" ? item.arabic : item.dutch);
  return choiceOptions(correct, candidates);
}

export function generateAnalysisOptions(sentence: MubtadaKhabarSentence): string[] {
  const correct = sentence.sentenceType === "jumlah_fi3liyyah"
    ? `جُمْلَة فِعْلِيَّة • fiʿl: ${sentence.fi3l}`
    : sentence.khabarType === "shibh_jumlah"
      ? `مُبْتَدَأ: ${sentence.mubtada} • خَبَر شِبْه جُمْلَة: ${sentence.khabar}`
      : `مُبْتَدَأ: ${sentence.mubtada} • خَبَر: ${sentence.khabar}`;
  const wrong = sentence.sentenceType === "jumlah_fi3liyyah"
    ? [
      `جُمْلَة اِسْمِيَّة • مُبْتَدَأ: ${sentence.fi3l}`,
      `جُمْلَة فِعْلِيَّة • خَبَر: ${sentence.fi3l}`,
    ]
    : [
      `مُبْتَدَأ: ${sentence.khabar} • خَبَر: ${sentence.mubtada}`,
      `حَرْف جَرّ: ${sentence.mubtada} • اِسْم مَجْرُور: ${sentence.khabar}`,
    ];
  return shuffleArray([correct, ...wrong]);
}

function Header({ title, eyebrow = "Mubtadaʾ / Khabar", onBack }: {
  title: string;
  eyebrow?: string;
  onBack: () => void;
}) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title mk-title"><p>{eyebrow}</p><h2>{title}</h2></div>
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

export function MubtadaKhabarLevelSelect({ onSelect, onBack }: {
  onSelect: (level: MubtadaKhabarLevel) => void;
  onBack: () => void;
}) {
  const levels = [
    ["Niveau 1", "Simpele Mubtadaʾ + Khabar"],
    ["Niveau 2", "Khabar als Shibh Jumla"],
    ["Niveau 3", "Oefenen en bouwen"],
    ["Niveau 4", "Volledige zinnen analyseren"],
  ] as const;
  return (
    <section>
      <Header title="Kies een niveau" onBack={onBack} />
      <div className="module-grid mk-level-grid">
        {levels.map(([title, subtitle], index) => (
          <button className="module-card" key={title} onClick={() => onSelect((index + 1) as MubtadaKhabarLevel)}>
            <span className="module-number">{index + 1}</span><span><strong>{title}</strong><small>{subtitle}</small></span>
          </button>
        ))}
      </div>
    </section>
  );
}

const exerciseItems: { mode: Exclude<ExerciseMode, "menu">; title: string; subtitle: string }[] = [
  { mode: "learn", title: "Leren", subtitle: "Lees de uitleg en bekijk vaste voorbeelden." },
  { mode: "identify", title: "Duid aan", subtitle: "Tik de mubtadaʾ, khabar of het fiʿl aan." },
  { mode: "nl-ar", title: "Nederlands → Arabisch", subtitle: "Kies de juiste volledige Arabische zin." },
  { mode: "ar-nl", title: "Arabisch → Nederlands", subtitle: "Kies de juiste Nederlandse betekenis." },
  { mode: "build", title: "Bouw de zin", subtitle: "Zet Arabische zinsdelen in de juiste volgorde." },
  { mode: "analysis", title: "Kies de juiste analyse", subtitle: "Herken de grammaticale structuur." },
  { mode: "writing", title: "Schrijf op papier", subtitle: "Schrijf en controleer jezelf neutraal." },
  { mode: "exam", title: "Mini-examen", subtitle: "Tien gemengde vragen met foutenherhaling." },
];

export function MubtadaKhabarLevelMenu({ level, onSelect, onBack }: {
  level: MubtadaKhabarLevel;
  onSelect: (mode: Exclude<ExerciseMode, "menu">) => void;
  onBack: () => void;
}) {
  return (
    <section>
      <Header title={`Niveau ${level}`} onBack={onBack} />
      <div className="module-grid mk-exercise-grid">
        {exerciseItems.map((item, index) => (
          <button className="module-card" key={item.mode} onClick={() => onSelect(item.mode)}>
            <span className="module-number">{index + 1}</span><span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
          </button>
        ))}
      </div>
    </section>
  );
}

function AnalysisRows({ sentence }: { sentence: MubtadaKhabarSentence }) {
  if (sentence.sentenceType === "jumlah_fi3liyyah") {
    return (
      <div className="mk-analysis-rows">
        <div><b className="arabic">{sentenceTypeLabel(sentence)}</b><span>De zin begint met een fiʿl.</span></div>
        <div><b className="arabic">{sentence.fi3l}</b><span>فِعْل</span></div>
      </div>
    );
  }
  return (
    <div className="mk-analysis-rows">
      <div><b className="arabic">{sentence.mubtada}</b><span>مُبْتَدَأ</span></div>
      <div><b className="arabic">{sentence.khabar}</b><span>{sentence.khabarType === "shibh_jumlah" ? "خَبَر شِبْه جُمْلَة" : "خَبَر"}</span></div>
      {sentence.harfJar && <div><b className="arabic">{sentence.harfJar}</b><span>حَرْف جَرّ</span></div>}
      {sentence.ismMajroor && <div><b className="arabic">{sentence.ismMajroor}</b><span>اِسْم مَجْرُور</span></div>}
    </div>
  );
}

export function MubtadaKhabarLearnMode({ level, onBack }: { level: MubtadaKhabarLevel; onBack: () => void }) {
  const items = getSentencesByLevel(level).slice(0, 5);
  const intro = level === 1
    ? "Een جُمْلَة اِسْمِيَّة begint met een ism. De basis is مُبْتَدَأ + خَبَر."
    : level === 2
      ? "De khabar kan een shibh jumla zijn: حَرْف جَرّ + اِسْم مَجْرُور."
      : level === 3
        ? "In dit niveau bouw en analyseer je zinnen uit niveau 1 en 2."
        : "Herken eerst of de zin ismiyya of fiʿliyya is. Bij fiʿliyya duid je alleen het fiʿl aan.";
  return (
    <section>
      <Header title="Leren" eyebrow={`Mubtadaʾ / Khabar • Niveau ${level}`} onBack={onBack} />
      <div className="mk-intro">{intro}</div>
      <div className="mk-learn-list">
        {items.map((sentence) => (
          <article className="mk-learn-card" key={sentence.id}>
            <b className="arabic mk-sentence">{sentence.arabic}</b>
            <p>{sentence.dutch}</p>
            <AnalysisRows sentence={sentence} />
            <small>{sentence.explanation}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function choiceRoundQuestions(
  level: MubtadaKhabarLevel,
  mode: "identify" | "nl-ar" | "ar-nl" | "analysis",
  count = 10,
): ChoiceQuestion[] {
  const source = getSentencesByLevel(level);
  const selected = Array.from({ length: count }, (_, index) => source[index % source.length]);
  return shuffleArray(selected.map((sentence, index) => {
    if (mode === "nl-ar") return {
      id: `nl-ar-${sentence.id}-${index}`, prompt: sentence.dutch, answer: sentence.arabic,
      options: generateTranslationOptions(sentence, "nl-ar", source), arabicOptions: true, explanation: sentence.explanation,
    };
    if (mode === "ar-nl") return {
      id: `ar-nl-${sentence.id}-${index}`, prompt: sentence.arabic, answer: sentence.dutch,
      options: generateTranslationOptions(sentence, "ar-nl", source), arabicPrompt: true, explanation: sentence.explanation,
    };
    if (mode === "analysis") {
      const choices = generateAnalysisOptions(sentence);
      return {
        id: `analysis-${sentence.id}-${index}`, prompt: sentence.arabic, answer: choices.find((choice) =>
          sentence.sentenceType === "jumlah_fi3liyyah"
            ? choice.startsWith("جُمْلَة فِعْلِيَّة")
            : choice.startsWith(`مُبْتَدَأ: ${sentence.mubtada}`),
        )!, options: choices, arabicPrompt: true, explanation: sentence.explanation,
      };
    }
    if (sentence.sentenceType === "jumlah_fi3liyyah") {
      const askType = index % 2 === 0;
      return askType
        ? { id: `type-${sentence.id}-${index}`, prompt: sentence.arabic, answer: "جُمْلَة فِعْلِيَّة", options: ["جُمْلَة اِسْمِيَّة", "جُمْلَة فِعْلِيَّة"], arabicPrompt: true, arabicOptions: true, explanation: sentence.explanation }
        : { id: `verb-${sentence.id}-${index}`, prompt: `Duid het fiʿl aan: ${sentence.arabic}`, answer: sentence.fi3l!, options: getSentenceWords(sentence), arabicPrompt: true, arabicOptions: true, explanation: sentence.explanation };
    }
    const roles = sentence.khabarType === "shibh_jumlah"
      ? [
        ["مُبْتَدَأ", sentence.mubtada!],
        ["خَبَر شِبْه جُمْلَة", sentence.khabar!],
        ["حَرْف جَرّ", sentence.harfJar!],
        ["اِسْم مَجْرُور", sentence.ismMajroor!],
      ]
      : [["مُبْتَدَأ", sentence.mubtada!], ["خَبَر", sentence.khabar!]];
    const [role, answer] = roles[index % roles.length];
    return {
      id: `identify-${sentence.id}-${index}`, prompt: `Duid de ${role} aan: ${sentence.arabic}`,
      answer, options: getSentenceWords(sentence), arabicPrompt: true, arabicOptions: true, explanation: sentence.explanation,
    };
  }));
}

function ChoiceRound({ title, questions: initial, onBack }: {
  title: string;
  questions: ChoiceQuestion[];
  onBack: () => void;
}) {
  const [questions, setQuestions] = useState(initial);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  if (finished) return (
    <section className="results"><p className="eyebrow">{title} afgerond</p><h2>{Math.round(score / questions.length * 100)}%</h2><p>{score} van {questions.length} goed.</p>
      <button className="primary full" onClick={() => { setQuestions(shuffleArray(initial)); setIndex(0); setScore(0); setSelected(null); setFinished(false); }}>Nog een ronde</button>
      <button className="secondary full" onClick={onBack}>Terug</button>
    </section>
  );
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
      <Header title={title} onBack={onBack} /><Progress index={index} total={questions.length} score={score} />
      <div className="mk-question"><h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3>{question.sentence && <b className="arabic">{question.sentence}</b>}</div>
      <div className="answer-grid mk-answer-grid">
        {question.options.map((option) => (
          <button key={option} disabled={Boolean(selected)} onClick={() => choose(option)}
            className={`answer-option ${question.arabicOptions ? "arabic" : "mk-text-option"} ${selected === option ? option === question.answer ? "chosen-correct" : "chosen-wrong" : ""}`}>{option}</button>
        ))}
      </div>
      {selected && <div className={`feedback ${selected === question.answer ? "good" : "try"}`}><strong>{selected === question.answer ? "Goed!" : "Het juiste antwoord is:"}</strong>{selected !== question.answer && <b className={question.arabicOptions ? "arabic" : ""}>{question.answer}</b>}<p>{question.explanation}</p><button className="primary full" onClick={next}>Volgende</button></div>}
    </section>
  );
}

export function MubtadaKhabarIdentifyMode({ level, onBack }: { level: MubtadaKhabarLevel; onBack: () => void }) {
  const questions = useMemo(() => choiceRoundQuestions(level, "identify"), [level]);
  return <ChoiceRound title="Duid aan" questions={questions} onBack={onBack} />;
}

export function MubtadaKhabarTranslateMode({ level, direction, onBack }: {
  level: MubtadaKhabarLevel;
  direction: "nl-ar" | "ar-nl";
  onBack: () => void;
}) {
  const questions = useMemo(() => choiceRoundQuestions(level, direction), [level, direction]);
  return <ChoiceRound title={direction === "nl-ar" ? "Nederlands → Arabisch" : "Arabisch → Nederlands"} questions={questions} onBack={onBack} />;
}

const buildBlocks = (sentence: MubtadaKhabarSentence) => {
  if (sentence.level === 4) {
    if (sentence.id === "n4-student-class-pen-table") return ["الطَّالِبُ", "فِي الْفَصْلِ", "وَالْقَلَمُ", "عَلَى الطَّاوِلَةِ"];
    if (sentence.id === "n4-book-table-water-glass") return ["الْكِتَابُ", "عَلَى الطَّاوِلَةِ", "وَالْمَاءُ", "فِي الْكُوبِ"];
    if (sentence.id === "n4-teacher-writes-student-class") return ["يَكْتُبُ", "الْمُعَلِّمُ", "وَالطَّالِبُ", "فِي الْفَصْلِ"];
    return ["تَكْتُبُ", "الطَّالِبَةُ", "وَالسَّيَّارَةُ", "جَمِيلَةٌ"];
  }
  return sentence.khabarType === "shibh_jumlah"
    ? [sentence.mubtada!, sentence.harfJar!, sentence.ismMajroor!]
    : [sentence.mubtada!, sentence.khabar!];
};

export function MubtadaKhabarBuildSentenceMode({ level, onBack }: { level: MubtadaKhabarLevel; onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(getSentencesByLevel(level)).slice(0, 10), [level]);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const sentence = questions[index % questions.length];
  const blocks = useMemo(() => shuffleArray(buildBlocks(sentence)), [sentence.id]);
  const answer = chosen.join(" ");
  const correct = answer === sentence.arabic;
  const next = () => { setIndex((value) => value + 1); setChosen([]); setChecked(false); };
  return (
    <section>
      <Header title="Bouw de zin" onBack={onBack} /><Progress index={index} total={questions.length} />
      <div className="mk-question"><p>Bouw:</p><h3>{sentence.dutch}</h3><div className="mk-built arabic">{answer || "…"}</div></div>
      <div className="mk-blocks">{blocks.map((block) => <button className="arabic" key={block} disabled={chosen.includes(block) || checked} onClick={() => setChosen((current) => [...current, block])}>{block}</button>)}</div>
      {!checked && chosen.length > 0 && <button className="secondary full" onClick={() => setChosen([])}>Wis en begin opnieuw</button>}
      {!checked && chosen.length === blocks.length && <button className="primary full" onClick={() => setChecked(true)}>Controleer</button>}
      {checked && <div className={`feedback ${correct ? "good" : "try"}`}><strong>{correct ? "Goed!" : "Het juiste antwoord is:"}</strong>{!correct && <b className="arabic">{sentence.arabic}</b>}<button className="primary full" onClick={next}>Volgende</button></div>}
    </section>
  );
}

export function MubtadaKhabarAnalysisMode({ level, onBack }: { level: MubtadaKhabarLevel; onBack: () => void }) {
  const questions = useMemo(() => choiceRoundQuestions(level, "analysis"), [level]);
  return <ChoiceRound title="Kies de juiste analyse" questions={questions} onBack={onBack} />;
}

export function MubtadaKhabarWritingMode({ level, onBack }: { level: MubtadaKhabarLevel; onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(getSentencesByLevel(level)).slice(0, 10), [level]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(false);
  const sentence = questions[index % questions.length];
  const next = () => { setIndex((value) => value + 1); setRevealed(false); setMarked(false); };
  return (
    <section>
      <Header title="Schrijf op papier" onBack={onBack} /><Progress index={index} total={questions.length} />
      <div className="self-check mk-writing"><h3>Schrijf: {sentence.dutch}</h3><p>Schrijf met volledige tashkīl en eind-iʿrāb.</p>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && <><div className="answer-reveal"><span>Het juiste antwoord is:</span><b className="arabic">{sentence.arabic}</b></div>{!marked ? <div className="two-buttons"><button className="correct" onClick={() => setMarked(true)}>Ik had het juist</button><button className="wrong" onClick={() => setMarked(true)}>Ik had het fout</button></div> : <button className="primary full" onClick={next}>Volgende</button>}</>}
      </div>
    </section>
  );
}

type ExamMistake = { question: ChoiceQuestion; chosen: string };

const examQuestions = (level: MubtadaKhabarLevel) => shuffleArray([
  ...choiceRoundQuestions(level, "identify", level === 3 ? 5 : 4),
  ...choiceRoundQuestions(level, "nl-ar", 2),
  ...choiceRoundQuestions(level, "ar-nl", 2),
  ...choiceRoundQuestions(level, "analysis", 2),
]).slice(0, 10);

export function MubtadaKhabarMiniExamMode({ level, onBack }: { level: MubtadaKhabarLevel; onBack: () => void }) {
  const [questions, setQuestions] = useState(() => examQuestions(level));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [mistakes, setMistakes] = useState<ExamMistake[]>([]);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const choose = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    if (answer === question.answer) setScore((value) => value + 1);
    else setMistakes((current) => [...current, { question, chosen: answer }]);
  };
  const next = () => {
    if (index + 1 === questions.length) setFinished(true);
    else { setIndex((value) => value + 1); setSelected(null); }
  };
  if (finished) return (
    <section className="results"><p className="eyebrow">Mini-examen niveau {level}</p><h2>{Math.round(score / questions.length * 100)}%</h2><p>{score} van {questions.length} goed.</p>
      {mistakes.length > 0 && <><h3>Foutenlijst</h3><div className="mistake-list">{mistakes.map((mistake, i) => <article key={`${mistake.question.id}-${i}`}><span>{mistake.question.prompt}</span><b className="arabic">{mistake.question.answer}</b></article>)}</div><button className="primary full" onClick={() => { setQuestions(shuffleArray(mistakes.map((mistake) => mistake.question))); setIndex(0); setScore(0); setSelected(null); setMistakes([]); setFinished(false); }}>Oefen mijn fouten opnieuw</button></>}
      <button className="secondary full" onClick={onBack}>Terug naar Mubtadaʾ / Khabar</button>
    </section>
  );
  return (
    <section>
      <Header title="Mini-examen" eyebrow={`Niveau ${level}`} onBack={onBack} /><Progress index={index} total={questions.length} score={score} />
      <div className="mk-question"><h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3></div>
      <div className="answer-grid mk-answer-grid">{question.options.map((option) => <button key={option} disabled={Boolean(selected)} onClick={() => choose(option)} className={`answer-option ${question.arabicOptions ? "arabic" : "mk-text-option"} ${selected === option ? option === question.answer ? "chosen-correct" : "chosen-wrong" : ""}`}>{option}</button>)}</div>
      {selected && <div className={`feedback ${selected === question.answer ? "good" : "try"}`}><strong>{selected === question.answer ? "Goed!" : "Het juiste antwoord is:"}</strong>{selected !== question.answer && <b className={question.arabicOptions ? "arabic" : ""}>{question.answer}</b>}<p>{question.explanation}</p><button className="primary full" onClick={next}>Volgende</button></div>}
    </section>
  );
}

export function MubtadaKhabarModule({ onBack }: { onBack: () => void }) {
  const [level, setLevel] = useState<MubtadaKhabarLevel | null>(null);
  const [mode, setMode] = useState<ExerciseMode>("menu");
  if (!level) return <MubtadaKhabarLevelSelect onSelect={(next) => { setLevel(next); setMode("menu"); }} onBack={onBack} />;
  if (mode === "menu") return <MubtadaKhabarLevelMenu level={level} onSelect={setMode} onBack={() => setLevel(null)} />;
  const backToMenu = () => setMode("menu");
  if (mode === "learn") return <MubtadaKhabarLearnMode level={level} onBack={backToMenu} />;
  if (mode === "identify") return <MubtadaKhabarIdentifyMode level={level} onBack={backToMenu} />;
  if (mode === "nl-ar" || mode === "ar-nl") return <MubtadaKhabarTranslateMode level={level} direction={mode} onBack={backToMenu} />;
  if (mode === "build") return <MubtadaKhabarBuildSentenceMode level={level} onBack={backToMenu} />;
  if (mode === "analysis") return <MubtadaKhabarAnalysisMode level={level} onBack={backToMenu} />;
  if (mode === "writing") return <MubtadaKhabarWritingMode level={level} onBack={backToMenu} />;
  return <MubtadaKhabarMiniExamMode level={level} onBack={backToMenu} />;
}
