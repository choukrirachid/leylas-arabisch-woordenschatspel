import { useMemo, useState } from "react";
import { idafaPhrases, type IdafaPhrase } from "./mudafMudafIlayhiData";

type IdafaMode =
  | "menu" | "learn" | "flashcards" | "mudaf" | "mudaf-ilayhi"
  | "possession" | "choose" | "complete" | "meaning" | "correct" | "writing";

type ChoiceQuestion = {
  id: string;
  prompt: string;
  detail?: string;
  answer: string;
  options: string[];
  explanation: string;
  arabicPrompt?: boolean;
  arabicOptions?: boolean;
};

const shuffleArray = <T,>(items: T[]): T[] => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
};

const fourOptions = (answer: string, pool: string[]): string[] =>
  shuffleArray([answer, ...shuffleArray([...new Set(pool.filter((item) => item !== answer))]).slice(0, 3)]);

const replaceFinalMark = (word: string, mark: string) => word.replace(/[ًٌٍَُِ]$/, mark);
const withTanwin = (word: string) => replaceFinalMark(word, "ٌ");
const withKasra = (word: string) => replaceFinalMark(word, "ِ");
const withDamma = (word: string) => replaceFinalMark(word, "ُ");
const withFatha = (word: string) => replaceFinalMark(word, "َ");

const definiteMudaf: Record<string, string> = {
  "كِتَابُ": "الْكِتَابُ",
  "قَلَمُ": "الْقَلَمُ",
  "بَابُ": "الْبَابُ",
  "مَكْتَبُ": "الْمَكْتَبُ",
  "حَقِيبَةُ": "الْحَقِيبَةُ",
  "كُرْسِيُّ": "الْكُرْسِيُّ",
  "مِفْتَاحُ": "الْمِفْتَاحُ",
  "كُوبُ": "الْكُوبُ",
  "طَبَقُ": "الطَّبَقُ",
};

const wrongIdafaForms = (item: IdafaPhrase): string[] => [
  `${definiteMudaf[item.mudaf] ?? `الْ${item.mudaf}`} ${item.mudafIlayhi}`,
  `${withTanwin(item.mudaf)} ${item.mudafIlayhi}`,
  `${item.mudaf} ${withDamma(item.mudafIlayhi)}`,
];

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title idafa-title">
        <p>المضاف والمضاف إليه</p>
        <h2>{title}</h2>
      </div>
    </>
  );
}

function Progress({ index, total, score }: { index: number; total: number; score?: number }) {
  return (
    <div className="score-wrap">
      <div className="score-line">
        <strong>Vraag {index + 1}/{total}</strong>
        {typeof score === "number" && <span>Score: {score}</span>}
      </div>
      <div className="progress"><span style={{ width: `${((index + 1) / total) * 100}%` }} /></div>
    </div>
  );
}

const menuItems: { mode: Exclude<IdafaMode, "menu">; title: string; subtitle: string }[] = [
  { mode: "learn", title: "Leren", subtitle: "Leer eenvoudig hoe twee woorden samen vaak “van” betekenen." },
  { mode: "flashcards", title: "Flashcards", subtitle: "Raad de combinatie in beide richtingen." },
  { mode: "mudaf", title: "Wat is de muḍāf?", subtitle: "Kies het eerste woord: het ding waarover we praten." },
  { mode: "mudaf-ilayhi", title: "Wat is de muḍāf ilayhi?", subtitle: "Kies het tweede woord: van wie of waarvan." },
  { mode: "possession", title: "Wat betekent “van”?", subtitle: "Begrijp bezit, horen bij, een deel en inhoud." },
  { mode: "choose", title: "Kies de juiste combinatie", subtitle: "Let op الـ, tanwīn en majrūr." },
  { mode: "complete", title: "Maak de zin compleet", subtitle: "Vul de muḍāf of de muḍāf ilayhi in." },
  { mode: "meaning", title: "Koppel betekenis", subtitle: "Kies de juiste Nederlandse betekenis." },
  { mode: "correct", title: "Correct of fout?", subtitle: "Herken veelgemaakte fouten in een iḍāfa." },
  { mode: "writing", title: "Schrijf op papier", subtitle: "Schrijf de hele iḍāfa en controleer jezelf." },
];

