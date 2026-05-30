import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCamera, FiCheck, FiX, FiArrowLeft } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const AVATAR_PRESETS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=200&auto=format&fit=crop'
];

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop');
  const [isSaving, setIsSaving] = useState(false);

  const handleAvatarChange = (presetUrl) => {
    setAvatar(presetUrl);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    // Simulate saving
    setTimeout(() => {
      updateProfile({
        name,
        email,
        phone,
        avatar
      });
      setIsSaving(false);
      navigate('/profile');
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate('/profile')}
          className="w-8 h-8 rounded-full bg-[var(--color-soft-ivory)]/80 hover:bg-[var(--color-silver-fog)]/30 border border-[var(--color-silver-fog)]/50 flex items-center justify-center text-[var(--color-deep-slate)] transition-colors focus:outline-none"
        >
          <FiArrowLeft size={16} />
        </button>
        <div>
          <h3 className="text-lg font-heading font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">Edit Profile</h3>
          <p className="text-[10px] text-[var(--color-gray-blue)]/80 font-light">Update your personal account credentials</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">

        {/* 1. Profile Picture upload and preset selection */}
        <div className="space-y-3">
          <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--color-deep-slate)]/70 pl-2">Profile Picture</label>
          <div className="flex flex-col sm:flex-row items-center gap-6 bg-[var(--color-soft-ivory)]/55 border border-[var(--color-silver-fog)]/30 p-5 rounded-3xl">
            {/* Avatar display with custom upload input overlay */}
            <div className="relative group">
              <img
                src={avatar}
                alt="Profile Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md group-hover:brightness-90 transition-all duration-300"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop';
                }}
              />
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity duration-300"
              >
                <FiCamera size={18} />
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleCustomUpload}
                className="hidden"
              />
            </div>

            {/* Presets picker */}
            <div className="space-y-2 flex-grow text-center sm:text-left">
              <p className="text-[10px] text-[var(--color-gray-blue)] font-light leading-relaxed">
                Click inside the bubble to upload a custom picture, or pick one of our premium preset choices:
              </p>

              <div className="flex justify-center sm:justify-start items-center gap-3">
                {AVATAR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAvatarChange(preset)}
                    className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${avatar === preset
                        ? 'border-[var(--color-muted-teal)] scale-110 shadow-md'
                        : 'border-white/90 hover:scale-105'
                      }`}
                  >
                    <img src={preset} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    {avatar === preset && (
                      <div className="absolute inset-0 bg-[var(--color-muted-teal)]/30 flex items-center justify-center text-white">
                        <FiCheck size={12} className="stroke-[3px]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 2. Text input details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Full Name field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-2 text-[var(--color-deep-slate)]/70">Full Name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                  <FiUser size={16} />
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Email Address field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-2 text-[var(--color-deep-slate)]/70">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                  <FiMail size={16} />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

            {/* Phone Number field */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-[0.15em] pl-2 text-[var(--color-deep-slate)]/70">Phone Number</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-[var(--color-gray-blue)]/60">
                  <FiPhone size={16} />
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-white/50 focus:bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-2xl text-xs font-light focus:outline-none transition-all shadow-sm"
                  required
                />
              </div>
            </div>

          </div>
        </div>

        {/* Separator lines */}
        <hr className="border-[var(--color-silver-fog)]/30 my-6" />

        {/* Form controls buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-6 py-3.5 bg-white border border-[var(--color-silver-fog)]/50 hover:bg-[var(--color-silver-fog)]/10 text-[10px] font-bold uppercase tracking-wider rounded-2xl text-[var(--color-deep-slate)] transition-all flex items-center gap-1.5 focus:outline-none"
          >
            <FiX size={14} />
            <span>Cancel</span>
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-8 py-3.5 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] text-white text-[10px] font-bold uppercase tracking-wider rounded-2xl transition-all shadow-md flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSaving ? (
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <FiCheck size={14} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>

      </form>
    </motion.div>
  );
};

export default EditProfile;
