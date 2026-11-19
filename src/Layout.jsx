import React, { createContext, useState, useEffect, useContext } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { translations } from './translations';
import { Logo } from './Animation';

export const LanguageContext = createContext();
export const useLanguage = () => useContext(LanguageContext);

const css = `
.scroll-bar { position: fixed; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent), var(--gold)); transform-origin: 0 50%; z-index: 200; box-shadow: 0 0 12px var(--gold-glow); }
.navbar { position: fixed; width: 100%; top: 0; z-index: 100; padding: 1.5rem 0; transition: all 0.4s ease; border-bottom: 1px solid transparent; }
.navbar.scrolled { background: rgba(5,5,5,0.7); backdrop-filter: blur(15px); padding: 0.8rem 0; border-bottom: 1px solid rgba(255,215,0,0.15); box-shadow: 0 4px 30px rgba(0,0,0,0.5); }
.nav-container { display: flex; justify-content: space-between; align-items: center; }
.logo { display: flex; align-items: center; gap: .7rem; font-size: 1.15rem; font-weight: 800; letter-spacing: 2px; text-transform: uppercase; font-family: var(--font-en); text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
.logo svg { transition: transform .8s cubic-bezier(.22,1,.36,1); }
.logo:hover svg { transform: rotate(360deg) scale(1.08); }
.logo span { color: var(--gold); }
.nav-links { display: flex; gap: 2rem; align-items: center; }
.nav-links a.nl { position: relative; font-size: 0.85rem; font-weight: 700; text-transform: uppercase; transition: color 0.3s, transform .3s; text-shadow: 0 2px 4px rgba(0,0,0,0.8); padding: .3rem 0; }
.nav-links a.nl::after { content: ''; position: absolute; left: 0; bottom: 0; height: 2px; width: 100%; background: var(--gold); transform: scaleX(0); transform-origin: right; transition: transform .35s cubic-bezier(.22,1,.36,1); box-shadow: 0 0 10px var(--gold-glow); }
.nav-links a.nl:hover { color: var(--gold); transform: translateY(-2px); }
.nav-links a.nl:hover::after { transform: scaleX(1); transform-origin: left; }
.lang-toggle { background: rgba(255,255,255,0.05); padding: 0.4rem 0.8rem; border-radius: 20px; color: #AAA; transition: 0.3s; border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(5px); }
.lang-toggle:hover { border-color: var(--gold); transform: scale(1.06); }
.lang-toggle .active { color: var(--gold); text-shadow: 0 0 10px var(--gold-glow); font-weight: 800; }

.footer { border-top: 1px solid rgba(255,215,0,0.1); padding: 4rem 0 3rem; text-align: center; margin-top: 4rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); }
.footer .f-logo { margin: 0 auto 1rem; width: max-content; animation: floaty 5s ease-in-out infinite; }
.footer h2 { font-family: var(--font-en); letter-spacing: 2px; font-size: 1.3rem; margin-bottom: 0.5rem; color: #FFF; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
.footer .tagline { color: var(--gold); margin-bottom: 2rem; font-size: 0.95rem; }
.footer .copyright { color: rgba(255,255,255,0.4); font-size: 0.85rem; }
@keyframes floaty { 50% { transform: translateY(-8px); } }
@media (max-width: 860px) { .nav-links a.nl { display: none; } }
`;

export default function Layout({ children }) {
  const [language, setLanguage] = useState(() => {
    try { return localStorage.getItem('lang') || 'ta'; } catch { return 'ta'; }
  });
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    try { localStorage.setItem('lang', language); } catch {}
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLanguage = () => setLanguage((prev) => (prev === 'ta' ? 'en' : 'ta'));

  const t = (section, key, subkey = null) => {
    try {
      if (subkey) return translations[language][section][key][subkey] || key;
      return translations[language][section][key] || key;
    } catch { return key; }
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      <style>{css}</style>
      <div className="bg-anim" aria-hidden="true">
        <div className="bg-img" /><div className="bg-shade" />
        <div className="orb o1" /><div className="orb o2" />
      </div>
      <motion.div className="scroll-bar" style={{ scaleX: progress }} />

      <motion.nav className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <div className="container nav-container">
          <a href="#home" className="logo"><Logo size={38} />MONIKA<span>TRANSPORT</span></a>
          <div className="nav-links">
            <a className="nl" href="#about">{t('nav', 'about')}</a>
            <a className="nl" href="#hay">{t('nav', 'services')}</a>
            <a className="nl" href="#fleet">{t('nav', 'fleet')}</a>
            <a className="nl" href="#team">{t('nav', 'team')}</a>
            <a className="nl" href="#contact">{t('nav', 'contact')}</a>
            <button onClick={toggleLanguage} className="lang-toggle" aria-label="Toggle language">
              <span className={language === 'ta' ? 'active' : ''}>TA</span> | <span className={language === 'en' ? 'active' : ''}>EN</span>
            </button>
          </div>
        </div>
      </motion.nav>

      {children}

      <footer className="footer">
        <div className="container footer-content">
          <Logo size={64} className="f-logo" />
          <h2>MONIKA TRANSPORT</h2>
          <p className="tagline">{t('footer', 'tagline')}</p>
          <p className="copyright">&copy; {new Date().getFullYear()} {t('footer', 'rights')}</p>
        </div>
      </footer>
    </LanguageContext.Provider>
  );
}