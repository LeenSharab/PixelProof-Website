import React from "react";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import "./UploadPage.css";

interface UploadPageProps {
    language: 'en' | 'ar';
  }
  
  const UploadPage: React.FC<UploadPageProps> = ({ language }) => {
    return (
        <section className="upload-page">
            <ImageUpload language={language} />

        </section>
    );
};

export default UploadPage;
