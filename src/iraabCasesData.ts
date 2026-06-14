export type IraabCase = "marfoo" | "mansub" | "majroor";

export type IraabWordExample = {
  id: string;
  arabic: string;
  baseDutch: string;
  caseType: IraabCase;
  endingLabel: string;
  explanation: string;
};

export type IraabContextExample = {
  id: string;
  phrase: string;
  targetWord: string;
  caseType: IraabCase;
  reason: string;
  explanation: string;
};

type WordSet = {
  id: string;
  dutch: string;
  marfoo: string;
  mansub: string;
  majroor: string;
  definite?: boolean;
};

export const iraabWordSets: WordSet[] = [
  { id: "book", dutch: "boek", marfoo: "كِتَابٌ", mansub: "كِتَابًا", majroor: "كِتَابٍ" },
  { id: "pen", dutch: "pen", marfoo: "قَلَمٌ", mansub: "قَلَمًا", majroor: "قَلَمٍ" },
  { id: "student", dutch: "student", marfoo: "طَالِبٌ", mansub: "طَالِبًا", majroor: "طَالِبٍ" },
  { id: "teacher", dutch: "leraar", marfoo: "مُعَلِّمٌ", mansub: "مُعَلِّمًا", majroor: "مُعَلِّمٍ" },
  { id: "house", dutch: "huis", marfoo: "بَيْتٌ", mansub: "بَيْتًا", majroor: "بَيْتٍ" },
  { id: "mosque", dutch: "moskee", marfoo: "مَسْجِدٌ", mansub: "مَسْجِدًا", majroor: "مَسْجِدٍ" },
  { id: "def-book", dutch: "het boek", marfoo: "الْكِتَابُ", mansub: "الْكِتَابَ", majroor: "الْكِتَابِ", definite: true },
  { id: "def-pen", dutch: "de pen", marfoo: "الْقَلَمُ", mansub: "الْقَلَمَ", majroor: "الْقَلَمِ", definite: true },
  { id: "def-student", dutch: "de student", marfoo: "الطَّالِبُ", mansub: "الطَّالِبَ", majroor: "الطَّالِبِ", definite: true },
  { id: "def-house", dutch: "het huis", marfoo: "الْبَيْتُ", mansub: "الْبَيْتَ", majroor: "الْبَيْتِ", definite: true },
  { id: "def-mosque", dutch: "de moskee", marfoo: "الْمَسْجِدُ", mansub: "الْمَسْجِدَ", majroor: "الْمَسْجِدِ", definite: true },
];

const endingLabels: Record<IraabCase, { indefinite: string; definite: string; name: string }> = {
  marfoo: { indefinite: "ـٌ", definite: "ـُ", name: "ḍamma / ḍammatayn" },
  mansub: { indefinite: "ـً", definite: "ـَ", name: "fatḥa / fatḥatayn" },
  majroor: { indefinite: "ـٍ", definite: "ـِ", name: "kasra / kasratayn" },
};

export const iraabWordExamples: IraabWordExample[] = iraabWordSets.flatMap((set) =>
  (["marfoo", "mansub", "majroor"] as IraabCase[]).map((caseType) => {
    const ending = endingLabels[caseType];
    const arabic = set[caseType];
    return {
      id: `${set.id}-${caseType}`,
      arabic,
      baseDutch: set.dutch,
      caseType,
      endingLabel: set.definite ? ending.definite : ending.indefinite,
      explanation: `${arabic} eindigt op ${set.definite ? ending.definite : ending.indefinite} (${ending.name}). Dat is ${
        caseType === "marfoo" ? "marfūʿ" : caseType === "mansub" ? "manṣūb" : "majrūr"
      }.`,
    };
  }),
);

