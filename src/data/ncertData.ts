import { QuestionItem, GeneratedQuestionPaper } from "../types";

export interface ClassSubjectMap {
  [className: string]: {
    subjects: {
      name: string;
      chapters: string[];
    }[];
  };
}

export const NCERT_CURRICULUM: ClassSubjectMap = {
  "Class 10": {
    subjects: [
      {
        name: "Science",
        chapters: [
          "Chemical Reactions and Equations",
          "Acids, Bases and Salts",
          "Metals and Non-metals",
          "Carbon and its Compounds",
          "Life Processes",
          "Control and Coordination",
          "How do Organisms Reproduce?",
          "Heredity and Evolution",
          "Light - Reflection and Refraction",
          "The Human Eye and the Colourful World",
          "Electricity",
          "Magnetic Effects of Electric Current",
          "Our Environment"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "Real Numbers",
          "Polynomials",
          "Pair of Linear Equations in Two Variables",
          "Quadratic Equations",
          "Arithmetic Progressions",
          "Triangles",
          "Coordinate Geometry",
          "Introduction to Trigonometry",
          "Some Applications of Trigonometry",
          "Circles",
          "Areas Related to Circles",
          "Surface Areas and Volumes",
          "Statistics",
          "Probability"
        ]
      },
      {
        name: "Social Science",
        chapters: [
          "The Rise of Nationalism in Europe",
          "Nationalism in India",
          "Resources and Development",
          "Forest and Wildlife Resources",
          "Water Resources",
          "Agriculture",
          "Power Sharing",
          "Federalism",
          "Gender, Religion and Caste",
          "Development",
          "Sectors of the Indian Economy",
          "Money and Credit",
          "Globalisation and the Indian Economy"
        ]
      },
      {
        name: "English",
        chapters: [
          "A Letter to God",
          "Nelson Mandela: Long Walk to Freedom",
          "Two Stories about Flying",
          "From the Diary of Anne Frank",
          "Glimpses of India",
          "Madam Rides the Bus",
          "The Sermon at Benares",
          "The Proposal",
          "Reading Comprehension",
          "Formal Letter Writing & Analytical Paragraph"
        ]
      }
    ]
  },
  "Class 12": {
    subjects: [
      {
        name: "Physics",
        chapters: [
          "Electric Charges and Fields",
          "Electrostatic Potential and Capacitance",
          "Current Electricity",
          "Moving Charges and Magnetism",
          "Magnetism and Matter",
          "Electromagnetic Induction",
          "Alternating Current",
          "Electromagnetic Waves",
          "Ray Optics and Optical Instruments",
          "Wave Optics",
          "Dual Nature of Radiation and Matter",
          "Atoms",
          "Nuclei",
          "Semiconductor Electronics"
        ]
      },
      {
        name: "Chemistry",
        chapters: [
          "Solutions",
          "Electrochemistry",
          "Chemical Kinetics",
          "d- and f-Block Elements",
          "Coordination Compounds",
          "Haloalkanes and Haloarenes",
          "Alcohols, Phenols and Ethers",
          "Aldehydes, Ketones and Carboxylic Acids",
          "Amines",
          "Biomolecules"
        ]
      },
      {
        name: "Biology",
        chapters: [
          "Sexual Reproduction in Flowering Plants",
          "Human Reproduction",
          "Reproductive Health",
          "Principles of Inheritance and Variation",
          "Molecular Basis of Inheritance",
          "Evolution",
          "Human Health and Disease",
          "Microbes in Human Welfare",
          "Biotechnology: Principles and Processes",
          "Biotechnology and its Applications",
          "Organisms and Populations",
          "Ecosystem",
          "Biodiversity and Conservation"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "Relations and Functions",
          "Inverse Trigonometric Functions",
          "Matrices",
          "Determinants",
          "Continuity and Differentiability",
          "Application of Derivatives",
          "Integrals",
          "Application of Integrals",
          "Differential Equations",
          "Vector Algebra",
          "Three Dimensional Geometry",
          "Linear Programming",
          "Probability"
        ]
      }
    ]
  },
  "Class 9": {
    subjects: [
      {
        name: "Science",
        chapters: [
          "Matter in Our Surroundings",
          "Is Matter Around Us Pure?",
          "Atoms and Molecules",
          "Structure of the Atom",
          "The Fundamental Unit of Life",
          "Tissues",
          "Motion",
          "Force and Laws of Motion",
          "Gravitation",
          "Work and Energy",
          "Sound",
          "Improvement in Food Resources"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "Number Systems",
          "Polynomials",
          "Coordinate Geometry",
          "Linear Equations in Two Variables",
          "Introduction to Euclid's Geometry",
          "Lines and Angles",
          "Triangles",
          "Quadrilaterals",
          "Circles",
          "Heron's Formula",
          "Surface Areas and Volumes",
          "Statistics"
        ]
      }
    ]
  },
  "Class 11": {
    subjects: [
      {
        name: "Physics",
        chapters: [
          "Units and Measurements",
          "Motion in a Straight Line",
          "Motion in a Plane",
          "Laws of Motion",
          "Work, Energy and Power",
          "System of Particles and Rotational Motion",
          "Gravitation",
          "Mechanical Properties of Solids",
          "Mechanical Properties of Fluids",
          "Thermal Properties of Matter",
          "Thermodynamics",
          "Kinetic Theory",
          "Oscillations",
          "Waves"
        ]
      },
      {
        name: "Chemistry",
        chapters: [
          "Some Basic Concepts of Chemistry",
          "Structure of Atom",
          "Classification of Elements and Periodicity",
          "Chemical Bonding and Molecular Structure",
          "Chemical Thermodynamics",
          "Equilibrium",
          "Redox Reactions",
          "Organic Chemistry - Some Basic Principles",
          "Hydrocarbons"
        ]
      },
      {
        name: "Biology",
        chapters: [
          "The Living World",
          "Biological Classification",
          "Plant Kingdom",
          "Animal Kingdom",
          "Morphology of Flowering Plants",
          "Anatomy of Flowering Plants",
          "Structural Organisation in Animals",
          "Cell: The Unit of Life",
          "Biomolecules",
          "Cell Cycle and Cell Division",
          "Photosynthesis in Higher Plants",
          "Respiration in Plants",
          "Plant Growth and Development",
          "Breathing and Exchange of Gases",
          "Body Fluids and Circulation",
          "Excretory Products and their Elimination",
          "Locomotion and Movement",
          "Neural Control and Coordination",
          "Chemical Coordination and Integration"
        ]
      }
    ]
  },
  "Class 8": {
    subjects: [
      {
        name: "Science",
        chapters: [
          "Crop Production and Management",
          "Microorganisms: Friend and Foe",
          "Coal and Petroleum",
          "Combustion and Flame",
          "Conservation of Plants and Animals",
          "Reproduction in Animals",
          "Reaching the Age of Adolescence",
          "Force and Pressure",
          "Friction",
          "Sound",
          "Chemical Effects of Electric Current",
          "Some Natural Phenomena",
          "Light"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "Rational Numbers",
          "Linear Equations in One Variable",
          "Understanding Quadrilaterals",
          "Data Handling",
          "Squares and Square Roots",
          "Cubes and Cube Roots",
          "Comparing Quantities",
          "Algebraic Expressions and Identities",
          "Mensuration",
          "Exponents and Powers",
          "Direct and Inverse Proportions",
          "Factorisation",
          "Introduction to Graphs"
        ]
      }
    ]
  },
  "Class 7": {
    subjects: [
      {
        name: "Science",
        chapters: [
          "Nutrition in Plants",
          "Nutrition in Animals",
          "Heat",
          "Acids, Bases and Salts",
          "Physical and Chemical Changes",
          "Respiration in Organisms",
          "Transportation in Animals and Plants",
          "Reproduction in Plants",
          "Motion and Time",
          "Electric Current and its Effects",
          "Light",
          "Forests: Our Lifeline",
          "Wastewater Story"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "Integers",
          "Fractions and Decimals",
          "Data Handling",
          "Simple Equations",
          "Lines and Angles",
          "The Triangle and its Properties",
          "Comparing Quantities",
          "Rational Numbers",
          "Perimeter and Area",
          "Algebraic Expressions",
          "Exponents and Powers",
          "Symmetry",
          "Visualising Solid Shapes"
        ]
      }
    ]
  },
  "Class 6": {
    subjects: [
      {
        name: "Science",
        chapters: [
          "Components of Food",
          "Sorting Materials into Groups",
          "Separation of Substances",
          "Getting to Know Plants",
          "Body Movements",
          "The Living Organisms — Characteristics and Habitats",
          "Motion and Measurement of Distances",
          "Light, Shadows and Reflections",
          "Electricity and Circuits",
          "Fun with Magnets",
          "Air Around Us"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "Knowing Our Numbers",
          "Whole Numbers",
          "Playing with Numbers",
          "Basic Geometrical Ideas",
          "Understanding Elementary Shapes",
          "Integers",
          "Fractions",
          "Decimals",
          "Data Handling",
          "Mensuration",
          "Algebra",
          "Ratio and Proportion"
        ]
      }
    ]
  },
  "Class 5": {
    subjects: [
      {
        name: "Environmental Studies (EVS)",
        chapters: [
          "Super Senses",
          "A Snake Charmer's Story",
          "From Tasting to Digesting",
          "Mangoes Round the Year",
          "Seeds and Seeds",
          "Every Drop Counts",
          "Experiments with Water",
          "A Treat for Mosquitoes",
          "Up You Go!",
          "Walls Tell Stories",
          "Sunita in Space",
          "What if it Finishes...?",
          "A Shelter so High!"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "The Fish Tale",
          "Shapes and Angles",
          "How Many Squares?",
          "Parts and Wholes",
          "Does it Look the Same?",
          "Be My Multiple, I'll be Your Factor",
          "Can You See the Pattern?",
          "Mapping Your Way",
          "Boxes and Sketches",
          "Tenths and Hundredths",
          "Area and its Boundary",
          "Smart Charts"
        ]
      }
    ]
  },
  "Class 4": {
    subjects: [
      {
        name: "Environmental Studies (EVS)",
        chapters: [
          "Going to School",
          "Ear to Ear",
          "A Day with Nandu",
          "The Story of Amrita",
          "Anita and the Honeybees",
          "Omana's Journey",
          "From the Window",
          "Reaching Grandmother's House",
          "Changing Families",
          "Hu Tu Tu, Hu Tu Tu",
          "The Valley of Flowers"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "Building with Bricks",
          "Long and Short",
          "A Trip to Bhopal",
          "Tick-Tick-Tick",
          "The Way The World Looks",
          "The Junk Seller",
          "Jugs and Mugs",
          "Carts and Wheels",
          "Halves and Quarters",
          "Play with Patterns",
          "Tables and Shares"
        ]
      }
    ]
  },
  "Class 3": {
    subjects: [
      {
        name: "Environmental Studies (EVS)",
        chapters: [
          "Poonam's Day out",
          "The Plant Fairy",
          "Water O' Water!",
          "Our First School",
          "Chhotu's House",
          "Foods We Eat",
          "Saying without Speaking",
          "Flying High",
          "It's Raining",
          "What is Cooking"
        ]
      },
      {
        name: "Mathematics",
        chapters: [
          "Where to Look From",
          "Fun with Numbers",
          "Give and Take",
          "Long and Short",
          "Shapes and Designs",
          "Fun with Give and Take",
          "Time Goes On",
          "Who is Heavier?",
          "How Many Times?",
          "Play with Patterns"
        ]
      }
    ]
  },
  "Class 2": {
    subjects: [
      {
        name: "Mathematics",
        chapters: [
          "What is Long, What is Round?",
          "Counting in Groups",
          "How Much Can You Carry?",
          "Counting in Tens",
          "Patterns",
          "Footprints",
          "Jugs and Mugs",
          "Tens and Ones",
          "My Funday",
          "Add our Points"
        ]
      },
      {
        name: "English",
        chapters: [
          "First Day at School",
          "Haldi's Adventure",
          "I am Lucky!",
          "I Want",
          "A Smile",
          "The Wind and the Sun",
          "Rain",
          "Storm in the Garden"
        ]
      }
    ]
  },
  "Class 1": {
    subjects: [
      {
        name: "Mathematics",
        chapters: [
          "Shapes and Space",
          "Numbers from One to Nine",
          "Addition",
          "Subtraction",
          "Numbers from Ten to Twenty",
          "Time",
          "Measurement",
          "Numbers from Twenty-one to Fifty",
          "Data Handling",
          "Patterns",
          "Numbers",
          "Money"
        ]
      },
      {
        name: "English",
        chapters: [
          "A Happy Child",
          "Three Little Pigs",
          "After a Bath",
          "The Bubble, the Straw and the Shoe",
          "One Little Kitten",
          "Lalu and Peelu",
          "Once I Saw a Little Bird",
          "Mittu and the Yellow Mango"
        ]
      }
    ]
  }
};

