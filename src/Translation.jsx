import { createContext, useContext, useEffect, useState, useCallback } from 'react'

// ===== EDIT BUSINESS DETAILS HERE =====
export const business = {
  name: 'MONIKA TRANSPORT',
  phones: ['7339329250', '9787226726'],
  whatsapp: '917339329250', // country code 91 + primary number
  emails: ['ayyavoo19@gmail.com', 'monikaayyavoo58@gmail.com'],
  addressEn: 'Opposite to Government School, Near Check Post, Theerthamalai, 636906, Tamil Nadu, India.',
  addressTa: 'அரசுப் பள்ளி எதிரில், செக் போஸ்ட் அருகில், தீர்த்தமலை, 636906, தமிழ்நாடு.',
}
export const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('Theerthamalai, Tamil Nadu 636906 near Check Post')

export const vehicles = [
  { id: 'tata', brand: 'Tata', model: 'Tata Ultra 1014', reg: 'TN 29 CZ 1976', color: '#d8d6cf' },
  { id: 'al', brand: 'Ashok Leyland', model: 'Ashok Leyland Boss LX 1415', reg: 'TN 29 BX 1415', color: '#e4572e' },
]

// ===== IMAGES: paste a file path (e.g. '/images/tata.webp') or a verified URL into `src`.
// Empty src => a custom SVG illustration is shown (never a mislabelled photo).
export const images = {
  tata: { src: '', alt: 'Tata Ultra 1014 truck, TN 29 CZ 1976', credit: '' },
  al: { src: '', alt: 'Ashok Leyland Boss LX 1415 truck, TN 29 BX 1415', credit: '' },
  hay: { src: '', alt: 'Hay bales', credit: '' },
  field: { src: '', alt: 'Paddy field', credit: '' },
}

export const team = [
  { name: 'AYYAVOO S', roleKey: 'owner', phones: ['7339329250', '7402292115'], email: 'ayyavoo19@gmail.com' },
  { name: 'KALPANA C', roleKey: 'ownerFund', phones: ['9787226726'] },
  { name: 'MONIKA A', roleKey: 'marketing', phones: ['8838198069'], email: 'monikaayyavoo58@gmail.com', qual: 'MCA' },
  { name: 'KISHORE A', roleKey: 'md', phones: ['9486802976'], email: 'kishoremonika87@gmail.com', qual: 'B.E.', extraKey: 'founder' },
]

