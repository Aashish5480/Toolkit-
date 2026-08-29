import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Lazy initialization of Gemini API
let aiClient: GoogleGenAI | null = null;

function getAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Resilient fallback across valid models
async function generateWithFallback(ai: GoogleGenAI, params: { contents: any; config?: any }) {
  const models = ["gemini-3.7-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];
  let lastError: any = null;

  for (const model of models) {
    try {
      const response = await ai.models.generateContent({
        ...params,
        model,
      });
      if (response && response.text) {
        return response;
      }
    } catch (err: any) {
      lastError = err;
      console.warn(`Model ${model} attempt encountered: ${err.message || err}. Trying next fallback model.`);
    }
  }
  throw lastError || new Error("AI generation failed across all available models");
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    aiConfigured: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Notes Generator
const handleNotesRequest = async (req: express.Request, res: express.Response) => {
  try {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({
        error: "AI generation is currently unavailable. Please configure GEMINI_API_KEY in Settings > Secrets.",
      });
    }

    const { topic, grade, subject, difficulty, length, format } = req.body;
    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = `You are an elite Indian academic master tutor and NCERT/CBSE curriculum specialist.
Create comprehensive, high-yield revision study notes for:
Topic: "${topic}"
Subject: ${subject || "Science"}
Target Class/Grade: ${grade || "Class 10"}
Difficulty Level: ${difficulty || "Standard"}
Format Preference: ${format || length || "Detailed Revision Notes"}

Please structure your response with clean, well-formatted Markdown:
# 📚 ${topic} — Comprehensive Study Notes
**Subject:** ${subject || "Science"} | **Target Level:** ${grade || "Class 10"} | **Board:** CBSE / NCERT Standard

---

## 📌 1. Core Summary & Fundamental Concept
(A clear, student-friendly explanation of the fundamental concept with real-world application)

## 🔑 2. Key Principles & NCERT High-Yield Points
(High-yield bullet points with bold keywords, core facts, and essential board exam highlights)

## 📖 3. Important Scientific Definitions & Terminology
(Exact definitions of all technical terms and glossary concepts)

## 💡 4. Important Formulas / Chemical Equations / Schematics (if applicable)
(Clear formulas with SI units, variable symbols, or balanced chemical/biological reactions)

## ⚡ 5. Quick Revision Cheatsheet & Common Pitfalls
(Crucial exam traps to avoid, NCERT exemplar insights, and memory mnemonics)

## ❓ 6. Top 3 High-Yield Practice Questions with Model Solutions
(Original CBSE-style practice questions with step-by-step answers)`;

    const response = await generateWithFallback(ai, {
      contents: prompt,
    });

    const content = response.text || "";
    return res.json({ notes: content, content });
  } catch (err: any) {
    console.error("AI Notes Error:", err);
    return res.status(500).json({ error: err.message || "Failed to generate notes" });
  }
};
app.post("/api/ai/notes", handleNotesRequest);
app.post("/api/ai/generate-notes", handleNotesRequest);

// AI MCQ Generator
const handleMcqRequest = async (req: express.Request, res: express.Response) => {
  try {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({
        error: "AI generation is currently unavailable. Please configure GEMINI_API_KEY in Settings > Secrets.",
      });
    }

    const { topic, grade, subject, difficulty, count, chapter } = req.body;
    const effectiveTopic = topic || chapter || "NCERT Science";
    const numQ = Math.min(Math.max(Number(count) || 5, 1), 20);

    const prompt = `You are an expert Indian examination question setter (CBSE/NEET/JEE/NCERT).
Generate ${numQ} ORIGINAL practice multiple-choice questions for:
Topic / Chapter: "${effectiveTopic}"
Subject: ${subject || "Science"}
Class / Level: ${grade || "Class 10"}
Difficulty: ${difficulty || "Medium"}

IMPORTANT RULES:
1. Do NOT reproduce copyrighted textbook questions verbatim. Create original pedagogical practice questions.
2. Provide exactly 4 options per question.
3. Include clear reasoning for why the correct option is right.

Return ONLY a valid JSON array matching this exact schema without any markdown backticks:
[
  {
    "id": 1,
    "question": "Question text here...",
    "type": "MCQ",
    "marks": 1,
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswerIndex": 0,
    "answerKey": "A",
    "explanation": "Clear explanation of the concept and why option A is correct.",
    "solution": "Clear explanation of the concept and why option A is correct."
  }
]`;

    const response = await generateWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let rawText = response.text || "[]";
    rawText = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const questions = JSON.parse(rawText);
    return res.json({ mcqs: questions, questions });
  } catch (err: any) {
    console.error("AI MCQ Error:", err);
    return res.status(500).json({ error: err.message || "Failed to generate MCQs" });
  }
};
app.post("/api/ai/mcq", handleMcqRequest);
app.post("/api/ai/generate-mcqs", handleMcqRequest);
app.post("/api/ai/generate-biology-mcqs", handleMcqRequest);

