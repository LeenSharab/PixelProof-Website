// src/components/ImageUpload/ImageUpload.tsx
import React, { useState } from 'react';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './ImageUpload.css';

interface ImageUploadProps {
  language: 'en' | 'ar';
}

const translations = {
  en: {
    drop: "Drag & Drop your file here",
    or: "or",
    browse: "Browse Files",
    info: "Supported formats: JPG, PNG (Max 100MB)",
    analyze: "Analyze Image",
    analyzing: "Analyzing...",
    error: "Failed to analyze image. Please try again."
  },
  ar: {
    drop: "اسحب وأسقط ملفك هنا",
    or: "أو",
    browse: "تصفح الملفات",
    info: "الصيغ المدعومة: JPG, PNG (الحد الأقصى 100 ميغابايت)",
    analyze: "تحليل الصورة",
    analyzing: "جاري التحليل...",
    error: "فشل في تحليل الصورة. الرجاء المحاولة مرة أخرى."
  }
};

const ImageUpload: React.FC<ImageUploadProps> = ({ language }) => {
  const t = translations[language] ?? translations['en'];

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) setSelectedFile(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const sendToBackend = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://6988-35-186-162-229.ngrok-free.app/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      const score = data.prediction[0][0];
      const label = score > 0.5 ? "Likely AI Generated" : "Likely Real";
      const confidence = (score > 0.5 ? score : 1 - score) * 100;
      const prediction = `${label} (${confidence.toFixed(0)}%)`;

      const limeImage = data.lime_image ? `data:image/png;base64,${data.lime_image}` : null;
      const reportURL = data.report_base64
        ? URL.createObjectURL(
            new Blob(
              [Uint8Array.from(atob(data.report_base64), c => c.charCodeAt(0))],
              { type: 'text/plain;charset=utf-8' }
            )
          )
        : null;

      navigate('/result', {
        state: {
          prediction,
          limeImage,
          reportURL,
          fileName: selectedFile.name,
        },
      });
    } catch (err) {
      console.error('Error:', err);
      setError(t.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      {/* Only show drop-zone if no file is selected */}
      {!selectedFile && (
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragOver={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon"><FiUploadCloud size={48} /></div>
          <div className="upload-content">
            <h2>{t.drop}</h2>
            <div className="separator"><span>{t.or}</span></div>
            <label className="browse-button">
              {t.browse}
              <input type="file" hidden onChange={handleFileSelect} accept=".jpg,.jpeg,.png" />
            </label>
            <p className="file-info">{t.info}</p>
          </div>
        </div>
      )}

      {/* Show file preview after a file is selected */}
      {selectedFile && (
        <div className="file-preview-box">
          <div className="file-preview">
            <FiFile size={40} />
            <div className="file-details">
              <span>{selectedFile.name}</span>
              <span>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <button className="remove-button" onClick={removeFile} aria-label="Remove file">
              <FiX size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Analyze button */}
      {selectedFile && (
        <div className="upload-actions">
          <button className="predict-button" onClick={sendToBackend} disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                {t.analyzing}
              </>
            ) : (
              t.analyze
            )}
          </button>
        </div>
      )}

      {error && <div className="error-message"><p>{error}</p></div>}
    </div>
  );
};

export default ImageUpload;
