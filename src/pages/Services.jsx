import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const services = [
  { icon: '🎬', title: 'SaaS Video', desc: 'Engaging videos to showcase your SaaS products.', tags: ['SaaS', 'Video'] },
  { icon: '🎨', title: '2D Animation', desc: 'Bring ideas to life with high-quality 2D animations.', tags: ['2D', 'Animation'] },
  { icon: '💻', title: 'Web Dev', desc: 'Custom, performant, and scalable web applications.', tags: ['React', 'Next.js', 'Custom'] },
  { icon: '✂️', title: 'Video Editing', desc: 'Professional video editing for all platforms.', tags: ['Editing', 'Post-Production'] },
  { icon: '✨', title: 'Brand Identity & Graphic Design', desc: 'Stand out with a memorable brand identity.', tags: ['Branding', 'Graphics'] },
  { icon: '📝', title: 'Story Boarding & Script Development', desc: 'Compelling narratives and visual storyboards.', tags: ['Script', 'Story'] },
  { icon: '🤖', title: 'AI Powered Creative Production', desc: 'Cutting-edge AI tools for fast, creative content.', tags: ['AI', 'Creative'] },
  { icon: '📱', title: 'Social Media Creative Content', desc: 'Scroll-stopping content for your social feeds.', tags: ['Social Media', 'Content'] },
  { icon: '👁️', title: 'Visual Solutions', desc: 'Comprehensive visual strategies for your brand.', tags: ['Visuals', 'Strategy'] },
  { icon: '📈', title: 'SMM', desc: 'Social Media Marketing to boost your reach.', tags: ['Marketing', 'Social'] },
  { icon: '🔍', title: 'SEO', desc: 'Search Engine Optimization to rank higher.', tags: ['SEO', 'Ranking'] },
];

export default function Services() {
  return (
    <div className="pt-20 pb-32">
      <section className="relative py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(99,102,241,0.12)_0%,transparent_70%),radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(192,132,252,0.10)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">What We Do</motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-6">Every digital service your <span className="gradient-text">business needs.</span></motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-textMuted">One studio. Every platform. From websites and mobile apps to SEO, animation, branding and AI — we handle every layer of your digital presence.</motion.p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((srv, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="glass-card p-8 group hover:-translate-y-2 transition-all duration-300 hover:border-primary/50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              <div className="text-4xl mb-6 transform group-hover:-translate-y-1 group-hover:scale-110 transition-transform duration-300">{srv.icon}</div>
              <h3 className="text-xl font-bold mb-3">{srv.title}</h3>
              <p className="text-textMuted mb-6 text-sm leading-relaxed">{srv.desc}</p>
              <div className="flex flex-wrap gap-2">
                {srv.tags.map(tag => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-32 text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="glass-card p-12">
          <h2 className="text-3xl font-bold mb-4">Not sure which service fits your project?</h2>
          <p className="text-textMuted mb-8">Tell us what you're building — we'll recommend the right approach and give you a straight answer on timeline and cost.</p>
          <Link to="/contact" className="btn-primary">Talk to Us</Link>
        </motion.div>
      </section>
    </div>
  );
}