// AI Question Answer Generator / Doubt Solver
const handleQaRequest = async (req: express.Request, res: express.Response) => {
  try {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({
        error: "AI generation is currently unavailable. Please configure GEMINI_API_KEY in Settings > Secrets.",
      });
    }

    const { question, grade, subject, marks } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const marksFormatted = marks ? `${marks} Marks Question Format` : "CBSE Standard Format";

    const prompt = `You are a helpful, top-tier academic tutor for Indian school & competitive exam students (CBSE/NCERT/State Boards/NEET/JEE).
Student Question: "${question}"
Subject: ${subject || "General Academic"}
Target Level: ${grade || "Class 10"}
Marking Weightage: ${marksFormatted}

Please provide a structured, academically sound response with:
### 1. Direct Summary Answer (1-2 crisp sentences)
### 2. Step-by-Step Explanation & Principles (Clear reasoning or mathematical/chemical derivation)
### 3. Key Highlights & High-Yield Formulas (Bullet points of essential facts and SI units)
### 4. Solved Example / Real-World Illustration
### 5. Exam Tip & Common Mistakes to Avoid (Board marking scheme criteria)

Keep it encouraging, precise, and pedagogical.`;

    const response = await generateWithFallback(ai, {
      contents: prompt,
    });

    const answer = response.text || "";
    return res.json({ answer });
  } catch (err: any) {
    console.error("AI QA Error:", err);
    return res.status(500).json({ error: err.message || "Failed to answer question" });
  }
};
app.post("/api/ai/qa", handleQaRequest);
app.post("/api/ai/solve-doubt", handleQaRequest);

