import React, { useEffect, useState } from "react";
import { FiDownload, FiEye, FiImage, FiInfo, FiAlertCircle } from "react-icons/fi";
import { supabase } from "../../supabaseClient";
import "./ResultPanel.css";

interface ResultPanelProps {
  prediction: string;
  limeImage: string;
  reportURL: string | null;
  fileName: string;
  uploadDate?: Date;
  language: 'en' | 'ar';
}

const ResultPanel: React.FC<ResultPanelProps> = ({
  prediction,
  limeImage,
  reportURL,
  fileName,
  uploadDate = new Date(),
  language,
}) => {
  const [planType, setPlanType] = useState<"free" | "premium" | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
  
        // If Supabase throws or returns null user
        if (authError || !user) {
          console.warn("User not found or unauthorized. Defaulting to 'free'.");
          setPlanType("free");
          return;
        }
  
        const { data, error: planError } = await supabase
          .from("users")
          .select("plan_type")
          .eq("id", user.id)
          .single();
  
        // Handle Supabase table read error
        if (planError) {
          console.warn("Plan fetch failed, defaulting to free:", planError.message);
          setPlanType("free");
        } else {
          setPlanType(data?.plan_type === "premium" ? "premium" : "free");
        }
  
      } catch (e) {
        console.error("Unexpected Supabase error:", e);
        setPlanType("free"); // Fallback if *anything* breaks
      }
    };
  
    fetchPlan();
  }, []);
  
  

  const translations = {
    en: {
      aiAnalysis: "AI Analysis Visualization",
      noVisualization: "No visualization available",
      metadata: "Image Metadata",
      fileName: "File Name:",
      uploadDate: "Upload Date:",
      duration: "Analysis Duration:",
      durationValue: "~10 seconds",
      detailedAnalysis: "Detailed Analysis",
      summary: (isAI: boolean) =>
        `Our deep analysis identified ${isAI ? "AI generation" : "authentic"} markers. Download the full report for comprehensive details.`,
      downloadReport: "Download Full Report",
      reportUnavailable: "Analysis report not available",
      freeHeader: "Free Plan Limitations",
      feature1: "Detailed LIME Visualizations",
      feature2: "Full Image Metadata",
      feature3: "Advanced Analysis Details",
      feature4: "Download Full Reports",
      cta: "Upgrade to Premium for full access to advanced image verification features.",
      unlockButton: "Unlock Premium Features",
    },
    ar: {
      aiAnalysis: "عرض تحليل الذكاء الاصطناعي",
      noVisualization: "لا يوجد تصور متاح",
      metadata: "بيانات الصورة",
      fileName: "اسم الملف:",
      uploadDate: "تاريخ الرفع:",
      duration: "مدة التحليل:",
      durationValue: "حوالي 10 ثوانٍ",
      detailedAnalysis: "تحليل مفصل",
      summary: (isAI: boolean) =>
        `كشف تحليلنا العميق عن علامات ${isAI ? "نشأة عبر الذكاء الاصطناعي" : "أصالة"}. قم بتنزيل التقرير الكامل لمزيد من التفاصيل.`,
      downloadReport: "تحميل التقرير الكامل",
      reportUnavailable: "تقرير التحليل غير متاح",
      freeHeader: "قيود الخطة المجانية",
      feature1: "تصورات LIME التفصيلية",
      feature2: "كامل بيانات الصورة",
      feature3: "تفاصيل تحليل متقدمة",
      feature4: "تحميل التقارير الكاملة",
      cta: "قم بالترقية إلى الباقة المميزة للوصول الكامل إلى ميزات التحقق من الصور.",
      unlockButton: "افتح الميزات المميزة",
    },
  };

  const t = translations[language];
  const label = prediction ? prediction.split("(")[0].trim() : "Unknown";
  const confidenceRaw = prediction?.match(/\(([^)]+)\)/)?.[1]?.trim() || "";

  const isAI = label?.toLowerCase().includes("ai");

  if (!planType) return null;

    return (
      <div className="result-panel">
        <div className="result-header-row">
          <div className="result-header">
            <div className="confidence-badge-wrapper">
              {confidenceRaw && (
                <div className={`confidence-badge ${isAI ? "ai" : "real"}`}>
                  {confidenceRaw}
                </div>
              )}
              <h3 className="result-heading">{label}</h3>
            </div>
          </div>
        </div>
  
        {planType === "premium" && (
          
          <div className="premium-content">
            <div className="report-summary">
              {/* LEFT: LIME IMAGE */}
              <div className="lime-preview">
                {limeImage ? (
                  <img src={limeImage} alt="AI Analysis Highlights" />
                ) : (
                  <div className="missing-data">
                    <FiAlertCircle /> {t.noVisualization}
                  </div>
                )}
              </div>
  
              {/* RIGHT: Both white boxes stacked */}
              <div className="right-column">
                <div className="metadata-grid">
                  <div className="metadata-item">
                    <span className="metadata-label">{t.fileName}</span>
                    <span className="metadata-value">{fileName}</span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">{t.uploadDate}</span>
                    <span className="metadata-value">
                      {uploadDate.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="metadata-item">
                    <span className="metadata-label">{t.duration}</span>
                    <span className="metadata-value">{t.durationValue}</span>
                  </div>
                </div>
  
                <div className="analysis-description">
                  {reportURL ? (
                    <p>{t.summary(isAI)}</p>
                  ) : (
                    <div className="missing-data">
                      <FiAlertCircle /> {t.reportUnavailable}
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            {/* SEPARATE download button below both boxes */}
            {reportURL && (
              <div className="download-button-wrapper">
                <a href={reportURL} download className="download-report">
                  <FiDownload /> {t.downloadReport}
                </a>
              </div>
            )}
          </div>
        )}
  
        {planType === "free" && (
          <div className="upgrade-card">
            <div className="upgrade-header">
              <FiAlertCircle className="upgrade-icon" />
              <h4>{t.freeHeader}</h4>
            </div>
  
            <div className="premium-features-list">
              <div className="feature-item">
                <FiEye className="feature-icon" />
                <span>{t.feature1}</span>
              </div>
              <div className="feature-item">
                <FiImage className="feature-icon" />
                <span>{t.feature2}</span>
              </div>
              <div className="feature-item">
                <FiInfo className="feature-icon" />
                <span>{t.feature3}</span>
              </div>
              <div className="feature-item">
                <FiDownload className="feature-icon" />
                <span>{t.feature4}</span>
              </div>
            </div>
  
            <p className="upgrade-cta">{t.cta}</p>
            <a href="/pricing" className="upgrade-button">
              {t.unlockButton}
            </a>
          </div>
        )}
      </div>
    );
  };
  
export default ResultPanel;
