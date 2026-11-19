import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './Layout';
import { FadeUp, Words, Tilt, Particles, Logo, Modal } from './Animation';

const css = `
.section-padding { padding: 6rem 0; position: relative; }
.transparent-section { background: transparent; }
.text-center { text-align: center; }
.section-title { font-size: clamp(2rem, 5vw, 2.8rem); margin-bottom: 3.5rem; text-align: center; font-weight: 800; letter-spacing: 1px; text-transform: uppercase;
  background: linear-gradient(100deg, #b8860b 0%, #FFD700 30%, #fff6c2 50%, #FFD700 70%, #b8860b 100%); background-size: 250% 100%;
  -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 6s linear infinite; filter: drop-shadow(0 0 18px rgba(255,215,0,.25)); }
.section-title::after { content: ''; display: block; width: 70px; height: 3px; margin: 1rem auto 0; background: var(--gold); border-radius: 3px; box-shadow: 0 0 14px var(--gold-glow); }
@keyframes shimmer { to { background-position: -250% 0; } }

/* BUTTONS */
.btn-glow { position: relative; overflow: hidden; padding: 1rem 2.5rem; background: rgba(255,215,0,0.15); border: 1px solid rgba(255,215,0,0.5); color: var(--gold); border-radius: 30px; backdrop-filter: blur(10px); transition: .3s; display: inline-block; font-weight: 700; cursor: pointer; }
.btn-glow::before { content: ''; position: absolute; top: 0; left: -80%; width: 50%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.45), transparent); transform: skewX(-20deg); transition: left .6s; }
.btn-glow:hover::before { left: 130%; }
.btn-glow:hover { background: var(--gold); color: #000; box-shadow: 0 0 30px var(--gold-glow); transform: translateY(-3px); }
.btn-ghost { padding: 1rem 2.2rem; border-radius: 30px; border: 1px solid rgba(255,255,255,.3); color: #fff; font-weight: 700; display: inline-block; transition: .3s; }
.btn-ghost:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-3px); }
.btn-solid { padding: 1rem; background: var(--gold); color: #000; border-radius: 12px; font-weight: 800; font-size: 1rem; transition: 0.3s; width: 100%; border: none; cursor: pointer; display: block; text-align: center; }
.btn-solid:hover { box-shadow: 0 0 25px var(--gold-glow); transform: translateY(-2px); }

/* 1. HERO */
.hero-cinematic { position: relative; min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; padding: 7rem 0 4rem; }
.hero-grid-bg { position: absolute; inset: 0; background-image: radial-gradient(rgba(255,215,0,0.08) 1px, transparent 1px); background-size: 50px 50px; z-index: 1; pointer-events: none; animation: gridmove 30s linear infinite; mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%); -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%); }
@keyframes gridmove { to { background-position: 50px 50px; } }
.hero-road { position: absolute; left: 0; right: 0; bottom: 8%; height: 2px; z-index: 1; background: repeating-linear-gradient(90deg, var(--gold) 0 40px, transparent 40px 90px); background-size: 90px 2px; opacity: .35; animation: road 1.2s linear infinite; }
@keyframes road { to { background-position: -90px 0; } }
.particles { position: absolute; inset: 0; z-index: 1; pointer-events: none; overflow: hidden; }
.particles span { position: absolute; bottom: -10px; border-radius: 50%; background: var(--gold); box-shadow: 0 0 10px var(--gold); opacity: 0; animation: rise linear infinite; }
@keyframes rise { 0% { transform: translateY(0) translateX(0); opacity: 0; } 15% { opacity: .8; } 100% { transform: translateY(-105vh) translateX(40px); opacity: 0; } }

.hero-layout { position: relative; z-index: 10; width: 100%; max-width: 1400px; padding: 0 2rem; display: grid; grid-template-columns: minmax(220px, 1fr) minmax(0, 1.4fr) minmax(220px, 1fr); gap: 2rem; align-items: center; }
.hero-center-brand { text-align: center; }
.hero-logo { margin: 0 auto 1.5rem; width: max-content; filter: drop-shadow(0 0 25px rgba(255,215,0,.5)); animation: logoIn 1.4s cubic-bezier(.22,1,.36,1) both, floaty 6s 1.4s ease-in-out infinite; }
@keyframes logoIn { from { opacity: 0; transform: scale(.3) rotate(-180deg); } }
@keyframes floaty { 50% { transform: translateY(-10px); } }
.hero-center-brand h1 { font-size: clamp(2.2rem, 4.6vw, 4.6rem); font-family: var(--font-en); font-weight: 800; letter-spacing: 2px; margin-bottom: 1rem; line-height: 1.1;
  background: linear-gradient(100deg, #b8860b, #FFD700 35%, #fff6c2 50%, #FFD700 65%, #b8860b); background-size: 250% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 5s linear infinite; filter: drop-shadow(0 4px 24px rgba(255,215,0,.35)); }
html[lang="ta"] .hero-center-brand h1 { font-family: var(--font-ta); }
.hero-center-brand h2 { font-size: clamp(1rem, 1.6vw, 1.35rem); font-style: italic; font-weight: 400; color: #FFF; margin-bottom: 2.5rem; text-shadow: 0 2px 10px rgba(0,0,0,0.8); letter-spacing: .5px; }
.hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

.hero-card { position: relative; border-radius: 28px; padding: 1rem; background: rgba(18,18,18,.55); backdrop-filter: blur(18px); border: 1px solid rgba(255,215,0,.25); border-top-color: rgba(255,215,0,.6); box-shadow: 0 30px 60px rgba(0,0,0,.7), inset 0 0 40px rgba(255,215,0,.05); animation: cardfloat 7s ease-in-out infinite; transition: box-shadow .4s, border-color .4s; }
.hero-card.r { animation-delay: -3.5s; }
@keyframes cardfloat { 50% { transform: translateY(-14px); } }
.hero-card:hover { border-color: var(--gold); box-shadow: 0 30px 70px rgba(0,0,0,.8), 0 0 40px var(--gold-glow); }
.hero-card .img-wrap { position: relative; border-radius: 18px; overflow: hidden; aspect-ratio: 4/3; }
.hero-card .img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(.22,1,.36,1); }
.hero-card:hover .img-wrap img { transform: scale(1.1); }
.hero-card .img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,.7), transparent 55%); }
.card-logo { position: absolute; top: -22px; left: -18px; z-index: 3; filter: drop-shadow(0 8px 16px rgba(0,0,0,.7)); transition: transform .8s cubic-bezier(.22,1,.36,1); }
.hero-card.r .card-logo { left: auto; right: -18px; }
.hero-card:hover .card-logo { transform: rotate(360deg) scale(1.1); }
.card-meta { padding: .9rem .4rem .3rem; display: flex; justify-content: space-between; align-items: center; gap: .5rem; }
.card-meta h3 { font-size: 1.05rem; color: var(--gold); font-weight: 800; }
.card-meta .plate { font-family: monospace; font-size: .8rem; color: #fff; border: 1px solid rgba(255,215,0,.5); padding: .25rem .6rem; border-radius: 8px; background: rgba(0,0,0,.6); letter-spacing: 1px; white-space: nowrap; }
.scroll-cue { position: absolute; bottom: 1.5rem; left: 50%; transform: translateX(-50%); z-index: 10; font-size: .75rem; letter-spacing: 3px; color: rgba(255,255,255,.55); display: flex; flex-direction: column; align-items: center; gap: .6rem; text-transform: uppercase; }
.scroll-cue i { width: 1px; height: 38px; background: linear-gradient(var(--gold), transparent); animation: cue 1.8s ease-in-out infinite; transform-origin: top; }
@keyframes cue { 0% { transform: scaleY(0); } 50% { transform: scaleY(1); } 100% { transform: scaleY(1); opacity: 0; } }

/* 2 & 3 */
.about-desc { max-width: 750px; margin: 0 auto; color: rgba(255,255,255,0.9); font-size: 1.25rem; line-height: 1.8; text-shadow: 0 2px 5px rgba(0,0,0,0.8); }
.hay-banner { position: relative; height: 420px; border-radius: 24px; overflow: hidden; border: 1px solid rgba(255,215,0,0.2); box-shadow: 0 15px 50px rgba(0,0,0,0.8); }
.hay-banner img { width: 100%; height: 100%; object-fit: cover; transition: transform 1.2s cubic-bezier(.22,1,.36,1); }
.hay-banner:hover img { transform: scale(1.08); }
.hay-overlay { position: absolute; inset: 0; background: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.85)); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; }
.hay-desc { color: #FFF; font-size: 1.3rem; margin-bottom: 1.5rem; text-align: center; text-shadow: 0 2px 10px rgba(0,0,0,0.8); }
.badges { display: flex; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap; justify-content: center; }
.badges span { background: rgba(255,215,0,0.15); padding: 0.6rem 1.5rem; border-radius: 20px; border: 1px solid var(--gold); color: var(--gold); font-weight: 600; backdrop-filter: blur(5px); transition: .3s; }
.badges span:hover { background: var(--gold); color: #000; transform: translateY(-3px); }
.whatsapp-btn { width: auto; padding: 1rem 3.5rem; border-radius: 30px; box-shadow: 0 10px 20px rgba(0,0,0,0.5); }

/* 4. FLEET */
.vehicle-glass-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(400px, 100%), 1fr)); gap: 4rem; max-width: 1000px; margin: 0 auto; padding-bottom: 3rem; }
.vehicle-glass-wrapper { position: relative; width: 100%; margin: 0 auto; cursor: pointer; }
.main-glass-panel { background: rgba(15,15,15,0.6); border: 1px solid rgba(255,215,0,0.2); border-top: 1px solid rgba(255,215,0,0.5); border-radius: 32px 32px 32px 10px; padding: 1.5rem; position: relative; overflow: hidden; backdrop-filter: blur(20px); box-shadow: 0 25px 50px rgba(0,0,0,0.8), inset 0 0 40px rgba(255,215,0,0.05); height: 420px; transition: border-color .4s, box-shadow .4s; }
.vehicle-glass-wrapper:hover .main-glass-panel { border-color: var(--gold); box-shadow: 0 25px 60px rgba(0,0,0,.85), 0 0 40px var(--gold-glow); }
.main-glass-panel::before { content: ''; position: absolute; top: -50px; left: -50px; width: 200px; height: 200px; background: var(--accent); filter: blur(80px); opacity: 0.4; z-index: 0; pointer-events: none; }
.vehicle-img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; position: relative; z-index: 1; opacity: 0.85; transition: .6s; }
.vehicle-glass-wrapper:hover .vehicle-img { opacity: 1; transform: scale(1.04); }
.v-logo { position: absolute; top: 2rem; right: 2rem; z-index: 3; opacity: .9; }
.vehicle-name-tag { position: absolute; bottom: 2rem; left: 2rem; background: rgba(0,0,0,0.75); backdrop-filter: blur(15px); padding: 1.2rem 1.5rem; border-radius: 16px; border: 1px solid rgba(255,215,0,0.4); z-index: 2; max-width: 80%; }
.vehicle-name-tag h3 { font-size: 1.6rem; color: var(--gold); margin-bottom: 0.3rem; }
.vehicle-name-tag .sub-specs { font-size: 0.9rem; color: #DDD; }
.hover-pop { position: absolute; top: 2rem; left: 2rem; z-index: 4; background: var(--gold); color: #000; font-weight: 800; font-size: .8rem; padding: .45rem 1rem; border-radius: 20px; opacity: 0; transform: translateY(-10px) scale(.9); transition: .35s cubic-bezier(.22,1,.36,1); box-shadow: 0 8px 20px rgba(0,0,0,.5); }
.vehicle-glass-wrapper:hover .hover-pop { opacity: 1; transform: none; }
.plate-glass-panel { position: absolute; bottom: -20px; right: 20px; background: rgba(10,10,10,0.9); backdrop-filter: blur(20px); border: 1px solid rgba(255,215,0,0.7); padding: 1rem 2rem; border-radius: 16px; box-shadow: 0 20px 40px rgba(0,0,0,0.8); z-index: 10; }
.number-plate { font-family: monospace; font-size: 1.4rem; font-weight: 800; color: #FFF; letter-spacing: 2px; }

/* 5. TEAM */
.click-hint { color: rgba(255,255,255,0.5); margin-top: -2.5rem; margin-bottom: 3.5rem; font-size: 0.9rem; letter-spacing: 1px; }
.team-grid-single-line { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; width: 100%; max-width: 1200px; margin: 0 auto; }
.flip-card-container { perspective: 1000px; height: 380px; }
.flip-card { width: 100%; height: 100%; cursor: pointer; transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1); transform-style: preserve-3d; }
.flip-card:hover:not(.flipped) { transform: translateY(-8px) rotateY(-6deg); }
.flip-card.flipped { transform: rotateY(180deg); }
.flip-card-inner { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; border-radius: 20px; box-shadow: 0 15px 40px rgba(0,0,0,0.6); }
.flip-card-front, .flip-card-back { position: absolute; inset: 0; width: 100%; height: 100%; backface-visibility: hidden; -webkit-backface-visibility: hidden; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,215,0,0.2); }
.flip-card:hover .flip-card-front { border-color: var(--gold); box-shadow: 0 0 30px var(--gold-glow); }
.flip-card-front { background: #000; }
.member-full-img { width: 100%; height: 100%; object-fit: cover; transition: transform .8s; }
.flip-card:hover .member-full-img { transform: scale(1.07); }
.front-glass-panel { position: absolute; bottom: 0; left: 0; right: 0; height: 60%; display: flex; flex-direction: column; justify-content: flex-end; padding: 1.5rem; overflow: hidden; }
.name-white-gradient { position: absolute; inset: 0; background: linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.85) 30%, rgba(255,255,255,0) 100%); }
.front-text-content { position: relative; z-index: 1; padding-bottom: 0.5rem; }
.front-text-content h3 { font-size: 1.4rem; color: #000; margin-bottom: 0.2rem; font-weight: 800; letter-spacing: -0.5px; }
.front-text-content .role { color: #8a6508; font-size: 0.85rem; font-weight: 800; letter-spacing: 1px; }
.front-text-content .extra-info { color: #444; font-size: 0.8rem; font-weight: 700; margin-top: 0.4rem; background: rgba(0,0,0,0.05); display: inline-block; padding: 0.2rem 0.6rem; border-radius: 12px; }
.flip-card-back { transform: rotateY(180deg); background: rgba(10,10,10,0.95); backdrop-filter: blur(15px); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem; text-align: center; }
.member-avatar { width: 85px; height: 85px; border-radius: 50%; object-fit: cover; border: 2px solid var(--gold); margin-bottom: 1rem; box-shadow: 0 0 20px var(--gold-glow); }
.flip-card-back h3 { font-size: 1.25rem; color: #FFF; margin-bottom: 0.3rem; font-weight: 700; }
.role-highlight { color: var(--gold); font-size: 0.85rem; font-weight: 700; margin-bottom: 1.2rem; }
.details-box { background: rgba(255,255,255,0.04); width: 100%; padding: 1.2rem; border-radius: 12px; margin-bottom: 1.2rem; display: flex; flex-direction: column; gap: 0.6rem; border: 1px solid rgba(255,255,255,0.05); }
.detail-item { font-size: 0.85rem; color: #CCC; word-break: break-word; line-height: 1.4; }
.detail-item strong { color: var(--gold); }
.back-btn { padding: 0.7rem; font-size: 0.9rem; border-radius: 8px; }

/* 6. CONTACT */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; background: rgba(15,15,15,0.7); backdrop-filter: blur(20px); padding: 3.5rem; border-radius: 24px; border: 1px solid rgba(255,215,0,0.15); max-width: 900px; margin: 0 auto; box-shadow: 0 25px 50px rgba(0,0,0,0.7); }
.contact-info { display: flex; flex-direction: column; gap: 1.2rem; color: #DDD; justify-content: center; font-size: 1.05rem; }
.contact-info strong { color: var(--gold); font-size: 1.2rem; line-height: 1.6; }
.contact-info a:hover { color: var(--gold); }
.minimal-form { display: flex; flex-direction: column; gap: 1.5rem; }
.minimal-form input { background: transparent; border: none; border-bottom: 1px solid rgba(255,215,0,0.3); padding: 1rem 0; color: #FFF; font-size: 1.05rem; transition: 0.3s; font-family: inherit; }
.minimal-form input:focus { outline: none; border-color: var(--gold); box-shadow: 0 10px 10px -10px var(--gold-glow); padding-left: .6rem; }
.form-thanks { color: var(--gold); font-weight: 700; }

/* MODAL */
.modal-backdrop { position: fixed; inset: 0; z-index: 300; background: rgba(0,0,0,.75); backdrop-filter: blur(10px); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
.modal-box { position: relative; width: min(620px, 100%); max-height: 90vh; overflow-y: auto; border-radius: 28px; background: rgba(16,16,16,.96); border: 1px solid rgba(255,215,0,.5); box-shadow: 0 40px 100px rgba(0,0,0,.9), 0 0 60px rgba(255,215,0,.15); }
.modal-close { position: absolute; top: 14px; right: 14px; z-index: 5; width: 38px; height: 38px; border-radius: 50%; background: rgba(0,0,0,.7); color: #fff; border: 1px solid rgba(255,215,0,.5); transition: .3s; }
.modal-close:hover { background: var(--gold); color: #000; transform: rotate(90deg); }
.m-img { width: 100%; height: 260px; object-fit: cover; }
.m-body { padding: 1.8rem 2rem 2rem; display: flex; flex-direction: column; gap: 1rem; }
.m-body h3 { font-size: 1.7rem; color: var(--gold); display: flex; align-items: center; gap: .8rem; }
.m-row { display: flex; justify-content: space-between; gap: 1rem; padding: .7rem 0; border-bottom: 1px solid rgba(255,255,255,.08); color: #ddd; }
.m-row b { color: var(--gold); font-weight: 600; }

@media (max-width: 1100px) {
  .hero-layout { grid-template-columns: 1fr; max-width: 640px; }
  .hero-center-brand { order: -1; }
  .hero-card { max-width: 380px; margin: 0 auto; width: 100%; }
  .scroll-cue { display: none; }
}
@media (max-width: 1024px) { .team-grid-single-line { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr; padding: 2rem; }
  .team-grid-single-line { grid-template-columns: 1fr; }
  .flip-card-container { max-width: 340px; margin: 0 auto; width: 100%; }
}
`;

