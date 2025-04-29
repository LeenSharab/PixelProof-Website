import React, { useState, useEffect } from "react";
import { FiMail, FiLock, FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import "./Auth.css";

interface LoginProps {
  language: 'en' | 'ar';
}

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const SESSION_TIMEOUT_MINUTES = 30;

const Login: React.FC<LoginProps> = ({ language }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState<LoginErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = {
    en: {
      title: "Welcome Back to PixelProof",
      email: "Email Address",
      password: "Password",
      remember: "Remember me",
      forgot: "Forgot Password?",
      login: "Log In",
      logging: "Logging In...",
      or: "or continue with",
      noAccount: "Don't have an account?",
      signup: "Sign up",
    },
    ar: {
      title: "مرحبًا بك مجددًا في PixelProof",
      email: "عنوان البريد الإلكتروني",
      password: "كلمة المرور",
      remember: "تذكرني",
      forgot: "نسيت كلمة المرور؟",
      login: "تسجيل الدخول",
      logging: "جاري تسجيل الدخول...",
      or: "أو تابع باستخدام",
      noAccount: "ليس لديك حساب؟",
      signup: "إنشاء حساب",
    },
  }[language];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        await supabase.auth.signOut();
        alert("You’ve been logged out due to inactivity.");
        window.location.href = "/login";
      }, SESSION_TIMEOUT_MINUTES * 60 * 1000);
    };

    const activityEvents = ["mousemove", "keydown", "click"];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );

    resetTimer();

    return () => {
      clearTimeout(timer);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors: LoginErrors = {};
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = "Invalid email";
    if (formData.password.length < 8) newErrors.password = "Password too short";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error?.message?.toLowerCase().includes("email not confirmed")) {
        alert("❗ Please confirm your email before logging in.");
        return;
      }

      if (error) throw error;
      if (!data.session) throw new Error("Login session failed.");

      if (!formData.remember) {
        window.addEventListener('beforeunload', async () => {
          await supabase.auth.signOut();
        });
      }

      alert("✅ Login successful!");
      window.location.href = "/";
    } catch (err: any) {
      console.error("Login error:", err);
      alert("Login failed: " + (err?.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthLogin = async (provider: "google" | "github") => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: "http://localhost:5173",
      },
    });

    if (error) {
      alert(`${provider} login failed: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">{t.title}</h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`input-group ${errors.email ? "error" : ""}`}>
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder={t.email}
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className={`input-group ${errors.password ? "error" : ""}`}>
            <FiLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder={t.password}
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <div className="flex-group">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleInputChange}
              />
              {t.remember}
            </label>

            <a href="/forgot-password" className="forgot-password">
              {t.forgot}
            </a>
          </div>

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting ? t.logging : t.login}
          </button>
        </form>

        <div className="social-auth">
          <p className="divider">{t.or}</p>
          <div className="social-buttons">
            <button
              type="button"
              className="social-button google"
              onClick={() => handleOAuthLogin("google")}
            >
              <FaGoogle /> Google
            </button>

            <button
              type="button"
              className="social-button github"
              onClick={() => handleOAuthLogin("github")}
            >
              <FiGithub /> GitHub
            </button>
          </div>
        </div>

        <p className="auth-footer">
          {t.noAccount} <a href="/signup">{t.signup}</a>
        </p>
      </div>
    </div>
  );
};

export default Login;