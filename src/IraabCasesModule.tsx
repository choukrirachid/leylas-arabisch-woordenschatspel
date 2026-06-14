import { useMemo, useState } from "react";
import {
  iraabContextExamples,
  iraabWordExamples,
  type IraabCase,
} from "./iraabCasesData";

type IraabMode =
  | "menu"
  | "learn"
  | "ending"
  | "case"
  | "harf-jar"
  | "idafa"
  | "mixed"
  | "writing";

type ChoiceQuestion = {
  id: string;
  prompt: string;
  arabic: string;
  answer: string;
  options: string[];
  explanation: string;
};

const caseLabels: Record<IraabCase, string> = {
  marfoo: "مَرْفُوع",
  mansub: "مَنْصُوب",
  majroor: "مَجْرُور",
};

const caseNames: Record<IraabCase, string> = {
  marfoo: "Marfūʿ",
  mansub: "Manṣūb",
  majroor: "Majrūr",
};

const shuffle = <T,>(items: readonly T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
};

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title iraab-title">
        <p>المرفوع والمنصوب والمجرور</p>
        <h2>{title}</h2>
      </div>
    </>
  );
}

function CaseBadges() {
  return (
    <div className="iraab-badges">
      {(Object.keys(caseLabels) as IraabCase[]).map((caseType) => (
        <span className={`iraab-badge ${caseType}`} key={caseType}>
          <b className="arabic">{caseLabels[caseType]}</b>
          <small>{caseNames[caseType]}</small>
        </span>
      ))}
    </div>
  );
}

const menuItems: { mode: Exclude<IraabMode, "menu">; title: string; subtitle: string }[] = [
  { mode: "learn", title: "Leren", subtitle: "Leer de drie eindklinkers stap voor stap." },
  { mode: "ending", title: "Herken de eindklinker", subtitle: "Kies ḍamma, fatḥa of kasra." },
  { mode: "case", title: "Kies de juiste naamval", subtitle: "Kies marfūʿ, manṣūb of majrūr." },
  { mode: "harf-jar", title: "Wat komt na fī/ʿalā?", subtitle: "Kies de juiste majrūr-vorm." },
  { mode: "idafa", title: "Muḍāf ilayhi herkennen", subtitle: "Vind het majrūr-woord in de iḍāfa." },
  { mode: "mixed", title: "Marfūʿ, manṣūb of majrūr?", subtitle: "Oefen losse woorden en korte context." },
  { mode: "writing", title: "Schrijf op papier", subtitle: "Schrijf de vorm en controleer jezelf." },
];

