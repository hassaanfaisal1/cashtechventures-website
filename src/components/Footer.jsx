import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' },
];

const platforms = [
  { label: 'Shopify', to: '/portfolio?tab=websites&sub=shopify' },
  { label: 'WordPress', to: '/portfolio?tab=websites&sub=wordpress' },
  { label: 'Webflow', to: '/portfolio?tab=websites&sub=webflow' },
  { label: 'React', to: '/portfolio?tab=websites&sub=react' },
];

export default function Footer() {
  return (
    <footer className="relative bg-surface border-t border-white/5 overflow-hidden">
      {/* Big CTA Section */}
      <div className="relative py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,rgba(99,102,241,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[0.95]"
          >
            Let's work
            <br />
            <span className="gradient-text">together.</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary text-lg px-10 py-4"
              >
                Start a Project →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <Link to="/" className="flex items-center space-x-3 mb-4 group">
                <img src="/logo.jpg" alt="CashTechVentures" className="h-10 w-auto object-contain" />
              </Link>
              <p className="text-textMuted text-sm leading-relaxed">
                A full-service digital studio — SaaS videos, 2D animation, web dev, branding, AI creatives, and everything in between.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-textMuted">Company</h4>
              <ul className="space-y-3">
                {footerLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative group"
                    >
                      <span>{link.label}</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-textMuted">Platforms</h4>
              <ul className="space-y-3">
                {platforms.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-300 relative group"
                    >
                      <span>{link.label}</span>
                      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider text-textMuted">Get in touch</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+447411435352" className="text-sm text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-xs group-hover:bg-primary/20 transition-colors">📞</span>
                    +44 7411 435352
                  </a>
                </li>
                <li>
                  <a href="mailto:cashtechventures@gmail.com" className="text-sm text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-xs group-hover:bg-primary/20 transition-colors">✉️</span>
                    cashtechventures@gmail.com
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-white/60 hover:text-white transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-5 h-5 rounded bg-white/5 flex items-center justify-center text-xs group-hover:bg-primary/20 transition-colors">💬</span>
                    Contact form
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-textMuted gap-2">
            <p>© {new Date().getFullYear()} Cashtech Ventures. All rights reserved.</p>
            <p className="opacity-50">Crafted with precision, one pixel at a time.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