// AI Study Plan Generator
const handleStudyPlanRequest = async (req: express.Request, res: express.Response) => {
  try {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({
        error: "AI generation is currently unavailable. Please configure GEMINI_API_KEY in Settings > Secrets.",
      });
    }

    const { grade, subjects, examDate, dailyHours, weakSubjects, strongSubjects, exam, days, prepLevel, hoursPerDay } = req.body;

    const targetExam = exam || examDate || `Class ${grade || 10} Examination`;
    const totalHours = hoursPerDay || dailyHours || 5;
    const targetDays = days || 30;

    const prompt = `You are an expert Indian academic counselor and strategy coach for CBSE/Board/NEET/JEE students.
Create a personalized, realistic, and highly practical daily & weekly study timetable.
Student Details:
- Target Exam: ${targetExam}
- Days Remaining: ${targetDays} Days
- Preparation Stage: ${prepLevel || "Standard"}
- Daily Study Commitment: ${totalHours} Hours/Day
- Subjects to Cover: ${Array.isArray(subjects) ? subjects.join(", ") : subjects || "All core syllabus subjects"}
- Weak Areas Needing Extra Focus: ${weakSubjects || "Key numerical and conceptual chapters"}
- Strong Areas: ${strongSubjects || "Standard revision topics"}

Generate a detailed study masterplan in Markdown with:
# 🎯 ${targetDays}-Day Strategic Exam Preparation Masterplan
**Target Exam:** ${targetExam} | **Daily Hours:** ${totalHours} Hours/Day

---

### Phase 1: High-Weightage & Weak Topic Mastery (Days 1 to ${Math.floor(targetDays * 0.4)})
- **Core Focus:** Deep concept clearance, NCERT intext questions, and formula sheets.
- **Daily Time Allocation:** 
  - Slot 1: Intensive theory and derivation practice
  - Slot 2: Numerical problems and previous year questions (PyQs)

### Phase 2: Mixed Subject Drill & High-Yield PyQs (Days ${Math.floor(targetDays * 0.4) + 1} to ${Math.floor(targetDays * 0.75)})
- **Core Focus:** Full syllabus speed drills, assertion-reason practice, and diagram labeling.
- **Daily Rotation Table:** Alternating major and minor subjects with 25-minute Pomodoro intervals.

### Phase 3: Timed Full-Length Mock Exams & Rapid Revision (Days ${Math.floor(targetDays * 0.75) + 1} to ${targetDays})
- **Core Focus:** 3-Hour exam simulation, error notebook analysis, and formula memorization.

### 🚀 Top 5 Golden Strategy Tips for Board/Competitive Success`;

    const response = await generateWithFallback(ai, {
      contents: prompt,
    });

    const plan = response.text || "";
    return res.json({ plan });
  } catch (err: any) {
    console.error("AI Study Plan Error:", err);
    return res.status(500).json({ error: err.message || "Failed to generate study plan" });
  }
};
app.post("/api/ai/study-plan", handleStudyPlanRequest);
app.post("/api/ai/generate-study-plan", handleStudyPlanRequest);

// PDF / Text Summarizer
const handleSummarizeRequest = async (req: express.Request, res: express.Response) => {
  try {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({
        error: "AI generation is currently unavailable. Please configure GEMINI_API_KEY in Settings > Secrets.",
      });
    }

    const { text, filename, format } = req.body;
    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text content provided for summarization" });
    }

    const trimmedText = text.slice(0, 30000); // limit to reasonable length

    const prompt = `You are a master study assistant and curriculum expert. Summarize the following educational text from document "${filename || "Study Material"}" (Format: ${format || "Standard"}):

Text:
"""
${trimmedText}
"""

Provide a clean, structured study summary in Markdown with:
### 📌 1. Executive Summary
(A concise 3-4 sentence overview of the central theme)

### 🔑 2. Essential Key Concepts & Insights
(Well-organized bullet points covering all fundamental ideas)

### 📖 3. Important Scientific / Academic Terminology
(Clear definitions of key terms mentioned in the text)

### ⚡ 4. Quick Revision Cheatsheet & Formulas
(Formulas, laws, relationships, or flowcharts)

### 💡 5. Top 3 Self-Test Questions with Answers
(Self-evaluation questions to verify understanding)`;

    const response = await generateWithFallback(ai, {
      contents: prompt,
    });

    const summary = response.text || "";
    return res.json({ summary });
  } catch (err: any) {
    console.error("AI Summarizer Error:", err);
    return res.status(500).json({ error: err.message || "Failed to summarize text" });
  }
};
app.post("/api/ai/summarize", handleSummarizeRequest);
app.post("/api/ai/summarize-text", handleSummarizeRequest);

