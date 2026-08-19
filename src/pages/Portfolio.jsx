import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { portfolioData } from '../data/portfolio';

const TOP_TABS = [
  { label: "All", key: "all" },
  { label: "Websites", key: "websites" },
  { label: "Animation", key: "animation" },
  { label: "Design", key: "design" },
];

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
    <div className="pt-20 pb-32">
      <header className="py-20 text-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">Portfolio</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Websites, Animation <span className="gradient-text">&amp; Design.</span></h1>
          <p className="text-lg text-textMuted max-w-2xl mx-auto">Every project we've built — filter by category to find what you need.</p>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {TOP_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setTab(tab.key)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                activeTop === tab.key 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg' 
                  : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-textMuted text-center mb-8">{filteredItems.length} projects</p>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.name + idx}
                className="glass-card overflow-hidden group flex flex-col h-full"
              >
                <div className="aspect-video relative overflow-hidden bg-surface flex items-center justify-center">
                  {item.driveId ? (
                    <img 
                      src={`https://lh3.googleusercontent.com/d/${item.driveId}=w600`} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      loading="lazy"
                    />
                  ) : item.ytId ? (
                    <>
                      <img 
                        src={`https://img.youtube.com/vi/${item.ytId}/maxresdefault.jpg`} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                        <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                          ▶
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-5xl font-display font-bold text-primary opacity-30 group-hover:scale-110 transition-transform duration-500">
                      {item.name.charAt(0)}
                    </div>
                  )}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/10">
                    {item.blurb}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary mb-2">{item.cat}</span>
                  <h3 className="text-lg font-bold mb-1">{item.name}</h3>
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-sm text-textMuted hover:text-white mt-auto truncate flex items-center gap-1">
                      {new URL(item.url).hostname.replace('www.', '')} <span className="text-xs">↗</span>
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-12">
          <h2 className="text-3xl font-bold mb-4">Like what you see?</h2>
          <p className="text-textMuted mb-8">Let's talk about your project — website, animation, or design.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/services" className="btn-outline">See Our Services</Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