function Menu({ onSelect, onBack }: {
  onSelect: (mode: Exclude<IraabMode, "menu">) => void;
  onBack: () => void;
}) {
  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title iraab-title">
        <p>المرفوع والمنصوب والمجرور</p>
        <h2>Marfūʿ / Manṣūb / Majrūr</h2>
      </div>
      <CaseBadges />
      <div className="module-grid iraab-menu">
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

function ExampleRow({ words }: { words: string[] }) {
  return (
    <div className="iraab-example-row" dir="rtl">
      {words.map((word) => <b className="arabic" key={word}>{word}</b>)}
    </div>
  );
}

export function IraabCasesLearnMode({ onBack }: { onBack: () => void }) {
  return (
    <section>
      <Header title="Leren" onBack={onBack} />
      <CaseBadges />
      <div className="iraab-learn-list">
        <article className="iraab-theory-card">
          <h3>1. Het einde van het woord</h3>
          <ExampleRow words={["كِتَابٌ", "كِتَابًا", "كِتَابٍ"]} />
          <p>In het Arabisch kijken we vaak naar het einde. Hetzelfde woord kan klinken als <strong>u/un</strong>, <strong>a/an</strong> of <strong>i/in</strong>.</p>
        </article>
        <article className="iraab-theory-card marfoo">
          <h3>2. Marfūʿ · مَرْفُوع</h3>
          <div className="iraab-ending">ـُ / ـٌ</div>
          <ExampleRow words={["كِتَابٌ", "الْكِتَابُ", "قَلَمٌ", "الْقَلَمُ", "طَالِبٌ", "الطَّالِبُ"]} />
          <p>Marfūʿ klinkt vaak als <strong>u/un</strong>.</p>
        </article>
        <article className="iraab-theory-card mansub">
          <h3>3. Manṣūb · مَنْصُوب</h3>
          <div className="iraab-ending">ـَ / ـً</div>
          <ExampleRow words={["كِتَابًا", "الْكِتَابَ", "قَلَمًا", "الْقَلَمَ", "طَالِبًا", "الطَّالِبَ"]} />
          <p>Manṣūb klinkt vaak als <strong>a/an</strong>. We leren hier vooral de eindklank herkennen.</p>
        </article>
        <article className="iraab-theory-card majroor">
          <h3>4. Majrūr · مَجْرُور</h3>
          <div className="iraab-ending">ـِ / ـٍ</div>
          <ExampleRow words={["كِتَابٍ", "الْكِتَابِ", "قَلَمٍ", "الْقَلَمِ", "طَالِبٍ", "الطَّالِبِ"]} />
          <p>Majrūr klinkt vaak als <strong>i/in</strong>.</p>
        </article>
        <article className="iraab-theory-card">
          <h3>5. Na fī en ʿalā</h3>
          <ExampleRow words={["فِي الْبَيْتِ", "عَلَى الطَّاوِلَةِ"]} />
          <p>Na <b className="arabic">فِي</b> en <b className="arabic">عَلَى</b> komt vaak majrūr. Daarom eindigt het volgende woord op kasra.</p>
        </article>
        <article className="iraab-theory-card">
          <h3>6. Na een plaatswoord</h3>
          <ExampleRow words={["فَوْقَ الْمَكْتَبِ", "تَحْتَ الْكُرْسِيِّ", "بِجَانِبِ الْبَيْتِ", "أَمَامَ الْمَسْجِدِ", "خَلْفَ الْبَابِ", "حَوْلَ الطَّاوِلَةِ"]} />
          <p>Ook na deze plaatswoorden komt vaak een majrūr-woord.</p>
        </article>
        <article className="iraab-theory-card">
          <h3>7. Muḍāf ilayhi is majrūr</h3>
          <ExampleRow words={["كِتَابُ الطَّالِبِ", "بَابُ الْبَيْتِ", "كُوبُ الْمَاءِ", "مِفْتَاحُ السَّيَّارَةِ"]} />
          <p>In een iḍāfa is het tweede woord de muḍāf ilayhi. Dat tweede woord is majrūr.</p>
        </article>
        <article className="iraab-theory-card">
          <h3>8. Samenvatting</h3>
          <div className="iraab-summary">
            <div><b>ـُ / ـٌ</b><span className="arabic">مَرْفُوع</span><span>u/un</span></div>
            <div><b>ـَ / ـً</b><span className="arabic">مَنْصُوب</span><span>a/an</span></div>
            <div><b>ـِ / ـٍ</b><span className="arabic">مَجْرُور</span><span>i/in</span></div>
          </div>
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
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const question = questions[index];
  const correct = selected === question.answer;
  const choose = (option: string) => {
    if (selected) return;
    setSelected(option);
    if (option === question.answer) setScore((value) => value + 1);
  };
  const next = () => {
    if (index + 1 === questions.length) {
      setFinished(true);
      return;
    }
    setIndex((value) => value + 1);
    setSelected(null);
  };
  if (finished) {
    return (
      <section className="results">
        <p className="eyebrow">Ronde klaar</p>
        <h2>{score}/{questions.length}</h2>
        <button className="primary full" onClick={() => { setIndex(0); setSelected(null); setScore(0); setFinished(false); }}>Opnieuw oefenen</button>
        <button className="secondary full" onClick={onBack}>Terug naar de module</button>
      </section>
    );
  }
  return (
    <section>
      <Header title={title} onBack={onBack} />
      <div className="score-wrap">
        <div className="score-line"><strong>Vraag {index + 1}/{questions.length}</strong><span>Score: {score}</span></div>
        <div className="progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      </div>
      <article className="iraab-question">
        <h3>{question.prompt}</h3>
        <b className="arabic" dir="rtl">{question.arabic}</b>
      </article>
      <div className="answer-grid iraab-answers">
        {question.options.map((option) => (
          <button
            className={`answer-option ${/[\u0600-\u06ff]/.test(option) ? "arabic" : ""} ${selected === option ? correct ? "chosen-correct" : "chosen-wrong" : ""}`}
            disabled={Boolean(selected)}
            dir={/[\u0600-\u06ff]/.test(option) ? "rtl" : undefined}
            key={option}
            onClick={() => choose(option)}
          >
            {option}
          </button>
        ))}
      </div>
      {selected && (
        <div className={`feedback ${correct ? "good" : "try"}`}>
          <strong>{correct ? "Goed!" : "Het juiste antwoord is:"}</strong>
          {!correct && <b className={/[\u0600-\u06ff]/.test(question.answer) ? "arabic" : ""}>{question.answer}</b>}
          <p>{question.explanation}</p>
          <button className="primary full" onClick={next}>Volgende</button>
        </div>
      )}
    </section>
  );
}

export function RecognizeEndingMode({ onBack }: { onBack: () => void }) {
  const endingAnswers: Record<IraabCase, string> = {
    marfoo: "ḍamma / ḍammatayn",
    mansub: "fatḥa / fatḥatayn",
    majroor: "kasra / kasratayn",
  };
  const questions = useMemo(() => shuffle(iraabWordExamples).map((item) => ({
    id: `ending-${item.id}`,
    prompt: "Wat is de eindklinker?",
    arabic: item.arabic,
    answer: endingAnswers[item.caseType],
    options: Object.values(endingAnswers),
    explanation: `${item.arabic} eindigt op ${item.endingLabel}. Dat hoort bij ${caseNames[item.caseType].toLowerCase()}.`,
  })), []);
  return <ChoiceRound title="Herken de eindklinker" questions={questions} onBack={onBack} />;
}

export function ChooseIraabCaseMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffle(iraabWordExamples).map((item) => ({
    id: `case-${item.id}`,
    prompt: "Is dit woord marfūʿ, manṣūb of majrūr?",
    arabic: item.arabic,
    answer: caseLabels[item.caseType],
    options: Object.values(caseLabels),
    explanation: item.explanation,
  })), []);
  return <ChoiceRound title="Kies de juiste naamval" questions={questions} onBack={onBack} />;
}

