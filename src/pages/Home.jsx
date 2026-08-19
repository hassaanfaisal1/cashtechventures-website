import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold mb-6">
              Full-Stack Web Design & Development Studio
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              We design and build websites across <span className="gradient-text">every platform</span>.
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-textMuted mb-10 max-w-2xl mx-auto">
              From Shopify storefronts to custom AI-powered apps — Cashtech Ventures plans, designs and ships production-ready websites, backed by a portfolio spanning 25+ platforms and categories.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portfolio" className="btn-primary w-full sm:w-auto">View Our Work</Link>
              <Link to="/contact" className="btn-outline w-full sm:w-auto">Get a Quote</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <motion.div variants={fadeInUp}>
              <div className="text-5xl font-display font-bold gradient-text mb-2">150+</div>
              <div className="text-textMuted font-medium uppercase tracking-wider text-sm">Projects in our portfolio</div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="text-5xl font-display font-bold gradient-text mb-2">25+</div>
              <div className="text-textMuted font-medium uppercase tracking-wider text-sm">Platforms & site categories</div>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <div className="text-5xl font-display font-bold gradient-text mb-2">30+</div>
              <div className="text-textMuted font-medium uppercase tracking-wider text-sm">Industries served</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(139,92,246,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="glass-card p-12 md:p-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Have a project in mind?<br/>Let's build something great.</h2>
            <p className="text-textMuted mb-8 text-lg">Tell us about your platform, timeline and goals — we'll get back to you with next steps.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact" className="btn-primary">Start a Project</Link>
              <Link to="/portfolio" className="btn-outline">Browse Portfolio</Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