export const ORIGINAL_QUESTION_BANK: QuestionItem[] = [
  // Class 10 Science MCQs
  {
    id: "q-10-sci-1",
    question: "When aqueous barium chloride solution reacts with sodium sulphate solution, a white precipitate of barium sulphate is formed. What type of reaction is this?",
    type: "MCQ",
    marks: 1,
    options: [
      "Displacement reaction only",
      "Double displacement and precipitation reaction",
      "Combination reaction",
      "Thermal decomposition reaction"
    ],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "The reaction BaCl₂(aq) + Na₂SO₄(aq) → BaSO₄(s)↓ + 2NaCl(aq) involves mutual exchange of ions between reactants (double displacement) and forms an insoluble white precipitate of BaSO₄.",
    chapter: "Chemical Reactions and Equations",
    difficulty: "Easy"
  },
  {
    id: "q-10-sci-2",
    question: "Which of the following parts of the human alimentary canal receives bile juice from the liver?",
    type: "MCQ",
    marks: 1,
    options: [
      "Stomach",
      "Duodenum (Small Intestine)",
      "Large Intestine",
      "Esophagus"
    ],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "Bile juice produced by the liver and stored in the gall bladder is released via the common bile duct directly into the duodenum of the small intestine to emulsify fats and neutralize acidic chyme.",
    chapter: "Life Processes",
    difficulty: "Easy"
  },
  {
    id: "q-10-sci-3",
    question: "A convex lens of focal length 20 cm produces a real and inverted image of the same size as the object. At what distance is the object placed from the optical center of the lens?",
    type: "MCQ",
    marks: 1,
    options: [
      "20 cm",
      "40 cm",
      "10 cm",
      "At Infinity"
    ],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "A convex lens forms an inverted, real image of the same size as the object when the object is placed at 2F (twice the focal length). Here, u = 2f = 2 × 20 cm = 40 cm in front of the lens.",
    chapter: "Light - Reflection and Refraction",
    difficulty: "Medium"
  },
  {
    id: "q-10-sci-4",
    question: "Assertion (A): Silver chloride turns grey when exposed to sunlight for some time.\nReason (R): Decomposition of silver chloride into silver and chlorine occurs by the action of light.",
    type: "Assertion & Reason",
    marks: 1,
    options: [
      "Both (A) and (R) are true, and (R) is the correct explanation of (A).",
      "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).",
      "(A) is true, but (R) is false.",
      "(A) is false, but (R) is true."
    ],
    correctAnswerIndex: 0,
    answerKey: "A",
    solution: "In the presence of sunlight, 2AgCl(s) → 2Ag(s) + Cl₂(g). The white AgCl decomposes into grey metallic silver via photolytic decomposition.",
    chapter: "Chemical Reactions and Equations",
    difficulty: "Medium"
  },
  {
    id: "q-10-sci-5",
    question: "Why do aquatic organisms exhibit a much faster rate of breathing than terrestrial organisms?",
    type: "Short Answer",
    marks: 3,
    solution: "Aquatic organisms obtain dissolved oxygen from water. Since the amount of dissolved oxygen in water is significantly lower compared to the amount of oxygen present in the atmospheric air (approx. 21%), aquatic animals (like fishes) must pump and breathe water through their gills much faster to obtain sufficient oxygen for metabolic needs.",
    chapter: "Life Processes",
    difficulty: "Medium"
  },
  {
    id: "q-10-sci-6",
    question: "State Ohm's Law. Draw a labeled circuit diagram to verify Ohm's law experimentally in the laboratory.",
    type: "Long Answer",
    marks: 5,
    solution: "Ohm's Law states that at constant temperature and physical conditions, the electric current (I) flowing through a metallic conductor is directly proportional to the potential difference (V) applied across its ends: V ∝ I => V = IR, where R is the resistance of the conductor.\nCircuit Diagram Components:\n1. Battery / Power source\n2. Plug key\n3. Ammeter in series with unknown resistance wire (R)\n4. Voltmeter in parallel across R\n5. Rheostat (variable resistor) to adjust current.\nA straight-line V-I graph passing through the origin verifies the law.",
    chapter: "Electricity",
    difficulty: "Hard"
  },

  // Class 12 Physics & Biology
  {
    id: "q-12-phy-1",
    question: "An electric dipole of dipole moment p is placed in a uniform electric field E. What is the orientation of the dipole for stable equilibrium?",
    type: "MCQ",
    marks: 1,
    options: [
      "Dipole moment p is aligned parallel to E (θ = 0°)",
      "Dipole moment p is anti-parallel to E (θ = 180°)",
      "Dipole moment p is perpendicular to E (θ = 90°)",
      "Dipole moment p is at 45° to E"
    ],
    correctAnswerIndex: 0,
    answerKey: "A",
    solution: "Potential energy of a dipole in uniform field is U = -p·E = -pE cos θ. For stable equilibrium, potential energy must be minimum, which occurs at θ = 0° (U = -pE, torque τ = pE sin 0° = 0).",
    chapter: "Electric Charges and Fields",
    difficulty: "Medium"
  },
  {
    id: "q-12-bio-1",
    question: "In human females, the primary oocytes arrested at which meiotic stage resume meiosis upon puberty under LH stimulation?",
    type: "MCQ",
    marks: 1,
    options: [
      "Diakinesis of Prophase I",
      "Diplotene of Prophase I",
      "Metaphase II",
      "Anaphase I"
    ],
    correctAnswerIndex: 1,
    answerKey: "B",
    solution: "Primary oocytes are formed during embryonic development and remain suspended in the diplotene stage of Prophase I until puberty, when hormonal surges trigger completion of Meiosis I to form a secondary oocyte and first polar body.",
    chapter: "Human Reproduction",
    difficulty: "Medium"
  },
  {
    id: "q-12-chem-1",
    question: "Which of the following colligative properties is most widely employed for determining the molar mass of biomolecules and polymers, and why?",
    type: "Short Answer",
    marks: 3,
    solution: "Osmotic pressure (π = CRT) is preferred because:\n1. It is measured at room temperature, preserving the native conformation of delicate biomolecules.\n2. Molarity is used instead of molality.\n3. Even for extremely dilute solutions of high molar mass polymers, osmotic pressure produces significant and easily measurable hydrostatic height changes.",
    chapter: "Solutions",
    difficulty: "Medium"
  }
];

