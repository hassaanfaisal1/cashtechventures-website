import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

const formFields = [
  { id: 'name', label: 'Full name', type: 'text', placeholder: 'Jane Doe', required: true, half: true },
  { id: 'email', label: 'Email address', type: 'email', placeholder: 'jane@company.com', required: true, half: true },
];

export default function Contact() {
  const [status, setStatus] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://formsubmit.co/ajax/cashtechventures@gmail.com', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (fieldId) => `w-full bg-white/5 border rounded-xl px-4 py-3.5 text-white focus:outline-none transition-all duration-500 placeholder:text-white/20 ${
    focusedField === fieldId
      ? 'border-primary ring-2 ring-primary/20 bg-white/[0.07]'
      : 'border-white/10 hover:border-white/20'
  }`;

  return (
    <div className="pt-20 pb-32 overflow-hidden">
      {/* Header */}
      <header className="relative py-20 md:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-10 right-[15%] w-32 h-32 rounded-full bg-primary/10 blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 left-[15%] w-40 h-40 rounded-full bg-secondary/10 blur-[80px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
              Contact Us
            </motion.div>
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Let's build something <span className="gradient-text">great together.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} custom={2} className="text-lg text-textMuted">
              Tell us about your project — platform, timeline, budget — and we'll get back to you within 1–2 business days.
            </motion.p>
          </motion.div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="mb-8 p-5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium flex items-center gap-3"
                  >
                    <span className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-lg flex-shrink-0">✓</span>
                    <span>Message sent successfully! We'll get back to you within 1–2 business days.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
                <p className="text-textMuted mb-8 text-sm">Fill in the details below and we'll scope your project and get back to you fast.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="_subject" value="New Project Inquiry — Cashtech Ventures" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="box" />
                  <input type="text" name="_honey" style={{ display: 'none' }} />

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.map((field, idx) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                        className="space-y-2"
                      >
                        <label htmlFor={field.id} className="text-xs font-bold uppercase tracking-wider text-textMuted">{field.label}</label>
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className={inputClass(field.id)}
                        />
                      </motion.div>
                    ))}
                  </div>

                  {/* Project type & Budget */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <label htmlFor="projectType" className="text-xs font-bold uppercase tracking-wider text-textMuted">Project type</label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        onFocus={() => setFocusedField('projectType')}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputClass('projectType')} [&>option]:bg-surface`}
                      >
                        <option value="">Select one</option>
                        <option>E-Commerce</option>
                        <option>CMS Website</option>
                        <option>Custom Web App</option>
                        <option>Mobile App</option>
                        <option>AI-Powered Website or App</option>
                        <option>Dashboard / SaaS Product</option>
                        <option>UI/UX & Figma Design</option>
                        <option>Branding & Identity</option>
                        <option>3D / Animation / Motion</option>
                        <option>SEO & Digital Marketing</option>
                        <option>Something else</option>
                      </select>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="space-y-2"
                    >
                      <label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-textMuted">Estimated budget</label>
                      <select
                        id="budget"
                        name="budget"
                        onFocus={() => setFocusedField('budget')}
                        onBlur={() => setFocusedField(null)}
                        className={`${inputClass('budget')} [&>option]:bg-surface`}
                      >
                        <option value="">Select a range</option>
                        <option>Under $2,000</option>
                        <option>$2,000 – $5,000</option>
                        <option>$5,000 – $15,000</option>
                        <option>$15,000 – $50,000</option>
                        <option>$50,000+</option>
                        <option>Not sure yet</option>
                      </select>
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="space-y-2"
                  >
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-textMuted">Project details</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      required
                      placeholder="Tell us about your project, goals, timeline and any references you have in mind..."
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputClass('message')} resize-y min-h-[140px]`}
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: 1.01, boxShadow: '0 0 30px rgba(99,102,241,0.3)' }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group"
                    >
                      <span className="relative z-10">
                        {status === 'sending' ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Sending...
                          </span>
                        ) : 'Send Message →'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </motion.button>
                  </motion.div>

                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-400 text-sm text-center"
                      >
                        Failed to send. Please try again or email us directly.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-5"
          >
            {[
              { icon: '📞', label: 'Phone', value: '+44 7411 435352', href: 'tel:+447411435352', color: 'bg-primary/10' },
              { icon: '✉️', label: 'Email', value: 'cashtechventures@gmail.com', href: 'mailto:cashtechventures@gmail.com', color: 'bg-emerald-500/10' },
              { icon: '⚡', label: 'Response Time', value: 'Within 1–2 business days', color: 'bg-secondary/10' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="glass-card p-6 flex items-start space-x-4 group hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-1">{item.label}</h4>
                  {item.href ? (
                    <a href={item.href} className="text-base font-bold hover:text-primary transition-colors duration-300">{item.value}</a>
                  ) : (
                    <p className="text-base font-bold">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="glass-card p-8 hover:border-white/20 transition-colors duration-300"
            >
              <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-5">What to include</h4>
              <ul className="space-y-4">
                {[
                  { icon: '🎯', text: 'Your platform preference' },
                  { icon: '📅', text: 'Your rough timeline' },
                  { icon: '🔗', text: 'Links to references you love' },
                  { icon: '💡', text: 'Specific features you need' },
                ].map((item) => (
                  <li key={item.text} className="flex gap-3 text-sm text-textMuted group/item">
                    <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-xs group-hover/item:bg-primary/10 transition-colors duration-300">
                      {item.icon}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