export const iraabContextExamples: IraabContextExample[] = [
  {
    id: "fi-house",
    phrase: "فِي الْبَيْتِ",
    targetWord: "الْبَيْتِ",
    caseType: "majroor",
    reason: "na fī",
    explanation: "Na فِي komt het woord majrūr. Daarom eindigt الْبَيْتِ op kasra.",
  },
  {
    id: "fi-class",
    phrase: "فِي الْفَصْلِ",
    targetWord: "الْفَصْلِ",
    caseType: "majroor",
    reason: "na fī",
    explanation: "Na فِي komt het woord majrūr. Daarom eindigt الْفَصْلِ op kasra.",
  },
  {
    id: "fi-mosque",
    phrase: "فِي الْمَسْجِدِ",
    targetWord: "الْمَسْجِدِ",
    caseType: "majroor",
    reason: "na fī",
    explanation: "Na فِي komt het woord majrūr. Daarom eindigt الْمَسْجِدِ op kasra.",
  },
  {
    id: "ala-table",
    phrase: "عَلَى الطَّاوِلَةِ",
    targetWord: "الطَّاوِلَةِ",
    caseType: "majroor",
    reason: "na ʿalā",
    explanation: "Na عَلَى komt het woord majrūr. Daarom eindigt الطَّاوِلَةِ op kasra.",
  },
  {
    id: "ala-desk",
    phrase: "عَلَى الْمَكْتَبِ",
    targetWord: "الْمَكْتَبِ",
    caseType: "majroor",
    reason: "na ʿalā",
    explanation: "Na عَلَى komt het woord majrūr. Daarom eindigt الْمَكْتَبِ op kasra.",
  },
  {
    id: "above-desk",
    phrase: "فَوْقَ الْمَكْتَبِ",
    targetWord: "الْمَكْتَبِ",
    caseType: "majroor",
    reason: "na een plaatswoord",
    explanation: "Het woord na فَوْقَ staat in majrūr en eindigt hier op kasra.",
  },
  {
    id: "under-chair",
    phrase: "تَحْتَ الْكُرْسِيِّ",
    targetWord: "الْكُرْسِيِّ",
    caseType: "majroor",
    reason: "na een plaatswoord",
    explanation: "Het woord na تَحْتَ staat in majrūr en eindigt hier op kasra.",
  },
  {
    id: "beside-house",
    phrase: "بِجَانِبِ الْبَيْتِ",
    targetWord: "الْبَيْتِ",
    caseType: "majroor",
    reason: "na een plaatswoord",
    explanation: "Het woord na بِجَانِبِ staat in majrūr en eindigt hier op kasra.",
  },
  {
    id: "before-mosque",
    phrase: "أَمَامَ الْمَسْجِدِ",
    targetWord: "الْمَسْجِدِ",
    caseType: "majroor",
    reason: "na een plaatswoord",
    explanation: "Het woord na أَمَامَ staat in majrūr en eindigt hier op kasra.",
  },
  {
    id: "behind-door",
    phrase: "خَلْفَ الْبَابِ",
    targetWord: "الْبَابِ",
    caseType: "majroor",
    reason: "na een plaatswoord",
    explanation: "Het woord na خَلْفَ staat in majrūr en eindigt hier op kasra.",
  },
  {
    id: "book-student",
    phrase: "كِتَابُ الطَّالِبِ",
    targetWord: "الطَّالِبِ",
    caseType: "majroor",
    reason: "muḍāf ilayhi",
    explanation: "In iḍāfa is het tweede woord muḍāf ilayhi en dus majrūr.",
  },
  {
    id: "door-house",
    phrase: "بَابُ الْبَيْتِ",
    targetWord: "الْبَيْتِ",
    caseType: "majroor",
    reason: "muḍāf ilayhi",
    explanation: "الْبَيْتِ is de muḍāf ilayhi. De muḍāf ilayhi is majrūr.",
  },
  {
    id: "cup-water",
    phrase: "كُوبُ الْمَاءِ",
    targetWord: "الْمَاءِ",
    caseType: "majroor",
    reason: "muḍāf ilayhi",
    explanation: "الْمَاءِ is de muḍāf ilayhi. De muḍāf ilayhi is majrūr.",
  },
  {
    id: "key-car",
    phrase: "مِفْتَاحُ السَّيَّارَةِ",
    targetWord: "السَّيَّارَةِ",
    caseType: "majroor",
    reason: "muḍāf ilayhi",
    explanation: "السَّيَّارَةِ is de muḍāf ilayhi. De muḍāf ilayhi is majrūr.",
  },
];
