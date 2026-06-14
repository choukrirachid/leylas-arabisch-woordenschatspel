export type JumlaType = "ismiyyah" | "filiyyah";

export type JumlaExample = {
  id: string;
  sentence: string;
  firstWord: string;
  firstWordType: "ism" | "fi3l";
  jumlaType: JumlaType;
  dutch: string;
  explanation: string;
};

export const jumlaExamples: JumlaExample[] = [
  {
    id: "book-on-desk",
    sentence: "الْكِتَابُ فَوْقَ الْمَكْتَبِ.",
    firstWord: "الْكِتَابُ",
    firstWordType: "ism",
    jumlaType: "ismiyyah",
    dutch: "Het boek is boven het bureau.",
    explanation: "De zin begint met الْكِتَابُ. Dat is een ism. Daarom is dit een jumla ismiyyah.",
  },
  {
    id: "student-in-class",
    sentence: "الطَّالِبُ فِي الْفَصْلِ.",
    firstWord: "الطَّالِبُ",
    firstWordType: "ism",
    jumlaType: "ismiyyah",
    dutch: "De student is in de klas.",
    explanation: "De zin begint met الطَّالِبُ. Dat is een ism. Daarom is dit een jumla ismiyyah.",
  },
  {
    id: "teacher-front-board",
    sentence: "الْمُعَلِّمُ أَمَامَ السَّبُّورَةِ.",
    firstWord: "الْمُعَلِّمُ",
    firstWordType: "ism",
    jumlaType: "ismiyyah",
    dutch: "De leraar is voor het bord.",
    explanation: "De zin begint met الْمُعَلِّمُ. Dat is een ism. Daarom is dit een jumla ismiyyah.",
  },
  {
    id: "ball-under-tree",
    sentence: "الْكُرَةُ تَحْتَ الشَّجَرَةِ.",
    firstWord: "الْكُرَةُ",
    firstWordType: "ism",
    jumlaType: "ismiyyah",
    dutch: "De bal is onder de boom.",
    explanation: "De zin begint met الْكُرَةُ. Dat is een ism. Daarom is dit een jumla ismiyyah.",
  },
  {
    id: "this-book",
    sentence: "هٰذَا كِتَابٌ.",
    firstWord: "هٰذَا",
    firstWordType: "ism",
    jumlaType: "ismiyyah",
    dutch: "Dit is een boek.",
    explanation: "De zin begint met هٰذَا. Dat behandelen we hier als ism. Daarom is dit een jumla ismiyyah.",
  },
  {
    id: "this-female-student",
    sentence: "هٰذِهِ طَالِبَةٌ.",
    firstWord: "هٰذِهِ",
    firstWordType: "ism",
    jumlaType: "ismiyyah",
    dutch: "Dit is een studente.",
    explanation: "De zin begint met هٰذِهِ. Dat behandelen we hier als ism. Daarom is dit een jumla ismiyyah.",
  },
  {
    id: "female-student-writes",
    sentence: "تَكْتُبُ الطَّالِبَةُ فِي الدَّفْتَرِ.",
    firstWord: "تَكْتُبُ",
    firstWordType: "fi3l",
    jumlaType: "filiyyah",
    dutch: "De studente schrijft in het schrift.",
    explanation: "De zin begint met تَكْتُبُ. Dat is een fiʿl. Daarom is dit een jumla fiʿliyyah.",
  },
  {
    id: "female-student-studies",
    sentence: "تَدْرُسُ الطَّالِبَةُ فِي الْفَصْلِ.",
    firstWord: "تَدْرُسُ",
    firstWordType: "fi3l",
    jumlaType: "filiyyah",
    dutch: "De studente studeert in de klas.",
    explanation: "De zin begint met تَدْرُسُ. Dat is een fiʿl. Daarom is dit een jumla fiʿliyyah.",
  },
  {
    id: "student-eats",
    sentence: "يَأْكُلُ الطَّالِبُ الْخُبْزَ.",
    firstWord: "يَأْكُلُ",
    firstWordType: "fi3l",
    jumlaType: "filiyyah",
    dutch: "De student eet het brood.",
    explanation: "De zin begint met يَأْكُلُ. Dat is een fiʿl. Daarom is dit een jumla fiʿliyyah.",
  },
  {
    id: "female-student-drinks",
    sentence: "تَشْرَبُ الطَّالِبَةُ الْمَاءَ.",
    firstWord: "تَشْرَبُ",
    firstWordType: "fi3l",
    jumlaType: "filiyyah",
    dutch: "De studente drinkt het water.",
    explanation: "De zin begint met تَشْرَبُ. Dat is een fiʿl. Daarom is dit een jumla fiʿliyyah.",
  },
  {
    id: "student-writes",
    sentence: "يَكْتُبُ الطَّالِبُ فِي الدَّفْتَرِ.",
    firstWord: "يَكْتُبُ",
    firstWordType: "fi3l",
    jumlaType: "filiyyah",
    dutch: "De student schrijft in het schrift.",
    explanation: "De zin begint met يَكْتُبُ. Dat is een fiʿl. Daarom is dit een jumla fiʿliyyah.",
  },
];
