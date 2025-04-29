import { FiUser, FiMail, FiLock, FiCheck, FiGithub } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Auth.css';

interface SignUpProps {
  language: 'en' | 'ar';
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreed: boolean;
}

interface ErrorState {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreed?: string;
}

const SignUp: React.FC<SignUpProps> = ({ language }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreed: false,
  });

  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [errors, setErrors] = useState<ErrorState>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validatePassword = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 4);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setFormData((prev: FormData) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === 'password' && typeof value === 'string') {
      setPasswordStrength(validatePassword(value));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ErrorState = {};
    if (!/^[a-zA-Z ]{2,}$/.test(formData.name)) newErrors.name = 'Invalid name';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email';
    if (formData.password.length < 8) newErrors.password = 'Password too short';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!formData.agreed) newErrors.agreed = 'You must agree to terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
          },
        },
      });

      if (signUpError) throw signUpError;

      const user = data.user;
      if (!user) throw new Error('User creation failed or email not verified');

      const { error: dbError } = await supabase.from('users').insert([
        {
          id: user.id,
          name: formData.name,
          email: formData.email,
        },
      ]);

      if (dbError) throw dbError;

      alert('Signup successful! Please verify your email before logging in.');
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreed: false,
      });
    } catch (err: any) {
      console.error('Signup failed:', err);
      alert('Signup failed: ' + (err.message || JSON.stringify(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOAuthSignup = async (provider: 'google' | 'github') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: 'http://localhost:5173',
      },
    });

    if (error) {
      alert(`${provider} signup failed: ${error.message}`);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">
          {language === 'en' ? 'Create Your PixelProof Account' : 'أنشئ حساب PixelProof الخاص بك'}
        </h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className={`input-group ${errors.name ? 'error' : ''}`}>
            <FiUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder={language === 'en' ? 'Full Name' : 'الاسم الكامل'}
              value={formData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <FiMail className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder={language === 'en' ? 'Email Address' : 'البريد الإلكتروني'}
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className={`input-group ${errors.password ? 'error' : ''}`}>
            <FiLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder={language === 'en' ? 'Password' : 'كلمة المرور'}
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="password-strength">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`strength-bar ${i < passwordStrength ? 'active' : ''}`}
                  style={{ ['--strength' as any]: passwordStrength }}
                />
              ))}
            </div>
          </div>

          <div className={`input-group ${errors.confirmPassword ? 'error' : ''}`}>
            <FiLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder={language === 'en' ? 'Confirm Password' : 'تأكيد كلمة المرور'}
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          <div className={`terms-group ${errors.agreed ? 'error' : ''}`}>
            <label>
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleInputChange}
              />
              {language === 'en' ? (
                <> I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></>
              ) : (
                <> أوافق على <a href="/terms">شروط الخدمة</a> و<a href="/privacy">سياسة الخصوصية</a></>
              )}
            </label>
            {errors.agreed && <span className="error-message">{errors.agreed}</span>}
          </div>

          <button type="submit" className="auth-button" disabled={isSubmitting}>
            {isSubmitting
              ? language === 'en' ? 'Creating Account...' : 'جاري إنشاء الحساب...'
              : language === 'en' ? 'Create Account' : 'إنشاء الحساب'}
          </button>
        </form>

        <div className="social-auth">
          <p className="divider">{language === 'en' ? 'or continue with' : 'أو تابع باستخدام'}</p>
          <div className="social-buttons">
            <button
              type="button"
              className="social-button google"
              onClick={() => handleOAuthSignup('google')}
            >
              <FaGoogle /> Google
            </button>

            <button
              type="button"
              className="social-button github"
              onClick={() => handleOAuthSignup('github')}
            >
              <FiGithub /> GitHub
            </button>
          </div>
        </div>

        <p className="auth-footer">
          {language === 'en' ? (
            <>Already have an account? <a href="/login">Log in</a></>
          ) : (
            <>لديك حساب؟ <a href="/login">سجل الدخول</a></>
          )}
        </p>
      </div>
    </div>
  );
};

export default SignUp;