export function generateOfflineQuestionPaper(
  grade: string,
  board: string,
  subject: string,
  chapter: string,
  difficulty: string,
  totalMarks: number,
  duration: string,
  schoolName: string
): GeneratedQuestionPaper {
  const marks = Number(totalMarks) || 50;

  // Build realistic section breakdown
  let sectionA_count = Math.max(Math.floor(marks * 0.25), 4);
  let sectionB_count = Math.max(Math.floor(marks * 0.2), 3);
  let sectionC_count = Math.max(Math.floor(marks * 0.3), 2);
  let sectionD_count = Math.max(Math.floor(marks * 0.25), 1);

  const fallbackQuestions: QuestionItem[] = [
    {
      id: 1,
      question: `Define the core principle of ${chapter || subject} according to NCERT syllabus guidelines.`,
      type: "MCQ",
      marks: 1,
      options: [
        "It follows fundamental conservation and equilibrium laws.",
        "It applies only under non-standard temperature conditions.",
        "It violates spontaneous entropy increases.",
        "None of the above."
      ],
      correctAnswerIndex: 0,
      answerKey: "A",
      solution: "Fundamental physical and chemical principles strictly conserve mass, energy, and momentum in closed systems."
    },
    {
      id: 2,
      question: `Which of the following statements is TRUE regarding the mechanism of ${chapter || subject}?`,
      type: "MCQ",
      marks: 1,
      options: [
        "The reaction rate is inversely related to activation barriers.",
        "Equilibrium constants change with catalyst addition.",
        "Energy is absorbed in exothermic bond formation.",
        "Rate constants are independent of absolute temperature."
      ],
      correctAnswerIndex: 0,
      answerKey: "A",
      solution: "Lower activation energy barriers exponentially increase reaction rates as described by the Arrhenius equation."
    },
    {
      id: 3,
      question: `Assertion (A): In ${chapter || subject}, rate of process increases with surface area.\nReason (R): Greater surface area provides more active interaction sites.`,
      type: "Assertion & Reason",
      marks: 1,
      options: [
        "Both (A) and (R) are true and (R) is the correct explanation of (A).",
        "Both (A) and (R) are true but (R) is NOT the correct explanation.",
        "(A) is true, (R) is false.",
        "(A) is false, (R) is true."
      ],
      correctAnswerIndex: 0,
      answerKey: "A",
      solution: "Increased surface area increases effective collision frequency and reactant contact points."
    },
    {
      id: 4,
      question: `Explain with a neat balanced equation or diagram the primary phenomenon observed in ${chapter || subject}.`,
      type: "VSA",
      marks: 2,
      solution: "Provide clear schematic representation with standard SI units, labels for reactants/products, and direction of energy transfer."
    },
    {
      id: 5,
      question: `Differentiate between the primary and secondary mechanisms in ${chapter || subject} with two distinct contrasting points.`,
      type: "Short Answer",
      marks: 3,
      solution: "Point 1: Energetic requirements and thermodynamic stability.\nPoint 2: Kinetic velocity, enzyme/catalyst dependence, and biological/physical significance."
    },
    {
      id: 6,
      question: `A student performs an experiment on ${chapter || subject}. Describe the step-by-step procedure, observations, and 2 precautions required to achieve accurate experimental data.`,
      type: "Long Answer",
      marks: 5,
      solution: "1. Experimental Apparatus Setup with clean reagents.\n2. Measured variable recordings at fixed intervals.\n3. Precautions: Avoid parallax error, maintain constant temperature, and use calibrated glassware."
    }
  ];

  const defaultInstructions = [
    "All questions are compulsory.",
    "The question paper is divided into Section A (1 Mark each), Section B (2 Marks each), Section C (3 Marks each), and Section D (5 Marks each).",
    "Internal choices are provided in sections C and D where applicable.",
    "Use of calculators and mobile electronic devices is strictly prohibited."
  ];

  const effectiveSchoolName = schoolName || "STUDENT TOOLKIT INDIA PRACTICE ASSESSMENT";
  const effectiveTitle = `${grade.toString().toUpperCase()} ${subject.toUpperCase()} PRACTICE EXAMINATION`;

  const secAQuestions = fallbackQuestions.filter((q) => q.marks === 1);
  const secBQuestions = fallbackQuestions.filter((q) => q.marks === 2);
  const secCQuestions = fallbackQuestions.filter((q) => q.marks === 3);
  const secDQuestions = fallbackQuestions.filter((q) => q.marks === 5);

  return {
    schoolName: effectiveSchoolName,
    title: effectiveTitle,
    subject: subject,
    grade: grade.toString(),
    board: board || "CBSE",
    timeAllowed: duration || "2 Hours",
    totalMarks: marks,
    instructions: defaultInstructions,
    header: {
      schoolName: effectiveSchoolName,
      examTitle: effectiveTitle,
      subject: subject,
      grade: grade.toString(),
      board: board || "CBSE",
      timeAllowed: duration || "2 Hours",
      maxMarks: marks,
      instructions: defaultInstructions
    },
    sections: [
      {
        name: "Section A",
        description: "Multiple Choice Questions & Objective Types (1 Mark each)",
        marksPerQuestion: 1,
        totalMarks: secAQuestions.reduce((acc, q) => acc + q.marks, 0),
        questions: secAQuestions
      },
      {
        name: "Section B",
        description: "Very Short Answer Questions (2 Marks each)",
        marksPerQuestion: 2,
        totalMarks: secBQuestions.reduce((acc, q) => acc + q.marks, 0),
        questions: secBQuestions
      },
      {
        name: "Section C",
        description: "Short Answer Questions (3 Marks each)",
        marksPerQuestion: 3,
        totalMarks: secCQuestions.reduce((acc, q) => acc + q.marks, 0),
        questions: secCQuestions
      },
      {
        name: "Section D",
        description: "Long Answer Questions (5 Marks each)",
        marksPerQuestion: 5,
        totalMarks: secDQuestions.reduce((acc, q) => acc + q.marks, 0),
        questions: secDQuestions
      }
    ]
  };
}

export function generateQuestionPaper(
  grade: number | string,
  subject: string,
  totalMarks: number = 80,
  duration: string = "3 Hours",
  schoolName: string = "CENTRAL MODEL SCHOOL / CBSE PRACTICE EXAMINATION",
  chapters?: string[],
  difficulty: string = "Medium",
  board: string = "CBSE"
): GeneratedQuestionPaper {
  const gradeStr = typeof grade === "number" ? `Class ${grade}` : grade;
  const chapterStr = chapters && chapters.length > 0 ? chapters.join(", ") : "";
  return generateOfflineQuestionPaper(
    gradeStr,
    board,
    subject,
    chapterStr,
    difficulty,
    totalMarks,
    duration,
    schoolName
  );
}

