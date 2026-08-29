import { ToolMetadata } from "../types";

export const TOOLS_DATA: ToolMetadata[] = [
  {
    id: "percentage-calculator",
    slug: "percentage-calculator",
    name: "Percentage Calculator",
    category: "Calculator Tools",
    tagline: "Calculate student marks percentage, grade divisions, and required target marks",
    description: "Calculate overall exam percentage from obtained marks and total marks, find required marks from percentage, and calculate subject-wise weighted percentages for CBSE, ICSE, and State Boards.",
    icon: "Percent",
    popular: true,
    keywords: ["percentage calculator", "cbse marks percentage", "calculate percentage of marks", "class 10 percentage", "class 12 percentage"],
    howToUse: [
      "Select your calculation mode (Marks to Percentage, Percentage to Marks, or Multi-Subject Table).",
      "Enter your obtained marks and total maximum marks.",
      "Add additional subjects if you want a complete board exam marksheet breakdown.",
      "Click 'Calculate' to see your percentage, division, grade, and visual progress bar.",
      "Use 'Reset' to clear all inputs and perform a new calculation."
    ],
    example: {
      title: "CBSE Class 10 Board Marks Example",
      scenario: "A student scored 88 in English, 95 in Math, 92 in Science, 85 in Social Science, and 90 in Hindi (out of 100 each).",
      steps: [
        "Sum of obtained marks = 88 + 95 + 92 + 85 + 90 = 450",
        "Total maximum marks = 5 × 100 = 500",
        "Formula = (Obtained Marks / Total Marks) × 100",
        "Calculation = (450 / 500) × 100 = 90.00%"
      ],
      result: "Overall Percentage: 90.00% (Grade A1 / Distinction / 1st Division)"
    },
    tips: [
      "In CBSE Class 10 & 12, the best of five subjects rule is commonly applied for college admissions where allowed.",
      "For ICSE/ISC, English is typically compulsory when computing your aggregate percentage.",
      "Always verify whether practical and theory marks are added before calculating your percentage."
    ],
    faqs: [
      {
        question: "How do I calculate percentage from total marks?",
        answer: "Divide the total marks you obtained by the maximum total marks of all subjects, then multiply the result by 100: Percentage = (Obtained Marks ÷ Total Marks) × 100."
      },
      {
        question: "What is 1st division percentage in Indian boards?",
        answer: "In most Indian educational boards (CBSE, ICSE, and State Boards), scoring 60% and above is considered 1st Division. Scoring 75% and above is categorized as Distinction."
      },
      {
        question: "How do I calculate what marks I need to get 90%?",
        answer: "Multiply your target percentage (90) by the total maximum marks and divide by 100: Required Marks = (90 × Total Marks) ÷ 100."
      }
    ],
    relatedToolSlugs: ["cgpa-calculator", "marks-calculator", "gpa-calculator", "daily-study-planner"]
  },
  {
    id: "cgpa-calculator",
    slug: "cgpa-calculator",
    name: "CGPA Calculator",
    category: "Calculator Tools",
    tagline: "Calculate CBSE CGPA and convert CGPA to percentage using official 9.5 multiplier",
    description: "Easily compute your Cumulative Grade Point Average (CGPA) from subject grade points and convert CGPA to percentage instantly using the standard CBSE 9.5 multiplier.",
    icon: "GraduationCap",
    popular: true,
    badge: "CBSE Standard",
    keywords: ["cgpa calculator", "cgpa to percentage", "cbse cgpa converter", "grade points to cgpa", "class 10 cgpa"],
    howToUse: [
      "Enter the number of subjects (usually 5 for CBSE Class 10).",
      "Input the Grade Point (GP from 1 to 10) received in each subject.",
      "The calculator automatically sums your grade points and divides by the number of subjects.",
      "View your exact CGPA and the equivalent Percentage calculated via the official 9.5 conversion rule."
    ],
    example: {
      title: "Class 10 CBSE 5-Subject CGPA Calculation",
      scenario: "Grade Points: Math (10), Science (9), English (8), Social Science (9), Hindi (9).",
      steps: [
        "Sum of Grade Points = 10 + 9 + 8 + 9 + 9 = 45",
        "CGPA = Total Grade Points / 5 = 45 / 5 = 9.0",
        "Percentage = CGPA × 9.5 = 9.0 × 9.5 = 85.5%"
      ],
      result: "CGPA: 9.0 | Equivalent Percentage: 85.5%"
    },
    tips: [
      "CBSE officially prescribes multiplying CGPA by 9.5 to obtain the approximate percentage of marks.",
      "To calculate subject-wise percentage from individual grade points, multiply that subject's GP by 9.5 (e.g., GP 9 × 9.5 = 85.5%).",
      "Do not include additional 6th optional subjects unless allowed by your school's aggregate policy."
    ],
    faqs: [
      {
        question: "Why does CBSE multiply CGPA by 9.5 to find percentage?",
        answer: "CBSE analyzed the performance of students over past years and determined that the average score of candidates lying within a grade point bracket approximated 9.5 times that grade point."
      },
      {
        question: "How is 10 CGPA converted to percentage?",
        answer: "A 10 CGPA equals 10 × 9.5 = 95.0% according to standard CBSE guidelines (though scoring top grades in all subjects is an A1 band)."
      }
    ],
    relatedToolSlugs: ["percentage-calculator", "gpa-calculator", "marks-calculator", "study-timetable-generator"]
  },
  {
    id: "gpa-calculator",
    slug: "gpa-calculator",
    name: "GPA Calculator",
    category: "Calculator Tools",
    tagline: "Calculate credit-weighted GPA & SGPA for college and higher secondary courses",
    description: "Calculate your Semester Grade Point Average (SGPA) and cumulative GPA using course credit hours and letter grades (A+, A, B, etc.) or 10-point scale grade points.",
    icon: "Calculator",
    keywords: ["gpa calculator", "sgpa calculator", "college gpa", "weighted gpa", "credit hours gpa"],
    howToUse: [
      "Add all your courses or subjects for the term.",
      "Enter the credit weight (e.g., 3 credits, 4 credits, 2 credits) for each subject.",
      "Select your grade or enter grade points (0 to 10 scale or 4-point scale).",
      "The tool calculates total quality points and total credits to find your weighted GPA."
    ],
    example: {
      title: "Semester SGPA Calculation",
      scenario: "Physics (4 credits, Grade 9), Chemistry (3 credits, Grade 8), Calculus (4 credits, Grade 10).",
      steps: [
        "Quality Points = (4 × 9) + (3 × 8) + (4 × 10) = 36 + 24 + 40 = 100",
        "Total Credits = 4 + 3 + 4 = 11",
        "Weighted GPA = Quality Points / Total Credits = 100 / 11 = 9.09"
      ],
      result: "Weighted SGPA: 9.09 out of 10.0"
    },
    tips: [
      "Higher credit courses impact your GPA more significantly—prioritize high-credit subjects during exam prep.",
      "Check whether your university uses a 10-point UGC scale or a 4.0 international scale."
    ],
    faqs: [
      {
        question: "What is the difference between SGPA and CGPA?",
        answer: "SGPA (Semester Grade Point Average) measures your performance in a single semester, while CGPA (Cumulative Grade Point Average) is the aggregate of all semesters completed to date."
      }
    ],
    relatedToolSlugs: ["cgpa-calculator", "percentage-calculator", "marks-calculator", "pomodoro-timer"]
  },
  {
    id: "marks-calculator",
    slug: "marks-calculator",
    name: "Marks Calculator",
    category: "Calculator Tools",
    tagline: "Comprehensive marksheet aggregator with pass/fail tracking and grade divisions",
    description: "Add unlimited subjects, set custom maximum marks, compute aggregate scores, subject averages, passing criteria (33%/40%), and distinction categories with a clean printable marksheet.",
    icon: "Award",
    popular: true,
    keywords: ["marks calculator", "total marks calculator", "subject marks total", "marks average calculator", "board marksheet calculator"],
    howToUse: [
      "Enter subject names, obtained marks, and max marks for each subject.",
      "Set your minimum passing mark percentage (default is 33% for CBSE).",
      "View real-time grand totals, overall percentage, average per subject, and pass/fail status per paper.",
      "Print or save the summary marksheet."
    ],
    example: {
      title: "Class 12 Board Exam Aggregate",
      scenario: "Physics (70/100), Chemistry (85/100), Biology (92/100), English (88/100), Physical Ed (95/100).",
      steps: [
        "Total Obtained = 70 + 85 + 92 + 88 + 95 = 430",
        "Total Maximum = 500",
        "Average Mark per Subject = 430 / 5 = 86.0",
        "Overall Percentage = 86.0%"
      ],
      result: "Result: PASSED with First Division & Distinction"
    },
    tips: [
      "Indian boards mandate passing separately in theory and practical components in subjects like Physics, Chemistry, and Biology.",
      "Track internal assessment marks (20 marks) alongside theory board papers (80 marks)."
    ],
    faqs: [
      {
        question: "What are the passing marks for CBSE Class 10 and 12?",
        answer: "For Class 10, students must obtain an aggregate of 33% (theory + practical). For Class 12, students must score at least 33% marks separately in theory and 33% in practical/internal assessments."
      }
    ],
    relatedToolSlugs: ["percentage-calculator", "cgpa-calculator", "exam-countdown", "revision-planner"]
  },
  {
    id: "age-calculator",
    slug: "age-calculator",
    name: "Age Calculator for Students",
    category: "Calculator Tools",
    tagline: "Calculate exact age in years, months, and days for school admissions and exam eligibility",
    description: "Determine your precise age in years, months, days, hours, and minutes. Check age eligibility criteria for NEET, JEE Mains, NDA, UPSC, and board registrations with next birthday countdown.",
    icon: "Calendar",
    keywords: ["age calculator", "student age calculator", "neet age eligibility calculator", "date of birth calculator", "exact age in days"],
    howToUse: [
      "Select your Date of Birth.",
      "Select the target date (defaults to today or select a specific cutoff date like 31st December for NEET).",
      "Click Calculate to get years, months, days, total days lived, and upcoming birthday countdown.",
      "Check the eligibility checklist for major Indian competitive exams."
    ],
    example: {
      title: "NEET Eligibility Cutoff Calculation",
      scenario: "Date of Birth: 15 July 2008. Target Cutoff Date: 31 December 2025.",
      steps: [
        "Difference between 15-07-2008 and 31-12-2025 = 17 Years, 5 Months, 16 Days",
        "NEET Requirement: Minimum 17 years of age on or before 31st December of admission year."
      ],
      result: "Status: Fully ELIGIBLE for NEET (Age ≥ 17 Years)"
    },
    tips: [
      "For NEET UG, candidates must complete 17 years of age on or before December 31 of the year of admission.",
      "For NDA (National Defence Academy), the age limit is strictly between 16.5 and 19.5 years."
    ],
    faqs: [
      {
        question: "What is the minimum age for NEET exam?",
        answer: "The candidate must have completed a minimum of 17 years of age at the time of admission or will complete that age on or before 31st December of the admission year."
      },
      {
        question: "Is there an upper age limit for JEE Main and NEET?",
        answer: "There is no upper age limit for appearing in JEE Main and NEET UG as per current NTA guidelines."
      }
    ],
    relatedToolSlugs: ["percentage-calculator", "exam-countdown", "study-timetable-generator", "daily-study-planner"]
  },
  {
    id: "study-timetable-generator",
    slug: "study-timetable-generator",
    name: "Study Timetable Generator",
    category: "Study Tools",
    tagline: "Generate customized daily and weekly study schedules based on your weak subjects and exam date",
    description: "Generate a realistic, balanced study timetable tailored to your class (Class 6-12, NEET/JEE), school hours, daily study capacity, weak topics, and upcoming board/entrance exams.",
    icon: "Clock",
    popular: true,
    keywords: ["study timetable generator", "board exam timetable maker", "daily study routine", "neet study timetable", "cbse class 10 timetable"],
    howToUse: [
      "Select your Class / Target Exam (e.g., Class 10 CBSE, Class 12 PCM/PCB, NEET).",
      "Enter your school/college timings and sleep/routine hours.",
      "Specify your available self-study hours per day (e.g., 3 to 6 hours).",
      "Mark your weak subjects to allocate higher priority slots.",
      "Click 'Generate Timetable' to view your daily schedule, weekly rotation grid, and printable study plan."
    ],
    example: {
      title: "Class 10 CBSE 4-Hour Daily Plan Example",
      scenario: "Available study time: 5:00 PM to 10:00 PM (Weak subject: Mathematics).",
      steps: [
        "Slot 1 (5:30 PM - 7:00 PM): Mathematics (High energy, problem solving)",
        "Short Break (7:00 PM - 7:15 PM): Relax & hydrate",
        "Slot 2 (7:15 PM - 8:30 PM): Science / Chemistry concepts",
        "Dinner & Rest (8:30 PM - 9:15 PM)",
        "Slot 3 (9:15 PM - 10:15 PM): Social Science / Language quick recall & formula revision"
      ],
      result: "4.5 Hours High-Yield Focused Study with Zero Burnout"
    },
    tips: [
      "Tackle tough problem-solving subjects (Math/Physics) during your peak mental alertness window.",
      "Incorporate 10-15 minute active breaks every 50-60 minutes to sustain high retention.",
      "Dedicate the final 30 minutes of every night strictly to reviewing the day's formulas and notes."
    ],
    faqs: [
      {
        question: "How many hours should a Class 10/12 student study daily?",
        answer: "3 to 4 hours of focused, distraction-free self-study on weekdays and 5 to 6 hours on weekends is generally optimal for scoring 90%+ without mental fatigue."
      }
    ],
    relatedToolSlugs: ["daily-study-planner", "pomodoro-timer", "revision-planner", "exam-countdown"]
  },
  {
    id: "exam-countdown",
    slug: "exam-countdown",
    name: "Exam Countdown Timer",
    category: "Exam Tools",
    tagline: "Live countdown in days, hours, minutes, and seconds for CBSE, NEET, JEE & Board Exams",
    description: "Track the exact remaining time until your CBSE Board exams, NEET UG, JEE Main & Advanced, ICSE, and state entrance exams with live countdown clocks saved securely in your browser.",
    icon: "Timer",
    popular: true,
    keywords: ["exam countdown", "cbse board exam countdown", "neet countdown", "jee mains countdown 2026", "days left for boards"],
    howToUse: [
      "Select one of the pre-configured Indian exams (CBSE 10th/12th, NEET, JEE, CUET) or add a custom test.",
      "Set the date and optional target score / reminder notes.",
      "View live ticking countdown timers with days, hours, minutes, and seconds.",
      "Keep track of multiple exams simultaneously without losing data on browser refresh."
    ],
    example: {
      title: "Tracking NEET UG 2026",
      scenario: "Exam Date: First Sunday of May 2026.",
      steps: [
        "Displays real-time countdown card with urgency color indicator.",
        "Calculates total study days and weekends remaining for syllabus completion."
      ],
      result: "Persistent countdown display with daily motivation reminders"
    },
    tips: [
      "Use remaining days to divide your syllabus: Complete 1st syllabus pass with 45 days left, 2nd pass with 15 days left, and final mocks in the last 2 weeks.",
      "Pin this page in your browser tabs for daily focus and accountability."
    ],
    faqs: [
      {
        question: "Are my saved exam countdowns stored safely?",
        answer: "Yes! All countdowns are saved locally in your browser storage so they are immediately available whenever you return without needing any login."
      }
    ],
    relatedToolSlugs: ["study-timetable-generator", "daily-study-planner", "pomodoro-timer", "revision-planner"]
  },
  {
    id: "pomodoro-timer",
    slug: "pomodoro-timer",
    name: "Pomodoro Study Timer",
    category: "Study Tools",
    tagline: "Customizable 25/5 focus timer with audio cues and session streak tracking",
    description: "Boost your study productivity using the proven Pomodoro Technique (25 min study, 5 min break). Features customizable intervals, audio chimes, full-screen study mode, and daily session counters.",
    icon: "Flame",
    popular: true,
    keywords: ["pomodoro timer", "study timer", "25 5 timer", "focus study timer online", "pomodoro timer for students"],
    howToUse: [
      "Select your preferred session duration (Standard 25m/5m, Long 50m/10m, or Custom).",
      "Click 'Start' to begin your distraction-free study session.",
      "When the chime rings, take a 5-minute rejuvenating break away from screens.",
      "After 4 study cycles, take a longer 15-20 minute break.",
      "Track your total study hours and completed Pomodoro streak today."
    ],
    example: {
      title: "2-Hour Physics Numerical Session",
      scenario: "Complete 4 cycles of 25 min solving + 5 min break.",
      steps: [
        "Pomodoro 1: Mechanics formulas review & Derivations",
        "Break 1: Hydrate & stretch",
        "Pomodoro 2: Numerical problems 1 to 10",
        "Break 2: Deep breathing",
        "Pomodoro 3: NCERT Exemplar questions",
        "Break 3: Light walk",
        "Pomodoro 4: Error analysis & doubt clearing"
      ],
      result: "4 Focused Sessions Completed = 100 Minutes Deep Work"
    },
    tips: [
      "Put your mobile phone in another room during the active 25-minute timer.",
      "During the 5-minute break, avoid scrolling social media; stretch, drink water, or look out a window."
    ],
    faqs: [
      {
        question: "Why is the Pomodoro Technique effective for students?",
        answer: "The brain maintains optimal peak focus for 20 to 40 minutes. Short frequent breaks prevent cognitive fatigue, boost dopamine, and significantly enhance long-term memory retention."
      }
    ],
    relatedToolSlugs: ["daily-study-planner", "study-timetable-generator", "revision-planner", "exam-countdown"]
  },
  {
    id: "daily-study-planner",
    slug: "daily-study-planner",
    name: "Daily Study Planner",
    category: "Study Tools",
    tagline: "Interactive daily study task manager with priority tags, time estimates, and progress tracking",
    description: "Organize your daily study goals with subject tags, priority levels (High/Medium/Low), estimated study times, progress percentage bars, and auto-save browser storage.",
    icon: "CheckSquare",
    keywords: ["daily study planner", "student task manager", "study checklist online", "to do list for students", "study tracker"],
    howToUse: [
      "Type in your study tasks (e.g., 'Solve Class 10 Trigonometry Ex 8.4').",
      "Assign the subject, priority level (High, Medium, Low), and estimated time.",
      "Tick off tasks as you complete them to see your live daily progress bar grow.",
      "Use 'Clear Completed' or reset at the start of each study day."
    ],
    example: {
      title: "Class 12 Board Prep Daily Checklist",
      scenario: "Tasks for today with time and priority:",
      steps: [
        "1. Electrostatics Chapter 1 NCERT back exercises (High | 60 mins)",
        "2. Organic Chemistry Named Reactions summary sheet (High | 45 mins)",
        "3. English Flamingo Chapter 3 reading (Medium | 30 mins)",
        "4. Revise 10 Biology Diagrams (Medium | 30 mins)"
      ],
      result: "Total Planned: 2.75 Hours | 4 Clear Achievable Targets"
    },
    tips: [
      "Limit your daily high-priority tasks to 3-5 critical items to avoid feeling overwhelmed.",
      "Write tomorrow's study list before going to sleep tonight so you start immediately the next morning."
    ],
    faqs: [
      {
        question: "Does the planner save my tasks when I close the tab?",
        answer: "Yes! All tasks, completion statuses, and progress are stored in your browser's localStorage."
      }
    ],
    relatedToolSlugs: ["study-timetable-generator", "pomodoro-timer", "revision-planner", "marks-calculator"]
  },
  {
    id: "revision-planner",
    slug: "revision-planner",
    name: "Spaced Repetition Revision Planner",
    category: "Study Tools",
    tagline: "Scientific spaced repetition schedule to retain formulas and chapters permanently",
    description: "Implement the scientifically proven Ebbinghaus forgetting curve with a structured 4-stage revision schedule (Day 1, Day 3, Day 7, Day 21) for all subjects and chapters.",
    icon: "RotateCcw",
    keywords: ["revision planner", "spaced repetition for students", "neet revision schedule", "cbse revision planner", "chapter revision tracker"],
    howToUse: [
      "Add the chapter/topic you just finished studying today.",
      "Select your subject and target exam date.",
      "The tool calculates your 4 critical revision dates based on spaced repetition science.",
      "Mark each revision stage (R1, R2, R3, R4) complete as you review the topic."
    ],
    example: {
      title: "Physics - Optics Spaced Repetition",
      scenario: "First studied Ray Optics on 1st March.",
      steps: [
        "Revision 1 (Day 1): 2nd March (15-min quick formula review)",
        "Revision 2 (Day 3): 5th March (Solve 5 numerical problems)",
        "Revision 3 (Day 7): 9th March (Recall ray diagrams from memory)",
        "Revision 4 (Day 21): 23rd March (Solve 1 past year board question)"
      ],
      result: "90%+ Long-Term Recall Retained into Final Exams"
    },
    tips: [
      "Do not re-read entire textbook chapters during revision; use active recall by writing formulas and diagrams from memory without looking.",
      "Focus revision on your 'mistake book' entries where you lost marks in previous tests."
    ],
    faqs: [
      {
        question: "What is the Ebbinghaus forgetting curve?",
        answer: "Hermann Ebbinghaus discovered that humans forget nearly 70% of new information within 24-48 hours unless it is reviewed at spaced intervals (1 day, 3 days, 7 days, and 21 days)."
      }
    ],
    relatedToolSlugs: ["daily-study-planner", "study-timetable-generator", "biology-mcq-generator", "pomodoro-timer"]
  },
  {
    id: "biology-mcq-generator",
    slug: "biology-mcq-generator",
    name: "Biology MCQ Generator",
    category: "Science Tools",
    tagline: "Interactive NCERT & NEET Biology multiple-choice question practice with explanations",
    description: "Generate original, curriculum-aligned multiple choice questions for Class 9, 10, 11, 12 and NEET Biology across Botany, Zoology, Genetics, Ecology, and Human Physiology.",
    icon: "Dna",
    popular: true,
    badge: "NEET / CBSE",
    keywords: ["biology mcq generator", "neet biology questions", "class 12 biology mcqs", "class 10 life processes mcq", "ncert biology mcq quiz"],
    howToUse: [
      "Select your Class (Class 9, 10, 11, 12, or NEET Aspirant).",
      "Choose a Biology unit / chapter (e.g., Genetics, Cell Biology, Human Reproduction, Life Processes).",
      "Select difficulty level (Easy, Medium, Hard) and number of questions.",
      "Take the interactive quiz, choose options, and instantly view detailed scientific explanations for every answer."
    ],
    example: {
      title: "Class 12 Genetics Practice MCQ",
      scenario: "Testing Mendel's Law of Independent Assortment.",
      steps: [
        "Question generated with 4 distinct pedagogical options.",
        "Select answer and click 'Check Answer' to see correct option highlighted.",
        "Detailed explanation clarifies dihybrid cross 9:3:3:1 phenotypic ratio."
      ],
      result: "Instant Feedback + Conceptual Understanding"
    },
    tips: [
      "In NEET, 50% of the total paper (360 out of 720 marks) is Biology. Thorough MCQ practice is the highest ROI study activity.",
      "Always read all four options before selecting; NEET questions often test fine distinctions in terminology."
    ],
    faqs: [
      {
        question: "Are these questions based on NCERT syllabus?",
        answer: "Yes, all practice questions align strictly with NCERT core concepts and CBSE/NEET learning objectives, using original pedagogical wording."
      }
    ],
    relatedToolSlugs: ["biology-glossary", "biology-concept-finder", "chemistry-formula-finder", "question-paper-generator"]
  },
  {
    id: "biology-glossary",
    slug: "biology-glossary",
    name: "Biology Glossary & Term Finder",
    category: "Science Tools",
    tagline: "A-Z searchable directory of essential biological definitions and NEET terms",
    description: "Search and browse hundreds of biological terms, botanical classifications, anatomical terminology, enzymes, hormones, and genetic definitions with clear explanations and related concepts.",
    icon: "BookOpen",
    keywords: ["biology glossary", "biology terms dictionary", "neet biology vocabulary", "botany definitions", "zoology terminology"],
    howToUse: [
      "Type any biological term (e.g., 'Phloem', 'Transcription', 'Nephron', 'Mitochondria') in the search bar.",
      "Or filter alphabetically using the A to Z navigation buttons.",
      "Filter by branch (Cell Biology, Genetics, Botany, Human Physiology, Ecology).",
      "Click any term card to view its core definition, key exam points, and related terms."
    ],
    example: {
      title: "Glossary Lookup: Transcription",
      scenario: "Definition: The process of copying genetic information from one strand of DNA into RNA.",
      steps: [
        "Key Points: Catalyzed by RNA Polymerase enzyme; occurs in the nucleus in eukaryotes.",
        "Related Terms: Translation, RNA Polymerase, Promoter, Exons, Introns."
      ],
      result: "Clean, High-Yield Concept Revision in 10 Seconds"
    },
    tips: [
      "Bookmark tricky terms like 'Parthenogenesis', 'Apomixis', and 'Eutrophication' for last-minute exam day revision.",
      "Learn the Latin and Greek roots of biological terms (e.g., 'photo-' = light, '-lysis' = breakdown) to deduce unfamiliar names."
    ],
    faqs: [
      {
        question: "Is this glossary suitable for NEET UG preparation?",
        answer: "Yes, it contains high-yield terminology frequently tested in NEET UG and CBSE Class 11 & 12 Board Examinations."
      }
    ],
    relatedToolSlugs: ["biology-concept-finder", "biology-mcq-generator", "physics-formula-finder", "chemistry-formula-finder"]
  },
  {
    id: "biology-concept-finder",
    slug: "biology-concept-finder",
    name: "Biology Concept Finder",
    category: "Science Tools",
    tagline: "Explore biological mechanisms, flowcharts, diagrams, and NCERT concepts",
    description: "Search and explore key biological mechanisms—from Photosynthesis (Light/Dark reactions) and DNA Replication to Cardiac Cycle and Reflex Arcs—with structured step-by-step breakdowns.",
    icon: "Microscope",
    keywords: ["biology concept finder", "photosynthesis mechanism", "dna replication steps", "human circulatory system notes", "neet biology concepts"],
    howToUse: [
      "Search for any concept name or select from popular NCERT topics.",
      "View the structured summary, sequential biological mechanism, key terms, and NEET high-yield exam tips.",
      "Explore related concepts with 1-click navigation."
    ],
    example: {
      title: "Concept: Cardiac Cycle (Human Circulatory System)",
      scenario: "Step-by-step breakdown of Joint Diastole, Atrial Systole, and Ventricular Systole.",
      steps: [
        "Duration: 0.8 seconds per cycle",
        "Step 1: Joint Diastole (All 4 chambers relaxed, AV valves open)",
        "Step 2: Atrial Systole (SAN fires impulse, atria contract, +30% blood into ventricles)",
        "Step 3: Ventricular Systole (AV valves close with 'LUB' sound, semilunar valves open)"
      ],
      result: "Complete Mechanism Mastered with Exam Tips"
    },
    tips: [
      "Always memorize the exact sequence of events for biological cycles like Krebs cycle, Calvin cycle, and Spermatogenesis.",
      "Draw simple flowcharts in 3-mark and 5-mark board exam answers to secure full marks."
    ],
    faqs: [
      {
        question: "Can I use these concept breakdowns for board answers?",
        answer: "Yes! The sequential step format is specifically organized to help you structure 3-mark and 5-mark subjective answers clearly."
      }
    ],
    relatedToolSlugs: ["biology-glossary", "biology-mcq-generator", "chemistry-formula-finder", "question-paper-generator"]
  },
  {
    id: "chemistry-formula-finder",
    slug: "chemistry-formula-finder",
    name: "Chemistry Formula Finder",
    category: "Science Tools",
    tagline: "Searchable formula sheets for Physical, Inorganic, and Organic Chemistry with SI units",
    description: "Comprehensive chemistry formula database covering Physical Chemistry equations (Thermodynamics, Electrochemistry, Solutions, Kinetics), Gas Laws, Molar Mass, and Organic Named Reactions.",
    icon: "FlaskConical",
    popular: true,
    keywords: ["chemistry formula finder", "chemistry formula sheet class 12", "physical chemistry formulas", "organic reaction formulas", "neet chemistry formulas"],
    howToUse: [
      "Search by formula name (e.g., 'Nernst Equation', 'Ideal Gas Equation', 'Arrhenius Equation', 'Molarity').",
      "Filter by branch: Physical Chemistry, Inorganic Chemistry, or Organic Chemistry.",
      "View the chemical formula, variable definitions with SI units, practical explanation, and example problem."
    ],
    example: {
      title: "Nernst Equation (Electrochemistry)",
      scenario: "Formula: E_cell = E°_cell - (0.0591 / n) × log10(Q) at 298 K",
      steps: [
        "E_cell: Electrode potential under non-standard conditions (Volts)",
        "E°_cell: Standard reduction potential (Volts)",
        "n: Number of electrons transferred in balanced redox reaction",
        "Q: Reaction quotient [Products] / [Reactants]"
      ],
      result: "Instant formula recall + variable checklist"
    },
    tips: [
      "Always check your units before plugging values into physical chemistry formulas (e.g., convert Celsius to Kelvin, L to m³).",
      "Keep a dedicated formula pocket notebook for daily 10-minute review."
    ],
    faqs: [
      {
        question: "Which chemistry formulas have the highest weightage in Class 12 CBSE & NEET?",
        answer: "Solutions (Raoult's Law & Colligative properties), Electrochemistry (Nernst Equation & Kohlrausch's Law), and Chemical Kinetics (Integrated rate laws & Half-life) account for over 70% of numerical questions."
      }
    ],
    relatedToolSlugs: ["physics-formula-finder", "biology-concept-finder", "marks-calculator", "percentage-calculator"]
  },
  {
    id: "physics-formula-finder",
    slug: "physics-formula-finder",
    name: "Physics Formula Finder",
    category: "Science Tools",
    tagline: "Complete formula directory for Mechanics, Optics, Electricity, Magnetism & Modern Physics",
    description: "Quickly look up Physics formulas, SI units, dimensional formulas, variable meanings, and example calculations for CBSE Class 9-12, JEE Main, and NEET physics.",
    icon: "Atom",
    popular: true,
    keywords: ["physics formula finder", "class 12 physics formula sheet", "jee physics formulas", "mechanics formulas", "optics formula finder"],
    howToUse: [
      "Search any physics law or equation (e.g., 'Coulomb Law', 'Lens Maker Formula', 'Photoelectric Equation', 'Ohm Law').",
      "Filter by topic: Mechanics, Electrostatics, Current Electricity, Magnetism, Optics, Thermodynamics, or Modern Physics.",
      "Review the mathematical formula, each variable's SI unit, conceptual explanation, and solved numerical example."
    ],
    example: {
      title: "Lens Maker's Formula (Ray Optics)",
      scenario: "Formula: 1/f = (μ - 1) × [ (1/R1) - (1/R2) ]",
      steps: [
        "f = Focal length of lens (meters, m)",
        "μ = Refractive index of lens material relative to surrounding medium",
        "R1, R2 = Radii of curvature of the two spherical surfaces (meters, with Cartesian sign convention)"
      ],
      result: "Direct formula reference with Cartesian sign convention guidance"
    },
    tips: [
      "In Physics numericals, Cartesian sign convention (+/-) is the #1 reason students lose marks—always draw a quick diagram first.",
      "Check dimensional consistency on both sides of your derived formulas."
    ],
    faqs: [
      {
        question: "How do I memorize physics formulas easily?",
        answer: "Understand the physical derivation rather than rote memorizing. Practice at least 3 numericals for every new formula you learn."
      }
    ],
    relatedToolSlugs: ["chemistry-formula-finder", "biology-concept-finder", "percentage-calculator", "daily-study-planner"]
  },
  {
    id: "ai-notes-generator",
    slug: "ai-notes-generator",
    name: "AI Notes Generator",
    category: "AI Study Tools",
    tagline: "Generate structured revision study notes with summaries, key points, and exam tips",
    description: "Create concise, student-friendly revision notes for any Indian school or competitive exam topic with summaries, key bullet points, essential terms, and quick revision mnemonics.",
    icon: "Sparkles",
    popular: true,
    badge: "AI Powered",
    keywords: ["ai notes generator", "study notes maker", "cbse revision notes ai", "ncert chapter summary maker", "ai study notes"],
    howToUse: [
      "Enter your topic or chapter name (e.g., 'Chemical Reactions and Equations', 'Human Eye', 'Newton Laws').",
      "Select your Class (Class 6 to 12 / NEET / JEE) and subject.",
      "Choose difficulty level and desired note length.",
      "Click 'Generate Notes' to create structured notes with summary, key points, definitions, and high-yield exam tips.",
      "Copy markdown or print for offline study."
    ],
    example: {
      title: "Generated Notes: 'Refraction of Light' (Class 10)",
      scenario: "Generates structured summary, Snell's Law equation, refractive index definition, real vs apparent depth, and 3 board practice questions.",
      steps: [
        "Input: Topic 'Refraction of Light', Class 10 Physics",
        "Output: 5 Structured Sections with high-yield exam bullet points"
      ],
      result: "Complete 1-Page Revision Sheet Ready in Seconds"
    },
    tips: [
      "Use generated notes as a post-study revision check after reading your NCERT textbook.",
      "Add personal annotations and teacher notes in the margins."
    ],
    faqs: [
      {
        question: "Are the notes aligned with the CBSE/NCERT curriculum?",
        answer: "Yes, the AI model is instructed to follow NCERT terminology, standard board formats, and Indian examination scoring patterns."
      }
    ],
    relatedToolSlugs: ["ai-mcq-generator", "ai-question-answer-generator", "ai-study-plan-generator", "pdf-summarizer"]
  },
  {
    id: "ai-mcq-generator",
    slug: "ai-mcq-generator",
    name: "AI MCQ Generator",
    category: "AI Study Tools",
    tagline: "Generate original practice MCQs with 4 options and detailed explanations",
    description: "Generate customized, original multiple choice questions on any topic, subject, and class with 4 options, correct answer keys, and pedagogical step-by-step explanations.",
    icon: "HelpCircle",
    badge: "AI Powered",
    keywords: ["ai mcq generator", "multiple choice question generator", "ai quiz maker", "neet mcq maker", "cbse practice mcqs"],
    howToUse: [
      "Enter the topic or chapter you want to test yourself on.",
      "Select your Class, Subject, and Difficulty level.",
      "Choose the number of questions (5, 10, or 15).",
      "Click 'Generate MCQs' and solve the questions interactively to test your retention."
    ],
    example: {
      title: "Topic: 'Photosynthesis' (Class 11 Botany)",
      scenario: "Generates 5 original MCQs testing light reactions, photophosphorylation, RuBisCO enzyme, and C4 pathways.",
      steps: [
        "Solve each question with instant feedback.",
        "Review detailed explanation for every option."
      ],
      result: "Interactive Self-Assessment Quiz with Score Breakdown"
    },
    tips: [
      "Take notes on every question you answer incorrectly in a dedicated 'Mistake Notebook'.",
      "Re-attempt the quiz after 3 days to test spaced retention."
    ],
    faqs: [
      {
        question: "Does the AI copy questions from copyrighted textbooks?",
        answer: "No. The AI generator produces original practice questions crafted to test the same syllabus concepts without reproducing copyrighted materials verbatim."
      }
    ],
    relatedToolSlugs: ["biology-mcq-generator", "ai-notes-generator", "ai-question-answer-generator", "question-paper-generator"]
  },
  {
    id: "ai-question-answer-generator",
    slug: "ai-question-answer-generator",
    name: "AI Question Answer Tutor",
    category: "AI Study Tools",
    tagline: "Get clear academic explanations, step-by-step solutions, and exam tips for student questions",
    description: "Ask any academic doubt or homework question and receive a structured explanation with a simple direct answer, step-by-step derivation/reasoning, key formulas, and exam precautions.",
    icon: "MessageSquare",
    badge: "AI Powered",
    keywords: ["ai question answer", "ai tutor for indian students", "homework solver", "cbse doubt solver", "science question explanation"],
    howToUse: [
      "Type or paste your academic question or doubt in the input box.",
      "Select your Class and Subject for context-appropriate depth.",
      "Click 'Explain Question' to receive a structured pedagogical answer.",
      "Review the simple answer, detailed steps, key formulas, and common pitfalls."
    ],
    example: {
      title: "Student Doubt: 'Why do stars twinkle but planets do not?'",
      scenario: "AI generates a direct answer (atmospheric refraction + point source vs extended source) + step-by-step physics reasoning + diagram description.",
      steps: [
        "1. Direct Answer: Stars are point sources of light located far away; atmospheric refraction causes fluctuating brightness.",
        "2. Detailed Steps: Atmospheric layers have continuously changing refractive indices...",
        "3. Exam Tip: Mention 'Point source vs Extended source' to get full marks in CBSE Class 10 Board exam."
      ],
      result: "Comprehensive Board-Exam Standard Answer"
    },
    tips: [
      "Always verify AI-generated answers for critical academic submissions and board exams against your official NCERT textbook.",
      "Frame specific questions (e.g., 'Explain the mechanism of...' or 'Derive the formula for...') for the highest quality response."
    ],
    faqs: [
      {
        question: "Can I ask questions from any subject?",
        answer: "Yes, you can ask questions from Physics, Chemistry, Biology, Mathematics, Social Science, English, and general competitive exam topics."
      }
    ],
    relatedToolSlugs: ["ai-notes-generator", "ai-mcq-generator", "biology-concept-finder", "question-paper-generator"]
  },
  {
    id: "ai-study-plan-generator",
    slug: "ai-study-plan-generator",
    name: "AI Study Plan Generator",
    category: "AI Study Tools",
    tagline: "Generate intelligent daily & weekly study masterplans tailored to your weak areas and exam date",
    description: "Generate an intelligent, personalized study roadmap based on your target exam, available hours, weak subjects, and revision milestones with daily hour-by-hour schedules and mock test pacing.",
    icon: "Compass",
    badge: "AI Powered",
    keywords: ["ai study plan generator", "personalized study timetable ai", "neet preparation roadmap", "board exam study strategy", "cbse master plan"],
    howToUse: [
      "Enter your Class/Target Exam (e.g., Class 12 CBSE Boards, NEET 2026, JEE Mains).",
      "Enter your list of subjects and your target exam date.",
      "Specify your daily available study hours, weak subjects, and strong subjects.",
      "Click 'Generate Masterplan' to receive a comprehensive daily and weekly timetable with revision and mock test milestones."
    ],
    example: {
      title: "60-Day CBSE Class 12 PCM Study Roadmap",
      scenario: "Student with 5 hours/day, weak in Organic Chemistry and Calculus.",
      steps: [
        "Phase 1 (Days 1-30): High-weightage weak chapters + NCERT theory",
        "Phase 2 (Days 31-45): Past 5-year sample papers & timed numericals",
        "Phase 3 (Days 46-60): Full syllabus mock tests & spaced formula revision"
      ],
      result: "Structured Multi-Phase Strategy with Daily Hourly Slots"
    },
    tips: [
      "Stick to the plan for at least 7 consecutive days to build a productive study habit.",
      "Adjust daily hours flexibly if school tests or lab practicals are scheduled."
    ],
    faqs: [
      {
        question: "How does the AI customize the schedule for weak subjects?",
        answer: "It allocates prime early-morning or high-energy evening focus slots to your weak subjects, paired with dedicated problem-solving blocks and extra revision intervals."
      }
    ],
    relatedToolSlugs: ["study-timetable-generator", "daily-study-planner", "revision-planner", "exam-countdown"]
  },
  {
    id: "pdf-summarizer",
    slug: "pdf-summarizer",
    name: "PDF Study Summarizer",
    category: "AI Study Tools",
    tagline: "Upload study notes, chapter PDFs, or text documents to generate executive summaries and key points",
    description: "Upload educational PDF files or paste study text to instantly extract core summaries, bulleted key insights, essential terms, and self-test questions. Processed securely with client-side text parsing.",
    icon: "FileText",
    badge: "AI Powered",
    keywords: ["pdf summarizer", "study notes summarizer", "pdf chapter summary", "ai document summarizer for students", "extract key points from pdf"],
    howToUse: [
      "Upload a PDF file (up to 10MB) via drag-and-drop or file selector, or paste textbook/article text directly.",
      "View extracted character count and file validation details.",
      "Click 'Summarize Document' to generate an executive overview, key concepts, important definitions, and self-test questions.",
      "Copy or export your revision summary."
    ],
    example: {
      title: "Summarizing an 8-page Chapter on 'Ecosystems'",
      scenario: "Extracts key trophic levels, energy flow 10% law, food webs, ecological pyramids, and biogeochemical cycles.",
      steps: [
        "1. Executive Overview in 3 clear sentences",
        "2. 8 Core Exam Bullet Points with bold terms",
        "3. Key Terms table (Autotrophs, Biomass, Eutrophication)",
        "4. Top 3 Practice Questions"
      ],
      result: "8-Page Chapter Condensed into a 2-Minute Revision Sheet"
    },
    tips: [
      "Ensure your PDF contains selectable text (not scanned images without text layer) for optimal extraction.",
      "Summarize one chapter at a time for the sharpest, highest-yield notes."
    ],
    faqs: [
      {
        question: "Are my uploaded PDF files stored or shared?",
        answer: "No. Your PDF text is parsed directly in your browser session for summary generation and is never permanently stored or shared."
      }
    ],
    relatedToolSlugs: ["ai-notes-generator", "ai-question-answer-generator", "ai-mcq-generator", "daily-study-planner"]
  },
  {
    id: "question-paper-generator",
    slug: "question-paper-generator",
    name: "NCERT Question Paper Generator",
    category: "Question Paper Tools",
    tagline: "Create authentic, customized practice question papers with sections, marking schemes, and answer keys",
    description: "Design comprehensive practice question papers for Class 1 to 12 across CBSE, NCERT, and State Boards with custom marks, durations, multi-section formats, answer keys, and print/PDF export.",
    icon: "FileSpreadsheet",
    popular: true,
    badge: "Flagship Tool",
    keywords: ["ncert question paper generator", "cbse sample paper maker", "practice question paper generator", "class 10 question paper maker", "class 12 test paper generator"],
    howToUse: [
      "Select your Class (Class 1 to 12) and Board (CBSE, NCERT, State Board).",
      "Choose your Subject (Mathematics, Science, Physics, Chemistry, Biology, Social Science, English, etc.).",
      "Select specific chapters/topics or Full Syllabus.",
      "Select desired question types (MCQs, Very Short Answer, Short Answer, Long Answer, Assertion-Reason, Case-Based).",
      "Set your Total Marks (e.g. 25, 40, 50, 70, 80, 100) and Duration (e.g. 1 Hour, 2 Hours, 3 Hours).",
      "Enter your School/Institution name and click 'Generate Question Paper'.",
      "Toggle the Answer Key & Solution guide, and use 'Print Paper' or 'Save as PDF'."
    ],
    example: {
      title: "Class 10 CBSE Science Periodic Test (40 Marks, 90 Mins)",
      scenario: "Sections: Section A (10 MCQs - 10M), Section B (4 VSA - 8M), Section C (4 Short Answer - 12M), Section D (2 Long Answer - 10M).",
      steps: [
        "Complete formatted header with Institution Name, Class, Subject, Time, and Max Marks.",
        "General Instructions numbered 1 to 4.",
        "Section-wise questions with marks clearly indicated.",
        "One-click complete Answer Key & Marking Scheme."
      ],
      result: "Official Board-Style Question Paper Ready for Print / Exam Practice"
    },
    tips: [
      "Teachers can generate unique periodic tests and unit revision assessments in under 1 minute.",
      "Students can generate timed mock papers to practice real exam time management before final board examinations."
    ],
    faqs: [
      {
        question: "Are these questions taken directly from NCERT exercises?",
        answer: "To respect copyright guidelines, all generated questions are original pedagogical practice questions designed around official NCERT learning objectives and standard CBSE blueprints."
      },
      {
        question: "Can I print the generated paper without web navigation elements?",
        answer: "Yes! The 'Print Question Paper' feature applies clean print CSS that formats the paper with proper page margins, headers, and watermark-free typography."
      }
    ],
    relatedToolSlugs: ["ai-mcq-generator", "biology-mcq-generator", "study-timetable-generator", "revision-planner"]
  }
];

