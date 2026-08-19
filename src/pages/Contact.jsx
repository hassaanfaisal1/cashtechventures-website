import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function Contact() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
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

  return (
    <div className="pt-20 pb-32">
      <header className="py-20 text-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">Contact Us</motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">Let's build something <span className="gradient-text">great together.</span></motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-textMuted">Tell us about your project — platform, timeline, budget — and we'll get back to you within 1–2 business days.</motion.p>
          </motion.div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-2 glass-card p-8 md:p-12">
            {status === 'success' && (
              <div className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm font-medium">
                ✓ Message sent successfully! We'll get back to you within 1–2 business days.
              </div>
            )}
            
            <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
            <p className="text-textMuted mb-8 text-sm">Fill in the details below and we'll scope your project and get back to you fast.</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <input type="hidden" name="access_key" value="99cac168-ae74-4f0f-a3e5-96989c7646c9" />
              <input type="hidden" name="subject" value="New Project Inquiry — Cashtech Ventures" />
              <input type="checkbox" name="botcheck" style={{display: 'none'}} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-textMuted">Full name</label>
                  <input id="name" name="name" type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-textMuted">Email address</label>
                  <input id="email" name="email" type="email" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="jane@company.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="projectType" className="text-xs font-bold uppercase tracking-wider text-textMuted">Project type</label>
                  <select id="projectType" name="projectType" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [&>option]:bg-surface">
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
                </div>
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-xs font-bold uppercase tracking-wider text-textMuted">Estimated budget</label>
                  <select id="budget" name="budget" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all [&>option]:bg-surface">
                    <option value="">Select a range</option>
                    <option>Under $2,000</option>
                    <option>$2,000 – $5,000</option>
                    <option>$5,000 – $15,000</option>
                    <option>$15,000 – $50,000</option>
                    <option>$50,000+</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-textMuted">Project details</label>
                <textarea id="message" name="message" rows="5" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y min-h-[120px]" placeholder="Tell us about your project, goals, timeline and any references you have in mind..."></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message →'}
              </button>
              
              {status === 'error' && <p className="text-red-400 text-sm text-center">Failed to send. Please try again or email us directly.</p>}
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
            <div className="glass-card p-6 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">📞</div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-1">Phone</h4>
                <a href="tel:+447411435352" className="text-lg font-bold hover:text-primary transition-colors">+44 7411 435352</a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl flex-shrink-0">✉️</div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-1">Email</h4>
                <a href="mailto:cashtechventures@gmail.com" className="text-lg font-bold hover:text-primary transition-colors">cashtechventures@gmail.com</a>
              </div>
            </div>

            <div className="glass-card p-6 flex items-start space-x-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-xl flex-shrink-0">⚡</div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-1">Response Time</h4>
                <p className="text-lg font-bold">Within 1–2 business days</p>
              </div>
            </div>

            <div className="glass-card p-8">
              <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted mb-4">What to include</h4>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm text-textMuted"><span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0 text-xs">🎯</span> Your platform preference</li>
                <li className="flex gap-3 text-sm text-textMuted"><span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0 text-xs">📅</span> Your rough timeline</li>
                <li className="flex gap-3 text-sm text-textMuted"><span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0 text-xs">🔗</span> Links to references you love</li>
                <li className="flex gap-3 text-sm text-textMuted"><span className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0 text-xs">💡</span> Specific features you need</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
