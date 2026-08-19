import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';

/* ─── Tab config ─── */
const TOP_TABS = [
  { label: 'All', key: 'all', icon: '◆' },
  { label: 'Websites', key: 'websites', icon: '💻' },
  { label: 'Animation', key: 'animation', icon: '🎬' },
  { label: 'Design', key: 'design', icon: '🎨' },
];

const SUB_TABS = {
  websites: [
    { label: 'All Websites', key: 'all' },
    { label: 'Shopify', key: 'shopify' },
    { label: 'WooCommerce', key: 'woocommerce' },
    { label: 'WordPress', key: 'wordpress' },
    { label: 'Webflow', key: 'webflow' },
    { label: 'Wix', key: 'wix' },
    { label: 'Squarespace', key: 'squarespace' },
    { label: 'Magento', key: 'magento' },
    { label: 'React', key: 'react' },
    { label: 'Framer', key: 'framer' },
    { label: 'AI App', key: 'aiapp' },
    { label: '3D', key: 'threed' },
    { label: 'SaaS', key: 'saas' },
    { label: 'Business', key: 'business' },
    { label: 'Coaching', key: 'coaching' },
    { label: 'Figma', key: 'figma' },
    { label: 'Mobile Apps', key: 'mobileapp' },
  ],
  animation: [
    { label: 'All Animation', key: 'all' },
    { label: 'SaaS UI', key: 'saas_anim' },
    { label: 'SaaS Explainer', key: 'saas_explainer' },
    { label: '2D Explainer', key: 'explainer2d' },
    { label: 'Mobile App', key: 'mobileapp' },
    { label: '3D Animation', key: 'anim3d' },
    { label: 'Logo Anim', key: 'logo_anim' },
    { label: 'Whiteboard', key: 'whiteboard' },
    { label: '2D Cartoon', key: 'cartoon' },
    { label: 'Anime Style', key: 'anime' },
    { label: 'Hand Drawn', key: 'handdrawn' },
    { label: 'Motion Graphics', key: 'motion' },
    { label: 'Promotional', key: 'promotional' },
    { label: 'Product Anim', key: 'productanim' },
    { label: 'Character Anim', key: 'character' },
    { label: 'UI Dashboard', key: 'uidashanim' },
    { label: 'Loading Anim', key: 'loading' },
    { label: 'Showreel', key: 'showreel' },
    { label: 'Video Editing', key: 'videoediting' },
  ],
  design: [
    { label: 'All Design', key: 'all' },
    { label: 'Social Media', key: 'socialmedia' },
    { label: 'Flyers & Ads', key: 'flyers' },
    { label: 'Business Cards', key: 'bizcards' },
    { label: 'Packaging', key: 'packaging' },
    { label: 'Branding', key: 'branding' },
    { label: 'Logo Designs', key: 'logos' },
    { label: 'Infographics', key: 'infographics' },
    { label: "Children's Book", key: 'childrensbook' },
    { label: 'Dashboards', key: 'dashboards' },
    { label: 'Book Covers', key: 'bookcovers' },
    { label: 'Illustrations', key: 'illustrations' },
    { label: 'Posters', key: 'posters' },
  ],
};

