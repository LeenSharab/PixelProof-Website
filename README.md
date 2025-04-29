# 📷 PixelProof

**PixelProof** is an AI-powered web application that detects image manipulation and AI-generated content.  
It combines deep learning models with explainability techniques to provide clear, visual evidence of authenticity.

---

## ✨ Features
- Upload images (JPG, PNG) for analysis.
- Detect **AI-Generated** vs **Real** images.
- Visual explanation using **LIME** (Local Interpretable Model-Agnostic Explanations).
- Bilingual support (English and Arabic).
- Lightweight, intuitive frontend built with React + Vite.

---

## 🛠️ Tech Stack

| Layer | Technology |
|:---|:---|
| Frontend | React, TypeScript, Vite |
| Backend | Flask (Python 3), TensorFlow |
| Machine Learning | Custom CNN model + LIME explainability |

---

## 📂 Project Structure

```bash
pixelproof/
├── frontend/       # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── backend/        # Flask backend (not publicly included)
│   └── app.py
└── model/          # Pretrained AI model (not publicly included)
