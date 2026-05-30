import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiLock, FiEye, FiEyeOff, FiArrowRight, FiInfo } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { register, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      setError('You must accept the Terms & Conditions.');
      return;
    }

    setIsLoading(true);

    // Simulate loading for premium dashboard feel
    setTimeout(() => {
      const result = register({ name, email, phone });
      setIsLoading(false);
      if (result.success) {
        navigate('/profile');
      } else {
        setError('Registration failed. Try again.');
      }
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      register({
        name: 'Alex Rivera',
        email: 'alex.rivera@gmail.com',
        phone: '+44 7911 888999'
      });
      setIsLoading(false);
      navigate('/profile');
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-20 px-4 overflow-hidden bg-[var(--color-soft-ivory)]">

      {/* Background Graphic Zoom & Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1498804103079-a6351b050096?q=70&w=1200&auto=format&fit=crop')] bg-cover bg-center opacity-[0.07] grayscale"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-soft-ivory)] via-transparent to-[var(--color-soft-ivory)]"></div>
      </div>

      {/* Floating Animated Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[600px] bg-[var(--color-powder-blue)]/20 rounded-full blur-[80px]"
          animate={{ x: [0, -20, 10, 0], y: [0, -15, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-[10%] -left-[10%] w-[45vw] h-[45vw] max-w-[550px] bg-[var(--color-mist-sage)]/15 rounded-full blur-[70px]"
          animate={{ x: [0, 20, -15, 0], y: [0, 15, -10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Centered Premium Registration Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-luxury p-8 md:p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-xs uppercase tracking-[0.4em] font-bold text-[var(--color-muted-teal)] mb-3 hover:scale-105 transition-transform">
            &bull; BAYLEAF Café &bull;
          </Link>
          <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-rich-graphite)] font-bold">Join the Club</h2>
          <p className="text-xs text-[var(--color-gray-blue)]/80 font-light mt-1.5">Earn loyalty points and unlock exclusive café benefits</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-2xl bg-red-50/50 border border-red-200/50 text-red-600 text-xs flex items-center gap-2"
          >
            <FiInfo className="flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name input field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70 pl-2">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                  <FiUser size={16} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Eleanor Vance"
                  className="w-full pl-11 pr-4 py-3 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light text-[var(--color-rich-graphite)] focus:outline-none transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Email Address input field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70 pl-2">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                  <FiMail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light text-[var(--color-rich-graphite)] focus:outline-none transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Phone Number input field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70 pl-2">Phone Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                  <FiPhone size={16} />
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+44 7911 123456"
                  className="w-full pl-11 pr-4 py-3 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light text-[var(--color-rich-graphite)] focus:outline-none transition-all duration-300 shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Confirm Password grid alignment */}
            <div className="hidden md:block"></div>

            {/* Password input field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70 pl-2">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                  <FiLock size={16} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full pl-11 pr-11 py-3 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light text-[var(--color-rich-graphite)] focus:outline-none transition-all duration-300 shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--color-gray-blue)]/60 hover:text-[var(--color-muted-teal)] transition-colors focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password input field */}
            <div className="space-y-1">
              <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70 pl-2">Confirm Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                  <FiLock size={16} />
                </span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full pl-11 pr-11 py-3 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light text-[var(--color-rich-graphite)] focus:outline-none transition-all duration-300 shadow-sm"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--color-gray-blue)]/60 hover:text-[var(--color-muted-teal)] transition-colors focus:outline-none"
                >
                  {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start gap-2.5 pl-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-[var(--color-silver-fog)] text-[var(--color-muted-teal)] focus:ring-[var(--color-muted-teal)] focus:ring-opacity-20 cursor-pointer"
            />
            <label htmlFor="terms" className="text-[10px] text-[var(--color-gray-blue)] leading-relaxed cursor-pointer select-none">
              I accept the{' '}
              <a href="#" className="font-bold text-[var(--color-muted-teal)] hover:underline">
                Terms & Conditions
              </a>{' '}
              and consent to the{' '}
              <a href="#" className="font-bold text-[var(--color-muted-teal)] hover:underline">
                Privacy Policy
              </a>.
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_10px_20px_rgba(95,124,123,0.2)] hover:shadow-[0_15px_30px_rgba(95,124,123,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Register Account</span>
                <FiArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-[var(--color-silver-fog)]/30"></div>
          <span className="relative z-10 px-4 bg-transparent text-[9px] font-bold tracking-widest text-[var(--color-gray-blue)]/50 uppercase">Or Sign Up With</span>
        </div>

        {/* Google OAuth Register Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full py-3.5 bg-white/60 hover:bg-white border border-[var(--color-silver-fog)]/40 rounded-2xl text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/80 hover:text-[var(--color-muted-teal)] hover:border-[var(--color-muted-teal)]/30 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2.5"
        >
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Register with Google</span>
        </button>

        {/* Link to Login */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-[var(--color-gray-blue)]/80 font-light">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-bold text-[var(--color-muted-teal)] hover:text-[var(--color-deep-sage-teal)] transition-colors pl-1 uppercase tracking-wide"
            >
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>

    </div>
  );
};

export default Register;
