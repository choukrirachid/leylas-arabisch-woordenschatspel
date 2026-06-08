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
  { value: 3, dutch: "drie", masculine: "ثَلَاثٌ", feminine: "ثَلَاثَةٌ" },
  { value: 4, dutch: "vier", masculine: "أَرْبَعٌ", feminine: "أَرْبَعَةٌ" },
  { value: 5, dutch: "vijf", masculine: "خَمْسٌ", feminine: "خَمْسَةٌ" },
  { value: 6, dutch: "zes", masculine: "سِتٌّ", feminine: "سِتَّةٌ" },
  { value: 7, dutch: "zeven", masculine: "سَبْعٌ", feminine: "سَبْعَةٌ" },
  { value: 8, dutch: "acht", masculine: "ثَمَانٍ", feminine: "ثَمَانِيَةٌ" },
  { value: 9, dutch: "negen", masculine: "تِسْعٌ", feminine: "تِسْعَةٌ" },
  { value: 10, dutch: "tien", masculine: "عَشْرٌ", feminine: "عَشَرَةٌ" },
];

export const getAdadForm = (item: AdadItem, gender: AdadGender): string =>
  gender === "mudhakkar" ? item.masculine : item.feminine;

export const getAdadGenderFromForm = (form: string): AdadGender | undefined => {
  const item = adadItems.find((entry) => entry.masculine === form || entry.feminine === form);
  if (!item) return undefined;
  return item.masculine === form ? "mudhakkar" : "muannath";
};
