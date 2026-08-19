import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
  })
};

const services = [
  { icon: '🎬', title: 'SaaS Video', desc: 'Engaging videos to showcase your SaaS products and drive conversions.', tags: ['SaaS', 'Video'], color: 'from-violet-500/20 to-purple-500/10' },
  { icon: '🎨', title: '2D Animation', desc: 'Bring ideas to life with high-quality 2D animations that captivate your audience.', tags: ['2D', 'Animation'], color: 'from-pink-500/20 to-rose-500/10' },
  { icon: '💻', title: 'Web Development', desc: 'Custom, performant, and scalable web applications on any platform.', tags: ['React', 'Next.js', 'Custom'], color: 'from-blue-500/20 to-cyan-500/10' },
  { icon: '✂️', title: 'Video Editing', desc: 'Professional video editing and post-production for all platforms.', tags: ['Editing', 'Post-Production'], color: 'from-amber-500/20 to-orange-500/10' },
  { icon: '✨', title: 'Brand Identity & Graphic Design', desc: 'Stand out with a memorable brand identity that resonates with your audience.', tags: ['Branding', 'Graphics'], color: 'from-emerald-500/20 to-green-500/10' },
  { icon: '📝', title: 'Story Boarding & Script Development', desc: 'Compelling narratives and visual storyboards for any creative medium.', tags: ['Script', 'Story'], color: 'from-teal-500/20 to-cyan-500/10' },
  { icon: '🤖', title: 'AI Powered Creative Production', desc: 'Cutting-edge AI tools for fast, creative content at unprecedented scale.', tags: ['AI', 'Creative'], color: 'from-indigo-500/20 to-blue-500/10' },
  { icon: '📱', title: 'Social Media Creative Content', desc: 'Scroll-stopping content that grabs attention in crowded feeds.', tags: ['Social Media', 'Content'], color: 'from-fuchsia-500/20 to-pink-500/10' },
  { icon: '👁️', title: 'Visual Solutions', desc: 'Comprehensive visual strategies that differentiate your brand.', tags: ['Visuals', 'Strategy'], color: 'from-sky-500/20 to-blue-500/10' },
  { icon: '📈', title: 'Social Media Marketing', desc: 'Data-driven social media marketing to amplify your reach.', tags: ['Marketing', 'Social'], color: 'from-lime-500/20 to-green-500/10' },
  { icon: '🔍', title: 'Search Engine Optimization', desc: 'Search Engine Optimization strategies to dominate rankings.', tags: ['SEO', 'Ranking'], color: 'from-yellow-500/20 to-amber-500/10' },
];

/* ─── Process steps ─── */
const processSteps = [
  { step: "01", title: "Discovery", desc: "We learn about your business, goals, audience, and competitors to build a solid foundation." },
  { step: "02", title: "Strategy", desc: "We craft a tailored plan — platform, timeline, milestones — aligned with your vision." },
  { step: "03", title: "Creation", desc: "Our team designs, develops, and iterates until every pixel is perfect." },
  { step: "04", title: "Launch & Grow", desc: "We deploy, optimize, and support your project as it scales." },
];

export default function Services() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <div className="pt-20 pb-32 overflow-hidden">
      {/* Header */}
      <section className="relative py-20 md:py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(99,102,241,0.08)_0%,transparent_70%),radial-gradient(ellipse_60%_50%_at_80%_50%,rgba(192,132,252,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" className="max-w-3xl mx-auto">
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6 backdrop-blur-sm">
              What We Do
            </motion.div>
            <motion.h1 variants={fadeInUp} custom={1} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              Every digital service your <span className="gradient-text">business needs.</span>
            </motion.h1>
            <motion.p variants={fadeInUp} custom={2} className="text-lg text-textMuted max-w-2xl mx-auto">
              One studio. Every platform. From websites and mobile apps to SEO, animation, branding and AI — we handle every layer of your digital presence.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div className="glass-card p-8 h-full relative overflow-hidden transition-all duration-500 hover:border-primary/30 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(99,102,241,0.15)]">
                {/* Unique color gradient per service */}
                <div className={`absolute inset-0 bg-gradient-to-br ${srv.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                {/* Top accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

                <div className="relative z-10">
                  <div className="text-4xl mb-5 transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 origin-bottom-left">
                    {srv.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">{srv.title}</h3>
                  <p className="text-textMuted mb-6 text-sm leading-relaxed">{srv.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {srv.tags.map(tag => (
                      <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 transition-colors duration-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Timeline */}
      <section ref={timelineRef} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold mb-6">Our Process</span>
          <h2 className="text-3xl md:text-5xl font-bold">How we <span className="gradient-text">deliver results.</span></h2>
        </motion.div>

        <div className="relative">
          {/* Animated progress line */}
          <div className="absolute left-[24px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-white/5">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-primary to-secondary"
            />
          </div>

          <div className="space-y-16">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-6 md:gap-12 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Number bubble */}
                <div className="relative z-10 flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <div className="w-12 h-12 rounded-full bg-background border-2 border-primary/50 flex items-center justify-center text-sm font-bold text-primary shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                    {item.step}
                  </div>
                </div>

                {/* Content */}
                <div className={`glass-card p-6 md:p-8 md:w-[calc(50%-3rem)] ${
                  i % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-textMuted text-sm leading-relaxed">{item.desc}</p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Not sure which service fits?</h2>
          <p className="text-textMuted mb-8 relative z-10">Tell us what you're building — we'll recommend the right approach and give you a straight answer on timeline and cost.</p>
          <Link to="/contact" className="btn-primary relative z-10">Talk to Us</Link>
        </motion.div>
      </section>
    </div>
  );
}
