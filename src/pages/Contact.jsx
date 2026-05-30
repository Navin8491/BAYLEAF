import React, { useState } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
// Import separated backend modules from unified services index
import { submitContactMessage } from '../services';

const formContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const formItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const consolidatedMessage = `Subject: ${formData.subject}\n\n${formData.message}`;

      const result = await submitContactMessage({
        name: fullName,
        email: formData.email,
        phone: formData.phone || '',
        message: consolidatedMessage
      });

      setIsSubmitting(false);

      if (!result.success) {
        alert('Could not submit inquiry: ' + result.message);
        return;
      }

      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setIsSubmitting(false);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-2">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-8 bg-[var(--color-mist-sage)]/20 border border-[var(--color-mist-sage)]/40 rounded-[2.5rem] text-center flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--color-muted-teal)] text-white flex items-center justify-center shadow-[0_10px_20px_rgba(95,124,123,0.3)]">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-heading font-medium text-[var(--color-rich-graphite)]">Message Sent</h3>
            <p className="text-sm text-[var(--color-gray-blue)] font-light max-w-sm leading-relaxed">
              Thank you for connecting. Our team will review your message and reach out shortly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-2 text-xs font-bold uppercase tracking-widest text-[var(--color-muted-teal)] hover:text-[var(--color-deep-slate)] transition-colors border-b border-[var(--color-muted-teal)]/40 pb-0.5"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            variants={formContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-5"
          >
            {/* First Name & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <motion.div variants={formItemVariants} className="flex flex-col gap-2">
                <label className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${focusedField === 'firstName' ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]/60'
                  }`}>
                  First Name
                </label>
                <div className={`relative w-full rounded-2xl bg-white/50 backdrop-blur-md border transition-all duration-300 ${focusedField === 'firstName'
                    ? 'border-[var(--color-muted-teal)] bg-white shadow-[0_8px_20px_rgba(95,124,123,0.06)]'
                    : 'border-[var(--color-silver-fog)]/80'
                  }`}>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Jane"
                    required
                    className="w-full bg-transparent px-5 py-3.5 text-sm text-[var(--color-rich-graphite)] placeholder-[#55606B] font-body focus:outline-none"
                  />
                </div>
              </motion.div>

              <motion.div variants={formItemVariants} className="flex flex-col gap-2">
                <label className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${focusedField === 'lastName' ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]/60'
                  }`}>
                  Last Name
                </label>
                <div className={`relative w-full rounded-2xl bg-white/50 backdrop-blur-md border transition-all duration-300 ${focusedField === 'lastName'
                    ? 'border-[var(--color-muted-teal)] bg-white shadow-[0_8px_20px_rgba(95,124,123,0.06)]'
                    : 'border-[var(--color-silver-fog)]/80'
                  }`}>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Doe"
                    required
                    className="w-full bg-transparent px-5 py-3.5 text-sm text-[var(--color-rich-graphite)] placeholder-[#55606B] font-body focus:outline-none"
                  />
                </div>
              </motion.div>
            </div>

            {/* Email Address */}
            <motion.div variants={formItemVariants} className="flex flex-col gap-2">
              <label className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${focusedField === 'email' ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]/60'
                }`}>
                Email Address
              </label>
              <div className={`relative w-full rounded-2xl bg-white/50 backdrop-blur-md border transition-all duration-300 ${focusedField === 'email'
                  ? 'border-[var(--color-muted-teal)] bg-white shadow-[0_8px_20px_rgba(95,124,123,0.06)]'
                  : 'border-[var(--color-silver-fog)]/80'
                }`}>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="jane@example.com"
                  required
                  className="w-full bg-transparent px-5 py-3.5 text-sm text-[var(--color-rich-graphite)] placeholder-[#55606B] font-body focus:outline-none"
                />
              </div>
            </motion.div>

            {/* Phone Number */}
            <motion.div variants={formItemVariants} className="flex flex-col gap-2">
              <label className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${focusedField === 'phone' ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]/60'
                }`}>
                Phone Number
              </label>
              <div className={`relative w-full rounded-2xl bg-white/50 backdrop-blur-md border transition-all duration-300 ${focusedField === 'phone'
                  ? 'border-[var(--color-muted-teal)] bg-white shadow-[0_8px_20px_rgba(95,124,123,0.06)]'
                  : 'border-[var(--color-silver-fog)]/80'
                }`}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="+44 7123 456789"
                  className="w-full bg-transparent px-5 py-3.5 text-sm text-[var(--color-rich-graphite)] placeholder-[#55606B] font-body focus:outline-none"
                />
              </div>
            </motion.div>

            {/* Subject */}
            <motion.div variants={formItemVariants} className="flex flex-col gap-2">
              <label className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${focusedField === 'subject' ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]/60'
                }`}>
                Subject
              </label>
              <div className={`relative w-full rounded-2xl bg-white/50 backdrop-blur-md border transition-all duration-300 ${focusedField === 'subject'
                  ? 'border-[var(--color-muted-teal)] bg-white shadow-[0_8px_20px_rgba(95,124,123,0.06)]'
                  : 'border-[var(--color-silver-fog)]/80'
                }`}>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('subject')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="How can we help?"
                  required
                  className="w-full bg-transparent px-5 py-3.5 text-sm text-[var(--color-rich-graphite)] placeholder-[#55606B] font-body focus:outline-none"
                />
              </div>
            </motion.div>

            {/* Message */}
            <motion.div variants={formItemVariants} className="flex flex-col gap-2">
              <label className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${focusedField === 'message' ? 'text-[var(--color-muted-teal)]' : 'text-[var(--color-deep-slate)]/60'
                }`}>
                Message
              </label>
              <div className={`relative w-full rounded-2xl bg-white/50 backdrop-blur-md border transition-all duration-300 ${focusedField === 'message'
                  ? 'border-[var(--color-muted-teal)] bg-white shadow-[0_8px_20px_rgba(95,124,123,0.06)]'
                  : 'border-[var(--color-silver-fog)]/80'
                }`}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows="4"
                  placeholder="Tell us about it..."
                  required
                  className="w-full bg-transparent px-5 py-3.5 text-sm text-[var(--color-rich-graphite)] placeholder-[#55606B] font-body focus:outline-none resize-none"
                ></textarea>
              </div>
            </motion.div>

            {/* Submit Button - guaranteed rendering and visible state */}
            <motion.button
              variants={formItemVariants}
              type="submit"
              disabled={isSubmitting}
              className="self-start mt-4 flex items-center justify-center gap-4 bg-gradient-to-br from-[var(--color-muted-teal)] to-[var(--color-deep-sage-teal)] text-white px-10 py-4 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:from-[var(--color-deep-sage-teal)] hover:to-[var(--color-muted-teal)] transition-all duration-500 shadow-[0_12px_24px_rgba(95,124,123,0.18)] hover:-translate-y-0.5 hover:shadow-[0_18px_35px_rgba(95,124,123,0.25),0_0_15px_rgba(181,156,122,0.15)] group overflow-hidden relative cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transform -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-out"></div>
              <span className="relative z-10">{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

const Contact = () => {
  return (
    <div className="bg-[var(--color-soft-ivory)] min-h-screen text-[var(--color-gray-blue)] overflow-x-hidden font-body selection:bg-[var(--color-muted-teal)] selection:text-white relative">

      {/* GLOBAL AMBIENT BACKGROUND LAYER */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[var(--color-soft-ivory)]">
        <motion.div
          className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] bg-[var(--color-powder-blue)]/30 rounded-full blur-[130px]"
          animate={{ x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[5%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[var(--color-mist-sage)]/25 rounded-full blur-[110px]"
          animate={{ x: [0, 20, -20, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* LUXURY EDITORIAL HERO */}
      <section className="relative pt-32 pb-12 px-6 lg:px-12 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center z-10 relative"
        >
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[var(--color-muted-teal)] block mb-4">Get In Touch</span>

          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-heading font-medium text-[var(--color-rich-graphite)] leading-[0.9] mb-4 tracking-tight">
            Say <span className="italic font-light text-[var(--color-deep-slate)]">Hello.</span>
          </h1>

          <div className="w-24 h-[1px] bg-[var(--color-silver-fog)] mx-auto mb-4"></div>

          <p className="text-lg text-[var(--color-gray-blue)] max-w-lg mx-auto leading-relaxed font-light">
            Whether you have a question about our roasts, want to host an event, or just want to say hi, our team is always here for you.
          </p>
        </motion.div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="contact-section py-8 px-6 lg:px-12 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column: Contact Info & Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {[
                { icon: <FiMapPin size={22} />, title: 'Our Location', detail: '124 Soho Square, London, W1D 3NT' },
                { icon: <FiPhone size={22} />, title: 'Call Us', detail: '+44 20 7123 4567' },
                { icon: <FiMail size={22} />, title: 'Email', detail: 'hello@bayleafcafe.in' }
              ].map((item, idx) => (
                <div key={idx} className="contact-card flex items-start gap-6 p-6 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-[var(--color-silver-fog)]/50 hover:bg-white hover:border-[var(--color-sand-accent)]/30 hover:shadow-[0_15px_30px_rgba(57,70,82,0.06)] transition-all duration-500 group">
                  <div className="w-10 h-10 rounded-2xl bg-[var(--color-powder-blue)]/40 flex items-center justify-center text-[var(--color-deep-slate)] group-hover:bg-[var(--color-muted-teal)] group-hover:text-white transition-all duration-500 shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-medium text-[var(--color-rich-graphite)] mb-1">{item.title}</h3>
                    <p className="text-[var(--color-deep-slate)] font-light text-sm">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Aesthetic Image */}
            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-[0_20px_45px_rgba(47,52,59,0.08)] mt-4 hidden lg:block border border-[var(--color-silver-fog)]/40 bg-white p-3 group">
              <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 pointer-events-none"></div>
                <img
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop"
                  alt="Cafe Details"
                  className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Luxury Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="lg:col-span-7 contact-form-container relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-powder-blue)]/40 to-[var(--color-mist-sage)]/20 rounded-[3.5rem] transform translate-x-3 translate-y-3 -z-10 blur-2xl opacity-50"></div>

            <div className="bg-white/70 backdrop-blur-xl p-8 lg:p-10 rounded-[3.5rem] shadow-[0_25px_50px_rgba(56,68,80,0.05)] border border-[var(--color-silver-fog)]/50 relative overflow-hidden">
              <h2 className="text-4xl font-heading font-medium text-[var(--color-rich-graphite)] mb-6">Drop us a line</h2>

              <ContactForm />
            </div>
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Contact;
