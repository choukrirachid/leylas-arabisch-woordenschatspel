import { useState } from "react";
import {
  readingTexts,
  type ReadingQuestion,
  type ReadingText,
} from "./readingTexts";

type ReadingPhase = "read" | "content" | "grammar-intro" | "grammar" | "result";

const containsArabic = (value: string) => /[\u0600-\u06ff]/.test(value);

function ReadingHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title reading-title">
        <p>فَهْمُ الْمَقْرُوءِ</p>
        <h2>{title}</h2>
      </div>
    </>
  );
}

export function DifficultWordsPanel({ words = [] }: {
  words?: ReadingText["difficultWords"];
}) {
  const [visible, setVisible] = useState(false);
  if (!words.length) return null;
  return (
    <section className="reading-words">
      <button className="secondary full reading-words-toggle" onClick={() => setVisible((value) => !value)}>
        {visible ? "Verberg moeilijke woorden" : "Toon moeilijke woorden"}
      </button>
      {visible && (
        <div className="reading-word-list">
          <h3>Moeilijke woorden</h3>
          {words.map((word) => (
            <div key={word.arabic}>
              <b className="arabic" dir="rtl">{word.arabic}</b>
              <span>{word.dutch}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function ReadingTextList({ onSelect, onBack }: {
  onSelect: (text: ReadingText) => void;
  onBack: () => void;
}) {
  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug naar start</button>
      <div className="screen-title reading-title">
        <p>فَهْمُ الْمَقْرُوءِ</p>
        <h2>Begrijpend lezen</h2>
      </div>
      <p className="reading-intro">Kies een tekst, lees rustig en beantwoord daarna de vragen.</p>
      <div className="module-grid reading-list">
        {readingTexts.map((text, index) => (
          <button className="module-card reading-list-card" key={text.id} onClick={() => onSelect(text)}>
            <span className="module-number">{index + 1}</span>
            <span>
              <strong>{text.title}</strong>
              <small className="arabic" dir="rtl">{text.arabicTitle}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function ReadingTextView({ text, onStart, onBack }: {
  text: ReadingText;
  onStart: () => void;
  onBack: () => void;
}) {
  return (
    <section>
      <ReadingHeader title={text.title} onBack={onBack} />
      <article className="reading-passage">
        <h3>Lees de tekst</h3>
        <b className="reading-arabic-title arabic" dir="rtl">{text.arabicTitle}</b>
        <div className="reading-paragraphs" dir="rtl">
          {text.paragraphs.map((paragraph, index) => <p key={`${text.id}-${index}`}>{paragraph}</p>)}
        </div>
      </article>
      <DifficultWordsPanel words={text.difficultWords} />
      <button className="primary full reading-start" onClick={onStart}>Start inhoudsvragen</button>
    </section>
  );
}

export function ReadingQuestionCard({ question, number, total, selected, onSelect, onNext }: {
  question: ReadingQuestion;
  number: number;
  total: number;
  selected: string | null;
  onSelect: (answer: string) => void;
  onNext: () => void;
}) {
  const correct = selected === question.correctAnswer;
  return (
    <>
      <div className="score-wrap">
        <div className="score-line"><strong>Vraag {number}/{total}</strong></div>
        <div className="progress"><span style={{ width: `${(number / total) * 100}%` }} /></div>
      </div>
      <article className="reading-question-card">
        <h3 className={containsArabic(question.question) ? "arabic" : ""} dir={containsArabic(question.question) ? "rtl" : undefined}>
          {question.question}
        </h3>
        <div className="answer-grid reading-answers">
          {question.options.map((option) => {
            const isArabic = containsArabic(option);
            return (
              <button
                className={`answer-option ${isArabic ? "arabic" : ""} ${selected === option ? correct ? "chosen-correct" : "chosen-wrong" : ""}`}
                dir={isArabic ? "rtl" : undefined}
                disabled={selected !== null}
                key={option}
                onClick={() => onSelect(option)}
              >
                {option}
              </button>
            );
          })}
        </div>
      </article>
      {selected && (
        <div className={`feedback ${correct ? "good" : "try"} reading-feedback`}>
          <strong>{correct ? "Goed!" : "Het juiste antwoord is:"}</strong>
          {!correct && (
            <b
              className={containsArabic(question.correctAnswer) ? "arabic" : ""}
              dir={containsArabic(question.correctAnswer) ? "rtl" : undefined}
            >
              {question.correctAnswer}
            </b>
          )}
          <p>{question.explanation}</p>
          <button className="primary full" onClick={onNext}>Volgende</button>
        </div>
      )}
    </>
  );
}

export function ReadingResult({ text, contentScore, grammarScore, onRestart, onBack }: {
  text: ReadingText;
  contentScore: number;
  grammarScore: number;
  onRestart: () => void;
  onBack: () => void;
}) {
  const contentTotal = text.contentQuestions.length;
  const grammarTotal = text.grammarQuestions.length;
  return (
    <section>
      <ReadingHeader title="Resultaat" onBack={onBack} />
      <div className="results reading-result">
        <p className="eyebrow">Goed gedaan!</p>
        <h2>{contentScore + grammarScore}/{contentTotal + grammarTotal}</h2>
        <div className="reading-score-grid">
          <div><span>Score inhoud</span><strong>{contentScore}/{contentTotal}</strong></div>
          <div><span>Score grammatica</span><strong>{grammarScore}/{grammarTotal}</strong></div>
          <div><span>Totaal</span><strong>{contentScore + grammarScore}/{contentTotal + grammarTotal}</strong></div>
        </div>
        <button className="primary full" onClick={onRestart}>Opnieuw oefenen</button>
        <button className="secondary full" onClick={onBack}>Terug naar teksten</button>
      </div>
    </section>
  );
}

function ReadingExercise({ text, onBack }: { text: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<ReadingPhase>("read");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [contentScore, setContentScore] = useState(0);
  const [grammarScore, setGrammarScore] = useState(0);

  const reset = () => {
    setPhase("read");
    setQuestionIndex(0);
    setSelected(null);
    setContentScore(0);
    setGrammarScore(0);
  };

  if (phase === "read") {
    return <ReadingTextView text={text} onBack={onBack} onStart={() => setPhase("content")} />;
  }

  if (phase === "grammar-intro") {
    return (
      <section>
        <ReadingHeader title={text.title} onBack={() => setPhase("read")} />
        <div className="reading-between">
          <p className="eyebrow">Inhoudsvragen klaar</p>
          <h3>Score inhoud: {contentScore}/{text.contentQuestions.length}</h3>
          <p>Nu volgen eenvoudige vragen over de grammatica in de tekst.</p>
          <button className="primary full" onClick={() => setPhase("grammar")}>Start grammaticavragen</button>
        </div>
      </section>
    );
  }

  if (phase === "result") {
    return (
      <ReadingResult
        text={text}
        contentScore={contentScore}
        grammarScore={grammarScore}
        onRestart={reset}
        onBack={onBack}
      />
    );
  }

  const questions = phase === "content" ? text.contentQuestions : text.grammarQuestions;
  const question = questions[questionIndex];
  const selectAnswer = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    if (answer === question.correctAnswer) {
      if (phase === "content") setContentScore((score) => score + 1);
      else setGrammarScore((score) => score + 1);
    }
  };
  const next = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex((index) => index + 1);
      setSelected(null);
      return;
    }
    setQuestionIndex(0);
    setSelected(null);
    setPhase(phase === "content" ? "grammar-intro" : "result");
  };

  return (
    <section>
      <ReadingHeader
        title={phase === "content" ? "Inhoudsvragen" : "Grammaticavragen"}
        onBack={() => setPhase("read")}
      />
      <ReadingQuestionCard
        question={question}
        number={questionIndex + 1}
        total={questions.length}
        selected={selected}
        onSelect={selectAnswer}
        onNext={next}
      />
    </section>
  );
}

export function ReadingComprehensionModule({ onBack }: { onBack: () => void }) {
  const [selectedText, setSelectedText] = useState<ReadingText | null>(null);
  if (!selectedText) return <ReadingTextList onSelect={setSelectedText} onBack={onBack} />;
  return <ReadingExercise key={selectedText.id} text={selectedText} onBack={() => setSelectedText(null)} />;
}