export function AfterHarfJarMode({ onBack }: { onBack: () => void }) {
  const harfJarItems = [
    { id: "house", harf: "فِي", phrase: "فِي الْبَيْتِ", forms: ["الْبَيْتُ", "الْبَيْتَ", "الْبَيْتِ"], answer: "الْبَيْتِ" },
    { id: "class", harf: "فِي", phrase: "فِي الْفَصْلِ", forms: ["الْفَصْلُ", "الْفَصْلَ", "الْفَصْلِ"], answer: "الْفَصْلِ" },
    { id: "mosque", harf: "فِي", phrase: "فِي الْمَسْجِدِ", forms: ["الْمَسْجِدُ", "الْمَسْجِدَ", "الْمَسْجِدِ"], answer: "الْمَسْجِدِ" },
    { id: "table", harf: "عَلَى", phrase: "عَلَى الطَّاوِلَةِ", forms: ["الطَّاوِلَةُ", "الطَّاوِلَةَ", "الطَّاوِلَةِ"], answer: "الطَّاوِلَةِ" },
    { id: "desk", harf: "عَلَى", phrase: "عَلَى الْمَكْتَبِ", forms: ["الْمَكْتَبُ", "الْمَكْتَبَ", "الْمَكْتَبِ"], answer: "الْمَكْتَبِ" },
  ];
  const questions = useMemo(() => harfJarItems.map((item) => ({
    id: `harf-${item.id}`,
    prompt: `Kies de juiste vorm: ${item.harf} ______`,
    arabic: item.phrase,
    answer: item.answer,
    options: shuffle(item.forms),
    explanation: `Na ${item.harf} komt majrūr. Daarom is het ${item.answer}.`,
  })), []);
  return <ChoiceRound title="Wat komt na fī/ʿalā?" questions={questions} onBack={onBack} />;
}

const idafaExamples = [
  ["كِتَابُ الطَّالِبِ", "كِتَابُ", "الطَّالِبِ"],
  ["قَلَمُ الْمُعَلِّمِ", "قَلَمُ", "الْمُعَلِّمِ"],
  ["بَابُ الْبَيْتِ", "بَابُ", "الْبَيْتِ"],
  ["كُوبُ الْمَاءِ", "كُوبُ", "الْمَاءِ"],
  ["مِفْتَاحُ السَّيَّارَةِ", "مِفْتَاحُ", "السَّيَّارَةِ"],
  ["حَقِيبَةُ الطَّالِبَةِ", "حَقِيبَةُ", "الطَّالِبَةِ"],
] as const;

export function MudafIlayhiMajroorMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffle(idafaExamples).map(([phrase, mudaf, ilayhi], index) => ({
    id: `idafa-${index}`,
    prompt: "Welk woord is majrūr?",
    arabic: phrase,
    answer: ilayhi,
    options: shuffle([mudaf, ilayhi]),
    explanation: `${ilayhi} is de muḍāf ilayhi. De muḍāf ilayhi is majrūr.`,
  })), []);
  return <ChoiceRound title="Muḍāf ilayhi herkennen" questions={questions} onBack={onBack} />;
}

