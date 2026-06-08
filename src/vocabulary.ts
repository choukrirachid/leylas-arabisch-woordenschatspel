export type ArabicType = "ism" | "fi3l" | "harf" | "zarf";
export type Gender = "mudhakkar" | "muannath" | "none";
export type Definiteness = "marifa" | "nakira" | "not_applicable";
export type Category =
  | "school" | "house" | "food" | "outside_transport" | "fruit"
  | "numbers" | "verbs" | "adjectives" | "grammar";

export type VocabularyItem = {
  id: string;
  dutchIndefiniteSingular: string;
  dutchDefiniteSingular?: string;
  dutchIndefinitePlural?: string;
  dutchDefinitePlural?: string;
  dutchSingular: string;
  dutchPlural?: string;
  arabicIndefiniteRaf?: string;
  arabicDefiniteRaf?: string;
  arabicIndefinitePluralRaf?: string;
  arabicDefinitePluralRaf?: string;
  arabicIndefiniteJarr?: string;
  arabicDefiniteJarr?: string;
  arabicIndefinitePluralJarr?: string;
  arabicDefinitePluralJarr?: string;
  arabicDualRaf?: string;
  arabicDualJarr?: string;
  dutchDual?: string;
  category: Category;
  arabicType: ArabicType;
  gender: Gender;
  hasPlural: boolean;
  hasDefiniteForm: boolean;
  hasJarrForm: boolean;
  hasGenderPair: boolean;
  masculineIndefiniteRaf?: string;
  feminineIndefiniteRaf?: string;
  masculineDefiniteRaf?: string;
  feminineDefiniteRaf?: string;
  acceptedAnswers?: string[];
};

const dutchForms: Record<string, [string, string?, string?, string?]> = {
  book: ["een boek", "het boek", "boeken", "de boeken"],
  pen: ["een pen", "de pen", "pennen", "de pennen"],
  desk: ["een bureau", "het bureau", "bureaus", "de bureaus"],
  chair: ["een stoel", "de stoel", "stoelen", "de stoelen"],
  "teacher-m": ["een leraar", "de leraar", "leraren", "de leraren"],
  "student-m": ["een student", "de student", "studenten", "de studenten"],
  class: ["een klas", "de klas", "klassen", "de klassen"],
  board: ["een schoolbord", "het schoolbord", "schoolborden", "de schoolborden"],
  schoolbag: ["een boekentas", "de boekentas", "boekentassen", "de boekentassen"],
  "student-f": ["een studente", "de studente", "studentes", "de studentes"],
  "teacher-f": ["een lerares", "de lerares", "leraressen", "de leraressen"],
  bookcase: ["een boekenkast", "de boekenkast", "boekenkasten", "de boekenkasten"],
  language: ["een taal", "de taal", "talen", "de talen"],
  notebook: ["een schrift", "het schrift", "schriften", "de schriften"],
  mushaf: ["een koranboek", "het koranboek", "koranboeken", "de koranboeken"],
  computer: ["een computer", "de computer", "computers", "de computers"],
  house: ["een huis", "het huis", "huizen", "de huizen"],
  door: ["een deur", "de deur", "deuren", "de deuren"],
  window: ["een raam", "het raam", "ramen", "de ramen"],
  road: ["een weg", "de weg", "wegen", "de wegen"],
  mosque: ["een moskee", "de moskee", "moskeeën", "de moskeeën"],
  car: ["een auto", "de auto", "auto's", "de auto's"],
  kitchen: ["een keuken", "de keuken", "keukens", "de keukens"],
  bread: ["brood", "het brood"],
  date: ["een dadel", "de dadel", "dadels", "de dadels"],
  fridge: ["een koelkast", "de koelkast", "koelkasten", "de koelkasten"],
  milk: ["melk", "de melk"],
  water: ["water", "het water"],
  garden: ["een tuin", "de tuin", "tuinen", "de tuinen"],
  tree: ["een boom", "de boom", "bomen", "de bomen"],
  flower: ["een bloem", "de bloem", "bloemen", "de bloemen"],
  ball: ["een bal", "de bal", "ballen", "de ballen"],
  bike: ["een fiets", "de fiets", "fietsen", "de fietsen"],
  plane: ["een vliegtuig", "het vliegtuig", "vliegtuigen", "de vliegtuigen"],
  banana: ["een banaan", "de banaan", "bananen", "de bananen"],
  fruit: ["fruit", "het fruit"],
  plate: ["een bord", "het bord", "borden", "de borden"],
  peach: ["een perzik", "de perzik", "perziken", "de perziken"],
  pear: ["een peer", "de peer", "peren", "de peren"],
  glass: ["een glas", "het glas", "glazen", "de glazen"],
  table: ["een tafel", "de tafel", "tafels", "de tafels"],
  apple: ["een appel", "de appel", "appels", "de appels"],
  orange: ["een appelsien", "de appelsien", "appelsienen", "de appelsienen"],
};

