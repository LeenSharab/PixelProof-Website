import { useNavigate } from "react-router-dom";
import React from "react";
import "./Hero.css";

interface HeroProps {
  language: 'en' | 'ar';
}

const Hero: React.FC<HeroProps> = ({ language }) => {
  const navigate = useNavigate();

  const scrollToSection = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const translations = {
    en: {
      title: "Detect Image Manipulations with Ease",
      description:
        "Effortlessly verify the authenticity of images using our advanced detection technology. Identify edits, alterations, and manipulations with precision—empowering you to trust the visuals you see online.",
      getStarted: "Get Started!",
      learnMore: "Learn more ↓",
    },
    ar: {
      title: "اكتشف التلاعب في الصور بسهولة",
      description:
        "تحقق بسهولة من أصالة الصور باستخدام تقنيتنا المتقدمة في الكشف. حدد التعديلات والتغييرات بدقة — مما يمنحك الثقة في الصور التي تراها على الإنترنت.",
      getStarted: "ابدأ الآن!",
      learnMore: "اعرف المزيد ↓",
    },
  };

  const t = translations[language];

  return (
    <section className="section-hero">
      <div className="hero">
        {/* Text Section */}
        <div className="hero-text-box">
          <h1 className="heading-primary">{t.title}</h1>
          <p className="hero-description">{t.description}</p>
          <div className="hero-buttons">
            <button
              onClick={() => navigate("/upload")}
              className="btn btn--fill margin-right-btn"
            >
              {t.getStarted}
            </button>
            <button
              onClick={scrollToSection}
              className="btn btn--outline margin-right-btn"
            >
              {t.learnMore}
            </button>
          </div>
        </div>

        {/* Image Section */}
        <div className="hero-img-box">
          <img
            src="src/assets/hero.png"
            alt="Hero Section"
            className="hero-img"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
