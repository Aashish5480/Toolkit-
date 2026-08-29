export type ToolCategory =
  | "Calculator Tools"
  | "Study Tools"
  | "Science Tools"
  | "AI Study Tools"
  | "Exam Tools"
  | "Question Paper Tools";

export interface ToolMetadata {
  id: string;
  slug: string;
  name: string;
  title?: string;
  category: ToolCategory;
  tagline: string;
  description: string;
  metaDescription?: string;
  isAiPowered?: boolean;
  icon: string;
  popular?: boolean;
  badge?: string;
  keywords: string[];
  howToUse: string[];
  example: {
    title: string;
    scenario: string;
    steps: string[];
    result: string;
  };
  tips: string[];
  faqs: { question: string; answer: string }[];
  relatedToolSlugs: string[];
}

export interface QuestionItem {
  id: number | string;
  question: string;
  type: "MCQ" | "VSA" | "Short Answer" | "Long Answer" | "Assertion & Reason" | "Case-based" | "Fill in the blanks" | "True/False";
  marks: number;
  options?: string[];
  correctAnswerIndex?: number;
  answerKey?: string;
  solution?: string;
  explanation?: string;
  chapter?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
}

export interface QuestionPaperSection {
  name: string;
  description: string;
  marksPerQuestion: number;
  totalMarks?: number;
  questions: QuestionItem[];
}

export interface GeneratedQuestionPaper {
  schoolName?: string;
  title?: string;
  subject?: string;
  grade?: string;
  board?: string;
  timeAllowed?: string;
  totalMarks?: number;
  instructions?: string[];
  header?: {
    schoolName: string;
    examTitle: string;
    subject: string;
    grade: string;
    board: string;
    timeAllowed: string;
    maxMarks: number;
    instructions: string[];
  };
  sections: QuestionPaperSection[];
}

export type QuestionPaper = GeneratedQuestionPaper;

export interface DailyTask {
  id: string;
  title: string;
  subject: string;
  priority: "High" | "Medium" | "Low";
  estimatedMinutes: number;
  completed: boolean;
  createdAt: number;
}

export interface RevisionItem {
  id: string;
  subject: string;
  topic: string;
  examDate: string;
  frequency: "Daily" | "Every 3 Days" | "Weekly" | "Bi-weekly";
  stage: number; // 0 to 4 revisions
  lastRevised?: string;
  nextRevision: string;
  completed: boolean;
}

export interface ExamCountdownItem {
  id: string;
  name: string;
  date: string;
  targetScore?: string;
}

export interface GlossaryTerm {
  term: string;
  category: string;
  classLevel: string;
  definition: string;
  keyPoints: string[];
  relatedTerms: string[];
  examRelevance: string;
}

export interface ScienceFormula {
  name: string;
  branch: "Physics" | "Chemistry";
  category: string;
  formula: string;
  latex?: string;
  variables: { symbol: string; meaning: string; unit: string }[];
  explanation: string;
  relatedFormulas: string[];
  exampleProblem?: {
    problem: string;
    given: string;
    solution: string;
    answer: string;
  };
}

export interface BiologyConcept {
  id: string;
  name: string;
  classLevel: string;
  chapter: string;
  summary: string;
  mechanism: string[];
  keyTerms: string[];
  neetTips: string;
  relatedConcepts: string[];
}