export const ALL_TOOLS: (ToolMetadata & { title: string; metaDescription: string; isAiPowered: boolean })[] = TOOLS_DATA.map((t) => ({
  ...t,
  title: t.name,
  metaDescription: t.description,
  isAiPowered: t.category === "AI Study Tools" || t.slug.startsWith("ai-") || t.slug === "pdf-summarizer"
}));

export const CATEGORIES = [
  {
    id: "all",
    name: "All Tools",
    label: "All Tools (21)",
    description: "Complete directory of educational tools for Indian students.",
    icon: "LayoutGrid",
  },
  {
    id: "Calculator Tools",
    name: "Calculator Tools",
    label: "Calculators",
    description: "Percentage, CGPA, GPA, aggregate marks calculators, and exam eligibility age checkers.",
    icon: "Calculator",
  },
  {
    id: "Study Tools",
    name: "Study Tools",
    label: "Study & Planners",
    description: "Timetable generators, Pomodoro focus timers, daily task planners, and spaced revision schedules.",
    icon: "BookOpen",
  },
  {
    id: "Science Tools",
    name: "Science Tools",
    label: "Science & Formulas",
    description: "Biology MCQ generator, glossary, concept finder, and comprehensive Chemistry & Physics formula directories.",
    icon: "FlaskConical",
  },
  {
    id: "AI Study Tools",
    name: "AI Study Tools",
    label: "AI Study Assistants",
    description: "AI-powered notes generation, smart MCQ creation, question tutor, custom study plans, and PDF document summarization.",
    icon: "Sparkles",
  },
  {
    id: "Exam Tools",
    name: "Exam Tools",
    label: "Exam Tools",
    description: "Live countdown clocks for CBSE, NEET, JEE, and board exams with target score trackers.",
    icon: "Timer",
  },
  {
    id: "Question Paper Tools",
    name: "Question Paper Tools",
    label: "Question Papers",
    description: "Customized practice question paper creator for CBSE/NCERT Class 1–12 with answer keys and printable layouts.",
    icon: "FileSpreadsheet",
  },
];

