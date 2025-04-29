import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./Pages/Home";
import Pricing from "./Pages/Pricing";
import Download from "./Pages/Download";
import UploadPage from "./Pages/UploadPage";
import Blog from "./Pages/Blog";
import About from "./Pages/About";
import SignUp from "./Pages/SignUp";
import Login from './Pages/login';
import ResultPage from "./Pages/ResultPage";

const App: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <div className={language === 'ar' ? 'rtl' : 'ltr'}>
      <Router>
        <Navbar language={language} toggleLanguage={toggleLanguage} />
        <Routes>
          <Route path="/" element={<Home language={language} />} />
          <Route path="/pricing" element={<Pricing language={language} toggleLanguage={toggleLanguage} />} />
          <Route path="/download" element={<Download language={language} toggleLanguage={toggleLanguage}  />} />
          <Route path="/upload" element={<UploadPage language={language} />} />
          <Route path="/result" element={<ResultPage language={language} />} />
          <Route path="/blog" element={<Blog language={language} />} />
          <Route path="/about" element={<About language={language} />} />
          <Route path="/signup" element={<SignUp language={language} />} />
          <Route path="/login" element={<Login language={language} />} />
        </Routes>
        <Footer language={language} />
      </Router>
    </div>
  );
};

export default App;
