import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState, useCallback } from 'react';
import { portfolioData } from '../data/portfolio';

/* ─── Animation variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

/* ─── Services data ─── */
const services = [
  { title: 'SaaS Video', icon: '🎬', desc: 'Engaging videos to showcase your SaaS products and drive conversions.', tab: 'animation', cat: 'saas_anim' },
  { title: '2D Animation', icon: '🎨', desc: 'Bring ideas to life with high-quality 2D animations that captivate.', tab: 'animation', cat: 'explainer2d' },
  { title: 'Web Dev', icon: '💻', desc: 'Custom, performant, and scalable web applications on any platform.', tab: 'websites', cat: 'all' },
  { title: 'Video Editing', icon: '✂️', desc: 'Professional video editing and post-production for all platforms.', tab: 'animation', cat: 'videoediting' },
  { title: 'Brand Identity', icon: '✨', desc: 'Stand out with a memorable brand identity and graphic design.', tab: 'design', cat: 'branding' },
  { title: 'Script & Storyboard', icon: '📝', desc: 'Compelling narratives and visual storyboards for any medium.', tab: 'animation', cat: 'showreel' },
  { title: 'AI Creative Production', icon: '🤖', desc: 'Cutting-edge AI tools for fast, creative content at scale.', tab: 'websites', cat: 'aiapp' },
  { title: 'Social Media Content', icon: '📱', desc: 'Scroll-stopping content designed for your social feeds.', tab: 'design', cat: 'socialmedia' },
  { title: 'Visual Solutions', icon: '👁️', desc: 'Comprehensive visual strategies that elevate your brand.', tab: 'design', cat: 'illustrations' },
  { title: 'SMM', icon: '📈', desc: 'Social Media Marketing strategies to amplify your reach.', tab: 'design', cat: 'socialmedia' },
  { title: 'SEO', icon: '🔍', desc: 'Search Engine Optimization to dominate search rankings.', tab: 'websites', cat: 'all' },
];

/* ─── Stats ─── */
const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '50+', label: 'Global Clients' },
  { value: '11+', label: 'Services Offered' },
  { value: '99%', label: 'Client Satisfaction' },
];

