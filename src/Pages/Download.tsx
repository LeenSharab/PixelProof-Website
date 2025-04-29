import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Download.css";
import "primeicons/primeicons.css";
import extensionPopup from "../assets/ext.jpg"; 
import { useNavigate } from "react-router-dom";

interface DownloadProps {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
}

const translations = {
  en: {
    title: "PixelProof",
    subtitle: "Verify Images",
    description: "Enhance your browsing with PixelProof – your ultimate tool for detecting image manipulation in real time.",
    startUsing: "Start Using - It's free",
    addToChrome: "Add to Chrome",
    privacy: "Your Usage Data is Kept Private",
    rating: "4.8/5",
    howToUse: "How to Use PixelProof",
    steps: [
      { title: "1. Install the Extension", text: "Click \"Add to Chrome\" to install PixelProof." },
      { title: "2. Open the Extension", text: "Click on the PixelProof icon in your browser toolbar." },
      { title: "3. Upload an Image", text: "Choose an image to verify its authenticity." },
    ]
  },
  ar: {
    title: "بيكسل بروف",
    subtitle: "تحقق من الصور",
    description: "حسّن تجربتك على الإنترنت باستخدام PixelProof – أداتك المثالية لاكتشاف التلاعب بالصور في الوقت الفعلي.",
    startUsing: "ابدأ الآن - مجاناً",
    addToChrome: "أضف إلى كروم",
    privacy: "بيانات استخدامك تبقى خاصة وآمنة",
    rating: "٤٫٨/٥",
    howToUse: "كيفية استخدام PixelProof",
    steps: [
      { title: "١. قم بتثبيت الإضافة", text: "انقر على \"أضف إلى كروم\" لتثبيت PixelProof." },
      { title: "٢. افتح الإضافة", text: "انقر على أيقونة PixelProof في شريط المتصفح." },
      { title: "٣. ارفع صورة", text: "اختر صورة للتحقق من صحتها." },
    ]
  }
};

const Download: React.FC<DownloadProps> = ({ language, toggleLanguage }) => {
  const navigate = useNavigate();
  const t = translations[language];

  return (
    <>
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <div className="download-container">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>
            {t.title} <br /> <span className="highlight">{t.subtitle}</span>
          </h1>
          <p>{t.description}</p>
          <div className="cta-buttons">
            <button className="start-using" onClick={() => navigate("/upload")}>{t.startUsing}</button>
            <a
              href="https://github.com/LeenSharab/Pixelproof"
              target="_blank"
              rel="noopener noreferrer"
              className="add-to-chrome"
            >
              {t.addToChrome} <img src="src/assets/chrome-logo.png" alt="Chrome" className="chrome-icon" />
            </a>
          </div>
          <p className="security-info">
            <i className="pi pi-shield"></i> {t.privacy}
          </p>
          <p className="ratings">
            <strong>{t.rating}</strong> <span className="stars">⭐⭐⭐⭐⭐</span>
          </p>
        </div>

        {/* Steps Section */}
        <div className="steps-section">
          <h2>{t.howToUse}</h2>
          <div className="steps-container">
            <div className="step">
              <h3>{t.steps[0].title}</h3>
              <p>{t.steps[0].text}</p>
              <img src="src/assets/Picture1.png" alt="Install Step" />
            </div>
            <div className="step">
              <h3>{t.steps[1].title}</h3>
              <p>{t.steps[1].text}</p>
              <img src="src/assets/Picture2.png" alt="Extension Popup" />
            </div>
            <div className="step">
              <h3>{t.steps[2].title}</h3>
              <p>{t.steps[2].text}</p>
              <img src={extensionPopup} alt="Upload Image Step" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Download;