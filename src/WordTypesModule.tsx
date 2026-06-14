import { useMemo, useState } from "react";
import { grammarWords } from "./grammarWords";
import { jumlaExamples, type JumlaExample, type JumlaType } from "./jumlaTypesData";
import { vocabulary } from "./vocabulary";

type WordTypesView = "menu" | "word-types" | "jumla";
type WordTypesMode = "menu" | "learn" | "practice";
type JumlaMode = "menu" | "learn" | "classify" | "first-word" | "explain" | "writing";

type ChoiceQuestion = {
  id: string;
  prompt: string;
  sentence: string;
  answer: string;
  options: string[];
  explanation: string;
  arabicOptions?: boolean;
};

const jumlaLabels: Record<JumlaType, string> = {
  ismiyyah: "جُمْلَة اِسْمِيَّة",
  filiyyah: "جُمْلَة فِعْلِيَّة",
};

const firstWordTypeLabels = {
  ism: "اِسْم",
  fi3l: "فِعْل",
};

const shuffle = <T,>(items: readonly T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
};

function Header({ title, onBack, arabicTitle }: { title: string; onBack: () => void; arabicTitle?: string }) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title word-types-title">
        <p>{arabicTitle ?? "اِسْم · فِعْل · حَرْف"}</p>
        <h2>{title}</h2>
      </div>
    </>
  );
}

function Progress({ index, total, score }: { index: number; total: number; score: number }) {
  return (
    <div className="score-wrap">
      <div className="score-line"><strong>Vraag {index + 1}/{total}</strong><span>Score: {score}</span></div>
      <div className="progress"><span style={{ width: `${((index + 1) / total) * 100}%` }} /></div>
    </div>
  );
}

function ModuleMenu({ onSelect, onBack }: { onSelect: (view: Exclude<WordTypesView, "menu">) => void; onBack: () => void }) {
  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title word-types-title">
        <p>Herken اِسْم، فِعْل en حَرْف</p>
        <h2>Ism, fiʿl en ḥarf</h2>
      </div>
      <div className="word-types-badges" aria-label="Woordsoorten">
        <span className="arabic">اِسْم</span>
        <span className="arabic">فِعْل</span>
        <span className="arabic">حَرْف</span>
      </div>
      <div className="practice-choice word-types-main-menu">
        <button className="module-card" onClick={() => onSelect("word-types")}>
          <span className="module-number">1</span>
          <span><strong>Ism, fiʿl of ḥarf?</strong><small>Leer en oefen de drie woordsoorten.</small></span>
        </button>
        <button className="module-card" onClick={() => onSelect("jumla")}>
          <span className="module-number">2</span>
          <span><strong>Jumla ismiyyah / jumla fiʿliyyah</strong><small className="arabic">الجملة الاسمية والجملة الفعلية</small></span>
        </button>
      </div>
    </section>
  );
}

export function WordTypesLearnMode({ onBack }: { onBack: () => void }) {
  return (
    <section>
      <Header title="Ism, fiʿl en ḥarf leren" onBack={onBack} />
      <div className="word-types-learn-list">
        <article className="word-types-theory-card">
          <h3><span className="arabic">اِسْم</span> · naamwoord</h3>
          <p>Een ism is vaak een persoon, ding, plaats of eigenschap.</p>
          <div className="word-types-example-row">
            <b className="arabic">كِتَابٌ</b><b className="arabic">طَالِبٌ</b><b className="arabic">مَدْرَسَةٌ</b>
          </div>
        </article>
        <article className="word-types-theory-card">
          <h3><span className="arabic">فِعْل</span> · werkwoord</h3>
          <p>Een fiʿl vertelt wat iemand doet.</p>
          <div className="word-types-example-row">
            <b className="arabic">تَكْتُبُ</b><b className="arabic">تَقْرَأُ</b><b className="arabic">يَأْكُلُ</b>
          </div>
        </article>
        <article className="word-types-theory-card">
          <h3><span className="arabic">حَرْف</span> · voorzetsel</h3>
          <p>Een ḥarf krijgt betekenis samen met andere woorden.</p>
          <div className="word-types-example-row">
            <b className="arabic">فِي</b><b className="arabic">عَلَى</b>
          </div>
        </article>
      </div>
    </section>
  );
}

