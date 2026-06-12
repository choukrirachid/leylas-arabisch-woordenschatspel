export type PlaceAdverb = {
  id: string;
  arabic: string;
  dutch: string;
};

export type PlaceAdverbPhrase = {
  id: string;
  adverbId: string;
  nounJarr: string;
  arabic: string;
  dutch: string;
};

export type PlaceAdverbSentence = {
  id: string;
  adverbId: string;
  arabic: string;
  words: string[];
};

export const placeAdverbs: PlaceAdverb[] = [
  { id: "above", arabic: "فَوْقَ", dutch: "boven" },
  { id: "under", arabic: "تَحْتَ", dutch: "onder" },
  { id: "next-to", arabic: "بِجَانِبِ", dutch: "naast" },
  { id: "in-front-of", arabic: "أَمَامَ", dutch: "voor" },
  { id: "behind", arabic: "خَلْفَ", dutch: "achter" },
  { id: "around", arabic: "حَوْلَ", dutch: "rondom" },
];

export const placeAdverbPhrases: PlaceAdverbPhrase[] = [
  { id: "above-desk", adverbId: "above", nounJarr: "الْمَكْتَبِ", arabic: "فَوْقَ الْمَكْتَبِ", dutch: "boven het bureau" },
  { id: "under-chair", adverbId: "under", nounJarr: "الْكُرْسِيِّ", arabic: "تَحْتَ الْكُرْسِيِّ", dutch: "onder de stoel" },
  { id: "next-to-house", adverbId: "next-to", nounJarr: "الْبَيْتِ", arabic: "بِجَانِبِ الْبَيْتِ", dutch: "naast het huis" },
  { id: "in-front-of-mosque", adverbId: "in-front-of", nounJarr: "الْمَسْجِدِ", arabic: "أَمَامَ الْمَسْجِدِ", dutch: "voor de moskee" },
  { id: "behind-door", adverbId: "behind", nounJarr: "الْبَابِ", arabic: "خَلْفَ الْبَابِ", dutch: "achter de deur" },
  { id: "around-table", adverbId: "around", nounJarr: "الطَّاوِلَةِ", arabic: "حَوْلَ الطَّاوِلَةِ", dutch: "rondom de tafel" },
];

export const placeAdverbSentences: PlaceAdverbSentence[] = [
  { id: "book-above-desk", adverbId: "above", arabic: "الْكِتَابُ فَوْقَ الْمَكْتَبِ", words: ["الْكِتَابُ", "فَوْقَ", "الْمَكْتَبِ"] },
  { id: "pen-under-chair", adverbId: "under", arabic: "الْقَلَمُ تَحْتَ الْكُرْسِيِّ", words: ["الْقَلَمُ", "تَحْتَ", "الْكُرْسِيِّ"] },
  { id: "mosque-next-to-house", adverbId: "next-to", arabic: "الْمَسْجِدُ بِجَانِبِ الْبَيْتِ", words: ["الْمَسْجِدُ", "بِجَانِبِ", "الْبَيْتِ"] },
  { id: "student-in-front-of-board", adverbId: "in-front-of", arabic: "الطَّالِبُ أَمَامَ السَّبُّورَةِ", words: ["الطَّالِبُ", "أَمَامَ", "السَّبُّورَةِ"] },
  { id: "car-behind-house", adverbId: "behind", arabic: "السَّيَّارَةُ خَلْفَ الْبَيْتِ", words: ["السَّيَّارَةُ", "خَلْفَ", "الْبَيْتِ"] },
  { id: "ball-around-table", adverbId: "around", arabic: "الْكُرَةُ حَوْلَ الطَّاوِلَةِ", words: ["الْكُرَةُ", "حَوْلَ", "الطَّاوِلَةِ"] },
];

export const getPlaceAdverb = (id: string): PlaceAdverb => {
  const adverb = placeAdverbs.find((item) => item.id === id);
  if (!adverb) throw new Error(`Onbekende ẓarf: ${id}`);
  return adverb;
};
