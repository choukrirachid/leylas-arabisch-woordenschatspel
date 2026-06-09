export type MubtadaKhabarLevel = 1 | 2 | 3 | 4;
export type SentenceType = "jumlah_ismiyyah" | "jumlah_fi3liyyah";
export type KhabarType = "single_word" | "shibh_jumlah" | "none";

export type MubtadaKhabarSentence = {
  id: string;
  level: MubtadaKhabarLevel;
  dutch: string;
  arabic: string;
  sentenceType: SentenceType;
  mubtada?: string;
  khabar?: string;
  khabarType?: KhabarType;
  harfJar?: string;
  ismMajroor?: string;
  fi3l?: string;
  explanation: string;
};

export const mubtadaKhabarSentences: MubtadaKhabarSentence[] = [
  {
    id: "n1-book-new", level: 1, dutch: "Het boek is nieuw.", arabic: "الْكِتَابُ جَدِيدٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْكِتَابُ", khabar: "جَدِيدٌ", khabarType: "single_word",
    explanation: "الْكِتَابُ is de mubtadaʾ. جَدِيدٌ is de khabar.",
  },
  {
    id: "n1-pen-small", level: 1, dutch: "De pen is klein.", arabic: "الْقَلَمُ صَغِيرٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْقَلَمُ", khabar: "صَغِيرٌ", khabarType: "single_word",
    explanation: "الْقَلَمُ is de mubtadaʾ. صَغِيرٌ is de khabar.",
  },
  {
    id: "n1-table-big", level: 1, dutch: "De tafel is groot.", arabic: "الطَّاوِلَةُ كَبِيرَةٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الطَّاوِلَةُ", khabar: "كَبِيرَةٌ", khabarType: "single_word",
    explanation: "الطَّاوِلَةُ is de mubtadaʾ. كَبِيرَةٌ is de khabar.",
  },
  {
    id: "n1-car-beautiful", level: 1, dutch: "De auto is mooi.", arabic: "السَّيَّارَةُ جَمِيلَةٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "السَّيَّارَةُ", khabar: "جَمِيلَةٌ", khabarType: "single_word",
    explanation: "السَّيَّارَةُ is de mubtadaʾ. جَمِيلَةٌ is de khabar.",
  },
  {
    id: "n1-house-big", level: 1, dutch: "Het huis is groot.", arabic: "الْبَيْتُ كَبِيرٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْبَيْتُ", khabar: "كَبِيرٌ", khabarType: "single_word",
    explanation: "الْبَيْتُ is de mubtadaʾ. كَبِيرٌ is de khabar.",
  },
  {
    id: "n1-this-book", level: 1, dutch: "Dit is een boek.", arabic: "هٰذَا كِتَابٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "هٰذَا", khabar: "كِتَابٌ", khabarType: "single_word",
    explanation: "هٰذَا is ism ishārah en hier ook de mubtadaʾ. كِتَابٌ is de khabar.",
  },
  {
    id: "n1-this-pen", level: 1, dutch: "Dit is een pen.", arabic: "هٰذَا قَلَمٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "هٰذَا", khabar: "قَلَمٌ", khabarType: "single_word",
    explanation: "هٰذَا is de mubtadaʾ. قَلَمٌ is de khabar.",
  },
  {
    id: "n1-this-table", level: 1, dutch: "Dit is een tafel.", arabic: "هٰذِهِ طَاوِلَةٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "هٰذِهِ", khabar: "طَاوِلَةٌ", khabarType: "single_word",
    explanation: "هٰذِهِ is ism ishārah en hier ook de mubtadaʾ. طَاوِلَةٌ is de khabar.",
  },
  {
    id: "n1-this-car", level: 1, dutch: "Dit is een auto.", arabic: "هٰذِهِ سَيَّارَةٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "هٰذِهِ", khabar: "سَيَّارَةٌ", khabarType: "single_word",
    explanation: "هٰذِهِ is de mubtadaʾ. سَيَّارَةٌ is de khabar.",
  },
  {
    id: "n1-this-house", level: 1, dutch: "Dit is een huis.", arabic: "هٰذَا بَيْتٌ",
    sentenceType: "jumlah_ismiyyah", mubtada: "هٰذَا", khabar: "بَيْتٌ", khabarType: "single_word",
    explanation: "هٰذَا is de mubtadaʾ. بَيْتٌ is de khabar.",
  },
  {
    id: "n2-book-on-table", level: 2, dutch: "Het boek is op de tafel.", arabic: "الْكِتَابُ عَلَى الطَّاوِلَةِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْكِتَابُ", khabar: "عَلَى الطَّاوِلَةِ", khabarType: "shibh_jumlah",
    harfJar: "عَلَى", ismMajroor: "الطَّاوِلَةِ",
    explanation: "الْكِتَابُ is de mubtadaʾ. عَلَى الطَّاوِلَةِ is khabar shibh jumla. عَلَى is harf jar en الطَّاوِلَةِ is ism majrūr.",
  },
  {
    id: "n2-pen-in-bag", level: 2, dutch: "De pen is in de boekentas.", arabic: "الْقَلَمُ فِي الْحَقِيبَةِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْقَلَمُ", khabar: "فِي الْحَقِيبَةِ", khabarType: "shibh_jumlah",
    harfJar: "فِي", ismMajroor: "الْحَقِيبَةِ",
    explanation: "الْقَلَمُ is de mubtadaʾ. فِي الْحَقِيبَةِ is khabar shibh jumla. فِي is harf jar en الْحَقِيبَةِ is ism majrūr.",
  },
  {
    id: "n2-water-in-glass", level: 2, dutch: "Het water is in het glas.", arabic: "الْمَاءُ فِي الْكُوبِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْمَاءُ", khabar: "فِي الْكُوبِ", khabarType: "shibh_jumlah",
    harfJar: "فِي", ismMajroor: "الْكُوبِ",
    explanation: "الْمَاءُ is de mubtadaʾ. فِي الْكُوبِ is khabar shibh jumla. فِي is harf jar en الْكُوبِ is ism majrūr.",
  },
  {
    id: "n2-milk-in-glass", level: 2, dutch: "De melk is in het glas.", arabic: "الْحَلِيبُ فِي الْكُوبِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْحَلِيبُ", khabar: "فِي الْكُوبِ", khabarType: "shibh_jumlah",
    harfJar: "فِي", ismMajroor: "الْكُوبِ",
    explanation: "الْحَلِيبُ is de mubtadaʾ. فِي الْكُوبِ is khabar shibh jumla. فِي is harf jar en الْكُوبِ is ism majrūr.",
  },
  {
    id: "n2-apple-on-plate", level: 2, dutch: "De appel is op het bord.", arabic: "التُّفَّاحَةُ عَلَى الطَّبَقِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "التُّفَّاحَةُ", khabar: "عَلَى الطَّبَقِ", khabarType: "shibh_jumlah",
    harfJar: "عَلَى", ismMajroor: "الطَّبَقِ",
    explanation: "التُّفَّاحَةُ is de mubtadaʾ. عَلَى الطَّبَقِ is khabar shibh jumla. عَلَى is harf jar en الطَّبَقِ is ism majrūr.",
  },
  {
    id: "n2-student-in-class", level: 2, dutch: "De student is in de klas.", arabic: "الطَّالِبُ فِي الْفَصْلِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الطَّالِبُ", khabar: "فِي الْفَصْلِ", khabarType: "shibh_jumlah",
    harfJar: "فِي", ismMajroor: "الْفَصْلِ",
    explanation: "الطَّالِبُ is de mubtadaʾ. فِي الْفَصْلِ is khabar shibh jumla. فِي is harf jar en الْفَصْلِ is ism majrūr.",
  },
  {
    id: "n2-teacher-in-mosque", level: 2, dutch: "De leraar is in de moskee.", arabic: "الْمُعَلِّمُ فِي الْمَسْجِدِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْمُعَلِّمُ", khabar: "فِي الْمَسْجِدِ", khabarType: "shibh_jumlah",
    harfJar: "فِي", ismMajroor: "الْمَسْجِدِ",
    explanation: "الْمُعَلِّمُ is de mubtadaʾ. فِي الْمَسْجِدِ is khabar shibh jumla. فِي is harf jar en الْمَسْجِدِ is ism majrūr.",
  },
  {
    id: "n4-student-class-pen-table", level: 4,
    dutch: "De student is in de klas en de pen is op de tafel.",
    arabic: "الطَّالِبُ فِي الْفَصْلِ وَالْقَلَمُ عَلَى الطَّاوِلَةِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الطَّالِبُ", khabar: "فِي الْفَصْلِ", khabarType: "shibh_jumlah",
    harfJar: "فِي", ismMajroor: "الْفَصْلِ",
    explanation: "Dit is een langere jumla ismiyya met twee delen. الطَّالِبُ is mubtadaʾ en فِي الْفَصْلِ is khabar shibh jumla.",
  },
  {
    id: "n4-book-table-water-glass", level: 4,
    dutch: "Het boek is op de tafel en het water is in het glas.",
    arabic: "الْكِتَابُ عَلَى الطَّاوِلَةِ وَالْمَاءُ فِي الْكُوبِ",
    sentenceType: "jumlah_ismiyyah", mubtada: "الْكِتَابُ", khabar: "عَلَى الطَّاوِلَةِ", khabarType: "shibh_jumlah",
    harfJar: "عَلَى", ismMajroor: "الطَّاوِلَةِ",
    explanation: "Dit is een langere jumla ismiyya met twee veilige plaatsconstructies.",
  },
  {
    id: "n4-teacher-writes-student-class", level: 4,
    dutch: "De leraar schrijft en de student is in de klas.",
    arabic: "يَكْتُبُ الْمُعَلِّمُ وَالطَّالِبُ فِي الْفَصْلِ",
    sentenceType: "jumlah_fi3liyyah", khabarType: "none", fi3l: "يَكْتُبُ",
    explanation: "De zin begint met يَكْتُبُ, dus het eerste deel is jumla fiʿliyya. Het fiʿl is يَكْتُبُ.",
  },
  {
    id: "n4-girl-writes-car-beautiful", level: 4,
    dutch: "De studente schrijft en de auto is mooi.",
    arabic: "تَكْتُبُ الطَّالِبَةُ وَالسَّيَّارَةُ جَمِيلَةٌ",
    sentenceType: "jumlah_fi3liyyah", khabarType: "none", fi3l: "تَكْتُبُ",
    explanation: "De zin begint met تَكْتُبُ, dus het eerste deel is jumla fiʿliyya. Het fiʿl is تَكْتُبُ.",
  },
];

export const getSentencesByLevel = (level: MubtadaKhabarLevel) =>
  level === 3
    ? mubtadaKhabarSentences.filter((sentence) => sentence.level === 1 || sentence.level === 2)
    : mubtadaKhabarSentences.filter((sentence) => sentence.level === level);

export const getSentenceWords = (sentence: MubtadaKhabarSentence): string[] => {
  const parts = sentence.arabic.split(/\s+/);
  const combined = [sentence.khabar, sentence.mubtada, sentence.harfJar, sentence.ismMajroor, sentence.fi3l]
    .filter((value): value is string => Boolean(value));
  return [...new Set([...parts, ...combined])];
};

