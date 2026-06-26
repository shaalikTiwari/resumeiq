# ResumeIQ 🧠

An AI-powered resume analyzer that gives you an honest score, strengths, weaknesses, skill gaps vs the current job market, and 3 specific improvement suggestions.

**Live Demo:** https://resumeiq-gamma-two.vercel.app

## Features
- Upload any PDF resume
- AI analysis powered by Llama 3.3 (via Groq)
- Overall score out of 100 with label
- Strengths & weaknesses breakdown
- Skill gaps vs current job market
- 3 actionable improvement suggestions
- Keyword extraction
- Clean, screenshot-worthy results page

## Tech Stack
**Frontend:** React (Vite) · Tailwind CSS · Deployed on Vercel

**Backend:** Node.js · Express · Multer · pdfjs-dist · Groq SDK · Deployed on Render

## Local Setup

```bash
# Clone the repo
git clone https://github.com/shaalikTiwari/resumeiq.git
cd resumeiq

# Backend
cd server
npm install
# Create .env with PORT=5006 and GROQ_API_KEY=your_key
npm run dev

# Frontend (new terminal)
cd client
npm install
# Create .env.development with VITE_API_URL=http://localhost:5006
npm run dev
```

## Project Structure
```
resumeiq/
├── client/        # React + Vite frontend
└── server/        # Express backend
```

Built by Shaalik Tiwari