export const translations = {
  ta: {
    brand: 'மோனிகா டிரான்ஸ்போர்ட்',
    tagline: 'நம்பிக்கையான போக்குவரத்து – தரமான வைக்கோல் சேவை',
    nav: { home: 'முகப்பு', about: 'எங்களைப் பற்றி', services: 'எங்கள் சேவைகள்', fleet: 'எங்கள் வாகனங்கள்', team: 'எங்கள் குழு', contact: 'தொடர்பு', cta: 'தொடர்பு கொள்ளுங்கள்', menu: 'பட்டியல்' },
    hero: { title: 'உங்கள் நம்பிக்கையே எங்கள் பயணம்', text: 'போக்குவரத்து, வைக்கோல் விற்பனை மற்றும் வாகன வாடகை சேவைகளில் நம்பகமான துணை.', b1: 'எங்கள் சேவைகள்', b2: 'தொடர்பு கொள்ளுங்கள்', scroll: 'கீழே செல்லவும்' },
    about: { title: 'எங்களைப் பற்றி', text: 'மோனிகா டிரான்ஸ்போர்ட் ஒரு உள்ளூர் போக்குவரத்து மற்றும் விவசாய வைக்கோல் வணிக நிறுவனம். போக்குவரத்து சேவை, வைக்கோல் சில்லறை விற்பனை, வைக்கோல் மொத்த விற்பனை மற்றும் வாகன வாடகை சேவைகளை வழங்குகிறோம்.', f1: 'சொந்த வாகனங்கள்', f2: 'சேவை பிரிவுகள்', f3: 'நிர்வாகக் குழு உறுப்பினர்கள்' },
    services: { title: 'எங்கள் சேவைகள்', hay: 'வைக்கோல் விற்பனை', retail: 'சில்லறை விற்பனை', retailText: 'வாடிக்கையாளர்களின் தேவைக்கேற்ப தரமான வைக்கோல் சில்லறை விற்பனை.', wholesale: 'மொத்த விற்பனை', wholesaleText: 'விவசாயிகள் மற்றும் வணிகத் தேவைகளுக்கு மொத்த விலையில் வைக்கோல் விற்பனை.', transport: 'போக்குவரத்து சேவைகள்', tItems: ['வணிகப் பொருட்கள் போக்குவரத்து', 'விவசாயப் பொருட்கள் போக்குவரத்து', 'உள்ளூர் போக்குவரத்து', 'நீண்ட தூர போக்குவரத்து'], rental: 'வாகன வாடகை சேவை', rentalText: 'வாடகை விவரங்களுக்கு எங்களைத் தொடர்பு கொள்ளுங்கள். வாகனத்தைத் தேர்ந்தெடுத்து விசாரிக்கலாம்.', pick: 'வாகனத்தைத் தேர்வு செய்யுங்கள்', askWa: 'வாட்ஸ்அப்பில் கேளுங்கள்', call: 'அழைக்கவும்', noPrice: 'வாடகை கட்டணம் மற்றும் கிடைப்பு விவரங்களுக்கு நேரடியாகத் தொடர்பு கொள்ளவும்.' },
    fleet: { title: 'எங்கள் வாகனங்கள்', text: 'எங்களிடம் இரண்டு சொந்த வாகனங்கள் உள்ளன.', reg: 'பதிவு எண்', note: 'படம் மாதிரி வரைபடம். நிறுவன வாகனத்தின் உண்மையான புகைப்படத்தைச் சேர்க்கலாம்.', model: 'மாடல்', brandL: 'நிறுவனம்', spec: 'வாகன விவரங்கள் கோரிக்கையின் பேரில் வழங்கப்படும்.' },
    hay: { title: 'தரமான வைக்கோல் விற்பனை', text: 'சில்லறை மற்றும் மொத்த தேவைகள் இரண்டிற்கும் வைக்கோல் வழங்குகிறோம்.', inqRetail: 'சில்லறை விசாரணை', inqWholesale: 'மொத்த விசாரணை', msgRetail: 'வணக்கம், வைக்கோல் சில்லறை விற்பனை பற்றி தெரிந்து கொள்ள விரும்புகிறேன்.', msgWholesale: 'வணக்கம், வைக்கோல் மொத்த விற்பனை பற்றி தெரிந்து கொள்ள விரும்புகிறேன்.' },
    team: { title: 'எங்கள் நிர்வாகக் குழு', qual: 'கல்வித் தகுதி', founder: 'Eemon X நிறுவனர்' },
    roles: { owner: 'உரிமையாளர்', ownerFund: 'உரிமையாளர் & நிதி (DTED)', marketing: 'சந்தைப்படுத்தல் தலைவர்', md: 'நிர்வாக இயக்குநர்' },
    contact: { title: 'எங்களைத் தொடர்பு கொள்ளுங்கள்', phone: 'தொலைபேசி', email: 'மின்னஞ்சல்', address: 'முகவரி', wa: 'வாட்ஸ்அப்', maps: 'வரைபடத்தில் பார்க்க', formTitle: 'விசாரணைப் படிவம்', name: 'பெயர்', phoneL: 'தொலைபேசி எண்', msg: 'செய்தி', send: 'வாட்ஸ்அப்பில் அனுப்புங்கள்', eName: 'பெயரை உள்ளிடவும்.', ePhone: 'சரியான 10 இலக்க எண்ணை உள்ளிடவும்.', eMsg: 'செய்தியை உள்ளிடவும்.', ok: 'வாட்ஸ்அப் திறக்கப்படுகிறது. அங்கே செய்தியை அனுப்பவும்.', hello: 'வணக்கம், மோனிகா டிரான்ஸ்போர்ட். ' },
    footer: { links: 'இணைப்புகள்', services: 'சேவைகள்', contact: 'தொடர்பு', rights: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' },
    sourcesNote: 'படங்கள்: பயன்படுத்தும் புகைப்படங்களின் மூலம் மற்றும் உரிமம் இங்கே குறிப்பிடப்படும்.',
  },
  en: {
    brand: 'MONIKA TRANSPORT',
    tagline: 'Reliable Transport. Quality Hay. Trusted Service.',
    nav: { home: 'Home', about: 'About', services: 'Services', fleet: 'Fleet', team: 'Team', contact: 'Contact', cta: 'Contact us', menu: 'Menu' },
    hero: { title: 'Your trust is our journey', text: 'A dependable partner for transportation, hay sales and vehicle rental.', b1: 'Our services', b2: 'Contact us', scroll: 'Scroll down' },
    about: { title: 'About us', text: 'Monika Transport is a local transport and agricultural hay trading business. We provide transportation, hay retail sales, hay wholesale sales and vehicle rental services.', f1: 'Own vehicles', f2: 'Service categories', f3: 'Management team members' },
    services: { title: 'Our services', hay: 'Hay Sales', retail: 'Retail', retailText: 'Quality hay sold in retail quantities to suit each customer.', wholesale: 'Wholesale', wholesaleText: 'Hay at wholesale rates for farmers and commercial needs.', transport: 'Transportation Services', tItems: ['Commercial goods transportation', 'Agricultural goods transportation', 'Local transportation', 'Long-distance transportation'], rental: 'Vehicle Rental Services', rentalText: 'Contact us for rental details. Pick a vehicle to start an inquiry.', pick: 'Choose a vehicle', askWa: 'Ask on WhatsApp', call: 'Call now', noPrice: 'For rental rates and availability, please contact us directly.' },
    fleet: { title: 'Our fleet', text: 'We own two vehicles.', reg: 'Registration', note: 'Illustration shown. The company can add real photographs of its vehicle.', model: 'Model', brandL: 'Brand', spec: 'Vehicle specifications are available on request.' },
    hay: { title: 'Quality hay sales', text: 'We supply hay for both retail and wholesale needs.', inqRetail: 'Retail inquiry', inqWholesale: 'Wholesale inquiry', msgRetail: 'Hello, I would like to know about retail hay sales.', msgWholesale: 'Hello, I would like to know about wholesale hay sales.' },
    team: { title: 'Our Management Team', qual: 'Qualification', founder: 'Founder of Eemon X' },
    roles: { owner: 'Owner', ownerFund: 'Owner & Funding (DTED)', marketing: 'Marketing Head', md: 'Managing Director' },
    contact: { title: 'Contact Us', phone: 'Phone', email: 'Email', address: 'Address', wa: 'WhatsApp', maps: 'View on Google Maps', formTitle: 'Inquiry form', name: 'Name', phoneL: 'Phone number', msg: 'Message', send: 'Send on WhatsApp', eName: 'Enter your name.', ePhone: 'Enter a valid 10-digit number.', eMsg: 'Enter a message.', ok: 'Opening WhatsApp. Send the message there.', hello: 'Hello Monika Transport. ' },
    footer: { links: 'Links', services: 'Services', contact: 'Contact', rights: 'All rights reserved.' },
    sourcesNote: 'Photo sources and licences will be credited here once images are added.',
  },
}

// ===== LANGUAGE CONTEXT =====
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try { return localStorage.getItem('mt-lang') === 'en' ? 'en' : 'ta' } catch { return 'ta' }
  })
  useEffect(() => {
    document.documentElement.lang = lang
    try { localStorage.setItem('mt-lang', lang) } catch { /* ignore */ }
  }, [lang])
  const t = translations[lang]
  const toggle = useCallback(() => setLang((l) => (l === 'ta' ? 'en' : 'ta')), [])
  return <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => useContext(LanguageContext)