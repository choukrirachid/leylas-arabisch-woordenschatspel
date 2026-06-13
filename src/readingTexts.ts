export type ReadingQuestionType =
  | "content"
  | "grammar";

export type ReadingQuestion = {
  id: string;
  type: ReadingQuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type ReadingText = {
  id: string;
  title: string;
  arabicTitle: string;
  paragraphs: string[];
  difficultWords?: {
    arabic: string;
    dutch: string;
  }[];
  contentQuestions: ReadingQuestion[];
  grammarQuestions: ReadingQuestion[];
};

export const readingTexts: ReadingText[] = [
  {
    "id": "text-1",
    "title": "Tekst 1 — In de klas",
    "arabicTitle": "فِي الْفَصْلِ",
    "paragraphs": [
      "هٰذَا فَصْلٌ كَبِيرٌ. فِي الْفَصْلِ طُلَّابٌ وَطَالِبَاتٌ. الْمُعَلِّمُ أَمَامَ السَّبُّورَةِ. الطَّالِبُ يَكْتُبُ فِي الدَّفْتَرِ.",
      "عَلَى الْمَكْتَبِ كِتَابٌ وَقَلَمٌ. الْقَلَمُ بِجَانِبِ الدَّفْتَرِ. حَقِيبَةُ الطَّالِبَةِ تَحْتَ الْكُرْسِيِّ. الْكُرْسِيُّ خَلْفَ الْمَكْتَبِ.",
      "فِي الْفَصْلِ ثَلَاثَةُ كُتُبٍ وَخَمْسَةُ أَقْلَامٍ. الْمُعَلِّمُ يَقْرَأُ كِتَابًا. هٰذَا فَصْلٌ نَظِيفٌ وَجَمِيلٌ."
    ],
    "difficultWords": [
      {
        "arabic": "طُلَّابٌ",
        "dutch": "leerlingen"
      },
      {
        "arabic": "طَالِبَاتٌ",
        "dutch": "studentes / meisjesleerlingen"
      },
      {
        "arabic": "نَظِيفٌ",
        "dutch": "proper / schoon"
      },
      {
        "arabic": "جَمِيلٌ",
        "dutch": "mooi"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-1-content-1",
        "type": "content",
        "question": "أَيْنَ الْمُعَلِّمُ؟",
        "options": [
          "أَمَامَ السَّبُّورَةِ",
          "تَحْتَ الْمَكْتَبِ",
          "خَلْفَ الْبَابِ",
          "فِي السَّيَّارَةِ"
        ],
        "correctAnswer": "أَمَامَ السَّبُّورَةِ",
        "explanation": "De tekst zegt: الْمُعَلِّمُ أَمَامَ السَّبُّورَةِ."
      },
      {
        "id": "text-1-content-2",
        "type": "content",
        "question": "مَاذَا عَلَى الْمَكْتَبِ؟",
        "options": [
          "كِتَابٌ وَقَلَمٌ",
          "كُرَةٌ وَدَرَّاجَةٌ",
          "خُبْزٌ وَتَمْرٌ",
          "مُصْحَفٌ وَمَاءٌ"
        ],
        "correctAnswer": "كِتَابٌ وَقَلَمٌ",
        "explanation": "Het antwoord staat in de tekst: كِتَابٌ وَقَلَمٌ."
      },
      {
        "id": "text-1-content-3",
        "type": "content",
        "question": "أَيْنَ حَقِيبَةُ الطَّالِبَةِ؟",
        "options": [
          "تَحْتَ الْكُرْسِيِّ",
          "فَوْقَ السَّبُّورَةِ",
          "فِي الْكُوبِ",
          "خَلْفَ الْبَابِ"
        ],
        "correctAnswer": "تَحْتَ الْكُرْسِيِّ",
        "explanation": "Het antwoord staat in de tekst: تَحْتَ الْكُرْسِيِّ."
      },
      {
        "id": "text-1-content-4",
        "type": "content",
        "question": "كَمْ كِتَابًا فِي الْفَصْلِ؟",
        "options": [
          "ثَلَاثَةُ كُتُبٍ",
          "كِتَابَانِ",
          "خَمْسَةُ أَقْلَامٍ",
          "كِتَابٌ وَاحِدٌ"
        ],
        "correctAnswer": "ثَلَاثَةُ كُتُبٍ",
        "explanation": "Het antwoord staat in de tekst: ثَلَاثَةُ كُتُبٍ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-1-grammar-1",
        "type": "grammar",
        "question": "مَا الظَّرْفُ فِي: حَقِيبَةُ الطَّالِبَةِ تَحْتَ الْكُرْسِيِّ؟",
        "options": [
          "حَقِيبَةُ",
          "الطَّالِبَةِ",
          "تَحْتَ",
          "الْكُرْسِيِّ"
        ],
        "correctAnswer": "تَحْتَ",
        "explanation": "Het juiste antwoord is تَحْتَ."
      },
      {
        "id": "text-1-grammar-2",
        "type": "grammar",
        "question": "مَا حَرْفُ الْجَرِّ فِي: فِي الْفَصْلِ؟",
        "options": [
          "فِي",
          "الْفَصْلِ",
          "هٰذَا",
          "كَبِيرٌ"
        ],
        "correctAnswer": "فِي",
        "explanation": "Het juiste antwoord is فِي."
      },
      {
        "id": "text-1-grammar-3",
        "type": "grammar",
        "question": "السَّبُّورَةِ: زonneletterwoord of maanletterwoord?",
        "options": [
          "زonneletterwoord",
          "maanletterwoord"
        ],
        "correctAnswer": "زonneletterwoord",
        "explanation": "Het juiste antwoord is زonneletterwoord."
      },
      {
        "id": "text-1-grammar-4",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: ثَلَاثَةُ كُتُبٍ؟",
        "options": [
          "drie boeken",
          "twee boeken",
          "één boek",
          "vijf pennen"
        ],
        "correctAnswer": "drie boeken",
        "explanation": "Het juiste antwoord is drie boeken."
      }
    ]
  },
  {
    "id": "text-2",
    "title": "Tekst 2 — In het huis",
    "arabicTitle": "فِي الْبَيْتِ",
    "paragraphs": [
      "هٰذَا بَيْتٌ كَبِيرٌ. فِي الْبَيْتِ بَابٌ وَنَافِذَةٌ. الْمَطْبَخُ بِجَانِبِ الْبَابِ. الثَّلَّاجَةُ فِي الْمَطْبَخِ.",
      "عَلَى الطَّاوِلَةِ كُوبُ الْمَاءِ وَطَبَقُ الطَّعَامِ. الْخُبْزُ بِجَانِبِ الطَّبَقِ. فِي الْكُوبِ مَاءٌ. الْمَاءُ بَارِدٌ.",
      "بَابُ الْبَيْتِ أَمَامَ الطَّرِيقِ. النَّافِذَةُ فَوْقَ الطَّاوِلَةِ. هٰذَا بَيْتٌ نَظِيفٌ."
    ],
    "difficultWords": [
      {
        "arabic": "بَارِدٌ",
        "dutch": "koud"
      },
      {
        "arabic": "الطَّرِيقِ",
        "dutch": "de weg"
      },
      {
        "arabic": "نَظِيفٌ",
        "dutch": "proper / schoon"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-2-content-1",
        "type": "content",
        "question": "أَيْنَ الثَّلَّاجَةُ؟",
        "options": [
          "فِي الْمَطْبَخِ",
          "فَوْقَ الْبَيْتِ",
          "خَلْفَ السَّيَّارَةِ",
          "تَحْتَ الطَّاوِلَةِ"
        ],
        "correctAnswer": "فِي الْمَطْبَخِ",
        "explanation": "Het antwoord staat in de tekst: فِي الْمَطْبَخِ."
      },
      {
        "id": "text-2-content-2",
        "type": "content",
        "question": "مَاذَا عَلَى الطَّاوِلَةِ؟",
        "options": [
          "كُوبُ الْمَاءِ وَطَبَقُ الطَّعَامِ",
          "قَلَمُ الْمُعَلِّمِ",
          "حَقِيبَةُ الطَّالِبَةِ",
          "مِفْتَاحُ السَّيَّارَةِ"
        ],
        "correctAnswer": "كُوبُ الْمَاءِ وَطَبَقُ الطَّعَامِ",
        "explanation": "Het antwoord staat in de tekst: كُوبُ الْمَاءِ وَطَبَقُ الطَّعَامِ."
      },
      {
        "id": "text-2-content-3",
        "type": "content",
        "question": "أَيْنَ الْمَطْبَخُ؟",
        "options": [
          "بِجَانِبِ الْبَابِ",
          "تَحْتَ الْكُرْسِيِّ",
          "فِي الْكُوبِ",
          "حَوْلَ الْمَسْجِدِ"
        ],
        "correctAnswer": "بِجَانِبِ الْبَابِ",
        "explanation": "Het antwoord staat in de tekst: بِجَانِبِ الْبَابِ."
      },
      {
        "id": "text-2-content-4",
        "type": "content",
        "question": "أَيْنَ بَابُ الْبَيْتِ؟",
        "options": [
          "أَمَامَ الطَّرِيقِ",
          "فَوْقَ الطَّاوِلَةِ",
          "فِي الْمَطْبَخِ",
          "خَلْفَ الثَّلَّاجَةِ"
        ],
        "correctAnswer": "أَمَامَ الطَّرِيقِ",
        "explanation": "Het antwoord staat in de tekst: أَمَامَ الطَّرِيقِ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-2-grammar-1",
        "type": "grammar",
        "question": "مَا الْمُضَافُ فِي: كُوبُ الْمَاءِ؟",
        "options": [
          "كُوبُ",
          "الْمَاءِ",
          "الطَّاوِلَةِ",
          "فِي"
        ],
        "correctAnswer": "كُوبُ",
        "explanation": "Het juiste antwoord is كُوبُ."
      },
      {
        "id": "text-2-grammar-2",
        "type": "grammar",
        "question": "مَا الْمُضَافُ إِلَيْهِ فِي: بَابُ الْبَيْتِ؟",
        "options": [
          "بَابُ",
          "الْبَيْتِ",
          "أَمَامَ",
          "الطَّرِيقِ"
        ],
        "correctAnswer": "الْبَيْتِ",
        "explanation": "Het juiste antwoord is الْبَيْتِ."
      },
      {
        "id": "text-2-grammar-3",
        "type": "grammar",
        "question": "مَا حَرْفُ الْجَرِّ فِي: فِي الْمَطْبَخِ؟",
        "options": [
          "فِي",
          "الْمَطْبَخِ",
          "الثَّلَّاجَةُ",
          "بَابٌ"
        ],
        "correctAnswer": "فِي",
        "explanation": "Het juiste antwoord is فِي."
      },
      {
        "id": "text-2-grammar-4",
        "type": "grammar",
        "question": "الثَّلَّاجَةُ: zonneletterwoord of maanletterwoord?",
        "options": [
          "زonneletterwoord",
          "maanletterwoord"
        ],
        "correctAnswer": "زonneletterwoord",
        "explanation": "Het juiste antwoord is زonneletterwoord."
      }
    ]
  },
  {
    "id": "text-3",
    "title": "Tekst 3 — In de moskee",
    "arabicTitle": "فِي الْمَسْجِدِ",
    "paragraphs": [
      "هٰذَا مَسْجِدٌ جَمِيلٌ. فِي الْمَسْجِدِ مُصْحَفٌ وَكِتَابٌ. الطُّلَّابُ فِي الْمَسْجِدِ. الْمُعَلِّمُ بِجَانِبِ الطُّلَّابِ.",
      "الْمُصْحَفُ فَوْقَ الْكُرْسِيِّ. الْكِتَابُ عَلَى الْمَكْتَبِ. الطَّالِبُ أَمَامَ الْمُعَلِّمِ. الطَّالِبَةُ خَلْفَ الطَّالِبِ.",
      "بَابُ الْمَسْجِدِ كَبِيرٌ. نَافِذَةُ الْمَسْجِدِ فَوْقَ الْبَابِ. فِي الْمَسْجِدِ ثَلَاثَةُ مَصَاحِفَ."
    ],
    "difficultWords": [
      {
        "arabic": "كَبِيرٌ",
        "dutch": "groot"
      },
      {
        "arabic": "مَصَاحِفَ",
        "dutch": "mushafs"
      },
      {
        "arabic": "الطُّلَّابُ",
        "dutch": "de leerlingen"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-3-content-1",
        "type": "content",
        "question": "أَيْنَ الْمُصْحَفُ؟",
        "options": [
          "فَوْقَ الْكُرْسِيِّ",
          "تَحْتَ الْبَابِ",
          "خَلْفَ الْبَيْتِ",
          "حَوْلَ الطَّاوِلَةِ"
        ],
        "correctAnswer": "فَوْقَ الْكُرْسِيِّ",
        "explanation": "Het antwoord staat in de tekst: فَوْقَ الْكُرْسِيِّ."
      },
      {
        "id": "text-3-content-2",
        "type": "content",
        "question": "أَيْنَ الطَّالِبُ؟",
        "options": [
          "أَمَامَ الْمُعَلِّمِ",
          "بِجَانِبِ الثَّلَّاجَةِ",
          "فِي السَّيَّارَةِ",
          "تَحْتَ الْمَكْتَبِ"
        ],
        "correctAnswer": "أَمَامَ الْمُعَلِّمِ",
        "explanation": "Het antwoord staat in de tekst: أَمَامَ الْمُعَلِّمِ."
      },
      {
        "id": "text-3-content-3",
        "type": "content",
        "question": "مَاذَا فَوْقَ الْبَابِ؟",
        "options": [
          "نَافِذَةُ الْمَسْجِدِ",
          "كُوبُ الْمَاءِ",
          "قَلَمُ الْمُعَلِّمِ",
          "حَقِيبَةُ الطَّالِبَةِ"
        ],
        "correctAnswer": "نَافِذَةُ الْمَسْجِدِ",
        "explanation": "Het antwoord staat in de tekst: نَافِذَةُ الْمَسْجِدِ."
      },
      {
        "id": "text-3-content-4",
        "type": "content",
        "question": "كَمْ مُصْحَفًا فِي الْمَسْجِدِ؟",
        "options": [
          "ثَلَاثَةُ مَصَاحِفَ",
          "مُصْحَفٌ وَاحِدٌ",
          "مُصْحَفَانِ",
          "خَمْسَةُ أَقْلَامٍ"
        ],
        "correctAnswer": "ثَلَاثَةُ مَصَاحِفَ",
        "explanation": "Het antwoord staat in de tekst: ثَلَاثَةُ مَصَاحِفَ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-3-grammar-1",
        "type": "grammar",
        "question": "مَسْجِدٌ: نَكِرَة of مَعْرِفَة?",
        "options": [
          "نَكِرَة",
          "مَعْرِفَة"
        ],
        "correctAnswer": "نَكِرَة",
        "explanation": "Het juiste antwoord is نَكِرَة."
      },
      {
        "id": "text-3-grammar-2",
        "type": "grammar",
        "question": "مَا الْمُضَافُ إِلَيْهِ فِي: بَابُ الْمَسْجِدِ؟",
        "options": [
          "بَابُ",
          "الْمَسْجِدِ",
          "كَبِيرٌ",
          "مُصْحَفٌ"
        ],
        "correctAnswer": "الْمَسْجِدِ",
        "explanation": "Het juiste antwoord is الْمَسْجِدِ."
      },
      {
        "id": "text-3-grammar-3",
        "type": "grammar",
        "question": "مَا الظَّرْفُ فِي: الطَّالِبَةُ خَلْفَ الطَّالِبِ؟",
        "options": [
          "الطَّالِبَةُ",
          "خَلْفَ",
          "الطَّالِبِ",
          "الْمُعَلِّمِ"
        ],
        "correctAnswer": "خَلْفَ",
        "explanation": "Het juiste antwoord is خَلْفَ."
      },
      {
        "id": "text-3-grammar-4",
        "type": "grammar",
        "question": "الْمَسْجِدِ: zonneletterwoord of maanletterwoord?",
        "options": [
          "زonneletterwoord",
          "maanletterwoord"
        ],
        "correctAnswer": "maanletterwoord",
        "explanation": "Het juiste antwoord is maanletterwoord."
      }
    ]
  },
  {
    "id": "text-4",
    "title": "Tekst 4 — Eten en drinken",
    "arabicTitle": "الطَّعَامُ وَالشَّرَابُ",
    "paragraphs": [
      "عَلَى الطَّاوِلَةِ خُبْزٌ وَتَمْرٌ وَحَلِيبٌ. فِي الْكُوبِ مَاءٌ. الْمَاءُ بَارِدٌ وَالْحَلِيبُ لَذِيذٌ. هٰذَا خُبْزٌ وَهٰذَا تَمْرٌ.",
      "طَبَقُ الطَّعَامِ بِجَانِبِ الْخُبْزِ. كُوبُ الْمَاءِ أَمَامَ الطَّبَقِ. هٰذِهِ تُفَّاحَةٌ وَهٰذِهِ بُرْتُقَالَةٌ. الْمَوْزُ فَوْقَ الطَّبَقِ.",
      "عَلَى الطَّاوِلَةِ ثَلَاثُ تُفَّاحَاتٍ وَخَمْسُ بُرْتُقَالَاتٍ. الطَّعَامُ لَذِيذٌ. الشَّرَابُ بِجَانِبِ الطَّعَامِ."
    ],
    "difficultWords": [
      {
        "arabic": "الطَّعَامُ",
        "dutch": "het eten"
      },
      {
        "arabic": "الشَّرَابُ",
        "dutch": "het drinken"
      },
      {
        "arabic": "بَارِدٌ",
        "dutch": "koud"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-4-content-1",
        "type": "content",
        "question": "أَيْنَ الْمَاءُ؟",
        "options": [
          "فِي الْكُوبِ",
          "فَوْقَ الْبَابِ",
          "خَلْفَ الْمَسْجِدِ",
          "تَحْتَ الْكُرْسِيِّ"
        ],
        "correctAnswer": "فِي الْكُوبِ",
        "explanation": "Het antwoord staat in de tekst: فِي الْكُوبِ."
      },
      {
        "id": "text-4-content-2",
        "type": "content",
        "question": "مَاذَا بِجَانِبِ الْخُبْزِ؟",
        "options": [
          "طَبَقُ الطَّعَامِ",
          "مِفْتَاحُ السَّيَّارَةِ",
          "بَابُ الْبَيْتِ",
          "الْمُصْحَفُ"
        ],
        "correctAnswer": "طَبَقُ الطَّعَامِ",
        "explanation": "Het antwoord staat in de tekst: طَبَقُ الطَّعَامِ."
      },
      {
        "id": "text-4-content-3",
        "type": "content",
        "question": "أَيْنَ كُوبُ الْمَاءِ؟",
        "options": [
          "أَمَامَ الطَّبَقِ",
          "خَلْفَ الْبَيْتِ",
          "تَحْتَ الْكُرْسِيِّ",
          "فِي الْمَسْجِدِ"
        ],
        "correctAnswer": "أَمَامَ الطَّبَقِ",
        "explanation": "Het antwoord staat in de tekst: أَمَامَ الطَّبَقِ."
      },
      {
        "id": "text-4-content-4",
        "type": "content",
        "question": "كَمْ تُفَّاحَةً عَلَى الطَّاوِلَةِ؟",
        "options": [
          "ثَلَاثُ تُفَّاحَاتٍ",
          "خَمْسُ بُرْتُقَالَاتٍ",
          "تُفَّاحَةٌ وَاحِدَةٌ",
          "تُفَّاحَتَانِ"
        ],
        "correctAnswer": "ثَلَاثُ تُفَّاحَاتٍ",
        "explanation": "Het antwoord staat in de tekst: ثَلَاثُ تُفَّاحَاتٍ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-4-grammar-1",
        "type": "grammar",
        "question": "اخْتَرْ اِسْمَ الْإِشَارَةِ الصَّحِيحَ لِـ تُفَّاحَةٌ.",
        "options": [
          "هٰذَا",
          "هٰذِهِ"
        ],
        "correctAnswer": "هٰذِهِ",
        "explanation": "Het juiste antwoord is هٰذِهِ."
      },
      {
        "id": "text-4-grammar-2",
        "type": "grammar",
        "question": "مَا حَرْفُ الْجَرِّ فِي: فِي الْكُوبِ؟",
        "options": [
          "فِي",
          "الْكُوبِ",
          "الْمَاءُ",
          "طَبَقُ"
        ],
        "correctAnswer": "فِي",
        "explanation": "Het juiste antwoord is فِي."
      },
      {
        "id": "text-4-grammar-3",
        "type": "grammar",
        "question": "مَا الْمُضَافُ فِي: طَبَقُ الطَّعَامِ؟",
        "options": [
          "طَبَقُ",
          "الطَّعَامِ",
          "بِجَانِبِ",
          "الْخُبْزِ"
        ],
        "correctAnswer": "طَبَقُ",
        "explanation": "Het juiste antwoord is طَبَقُ."
      },
      {
        "id": "text-4-grammar-4",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: خَمْسُ بُرْتُقَالَاتٍ؟",
        "options": [
          "vijf appelsienen",
          "drie appels",
          "twee bananen",
          "één peer"
        ],
        "correctAnswer": "vijf appelsienen",
        "explanation": "Het juiste antwoord is vijf appelsienen."
      }
    ]
  },
  {
    "id": "text-5",
    "title": "Tekst 5 — In de tuin",
    "arabicTitle": "فِي الْحَدِيقَةِ",
    "paragraphs": [
      "هٰذِهِ حَدِيقَةٌ جَمِيلَةٌ. فِي الْحَدِيقَةِ شَجَرَةٌ وَوَرْدَةٌ. الْوَرْدَةُ بِجَانِبِ الشَّجَرَةِ. الطَّائِرَةُ فَوْقَ الْحَدِيقَةِ.",
      "الْكُرَةُ تَحْتَ الشَّجَرَةِ. الدَّرَّاجَةُ بِجَانِبِ الْبَابِ. بَابُ الْحَدِيقَةِ خَلْفَ الْبَيْتِ. هٰذَا بَيْتٌ وَهٰذِهِ حَدِيقَةٌ.",
      "فِي الْحَدِيقَةِ ثَلَاثُ وَرْدَاتٍ وَشَجَرَتَانِ. الْبِنْتُ تَلْعَبُ بِالْكُرَةِ. الْحَدِيقَةُ نَظِيفَةٌ."
    ],
    "difficultWords": [
      {
        "arabic": "جَمِيلَةٌ",
        "dutch": "mooi vrouwelijk"
      },
      {
        "arabic": "الْبِنْتُ",
        "dutch": "het meisje"
      },
      {
        "arabic": "تَلْعَبُ",
        "dutch": "zij speelt"
      },
      {
        "arabic": "نَظِيفَةٌ",
        "dutch": "proper / schoon vrouwelijk"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-5-content-1",
        "type": "content",
        "question": "أَيْنَ الْكُرَةُ؟",
        "options": [
          "تَحْتَ الشَّجَرَةِ",
          "فِي الْكُوبِ",
          "أَمَامَ السَّبُّورَةِ",
          "خَلْفَ الْمَسْجِدِ"
        ],
        "correctAnswer": "تَحْتَ الشَّجَرَةِ",
        "explanation": "Het antwoord staat in de tekst: تَحْتَ الشَّجَرَةِ."
      },
      {
        "id": "text-5-content-2",
        "type": "content",
        "question": "أَيْنَ الدَّرَّاجَةُ؟",
        "options": [
          "بِجَانِبِ الْبَابِ",
          "فِي الْمَطْبَخِ",
          "عَلَى الطَّاوِلَةِ",
          "حَوْلَ السَّيَّارَةِ"
        ],
        "correctAnswer": "بِجَانِبِ الْبَابِ",
        "explanation": "Het antwoord staat in de tekst: بِجَانِبِ الْبَابِ."
      },
      {
        "id": "text-5-content-3",
        "type": "content",
        "question": "مَاذَا فِي الْحَدِيقَةِ؟",
        "options": [
          "شَجَرَةٌ وَوَرْدَةٌ",
          "كِتَابٌ وَقَلَمٌ",
          "خُبْزٌ وَحَلِيبٌ",
          "سَيَّارَةٌ وَمُصْحَفٌ"
        ],
        "correctAnswer": "شَجَرَةٌ وَوَرْدَةٌ",
        "explanation": "Het antwoord staat in de tekst: شَجَرَةٌ وَوَرْدَةٌ."
      },
      {
        "id": "text-5-content-4",
        "type": "content",
        "question": "كَمْ وَرْدَةً فِي الْحَدِيقَةِ؟",
        "options": [
          "ثَلَاثُ وَرْدَاتٍ",
          "وَرْدَتَانِ",
          "وَرْدَةٌ وَاحِدَةٌ",
          "خَمْسُ وَرْدَاتٍ"
        ],
        "correctAnswer": "ثَلَاثُ وَرْدَاتٍ",
        "explanation": "Het antwoord staat in de tekst: ثَلَاثُ وَرْدَاتٍ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-5-grammar-1",
        "type": "grammar",
        "question": "الدَّرَّاجَةُ: zonneletterwoord of maanletterwoord?",
        "options": [
          "زonneletterwoord",
          "maanletterwoord"
        ],
        "correctAnswer": "زonneletterwoord",
        "explanation": "Het juiste antwoord is زonneletterwoord."
      },
      {
        "id": "text-5-grammar-2",
        "type": "grammar",
        "question": "وَرْدَةٌ: مُذَكَّر of مُؤَنَّث?",
        "options": [
          "مُذَكَّر",
          "مُؤَنَّث"
        ],
        "correctAnswer": "مُؤَنَّث",
        "explanation": "Het juiste antwoord is مُؤَنَّث."
      },
      {
        "id": "text-5-grammar-3",
        "type": "grammar",
        "question": "مَا الظَّرْفُ فِي: الْكُرَةُ تَحْتَ الشَّجَرَةِ؟",
        "options": [
          "الْكُرَةُ",
          "تَحْتَ",
          "الشَّجَرَةِ",
          "فِي"
        ],
        "correctAnswer": "تَحْتَ",
        "explanation": "Het juiste antwoord is تَحْتَ."
      },
      {
        "id": "text-5-grammar-4",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: شَجَرَتَانِ؟",
        "options": [
          "twee bomen",
          "drie bomen",
          "één boom",
          "de boom"
        ],
        "correctAnswer": "twee bomen",
        "explanation": "Het juiste antwoord is twee bomen."
      }
    ]
  },
  {
    "id": "text-6",
    "title": "Tekst 6 — De boekentas van de studente",
    "arabicTitle": "حَقِيبَةُ الطَّالِبَةِ",
    "paragraphs": [
      "هٰذِهِ طَالِبَةٌ مُجْتَهِدَةٌ. حَقِيبَةُ الطَّالِبَةِ فَوْقَ الْكُرْسِيِّ. فِي الْحَقِيبَةِ كِتَابٌ وَدَفْتَرٌ وَقَلَمٌ. الْقَلَمُ أَزْرَقُ.",
      "كِتَابُ الطَّالِبَةِ عَلَى الْمَكْتَبِ. دَفْتَرُ الطَّالِبَةِ بِجَانِبِ الْكِتَابِ. الْمُعَلِّمَةُ أَمَامَ السَّبُّورَةِ. الطَّالِبَةُ تَكْتُبُ فِي الدَّفْتَرِ.",
      "فِي الْفَصْلِ طَالِبَتَانِ وَمُعَلِّمَةٌ. عَلَى الْمَكْتَبِ قَلَمَانِ وَكِتَابَانِ. هٰذِهِ حَقِيبَةٌ جَدِيدَةٌ."
    ],
    "difficultWords": [
      {
        "arabic": "مُجْتَهِدَةٌ",
        "dutch": "ijverig vrouwelijk"
      },
      {
        "arabic": "أَزْرَقُ",
        "dutch": "blauw"
      },
      {
        "arabic": "جَدِيدَةٌ",
        "dutch": "nieuw vrouwelijk"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-6-content-1",
        "type": "content",
        "question": "أَيْنَ حَقِيبَةُ الطَّالِبَةِ؟",
        "options": [
          "فَوْقَ الْكُرْسِيِّ",
          "تَحْتَ الْبَيْتِ",
          "خَلْفَ الْمَسْجِدِ",
          "فِي الْكُوبِ"
        ],
        "correctAnswer": "فَوْقَ الْكُرْسِيِّ",
        "explanation": "Het antwoord staat in de tekst: فَوْقَ الْكُرْسِيِّ."
      },
      {
        "id": "text-6-content-2",
        "type": "content",
        "question": "مَاذَا فِي الْحَقِيبَةِ؟",
        "options": [
          "كِتَابٌ وَدَفْتَرٌ وَقَلَمٌ",
          "خُبْزٌ وَتَمْرٌ وَحَلِيبٌ",
          "سَيَّارَةٌ وَدَرَّاجَةٌ",
          "شَجَرَةٌ وَوَرْدَةٌ"
        ],
        "correctAnswer": "كِتَابٌ وَدَفْتَرٌ وَقَلَمٌ",
        "explanation": "Het antwoord staat in de tekst: كِتَابٌ وَدَفْتَرٌ وَقَلَمٌ."
      },
      {
        "id": "text-6-content-3",
        "type": "content",
        "question": "أَيْنَ الْمُعَلِّمَةُ؟",
        "options": [
          "أَمَامَ السَّبُّورَةِ",
          "خَلْفَ الْبَيْتِ",
          "فِي الْكُوبِ",
          "تَحْتَ الشَّجَرَةِ"
        ],
        "correctAnswer": "أَمَامَ السَّبُّورَةِ",
        "explanation": "Het antwoord staat in de tekst: أَمَامَ السَّبُّورَةِ."
      },
      {
        "id": "text-6-content-4",
        "type": "content",
        "question": "كَمْ قَلَمًا عَلَى الْمَكْتَبِ؟",
        "options": [
          "قَلَمَانِ",
          "قَلَمٌ وَاحِدٌ",
          "ثَلَاثَةُ أَقْلَامٍ",
          "خَمْسَةُ أَقْلَامٍ"
        ],
        "correctAnswer": "قَلَمَانِ",
        "explanation": "Het antwoord staat in de tekst: قَلَمَانِ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-6-grammar-1",
        "type": "grammar",
        "question": "مَا الْمُضَافُ فِي: حَقِيبَةُ الطَّالِبَةِ؟",
        "options": [
          "حَقِيبَةُ",
          "الطَّالِبَةِ",
          "فَوْقَ",
          "الْكُرْسِيِّ"
        ],
        "correctAnswer": "حَقِيبَةُ",
        "explanation": "Het juiste antwoord is حَقِيبَةُ."
      },
      {
        "id": "text-6-grammar-2",
        "type": "grammar",
        "question": "مَا الْمُضَافُ إِلَيْهِ فِي: كِتَابُ الطَّالِبَةِ؟",
        "options": [
          "كِتَابُ",
          "الطَّالِبَةِ",
          "عَلَى",
          "الْمَكْتَبِ"
        ],
        "correctAnswer": "الطَّالِبَةِ",
        "explanation": "Het juiste antwoord is الطَّالِبَةِ."
      },
      {
        "id": "text-6-grammar-3",
        "type": "grammar",
        "question": "هٰذِهِ طَالِبَةٌ: waarom هٰذِهِ?",
        "options": [
          "Omdat طَالِبَةٌ vrouwelijk is",
          "Omdat طَالِبَةٌ mannelijk is",
          "Omdat het meervoud is",
          "Omdat het een werkwoord is"
        ],
        "correctAnswer": "Omdat طَالِبَةٌ vrouwelijk is",
        "explanation": "Het juiste antwoord is Omdat طَالِبَةٌ vrouwelijk is."
      },
      {
        "id": "text-6-grammar-4",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: كِتَابَانِ؟",
        "options": [
          "twee boeken",
          "één boek",
          "drie boeken",
          "de boeken"
        ],
        "correctAnswer": "twee boeken",
        "explanation": "Het juiste antwoord is twee boeken."
      }
    ]
  },
  {
    "id": "text-7",
    "title": "Tekst 7 — Op de tafel",
    "arabicTitle": "عَلَى الطَّاوِلَةِ",
    "paragraphs": [
      "عَلَى الطَّاوِلَةِ كِتَابَانِ وَقَلَمَانِ. بِجَانِبِ الْكِتَابَيْنِ دَفْتَرٌ. تَحْتَ الطَّاوِلَةِ كُرَةٌ. الْكُرْسِيُّ بِجَانِبِ الطَّاوِلَةِ.",
      "فِي الْكُوبِ مَاءٌ. كُوبُ الْمَاءِ أَمَامَ الْكِتَابِ. طَبَقُ الطَّعَامِ خَلْفَ الْكُوبِ. عَلَى الطَّبَقِ خُبْزٌ وَتَمْرٌ.",
      "الطَّاوِلَةُ فِي الْبَيْتِ. النَّافِذَةُ فَوْقَ الطَّاوِلَةِ. هٰذِهِ طَاوِلَةٌ كَبِيرَةٌ."
    ],
    "difficultWords": [
      {
        "arabic": "الْكِتَابَيْنِ",
        "dutch": "de twee boeken in jarr-vorm"
      },
      {
        "arabic": "كَبِيرَةٌ",
        "dutch": "groot vrouwelijk"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-7-content-1",
        "type": "content",
        "question": "مَاذَا عَلَى الطَّاوِلَةِ؟",
        "options": [
          "كِتَابَانِ وَقَلَمَانِ",
          "كُرَةٌ وَدَرَّاجَةٌ",
          "خُبْزٌ وَتَمْرٌ",
          "مُصْحَفٌ وَمَسْجِدٌ"
        ],
        "correctAnswer": "كِتَابَانِ وَقَلَمَانِ",
        "explanation": "Het antwoord staat in de tekst: كِتَابَانِ وَقَلَمَانِ."
      },
      {
        "id": "text-7-content-2",
        "type": "content",
        "question": "أَيْنَ الْكُرَةُ؟",
        "options": [
          "تَحْتَ الطَّاوِلَةِ",
          "فَوْقَ الْبَيْتِ",
          "فِي السَّيَّارَةِ",
          "أَمَامَ الْمُعَلِّمِ"
        ],
        "correctAnswer": "تَحْتَ الطَّاوِلَةِ",
        "explanation": "Het antwoord staat in de tekst: تَحْتَ الطَّاوِلَةِ."
      },
      {
        "id": "text-7-content-3",
        "type": "content",
        "question": "أَيْنَ كُوبُ الْمَاءِ؟",
        "options": [
          "أَمَامَ الْكِتَابِ",
          "خَلْفَ الْبَيْتِ",
          "فَوْقَ الْمَسْجِدِ",
          "تَحْتَ السَّبُّورَةِ"
        ],
        "correctAnswer": "أَمَامَ الْكِتَابِ",
        "explanation": "Het antwoord staat in de tekst: أَمَامَ الْكِتَابِ."
      },
      {
        "id": "text-7-content-4",
        "type": "content",
        "question": "مَاذَا عَلَى الطَّبَقِ؟",
        "options": [
          "خُبْزٌ وَتَمْرٌ",
          "كِتَابَانِ وَقَلَمَانِ",
          "سَيَّارَةٌ وَدَرَّاجَةٌ",
          "وَرْدَةٌ وَشَجَرَةٌ"
        ],
        "correctAnswer": "خُبْزٌ وَتَمْرٌ",
        "explanation": "Het antwoord staat in de tekst: خُبْزٌ وَتَمْرٌ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-7-grammar-1",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: كِتَابَانِ؟",
        "options": [
          "één boek",
          "twee boeken",
          "boeken",
          "de boeken"
        ],
        "correctAnswer": "twee boeken",
        "explanation": "Het juiste antwoord is twee boeken."
      },
      {
        "id": "text-7-grammar-2",
        "type": "grammar",
        "question": "مَا الظَّرْفُ فِي: تَحْتَ الطَّاوِلَةِ؟",
        "options": [
          "تَحْتَ",
          "الطَّاوِلَةِ",
          "كُرَةٌ",
          "مَاءٌ"
        ],
        "correctAnswer": "تَحْتَ",
        "explanation": "Het juiste antwoord is تَحْتَ."
      },
      {
        "id": "text-7-grammar-3",
        "type": "grammar",
        "question": "مَا الْمُضَافُ فِي: كُوبُ الْمَاءِ؟",
        "options": [
          "كُوبُ",
          "الْمَاءِ",
          "أَمَامَ",
          "الْكِتَابِ"
        ],
        "correctAnswer": "كُوبُ",
        "explanation": "Het juiste antwoord is كُوبُ."
      },
      {
        "id": "text-7-grammar-4",
        "type": "grammar",
        "question": "طَاوِلَةٌ: مُذَكَّر of مُؤَنَّث?",
        "options": [
          "مُذَكَّر",
          "مُؤَنَّث"
        ],
        "correctAnswer": "مُؤَنَّث",
        "explanation": "Het juiste antwoord is مُؤَنَّث."
      }
    ]
  },
  {
    "id": "text-8",
    "title": "Tekst 8 — De auto en de fiets",
    "arabicTitle": "السَّيَّارَةُ وَالدَّرَّاجَةُ",
    "paragraphs": [
      "السَّيَّارَةُ أَمَامَ الْبَيْتِ. الدَّرَّاجَةُ خَلْفَ السَّيَّارَةِ. مِفْتَاحُ السَّيَّارَةِ فَوْقَ الْمَكْتَبِ. هٰذِهِ سَيَّارَةٌ وَهٰذِهِ دَرَّاجَةٌ.",
      "بِجَانِبِ الْبَيْتِ طَرِيقٌ. عَلَى الطَّرِيقِ سَيَّارَتَانِ. خَلْفَ الْبَيْتِ حَدِيقَةٌ. فِي الْحَدِيقَةِ دَرَّاجَةٌ وَكُرَةٌ.",
      "السَّيَّارَةُ جَدِيدَةٌ. الدَّرَّاجَةُ صَغِيرَةٌ. مِفْتَاحُ السَّيَّارَةِ أَزْرَقُ."
    ],
    "difficultWords": [
      {
        "arabic": "مِفْتَاحُ",
        "dutch": "sleutel"
      },
      {
        "arabic": "جَدِيدَةٌ",
        "dutch": "nieuw vrouwelijk"
      },
      {
        "arabic": "صَغِيرَةٌ",
        "dutch": "klein vrouwelijk"
      },
      {
        "arabic": "سَيَّارَتَانِ",
        "dutch": "twee auto’s"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-8-content-1",
        "type": "content",
        "question": "أَيْنَ السَّيَّارَةُ؟",
        "options": [
          "أَمَامَ الْبَيْتِ",
          "تَحْتَ الْكُرْسِيِّ",
          "فِي الْكُوبِ",
          "حَوْلَ الْقَلَمِ"
        ],
        "correctAnswer": "أَمَامَ الْبَيْتِ",
        "explanation": "Het antwoord staat in de tekst: أَمَامَ الْبَيْتِ."
      },
      {
        "id": "text-8-content-2",
        "type": "content",
        "question": "أَيْنَ مِفْتَاحُ السَّيَّارَةِ؟",
        "options": [
          "فَوْقَ الْمَكْتَبِ",
          "خَلْفَ الْبَيْتِ",
          "بِجَانِبِ الْمَسْجِدِ",
          "تَحْتَ الطَّاوِلَةِ"
        ],
        "correctAnswer": "فَوْقَ الْمَكْتَبِ",
        "explanation": "Het antwoord staat in de tekst: فَوْقَ الْمَكْتَبِ."
      },
      {
        "id": "text-8-content-3",
        "type": "content",
        "question": "مَاذَا خَلْفَ الْبَيْتِ؟",
        "options": [
          "حَدِيقَةٌ",
          "مَسْجِدٌ",
          "مُصْحَفٌ",
          "ثَلَّاجَةٌ"
        ],
        "correctAnswer": "حَدِيقَةٌ",
        "explanation": "Het antwoord staat in de tekst: حَدِيقَةٌ."
      },
      {
        "id": "text-8-content-4",
        "type": "content",
        "question": "كَمْ سَيَّارَةً عَلَى الطَّرِيقِ؟",
        "options": [
          "سَيَّارَتَانِ",
          "سَيَّارَةٌ وَاحِدَةٌ",
          "ثَلَاثُ سَيَّارَاتٍ",
          "خَمْسُ سَيَّارَاتٍ"
        ],
        "correctAnswer": "سَيَّارَتَانِ",
        "explanation": "Het antwoord staat in de tekst: سَيَّارَتَانِ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-8-grammar-1",
        "type": "grammar",
        "question": "مَا الْمُضَافُ إِلَيْهِ فِي: مِفْتَاحُ السَّيَّارَةِ؟",
        "options": [
          "مِفْتَاحُ",
          "السَّيَّارَةِ",
          "فَوْقَ",
          "الْمَكْتَبِ"
        ],
        "correctAnswer": "السَّيَّارَةِ",
        "explanation": "Het juiste antwoord is السَّيَّارَةِ."
      },
      {
        "id": "text-8-grammar-2",
        "type": "grammar",
        "question": "السَّيَّارَةُ: zonneletterwoord of maanletterwoord?",
        "options": [
          "زonneletterwoord",
          "maanletterwoord"
        ],
        "correctAnswer": "زonneletterwoord",
        "explanation": "Het juiste antwoord is زonneletterwoord."
      },
      {
        "id": "text-8-grammar-3",
        "type": "grammar",
        "question": "هٰذِهِ سَيَّارَةٌ: waarom هٰذِهِ?",
        "options": [
          "Omdat سَيَّارَةٌ vrouwelijk is",
          "Omdat سَيَّارَةٌ mannelijk is",
          "Omdat het een werkwoord is",
          "Omdat het dualis is"
        ],
        "correctAnswer": "Omdat سَيَّارَةٌ vrouwelijk is",
        "explanation": "Het juiste antwoord is Omdat سَيَّارَةٌ vrouwelijk is."
      },
      {
        "id": "text-8-grammar-4",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: سَيَّارَتَانِ؟",
        "options": [
          "twee auto’s",
          "één auto",
          "drie auto’s",
          "de auto"
        ],
        "correctAnswer": "twee auto’s",
        "explanation": "Het juiste antwoord is twee auto’s."
      }
    ]
  },
  {
    "id": "text-9",
    "title": "Tekst 9 — De leraar en de leerlingen",
    "arabicTitle": "الْمُعَلِّمُ وَالطُّلَّابُ",
    "paragraphs": [
      "الْمُعَلِّمُ فِي الْفَصْلِ. أَمَامَ الْمُعَلِّمِ ثَلَاثَةُ كُتُبٍ وَخَمْسَةُ أَقْلَامٍ. السَّبُّورَةُ خَلْفَ الْمُعَلِّمِ. قَلَمُ الْمُعَلِّمِ عَلَى الْمَكْتَبِ.",
      "الطُّلَّابُ يَكْتُبُونَ فِي الدَّفَاتِرِ. الطَّالِبَةُ تَقْرَأُ كِتَابًا. الطَّالِبُ يَكْتُبُ بِالْقَلَمِ. فِي الْفَصْلِ طَالِبَانِ وَطَالِبَتَانِ.",
      "حَقِيبَةُ الطَّالِبِ تَحْتَ الْكُرْسِيِّ. حَقِيبَةُ الطَّالِبَةِ بِجَانِبِ الْمَكْتَبِ. هٰذَا فَصْلٌ جَمِيلٌ."
    ],
    "difficultWords": [
      {
        "arabic": "الطُّلَّابُ",
        "dutch": "de leerlingen"
      },
      {
        "arabic": "يَكْتُبُونَ",
        "dutch": "zij schrijven"
      },
      {
        "arabic": "تَقْرَأُ",
        "dutch": "zij leest"
      },
      {
        "arabic": "الدَّفَاتِرِ",
        "dutch": "de schriften"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-9-content-1",
        "type": "content",
        "question": "أَيْنَ الْمُعَلِّمُ؟",
        "options": [
          "فِي الْفَصْلِ",
          "فِي الْمَطْبَخِ",
          "خَلْفَ السَّيَّارَةِ",
          "تَحْتَ الْكُرْسِيِّ"
        ],
        "correctAnswer": "فِي الْفَصْلِ",
        "explanation": "Het antwoord staat in de tekst: فِي الْفَصْلِ."
      },
      {
        "id": "text-9-content-2",
        "type": "content",
        "question": "مَاذَا خَلْفَ الْمُعَلِّمِ؟",
        "options": [
          "السَّبُّورَةُ",
          "الثَّلَّاجَةُ",
          "الطَّائِرَةُ",
          "الْبَابُ"
        ],
        "correctAnswer": "السَّبُّورَةُ",
        "explanation": "Het antwoord staat in de tekst: السَّبُّورَةُ."
      },
      {
        "id": "text-9-content-3",
        "type": "content",
        "question": "مَاذَا يَفْعَلُ الطُّلَّابُ؟",
        "options": [
          "يَكْتُبُونَ فِي الدَّفَاتِرِ",
          "يَأْكُلُونَ الْخُبْزَ",
          "يَشْرَبُونَ الْمَاءَ",
          "يَلْعَبُونَ بِالْكُرَةِ"
        ],
        "correctAnswer": "يَكْتُبُونَ فِي الدَّفَاتِرِ",
        "explanation": "Het antwoord staat in de tekst: يَكْتُبُونَ فِي الدَّفَاتِرِ."
      },
      {
        "id": "text-9-content-4",
        "type": "content",
        "question": "أَيْنَ حَقِيبَةُ الطَّالِبَةِ؟",
        "options": [
          "بِجَانِبِ الْمَكْتَبِ",
          "تَحْتَ الْكُرْسِيِّ",
          "خَلْفَ الْبَيْتِ",
          "فِي الْكُوبِ"
        ],
        "correctAnswer": "بِجَانِبِ الْمَكْتَبِ",
        "explanation": "Het antwoord staat in de tekst: بِجَانِبِ الْمَكْتَبِ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-9-grammar-1",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: ثَلَاثَةُ كُتُبٍ؟",
        "options": [
          "drie boeken",
          "twee boeken",
          "één boek",
          "de boeken"
        ],
        "correctAnswer": "drie boeken",
        "explanation": "Het juiste antwoord is drie boeken."
      },
      {
        "id": "text-9-grammar-2",
        "type": "grammar",
        "question": "مَا الْجَمْعُ فِي: خَمْسَةُ أَقْلَامٍ؟",
        "options": [
          "خَمْسَةُ",
          "أَقْلَامٍ",
          "الْمُعَلِّمِ",
          "السَّبُّورَةُ"
        ],
        "correctAnswer": "أَقْلَامٍ",
        "explanation": "Het juiste antwoord is أَقْلَامٍ."
      },
      {
        "id": "text-9-grammar-3",
        "type": "grammar",
        "question": "مَا الْمُضَافُ فِي: قَلَمُ الْمُعَلِّمِ؟",
        "options": [
          "قَلَمُ",
          "الْمُعَلِّمِ",
          "عَلَى",
          "الْمَكْتَبِ"
        ],
        "correctAnswer": "قَلَمُ",
        "explanation": "Het juiste antwoord is قَلَمُ."
      },
      {
        "id": "text-9-grammar-4",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: طَالِبَانِ؟",
        "options": [
          "twee studenten",
          "één student",
          "studenten",
          "de student"
        ],
        "correctAnswer": "twee studenten",
        "explanation": "Het juiste antwoord is twee studenten."
      }
    ]
  },
  {
    "id": "text-10",
    "title": "Tekst 10 — Herhaling",
    "arabicTitle": "مُرَاجَعَةٌ",
    "paragraphs": [
      "هٰذَا بَيْتٌ وَهٰذِهِ حَدِيقَةٌ. بَابُ الْبَيْتِ أَمَامَ الطَّرِيقِ. خَلْفَ الْبَيْتِ حَدِيقَةٌ جَمِيلَةٌ. فِي الْحَدِيقَةِ شَجَرَةٌ وَوَرْدَةٌ.",
      "الْكُرَةُ بِجَانِبِ الشَّجَرَةِ. الدَّرَّاجَةُ تَحْتَ الشَّجَرَةِ. عَلَى الطَّاوِلَةِ كُوبُ الْمَاءِ وَطَبَقُ الطَّعَامِ. الْخُبْزُ فَوْقَ الطَّبَقِ.",
      "فِي الْبَيْتِ طَالِبٌ وَطَالِبَةٌ. الطَّالِبُ يَكْتُبُ فِي الدَّفْتَرِ. الطَّالِبَةُ تَشْرَبُ الْمَاءَ. عَلَى الْمَكْتَبِ كِتَابَانِ وَقَلَمَانِ.",
      "فِي الْحَدِيقَةِ ثَلَاثُ وَرْدَاتٍ. أَمَامَ الْبَيْتِ سَيَّارَةٌ. مِفْتَاحُ السَّيَّارَةِ فَوْقَ الْمَكْتَبِ. هٰذِهِ مُرَاجَعَةٌ جَمِيلَةٌ."
    ],
    "difficultWords": [
      {
        "arabic": "مُرَاجَعَةٌ",
        "dutch": "herhaling"
      },
      {
        "arabic": "الطَّرِيقِ",
        "dutch": "de weg"
      },
      {
        "arabic": "تَشْرَبُ",
        "dutch": "zij drinkt"
      },
      {
        "arabic": "جَمِيلَةٌ",
        "dutch": "mooi vrouwelijk"
      }
    ],
    "contentQuestions": [
      {
        "id": "text-10-content-1",
        "type": "content",
        "question": "مَاذَا فِي الْحَدِيقَةِ؟",
        "options": [
          "شَجَرَةٌ وَوَرْدَةٌ",
          "كِتَابٌ وَقَلَمٌ",
          "خُبْزٌ وَحَلِيبٌ",
          "سَيَّارَةٌ وَطَائِرَةٌ"
        ],
        "correctAnswer": "شَجَرَةٌ وَوَرْدَةٌ",
        "explanation": "Het antwoord staat in de tekst: شَجَرَةٌ وَوَرْدَةٌ."
      },
      {
        "id": "text-10-content-2",
        "type": "content",
        "question": "مَاذَا عَلَى الطَّاوِلَةِ؟",
        "options": [
          "كُوبُ الْمَاءِ وَطَبَقُ الطَّعَامِ",
          "بَابُ الْبَيْتِ وَالطَّرِيقُ",
          "الْكُرَةُ وَالشَّجَرَةُ",
          "الْمُعَلِّمُ وَالطَّالِبُ"
        ],
        "correctAnswer": "كُوبُ الْمَاءِ وَطَبَقُ الطَّعَامِ",
        "explanation": "Het antwoord staat in de tekst: كُوبُ الْمَاءِ وَطَبَقُ الطَّعَامِ."
      },
      {
        "id": "text-10-content-3",
        "type": "content",
        "question": "مَاذَا يَفْعَلُ الطَّالِبُ؟",
        "options": [
          "يَكْتُبُ فِي الدَّفْتَرِ",
          "يَشْرَبُ الْمَاءَ",
          "يَأْكُلُ التَّمْرَ",
          "يَلْعَبُ بِالْكُرَةِ"
        ],
        "correctAnswer": "يَكْتُبُ فِي الدَّفْتَرِ",
        "explanation": "Het antwoord staat in de tekst: يَكْتُبُ فِي الدَّفْتَرِ."
      },
      {
        "id": "text-10-content-4",
        "type": "content",
        "question": "أَيْنَ مِفْتَاحُ السَّيَّارَةِ؟",
        "options": [
          "فَوْقَ الْمَكْتَبِ",
          "تَحْتَ الشَّجَرَةِ",
          "فِي الْكُوبِ",
          "خَلْفَ الْمَسْجِدِ"
        ],
        "correctAnswer": "فَوْقَ الْمَكْتَبِ",
        "explanation": "Het antwoord staat in de tekst: فَوْقَ الْمَكْتَبِ."
      }
    ],
    "grammarQuestions": [
      {
        "id": "text-10-grammar-1",
        "type": "grammar",
        "question": "مَا الْمُضَافُ فِي: بَابُ الْبَيْتِ؟",
        "options": [
          "بَابُ",
          "الْبَيْتِ",
          "أَمَامَ",
          "الطَّرِيقِ"
        ],
        "correctAnswer": "بَابُ",
        "explanation": "Het juiste antwoord is بَابُ."
      },
      {
        "id": "text-10-grammar-2",
        "type": "grammar",
        "question": "مَا الظَّرْفُ فِي: بِجَانِبِ الشَّجَرَةِ؟",
        "options": [
          "بِجَانِبِ",
          "الشَّجَرَةِ",
          "الْكُرَةُ",
          "وَرْدَةٌ"
        ],
        "correctAnswer": "بِجَانِبِ",
        "explanation": "Het juiste antwoord is بِجَانِبِ."
      },
      {
        "id": "text-10-grammar-3",
        "type": "grammar",
        "question": "هٰذِهِ حَدِيقَةٌ: waarom هٰذِهِ?",
        "options": [
          "Omdat حَدِيقَةٌ vrouwelijk is",
          "Omdat حَدِيقَةٌ mannelijk is",
          "Omdat het een werkwoord is",
          "Omdat het dualis is"
        ],
        "correctAnswer": "Omdat حَدِيقَةٌ vrouwelijk is",
        "explanation": "Het juiste antwoord is Omdat حَدِيقَةٌ vrouwelijk is."
      },
      {
        "id": "text-10-grammar-4",
        "type": "grammar",
        "question": "مَاذَا تَعْنِي: ثَلَاثُ وَرْدَاتٍ؟",
        "options": [
          "drie bloemen",
          "twee bloemen",
          "één bloem",
          "vijf bloemen"
        ],
        "correctAnswer": "drie bloemen",
        "explanation": "Het juiste antwoord is drie bloemen."
      }
    ]
  }
];
