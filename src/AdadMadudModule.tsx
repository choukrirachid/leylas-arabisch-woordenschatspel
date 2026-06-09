import { useMemo, useState } from "react";
import {
  adadConstructForFeminineMadud,
  adadConstructForMasculineMadud,
  buildAdadMadudPhrase,
  dutchNumberWords,
  getEligibleAdadMadudItems,
  type AdadMadudPhrase,
} from "./adadMadud";
import { vocabulary, type VocabularyItem } from "./vocabulary";

type AdadMadudMode = "menu" | "learn" | "flashcards" | "multipleChoice" | "chooseNumber" | "writing";
type Direction = "nl-ar" | "ar-nl";

const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
};

const phrasePool = () =>
  Array.from({ length: 10 }, (_, index) => index + 1).flatMap((number) =>
    getEligibleAdadMadudItems(vocabulary, number).map((item) =>
      buildAdadMadudPhrase(item, number),
    ),
  );

const getItem = (phrase: AdadMadudPhrase) =>
  vocabulary.find((item) => item.id === phrase.itemId)!;

const uniqueOptions = (correct: string, pool: string[], count = 4) =>
  shuffleArray([
    correct,
    ...shuffleArray([...new Set(pool.filter((option) => option !== correct))]).slice(0, count - 1),
  ]);

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title am-title">
        <p>ʿAdad wa Maʿdūd • Getal en geteld woord</p>
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

const menuItems: { mode: Exclude<AdadMadudMode, "menu">; title: string; subtitle: string }[] = [
  { mode: "learn", title: "Leren", subtitle: "Lees de drie regels en bekijk voorbeelden." },
  { mode: "flashcards", title: "Flashcards", subtitle: "Raad eerst en toon daarna pas het antwoord." },
  { mode: "multipleChoice", title: "Meerkeuze", subtitle: "Kies de juiste Arabische of Nederlandse combinatie." },
  { mode: "chooseNumber", title: "Kies het juiste getal", subtitle: "Kies bij 3 t/m 10 de passende getalvorm." },
  { mode: "writing", title: "Schrijf op papier", subtitle: "Schrijf en controleer jezelf neutraal." },
];

