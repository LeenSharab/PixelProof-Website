import React from 'react';
import './Features.css';

interface FeaturesProps {
  language: 'en' | 'ar';
}

const translations = {
  en: {
    heading: 'Why Choose Us?',
    subheading:
      'Ensuring image authenticity has never been easier. Our advanced detection system provides cutting-edge analysis to help you verify images with confidence. Here’s why we stand out:',
    features: [
      {
        title: 'Advanced Image Analysis',
        description:
          'Harness the power of AI to detect even the slightest alterations in images, ensuring authenticity and reliability.',
      },
      {
        title: 'Cutting-Edge Detection Technology',
        description:
          'Our innovative algorithms analyze image metadata, inconsistencies, and digital fingerprints to identify manipulation with precision.',
      },
      {
        title: '24 x 7 User Support',
        description:
          'We are always happy to help our customers with any issues or queries.',
      },
      {
        title: 'Protecting Digital Integrity',
        description:
          'Stay ahead of misinformation by ensuring that the images you see and share are genuine and untouched.',
      },
      {
        title: 'Secure & User-Friendly Platform',
        description:
          'Seamlessly upload and analyze images through an intuitive interface, ensuring a smooth and secure experience.',
      },
      {
        title: 'Real-Time Verification',
        description:
          'Instantly verify the authenticity of images with our fast and efficient detection system, providing results in just seconds',
      },
    ],
  },
  ar: {
    heading: 'لماذا تختارنا؟',
    subheading:
      'لم يكن التحقق من أصالة الصور أسهل من أي وقت مضى. يوفر نظامنا المتقدم تحليلاً متطورًا لمساعدتك على التحقق من الصور بثقة. إليك سبب تميزنا:',
    features: [
      {
        title: 'تحليل الصور المتقدم',
        description:
          'استفد من قوة الذكاء الاصطناعي لاكتشاف حتى أدق التعديلات على الصور، لضمان الأصالة والمصداقية.',
      },
      {
        title: 'تقنية كشف متطورة',
        description:
          'تحلل خوارزمياتنا المبتكرة بيانات الصور والاختلافات والبصمات الرقمية لتحديد التلاعب بدقة.',
      },
      {
        title: 'دعم المستخدم 24/7',
        description:
          'يسعدنا دائمًا مساعدة عملائنا في أي استفسارات أو مشكلات.',
      },
      {
        title: 'حماية النزاهة الرقمية',
        description:
          'ابق متقدمًا على المعلومات المضللة من خلال ضمان أن الصور التي تراها وتشاركها حقيقية وغير معدلة.',
      },
      {
        title: 'منصة آمنة وسهلة الاستخدام',
        description:
          'قم بتحميل الصور وتحليلها بسهولة من خلال واجهة سهلة وسلسة وآمنة.',
      },
      {
        title: 'التحقق الفوري',
        description:
          'تحقق من أصالة الصور على الفور من خلال نظام الكشف السريع والفعال لدينا، حيث تحصل على النتائج في ثوانٍ فقط.',
      },
    ],
  },
};

const Features: React.FC<FeaturesProps> = ({ language }) => {
  const content = translations[language];

  return (
    <div className="feat bg-gray pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="section-head col-sm-12">
            <h4><span>{language === 'en' ? 'Why Choose' : 'لماذا تختار'} </span>{language === 'en' ? 'Us?' : 'نا؟'}</h4>
            <p>{content.subheading}</p>
          </div>

          {content.features.map((feature, index) => (
            <div className="col-lg-4 col-sm-6" key={index}>
              <div className="item"> 
                <span className={`icon feature_box_col_${index + 1}`}>
                  <i className={featuresData[index].icon}></i>
                </span>
                <h6>{feature.title}</h6>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const featuresData = [
  { icon: "fa fa-globe" },
  { icon: "fa fa-anchor" },
  { icon: "fa fa-hourglass-half" },
  { icon: "fa fa-database" },
  { icon: "fa fa-upload" },
  { icon: "fa fa-camera" },
];

export default Features;
