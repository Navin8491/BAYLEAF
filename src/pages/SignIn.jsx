import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight, FiInfo } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    // Simulate loading for premium dashboard feel
    setTimeout(async () => {
      const result = await login(email, password);
      setIsLoading(false);
      if (result.success) {
        navigate('/profile');
      } else {
        setError(result.message || 'Login failed. Please check your credentials.');
      }
    }, 1500);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotSent(true);
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(async () => {
      await login('google.user@gmail.com', 'googlepwd');
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
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] bg-[var(--color-powder-blue)]/20 rounded-full blur-[80px]"
          animate={{ x: [0, 20, -10, 0], y: [0, 15, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] max-w-[550px] bg-[var(--color-mist-sage)]/15 rounded-full blur-[70px]"
          animate={{ x: [0, -20, 15, 0], y: [0, -15, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Centered Premium Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-luxury p-8 md:p-10 relative z-10"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block text-xs uppercase tracking-[0.4em] font-bold text-[var(--color-muted-teal)] mb-3 hover:scale-105 transition-transform">
            &bull; BAYLEAF Café &bull;
          </Link>
          <h2 className="text-3xl md:text-4xl font-heading text-[var(--color-rich-graphite)] font-bold">Welcome Back</h2>
          <p className="text-xs text-[var(--color-gray-blue)]/80 font-light mt-1.5">Meticulously roasted moments await you</p>
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

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70 pl-2">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                <FiMail size={16} />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-11 pr-4 py-3.5 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light text-[var(--color-rich-graphite)] placeholder-[var(--color-gray-blue)]/40 focus:outline-none transition-all duration-300 shadow-sm focus:shadow-md"
                required
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center pl-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70">Password</label>
              <button
                type="button"
                onClick={() => setForgotModal(true)}
                className="text-[9px] font-bold uppercase tracking-[0.1em] text-[var(--color-muted-teal)] hover:text-[var(--color-deep-sage-teal)] transition-colors focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                <FiLock size={16} />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full pl-11 pr-11 py-3.5 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light text-[var(--color-rich-graphite)] placeholder-[var(--color-gray-blue)]/40 focus:outline-none transition-all duration-300 shadow-sm focus:shadow-md"
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

          {/* Remember me checkbox */}
          <div className="flex items-center gap-2 pl-2">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--color-silver-fog)] text-[var(--color-muted-teal)] focus:ring-[var(--color-muted-teal)] focus:ring-opacity-20 cursor-pointer"
            />
            <label htmlFor="remember" className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--color-deep-slate)]/60 cursor-pointer select-none">
              Remember Me
            </label>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_10px_20px_rgba(95,124,123,0.2)] hover:shadow-[0_15px_30px_rgba(95,124,123,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:pointer-events-none"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>Sign In</span>
                <FiArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-x-0 h-px bg-[var(--color-silver-fog)]/30"></div>
          <span className="relative z-10 px-4 bg-transparent text-[9px] font-bold tracking-widest text-[var(--color-gray-blue)]/50 uppercase">Or Continue With</span>
        </div>

        {/* Google OAuth Login Button */}
        <button
          onClick={handleGoogleLogin}
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
          <span>Continue with Google</span>
        </button>

        {/* Link to Registration */}
        <div className="mt-8 text-center">
          <p className="text-[10px] text-[var(--color-gray-blue)]/80 font-light">
            New to BAYLEAF?{' '}
            <Link
              to="/register"
              className="font-bold text-[var(--color-muted-teal)] hover:text-[var(--color-deep-sage-teal)] transition-colors pl-1 uppercase tracking-wide"
            >
              Create an Account
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Forgot Password Modal Panel */}
      <AnimatePresence>
        {forgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2D333A]/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="w-full max-w-sm bg-[#F4F1EC] border border-[var(--color-silver-fog)]/50 rounded-[2rem] shadow-luxury p-8 relative"
            >
              <h3 className="text-xl font-heading text-[var(--color-rich-graphite)] font-bold mb-2">Reset Password</h3>

              {!forgotSent ? (
                <>
                  <p className="text-xs text-[var(--color-gray-blue)] font-light leading-relaxed mb-6">
                    Enter your email address and we'll send a premium link to recover your account settings.
                  </p>
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70 pl-2">Email Address</label>
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="yourname@gmail.com"
                        className="w-full px-4 py-3 bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-xl text-xs font-light focus:outline-none transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white text-[9px] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center"
                    >
                      {isLoading ? (
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        'Send Recovery Link'
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-4 space-y-4">
                  <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border border-green-200">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-sm font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">Recovery Link Dispatched</h4>
                  <p className="text-xs text-[var(--color-gray-blue)]/80 font-light leading-relaxed">
                    A recovery email is on the way to <strong className="text-[var(--color-muted-teal)]">{forgotEmail}</strong>. Please check your inbox or spam folder.
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setForgotModal(false);
                  setForgotSent(false);
                  setForgotEmail('');
                }}
                className="mt-6 w-full text-center text-[10px] font-bold uppercase tracking-wider text-[var(--color-gray-blue)] hover:text-[var(--color-rich-graphite)] transition-colors focus:outline-none"
              >
                Close Window
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default SignIn;
