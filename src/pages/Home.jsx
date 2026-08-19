import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const services = [
  { title: "SaaS Video", icon: "🎬", desc: "Engaging videos to showcase your SaaS products." },
  { title: "2D Animation", icon: "🎨", desc: "Bring ideas to life with high-quality 2D animations." },
  { title: "Web Dev", icon: "💻", desc: "Custom, performant, and scalable web applications." },
  { title: "Video Editing", icon: "✂️", desc: "Professional video editing for all platforms." },
  { title: "Brand Identity & Graphic Design", icon: "✨", desc: "Stand out with a memorable brand identity." },
  { title: "Story Boarding & Script Development", icon: "📝", desc: "Compelling narratives and visual storyboards." },
  { title: "AI Powered Creative Production", icon: "🤖", desc: "Cutting-edge AI tools for fast, creative content." },
  { title: "Social Media Creative Content", icon: "📱", desc: "Scroll-stopping content for your social feeds." },
  { title: "Visual Solutions", icon: "👁️", desc: "Comprehensive visual strategies for your brand." },
  { title: "SMM", icon: "📈", desc: "Social Media Marketing to boost your reach." },
  { title: "SEO", icon: "🔍", desc: "Search Engine Optimization to rank higher." }
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div className="pt-20 overflow-hidden" ref={containerRef}>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 perspective-1000">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -right-[10%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-[100px] pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360 }} 
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-gradient-to-tr from-secondary/10 to-purple-500/10 blur-[100px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-5xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
              Your All-In-One Creative Partner
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight">
              We create <br className="hidden md:block"/>
              <span className="gradient-text">digital magic</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-2xl text-textMuted mb-10 max-w-3xl mx-auto font-light">
              Not just websites. From <strong className="text-white font-medium">Video Production & Animation</strong> to <strong className="text-white font-medium">AI Creatives & SEO</strong>, we elevate your brand across every dimension.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portfolio" className="btn-primary w-full sm:w-auto text-lg px-8 py-4">Explore Our Work</Link>
              <Link to="/contact" className="btn-outline w-full sm:w-auto text-lg px-8 py-4">Start a Project</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-32 relative z-10 bg-surface/50 backdrop-blur-md border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything you need,<br/><span className="gradient-text">in one place.</span></h2>
            <p className="text-xl text-textMuted max-w-2xl mx-auto">We are a full-service digital studio. Here is what we do best.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-card p-8 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 origin-bottom-left">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-textMuted text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
            
            {/* CTA Card in the grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: services.length * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="glass-card p-8 bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30 flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-2xl font-bold mb-4">Need something else?</h3>
              <Link to="/contact" className="btn-primary w-full shadow-lg shadow-primary/25">Let's Talk</Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scrolling Text Marquee Section */}
      <section className="py-24 overflow-hidden bg-black relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"/>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"/>
        
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap items-center"
        >
          {[...Array(2)].map((_, i) => (
             <div key={i} className="flex items-center space-x-12 mx-6">
                <span className="text-6xl md:text-8xl font-black text-transparent stroke-text opacity-50">SaaS VIDEO</span>
                <span className="text-6xl md:text-8xl font-black text-transparent stroke-text opacity-50">✦</span>
                <span className="text-6xl md:text-8xl font-black text-transparent stroke-text opacity-50">ANIMATION</span>
                <span className="text-6xl md:text-8xl font-black text-transparent stroke-text opacity-50">✦</span>
                <span className="text-6xl md:text-8xl font-black text-transparent stroke-text opacity-50">WEB DEV</span>
                <span className="text-6xl md:text-8xl font-black text-transparent stroke-text opacity-50">✦</span>
             </div>
          ))}
        </motion.div>
        
        <motion.div 
          animate={{ x: [-1035, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex whitespace-nowrap items-center mt-8"
        >
          {[...Array(2)].map((_, i) => (
             <div key={i} className="flex items-center space-x-12 mx-6">
                <span className="text-5xl md:text-7xl font-black text-transparent stroke-text opacity-30">BRAND IDENTITY</span>
                <span className="text-5xl md:text-7xl font-black text-transparent stroke-text opacity-30">●</span>
                <span className="text-5xl md:text-7xl font-black text-transparent stroke-text opacity-30">SEO & SMM</span>
                <span className="text-5xl md:text-7xl font-black text-transparent stroke-text opacity-30">●</span>
                <span className="text-5xl md:text-7xl font-black text-transparent stroke-text opacity-30">AI PRODUCTION</span>
                <span className="text-5xl md:text-7xl font-black text-transparent stroke-text opacity-30">●</span>
             </div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(139,92,246,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="glass-card p-12 md:p-20 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h2 className="text-4xl md:text-6xl font-bold mb-6 relative z-10">Ready to transform<br/>your brand?</h2>
            <p className="text-textMuted mb-10 text-xl relative z-10">Let's discuss how our services can accelerate your growth.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10">
              <Link to="/contact" className="btn-primary text-lg px-10 py-4 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_40px_rgba(99,102,241,0.5)]">Start a Project</Link>
              <a href="mailto:cashtechventures@gmail.com" className="btn-outline text-lg px-10 py-4 flex items-center gap-2">
                <span>Email Us</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