function IdafaMenu({ onSelect, onBack }: {
  onSelect: (mode: Exclude<IdafaMode, "menu">) => void;
  onBack: () => void;
}) {
  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title idafa-title">
        <p>المضاف والمضاف إليه</p>
        <h2>Muḍāf / Muḍāf ilayhi</h2>
      </div>
      <div className="module-grid idafa-menu">
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

function IdafaExample({ item, showExplanation = false }: { item: IdafaPhrase; showExplanation?: boolean }) {
  return (
    <div className="idafa-example">
      <b className="arabic" dir="rtl">{item.phrase}</b>
      <span>{item.dutch}</span>
      <div className="idafa-parts">
        <span><b className="arabic">{item.mudaf}</b><small>Muḍāf · المضاف</small></span>
        <span><b className="arabic">{item.mudafIlayhi}</b><small>Muḍāf ilayhi · المضاف إليه</small></span>
      </div>
      {showExplanation && <p>{item.childExplanation}</p>}
    </div>
  );
}

export function MudafMudafIlayhiLearnMode({ onBack }: { onBack: () => void }) {
  const main = idafaPhrases[0];
  return (
    <section>
      <Header title="Leren" onBack={onBack} />
      <div className="idafa-learn-list">
        <article className="idafa-theory-card">
          <h3>1. Wat is iḍāfa?</h3>
          <IdafaExample item={main} />
          <p>Een iḍāfa is een combinatie van twee woorden. Je gebruikt haar vaak om te zeggen <strong>van wie of waarvan iets is</strong>.</p>
        </article>
        <article className="idafa-theory-card">
          <h3>2. Twee delen</h3>
          <div className="idafa-formula arabic">كِتَابُ الطَّالِبِ</div>
          <div className="idafa-parts large">
            <span><b className="arabic">كِتَابُ</b><small>eerste woord · المضاف</small></span>
            <span><b className="arabic">الطَّالِبِ</b><small>tweede woord · المضاف إليه</small></span>
          </div>
          <p>De muḍāf is het ding waarover we praten. De muḍāf ilayhi zegt van wie of waarvan het is.</p>
        </article>
        <article className="idafa-theory-card">
          <h3>3. De “van”-regel</h3>
          <div className="idafa-formula">ding + van wie / waarvan</div>
          <div className="idafa-formula arabic">المضاف + المضاف إليه</div>
          <div className="idafa-example-grid">
            {idafaPhrases.slice(0, 3).map((item) => <IdafaExample item={item} key={item.id} />)}
          </div>
          <p>Als je in het Nederlands <strong>van</strong> kan zeggen, gebruik je in het Arabisch vaak een iḍāfa.</p>
        </article>
        <article className="idafa-theory-card">
          <h3>4. Bezit en verbondenheid</h3>
          <div className="idafa-kind-grid">
            {[
              ["Bezit", idafaPhrases[0]],
              ["Hoort bij", idafaPhrases[6]],
              ["Deel van", idafaPhrases[2]],
              ["Inhoud of soort", idafaPhrases[8]],
            ].map(([label, item]) => (
              <div key={label as string}>
                <strong>{label as string}</strong>
                <b className="arabic">{(item as IdafaPhrase).phrase}</b>
                <span>{(item as IdafaPhrase).dutch}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="idafa-theory-card">
          <h3>5. Regel voor de muḍāf</h3>
          <p>De muḍāf komt eerst. Hij krijgt <strong>geen الـ</strong> en <strong>geen tanwīn</strong>.</p>
          <div className="idafa-correct-grid">
            <div className="good"><span>Correct</span><b className="arabic">كِتَابُ الطَّالِبِ</b></div>
            <div className="wrong"><span>Niet correct</span><b className="arabic">الْكِتَابُ الطَّالِبِ</b><b className="arabic">كِتَابٌ الطَّالِبِ</b></div>
          </div>
        </article>
        <article className="idafa-theory-card">
          <h3>6. Regel voor de muḍāf ilayhi</h3>
          <p>De muḍāf ilayhi komt tweede en staat in <strong>majrūr</strong>. Hij eindigt vaak met kasra.</p>
          <div className="idafa-correct-grid">
            <div className="good"><span>Correct</span><b className="arabic">الطَّالِبِ</b></div>
            <div className="wrong"><span>Niet correct</span><b className="arabic">الطَّالِبُ</b></div>
          </div>
        </article>
        <article className="idafa-theory-card">
          <h3>7. Samenvatting</h3>
          <div className="idafa-formula arabic">المضاف + المضاف إليه</div>
          <ul className="idafa-rules">
            <li>De muḍāf komt eerst.</li>
            <li>De muḍāf heeft geen الـ.</li>
            <li>De muḍāf heeft geen tanwīn.</li>
            <li>De muḍāf ilayhi komt tweede.</li>
            <li>De muḍāf ilayhi staat in majrūr.</li>
          </ul>
        </article>
        <h3 className="idafa-all-title">Alle vaste voorbeelden</h3>
        <div className="idafa-example-grid">
          {idafaPhrases.map((item) => <IdafaExample item={item} showExplanation key={item.id} />)}
        </div>
      </div>
    </section>
  );
}

type FlashcardDirection = "ar-nl" | "nl-ar";

export function MudafMudafIlayhiFlashcards({ onBack }: { onBack: () => void }) {
  const cards = useMemo(() => shuffleArray(idafaPhrases), []);
  const [direction, setDirection] = useState<FlashcardDirection | null>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  if (!direction) {
    return (
      <section>
        <Header title="Flashcards" onBack={onBack} />
        <div className="practice-choice">
          <button className="module-card" onClick={() => setDirection("ar-nl")}><span className="module-number">A</span><span><strong>Arabisch → Nederlands</strong><small>Lees de iḍāfa en raad de betekenis.</small></span></button>
          <button className="module-card" onClick={() => setDirection("nl-ar")}><span className="module-number">B</span><span><strong>Nederlands → Arabisch</strong><small>Lees de betekenis en raad de iḍāfa.</small></span></button>
        </div>
      </section>
    );
  }
  const card = cards[index];
  const next = () => {
    setIndex((value) => (value + 1) % cards.length);
    setRevealed(false);
  };
  return (
    <section>
      <Header title={`Flashcards ${direction === "ar-nl" ? "Arabisch → Nederlands" : "Nederlands → Arabisch"}`} onBack={() => setDirection(null)} />
      <Progress index={index} total={cards.length} />
      <div className="flashcard idafa-flashcard">
        <p>Raad eerst zelf.</p>
        <h3 className={direction === "ar-nl" ? "arabic" : ""}>{direction === "ar-nl" ? card.phrase : card.dutch}</h3>
        {!revealed
          ? <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>
          : <>
              <div className="answer-reveal">
                <span>Antwoord:</span>
                <b className={direction === "nl-ar" ? "arabic" : "idafa-dutch-answer"}>{direction === "nl-ar" ? card.phrase : card.dutch}</b>
                <div className="idafa-mini-analysis"><span><b className="arabic">{card.mudaf}</b> = muḍāf</span><span><b className="arabic">{card.mudafIlayhi}</b> = muḍāf ilayhi</span></div>
              </div>
              <button className="primary full" onClick={next}>Volgende</button>
            </>}
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
    if (index + 1 >= questions.length) {
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
        <p>Je hebt alle vragen van {title} afgerond.</p>
        <button className="primary full" onClick={() => { setIndex(0); setSelected(null); setScore(0); setFinished(false); }}>Ronde opnieuw</button>
        <button className="secondary full" onClick={onBack}>Terug naar Muḍāf / Muḍāf ilayhi</button>
      </section>
    );
  }
  return (
    <section>
      <Header title={title} onBack={onBack} />
      <Progress index={index} total={questions.length} score={score} />
      <div className="idafa-question">
        <h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3>
        {question.detail && <p className="arabic" dir="rtl">{question.detail}</p>}
      </div>
      <div className="answer-grid">
        {question.options.map((option) => (
          <button
            key={option}
            className={`answer-option ${question.arabicOptions ? "arabic" : "idafa-text-option"} ${selected === option ? option === question.answer ? "chosen-correct" : "chosen-wrong" : ""}`}
            disabled={Boolean(selected)}
            onClick={() => choose(option)}
            dir={question.arabicOptions ? "rtl" : undefined}
          >{option}</button>
        ))}
      </div>
      {selected && (
        <div className={`feedback ${correct ? "good" : "try"}`}>
          <strong>{correct ? "Goed!" : "Het juiste antwoord is:"}</strong>
          {!correct && <b className={question.arabicOptions ? "arabic" : "idafa-feedback-answer"}>{question.answer}</b>}
          <p>{question.explanation}</p>
          <button className="primary full" onClick={next}>Volgende</button>
        </div>
      )}
    </section>
  );
}

export function IdentifyMudafMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(idafaPhrases).map((item) => ({
    id: `mudaf-${item.id}`, prompt: "Wat is de muḍāf?", detail: item.phrase,
    answer: item.mudaf, options: shuffleArray([item.mudaf, item.mudafIlayhi]),
    explanation: "De muḍāf is het eerste woord. Het is het ding waarover we praten.", arabicOptions: true,
  })), []);
  return <ChoiceRound title="Wat is de muḍāf?" questions={questions} onBack={onBack} />;
}

export function IdentifyMudafIlayhiMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(idafaPhrases).map((item) => ({
    id: `ilayhi-${item.id}`, prompt: "Wat is de muḍāf ilayhi?", detail: item.phrase,
    answer: item.mudafIlayhi, options: shuffleArray([item.mudaf, item.mudafIlayhi]),
    explanation: "De muḍāf ilayhi is het tweede woord. Het zegt van wie of waarvan iets is.", arabicOptions: true,
  })), []);
  return <ChoiceRound title="Wat is de muḍāf ilayhi?" questions={questions} onBack={onBack} />;
}

export function IdafaPossessionMeaningMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(idafaPhrases).map((item) => ({
    id: `van-${item.id}`, prompt: "Wat betekent deze combinatie?", detail: item.phrase,
    answer: item.dutch,
    options: fourOptions(item.dutch, [
      `${item.dutch.split(" van ")[1] ?? "iets"} van ${item.dutch.split(" van ")[0]}`,
      "twee losse woorden zonder verband",
      "iemand doet iets",
      ...idafaPhrases.map((phrase) => phrase.dutch),
    ]),
    explanation: `${item.childExplanation} Deze iḍāfa zegt van wie of waarvan iets is.`,
  })), []);
  return <ChoiceRound title="Wat betekent “van”?" questions={questions} onBack={onBack} />;
}

export function ChooseCorrectIdafaMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(idafaPhrases).map((item) => ({
    id: `choose-${item.id}`, prompt: `Kies de juiste combinatie: ${item.dutch}`,
    answer: item.phrase, options: shuffleArray([item.phrase, ...wrongIdafaForms(item)]),
    explanation: "De muḍāf heeft geen الـ en geen tanwīn. De muḍāf ilayhi staat in majrūr.", arabicOptions: true,
  })), []);
  return <ChoiceRound title="Kies de juiste combinatie" questions={questions} onBack={onBack} />;
}

