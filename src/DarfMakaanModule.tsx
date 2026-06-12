import { useMemo, useState } from "react";
import {
  getPlaceAdverb,
  placeAdverbPhrases,
  placeAdverbs,
  placeAdverbSentences,
} from "./placeAdverbs";

type DarfMode =
  | "menu" | "learn" | "flashcards" | "translate" | "choose"
  | "complete" | "meaning" | "identify" | "writing";

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
  shuffleArray([answer, ...shuffleArray(pool.filter((item) => item !== answer)).slice(0, 3)]);

function Header({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title zarf-title">
        <p>ظُرُوف الْمَكَان</p>
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

const menuItems: { mode: Exclude<DarfMode, "menu">; title: string; subtitle: string }[] = [
  { mode: "learn", title: "Leren", subtitle: "Bekijk de zes plaatswoorden en hun majrūr-combinaties." },
  { mode: "flashcards", title: "Flashcards", subtitle: "Raad eerst zelf en toon daarna pas het antwoord." },
  { mode: "translate", title: "Vertalen", subtitle: "Vertaal in beide richtingen." },
  { mode: "choose", title: "Kies de juiste ẓarf", subtitle: "Kies het Arabische plaatswoord bij de betekenis." },
  { mode: "complete", title: "Maak de zin compleet", subtitle: "Vul de juiste ẓarf voor de majrūr-vorm in." },
  { mode: "meaning", title: "Koppel zin en betekenis", subtitle: "Kies de Nederlandse betekenis van de combinatie." },
  { mode: "identify", title: "Waar staat het woord?", subtitle: "Wijs de ẓarf in een Arabische zin aan." },
  { mode: "writing", title: "Schrijf op papier", subtitle: "Schrijf de hele combinatie en controleer jezelf." },
];

function DarfMenu({ onSelect, onBack }: {
  onSelect: (mode: Exclude<DarfMode, "menu">) => void;
  onBack: () => void;
}) {
  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title zarf-title">
        <p>ظُرُوف الْمَكَان</p>
        <h2>Darf makaan</h2>
      </div>
      <div className="module-grid zarf-menu">
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

export function DarfMakaanLearnMode({ onBack }: { onBack: () => void }) {
  return (
    <section>
      <Header title="Leren" onBack={onBack} />
      <div className="zarf-learn-list">
        <article className="zarf-theory-card">
          <h3>Wat is een ظَرْف مَكَان?</h3>
          <p><strong>ظَرْف مَكَان</strong> betekent bijwoord van plaats. Het zegt waar iets is.</p>
          <p>Na een ẓarf komt vaak een zelfstandig naamwoord in de majrūr-vorm. In deze voorbeelden zie je daarom kasra aan het einde.</p>
        </article>
        <div className="zarf-card-grid">
          {placeAdverbPhrases.map((phrase) => {
            const adverb = getPlaceAdverb(phrase.adverbId);
            return (
              <article className="zarf-learn-card" key={phrase.id}>
                <b className="arabic">{adverb.arabic}</b>
                <strong>{adverb.dutch}</strong>
                <div className="zarf-example">
                  <span className="arabic" dir="rtl">{phrase.arabic}</span>
                  <span>{phrase.dutch}</span>
                </div>
                <small><span className="arabic">{phrase.nounJarr}</span> staat in de majrūr-vorm.</small>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type FlashcardDirection = "ar-nl" | "nl-ar";

export function DarfMakaanFlashcardsMode({ onBack }: { onBack: () => void }) {
  const cards = useMemo(() => shuffleArray(placeAdverbs), []);
  const [direction, setDirection] = useState<FlashcardDirection | null>(null);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  if (!direction) {
    return (
      <section>
        <Header title="Flashcards" onBack={onBack} />
        <div className="practice-choice">
          <button className="module-card" onClick={() => setDirection("ar-nl")}>
            <span className="module-number">A</span>
            <span><strong>Arabisch → Nederlands</strong><small>Lees de ẓarf en raad de betekenis.</small></span>
          </button>
          <button className="module-card" onClick={() => setDirection("nl-ar")}>
            <span className="module-number">B</span>
            <span><strong>Nederlands → Arabisch</strong><small>Lees de betekenis en raad de ẓarf.</small></span>
          </button>
        </div>
      </section>
    );
  }

  const card = cards[index];
  const question = direction === "ar-nl" ? card.arabic : card.dutch;
  const answer = direction === "ar-nl" ? card.dutch : card.arabic;
  const next = () => {
    setIndex((value) => (value + 1) % cards.length);
    setRevealed(false);
  };

  return (
    <section>
      <Header title={`Flashcards ${direction === "ar-nl" ? "Arabisch → Nederlands" : "Nederlands → Arabisch"}`} onBack={() => setDirection(null)} />
      <Progress index={index} total={cards.length} />
      <div className="flashcard zarf-flashcard">
        <p>Raad eerst zelf.</p>
        <h3 className={direction === "ar-nl" ? "arabic" : ""}>{question}</h3>
        {!revealed
          ? <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>
          : <>
              <div className="answer-reveal">
                <span>Antwoord:</span>
                <b className={direction === "nl-ar" ? "arabic" : "zarf-dutch-answer"}>{answer}</b>
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
  const restart = () => {
    setIndex(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <section className="results">
        <p className="eyebrow">Ronde klaar</p>
        <h2>{score}/{questions.length}</h2>
        <p>Je hebt alle vragen van {title} afgerond.</p>
        <button className="primary full" onClick={restart}>Ronde opnieuw</button>
        <button className="secondary full" onClick={onBack}>Terug naar Darf makaan</button>
      </section>
    );
  }

  return (
    <section>
      <Header title={title} onBack={onBack} />
      <Progress index={index} total={questions.length} score={score} />
      <div className="zarf-question">
        <h3 className={question.arabicPrompt ? "arabic" : ""}>{question.prompt}</h3>
        {question.detail && <p className="arabic" dir="rtl">{question.detail}</p>}
      </div>
      <div className="answer-grid">
        {question.options.map((option) => (
          <button
            key={option}
            className={`answer-option ${question.arabicOptions ? "arabic" : "zarf-text-option"} ${selected === option ? option === question.answer ? "chosen-correct" : "chosen-wrong" : ""}`}
            disabled={Boolean(selected)}
            onClick={() => choose(option)}
            dir={question.arabicOptions ? "rtl" : undefined}
          >{option}</button>
        ))}
      </div>
      {selected && (
        <div className={`feedback ${correct ? "good" : "try"}`}>
          <strong>{correct ? "Goed!" : "Het juiste antwoord is:"}</strong>
          {!correct && <b className={question.arabicOptions ? "arabic" : "zarf-feedback-answer"}>{question.answer}</b>}
          <p>{question.explanation}</p>
          <button className="primary full" onClick={next}>Volgende</button>
        </div>
      )}
    </section>
  );
}

const makeTranslationQuestions = (): ChoiceQuestion[] => {
  const arabicPool = placeAdverbs.map((item) => item.arabic);
  const dutchPool = placeAdverbs.map((item) => item.dutch);
  return shuffleArray(placeAdverbs.flatMap((adverb) => [
    {
      id: `translate-ar-${adverb.id}`,
      prompt: "Wat betekent deze ẓarf?",
      detail: adverb.arabic,
      answer: adverb.dutch,
      options: fourOptions(adverb.dutch, dutchPool),
      explanation: `${adverb.arabic} betekent ${adverb.dutch}.`,
    },
    {
      id: `translate-nl-${adverb.id}`,
      prompt: `Wat is het Arabisch voor: ${adverb.dutch}?`,
      answer: adverb.arabic,
      options: fourOptions(adverb.arabic, arabicPool),
      explanation: `${adverb.dutch} is ${adverb.arabic}.`,
      arabicOptions: true,
    },
  ]));
};

export function DarfMakaanTranslateMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(makeTranslationQuestions, []);
  return <ChoiceRound title="Vertalen" questions={questions} onBack={onBack} />;
}

export function DarfMakaanChooseMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => {
    const pool = placeAdverbs.map((item) => item.arabic);
    return shuffleArray(placeAdverbs).map((adverb) => ({
      id: `choose-${adverb.id}`,
      prompt: `Kies de juiste ẓarf voor: ${adverb.dutch}`,
      answer: adverb.arabic,
      options: fourOptions(adverb.arabic, pool),
      explanation: `${adverb.dutch} is ${adverb.arabic}.`,
      arabicOptions: true,
    }));
  }, []);
  return <ChoiceRound title="Kies de juiste ẓarf" questions={questions} onBack={onBack} />;
}

export function DarfMakaanCompleteMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => {
    const pool = placeAdverbs.map((item) => item.arabic);
    return shuffleArray(placeAdverbPhrases).map((phrase) => {
      const adverb = getPlaceAdverb(phrase.adverbId);
      return {
        id: `complete-${phrase.id}`,
        prompt: phrase.dutch,
        detail: `_____ ${phrase.nounJarr}`,
        answer: adverb.arabic,
        options: fourOptions(adverb.arabic, pool),
        explanation: `De complete combinatie is ${phrase.arabic}.`,
        arabicOptions: true,
      };
    });
  }, []);
  return <ChoiceRound title="Maak de zin compleet" questions={questions} onBack={onBack} />;
}

export function DarfMakaanMeaningMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(placeAdverbPhrases).map((phrase) => {
    const nounMeaning = phrase.dutch.replace(/^[^ ]+ /, "");
    const pool = placeAdverbs.map((adverb) => `${adverb.dutch} ${nounMeaning}`);
    return {
      id: `meaning-${phrase.id}`,
      prompt: phrase.arabic,
      answer: phrase.dutch,
      options: fourOptions(phrase.dutch, pool),
      explanation: `${phrase.arabic} betekent ${phrase.dutch}.`,
      arabicPrompt: true,
    };
  }), []);
  return <ChoiceRound title="Koppel zin en betekenis" questions={questions} onBack={onBack} />;
}

export function DarfMakaanIdentifyMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(placeAdverbSentences).map((sentence) => {
    const adverb = getPlaceAdverb(sentence.adverbId);
    return {
      id: `identify-${sentence.id}`,
      prompt: "Wat is de ẓarf in deze zin?",
      detail: sentence.arabic,
      answer: adverb.arabic,
      options: shuffleArray(sentence.words),
      explanation: `${adverb.arabic} zegt waar iets is.`,
      arabicOptions: true,
    };
  }), []);
  return <ChoiceRound title="Waar staat het woord?" questions={questions} onBack={onBack} />;
}

export function DarfMakaanWritingMode({ onBack }: { onBack: () => void }) {
  const questions = useMemo(() => shuffleArray(placeAdverbPhrases), []);
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
      <div className="self-check zarf-writing">
        <h3>Schrijf in het Arabisch:</h3>
        <p>{phrase.dutch}</p>
        <small>Schrijf met volledige tashkīl en de majrūr-vorm.</small>
        {!revealed && <button className="primary full" onClick={() => setRevealed(true)}>Toon antwoord</button>}
        {revealed && (
          <>
            <div className="answer-reveal">
              <span>Het juiste antwoord is:</span>
              <b className="arabic" dir="rtl">{phrase.arabic}</b>
            </div>
            {!marked
              ? <div className="two-buttons">
                  <button className="correct" onClick={() => setMarked(true)}>Ik had het juist</button>
                  <button className="wrong" onClick={() => setMarked(true)}>Ik had het fout</button>
                </div>
              : <button className="primary full" onClick={next}>Volgende</button>}
          </>
        )}
      </div>
    </section>
  );
}

export function DarfMakaanModule({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<DarfMode>("menu");
  if (mode === "menu") return <DarfMenu onSelect={setMode} onBack={onBack} />;
  const backToMenu = () => setMode("menu");
  if (mode === "learn") return <DarfMakaanLearnMode onBack={backToMenu} />;
  if (mode === "flashcards") return <DarfMakaanFlashcardsMode onBack={backToMenu} />;
  if (mode === "translate") return <DarfMakaanTranslateMode onBack={backToMenu} />;
  if (mode === "choose") return <DarfMakaanChooseMode onBack={backToMenu} />;
  if (mode === "complete") return <DarfMakaanCompleteMode onBack={backToMenu} />;
  if (mode === "meaning") return <DarfMakaanMeaningMode onBack={backToMenu} />;
  if (mode === "identify") return <DarfMakaanIdentifyMode onBack={backToMenu} />;
  return <DarfMakaanWritingMode onBack={backToMenu} />;
}
