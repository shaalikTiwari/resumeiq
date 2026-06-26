const fs = require("fs");
const path = require("path");
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const dataBuffer = fs.readFileSync(filePath);

    // Extract text using pdfjs-dist
    const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
    const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(dataBuffer) });
    const pdfDoc = await loadingTask.promise;

    let resumeText = "";
    for (let i = 1; i <= pdfDoc.numPages; i++) {
      const page = await pdfDoc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }

    fs.unlinkSync(filePath);

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({ error: "Could not extract readable text from PDF." });
    }

    const prompt = `
You are an expert resume reviewer and career coach with deep knowledge of current tech hiring trends.

Analyze the following resume and return a JSON object with EXACTLY this structure (no extra text, no markdown, just raw JSON):

{
  "score": <number 0-100>,
  "scoreLabel": <"Weak" | "Average" | "Good" | "Strong" | "Excellent">,
  "summary": "<2-3 sentence overall assessment>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>"],
  "skillGaps": [
    { "skill": "<skill name>", "reason": "<why it matters in current job market>" },
    { "skill": "<skill name>", "reason": "<why it matters in current job market>" },
    { "skill": "<skill name>", "reason": "<why it matters in current job market>" }
  ],
  "suggestions": [
    { "title": "<short title>", "detail": "<specific actionable advice>" },
    { "title": "<short title>", "detail": "<specific actionable advice>" },
    { "title": "<short title>", "detail": "<specific actionable advice>" }
  ],
  "keywords": ["<keyword 1>", "<keyword 2>", "<keyword 3>", "<keyword 4>", "<keyword 5>"]
}

Score guide: 0-40 Weak, 41-60 Average, 61-75 Good, 76-88 Strong, 89-100 Excellent.
Be honest, specific, and practical. Reference actual content from the resume.

RESUME:
${resumeText}
    `.trim();

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
    });

    const rawContent = response.choices[0].message.content.trim();
    const cleaned = rawContent.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

    let analysis;
    try {
      analysis = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse failed:", cleaned);
      return res.status(500).json({ error: "AI returned malformed response", raw: cleaned });
    }

    res.json({ success: true, analysis });

  } catch (err) {
    console.error("Analyze error:", err.message);
    res.status(500).json({ error: "Failed to analyze resume", details: err.message });
  }
};

module.exports = { parseResume };