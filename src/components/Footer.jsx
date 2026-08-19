import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="font-display font-bold text-xl tracking-tight block mb-4">
              Cashtech Ventures
            </Link>
            <p className="text-textMuted text-sm leading-relaxed">
              A full-stack web design & development studio building across every major platform and industry.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-textMuted">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Platforms</h4>
            <ul className="space-y-2 text-sm text-textMuted">
              <li><Link to="/portfolio?tab=websites&sub=shopify" className="hover:text-primary transition-colors">Shopify</Link></li>
              <li><Link to="/portfolio?tab=websites&sub=wordpress" className="hover:text-primary transition-colors">WordPress</Link></li>
              <li><Link to="/portfolio?tab=websites&sub=webflow" className="hover:text-primary transition-colors">Webflow</Link></li>
              <li><Link to="/portfolio?tab=websites&sub=react" className="hover:text-primary transition-colors">React</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Get in touch</h4>
            <ul className="space-y-2 text-sm text-textMuted">
              <li><a href="tel:+447411435352" className="hover:text-primary transition-colors">+44 7411 435352</a></li>
              <li><a href="mailto:cashtechventures@gmail.com" className="hover:text-primary transition-colors">cashtechventures@gmail.com</a></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact form</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-textMuted">
          <p>© {new Date().getFullYear()} Cashtech Ventures. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with care, one platform at a time.</p>
        </div>
      </div>
    </footer>
  );
}
