import { useEffect, useState } from "react";

const steps = [
  "Extracting resume content...",
  "Identifying your skills and experience...",
  "Comparing against current job market trends...",
  "Generating your personalized report...",
];

export default function LoadingPage() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "radial-gradient(ellipse at 50% 0%, #1a1040 0%, #0a0a0f 70%)" }}>

      {/* Spinner */}
      <div className="relative w-20 h-20 mb-10">
        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-400 animate-spin" style={{ animationDuration: "1.5s", animationDirection: "reverse" }}></div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Analyzing your resume
      </h2>
      <p className="text-slate-400 mb-10 text-sm">This takes about 5–10 seconds</p>

      {/* Steps */}
      <div className="space-y-3 w-full max-w-sm">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 transition-all duration-500"
            style={{ opacity: i <= currentStep ? 1 : 0.25 }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: i < currentStep ? "#7c3aed" : i === currentStep ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)", border: i === currentStep ? "2px solid #7c3aed" : "none" }}>
              {i < currentStep && (
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
            <span className="text-sm" style={{ color: i <= currentStep ? "#e2e8f0" : "#475569" }}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}