// AI Question Paper Generator
app.post("/api/ai/question-paper", async (req, res) => {
  try {
    const ai = getAI();
    if (!ai) {
      return res.status(503).json({
        error: "AI generation is currently unavailable. Please configure the AI provider in Settings > Secrets.",
      });
    }

    const { grade, board, subject, chapter, difficulty, questionTypes, numQuestions, totalMarks, duration, schoolName } = req.body;

    const prompt = `You are an elite Indian examination board paper setter (CBSE/NCERT).
Create a complete, authentic, balanced PRACTICE QUESTION PAPER with original questions (do NOT copy copyrighted NCERT exercises verbatim).

Configuration:
- Institution Name: ${schoolName || "MODERN PUBLIC SCHOOL / PRACTICE TEST"}
- Class: Class ${grade || "10"}
- Board: ${board || "CBSE"}
- Subject: ${subject || "Science"}
- Topic / Chapters: ${chapter || "All Syllabus"}
- Difficulty: ${difficulty || "Standard / Mixed"}
- Target Total Questions: ${numQuestions || 15}
- Maximum Marks: ${totalMarks || 50}
- Duration: ${duration || "2 Hours"}
- Included Question Types: ${Array.isArray(questionTypes) ? questionTypes.join(", ") : "MCQs, Short Answer, Long Answer"}

Return ONLY a valid JSON object matching this exact schema:
{
  "header": {
    "schoolName": "${schoolName || 'STUDENT TOOLKIT INDIA PRACTICE ASSESSMENT'}",
    "examTitle": "CLASS ${grade || 10} ${subject ? subject.toUpperCase() : 'SCIENCE'} PERIODIC ASSESSMENT",
    "subject": "${subject || 'Science'}",
    "grade": "Class ${grade || 10}",
    "board": "${board || 'CBSE'}",
    "timeAllowed": "${duration || '2 Hours'}",
    "maxMarks": ${Number(totalMarks) || 50},
    "instructions": [
      "All questions are compulsory.",
      "The question paper contains multiple sections.",
      "Internal choices may be provided in short and long answer questions.",
      "Use of calculators is strictly prohibited."
    ]
  },
  "sections": [
    {
      "name": "Section A",
      "description": "Multiple Choice Questions (1 Mark each)",
      "marksPerQuestion": 1,
      "questions": [
        {
          "id": 1,
          "question": "Question text...",
          "type": "MCQ",
          "marks": 1,
          "options": ["A) ...", "B) ...", "C) ...", "D) ..."],
          "answerKey": "A",
          "solution": "Detailed reasoning for answer..."
        }
      ]
    }
  ]
}`;

    const response = await generateWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    let rawText = response.text || "{}";
    rawText = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const paper = JSON.parse(rawText);
    return res.json({ paper });
  } catch (err: any) {
    console.error("AI Question Paper Error:", err);
    return res.status(500).json({ error: err.message || "Failed to generate question paper" });
  }
});

// Robots.txt
app.get("/robots.txt", (_req, res) => {
  res.type("text/plain");
  res.send(`User-agent: *
Allow: /

Sitemap: https://studenttoolkit.in/sitemap.xml
`);
});

// Sitemap.xml
app.get("/sitemap.xml", (_req, res) => {
  const baseUrl = "https://studenttoolkit.in";
  const routes = [
    "",
    "/tools",
    "/tools/percentage-calculator",
    "/tools/cgpa-calculator",
    "/tools/gpa-calculator",
    "/tools/marks-calculator",
    "/tools/age-calculator",
    "/tools/study-timetable-generator",
    "/tools/exam-countdown",
    "/tools/pomodoro-timer",
    "/tools/daily-study-planner",
    "/tools/revision-planner",
    "/tools/biology-mcq-generator",
    "/tools/biology-glossary",
    "/tools/biology-concept-finder",
    "/tools/chemistry-formula-finder",
    "/tools/physics-formula-finder",
    "/tools/ai-notes-generator",
    "/tools/ai-mcq-generator",
    "/tools/ai-question-answer-generator",
    "/tools/ai-study-plan-generator",
    "/tools/pdf-summarizer",
    "/question-paper-generator",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/disclaimer",
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}${r}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${r === "" ? "1.0" : r === "/question-paper-generator" ? "0.9" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.type("application/xml");
  res.send(sitemapXml);
});

// Start Server & mount Vite
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Student Toolkit India running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