export function WordTypesPracticeMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffle([
    ...vocabulary
      .filter((item) => item.arabicType === "ism" || item.arabicType === "fi3l")
      .map((item) => ({
        id: item.id,
        arabic: item.arabicIndefiniteRaf ?? "",
        answer: item.arabicType === "fi3l" ? "فِعْل" : "اِسْم",
      }))
      .filter((item) => item.arabic),
    ...grammarWords
      .filter((word) => word.arabicType === "harf" || word.arabicType === "ism")
      .map((word) => ({
        id: word.id,
        arabic: word.arabic,
        answer: word.arabicType === "harf" ? "حَرْف" : "اِسْم",
      })),
  ]).slice(0, 10), []);
  const choiceQuestions: ChoiceQuestion[] = questions.map((question) => ({
    id: question.id,
    prompt: `Is ${question.arabic} een ism, fiʿl of ḥarf?`,
    sentence: question.arabic,
    answer: question.answer,
    options: ["اِسْم", "فِعْل", "حَرْف"],
    explanation: `${question.arabic} is een ${question.answer}.`,
    arabicOptions: true,
  }));
  return <ChoiceRound title="Ism, fiʿl of ḥarf?" questions={choiceQuestions} onBack={onBack} wordPrompt />;
}

function WordTypesSubmodule({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<WordTypesMode>("menu");
  if (mode === "learn") return <WordTypesLearnMode onBack={() => setMode("menu")} />;
  if (mode === "practice") return <WordTypesPracticeMode onBack={() => setMode("menu")} />;
  return (
    <section>
      <Header title="Ism, fiʿl of ḥarf?" onBack={onBack} />
      <div className="practice-choice theory-choice">
        <button className="module-card" onClick={() => setMode("learn")}><span className="module-number">1</span><span><strong>Leren</strong><small>Bekijk de drie woordsoorten en voorbeelden.</small></span></button>
        <button className="module-card" onClick={() => setMode("practice")}><span className="module-number">2</span><span><strong>Oefenen</strong><small>Kies bij elk woord اِسْم, فِعْل of حَرْف.</small></span></button>
      </div>
    </section>
  );
}

function JumlaExampleCard({ example }: { example: JumlaExample }) {
  return (
    <article className="jumla-example-card">
      <b className="jumla-sentence arabic" dir="rtl">{example.sentence}</b>
      <span>{example.dutch}</span>
      <div className="jumla-analysis">
        <div><span>Eerste woord</span><b className="arabic">{example.firstWord}</b></div>
        <div><span>Type eerste woord</span><b className="arabic">{firstWordTypeLabels[example.firstWordType]}</b></div>
        <div><span>Type zin</span><b className="arabic">{jumlaLabels[example.jumlaType]}</b></div>
      </div>
    </article>
  );
}

export function JumlaTypesLearnMode({ onBack }: { onBack: () => void }) {
  const ismiyyah = jumlaExamples.filter((example) => example.jumlaType === "ismiyyah");
  const filiyyah = jumlaExamples.filter((example) => example.jumlaType === "filiyyah");
  return (
    <section>
      <Header title="Leren" arabicTitle="الجملة الاسمية والجملة الفعلية" onBack={onBack} />
      <div className="jumla-learn-list">
        <article className="jumla-theory-card">
          <h3>1. Wat is een jumla ismiyyah?</h3>
          <p>Een <strong>jumla ismiyyah</strong> is een zin die meestal begint met een <strong>ism</strong>.</p>
          <JumlaExampleCard example={ismiyyah[0]} />
          <div className="jumla-more-examples">{ismiyyah.slice(1).map((example) => <b className="arabic" dir="rtl" key={example.id}>{example.sentence}</b>)}</div>
        </article>
        <article className="jumla-theory-card">
          <h3>2. Wat is een jumla fiʿliyyah?</h3>
          <p>Een <strong>jumla fiʿliyyah</strong> is een zin die meestal begint met een <strong>fiʿl</strong>.</p>
          <JumlaExampleCard example={filiyyah[0]} />
          <div className="jumla-more-examples">{filiyyah.slice(1).map((example) => <b className="arabic" dir="rtl" key={example.id}>{example.sentence}</b>)}</div>
        </article>
        <article className="jumla-theory-card jumla-rule-card">
          <h3>3. Simpele regel</h3>
          <div className="jumla-rule arabic" dir="rtl">اِسْم في البداية ← جُمْلَة اِسْمِيَّة</div>
          <div className="jumla-rule arabic" dir="rtl">فِعْل في البداية ← جُمْلَة فِعْلِيَّة</div>
          <p>Begint de zin met een naamwoord? Dan is het een jumla ismiyyah.</p>
          <p>Begint de zin met een werkwoord? Dan is het een jumla fiʿliyyah.</p>
        </article>
      </div>
    </section>
  );
}

function ChoiceRound({
  title,
  questions,
  onBack,
  wordPrompt = false,
}: {
  title: string;
  questions: ChoiceQuestion[];
  onBack: () => void;
  wordPrompt?: boolean;
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
      <Header title={title} arabicTitle={wordPrompt ? undefined : "الجملة الاسمية والجملة الفعلية"} onBack={onBack} />
      <Progress index={index} total={questions.length} score={score} />
      <article className="jumla-question">
        <h3>{question.prompt}</h3>
        <b className={`arabic ${wordPrompt ? "word-prompt" : "jumla-sentence"}`} dir="rtl">{question.sentence}</b>
      </article>
      <div className="answer-grid jumla-answers">
        {question.options.map((option) => (
          <button
            className={`answer-option ${question.arabicOptions ? "arabic" : "jumla-text-option"} ${selected === option ? correct ? "chosen-correct" : "chosen-wrong" : ""}`}
            disabled={Boolean(selected)}
            dir={question.arabicOptions ? "rtl" : undefined}
            key={option}
            onClick={() => choose(option)}
          >{option}</button>
        ))}
      </div>
      {selected && (
        <div className={`feedback ${correct ? "good" : "try"}`}>
          <strong>{correct ? "Goed!" : "Het juiste antwoord is:"}</strong>
          {!correct && <b className={question.arabicOptions ? "arabic" : ""}>{question.answer}</b>}
          <p>{question.explanation}</p>
          <button className="primary full" onClick={next}>Volgende</button>
        </div>
      )}
    </section>
  );
}

export function ClassifyJumlaMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffle(jumlaExamples).map((example) => ({
    id: example.id,
    prompt: "Is dit een jumla ismiyyah of jumla fiʿliyyah?",
    sentence: example.sentence,
    answer: jumlaLabels[example.jumlaType],
    options: [jumlaLabels.ismiyyah, jumlaLabels.filiyyah],
    explanation: `De zin begint met ${example.firstWord}. Dat is een ${example.firstWordType === "ism" ? "ism" : "fiʿl"}.`,
    arabicOptions: true,
  })), []);
  return <ChoiceRound title="Ismiyyah of fiʿliyyah?" questions={questions} onBack={onBack} />;
}

