import type { ReactNode } from "react";
import type { Mode } from "./types";

type TheoryMode = Extract<Mode,
  "fourForms" | "definiteness" | "jar" | "zarf" | "ishara" | "grammar" | "gender" | "writing"
>;

export function GrammarBadge({ children }: { children: ReactNode }) {
  return <span className="theory-badge">{children}</span>;
}

export function ArabicExample({
  arabic,
  dutch,
  badges = [],
}: {
  arabic: string;
  dutch?: string;
  badges?: string[];
}) {
  return (
    <div className="theory-example">
      <b className="arabic">{arabic}</b>
      {dutch && <span>{dutch}</span>}
      {badges.length > 0 && <div className="theory-badges">{badges.map((badge) => <GrammarBadge key={badge}>{badge}</GrammarBadge>)}</div>}
    </div>
  );
}

export function TheoryCard({ title, children }: { title: string; children: ReactNode }) {
  return <article className="theory-card"><h3>{title}</h3>{children}</article>;
}

export function RuleSummary({ children }: { children: ReactNode }) {
  return <div className="theory-rule">{children}</div>;
}

export function MiniTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: ReactNode[][];
}) {
  return (
    <div className="theory-table" role="table">
      <div className="theory-table-row theory-table-head" role="row">
        {headers.map((header) => <b role="columnheader" key={header}>{header}</b>)}
      </div>
      {rows.map((row, rowIndex) => (
        <div className="theory-table-row" role="row" key={rowIndex}>
          {row.map((cell, cellIndex) => <span role="cell" key={cellIndex}>{cell}</span>)}
        </div>
      ))}
    </div>
  );
}

function TheoryLayout({
  eyebrow,
  title,
  onBack,
  children,
}: {
  eyebrow: string;
  title: string;
  onBack: () => void;
  children: ReactNode;
}) {
  return (
    <section>
      <button className="back-link" onClick={onBack}>← Terug</button>
      <div className="screen-title"><p>{eyebrow} • Leren</p><h2>{title}</h2></div>
      <div className="theory-list">{children}</div>
    </section>
  );
}

export function VocabularyTheory({ onOpenList }: { onOpenList: () => void }) {
  return (
    <div className="theory-list">
      <TheoryCard title="Woordenschat leren">
        <p>Elk woord heeft een Nederlandse betekenis. Arabische zelfstandige naamwoorden hebben meestal een enkelvoud en meervoud, en soms een mannelijke en vrouwelijke vorm.</p>
        <p>In deze app leren we woorden met volledige tashkīl en eind-iʿrāb.</p>
      </TheoryCard>
      <TheoryCard title="Enkelvoud en meervoud">
        <div className="theory-example-grid">
          <ArabicExample arabic="كِتَابٌ" dutch="een boek" badges={["enkelvoud"]} />
          <ArabicExample arabic="كُتُبٌ" dutch="boeken" badges={["meervoud"]} />
        </div>
        <p><strong>كِتَابٌ</strong> is enkelvoud. <strong>كُتُبٌ</strong> is meervoud. De tanwīn aan het einde hoort erbij.</p>
      </TheoryCard>
      <TheoryCard title="Mini-overzicht">
        <MiniTable headers={["Vorm", "Voorbeeld"]} rows={[
          ["Enkelvoud", <b className="arabic">كِتَابٌ</b>],
          ["Meervoud", <b className="arabic">كُتُبٌ</b>],
          ["Werkwoord", <b className="arabic">تَكْتُبُ</b>],
        ]} />
      </TheoryCard>
      <button className="primary full theory-list-button" onClick={onOpenList}>Ga naar woordenlijst</button>
    </div>
  );
}