const dualForms: Record<string, [string, string, string]> = {
  book: ["كِتَابَانِ", "كِتَابَيْنِ", "twee boeken"],
  pen: ["قَلَمَانِ", "قَلَمَيْنِ", "twee pennen"],
  desk: ["مَكْتَبَانِ", "مَكْتَبَيْنِ", "twee bureaus"],
  chair: ["كُرْسِيَّانِ", "كُرْسِيَّيْنِ", "twee stoelen"],
  "teacher-m": ["مُعَلِّمَانِ", "مُعَلِّمَيْنِ", "twee leraren"],
  "student-m": ["طَالِبَانِ", "طَالِبَيْنِ", "twee studenten"],
  class: ["فَصْلَانِ", "فَصْلَيْنِ", "twee klassen"],
  board: ["سَبُّورَتَانِ", "سَبُّورَتَيْنِ", "twee schoolborden"],
  schoolbag: ["حَقِيبَتَانِ", "حَقِيبَتَيْنِ", "twee boekentassen"],
  "student-f": ["طَالِبَتَانِ", "طَالِبَتَيْنِ", "twee studentes"],
  "teacher-f": ["مُعَلِّمَتَانِ", "مُعَلِّمَتَيْنِ", "twee leraressen"],
  bookcase: ["مَكْتَبَتَانِ", "مَكْتَبَتَيْنِ", "twee boekenkasten"],
  language: ["لُغَتَانِ", "لُغَتَيْنِ", "twee talen"],
  notebook: ["دَفْتَرَانِ", "دَفْتَرَيْنِ", "twee schriften"],
  mushaf: ["مُصْحَفَانِ", "مُصْحَفَيْنِ", "twee mushafs"],
  computer: ["حَاسُوبَانِ", "حَاسُوبَيْنِ", "twee computers"],
  house: ["بَيْتَانِ", "بَيْتَيْنِ", "twee huizen"],
  door: ["بَابَانِ", "بَابَيْنِ", "twee deuren"],
  window: ["نَافِذَتَانِ", "نَافِذَتَيْنِ", "twee ramen"],
  road: ["طَرِيقَانِ", "طَرِيقَيْنِ", "twee wegen"],
  mosque: ["مَسْجِدَانِ", "مَسْجِدَيْنِ", "twee moskeeën"],
  car: ["سَيَّارَتَانِ", "سَيَّارَتَيْنِ", "twee auto's"],
  kitchen: ["مَطْبَخَانِ", "مَطْبَخَيْنِ", "twee keukens"],
  date: ["تَمْرَتَانِ", "تَمْرَتَيْنِ", "twee dadels"],
  fridge: ["ثَلَّاجَتَانِ", "ثَلَّاجَتَيْنِ", "twee koelkasten"],
  garden: ["حَدِيقَتَانِ", "حَدِيقَتَيْنِ", "twee tuinen"],
  tree: ["شَجَرَتَانِ", "شَجَرَتَيْنِ", "twee bomen"],
  flower: ["زَهْرَتَانِ", "زَهْرَتَيْنِ", "twee bloemen"],
  ball: ["كُرَتَانِ", "كُرَتَيْنِ", "twee ballen"],
  bike: ["دَرَّاجَتَانِ", "دَرَّاجَتَيْنِ", "twee fietsen"],
  plane: ["طَائِرَتَانِ", "طَائِرَتَيْنِ", "twee vliegtuigen"],
  banana: ["مَوْزَتَانِ", "مَوْزَتَيْنِ", "twee bananen"],
  plate: ["طَبَقَانِ", "طَبَقَيْنِ", "twee borden"],
  peach: ["خَوْخَتَانِ", "خَوْخَتَيْنِ", "twee perziken"],
  pear: ["إِجَّاصَتَانِ", "إِجَّاصَتَيْنِ", "twee peren"],
  glass: ["كُوبَانِ", "كُوبَيْنِ", "twee glazen"],
  table: ["طَاوِلَتَانِ", "طَاوِلَتَيْنِ", "twee tafels"],
  apple: ["تُفَّاحَتَانِ", "تُفَّاحَتَيْنِ", "twee appels"],
  orange: ["بُرْتُقَالَتَانِ", "بُرْتُقَالَتَيْنِ", "twee appelsienen"],
};