function AdadMadudMenu({
  onSelect,
  onBack,
}: {
  onSelect: (mode: Exclude<AdadMadudMode, "menu">) => void;
  onBack: () => void;
}) {
  return (
    <section>
      <Header title="ʿAdad wa Maʿdūd" onBack={onBack} />
      <div className="module-grid am-menu">
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

const findPhrase = (id: string, number: number) =>
  buildAdadMadudPhrase(vocabulary.find((item) => item.id === id)!, number);

function PhraseExample({ phrase }: { phrase: AdadMadudPhrase }) {
  const item = getItem(phrase);
  const parts = phrase.arabic.split(" ");
  return (
    <article className="am-example">
      <h3>{phrase.dutch}</h3>
      <b className="arabic am-phrase">{phrase.arabic}</b>
      <div className="am-badges">
        <span>{item.gender === "mudhakkar" ? "مُذَكَّر" : "مُؤَنَّث"}</span>
        {phrase.number >= 3 && <span>meervoud majrūr</span>}
        <span>ʿAdad: {phrase.number === 1 || phrase.number === 2 ? parts[parts.length - 1] : parts[0]}</span>
        <span>Maʿdūd</span>
      </div>
      <p>{phrase.explanation}</p>
    </article>
  );
}

export function AdadMadudLearnMode({ onBack }: { onBack: () => void }) {
  const examples = useMemo(() => [
    findPhrase("book", 1),
    findPhrase("table", 1),
    findPhrase("book", 2),
    findPhrase("table", 2),
    findPhrase("book", 3),
    findPhrase("table", 3),
    findPhrase("pen", 5),
    findPhrase("car", 6),
    findPhrase("chair", 10),
  ], []);
  return (
    <section>
      <Header title="Leren" onBack={onBack} />
      <div className="am-theory">
        <article>
          <h3>1. Wat betekent ʿAdad wa Maʿdūd?</h3>
          <p><strong>ʿAdad</strong> betekent het getal. <strong>Maʿdūd</strong> betekent het getelde woord.</p>
          <b className="arabic am-phrase">ثَلَاثَةُ كُتُبٍ</b>
          <p><strong>drie</strong> = getal • <strong>boeken</strong> = getelde woord</p>
          <div className="am-badges"><span>ʿAdad: ثَلَاثَةُ</span><span>Maʿdūd: كُتُبٍ</span></div>
        </article>
        <article>
          <h3>2. Regel 1 — Het getal 1</h3>
          <p>Bij <strong>1</strong> komt het getal na het woord. Het getal volgt het geslacht van het woord.</p>
          <div className="am-rule-examples">
            <div><b className="arabic">كِتَابٌ وَاحِدٌ</b><span>één boek • مُذَكَّر</span></div>
            <div><b className="arabic">طَاوِلَةٌ وَاحِدَةٌ</b><span>één tafel • مُؤَنَّث</span></div>
          </div>
          <strong>Bij 1: het getal volgt het woord.</strong>
        </article>
        <article>
          <h3>3. Regel 2 — Het getal 2</h3>
          <p>Bij <strong>2</strong> gebruiken we de dualisvorm. Het getal volgt het geslacht van het woord.</p>
          <div className="am-rule-examples">
            <div><b className="arabic">كِتَابَانِ اِثْنَانِ</b><span>twee boeken • مُذَكَّر</span></div>
            <div><b className="arabic">طَاوِلَتَانِ اِثْنَتَانِ</b><span>twee tafels • مُؤَنَّث</span></div>
          </div>
          <strong>Bij 2: gebruik de dualis en het getal volgt het woord.</strong>
        </article>
        <article>
          <h3>4. Regel 3 — Getallen 3 t/m 10</h3>
          <p>Het getal gebruikt de <strong>tegenovergestelde vorm</strong>. Bij een مُذَكَّر woord gebruiken we de vrouwelijke getalvorm; bij een مُؤَنَّث woord de mannelijke getalvorm.</p>
          <p>Het getelde woord staat in <strong>meervoud majrūr</strong>.</p>
          <div className="am-rule-examples">
            <div><b className="arabic">ثَلَاثَةُ كُتُبٍ</b><span>drie boeken • مُذَكَّر woord</span></div>
            <div><b className="arabic">ثَلَاثُ طَاوِلَاتٍ</b><span>drie tafels • مُؤَنَّث woord</span></div>
          </div>
          <strong>Bij 3 t/m 10: tegenovergestelde vorm + meervoud majrūr.</strong>
        </article>
        <article>
          <h3>5. Mini-overzicht</h3>
          <div className="am-summary">
            <div><b>1</b><span>getal volgt het woord</span></div>
            <div><b>2</b><span>dualis + getal volgt het woord</span></div>
            <div><b>3 t/m 10</b><span>tegenovergestelde vorm + maʿdūd is meervoud majrūr</span></div>
          </div>
        </article>
      </div>
      <h2 className="am-examples-title">6. Voorbeelden uit Leyla's woordenschat</h2>
      <div className="am-example-list">{examples.map((phrase) => <PhraseExample key={`${phrase.itemId}-${phrase.number}`} phrase={phrase} />)}</div>
    </section>
  );
}

export function AdadMadudFlashcardsMode({ onBack }: { onBack: () => void }) {
  const [direction, setDirection] = useState<Direction | null>(null);
  const questions = useMemo(() => shuffleArray(phrasePool()).slice(0, 20), [direction]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const phrase = questions[index];
  const next = () => { setIndex((value) => (value + 1) % questions.length); setRevealed(false); };
  if (!direction) return (
    <section>
      <Header title="Flashcards" onBack={onBack} />
      <div className="practice-choice">
        <button className="module-card" onClick={() => setDirection("nl-ar")}><span className="module-number">A</span><span><strong>Nederlands → Arabisch</strong><small>Raad de volledige Arabische combinatie.</small></span></button>
        <button className="module-card" onClick={() => setDirection("ar-nl")}><span className="module-number">B</span><span><strong>Arabisch → Nederlands</strong><small>Herken getal en geteld woord.</small></span></button>
      </div>
    </section>
  );
  return (
    <section>
      <Header title={direction === "nl-ar" ? "Nederlands → Arabisch" : "Arabisch → Nederlands"} onBack={() => { setDirection(null); setIndex(0); setRevealed(false); }} />
      <Progress index={index} total={questions.length} />
      <article className="flashcard am-flashcard">
        <h3 className={direction === "ar-nl" ? "arabic am-question-arabic" : "am-question-dutch"}>{direction === "nl-ar" ? phrase.dutch : phrase.arabic}</h3>
        {revealed && (
          <div className="answer-reveal">
            <span>Het juiste antwoord is:</span>
            <b className={direction === "nl-ar" ? "arabic" : ""}>{direction === "nl-ar" ? phrase.arabic : phrase.dutch}</b>
            <p>{phrase.explanation}</p>
          </div>
        )}
        {!revealed
          ? <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>
          : <button className="primary full" onClick={next}>Volgende</button>}
      </article>
    </section>
  );
}

type ChoiceQuestion = {
  prompt: string;
  answer: string;
  options: string[];
  explanation: string;
  arabicPrompt?: boolean;
  arabicOptions?: boolean;
};

function ChoiceRound({ title, questions, onBack }: { title: string; questions: ChoiceQuestion[]; onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const question = questions[index];
  const next = () => { setIndex((value) => (value + 1) % questions.length); setSelected(null); };
  return (
    <section>
      <Header title={title} onBack={onBack} />
      <Progress index={index} total={questions.length} />
      <div className="am-question"><h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3></div>
      <div className="answer-grid">
        {question.options.map((option) => (
          <button
            className={`answer-option ${question.arabicOptions ? "arabic" : "am-text-option"} ${selected === option ? option === question.answer ? "chosen-correct" : "chosen-wrong" : ""}`}
            disabled={Boolean(selected)}
            key={option}
            onClick={() => setSelected(option)}
          >{option}</button>
        ))}
      </div>
      {selected && (
        <div className={`feedback ${selected === question.answer ? "good" : "try"}`}>
          <strong>{selected === question.answer ? "Goed!" : "Het juiste antwoord is:"}</strong>
          {selected !== question.answer && <b className={question.arabicOptions ? "arabic" : ""}>{question.answer}</b>}
          <p>{question.explanation}</p>
          <button className="primary full" onClick={next}>Volgende</button>
        </div>
      )}
    </section>
  );
}

export function AdadMadudMultipleChoiceMode({ onBack }: { onBack: () => void }) {
  const [direction, setDirection] = useState<Direction | null>(null);
  const phrases = useMemo(() => phrasePool(), []);
  const questions = useMemo(() => {
    if (!direction) return [];
    return shuffleArray(phrases).slice(0, 15).map((phrase) => ({
      prompt: direction === "nl-ar" ? phrase.dutch : phrase.arabic,
      answer: direction === "nl-ar" ? phrase.arabic : phrase.dutch,
      options: uniqueOptions(
        direction === "nl-ar" ? phrase.arabic : phrase.dutch,
        phrases.map((other) => direction === "nl-ar" ? other.arabic : other.dutch),
      ),
      explanation: phrase.explanation,
      arabicPrompt: direction === "ar-nl",
      arabicOptions: direction === "nl-ar",
    }));
  }, [direction, phrases]);
  if (!direction) return (
    <section>
      <Header title="Meerkeuze" onBack={onBack} />
      <div className="practice-choice">
        <button className="module-card" onClick={() => setDirection("nl-ar")}><span className="module-number">A</span><span><strong>Nederlands → Arabisch</strong><small>Kies de juiste volledige combinatie.</small></span></button>
        <button className="module-card" onClick={() => setDirection("ar-nl")}><span className="module-number">B</span><span><strong>Arabisch → Nederlands</strong><small>Kies de juiste Nederlandse betekenis.</small></span></button>
      </div>
    </section>
  );
  return <ChoiceRound title={direction === "nl-ar" ? "Nederlands → Arabisch" : "Arabisch → Nederlands"} questions={questions} onBack={() => setDirection(null)} />;
}

export function AdadMadudChooseNumberMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => {
    const items = getEligibleAdadMadudItems(vocabulary, 3);
    return shuffleArray(Array.from({ length: 20 }, (_, index) => {
      const number = 3 + (index % 8);
      const item = items[index % items.length];
      const masculine = item.gender === "mudhakkar";
      const answer = masculine ? adadConstructForMasculineMadud[number] : adadConstructForFeminineMadud[number];
      const opposite = masculine ? adadConstructForFeminineMadud[number] : adadConstructForMasculineMadud[number];
      return {
        prompt: `${dutchNumberWords[number]} + ${item.arabicIndefinitePluralJarr}`,
        answer,
        options: shuffleArray([answer, opposite]),
        explanation: `Het woord is ${masculine ? "مُذَكَّر, daarom gebruiken we de vrouwelijke" : "مُؤَنَّث, daarom gebruiken we de mannelijke"} getalvorm.`,
        arabicPrompt: true,
        arabicOptions: true,
      };
    }));
  }, []);
  return <ChoiceRound title="Kies het juiste getal" questions={questions} onBack={onBack} />;
}

export function AdadMadudWritingMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => {
    const preferred: [string, number][] = [
      ["book", 1], ["table", 1], ["book", 2], ["table", 2], ["book", 3],
      ["table", 3], ["pen", 5], ["car", 6], ["chair", 10],
    ];
    return shuffleArray(preferred.map(([id, number]) => findPhrase(id, number)));
  }, []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(false);
  const phrase = questions[index];
  const next = () => {
    setIndex((value) => (value + 1) % questions.length);
    setRevealed(false);
    setMarked(false);
  };
  return (
    <section>
      <Header title="Schrijf op papier" onBack={onBack} />
      <Progress index={index} total={questions.length} />
      <div className="self-check am-writing">
        <h3>Schrijf: {phrase.dutch}</h3>
        <p>Schrijf met volledige tashkīl en eind-iʿrāb.</p>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && (
          <>
            <div className="answer-reveal"><span>Het juiste antwoord is:</span><b className="arabic">{phrase.arabic}</b><p>{phrase.explanation}</p></div>
            {!marked
              ? <div className="two-buttons"><button className="correct" onClick={() => setMarked(true)}>Ik had het juist</button><button className="wrong" onClick={() => setMarked(true)}>Ik had het fout</button></div>
              : <button className="primary full" onClick={next}>Volgende</button>}
          </>
        )}
      </div>
    </section>
  );
}

export function AdadMadudModule({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<AdadMadudMode>("menu");
  if (mode === "menu") return <AdadMadudMenu onSelect={setMode} onBack={onBack} />;
  const backToMenu = () => setMode("menu");
  if (mode === "learn") return <AdadMadudLearnMode onBack={backToMenu} />;
  if (mode === "flashcards") return <AdadMadudFlashcardsMode onBack={backToMenu} />;
  if (mode === "multipleChoice") return <AdadMadudMultipleChoiceMode onBack={backToMenu} />;
  if (mode === "chooseNumber") return <AdadMadudChooseNumberMode onBack={backToMenu} />;
  return <AdadMadudWritingMode onBack={backToMenu} />;
}