const sentenceWords = (sentence: string) =>
  [...new Set(sentence.replace(/[.؟]/g, "").split(/\s+/).filter(Boolean))];
const jumlaWordPool = [...new Set(jumlaExamples.flatMap((example) => sentenceWords(example.sentence)))];

export function IdentifyFirstWordMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffle(jumlaExamples).map((example) => ({
    id: example.id,
    prompt: "Wat is het eerste woord?",
    sentence: example.sentence,
    answer: example.firstWord,
    options: shuffle([
      ...sentenceWords(example.sentence),
      ...shuffle(jumlaWordPool.filter((word) => !sentenceWords(example.sentence).includes(word))),
    ].slice(0, 4)),
    explanation: `De zin begint met ${example.firstWord}. Dat is een ${example.firstWordType === "ism" ? "ism" : "fiʿl"}.`,
    arabicOptions: true,
  })), []);
  return <ChoiceRound title="Wat is het eerste woord?" questions={questions} onBack={onBack} />;
}

export function ExplainJumlaTypeMode({ onBack }: { onBack: () => void }) {
  const reasons = [
    "Omdat de zin begint met een fiʿl",
    "Omdat de zin begint met een ism",
    "Omdat er een ḥarf jar in staat",
    "Omdat er een plaatswoord in staat",
  ];
  const questions = useMemo(() => shuffle(jumlaExamples).map((example) => ({
    id: example.id,
    prompt: `Waarom is dit een jumla ${example.jumlaType === "ismiyyah" ? "ismiyyah" : "fiʿliyyah"}?`,
    sentence: example.sentence,
    answer: example.firstWordType === "ism" ? reasons[1] : reasons[0],
    options: reasons,
    explanation: example.explanation,
  })), []);
  return <ChoiceRound title="Waarom deze zin?" questions={questions} onBack={onBack} />;
}