type NounRow = [
  id: string, dutch: string, plural: string | undefined, category: Category, gender: Gender,
  indefinite: string, definite: string, pluralIndefinite?: string, pluralDefinite?: string,
  jarr?: string, definiteJarr?: string, pluralJarr?: string, pluralDefiniteJarr?: string,
];

const noun = (row: NounRow): VocabularyItem => {
  const [id, dutchSingular, dutchPlural, category, gender, arabicIndefiniteRaf,
    arabicDefiniteRaf, arabicIndefinitePluralRaf, arabicDefinitePluralRaf,
    arabicIndefiniteJarr, arabicDefiniteJarr, arabicIndefinitePluralJarr,
    arabicDefinitePluralJarr] = row;
  const [dutchIndefiniteSingular, dutchDefiniteSingular, dutchIndefinitePlural, dutchDefinitePlural] =
    dutchForms[id] ?? [dutchSingular, undefined, dutchPlural, undefined];
  const dual = dualForms[id];
  return {
    id, dutchSingular, dutchPlural, category, gender, arabicType: "ism",
    dutchIndefiniteSingular, dutchDefiniteSingular, dutchIndefinitePlural, dutchDefinitePlural,
    arabicIndefiniteRaf, arabicDefiniteRaf, arabicIndefinitePluralRaf,
    arabicDefinitePluralRaf, arabicIndefiniteJarr, arabicDefiniteJarr,
    arabicIndefinitePluralJarr, arabicDefinitePluralJarr,
    arabicDualRaf: dual?.[0],
    arabicDualJarr: dual?.[1],
    dutchDual: dual?.[2],
    hasPlural: Boolean(arabicIndefinitePluralRaf),
    hasDefiniteForm: Boolean(arabicDefiniteRaf),
    hasJarrForm: Boolean(arabicIndefiniteJarr),
    hasGenderPair: false,
  };
};