/* ─── Magnetic Button ─── */
function MagneticButton({ children, className = '' }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Particle background ─── */
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: 4 + Math.random() * 4,
            height: 4 + Math.random() * 4,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ─── YouTube Modal ─── */
function YTModal({ ytId, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-[0_25px_80px_rgba(99,102,241,0.3)] border border-white/10"
        >
          <iframe
            src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
            title="Portfolio Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-10 text-lg"
          >
            ✕
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Featured Portfolio Card (Home) ─── */
function FeaturedCard({ item, idx, onPlayVideo }) {
  const isAnimation = item.group === 'animation';
  const isWebsite = item.group === 'websites';
  const isDesign = item.group === 'design';

  const handleClick = useCallback(() => {
    if (isAnimation && item.ytId) onPlayVideo(item.ytId);
    else if (isWebsite && item.url) window.open(item.url, '_blank', 'noopener,noreferrer');
    else if (isDesign && item.driveId) window.open(`https://drive.google.com/file/d/${item.driveId}/view`, '_blank', 'noopener,noreferrer');
  }, [item, isAnimation, isWebsite, isDesign, onPlayVideo]);

  const isClickable = (isAnimation && item.ytId) || (isWebsite && item.url) || (isDesign && item.driveId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`group ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={isClickable ? handleClick : undefined}
    >
      <div className="glass-card overflow-hidden h-full hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.25)] hover:-translate-y-1.5">
        <div className="aspect-video relative overflow-hidden bg-surface">
          {/* Thumbnail */}
          {item.driveId ? (
            <img
              src={`https://lh3.googleusercontent.com/d/${item.driveId}=w600`}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
          ) : item.ytId ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${item.ytId}/maxresdefault.jpg`}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/50 transition-colors duration-300">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-14 h-14 bg-primary/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-white/20"
                >
                  <svg className="w-5 h-5 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="text-4xl font-display font-bold text-primary/30 group-hover:text-primary/60 group-hover:scale-110 transition-all duration-500">
                {item.name.charAt(0)}
              </div>
            </div>
          )}

          {/* Group badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10 capitalize">
            {item.group}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
            <div>
              <h3 className="text-sm font-bold text-white">{item.name}</h3>
              <span className="text-xs text-primary/80">
                {isAnimation ? '▶ Watch Video' : isWebsite ? 'Visit Site ↗' : 'View Design ↗'}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-semibold group-hover:text-primary transition-colors duration-300 truncate">{item.name}</h3>
          <p className="text-xs text-textMuted mt-0.5">{item.blurb}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Pick a mix of featured items: websites + animation + design
  const featuredItems = portfolioData
    .filter(p => p.featured)
    .slice(0, 9); // show 9 mixed

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const rawHeroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const rawHeroOpacity = useTransform(heroScroll, [0, 0.5, 0.8], [1, 0.8, 0]);
  const rawHeroScale = useTransform(heroScroll, [0, 0.8], [1, 0.97]);
  const heroY = useSpring(rawHeroY, { stiffness: 80, damping: 30, mass: 0.5 });
  const heroOpacity = useSpring(rawHeroOpacity, { stiffness: 80, damping: 30, mass: 0.5 });
  const heroScale = useSpring(rawHeroScale, { stiffness: 80, damping: 30, mass: 0.5 });

  const { scrollYProgress: ctaScroll } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start']
  });
  const rawCtaY = useTransform(ctaScroll, [0, 1], [60, -60]);
  const ctaY = useSpring(rawCtaY, { stiffness: 80, damping: 30, mass: 0.5 });

  const headingWords = ['We', 'create', 'digital', 'magic'];

  return (
    <div className="overflow-hidden">

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-16 perspective-1000">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[30%] -right-[15%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-br from-primary/15 to-secondary/10 blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[30%] -left-[15%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-gradient-to-tr from-secondary/10 to-purple-500/10 blur-[120px] pointer-events-none"
        />

        <FloatingParticles />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-5xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Your All-In-One Creative Partner
            </motion.div>

            <div className="mb-8">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-display font-bold leading-[1.05] tracking-tight">
                {headingWords.map((word, i) => (
                  <motion.span
                    key={word}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className={`inline-block mr-[0.25em] ${i >= 2 ? 'gradient-text' : ''}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>
            </div>

            <motion.p variants={fadeInUp} custom={4} className="text-lg md:text-xl lg:text-2xl text-textMuted mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              From <strong className="text-white font-medium">Video Production &amp; Animation</strong> to{' '}
              <strong className="text-white font-medium">AI Creatives &amp; SEO</strong> — we elevate your brand across every digital dimension.
            </motion.p>

            <motion.div variants={fadeInUp} custom={5} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton>
                <Link to="/portfolio" className="btn-primary text-lg px-8 py-4 shadow-[0_0_30px_rgba(99,102,241,0.25)] hover:shadow-[0_0_50px_rgba(99,102,241,0.4)] transition-shadow">
                  Explore Our Work
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link to="/contact" className="btn-outline text-lg px-8 py-4 hover:bg-white/5">
                  Start a Project
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-white/60" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="relative py-16 bg-surface/80 backdrop-blur-md border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-textMuted">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES ═══════════════ */}
      <section ref={servicesRef} className="py-32 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(99,102,241,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6">Services</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Everything you need,<br /><span className="gradient-text">in one place.</span>
            </h2>
            <p className="text-xl text-textMuted max-w-2xl mx-auto">We are a full-service digital studio. Here is what we do best.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                className="group"
              >
                <Link
                  to={`/portfolio?tab=${service.tab}${service.cat !== 'all' ? `&cat=${service.cat}` : ''}`}
                  className="block h-full"
                >
                  <div className="glass-card p-8 h-full relative overflow-hidden transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.2)] cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {/* Arrow indicator */}
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/30">
                      <span className="text-xs text-primary">↗</span>
                    </div>

                    <div className="relative z-10">
                      <div className="text-4xl mb-5 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 origin-bottom-left">{service.icon}</div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{service.title}</h3>
                      <p className="text-textMuted text-sm leading-relaxed">{service.desc}</p>
                      <div className="mt-4 flex items-center gap-1 text-xs text-primary/60 group-hover:text-primary transition-colors duration-300">
                        <span>View Portfolio</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* CTA Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: services.length * 0.04 }}
              className="group"
            >
              <div className="glass-card p-8 h-full bg-gradient-to-br from-primary/15 to-secondary/15 border-primary/20 flex flex-col items-center justify-center text-center hover:-translate-y-2 transition-transform duration-500">
                <h3 className="text-2xl font-bold mb-2">Need something else?</h3>
                <p className="text-textMuted text-sm mb-6">We love a good challenge.</p>
                <MagneticButton>
                  <Link to="/contact" className="btn-primary shadow-lg shadow-primary/25">Let's Talk</Link>
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* View All Services button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link to="/services" className="btn-outline inline-flex items-center gap-2">
              View All Services
              <span className="text-xs">→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ SCROLLING MARQUEE ═══════════════ */}
      <section className="py-20 overflow-hidden bg-black relative">
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          className="flex whitespace-nowrap items-center"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-10 mx-5">
              <span className="text-6xl md:text-8xl font-black stroke-text opacity-40">SaaS VIDEO</span>
              <span className="text-4xl md:text-6xl text-primary/30">✦</span>
              <span className="text-6xl md:text-8xl font-black stroke-text opacity-40">ANIMATION</span>
              <span className="text-4xl md:text-6xl text-primary/30">✦</span>
              <span className="text-6xl md:text-8xl font-black stroke-text opacity-40">WEB DEV</span>
              <span className="text-4xl md:text-6xl text-primary/30">✦</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          animate={{ x: [-1200, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
          className="flex whitespace-nowrap items-center mt-6"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-10 mx-5">
              <span className="text-5xl md:text-7xl font-black stroke-text opacity-20">BRAND IDENTITY</span>
              <span className="text-3xl md:text-5xl text-secondary/20">●</span>
              <span className="text-5xl md:text-7xl font-black stroke-text opacity-20">SEO &amp; SMM</span>
              <span className="text-3xl md:text-5xl text-secondary/20">●</span>
              <span className="text-5xl md:text-7xl font-black stroke-text opacity-20">AI PRODUCTION</span>
              <span className="text-3xl md:text-5xl text-secondary/20">●</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════ FEATURED PORTFOLIO ═══════════════ */}
      <section className="py-32 relative z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6">Featured Work</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              A sample of what<br /><span className="gradient-text">we've shipped.</span>
            </h2>
            <p className="text-xl text-textMuted max-w-2xl mx-auto">
              Websites, animations & designs — click any card to explore the full work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredItems.map((item, idx) => (
              <FeaturedCard
                key={item.name + item.group}
                item={item}
                idx={idx}
                onPlayVideo={(ytId) => setActiveVideo(ytId)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-14"
          >
            <MagneticButton>
              <Link to="/portfolio" className="btn-primary text-base px-8 py-3.5 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                View Full Portfolio →
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section ref={ctaRef} className="py-32 relative overflow-hidden">
        <motion.div
          style={{ y: ctaY }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(139,92,246,0.12)_0%,transparent_70%)] pointer-events-none"
        />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card p-12 md:p-20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-secondary/10 blur-[60px] pointer-events-none" />

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative z-10">
              Ready to transform<br />your brand?
            </h2>
            <p className="text-textMuted mb-10 text-lg md:text-xl relative z-10">
              Let's discuss how our services can accelerate your growth.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 relative z-10">
              <MagneticButton>
                <Link to="/contact" className="btn-primary text-lg px-10 py-4 shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                  Start a Project
                </Link>
              </MagneticButton>
              <MagneticButton>
                <a href="mailto:cashtechventures@gmail.com" className="btn-outline text-lg px-10 py-4">
                  Email Us
                </a>
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* YouTube Modal */}
      {activeVideo && (
        <YTModal ytId={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}
