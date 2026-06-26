import { useState } from "react";
import UploadPage from "./components/UploadPage";
import ResultsPage from "./components/ResultsPage";
import LoadingPage from "./components/LoadingPage";

export default function App() {
  const [stage, setStage] = useState("upload"); // upload | loading | results
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setStage("loading");
    setError(null);

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || "Something went wrong");
        setStage("upload");
        return;
      }

      setAnalysis(data.analysis);
      setStage("results");
    } catch (err) {
      setError("Could not connect to server. Make sure the backend is running.");
      setStage("upload");
    }
  };

  const handleReset = () => {
    setStage("upload");
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen">
      {stage === "upload" && <UploadPage onUpload={handleUpload} error={error} />}
      {stage === "loading" && <LoadingPage />}
      {stage === "results" && <ResultsPage analysis={analysis} onReset={handleReset} />}
    </div>
  );
}