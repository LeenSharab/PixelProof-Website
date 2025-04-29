import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { FaCrown } from "react-icons/fa";
import {
  FaHome,
  FaBlog,
  FaInfoCircle,
  FaDownload,
  FaUserPlus,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import "./Navbar.css";

interface NavbarProps {
  language: "en" | "ar";
  toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ language, toggleLanguage }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<"free" | "premium" | null>(null);
  const navigate = useNavigate();

  const translations = {
    en: {
      home: "Home",
      pricing: "Pricing",
      blog: "Blog",
      about: "About",
      download: "Download",
      signup: "Sign up",
      logout: "Logout",
    },
    ar: {
      home: "الرئيسية",
      pricing: "الأسعار",
      blog: "المدونة",
      about: "من نحن",
      download: "تحميل",
      signup: "إنشاء حساب",
      logout: "تسجيل الخروج",
    },
  };

  useEffect(() => {
    const fetchUserPlan = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        const user = session.user;
        setUserName(user.user_metadata?.name || user.email);

        const { data, error } = await supabase
          .from("users")
          .select("plan_type")
          .eq("id", user.id)
          .single();

        if (!error && data?.plan_type) {
          setUserPlan(data.plan_type);
        } else {
          setUserPlan("free");
        }
      } else {
        setUserName(null);
      }
    };

    fetchUserPlan();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserName(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="/src/assets/logo.png"
          alt="PixelProof Logo"
          className="logo"
        />
      </div>

      <div className="navbar-middle">
        <Link to="/">{translations[language].home}</Link>
        <a href="/pricing">{translations[language].pricing}</a>
        <a href="/blog">{translations[language].blog}</a>
        <a href="/about">{translations[language].about}</a>
        <a href="/download">{translations[language].download}</a>
      </div>

      <div className="navbar-right">
        <button
          onClick={toggleLanguage}
          className="globe-language-switcher"
          aria-label={
            language === "en" ? "Switch to Arabic" : "Switch to English"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="globe-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="current-language">
            {language === "en" ? "🇸🇦" : "🇬🇧"}
          </span>
        </button>

        {userName ? (
          <div className="user-info">
            <FaUserCircle className="user-icon" />
            <span className="user-name">
              {userName}
              {userPlan === "premium" && (
                <span className="premium-icon" title="Premium User">
                  <FaCrown />
                </span>
              )}
            </span>
            <button
              className="logout-button"
              onClick={handleLogout}
              title={translations[language].logout}
            >
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <a href="/signup" className="signup-button">
            {translations[language].signup}
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