function FourFormsTheory({ onBack }: { onBack: () => void }) {
  return (
    <TheoryLayout eyebrow="Vier vormen" title="De vier vormen" onBack={onBack}>
      <TheoryCard title="Vier basisvormen">
        <p>Een zelfstandig naamwoord kan vier basisvormen hebben: onbepaald enkelvoud, bepaald enkelvoud, onbepaald meervoud en bepaald meervoud.</p>
        <div className="theory-example-grid">
          <ArabicExample arabic="كِتَابٌ" dutch="een boek" badges={["onbepaald", "enkelvoud"]} />
          <ArabicExample arabic="الْكِتَابُ" dutch="het boek" badges={["bepaald", "enkelvoud"]} />
          <ArabicExample arabic="كُتُبٌ" dutch="boeken" badges={["onbepaald", "meervoud"]} />
          <ArabicExample arabic="الْكُتُبُ" dutch="de boeken" badges={["bepaald", "meervoud"]} />
        </div>
      </TheoryCard>
      <TheoryCard title="Hoe herken je ze?">
        <p>Zonder <strong>الـ</strong> is een woord meestal <strong>نَكِرَة</strong>. Met <strong>الـ</strong> is het meestal <strong>مَعْرِفَة</strong>.</p>
        <p>Onbepaald krijgt vaak tanwīn. Bepaald krijgt geen tanwīn.</p>
        <MiniTable headers={["Nederlands", "Arabisch"]} rows={[
          ["een boek", <b className="arabic">كِتَابٌ</b>],
          ["het boek", <b className="arabic">الْكِتَابُ</b>],
          ["boeken", <b className="arabic">كُتُبٌ</b>],
          ["de boeken", <b className="arabic">الْكُتُبُ</b>],
        ]} />
      </TheoryCard>
    </TheoryLayout>
  );
}

function DefinitenessTheory({ onBack }: { onBack: () => void }) {
  return (
    <TheoryLayout eyebrow="Bepaald / onbepaald" title="Maʿrifa en Nakira" onBack={onBack}>
      <TheoryCard title="نَكِرَة en مَعْرِفَة">
        <p><strong>نَكِرَة</strong> betekent onbepaald. <strong>مَعْرِفَة</strong> betekent bepaald.</p>
        <div className="theory-example-grid">
          <ArabicExample arabic="كِتَابٌ" dutch="een boek" badges={["نَكِرَة"]} />
          <ArabicExample arabic="الْكِتَابُ" dutch="het boek" badges={["مَعْرِفَة"]} />
          <ArabicExample arabic="قَلَمٌ" dutch="een pen" badges={["نَكِرَة"]} />
          <ArabicExample arabic="الْقَلَمُ" dutch="de pen" badges={["مَعْرِفَة"]} />
        </div>
        <RuleSummary>Zonder الـ en met tanwīn is meestal نَكِرَة. Met الـ en zonder tanwīn is meestal مَعْرِفَة.</RuleSummary>
      </TheoryCard>
      <TheoryCard title="Zonletters">
        <p>Bij zonletters komt er shadda op de eerste letter na <strong>الـ</strong>.</p>
        <div className="theory-example-grid">
          <ArabicExample arabic="طَالِبٌ ← الطَّالِبُ" dutch="een student ← de student" />
          <ArabicExample arabic="سَيَّارَةٌ ← السَّيَّارَةُ" dutch="een auto ← de auto" />
        </div>
        <MiniTable headers={["Vorm", "Betekenis", "Voorbeeld"]} rows={[
          [<b className="arabic">نَكِرَة</b>, "onbepaald", <b className="arabic">كِتَابٌ</b>],
          [<b className="arabic">مَعْرِفَة</b>, "bepaald", <b className="arabic">الْكِتَابُ</b>],
        ]} />
      </TheoryCard>
    </TheoryLayout>
  );
}

function JarTheory({ onBack }: { onBack: () => void }) {
  return (
    <TheoryLayout eyebrow="Ism madjroor" title="Ḥarf jar en ism majrūr" onBack={onBack}>
      <TheoryCard title="فِي en عَلَى">
        <p><strong>فِي</strong> betekent “in”. <strong>عَلَى</strong> betekent “op”. Deze woorden zijn <strong>حَرْف جَرّ</strong>.</p>
        <p>Na een حَرْف جَرّ komt een <strong>اِسْم مَجْرُور</strong>.</p>
        <div className="theory-example-grid">
          <ArabicExample arabic="فِي الْبَيْتِ" dutch="in het huis" badges={["فِي = حَرْف جَرّ", "الْبَيْتِ = اِسْم مَجْرُور"]} />
          <ArabicExample arabic="عَلَى الطَّاوِلَةِ" dutch="op de tafel" badges={["عَلَى = حَرْف جَرّ", "الطَّاوِلَةِ = اِسْم مَجْرُور"]} />
        </div>
        <p>Het woord na فِي of عَلَى krijgt kasra: <strong>ـِ</strong>.</p>
        <RuleSummary>Na فِي en عَلَى krijgt het woord erna kasra.</RuleSummary>
      </TheoryCard>
      <TheoryCard title="Mini-overzicht">
        <MiniTable headers={["Nederlands", "Arabisch"]} rows={[
          ["in het huis", <b className="arabic">فِي الْبَيْتِ</b>],
          ["op de tafel", <b className="arabic">عَلَى الطَّاوِلَةِ</b>],
        ]} />
      </TheoryCard>
    </TheoryLayout>
  );
}