export function CompleteIdafaMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(idafaPhrases).map((item, index) => {
    const missingMudaf = index % 2 === 1;
    return missingMudaf ? {
      id: `complete-mudaf-${item.id}`, prompt: item.dutch, detail: `______ ${item.mudafIlayhi}`,
      answer: item.mudaf,
      options: shuffleArray([item.mudaf, definiteMudaf[item.mudaf] ?? `الْ${item.mudaf}`, withTanwin(item.mudaf), withKasra(item.mudaf)]),
      explanation: "De muḍāf komt eerst en krijgt geen الـ en geen tanwīn.", arabicOptions: true,
    } : {
      id: `complete-ilayhi-${item.id}`, prompt: item.dutch, detail: `${item.mudaf} ______`,
      answer: item.mudafIlayhi,
      options: shuffleArray([item.mudafIlayhi, withDamma(item.mudafIlayhi), withFatha(item.mudafIlayhi), item.mudaf]),
      explanation: "De muḍāf ilayhi komt tweede en staat in majrūr.", arabicOptions: true,
    };
  }), []);
  return <ChoiceRound title="Maak de zin compleet" questions={questions} onBack={onBack} />;
}

export function MatchIdafaMeaningMode({ onBack }: { onBack: () => void }) {
  const pool = idafaPhrases.map((item) => item.dutch);
  const questions = useMemo(() => shuffleArray(idafaPhrases).map((item) => ({
    id: `meaning-${item.id}`, prompt: item.phrase, answer: item.dutch,
    options: fourOptions(item.dutch, pool), explanation: item.childExplanation, arabicPrompt: true,
  })), []);
  return <ChoiceRound title="Koppel betekenis" questions={questions} onBack={onBack} />;
}

export function CorrectOrWrongIdafaMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(idafaPhrases.flatMap((item, index) => {
    const wrong = wrongIdafaForms(item)[index % 3];
    return [
      {
        id: `correct-${item.id}`, prompt: "Is deze iḍāfa correct?", detail: item.phrase,
        answer: "Correct", options: ["Correct", "Fout"],
        explanation: "De muḍāf heeft geen الـ en geen tanwīn. De muḍāf ilayhi staat in majrūr.",
      },
      {
        id: `wrong-${item.id}`, prompt: "Is deze iḍāfa correct?", detail: wrong,
        answer: "Fout", options: ["Correct", "Fout"],
        explanation: `Deze vorm is niet correct. De juiste combinatie is ${item.phrase}.`,
      },
    ];
  })), []);
  return <ChoiceRound title="Correct of fout?" questions={questions} onBack={onBack} />;
}

export function IdafaWritingMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(idafaPhrases), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [marked, setMarked] = useState(false);
  const item = questions[index];
  const next = () => {
    setIndex((value) => (value + 1) % questions.length);
    setRevealed(false);
    setMarked(false);
  };
  return (
    <section>
      <Header title="Schrijf op papier" onBack={onBack} />
      <Progress index={index} total={questions.length} />
      <div className="self-check idafa-writing">
        <h3>Schrijf in het Arabisch:</h3>
        <p>{item.dutch}</p>
        <small>Let op: geen الـ of tanwīn op de muḍāf, en majrūr op de muḍāf ilayhi.</small>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && (
          <>
            <div className="answer-reveal">
              <span>Het juiste antwoord is:</span>
              <b className="arabic" dir="rtl">{item.phrase}</b>
              <p>{item.grammarExplanation}</p>
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

export function MudafMudafIlayhiModule({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<IdafaMode>("menu");
  if (mode === "menu") return <IdafaMenu onSelect={setMode} onBack={onBack} />;
  const backToMenu = () => setMode("menu");
  if (mode === "learn") return <MudafMudafIlayhiLearnMode onBack={backToMenu} />;
  if (mode === "flashcards") return <MudafMudafIlayhiFlashcards onBack={backToMenu} />;
  if (mode === "mudaf") return <IdentifyMudafMode onBack={backToMenu} />;
  if (mode === "mudaf-ilayhi") return <IdentifyMudafIlayhiMode onBack={backToMenu} />;
  if (mode === "possession") return <IdafaPossessionMeaningMode onBack={backToMenu} />;
  if (mode === "choose") return <ChooseCorrectIdafaMode onBack={backToMenu} />;
  if (mode === "complete") return <CompleteIdafaMode onBack={backToMenu} />;
  if (mode === "meaning") return <MatchIdafaMeaningMode onBack={backToMenu} />;
  if (mode === "correct") return <CorrectOrWrongIdafaMode onBack={backToMenu} />;
  return <IdafaWritingMode onBack={backToMenu} />;
}
