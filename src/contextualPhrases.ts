import type { VocabularyItem } from "./vocabulary";

export type ContextualPhraseTemplate = {
  id: string;
  dutch: string;
  arabic: string;
  grammarFocus: "fi" | "ala" | "zarf_makaan" | "harf_jar" | "ism_majroor";
};

export const contextualPhrases: ContextualPhraseTemplate[] = [
  { id: "book-on-table", dutch: "het boek is op de tafel", arabic: "الْكِتَابُ عَلَى الطَّاوِلَةِ", grammarFocus: "ala" },
  { id: "pen-on-desk", dutch: "de pen is op het bureau", arabic: "الْقَلَمُ عَلَى الْمَكْتَبِ", grammarFocus: "ala" },
  { id: "book-in-bag", dutch: "het boek is in de boekentas", arabic: "الْكِتَابُ فِي الْحَقِيبَةِ", grammarFocus: "fi" },
  { id: "water-in-glass", dutch: "het water is in het glas", arabic: "الْمَاءُ فِي الْكُوبِ", grammarFocus: "fi" },
  { id: "milk-in-glass", dutch: "de melk is in het glas", arabic: "الْحَلِيبُ فِي الْكُوبِ", grammarFocus: "fi" },
  { id: "student-in-class", dutch: "de student is in de klas", arabic: "الطَّالِبُ فِي الْفَصْلِ", grammarFocus: "fi" },
  { id: "teacher-in-mosque", dutch: "de leraar is in de moskee", arabic: "الْمُعَلِّمُ فِي الْمَسْجِدِ", grammarFocus: "fi" },
  { id: "apple-on-plate", dutch: "de appel is op het bord", arabic: "التُّفَّاحَةُ عَلَى الطَّبَقِ", grammarFocus: "ala" },
  { id: "dates-on-plate", dutch: "de dadels zijn op het bord", arabic: "التُّمُورُ عَلَى الطَّبَقِ", grammarFocus: "ala" },
  { id: "chair-under-table", dutch: "de stoel is onder de tafel", arabic: "الْكُرْسِيُّ تَحْتَ الطَّاوِلَةِ", grammarFocus: "zarf_makaan" },
  { id: "bike-beside-house", dutch: "de fiets is naast het huis", arabic: "الدَّرَّاجَةُ بِجَانِبِ الْبَيْتِ", grammarFocus: "zarf_makaan" },
  { id: "car-in-front-of-house", dutch: "de auto is voor het huis", arabic: "السَّيَّارَةُ أَمَامَ الْبَيْتِ", grammarFocus: "zarf_makaan" },
  { id: "tree-behind-house", dutch: "de boom is achter het huis", arabic: "الشَّجَرَةُ خَلْفَ الْبَيْتِ", grammarFocus: "zarf_makaan" },
  { id: "flower-beside-tree", dutch: "de bloem is naast de boom", arabic: "الْوَرْدَةُ بِجَانِبِ الشَّجَرَةِ", grammarFocus: "zarf_makaan" },
];

export const canUseAsLocation = (item: VocabularyItem): boolean =>
  item.canBeLocation === true;

export const canPlaceOn = (subject: VocabularyItem, location: VocabularyItem): boolean =>
  subject.canBeOnTopOfSomething === true
  && location.canHaveThingsOnTop === true
  && (location.id !== "plate" || subject.semanticTags?.includes("food") === true);

export const canPlaceIn = (subject: VocabularyItem, location: VocabularyItem): boolean => {
  if (subject.canBeInSomething !== true || location.canContainThings !== true) return false;
  if (location.id === "glass") return subject.semanticTags?.includes("drink") === true;
  if (location.id === "plate") return subject.semanticTags?.includes("food") === true;
  if (location.id === "schoolbag" || location.id === "bookcase") {
    return subject.semanticTags?.includes("school_object") === true;
  }
  if (location.id === "fridge") {
    return subject.semanticTags?.some((tag) => tag === "food" || tag === "drink") === true;
  }
  return true;
};

export const canPlaceBeside = (subject: VocabularyItem, location: VocabularyItem): boolean =>
  subject.canBeBesideSomething === true && location.canBeBesideSomething === true;

export const canPlaceUnder = (subject: VocabularyItem, location: VocabularyItem): boolean =>
  subject.canBeUnderSomething === true && location.canBeLocation === true;

export const forbiddenContextFragments = [
  "de pen is in de leraar",
  "het boek is op de appel",
  "de fiets is in het glas",
  "de melk is onder de tafel",
  "water is naast de student",
  "de auto is op de peer",
  "de stoel is in de pen",
  "het brood is onder de melk",
  "het schrift is in de lerares",
  "de computer is op de banaan",
];

export const contextualPhrasesAreSafe = (): boolean =>
  contextualPhrases.every((phrase) =>
    forbiddenContextFragments.every((forbidden) =>
      !phrase.dutch.toLocaleLowerCase("nl").includes(forbidden),
    ),
  );

export const contextMetadataIsSafe = (items: VocabularyItem[]): boolean => {
  const byId = new Map(items.map((item) => [item.id, item]));
  const item = (id: string) => byId.get(id);
  const required = ["pen", "teacher-m", "book", "apple", "bike", "glass", "milk", "table", "water", "student-m", "car", "pear", "chair", "bread", "teacher-f", "notebook", "computer", "banana"];
  if (required.some((id) => !item(id))) return false;
  return item("teacher-m")!.canBeLocation === false
    && !canPlaceIn(item("pen")!, item("teacher-m")!)
    && !canPlaceOn(item("book")!, item("apple")!)
    && !canPlaceIn(item("bike")!, item("glass")!)
    && !canPlaceUnder(item("milk")!, item("table")!)
    && !canPlaceBeside(item("water")!, item("student-m")!)
    && !canPlaceOn(item("car")!, item("pear")!)
    && !canPlaceIn(item("chair")!, item("pen")!)
    && !canPlaceUnder(item("bread")!, item("milk")!)
    && !canPlaceIn(item("notebook")!, item("teacher-f")!)
    && !canPlaceOn(item("computer")!, item("banana")!)
    && canPlaceIn(item("water")!, item("glass")!)
    && canPlaceOn(item("book")!, item("table")!);
};
