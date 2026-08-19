import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';

const TOP_TABS = [
  { label: "All", key: "all", icon: "◆" },
  { label: "Websites", key: "websites", icon: "💻" },
  { label: "Animation", key: "animation", icon: "🎬" },
  { label: "Design", key: "design", icon: "🎨" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTop = searchParams.get("tab") || "all";

  const filteredItems = useMemo(() => {
    let items = portfolioData;
    if (activeTop !== "all") {
      items = items.filter(p => p.group === activeTop);
    }
    return items;
  }, [activeTop]);

  const setTab = (key) => {
    setSearchParams(key === 'all' ? {} : { tab: key });
  };

  return (
    <div className="pt-20 pb-32 overflow-hidden">
      {/* Header */}
      <header className="relative py-20 md:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.1)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
              <span>Portfolio</span>
            </motion.div>
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Websites, Animation <span className="gradient-text">&amp; Design.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} custom={2} className="text-lg text-textMuted max-w-2xl mx-auto">
              Every project we've built — filter by category to find what you need.
            </motion.p>
          </motion.div>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TOP_TABS.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTop === tab.key
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg shadow-primary/20'
                  : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span className="text-xs">{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>

        <motion.p
          layout
          className="text-sm text-textMuted text-center mb-8"
        >
          {filteredItems.length} project{filteredItems.length !== 1 ? 's' : ''}
        </motion.p>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.4, delay: idx * 0.02, ease: [0.22, 1, 0.36, 1] }}
                key={item.name + item.group}
                className="group"
              >
                <div className="glass-card overflow-hidden flex flex-col h-full hover:border-primary/30 transition-all duration-500 hover:shadow-[0_15px_50px_-10px_rgba(99,102,241,0.15)]">
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
                            whileHover={{ scale: 1.2 }}
                            className="w-14 h-14 bg-primary/90 backdrop-blur-sm text-white rounded-full flex items-center justify-center shadow-xl border border-white/20"
                          >
                            <span className="ml-0.5">▶</span>
                          </motion.div>
                        </div>
                      </>
                    ) : (
                      <div className="text-5xl font-display font-bold text-primary/20 group-hover:text-primary/40 group-hover:scale-110 transition-all duration-500">
                        {item.name.charAt(0)}
                      </div>
                    )}

                    {/* Badge */}
                    <div className="absolute top-3 left-3 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/10">
                      {item.blurb}
                    </div>

                    {/* Hover overlay with details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary mb-1 block">{item.cat}</span>
                        <h3 className="text-lg font-bold text-white">{item.name}</h3>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{item.cat}</span>
                    <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors duration-300">{item.name}</h3>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-textMuted hover:text-white mt-auto truncate flex items-center gap-1 group/link"
                      >
                        <span>{new URL(item.url).hostname.replace('www.', '')}</span>
                        <span className="text-xs group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Like what you see?</h2>
          <p className="text-textMuted mb-8 relative z-10">Let's talk about your project — website, animation, or design.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/services" className="btn-outline">See Our Services</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
