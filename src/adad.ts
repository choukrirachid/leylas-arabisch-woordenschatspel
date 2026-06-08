export type AdadGender = "mudhakkar" | "muannath";

export type AdadItem = {
  value: number;
  dutch: string;
  masculine: string;
  feminine: string;
};

export const adadItems: AdadItem[] = [
  { value: 1, dutch: "één", masculine: "وَاحِدٌ", feminine: "وَاحِدَةٌ" },
  { value: 2, dutch: "twee", masculine: "اِثْنَانِ", feminine: "اِثْنَتَانِ" },
  { value: 3, dutch: "drie", masculine: "ثَلَاثَةٌ", feminine: "ثَلَاثٌ" },
  { value: 4, dutch: "vier", masculine: "أَرْبَعَةٌ", feminine: "أَرْبَعٌ" },
  { value: 5, dutch: "vijf", masculine: "خَمْسَةٌ", feminine: "خَمْسٌ" },
  { value: 6, dutch: "zes", masculine: "سِتَّةٌ", feminine: "سِتٌّ" },
  { value: 7, dutch: "zeven", masculine: "سَبْعَةٌ", feminine: "سَبْعٌ" },
  { value: 8, dutch: "acht", masculine: "ثَمَانِيَةٌ", feminine: "ثَمَانٍ" },
  { value: 9, dutch: "negen", masculine: "تِسْعَةٌ", feminine: "تِسْعٌ" },
  { value: 10, dutch: "tien", masculine: "عَشَرَةٌ", feminine: "عَشْرٌ" },
];

export const getAdadForm = (item: AdadItem, gender: AdadGender): string =>
  gender === "mudhakkar" ? item.masculine : item.feminine;

export const getAdadGenderFromForm = (form: string): AdadGender | undefined => {
  const item = adadItems.find((entry) => entry.masculine === form || entry.feminine === form);
  if (!item) return undefined;
  return item.masculine === form ? "mudhakkar" : "muannath";
};

