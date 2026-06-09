import type { VocabularyItem } from "./vocabulary";

export type Mode =
  | "home" | "vocabulary" | "fourForms" | "definiteness" | "jar"
  | "zarf" | "ishara" | "grammar" | "gender" | "writing" | "exam" | "adad"
  | "mubtadaKhabar";

export type Question = {
  id: string;
  prompt: string;
  detail?: string;
  answer: string;
  options: string[];
  arabicPrompt?: boolean;
  explanation?: string;
  source?: VocabularyItem;
  selfCheck?: boolean;
};

export type Mistake = {
  question: Question;
  chosen: string;
};
