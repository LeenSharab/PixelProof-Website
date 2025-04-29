import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultPanel from "../components/ResultPanel/ResultPanel";
import "../Pages/ResultPage.css";

interface ResultPageProps {
  language: "en" | "ar";
}

interface LocationState {
  prediction: string;
  limeImage: string;
  reportURL: string | null;
  fileName: string;
}

const ResultPage: React.FC<ResultPageProps> = ({ language }) => {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    if (!state) {
      navigate("/upload", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null; // Render nothing while redirecting

  const { prediction, limeImage, reportURL, fileName } = state as LocationState;

  return (
    <section className="result-page">
      <ResultPanel
        language={language}
        prediction={prediction}
        limeImage={limeImage}
        reportURL={reportURL}
        fileName={fileName}
      />
    </section>
  );
};

export default ResultPage;
