const fs = require("fs");
const path = require("path");

const parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No PDF file uploaded" });
    }

    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    const dataBuffer = fs.readFileSync(filePath);

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

    res.json({
      success: true,
      message: "PDF parsed successfully",
      characterCount: resumeText.length,
      preview: resumeText.substring(0, 500),
    });

  } catch (err) {
    console.error("Parse error:", err.message);
    res.status(500).json({ error: "Failed to parse resume", details: err.message });
  }
};

module.exports = { parseResume };