function ZarfTheory({ onBack }: { onBack: () => void }) {
  return (
    <TheoryLayout eyebrow="Darf makaan" title="Ẓurūf al-makān — woorden van plaats" onBack={onBack}>
      <TheoryCard title="Wat is een ظَرْف مَكَان?">
        <p><strong>ظَرْف مَكَان</strong> betekent plaatswoord. Deze woorden vertellen waar iets is.</p>
        <MiniTable headers={["Nederlands", "Arabisch"]} rows={[
          ["boven", <b className="arabic">فَوْقَ</b>], ["onder", <b className="arabic">تَحْتَ</b>],
          ["naast", <b className="arabic">بِجَانِبِ</b>], ["voor", <b className="arabic">أَمَامَ</b>],
          ["achter", <b className="arabic">خَلْفَ</b>], ["rondom", <b className="arabic">حَوْلَ</b>],
        ]} />
      </TheoryCard>
      <TheoryCard title="Het woord erna">
        <p>Na een plaatswoord komt vaak een woord in majrūr. Daarom krijgt het woord erna kasra.</p>
        <div className="theory-example-grid">
          <ArabicExample arabic="فَوْقَ الْمَكْتَبِ" dutch="boven het bureau" badges={["فَوْقَ = ظَرْف مَكَان", "الْمَكْتَبِ = majrūr"]} />
          <ArabicExample arabic="تَحْتَ الْكُرْسِيِّ" dutch="onder de stoel" badges={["تَحْتَ = ظَرْف مَكَان", "الْكُرْسِيِّ = majrūr"]} />
          <ArabicExample arabic="أَمَامَ الْمَسْجِدِ" dutch="voor de moskee" badges={["أَمَامَ = ظَرْف مَكَان", "الْمَسْجِدِ = majrūr"]} />
        </div>
      </TheoryCard>
    </TheoryLayout>
  );
}

function IsharaTheory({ onBack }: { onBack: () => void }) {
  return (
    <TheoryLayout eyebrow="Asmaa al ishara" title="Ism ishārah — هٰذَا en هٰذِهِ" onBack={onBack}>
      <TheoryCard title="Dit of deze">
        <p><strong>هٰذَا</strong> gebruik je voor een mannelijk woord. <strong>هٰذِهِ</strong> gebruik je voor een vrouwelijk woord.</p>
        <div className="theory-example-grid">
          <ArabicExample arabic="هٰذَا كِتَابٌ" dutch="dit is een boek" badges={["كِتَابٌ = مُذَكَّر", "هٰذَا"]} />
          <ArabicExample arabic="هٰذِهِ سَيَّارَةٌ" dutch="dit is een auto" badges={["سَيَّارَةٌ = مُؤَنَّث", "هٰذِهِ"]} />
        </div>
        <MiniTable headers={["Geslacht", "Ism ishārah", "Voorbeeld"]} rows={[
          [<b className="arabic">مُذَكَّر</b>, <b className="arabic">هٰذَا</b>, <b className="arabic">هٰذَا كِتَابٌ</b>],
          [<b className="arabic">مُؤَنَّث</b>, <b className="arabic">هٰذِهِ</b>, <b className="arabic">هٰذِهِ سَيَّارَةٌ</b>],
        ]} />
      </TheoryCard>
    </TheoryLayout>
  );
}

function GrammarTheory({ onBack }: { onBack: () => void }) {
  return (
    <TheoryLayout eyebrow="Grammatica herkennen" title="Ism, Fiʿl en Ḥarf herkennen" onBack={onBack}>
      <TheoryCard title="Drie grote groepen">
        <p>Een <strong>اِسْم</strong> is vaak een ding, persoon, plaats of eigenschap. Een <strong>فِعْل</strong> is een handeling. Een <strong>حَرْف</strong> krijgt betekenis samen met andere woorden.</p>
        <div className="theory-example-grid">
          <ArabicExample arabic="كِتَابٌ" badges={["اِسْم", "naamwoord"]} />
          <ArabicExample arabic="تَكْتُبُ" badges={["فِعْل", "werkwoord"]} />
          <ArabicExample arabic="فِي" badges={["حَرْف", "partikel"]} />
          <ArabicExample arabic="فَوْقَ" badges={["ظَرْف مَكَان", "plaatswoord"]} />
        </div>
        <p>Een ظَرْف مَكَان is een plaatswoord. Het is geen gewoon werkwoord en geen ḥarf jar.</p>
        <MiniTable headers={["Type", "Betekenis", "Voorbeeld"]} rows={[
          [<b className="arabic">اِسْم</b>, "naamwoord", <b className="arabic">كِتَابٌ</b>],
          [<b className="arabic">فِعْل</b>, "werkwoord", <b className="arabic">تَكْتُبُ</b>],
          [<b className="arabic">حَرْف</b>, "partikel", <b className="arabic">فِي</b>],
          [<b className="arabic">ظَرْف مَكَان</b>, "plaatswoord", <b className="arabic">فَوْقَ</b>],
        ]} />
      </TheoryCard>
    </TheoryLayout>
  );
}