export function MixedIraabCaseMode({ onBack }: { onBack: () => void }) {
  const wordQuestions = iraabWordExamples.slice(0, 18).map((item) => ({
    id: `mixed-word-${item.id}`,
    prompt: "Kijk naar het woord. Welke naamval zie je?",
    arabic: item.arabic,
    answer: caseLabels[item.caseType],
    options: Object.values(caseLabels),
    explanation: item.explanation,
  }));
  const contextQuestions = iraabContextExamples.map((item) => ({
    id: `mixed-context-${item.id}`,
    prompt: `Kijk naar ${item.targetWord}. Welke naamval heeft dit woord?`,
    arabic: item.phrase,
    answer: caseLabels[item.caseType],
    options: Object.values(caseLabels),
    explanation: item.explanation,
  }));
  const questions = useMemo(() => shuffle([...wordQuestions, ...contextQuestions]), []);
  return <ChoiceRound title="Marfūʿ, manṣūb of majrūr?" questions={questions} onBack={onBack} />;
}

type WritingQuestion = { prompt: string; answer: string; explanation: string };

export function IraabWritingMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo<WritingQuestion[]>(() => shuffle([
    { prompt: "Schrijf de majrūr-vorm van: الْكِتَابُ", answer: "الْكِتَابِ", explanation: "Majrūr eindigt hier op kasra." },
    { prompt: "Schrijf de manṣūb-vorm van: قَلَمٌ", answer: "قَلَمًا", explanation: "Manṣūb eindigt hier op fatḥatayn." },
    { prompt: "Schrijf de marfūʿ-vorm van: بَيْتٍ", answer: "بَيْتٌ", explanation: "Marfūʿ eindigt hier op ḍammatayn." },
    { prompt: "Maak correct: فِي الْبَيْتُ", answer: "فِي الْبَيْتِ", explanation: "Na فِي komt majrūr." },
    { prompt: "Maak correct: عَلَى الْمَكْتَبُ", answer: "عَلَى الْمَكْتَبِ", explanation: "Na عَلَى komt majrūr." },
    { prompt: "Schrijf de manṣūb-vorm van: طَالِبٌ", answer: "طَالِبًا", explanation: "Manṣūb eindigt hier op fatḥatayn." },
    { prompt: "Schrijf de majrūr-vorm van: الْمَسْجِدُ", answer: "الْمَسْجِدِ", explanation: "Majrūr eindigt hier op kasra." },
    { prompt: "Schrijf de marfūʿ-vorm van: كِتَابٍ", answer: "كِتَابٌ", explanation: "Marfūʿ eindigt hier op ḍammatayn." },
  ]), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(false);
  const question = questions[index];
  const next = () => {
    setIndex((value) => (value + 1) % questions.length);
    setRevealed(false);
    setMarked(false);
  };
  return (
    <section>
      <Header title="Schrijf op papier" onBack={onBack} />
      <div className="score-wrap">
        <div className="score-line"><strong>Vraag {index + 1}/{questions.length}</strong></div>
        <div className="progress"><span style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
      </div>
      <div className="self-check iraab-writing">
        <h3>{question.prompt}</h3>
        <p>Schrijf eerst op papier en kijk goed naar het einde.</p>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && (
          <>
            <div className="answer-reveal">
              <span>Het juiste antwoord is:</span>
              <b className="arabic" dir="rtl">{question.answer}</b>
              <p>{question.explanation}</p>
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

export function IraabCasesModule({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<IraabMode>("menu");
  if (mode === "menu") return <Menu onSelect={setMode} onBack={onBack} />;
  const backToMenu = () => setMode("menu");
  if (mode === "learn") return <IraabCasesLearnMode onBack={backToMenu} />;
  if (mode === "ending") return <RecognizeEndingMode onBack={backToMenu} />;
  if (mode === "case") return <ChooseIraabCaseMode onBack={backToMenu} />;
  if (mode === "harf-jar") return <AfterHarfJarMode onBack={backToMenu} />;
  if (mode === "idafa") return <MudafIlayhiMajroorMode onBack={backToMenu} />;
  if (mode === "mixed") return <MixedIraabCaseMode onBack={backToMenu} />;
  return <IraabWritingMode onBack={backToMenu} />;
}