const nouns: VocabularyItem[] = [
  noun(["book", "een boek", "boeken", "school", "mudhakkar", "كِتَابٌ", "الْكِتَابُ", "كُتُبٌ", "الْكُتُبُ", "كِتَابٍ", "الْكِتَابِ", "كُتُبٍ", "الْكُتُبِ"]),
  noun(["pen", "een pen", "pennen", "school", "mudhakkar", "قَلَمٌ", "الْقَلَمُ", "أَقْلَامٌ", "الْأَقْلَامُ", "قَلَمٍ", "الْقَلَمِ", "أَقْلَامٍ", "الْأَقْلَامِ"]),
  noun(["desk", "een bureau", "bureaus", "school", "mudhakkar", "مَكْتَبٌ", "الْمَكْتَبُ", "مَكَاتِبُ", "الْمَكَاتِبُ", "مَكْتَبٍ", "الْمَكْتَبِ", "مَكَاتِبَ", "الْمَكَاتِبِ"]),
  noun(["chair", "een stoel", "stoelen", "school", "mudhakkar", "كُرْسِيٌّ", "الْكُرْسِيُّ", "كَرَاسِيُّ", "الْكَرَاسِيُّ", "كُرْسِيٍّ", "الْكُرْسِيِّ", "كَرَاسِيَّ", "الْكَرَاسِيِّ"]),
  noun(["teacher-m", "een leraar", "leraren", "school", "mudhakkar", "مُعَلِّمٌ", "الْمُعَلِّمُ", "مُعَلِّمُونَ", "الْمُعَلِّمُونَ", "مُعَلِّمٍ", "الْمُعَلِّمِ", "مُعَلِّمِينَ", "الْمُعَلِّمِينَ"]),
  noun(["student-m", "een student", "studenten", "school", "mudhakkar", "طَالِبٌ", "الطَّالِبُ", "طُلَّابٌ", "الطُّلَّابُ", "طَالِبٍ", "الطَّالِبِ", "طُلَّابٍ", "الطُّلَّابِ"]),
  noun(["class", "een klas", "klassen", "school", "mudhakkar", "فَصْلٌ", "الْفَصْلُ", "فُصُولٌ", "الْفُصُولُ", "فَصْلٍ", "الْفَصْلِ", "فُصُولٍ", "الْفُصُولِ"]),
  noun(["board", "een schoolbord", "schoolborden", "school", "muannath", "سَبُّورَةٌ", "السَّبُّورَةُ", "سَبُّورَاتٌ", "السَّبُّورَاتُ", "سَبُّورَةٍ", "السَّبُّورَةِ", "سَبُّورَاتٍ", "السَّبُّورَاتِ"]),
  noun(["schoolbag", "een boekentas", "boekentassen", "school", "muannath", "حَقِيبَةٌ", "الْحَقِيبَةُ", "حَقَائِبُ", "الْحَقَائِبُ", "حَقِيبَةٍ", "الْحَقِيبَةِ", "حَقَائِبَ", "الْحَقَائِبِ"]),
  noun(["student-f", "een studente", "studentes", "school", "muannath", "طَالِبَةٌ", "الطَّالِبَةُ", "طَالِبَاتٌ", "الطَّالِبَاتُ", "طَالِبَةٍ", "الطَّالِبَةِ", "طَالِبَاتٍ", "الطَّالِبَاتِ"]),
  noun(["teacher-f", "een lerares", "leraressen", "school", "muannath", "مُعَلِّمَةٌ", "الْمُعَلِّمَةُ", "مُعَلِّمَاتٌ", "الْمُعَلِّمَاتُ", "مُعَلِّمَةٍ", "الْمُعَلِّمَةِ", "مُعَلِّمَاتٍ", "الْمُعَلِّمَاتِ"]),
  noun(["bookcase", "een boekenkast", "boekenkasten", "school", "muannath", "مَكْتَبَةٌ", "الْمَكْتَبَةُ", "مَكْتَبَاتٌ", "الْمَكْتَبَاتُ", "مَكْتَبَةٍ", "الْمَكْتَبَةِ", "مَكْتَبَاتٍ", "الْمَكْتَبَاتِ"]),
  noun(["language", "een taal", "talen", "school", "muannath", "لُغَةٌ", "اللُّغَةُ", "لُغَاتٌ", "اللُّغَاتُ", "لُغَةٍ", "اللُّغَةِ", "لُغَاتٍ", "اللُّغَاتِ"]),
  noun(["notebook", "een schrift", "schriften", "school", "mudhakkar", "دَفْتَرٌ", "الدَّفْتَرُ", "دَفَاتِرُ", "الدَّفَاتِرُ", "دَفْتَرٍ", "الدَّفْتَرِ", "دَفَاتِرَ", "الدَّفَاتِرِ"]),
  noun(["mushaf", "een koranboek / mushaf", "koranboeken", "school", "mudhakkar", "مُصْحَفٌ", "الْمُصْحَفُ", "مَصَاحِفُ", "الْمَصَاحِفُ", "مُصْحَفٍ", "الْمُصْحَفِ", "مَصَاحِفَ", "الْمَصَاحِفِ"]),
  noun(["computer", "een computer", "computers", "school", "mudhakkar", "حَاسُوبٌ", "الْحَاسُوبُ", "حَوَاسِيبُ", "الْحَوَاسِيبُ", "حَاسُوبٍ", "الْحَاسُوبِ", "حَوَاسِيبَ", "الْحَوَاسِيبِ"]),
  noun(["house", "een huis", "huizen", "house", "mudhakkar", "بَيْتٌ", "الْبَيْتُ", "بُيُوتٌ", "الْبُيُوتُ", "بَيْتٍ", "الْبَيْتِ", "بُيُوتٍ", "الْبُيُوتِ"]),
  noun(["door", "een deur", "deuren", "house", "mudhakkar", "بَابٌ", "الْبَابُ", "أَبْوَابٌ", "الْأَبْوَابُ", "بَابٍ", "الْبَابِ", "أَبْوَابٍ", "الْأَبْوَابِ"]),
  noun(["window", "een raam", "ramen", "house", "muannath", "نَافِذَةٌ", "النَّافِذَةُ", "نَوَافِذُ", "النَّوَافِذُ", "نَافِذَةٍ", "النَّافِذَةِ", "نَوَافِذَ", "النَّوَافِذِ"]),
  noun(["road", "een weg", "wegen", "outside_transport", "mudhakkar", "طَرِيقٌ", "الطَّرِيقُ", "طُرُقٌ", "الطُّرُقُ", "طَرِيقٍ", "الطَّرِيقِ", "طُرُقٍ", "الطُّرُقِ"]),
  noun(["mosque", "een moskee", "moskeeën", "outside_transport", "mudhakkar", "مَسْجِدٌ", "الْمَسْجِدُ", "مَسَاجِدُ", "الْمَسَاجِدُ", "مَسْجِدٍ", "الْمَسْجِدِ", "مَسَاجِدَ", "الْمَسَاجِدِ"]),
  noun(["car", "een auto", "auto's", "outside_transport", "muannath", "سَيَّارَةٌ", "السَّيَّارَةُ", "سَيَّارَاتٌ", "السَّيَّارَاتُ", "سَيَّارَةٍ", "السَّيَّارَةِ", "سَيَّارَاتٍ", "السَّيَّارَاتِ"]),
  noun(["kitchen", "een keuken", "keukens", "house", "mudhakkar", "مَطْبَخٌ", "الْمَطْبَخُ", "مَطَابِخُ", "الْمَطَابِخُ", "مَطْبَخٍ", "الْمَطْبَخِ", "مَطَابِخَ", "الْمَطَابِخِ"]),
  noun(["bread", "brood", undefined, "food", "mudhakkar", "خُبْزٌ", "الْخُبْزُ", undefined, undefined, "خُبْزٍ", "الْخُبْزِ"]),
  noun(["date", "een dadel", "dadels", "food", "muannath", "تَمْرَةٌ", "التَّمْرَةُ", "تَمَرَاتٌ", "التَّمَرَاتُ", "تَمْرَةٍ", "التَّمْرَةِ", "تَمَرَاتٍ", "التَّمَرَاتِ"]),
  noun(["fridge", "een koelkast", "koelkasten", "house", "muannath", "ثَلَّاجَةٌ", "الثَّلَّاجَةُ", "ثَلَّاجَاتٌ", "الثَّلَّاجَاتُ", "ثَلَّاجَةٍ", "الثَّلَّاجَةِ", "ثَلَّاجَاتٍ", "الثَّلَّاجَاتِ"]),
  noun(["milk", "melk", undefined, "food", "mudhakkar", "حَلِيبٌ", "الْحَلِيبُ", undefined, undefined, "حَلِيبٍ", "الْحَلِيبِ"]),
  noun(["water", "water", undefined, "food", "mudhakkar", "مَاءٌ", "الْمَاءُ", undefined, undefined, "مَاءٍ", "الْمَاءِ"]),
  noun(["garden", "een tuin", "tuinen", "outside_transport", "muannath", "حَدِيقَةٌ", "الْحَدِيقَةُ", "حَدَائِقُ", "الْحَدَائِقُ", "حَدِيقَةٍ", "الْحَدِيقَةِ", "حَدَائِقَ", "الْحَدَائِقِ"]),
  noun(["tree", "een boom", "bomen", "outside_transport", "muannath", "شَجَرَةٌ", "الشَّجَرَةُ", "أَشْجَارٌ", "الْأَشْجَارُ", "شَجَرَةٍ", "الشَّجَرَةِ", "أَشْجَارٍ", "الْأَشْجَارِ"]),
  noun(["flower", "een bloem", "bloemen", "outside_transport", "muannath", "زَهْرَةٌ", "الزَّهْرَةُ", "زُهُورٌ", "الزُّهُورُ", "زَهْرَةٍ", "الزَّهْرَةِ", "زُهُورٍ", "الزُّهُورِ"]),
  noun(["ball", "een bal", "ballen", "outside_transport", "muannath", "كُرَةٌ", "الْكُرَةُ", "كُرَاتٌ", "الْكُرَاتُ", "كُرَةٍ", "الْكُرَةِ", "كُرَاتٍ", "الْكُرَاتِ"]),
  noun(["bike", "een fiets", "fietsen", "outside_transport", "muannath", "دَرَّاجَةٌ", "الدَّرَّاجَةُ", "دَرَّاجَاتٌ", "الدَّرَّاجَاتُ", "دَرَّاجَةٍ", "الدَّرَّاجَةِ", "دَرَّاجَاتٍ", "الدَّرَّاجَاتِ"]),
  noun(["plane", "een vliegtuig", "vliegtuigen", "outside_transport", "muannath", "طَائِرَةٌ", "الطَّائِرَةُ", "طَائِرَاتٌ", "الطَّائِرَاتُ", "طَائِرَةٍ", "الطَّائِرَةِ", "طَائِرَاتٍ", "الطَّائِرَاتِ"]),
  noun(["banana", "een banaan", "bananen", "fruit", "muannath", "مَوْزَةٌ", "الْمَوْزَةُ", "مَوْزَاتٌ", "الْمَوْزَاتُ", "مَوْزَةٍ", "الْمَوْزَةِ", "مَوْزَاتٍ", "الْمَوْزَاتِ"]),
  noun(["fruit", "fruit", "fruitsoorten", "fruit", "muannath", "فَاكِهَةٌ", "الْفَاكِهَةُ", "فَوَاكِهُ", "الْفَوَاكِهُ", "فَاكِهَةٍ", "الْفَاكِهَةِ", "فَوَاكِهَ", "الْفَوَاكِهِ"]),
  noun(["plate", "een bord", "borden", "food", "mudhakkar", "طَبَقٌ", "الطَّبَقُ", "أَطْبَاقٌ", "الْأَطْبَاقُ", "طَبَقٍ", "الطَّبَقِ", "أَطْبَاقٍ", "الْأَطْبَاقِ"]),
  noun(["peach", "een perzik", "perziken", "fruit", "muannath", "خَوْخَةٌ", "الْخَوْخَةُ", "خَوْخَاتٌ", "الْخَوْخَاتُ", "خَوْخَةٍ", "الْخَوْخَةِ", "خَوْخَاتٍ", "الْخَوْخَاتِ"]),
  noun(["pear", "een peer", "peren", "fruit", "muannath", "إِجَّاصَةٌ", "الْإِجَّاصَةُ", "إِجَّاصَاتٌ", "الْإِجَّاصَاتُ", "إِجَّاصَةٍ", "الْإِجَّاصَةِ", "إِجَّاصَاتٍ", "الْإِجَّاصَاتِ"]),
  noun(["glass", "een glas", "glazen", "food", "mudhakkar", "كُوبٌ", "الْكُوبُ", "أَكْوَابٌ", "الْأَكْوَابُ", "كُوبٍ", "الْكُوبِ", "أَكْوَابٍ", "الْأَكْوَابِ"]),
  noun(["table", "een tafel", "tafels", "house", "muannath", "طَاوِلَةٌ", "الطَّاوِلَةُ", "طَاوِلَاتٌ", "الطَّاوِلَاتُ", "طَاوِلَةٍ", "الطَّاوِلَةِ", "طَاوِلَاتٍ", "الطَّاوِلَاتِ"]),
  noun(["apple", "een appel", "appels", "fruit", "muannath", "تُفَّاحَةٌ", "التُّفَّاحَةُ", "تُفَّاحَاتٌ", "التُّفَّاحَاتُ", "تُفَّاحَةٍ", "التُّفَّاحَةِ", "تُفَّاحَاتٍ", "التُّفَّاحَاتِ"]),
  noun(["orange", "een appelsien", "appelsienen", "fruit", "muannath", "بُرْتُقَالَةٌ", "الْبُرْتُقَالَةُ", "بُرْتُقَالَاتٌ", "الْبُرْتُقَالَاتُ", "بُرْتُقَالَةٍ", "الْبُرْتُقَالَةِ", "بُرْتُقَالَاتٍ", "الْبُرْتُقَالَاتِ"]),
];