export function JumlaWritingMode({ onBack }: { onBack: () => void }) {
  const examples = useMemo(() => shuffle(jumlaExamples), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(false);
  const [score, setScore] = useState(0);
  const example = examples[index];
  const next = () => {
    setIndex((value) => (value + 1) % examples.length);
    setRevealed(false);
    setMarked(false);
  };
  return (
    <section>
      <Header title="Schrijf op papier" arabicTitle="الجملة الاسمية والجملة الفعلية" onBack={onBack} />
      <Progress index={index} total={examples.length} score={score} />
      <article className="jumla-writing">
        <p>Schrijf op papier:</p>
        <ul>
          <li>het eerste woord</li>
          <li>ism of fiʿl</li>
          <li>jumla ismiyyah of jumla fiʿliyyah</li>
        </ul>
        <b className="jumla-sentence arabic" dir="rtl">{example.sentence}</b>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && (
          <>
            <div className="answer-reveal jumla-answer-reveal">
              <span>Het juiste antwoord is:</span>
              <div><span>Eerste woord</span><b className="arabic">{example.firstWord}</b></div>
              <div><span>Type eerste woord</span><b className="arabic">{firstWordTypeLabels[example.firstWordType]}</b></div>
              <div><span>Type zin</span><b className="arabic">{jumlaLabels[example.jumlaType]}</b></div>
            </div>
            {!marked && <div className="two-buttons"><button className="correct" onClick={() => { setScore((value) => value + 1); setMarked(true); }}>Ik had het juist</button><button className="wrong" onClick={() => setMarked(true)}>Ik had het fout</button></div>}
            {marked && <button className="primary full" onClick={next}>Volgende</button>}
          </>
        )}
      </article>
    </section>
  );
}

export function JumlaTypesSubmodule({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<JumlaMode>("menu");
  if (mode === "learn") return <JumlaTypesLearnMode onBack={() => setMode("menu")} />;
  if (mode === "classify") return <ClassifyJumlaMode onBack={() => setMode("menu")} />;
  if (mode === "first-word") return <IdentifyFirstWordMode onBack={() => setMode("menu")} />;
  if (mode === "explain") return <ExplainJumlaTypeMode onBack={() => setMode("menu")} />;
  if (mode === "writing") return <JumlaWritingMode onBack={() => setMode("menu")} />;
  const items: { mode: Exclude<JumlaMode, "menu">; title: string; subtitle: string }[] = [
    { mode: "learn", title: "Leren", subtitle: "Leer de eenvoudige regel met duidelijke voorbeelden." },
    { mode: "classify", title: "Ismiyyah of fiʿliyyah?", subtitle: "Kies het juiste type zin." },
    { mode: "first-word", title: "Wat is het eerste woord?", subtitle: "Vind het woord waarmee de zin begint." },
    { mode: "explain", title: "Waarom deze zin?", subtitle: "Kies waarom de zin ismiyyah of fiʿliyyah is." },
    { mode: "writing", title: "Schrijf op papier", subtitle: "Analyseer de zin en controleer jezelf." },
  ];
  return (
    <section>
      <Header title="Jumla ismiyyah / jumla fiʿliyyah" arabicTitle="الجملة الاسمية والجملة الفعلية" onBack={onBack} />
      <div className="module-grid jumla-menu">
        {items.map((item, index) => (
          <button className="module-card" key={item.mode} onClick={() => setMode(item.mode)}>
            <span className="module-number">{index + 1}</span>
            <span><strong>{item.title}</strong><small>{item.subtitle}</small></span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function WordTypesModule({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<WordTypesView>("menu");
  if (view === "word-types") return <WordTypesSubmodule onBack={() => setView("menu")} />;
  if (view === "jumla") return <JumlaTypesSubmodule onBack={() => setView("menu")} />;
  return <ModuleMenu onSelect={setView} onBack={onBack} />;
}
