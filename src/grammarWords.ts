export type GrammarRole = "harf_jar" | "ism_ishara" | "zarf_makaan";

export type GrammarWord = {
  id: string;
  dutch: string;
  arabic: string;
  arabicType: "harf" | "ism" | "zarf";
  grammarRole: GrammarRole;
  gender?: "mudhakkar" | "muannath" | "none";
  semanticTags?: SemanticTag[];
};

const grammarWordData: Omit<GrammarWord, "semanticTags">[] = [
  { id: "fi", dutch: "in", arabic: "فِي", arabicType: "harf", grammarRole: "harf_jar", gender: "none" },
  { id: "ala", dutch: "op", arabic: "عَلَى", arabicType: "harf", grammarRole: "harf_jar", gender: "none" },
  { id: "hadha", dutch: "dit/deze mannelijk", arabic: "هَٰذَا", arabicType: "ism", grammarRole: "ism_ishara", gender: "mudhakkar" },
  { id: "hadhihi", dutch: "dit/deze vrouwelijk", arabic: "هَٰذِهِ", arabicType: "ism", grammarRole: "ism_ishara", gender: "muannath" },
  { id: "fawqa", dutch: "boven", arabic: "فَوْقَ", arabicType: "zarf", grammarRole: "zarf_makaan", gender: "none" },
  { id: "tahta", dutch: "onder", arabic: "تَحْتَ", arabicType: "zarf", grammarRole: "zarf_makaan", gender: "none" },
  { id: "bijanibi", dutch: "naast", arabic: "بِجَانِبِ", arabicType: "zarf", grammarRole: "zarf_makaan", gender: "none" },
  { id: "amama", dutch: "voor", arabic: "أَمَامَ", arabicType: "zarf", grammarRole: "zarf_makaan", gender: "none" },
  { id: "khalfa", dutch: "achter", arabic: "خَلْفَ", arabicType: "zarf", grammarRole: "zarf_makaan", gender: "none" },
  { id: "hawla", dutch: "rondom", arabic: "حَوْلَ", arabicType: "zarf", grammarRole: "zarf_makaan", gender: "none" },
];

export const grammarWords: GrammarWord[] = grammarWordData.map((word) => ({
  ...word,
  semanticTags: ["grammar"],
}));
import type { SemanticTag } from "./vocabulary";
