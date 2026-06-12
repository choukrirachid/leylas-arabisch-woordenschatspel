export type IdafaPhrase = {
  id: string;
  mudaf: string;
  mudafIlayhi: string;
  phrase: string;
  dutch: string;
  possessionType: "bezit" | "hoort-bij" | "deel-van" | "inhoud-soort";
  childExplanation: string;
  grammarExplanation: string;
};

export const idafaPhrases: IdafaPhrase[] = [
  {
    id: "book-of-student",
    mudaf: "كِتَابُ",
    mudafIlayhi: "الطَّالِبِ",
    phrase: "كِتَابُ الطَّالِبِ",
    dutch: "het boek van de student",
    possessionType: "bezit",
    childExplanation: "Het boek hoort bij de student. Je kan zeggen: het boek van de student.",
    grammarExplanation: "كِتَابُ is de muḍāf. الطَّالِبِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "pen-of-teacher",
    mudaf: "قَلَمُ",
    mudafIlayhi: "الْمُعَلِّمِ",
    phrase: "قَلَمُ الْمُعَلِّمِ",
    dutch: "de pen van de leraar",
    possessionType: "bezit",
    childExplanation: "De pen hoort bij de leraar. Je kan zeggen: de pen van de leraar.",
    grammarExplanation: "قَلَمُ is de muḍāf. الْمُعَلِّمِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "door-of-house",
    mudaf: "بَابُ",
    mudafIlayhi: "الْبَيْتِ",
    phrase: "بَابُ الْبَيْتِ",
    dutch: "de deur van het huis",
    possessionType: "deel-van",
    childExplanation: "De deur is een deel van het huis.",
    grammarExplanation: "بَابُ is de muḍāf. الْبَيْتِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "desk-of-female-teacher",
    mudaf: "مَكْتَبُ",
    mudafIlayhi: "الْمُعَلِّمَةِ",
    phrase: "مَكْتَبُ الْمُعَلِّمَةِ",
    dutch: "het bureau van de lerares",
    possessionType: "bezit",
    childExplanation: "Het bureau hoort bij de lerares.",
    grammarExplanation: "مَكْتَبُ is de muḍāf. الْمُعَلِّمَةِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "bag-of-female-student",
    mudaf: "حَقِيبَةُ",
    mudafIlayhi: "الطَّالِبَةِ",
    phrase: "حَقِيبَةُ الطَّالِبَةِ",
    dutch: "de boekentas van de studente",
    possessionType: "bezit",
    childExplanation: "De boekentas hoort bij de studente.",
    grammarExplanation: "حَقِيبَةُ is de muḍāf. الطَّالِبَةِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "chair-of-class",
    mudaf: "كُرْسِيُّ",
    mudafIlayhi: "الْفَصْلِ",
    phrase: "كُرْسِيُّ الْفَصْلِ",
    dutch: "de stoel van de klas",
    possessionType: "hoort-bij",
    childExplanation: "De stoel hoort bij de klas.",
    grammarExplanation: "كُرْسِيُّ is de muḍāf. الْفَصْلِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "key-of-car",
    mudaf: "مِفْتَاحُ",
    mudafIlayhi: "السَّيَّارَةِ",
    phrase: "مِفْتَاحُ السَّيَّارَةِ",
    dutch: "de sleutel van de auto",
    possessionType: "hoort-bij",
    childExplanation: "De sleutel hoort bij de auto.",
    grammarExplanation: "مِفْتَاحُ is de muḍāf. السَّيَّارَةِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "door-of-mosque",
    mudaf: "بَابُ",
    mudafIlayhi: "الْمَسْجِدِ",
    phrase: "بَابُ الْمَسْجِدِ",
    dutch: "de deur van de moskee",
    possessionType: "deel-van",
    childExplanation: "De deur is een deel van de moskee.",
    grammarExplanation: "بَابُ is de muḍāf. الْمَسْجِدِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "cup-of-water",
    mudaf: "كُوبُ",
    mudafIlayhi: "الْمَاءِ",
    phrase: "كُوبُ الْمَاءِ",
    dutch: "het glas water / de beker water",
    possessionType: "inhoud-soort",
    childExplanation: "Het glas heeft water erin. Je kan zeggen: een glas water.",
    grammarExplanation: "كُوبُ is de muḍāf. الْمَاءِ is de muḍāf ilayhi en staat in majrūr.",
  },
  {
    id: "plate-of-food",
    mudaf: "طَبَقُ",
    mudafIlayhi: "الطَّعَامِ",
    phrase: "طَبَقُ الطَّعَامِ",
    dutch: "het bord eten",
    possessionType: "inhoud-soort",
    childExplanation: "Het bord hoort bij het eten of heeft eten erop.",
    grammarExplanation: "طَبَقُ is de muḍāf. الطَّعَامِ is de muḍāf ilayhi en staat in majrūr.",
  },
];
