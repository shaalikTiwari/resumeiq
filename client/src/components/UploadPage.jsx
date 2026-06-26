import { useState, useCallback } from "react";

export default function UploadPage({ onUpload, error }) {
  const [dragging, setDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    }
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (selectedFile) onUpload(selectedFile);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #1a1040 0%, #0a0a0f 70%)" }}>

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-purple-300 mb-6">
          <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse inline-block"></span>
          AI-Powered Resume Analysis
        </div>
        <h1 className="text-5xl font-bold mb-4 tracking-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <span className="text-white">Resume</span>
          <span style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>IQ</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-md mx-auto leading-relaxed">
          Drop your resume and get an honest AI analysis — score, strengths, gaps, and exactly what to fix.
        </p>
      </div>

      {/* Upload Box */}
      <div className="w-full max-w-lg">
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className="relative rounded-2xl border-2 border-dashed transition-all duration-300 p-12 text-center cursor-pointer"
          style={{
            borderColor: dragging ? "#a78bfa" : selectedFile ? "#60a5fa" : "#2d2d3d",
            background: dragging ? "rgba(167,139,250,0.05)" : "rgba(255,255,255,0.02)",
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />

          {selectedFile ? (
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(96,165,250,0.15)" }}>
                <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-blue-300 font-medium text-lg">{selectedFile.name}</p>
              <p className="text-slate-500 text-sm mt-1">{(selectedFile.size / 1024).toFixed(0)} KB · Click to change</p>
            </div>
          ) : (
            <div>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(167,139,250,0.1)" }}>
                <svg className="w-7 h-7 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-white font-medium text-lg mb-1">Drop your resume here</p>
              <p className="text-slate-500 text-sm">or click to browse · PDF only · Max 5MB</p>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-sm">
            {error}
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedFile}
          className="w-full mt-4 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          style={{
            background: selectedFile
              ? "linear-gradient(135deg, #7c3aed, #2563eb)"
              : "#1e1e2e",
          }}
        >
          Analyze Resume →
        </button>

        <p className="text-center text-slate-600 text-xs mt-4">
          Your resume is never stored · Analysis takes 5–10 seconds
        </p>
      </div>
    </div>
  );
}