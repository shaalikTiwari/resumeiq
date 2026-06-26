export default function ResultsPage({ analysis, onReset }) {
    const {
      score, scoreLabel, summary,
      strengths, weaknesses, skillGaps,
      suggestions, keywords
    } = analysis;
  
    const scoreColor = score >= 89 ? "#22c55e" : score >= 76 ? "#60a5fa" : score >= 61 ? "#a78bfa" : score >= 41 ? "#f59e0b" : "#ef4444";
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (score / 100) * circumference;
  
    return (
      <div className="min-h-screen px-4 py-12"
        style={{ background: "radial-gradient(ellipse at 50% 0%, #1a1040 0%, #0a0a0f 70%)" }}>
        <div className="max-w-4xl mx-auto">
  
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Resume<span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IQ</span>
              <span className="text-slate-500 text-lg font-normal ml-2">· Analysis Report</span>
            </h1>
            <button onClick={onReset}
              className="px-4 py-2 rounded-lg text-sm text-slate-400 border border-white/10 hover:border-white/20 hover:text-white transition-all">
              ← Analyze Another
            </button>
          </div>
  
          {/* Score + Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Score Ring */}
            <div className="rounded-2xl p-6 flex flex-col items-center justify-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <svg width="140" height="140" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <circle cx="60" cy="60" r="54" fill="none" stroke={scoreColor} strokeWidth="10"
                  strokeDasharray={circumference} strokeDashoffset={offset}
                  strokeLinecap="round" transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dashoffset 1s ease" }} />
                <text x="60" y="55" textAnchor="middle" fill="white" fontSize="26" fontWeight="700" fontFamily="Space Grotesk">{score}</text>
                <text x="60" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10">/100</text>
              </svg>
              <span className="text-lg font-semibold mt-1" style={{ color: scoreColor }}>{scoreLabel}</span>
            </div>
  
            {/* Summary */}
            <div className="md:col-span-2 rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">Overall Assessment</p>
              <p className="text-slate-300 leading-relaxed">{summary}</p>
  
              {/* Keywords */}
              <div className="flex flex-wrap gap-2 mt-4">
                {keywords.map((kw, i) => (
                  <span key={i} className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ background: "rgba(167,139,250,0.1)", color: "#a78bfa", border: "1px solid rgba(167,139,250,0.2)" }}>
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </div>
  
          {/* Strengths + Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Strengths */}
            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Strengths</p>
              <div className="space-y-3">
                {strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(34,197,94,0.15)" }}>
                      <svg className="w-3 h-3" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed">{s}</p>
                  </div>
                ))}
              </div>
            </div>
  
            {/* Weaknesses */}
            <div className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Areas to Improve</p>
              <div className="space-y-3">
                {weaknesses.map((w, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(239,68,68,0.15)" }}>
                      <svg className="w-3 h-3" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </span>
                    <p className="text-slate-300 text-sm leading-relaxed">{w}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          {/* Skill Gaps */}
          <div className="rounded-2xl p-6 mb-6"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Skill Gaps vs Job Market</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {skillGaps.map((gap, i) => (
                <div key={i} className="rounded-xl p-4"
                  style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.15)" }}>
                  <p className="text-amber-400 font-semibold text-sm mb-1">{gap.skill}</p>
                  <p className="text-slate-400 text-xs leading-relaxed">{gap.reason}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* Suggestions */}
          <div className="rounded-2xl p-6 mb-8"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Top 3 Improvements</p>
            <div className="space-y-4">
              {suggestions.map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)", color: "white" }}>
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">{s.title}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{s.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Footer */}
          <div className="text-center">
            <button onClick={onReset}
              className="px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #7c3aed, #2563eb)" }}>
              Analyze Another Resume
            </button>
            <p className="text-slate-600 text-xs mt-4">Powered by Llama 3.3 · Built with ResumeIQ</p>
          </div>
        </div>
      </div>
    );
  }