const WA = 'https://wa.me/917339329250';
const IMG_TATA = 'tata.avif?auto=format&fit=crop&w=800';
const IMG_ASHOK = 'boss.webp?auto=format&fit=crop&w=800';

const vehicles = [
  { id: 'tata', name: 'Tata Ultra 1014', plate: 'TN 29 CZ 1976', img: IMG_TATA, sub: 'Medium-duty agricultural logistics.', type: 'Medium-duty truck', use: 'Agricultural logistics' },
  { id: 'ashok', name: 'Ashok Leyland Boss', plate: 'TN 29 BX 1415', img: IMG_ASHOK, sub: 'Heavy-duty wholesale distribution.', type: 'Heavy-duty truck', use: 'Wholesale distribution' }
];

const team = [
  { id: 1, name: "AYYAVOO S", roleKey: "owner", phone: "+91 73393 29250", email: "ayyavoo19@gmail.com", qual: "", img: "ayyavoo.jpeg?auto=format&fit=crop&w=600" },
  { id: 2, name: "KALPANA C", roleKey: "ownerFunding", phone: "+91 97872 26726", email: "", qual: "", img: "kalpana1.jpeg?auto=format&fit=crop&w=600" },
  { id: 3, name: "MONIKA A", roleKey: "marketing", phone: "+91 88381 98069", email: "monikaayyavoo58@gmail.com", qual: "MCA", img: "moni1.jpeg?auto=format&fit=crop&w=600" },
  { id: 4, name: "KISHORE A", roleKey: "md", phone: "+91 94868 02976", email: "kishoremonika87@gmail.com", qual: "B.E. (Founder of Eemon X)", frontInfo: "Founder of Eemon X", img: "kalash1.jpeg?auto=format&fit=crop&w=600" }
];

