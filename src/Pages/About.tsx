import React from 'react';
import { useNavigate } from "react-router-dom";
import './About.css';
import logoImg from '../assets/logo.jpg';
import visionImg from '../assets/vission.jpg'; // note: check if it's "vision" or "vission"
import missionImg from '../assets/mission.webp';


interface AboutProps {
  language: 'en' | 'ar';
}

const About: React.FC<AboutProps> = ({ language }) => {
  const navigate = useNavigate();

  const t = {
    en: {
      aboutTitle: "About PixelProof",
      aboutText:
        "We're pioneers in digital authenticity, combining advanced AI algorithms with forensic analysis to detect image manipulation. Our platform empowers organizations and individuals to verify media integrity with confidence.",
      visionTitle: "Our Vision",
      visionText:
        "To be the leading provider of AI-driven image verification, ensuring authenticity in the digital world by leveraging deep learning and metadata analysis.",
      missionTitle: "Core Mission",
      missionText:
        "Our mission is to provide cutting-edge technology to detect and prevent image manipulation, offering tools for journalists, businesses, and users to ensure media integrity.",
      ctaTitle: "Digital Trust Starts Here!",
      ctaText:
        "Revolutionizing image verification for journalists, businesses, and creators.",
      ctaButton: "Get Started!",
    },
    ar: {
      aboutTitle: "عن PixelProof",
      aboutText:
        "نحن رواد في مجال الأصالة الرقمية، حيث ندمج خوارزميات الذكاء الاصطناعي المتقدمة مع التحليل الجنائي لاكتشاف التلاعب بالصور. منصتنا تمكّن المؤسسات والأفراد من التحقق من نزاهة الوسائط بثقة.",
      visionTitle: "رؤيتنا",
      visionText:
        "أن نكون المزود الرائد لحلول التحقق من الصور بالاعتماد على الذكاء الاصطناعي، لضمان الأصالة في العالم الرقمي باستخدام التعلم العميق وتحليل البيانات الوصفية.",
      missionTitle: "مهمتنا الأساسية",
      missionText:
        "مهمتنا هي توفير تكنولوجيا متقدمة للكشف عن التلاعب بالصور ومنعه، وتقديم أدوات للصحفيين والشركات والمستخدمين لضمان نزاهة الوسائط.",
      ctaTitle: "الثقة الرقمية تبدأ من هنا!",
      ctaText:
        "ثورة في التحقق من الصور للصحفيين والشركات والمبدعين.",
      ctaButton: "ابدأ الآن!",
    },
  }[language];

  return (
    <main className="about-page">
      {/* About Us Section */}
      <section className="section about-section">
        <div className="container">
          <div className="section-grid">
            <div className="image-wrapper">
            <img className="section-image" src={logoImg} alt="Team working on digital verification" />
            </div>
            <div className="content-wrapper">
              <h2 className="section-title">{t.aboutTitle}</h2>
              <p className="section-text">{t.aboutText}</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Vision Section */}
      <section className="section vision-section">
        <div className="container">
          <div className="section-grid reverse">
            <div className="content-wrapper">
              <h2 className="section-title">{t.visionTitle}</h2>
              <p className="section-text">{t.visionText}</p>
            </div>
            <div className="image-wrapper">
            <img className="section-image" src={visionImg} alt="Futuristic digital vision" />
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Mission Section */}
      <section className="section mission-section">
        <div className="container">
          <div className="section-grid">
            <div className="image-wrapper">
            <img className="section-image" src={missionImg} alt="Team collaborating on project" />
            </div>
            <div className="content-wrapper">
              <h2 className="section-title">{t.missionTitle}</h2>
              <p className="section-text">{t.missionText}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="cta-title">{t.ctaTitle}</h2>
          <p className="cta-text">{t.ctaText}</p>
          <button className="cta-button" onClick={() => navigate("/upload")}>{t.ctaButton}</button>
        </div>
      </section>
    </main>
  );
};

export default About;