function GenderTheory({ onBack }: { onBack: () => void }) {
  return (
    <TheoryLayout eyebrow="Mannelijk / vrouwelijk" title="Mudhakkar en Muʾannath" onBack={onBack}>
      <TheoryCard title="مُذَكَّر en مُؤَنَّث">
        <p><strong>مُذَكَّر</strong> betekent mannelijk. <strong>مُؤَنَّث</strong> betekent vrouwelijk. Veel vrouwelijke woorden eindigen op <strong>ة</strong>.</p>
        <div className="theory-example-grid">
          <ArabicExample arabic="كِتَابٌ" badges={["مُذَكَّر"]} />
          <ArabicExample arabic="سَيَّارَةٌ" badges={["مُؤَنَّث"]} />
          <ArabicExample arabic="طَاوِلَةٌ" badges={["مُؤَنَّث"]} />
        </div>
      </TheoryCard>
      <TheoryCard title="Mannelijke en vrouwelijke paren">
        <MiniTable headers={["Mannelijk", "Vrouwelijk"]} rows={[
          [<b className="arabic">طَالِبٌ</b>, <b className="arabic">طَالِبَةٌ</b>],
          [<b className="arabic">مُعَلِّمٌ</b>, <b className="arabic">مُعَلِّمَةٌ</b>],
          [<b className="arabic">لَذِيذٌ</b>, <b className="arabic">لَذِيذَةٌ</b>],
        ]} />
        <RuleSummary>Vaak maakt ة een woord vrouwelijk, maar leer altijd de woorden uit de lijst.</RuleSummary>
      </TheoryCard>
    </TheoryLayout>
  );
}

function WritingTheory({ onBack }: { onBack: () => void }) {
  return (
    <TheoryLayout eyebrow="Schrijfexamen" title="Hoe oefen je schrijven?" onBack={onBack}>
      <TheoryCard title="Stappen">
        <ol className="theory-steps">
          <li>Lees de opdracht.</li><li>Schrijf het Arabische antwoord op papier.</li>
          <li>Let op tashkīl.</li><li>Let op eind-iʿrāb.</li>
          <li>Klik op <strong>Toon antwoord</strong>.</li><li>Vergelijk je antwoord.</li>
          <li>Kies <strong>Ik had het juist</strong> of <strong>Ik had het fout</strong>.</li>
        </ol>
      </TheoryCard>
      <TheoryCard title="Voorbeeld">
        <p>Opdracht: <strong>Schrijf: het boek</strong></p>
        <ArabicExample arabic="الْكِتَابُ" dutch="het boek" badges={["الـ niet vergeten", "eind-ḍamma ـُ"]} />
        <p>Schrijf netjes van rechts naar links. De app blijft neutraal en toont alleen: <strong>Het juiste antwoord is:</strong></p>
      </TheoryCard>
    </TheoryLayout>
  );
}

export function TheoryPage({ mode, onBack }: { mode: TheoryMode; onBack: () => void }) {
  if (mode === "fourForms") return <FourFormsTheory onBack={onBack} />;
  if (mode === "definiteness") return <DefinitenessTheory onBack={onBack} />;
  if (mode === "jar") return <JarTheory onBack={onBack} />;
  if (mode === "zarf") return <ZarfTheory onBack={onBack} />;
  if (mode === "ishara") return <IsharaTheory onBack={onBack} />;
  if (mode === "grammar") return <GrammarTheory onBack={onBack} />;
  if (mode === "gender") return <GenderTheory onBack={onBack} />;
  return <WritingTheory onBack={onBack} />;
}

export type { TheoryMode };
