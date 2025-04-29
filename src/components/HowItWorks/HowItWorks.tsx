import React from 'react';
import './HowItWorks.css';

interface HowItWorksProps {
  language: 'en' | 'ar';
}

const HowItWorks: React.FC<HowItWorksProps> = ({ language }) => {
  const t = {
    en: {
      title: 'How It Works',
      step1: {
        heading: 'Upload Your Image',
        desc: 'Choose an image in JPG or PNG format.',
      },
      step2: {
        heading: 'Analyze the Image',
        desc: 'Our system detects any manipulations.',
      },
      step3: {
        heading: 'Get the Report',
        desc: 'View the detailed analysis results.',
      },
    },
    ar: {
      title: 'كيف يعمل النظام؟',
      step1: {
        heading: 'قم برفع صورتك',
        desc: 'اختر صورة بصيغة JPG أو PNG.',
      },
      step2: {
        heading: 'حلل الصورة',
        desc: 'نظامنا يكتشف أي تلاعبات أو تعديلات.',
      },
      step3: {
        heading: 'احصل على التقرير',
        desc: 'اعرض نتائج التحليل التفصيلية.',
      },
    },
  }[language];

  return (
    <section id="how-it-works" className="how-it-works">
      <h2>{t.title}</h2>
      <div className="steps">
        <div className="step">
          <img
            src="src/assets/1-removebg-preview.png"
            alt="Report Step"
            className="step-icon"
          />
          <h3>{t.step1.heading}</h3>
          <p>{t.step1.desc}</p>
        </div>
        <div className="step">
          <img
            src="src/assets/2-removebg-preview.png"
            alt="Report Step"
            className="step-icon"
          />
          <h3>{t.step2.heading}</h3>
          <p>{t.step2.desc}</p>
        </div>
        <div className="step">
          <img
            src="src/assets/3-removebg-preview.png"
            alt="Report Step"
            className="step-icon"
          />
          <h3>{t.step3.heading}</h3>
          <p>{t.step3.desc}</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