export default function Page() {
  const { t, language } = useLanguage();
  const [flippedCard, setFlippedCard] = useState(null);
  const [vehicle, setVehicle] = useState(null);
  const [sent, setSent] = useState(false);

  const submit = (e) => { e.preventDefault(); setSent(true); e.target.reset(); setTimeout(() => setSent(false), 4000); };

  return (
    <main>
      <style>{css}</style>

      {/* 1. HERO */}
      <section id="home" className="hero-cinematic">
        <div className="hero-grid-bg" />
        <Particles />
        <div className="hero-road" />

        <div className="hero-layout">
          <motion.div initial={{ opacity: 0, x: -120 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <Tilt max={8}>
              <div className="hero-card l" onClick={() => setVehicle(vehicles[0])}>
                <Logo size={56} className="card-logo" />
                <div className="img-wrap"><img src={IMG_TATA} alt="Tata Ultra 1014" /></div>
                <div className="card-meta"><h3>Tata Ultra</h3><span className="plate">{vehicles[0].plate}</span></div>
              </div>
            </Tilt>
          </motion.div>

          <div className="hero-center-brand" key={language}>
            <Logo size={96} className="hero-logo" />
            <h1><Words text={t('hero', 'title')} delay={0.3} /></h1>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.1 }}>
              {t('hero', 'subtitle')}
            </motion.h2>
            <motion.div className="hero-actions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 1.4 }}>
              <a href="#about" className="btn-glow">{t('hero', 'btnService')}</a>
              <a href="tel:+917339329250" className="btn-ghost">{t('hero', 'btnCall')}</a>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 120 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <Tilt max={8}>
              <div className="hero-card r" onClick={() => setVehicle(vehicles[1])}>
                <Logo size={56} className="card-logo" />
                <div className="img-wrap"><img src={IMG_ASHOK} alt="Ashok Leyland Boss" /></div>
                <div className="card-meta"><h3>Ashok Leyland</h3><span className="plate">{vehicles[1].plate}</span></div>
              </div>
            </Tilt>
          </motion.div>
        </div>

        <div className="scroll-cue"><span>{t('hero', 'scroll')}</span><i /></div>
      </section>

      {/* 2. ABOUT */}
      <section id="about" className="section-padding transparent-section">
        <div className="container text-center">
          <FadeUp>
            <h2 className="section-title">{t('about', 'title')}</h2>
            <p className="about-desc">{t('about', 'desc')}</p>
          </FadeUp>
        </div>
      </section>

      {/* 3. HAY */}
      <section id="hay" className="section-padding transparent-section">
        <div className="container">
          <FadeUp><h2 className="section-title">{t('hay', 'title')}</h2></FadeUp>
          <FadeUp delay={0.1}>
            <div className="hay-banner">
              <img src="hay.jpg?auto=format&fit=crop&w=1200" alt="Hay Bales" />
              <div className="hay-overlay">
                <p className="hay-desc">{t('hay', 'desc')}</p>
                <div className="badges">
                  <span>{t('hay', 'retail')}</span>
                  <span>{t('hay', 'wholesale')}</span>
                </div>
                <a href={WA} className="btn-solid whatsapp-btn">{t('hay', 'cta')}</a>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* 4. FLEET */}
      <section id="fleet" className="section-padding transparent-section">
        <div className="container">
          <FadeUp><h2 className="section-title">{t('fleet', 'title')}</h2></FadeUp>
          <div className="vehicle-glass-grid">
            {vehicles.map((v, i) => (
              <FadeUp key={v.id} delay={0.1 * (i + 1)} className="vehicle-glass-wrapper">
                <Tilt max={5}>
                  <div onClick={() => setVehicle(v)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && setVehicle(v)}>
                    <div className="main-glass-panel">
                      <span className="hover-pop">{t('fleet', 'view')}</span>
                      <Logo size={44} className="v-logo" />
                      <img src={v.img} alt={v.name} className="vehicle-img" />
                      <div className="vehicle-name-tag"><h3>{v.name}</h3><p className="sub-specs">{v.sub}</p></div>
                    </div>
                    <div className="plate-glass-panel"><span className="number-plate">{v.plate}</span></div>
                  </div>
                </Tilt>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TEAM */}
      <section id="team" className="section-padding transparent-section">
        <div className="container">
          <FadeUp>
            <h2 className="section-title">{t('team', 'title')}</h2>
            <p className="text-center click-hint">{t('team', 'clickInfo')}</p>
          </FadeUp>
          <div className="team-grid-single-line">
            {team.map((m, i) => (
              <FadeUp key={m.id} delay={i * 0.1} className="flip-card-container">
                <div className={`flip-card ${flippedCard === m.id ? 'flipped' : ''}`} onClick={() => setFlippedCard(flippedCard === m.id ? null : m.id)}>
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={m.img} alt={m.name} className="member-full-img" />
                      <div className="front-glass-panel">
                        <div className="name-white-gradient" />
                        <div className="front-text-content">
                          <h3>{m.name}</h3>
                          <p className="role">{t('team', 'roles', m.roleKey)}</p>
                          {m.frontInfo && <p className="extra-info">{m.frontInfo}</p>}
                        </div>
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <img src={m.img} alt={m.name} className="member-avatar" />
                      <h3>{m.name}</h3>
                      <p className="role-highlight">{t('team', 'roles', m.roleKey)}</p>
                      <div className="details-box">
                        {m.qual && <p className="detail-item"><strong>{t('team', 'edu')}:</strong> {m.qual}</p>}
                        <p className="detail-item"><strong>{t('team', 'phone')}:</strong> {m.phone}</p>
                        {m.email && <p className="detail-item"><strong>{t('team', 'mail')}:</strong> {m.email}</p>}
                      </div>
                      <a href={`tel:${m.phone.replace(/\s/g, '')}`} className="btn-solid back-btn" onClick={(e) => e.stopPropagation()}>{t('team', 'call')}</a>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" className="section-padding transparent-section">
        <div className="container">
          <FadeUp><h2 className="section-title">{t('contact', 'title')}</h2></FadeUp>
          <div className="contact-grid">
            <FadeUp delay={0.1} className="contact-info">
              <p><strong>{t('contact', 'address')}</strong></p>
              <p>{t('contact', 'phone')}: <a href="tel:+917339329250">+91 73393 29250</a> / <a href="tel:+919787226726">+91 97872 26726</a></p>
              <p>{t('contact', 'email')}: <a href="mailto:ayyavoo19@gmail.com">ayyavoo19@gmail.com</a></p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <form className="minimal-form" onSubmit={submit}>
                <input type="text" placeholder={t('contact', 'formName')} required />
                <input type="tel" placeholder={t('contact', 'formPhone')} required />
                <button type="submit" className="btn-glow">{t('contact', 'send')}</button>
                {sent && <motion.p className="form-thanks" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{t('contact', 'thanks')}</motion.p>}
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* VEHICLE POPUP */}
      <Modal open={!!vehicle} onClose={() => setVehicle(null)} closeLabel={t('fleet', 'close')}>
        {vehicle && (
          <>
            <img className="m-img" src={vehicle.img} alt={vehicle.name} />
            <div className="m-body">
              <h3><Logo size={40} />{vehicle.name}</h3>
              <div>
                <div className="m-row"><b>{t('fleet', 'plate')}</b><span>{vehicle.plate}</span></div>
                <div className="m-row"><b>{t('fleet', 'type')}</b><span>{vehicle.type}</span></div>
                <div className="m-row"><b>{t('fleet', 'use')}</b><span>{vehicle.use}</span></div>
              </div>
              <a href={WA} className="btn-solid" target="_blank" rel="noreferrer">{t('fleet', 'enquire')}</a>
            </div>
          </>
        )}
      </Modal>
    </main>
  );
}
