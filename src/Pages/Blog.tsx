import React from "react";
import "./Blog.css";

interface BlogProps {
  language: 'en' | 'ar';
}

const Blog: React.FC<BlogProps> = ({ language }) => {
  const blogContent = {
    en: {
      date: "March 10, 2025",
      title: "Understanding Image Manipulation and Digital Forensics",
      subtitle: "A deep dive into image manipulation techniques, deepfake detection, and digital forensics.",
      blocks: [
        { type: "paragraph", text: "In today's digital world, image manipulation techniques have become increasingly sophisticated. From harmless photo editing to malicious deepfakes, understanding these techniques is essential for ensuring authenticity and credibility." },
        { type: "image", src: "src/assets/deep.webp", alt: "Illustration of deepfake" },
        { type: "heading", text: "Understanding Image Manipulation" },
        { type: "paragraph", text: "Image manipulation involves altering or enhancing images using digital tools. Common techniques include cropping, color correction, retouching, and cloning. However, more advanced methods, such as AI-based transformations and generative adversarial networks (GANs), have made it easier to create realistic but fake images." },
        { type: "image", src: "src/assets/manip.webp", alt: "Illustration of image manipulation" },
        { type: "heading", text: "What Are Deepfakes?" },
        { type: "paragraph", text: "Deepfakes use AI to generate synthetic media by replacing or altering faces and voices in videos and images. They rely on deep learning models, particularly GANs, to create hyper-realistic content. While some applications are for entertainment, deepfakes can also be used for misinformation, fraud, and identity theft." },
        { type: "heading", text: "How to Detect Manipulated Images" },
        { type: "paragraph", text: "Digital forensics plays a crucial role in identifying manipulated images. Here are a few common techniques used for detection:" },
        { type: "paragraph", text: "<strong>1. Metadata Analysis</strong> - Examining EXIF data to check for inconsistencies in timestamps, camera models, and geolocation." },
        { type: "paragraph", text: "<strong>2. Error Level Analysis (ELA)</strong> - Highlighting areas of an image that have been altered by detecting differences in compression levels." },
        { type: "paragraph", text: "<strong>3. AI-Based Detection</strong> - Using machine learning models to identify deepfake patterns and artifacts." },
        { type: "paragraph", text: "<strong>4. Frequency Analysis</strong> - Checking Discrete Cosine Transform (DCT) frequencies to spot unnatural alterations." },
        { type: "image", src: "src/assets/dig.jpg", alt: "Illustration of digital forensics" },
        { type: "heading", text: "Why Digital Forensics Matters" },
        { type: "paragraph", text: "With the rise of AI-generated content, digital forensics is more important than ever. It helps in verifying media authenticity, protecting against fraud, and ensuring trust in digital interactions. Whether you're a journalist, researcher, or just a curious user, understanding these techniques can help safeguard against misinformation." }
      ]
    },
    ar: {
      date: "10 مارس 2025",
      title: "فهم التلاعب بالصور والتحقيقات الرقمية",
      subtitle: "نظرة معمقة على تقنيات التلاعب بالصور، واكتشاف التزييف العميق، والتحقيق الرقمي.",
      blocks: [
        { type: "paragraph", text: "في عالمنا الرقمي اليوم، أصبحت تقنيات التلاعب بالصور أكثر تطورًا. من التعديلات البسيطة إلى التزييف العميق، من المهم فهم هذه التقنيات لضمان الأصالة والمصداقية." },
        { type: "image", src: "src/assets/deep.webp", alt: "رسم توضيحي للتزييف العميق" },
        { type: "heading", text: "فهم التلاعب بالصور" },
        { type: "paragraph", text: "يتضمن التلاعب بالصور تعديلها أو تحسينها باستخدام أدوات رقمية. تشمل التقنيات الشائعة القص، وتصحيح الألوان، والتنقيح، والاستنساخ. وقد أتاحت الأساليب المتقدمة، مثل التحويلات القائمة على الذكاء الاصطناعي وشبكات الخصومة التوليدية (GANs)، إنشاء صور واقعية ولكن مزيفة بسهولة." },
        { type: "image", src: "src/assets/manip.webp", alt: "رسم توضيحي للتلاعب بالصور" },
        { type: "heading", text: "ما هو التزييف العميق؟" },
        { type: "paragraph", text: "يستخدم التزييف العميق الذكاء الاصطناعي لإنشاء وسائط اصطناعية عن طريق استبدال أو تعديل الوجوه والأصوات في مقاطع الفيديو والصور. يعتمد على نماذج التعلم العميق، وخاصة GANs، لإنشاء محتوى واقعي للغاية. في حين أن بعض التطبيقات ترفيهية، يمكن استخدام التزييف العميق أيضًا في التضليل، والاحتيال، وسرقة الهوية." },
        { type: "heading", text: "كيفية كشف الصور المعدلة" },
        { type: "paragraph", text: "تلعب التحاليل الجنائية الرقمية دورًا حاسمًا في التعرف على الصور المعدلة. إليك بعض التقنيات الشائعة المستخدمة للكشف:" },
        { type: "paragraph", text: "<strong>1. تحليل البيانات الوصفية</strong> - فحص بيانات EXIF للكشف عن التناقضات في الطوابع الزمنية، ونماذج الكاميرات، والموقع الجغرافي." },
        { type: "paragraph", text: "<strong>2. تحليل مستوى الخطأ (ELA)</strong> - تسليط الضوء على مناطق الصورة التي تم تعديلها من خلال اكتشاف الفروقات في مستويات الضغط." },
        { type: "paragraph", text: "<strong>3. الكشف بالذكاء الاصطناعي</strong> - استخدام نماذج التعلم الآلي لاكتشاف أنماط التزييف العميق والآثار المصاحبة له." },
        { type: "paragraph", text: "<strong>4. تحليل التردد</strong> - فحص ترددات تحويل جيب التمام المنفصل (DCT) لاكتشاف التعديلات غير الطبيعية." },
        { type: "image", src: "src/assets/dig.jpg", alt: "رسم توضيحي للتحقيق الرقمي" },
        { type: "heading", text: "لماذا التحقيق الرقمي مهم؟" },
        { type: "paragraph", text: "مع تزايد المحتوى الناتج عن الذكاء الاصطناعي، أصبحت التحقيقات الرقمية أكثر أهمية من أي وقت مضى. فهي تساعد في التحقق من أصالة الوسائط، والحماية من الاحتيال، وضمان الثقة في التفاعلات الرقمية. سواء كنت صحفيًا أو باحثًا أو مستخدمًا فضوليًا، فإن فهم هذه التقنيات يمكن أن يساعد في الحماية من التضليل." }
      ]
    }
  }[language];

  return (
    <div className="blog-container">
      <p className="blog-date">{blogContent.date}</p>
      <h1 className="blog-title">{blogContent.title}</h1>
      <p className="blog-subtitle">{blogContent.subtitle}</p>
      <div className="blog-content">
        {blogContent.blocks.map((block, index) => {
          if (block.type === "paragraph" && block.text) {
            return <p key={index} dangerouslySetInnerHTML={{ __html: block.text as string }}></p>;
          }
          if (block.type === "heading") {
            return <h2 key={index}>{block.text}</h2>;
          }
          if (block.type === "image") {
            return (
              <div key={index} className="blog-image-container">
                <img src={block.src} alt={block.alt} className="blog-image" />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Blog;