const pairData = {
  "teacher-m": ["مُعَلِّمٌ", "مُعَلِّمَةٌ", "الْمُعَلِّمُ", "الْمُعَلِّمَةُ"],
  "teacher-f": ["مُعَلِّمٌ", "مُعَلِّمَةٌ", "الْمُعَلِّمُ", "الْمُعَلِّمَةُ"],
  "student-m": ["طَالِبٌ", "طَالِبَةٌ", "الطَّالِبُ", "الطَّالِبَةُ"],
  "student-f": ["طَالِبٌ", "طَالِبَةٌ", "الطَّالِبُ", "الطَّالِبَةُ"],
} as const;

for (const item of nouns) {
  const pair = pairData[item.id as keyof typeof pairData];
  if (pair) {
    item.hasGenderPair = true;
    [item.masculineIndefiniteRaf, item.feminineIndefiniteRaf,
      item.masculineDefiniteRaf, item.feminineDefiniteRaf] = pair;
  }
}

const simple = (
  id: string, dutchSingular: string, arabic: string, category: Category,
  arabicType: ArabicType = "ism", gender: Gender = "none",
): VocabularyItem => ({
  id, dutchSingular, dutchIndefiniteSingular: dutchSingular,
  arabicIndefiniteRaf: arabic, category, arabicType, gender,
  hasPlural: false, hasDefiniteForm: false, hasJarrForm: false, hasGenderPair: false,
});