/* ─── Animations ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }
  })
};

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

/* ─── Portfolio Card ─── */
function PortfolioCard({ item, idx, onPlayVideo }) {
  const isWebsite = item.group === 'websites';
  const isAnimation = item.group === 'animation';
  const isDesign = item.group === 'design';

  const handleCardClick = useCallback(() => {
    if (isAnimation && item.ytId) {
      onPlayVideo(item.ytId);
    } else if (isWebsite && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.driveId) {
      window.open(`https://drive.google.com/file/d/${item.driveId}/view`, '_blank', 'noopener,noreferrer');
    }
  }, [item, isAnimation, isWebsite, onPlayVideo]);

  const isClickable = (isAnimation && item.ytId) || (isWebsite && item.url) || item.driveId;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -10 }}
      transition={{ duration: 0.4, delay: idx * 0.02, ease: [0.22, 1, 0.36, 1] }}
      key={item.name + item.group}
      className={`group ${isClickable ? 'cursor-pointer' : ''}`}
      onClick={isClickable ? handleCardClick : undefined}
    >
      <div className="glass-card overflow-hidden flex flex-col h-full hover:border-primary/40 transition-all duration-500 hover:shadow-[0_20px_60px_-10px_rgba(99,102,241,0.2)] hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="aspect-video relative overflow-hidden bg-surface flex items-center justify-center">
          {item.driveId ? (
            <img
              src={`https://lh3.googleusercontent.com/d/${item.driveId}=w600`}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          ) : item.ytId ? (
            <>
              <img
                src={`https://img.youtube.com/vi/${item.ytId}/maxresdefault.jpg`}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/50 transition-colors duration-300">
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  className="w-16 h-16 bg-primary/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)] border border-white/20"
                >
                  <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <div className="text-5xl font-display font-bold text-primary/30 group-hover:text-primary/60 group-hover:scale-110 transition-all duration-500">
                {item.name.charAt(0)}
              </div>
            </div>
          )}

          {/* Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10">
            {item.blurb}
          </div>

          {/* Link icon */}
          {isWebsite && item.url && (
            <div className="absolute top-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs text-white">↗</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">{item.cat}</span>
              <h3 className="text-base font-bold text-white">{item.name}</h3>
              {isWebsite && item.url && (
                <span className="text-xs text-primary/80 flex items-center gap-1 mt-1">Visit Site ↗</span>
              )}
              {isAnimation && item.ytId && (
                <span className="text-xs text-primary/80 flex items-center gap-1 mt-1">▶ Watch Video</span>
              )}
              {item.driveId && (
                <span className="text-xs text-primary/80 flex items-center gap-1 mt-1">View ↗</span>
              )}
            </div>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 flex-grow flex flex-col">
          <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1">{item.cat}</span>
          <h3 className="text-sm font-bold mb-2 group-hover:text-primary transition-colors duration-300">{item.name}</h3>

          {isWebsite && item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-xs text-textMuted hover:text-primary mt-auto truncate flex items-center gap-1 group/link transition-colors duration-200"
            >
              <span className="truncate">{new URL(item.url).hostname.replace('www.', '')}</span>
              <span className="text-xs group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform flex-shrink-0">↗</span>
            </a>
          )}
          {isAnimation && item.ytId && (
            <button
              onClick={(e) => { e.stopPropagation(); onPlayVideo(item.ytId); }}
              className="text-xs text-textMuted hover:text-primary mt-auto flex items-center gap-1 transition-colors duration-200"
            >
              <span className="text-primary">▶</span> Watch on YouTube
            </button>
          )}
          {item.driveId && (
            <a
              href={`https://drive.google.com/file/d/${item.driveId}/view`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-xs text-textMuted hover:text-primary mt-auto flex items-center gap-1 transition-colors duration-200"
            >
              View on Drive ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Component ─── */
export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTop = searchParams.get('tab') || 'all';
  const activeSub = searchParams.get('cat') || 'all';
  const [activeVideo, setActiveVideo] = useState(null);

  const filteredItems = useMemo(() => {
    let items = portfolioData;
    if (activeTop !== 'all') {
      items = items.filter(p => p.group === activeTop);
    }
    if (activeSub !== 'all') {
      items = items.filter(p => p.cat === activeSub);
    }
    return items;
  }, [activeTop, activeSub]);

  const setTab = (key) => {
    if (key === 'all') setSearchParams({});
    else setSearchParams({ tab: key });
  };

  const setSubTab = (key) => {
    if (key === 'all') setSearchParams({ tab: activeTop });
    else setSearchParams({ tab: activeTop, cat: key });
  };

  const currentSubTabs = SUB_TABS[activeTop] || null;

  return (
    <div className="pt-20 pb-32 overflow-hidden">
      {/* Hero */}
      <header className="relative py-20 md:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-primary/10 to-secondary/5 blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-gradient-to-tr from-secondary/10 to-accent/5 blur-[80px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Our Work
            </motion.div>
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Websites, Animation &amp; <span className="gradient-text">Design.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} custom={2} className="text-lg text-textMuted max-w-2xl mx-auto">
              Every project we've built — filter by category to find what you need. Click any card to explore.
            </motion.p>
          </motion.div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {TOP_TABS.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTop === tab.key
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/25'
                  : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span className="text-xs">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Sub-Tabs */}
        <AnimatePresence mode="wait">
          {currentSubTabs && (
            <motion.div
              key={activeTop}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-10 mt-2"
            >
              {currentSubTabs.map(sub => (
                <button
                  key={sub.key}
                  onClick={() => setSubTab(sub.key)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    activeSub === sub.key
                      ? 'bg-primary/20 text-primary border border-primary/40'
                      : 'bg-white/5 text-textMuted hover:text-white hover:bg-white/8 border border-white/8'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Count */}
        <motion.p layout className="text-sm text-textMuted text-center mb-8">
          {filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}
        </motion.p>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <PortfolioCard
                key={item.name + item.group}
                item={item}
                idx={idx}
                onPlayVideo={(ytId) => setActiveVideo(ytId)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-12 md:p-16 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary/10 blur-[60px] pointer-events-none" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Like what you see?</h2>
          <p className="text-textMuted mb-8 relative z-10">Let's talk about your project — website, animation, or design.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/services" className="btn-outline">See Our Services</Link>
          </div>
        </motion.div>
      </section>

      {/* YouTube Modal */}
      {activeVideo && (
        <YTModal ytId={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </div>
  );
}
