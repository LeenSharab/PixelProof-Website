import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "primereact/button";
import Navbar from "../components/Navbar/Navbar";  
import Footer from "../components/Footer/Footer";  
import "primeicons/primeicons.css"; 
import "./Pricing.css"; 

interface PricingProps {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
}

const translations = {
  en: {
    title: "Pricing Plans",
    subtitle: "Choose the plan that best suits your image analysis needs.",
    free: "Free",
    perMonth: "per month",
    getStarted: "Get Started",
    upgrade: "Upgrade Now",
    plans: [
      {
        name: "Freemium",
        description: "Basic image analysis for free, with limited features.",
        features: [
          "Basic image manipulation detection",
          "Limited monthly scans",
        ],
      },
      {
        name: "Premium",
        description: "Includes detailed reports and additional features.",
        features: [
          "Advanced image manipulation detection",
          "Unlimited scans per month",
          "Detailed analysis",
          "Priority customer support",
        ],
      },
    ],
  },
  ar: {
    title: "خطط الأسعار",
    subtitle: "اختر الخطة التي تناسب احتياجاتك لتحليل الصور.",
    free: "مجانية",
    perMonth: "شهريًا",
    getStarted: "ابدأ الآن",
    upgrade: "ترقية الآن",
    plans: [
      {
        name: "مجانية",
        description: "تحليل أساسي للصور مجانًا، مع ميزات محدودة.",
        features: [
          "كشف أساسي للتلاعب بالصور",
          "عدد محدود من الفحوصات شهريًا",
        ],
      },
      {
        name: "مميزة",
        description: "تشمل تقارير مفصلة وميزات إضافية.",
        features: [
          "كشف متقدم للتلاعب بالصور",
          "فحوصات غير محدودة شهريًا",
          "تحليل مفصل",
          "دعم فني ذو أولوية",
        ],
      },
    ],
  },
};

const Pricing: React.FC<PricingProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <>
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <div className="pricing-container">
        <h1 className="pricing-title">{t.title}</h1>
        <p className="pricing-subtitle">{t.subtitle}</p>

        <div className="pricing-grid two-plans">
          {t.plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${index === 0 ? "freemium-box" : "premium-box"}`}>
              <h2 className="plan-name">{plan.name}</h2>
              <p className="plan-description">{plan.description}</p>
              <p className="plan-price">
                {index === 0 ? (
                  <strong>{t.free}</strong>
                ) : (
                  <>
                    <strong>$10</strong>
                    <span className="per-month"> {t.perMonth}</span>
                  </>
                )}
              </p>

              <ul className="plan-features">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    <i className="pi pi-check-circle feature-icon"></i>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => navigate("/upload")}
                label={index === 0 ? t.getStarted : t.upgrade}
                className={`buy-now-btn primary`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Pricing;