export const vocabulary: VocabularyItem[] = [
  ...nouns,
  simple("studies", "zij studeert", "تَدْرُسُ", "verbs", "fi3l"),
  simple("writes", "zij schrijft", "تَكْتُبُ", "verbs", "fi3l"),
  simple("eats", "hij eet", "يَأْكُلُ", "verbs", "fi3l"),
  simple("drinks", "zij drinkt", "تَشْرَبُ", "verbs", "fi3l"),
  {
    ...simple("tasty", "lekker", "لَذِيذٌ", "adjectives", "ism", "mudhakkar"),
    arabicDefiniteRaf: "اللَّذِيذُ", hasDefiniteForm: true, hasGenderPair: true,
    masculineIndefiniteRaf: "لَذِيذٌ", feminineIndefiniteRaf: "لَذِيذَةٌ",
    masculineDefiniteRaf: "اللَّذِيذُ", feminineDefiniteRaf: "اللَّذِيذَةُ",
  },
  simple("one", "één", "وَاحِدٌ", "numbers", "ism", "mudhakkar"),
  simple("two", "twee", "اِثْنَانِ", "numbers"),
  simple("three", "drie", "ثَلَاثَةٌ", "numbers"),
  simple("four", "vier", "أَرْبَعَةٌ", "numbers"),
  simple("five", "vijf", "خَمْسَةٌ", "numbers"),
  simple("six", "zes", "سِتَّةٌ", "numbers"),
];

export const isNoun = (item: VocabularyItem) => item.arabicType === "ism";
export const isVerb = (item: VocabularyItem) => item.arabicType === "fi3l";
export const isHarf = (item: VocabularyItem) => item.arabicType === "harf";
export const isZarf = (item: VocabularyItem) => item.arabicType === "zarf";
export const hasPlural = (item: VocabularyItem) => item.hasPlural;
export const hasGenderPair = (item: VocabularyItem) => item.hasGenderPair;
