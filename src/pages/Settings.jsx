import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiShield, FiBell, FiEye, FiCheck, FiSave, FiSmartphone, FiTerminal } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { settings, updateSettings } = useAuth();
  
  const [activeTab, setActiveTab] = useState('personal'); // personal, security, notifications, privacy
  const [isSaving, setIsSaving] = useState(false);

  // Dynamic state bindings linked to AuthContext settings
  const [birthday, setBirthday] = useState(settings.birthday);
  const [address, setAddress] = useState(settings.defaultAddress);
  const [marketingEmails, setMarketingEmails] = useState(settings.marketingEmails);
  const [smsUpdates, setSmsUpdates] = useState(settings.smsUpdates);
  const [twoFactorAuth, setTwoFactorAuth] = useState(settings.twoFactorAuth);
  const [publicProfile, setPublicProfile] = useState(settings.publicProfile);
  const [dataSharing, setDataSharing] = useState(settings.dataSharing);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      updateSettings({
        birthday,
        defaultAddress: address,
        marketingEmails,
        smsUpdates,
        twoFactorAuth,
        publicProfile,
        dataSharing
      });
      setIsSaving(false);
    }, 1200);
  };

  const tabs = [
    { id: 'personal', name: 'Personal Details', icon: FiUser },
    { id: 'security', name: 'Security Core', icon: FiShield },
    { id: 'notifications', name: 'Notifications', icon: FiBell },
    { id: 'privacy', name: 'Privacy Center', icon: FiEye }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header section */}
      <div>
        <h3 className="text-lg font-heading font-bold text-[var(--color-rich-graphite)] uppercase tracking-wider">Account Settings</h3>
        <p className="text-[10px] text-[var(--color-gray-blue)]/80 font-light">Customize security thresholds, notices, and shipping vectors</p>
      </div>

      {/* Grid Settings System */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        
        {/* Navigation Sidebar Sub-menu */}
        <div className="md:col-span-1 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-none border-b md:border-b-0 border-[var(--color-silver-fog)]/30">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all duration-300 flex-shrink-0 text-left relative focus:outline-none w-full ${
                  active
                    ? 'text-white'
                    : 'text-[var(--color-deep-slate)]/80 hover:text-[var(--color-muted-teal)] hover:bg-[var(--color-silver-fog)]/20'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="active-settings-tab"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] rounded-xl -z-10 shadow-[0_4px_12px_rgba(95,124,123,0.2)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon size={14} className={active ? 'text-white' : 'text-[var(--color-gray-blue)]'} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Panels Content Box */}
        <div className="md:col-span-3 bg-[var(--color-soft-ivory)]/60 border border-[var(--color-silver-fog)]/30 rounded-3xl p-6 shadow-sm min-h-[300px] flex flex-col justify-between">
          <form onSubmit={handleSave} className="space-y-6 flex-grow">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Personal Info */}
              {activeTab === 'personal' && (
                <motion.div
                  key="personal"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-rich-graphite)] border-b border-[var(--color-silver-fog)]/20 pb-1.5">Personal Details</h4>
                  
                  <div className="grid grid-cols-1 gap-4 max-w-lg">
                    {/* Birthday field */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] pl-2 text-[var(--color-deep-slate)]/70">Birthday Date</label>
                      <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-xl text-xs font-light focus:outline-none transition-all shadow-sm"
                      />
                    </div>

                    {/* Default shipping address field */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] pl-2 text-[var(--color-deep-slate)]/70">Default Delivery Address</label>
                      <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        placeholder="Enter your street address..."
                        className="w-full px-4 py-2.5 bg-white border border-[var(--color-silver-fog)]/50 focus:border-[var(--color-muted-teal)] rounded-xl text-xs font-light focus:outline-none transition-all shadow-sm resize-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Security settings */}
              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-rich-graphite)] border-b border-[var(--color-silver-fog)]/20 pb-1.5">Security Thresholds</h4>

                  <div className="space-y-4">
                    {/* Two factor toggle */}
                    <div className="flex justify-between items-center bg-white border border-[var(--color-silver-fog)]/20 p-4 rounded-2xl">
                      <div>
                        <h5 className="text-xs font-bold text-[var(--color-rich-graphite)] flex items-center gap-1.5"><FiShield size={14} className="text-[var(--color-muted-teal)]" /> 2-Factor Authentication</h5>
                        <p className="text-[9px] text-[var(--color-gray-blue)]/80 font-light mt-0.5 leading-relaxed">Secure your loyalty assets with an extra SMS security code verification layer.</p>
                      </div>
                      
                      {/* Toggle button */}
                      <button
                        type="button"
                        onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${twoFactorAuth ? 'bg-[var(--color-muted-teal)]' : 'bg-[var(--color-silver-fog)]'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${twoFactorAuth ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>

                    {/* Active login devices logs */}
                    <div>
                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-deep-slate)]/70 mb-2.5 pl-2">Active Logins</h5>
                      <div className="bg-white border border-[var(--color-silver-fog)]/20 rounded-2xl p-4 divide-y divide-[var(--color-silver-fog)]/25">
                        <div className="flex justify-between items-center py-2 first:pt-0 last:pb-0 text-xs">
                          <div>
                            <span className="font-bold text-[var(--color-rich-graphite)]">Chrome &bull; Windows 11</span>
                            <span className="block text-[9px] text-[var(--color-muted-teal)] font-medium mt-0.5">Current Session &bull; London, UK</span>
                          </div>
                          <span className="px-2 py-0.5 bg-green-50 border border-green-200 text-[8px] font-bold uppercase text-green-600 rounded-full">Active</span>
                        </div>
                        <div className="flex justify-between items-center py-2.5 last:pb-0 text-xs">
                          <div>
                            <span className="font-bold text-[var(--color-rich-graphite)]">Safari &bull; iPhone 15 Pro</span>
                            <span className="block text-[9px] text-[var(--color-gray-blue)]/70 font-light mt-0.5">2 hours ago &bull; Kensington, UK</span>
                          </div>
                          <button type="button" className="text-[9px] font-bold uppercase text-red-500 hover:underline">Revoke</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 3: Notifications settings */}
              {activeTab === 'notifications' && (
                <motion.div
                  key="notifications"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-rich-graphite)] border-b border-[var(--color-silver-fog)]/20 pb-1.5">Notification Toggles</h4>

                  <div className="space-y-3">
                    {/* Switch 1: Marketing */}
                    <div className="flex justify-between items-center bg-white border border-[var(--color-silver-fog)]/20 p-4 rounded-2xl">
                      <div>
                        <h5 className="text-xs font-bold text-[var(--color-rich-graphite)]">Seasonal Specialty Offers</h5>
                        <p className="text-[9px] text-[var(--color-gray-blue)]/80 font-light mt-0.5 leading-relaxed">Receive notifications of limited roasts, barista recipes, and member gift claims.</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setMarketingEmails(!marketingEmails)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${marketingEmails ? 'bg-[var(--color-muted-teal)]' : 'bg-[var(--color-silver-fog)]'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${marketingEmails ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>

                    {/* Switch 2: Order updates */}
                    <div className="flex justify-between items-center bg-white border border-[var(--color-silver-fog)]/20 p-4 rounded-2xl">
                      <div>
                        <h5 className="text-xs font-bold text-[var(--color-rich-graphite)] flex items-center gap-1.5"><FiSmartphone size={14} className="text-[var(--color-muted-teal)]" /> Order SMS Bulletins</h5>
                        <p className="text-[9px] text-[var(--color-gray-blue)]/80 font-light mt-0.5 leading-relaxed">Get direct phone notifications on your delivery runner's current transit coordinates.</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setSmsUpdates(!smsUpdates)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${smsUpdates ? 'bg-[var(--color-muted-teal)]' : 'bg-[var(--color-silver-fog)]'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${smsUpdates ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Privacy Settings */}
              {activeTab === 'privacy' && (
                <motion.div
                  key="privacy"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-rich-graphite)] border-b border-[var(--color-silver-fog)]/20 pb-1.5">Privacy Preferences</h4>

                  <div className="space-y-3">
                    {/* Switch 1: Public profile */}
                    <div className="flex justify-between items-center bg-white border border-[var(--color-silver-fog)]/20 p-4 rounded-2xl">
                      <div>
                        <h5 className="text-xs font-bold text-[var(--color-rich-graphite)]">Public Profile Dashboard</h5>
                        <p className="text-[9px] text-[var(--color-gray-blue)]/80 font-light mt-0.5 leading-relaxed">Allow other café club members to discover your top favorite drinks or badges.</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setPublicProfile(!publicProfile)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${publicProfile ? 'bg-[var(--color-muted-teal)]' : 'bg-[var(--color-silver-fog)]'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${publicProfile ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>

                    {/* Switch 2: Data sharing */}
                    <div className="flex justify-between items-center bg-white border border-[var(--color-silver-fog)]/20 p-4 rounded-2xl">
                      <div>
                        <h5 className="text-xs font-bold text-[var(--color-rich-graphite)]">Anonymous Metrics Logging</h5>
                        <p className="text-[9px] text-[var(--color-gray-blue)]/80 font-light mt-0.5 leading-relaxed">Help us improve extraction speeds by sharing anonymous fulfillment data.</p>
                      </div>
                      
                      <button
                        type="button"
                        onClick={() => setDataSharing(!dataSharing)}
                        className={`w-10 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${dataSharing ? 'bg-[var(--color-muted-teal)]' : 'bg-[var(--color-silver-fog)]'}`}
                      >
                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${dataSharing ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
            
            {/* Primary Save Button */}
            <div className="flex justify-end pt-6 mt-6 border-t border-[var(--color-silver-fog)]/20">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] text-white text-[9px] font-bold uppercase tracking-wider rounded-xl transition-all shadow flex items-center gap-1.5 disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : (
                  <>
                    <FiSave size={12} />
                    <span>Save Settings</span>
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>

    </motion.div>
  );
};

export default Settings;
