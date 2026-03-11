import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Phone, Facebook, Instagram, ChevronRight, X, Utensils, Users, Info } from 'lucide-react';

// Import images
import heroImg from '@/assets/images/hero.jpg';
import restaurant2Img from '@/assets/images/restaurant2.jpg';
import teamImg from '@/assets/images/team.jpg';
import phoImg from '@/assets/images/pho.jpg';
import bobunImg from '@/assets/images/bobun.jpg';
import loclacImg from '@/assets/images/loclac.jpg';
import banhcuonImg from '@/assets/images/banhcuon.jpg';

// --- Data ---
const RESTAURANT_INFO = {
  name: 'Pho Antony',
  address: '205 avenue de la Division Leclerc, 92160 Antony France',
  phone: '01 46 66 00 19',
  uberEatsUrl: 'https://www.ubereats.com/fr/store/pho-antony/fvq0gc26UwG24sFx8d5LxQ?srsltid=AfmBOor3qGe6mIecwpTahnmnLwCQRV1Ny667V30FnggxZMyO_K-4f6MY',
  facebookUrl: 'https://www.facebook.com/pho.antony92/?locale=fr_FR',
  instagramUrl: 'https://www.instagram.com/phoantony/?hl=fr',
  hours: [
    { day: 'Lundi', time: '11:00-15:00, 18:00-22:30' },
    { day: 'Mardi', time: '11:00-15:00, 18:00-22:30' },
    { day: 'Mercredi', time: '11:00-15:00, 18:00-22:30' },
    { day: 'Jeudi', time: '11:00-15:00, 18:00-22:30' },
    { day: 'Vendredi', time: '11:00-15:00, 18:00-22:30' },
    { day: 'Samedi', time: '11:00-15:00, 18:00-22:30' },
    { day: 'Dimanche', time: 'Fermé' },
  ]
};

const IMAGES = {
  hero: heroImg,
  restaurant2: restaurant2Img,
  team: teamImg,
  dishes: {
    pho: phoImg,
    bobun: bobunImg,
    loclac: loclacImg,
    banhcuon: banhcuonImg
  }
};

const MENU = [
  {
    category: 'Entrées',
    items: [
      { name: 'Nems', price: '7,80 €', desc: 'Nems au choix.' },
      { name: 'Gyoza', price: '7,80 €', desc: 'Raviolis au poulet grillé.' },
      { name: 'Banh cuôn', price: '7,80 €', desc: 'Crêpe de riz à la vapeur.', image: IMAGES.dishes.banhcuon },
      { name: 'Crevettes pannées', price: '7,80 €', desc: '' },
      { name: 'Salade maison', price: '7,80 €', desc: 'Salade maison au choix.' },
      { name: 'Omelette fu yong aux légumes', price: '7,80 €', desc: 'Omelette fu yong aux œufs battus, garnie de légumes variés.' },
    ]
  },
  {
    category: 'Plats Principaux',
    items: [
      { name: 'Phô', price: '15,80 €', desc: 'Soupe saïgonnaise et nouilles de riz, agrémentée de boulettes, de filets de bœuf et d’herbes aromatiques.', image: IMAGES.dishes.pho },
      { name: 'Bo bun au bœuf', price: '15,80 €', desc: 'Salade crudités, vermicelles de riz et nems au porc.', image: IMAGES.dishes.bobun },
      { name: 'Loc lac au bœuf', price: '17,80 €', desc: 'Filet de bœuf mariné, coupé en petits morceaux, riz rouge, œuf au plat, crudités et jus de citron poivré.', image: IMAGES.dishes.loclac },
      { name: 'Soupe de raviolis aux crevettes et nouilles', price: '15,80 €', desc: 'Soupe de raviolis farcis aux crevettes et nouilles, en bouillon.' },
      { name: 'Crevettes au sel et poivre', price: '18,80 €', desc: 'Riz blanc.' },
      { name: 'Riz sauté aux crevettes', price: '16,80 €', desc: 'Riz sauté aux crevettes, ananas frais et basilic.' },
    ]
  },
  {
    category: 'Sandwichs vietnamiens (Bánh mì)',
    items: [
      { name: 'Bánh mì au porc laqué', price: '7,80 €', desc: 'Pain baguette garni de porc, carottes, concombre, coriandre, mayonnaise et sauce soja.' },
      { name: 'Bánh mì au bœuf à la citronnelle', price: '7,80 €', desc: 'Pain baguette garni de bœuf, carottes, concombre, coriandre, mayonnaise et sauce soja.' },
      { name: 'Bánh mì au poulet à la citronnelle', price: '7,80 €', desc: 'Pain baguette garni de poulet, carottes, concombre, coriandre, mayonnaise et sauce soja.' },
      { name: 'Bánh mì végétarien au tofu', price: '6,80 €', desc: 'Pain baguette garni de tofu, carottes, concombre, coriandre, mayonnaise et sauce soja.' },
    ]
  }
];

// --- Components ---

const LegalMentionsModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Mentions Légales</h2>
            <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
              <X className="w-6 h-6 text-stone-500" />
            </button>
          </div>
          <div className="space-y-4 text-stone-600 font-sans leading-relaxed">
            <p><strong>Raison sociale :</strong> PHO ANTONY</p>
            <p><strong>Forme juridique :</strong> Société à responsabilité limitée (SARL)</p>
            <p><strong>Adresse du siège social :</strong> 205 AVENUE DE LA DIVISION LECLERC, 92160 ANTONY</p>
            <p><strong>Numéro SIREN :</strong> 818 080 400</p>
            <p><strong>Activité (Code NAF ou APE) :</strong> Restauration traditionnelle (5610A)</p>
            <p><strong>Dirigeant :</strong> Haixia LAN</p>
            <p className="text-sm mt-6 pt-4 border-t border-stone-200">
              Les informations ci-dessus sont fournies à titre indicatif conformément aux obligations légales de transparence des entreprises.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-orange-200 selection:text-orange-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img src="/logo.png" alt="Pho Antony Logo" className="h-10 w-auto rounded-full object-cover" />
            <span className={`font-serif font-bold text-2xl tracking-tight ${isScrolled ? 'text-stone-900' : 'text-white drop-shadow-md'}`}>
              Pho Antony
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('menu')} className={`font-medium hover:text-orange-500 transition-colors ${isScrolled ? 'text-stone-600' : 'text-white drop-shadow-md'}`}>Menu</button>
            <button onClick={() => scrollToSection('team')} className={`font-medium hover:text-orange-500 transition-colors ${isScrolled ? 'text-stone-600' : 'text-white drop-shadow-md'}`}>L'Équipe</button>
            <button onClick={() => scrollToSection('contact')} className={`font-medium hover:text-orange-500 transition-colors ${isScrolled ? 'text-stone-600' : 'text-white drop-shadow-md'}`}>Contact</button>
            <a 
              href={RESTAURANT_INFO.uberEatsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              Commander sur Uber Eats
            </a>
          </div>
          {/* Mobile menu button could go here */}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.hero} 
            alt="Intérieur du restaurant Pho Antony" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-stone-900/90"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight leading-tight">
              L'Authenticité <br/>
              <span className="text-orange-500 italic">Vietnamienne</span>
            </h1>
            <p className="text-lg md:text-2xl text-stone-200 mb-10 max-w-2xl mx-auto font-light">
              Découvrez les saveurs traditionnelles du Vietnam au cœur d'Antony. Des plats préparés avec passion et des ingrédients frais.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={RESTAURANT_INFO.uberEatsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-medium text-lg transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center justify-center gap-2"
              >
                Commander en livraison
              </a>
              <button 
                onClick={() => scrollToSection('menu')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-medium text-lg transition-all flex items-center justify-center gap-2"
              >
                Découvrir la carte
              </button>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <button onClick={() => scrollToSection('menu')} className="text-white/70 hover:text-white">
            <ChevronRight className="w-8 h-8 rotate-90" />
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Notre Carte</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-stone-600 max-w-2xl mx-auto text-lg">
              Une sélection de nos meilleurs plats, préparés selon les recettes traditionnelles vietnamiennes.
            </p>
          </div>

          <div className="space-y-20">
            {MENU.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-2xl font-serif font-bold text-stone-800 mb-8 flex items-center gap-3">
                  <Utensils className="w-6 h-6 text-orange-500" />
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {category.items.map((item, itemIdx) => (
                    <motion.div 
                      key={itemIdx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: itemIdx * 0.1 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-stone-100 flex flex-col"
                    >
                      {item.image && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-bold text-stone-900 pr-4">{item.name}</h4>
                          <span className="text-orange-600 font-bold whitespace-nowrap">{item.price}</span>
                        </div>
                        {item.desc && (
                          <p className="text-stone-500 text-sm mt-2 flex-1">{item.desc}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href={RESTAURANT_INFO.uberEatsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-full font-medium transition-colors"
            >
              Voir toute la carte sur Uber Eats
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={IMAGES.team} 
                  alt="L'équipe de Pho Antony" 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-8 rounded-3xl shadow-xl hidden md:block">
                <Users className="w-10 h-10 mb-2" />
                <p className="font-serif font-bold text-2xl">Une équipe<br/>passionnée</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Notre Équipe</h2>
              <p className="text-lg text-stone-600 mb-6 leading-relaxed">
                Chez Pho Antony, nous sommes fiers de vous accueillir dans une ambiance chaleureuse et conviviale. Notre équipe dévouée met tout en œuvre pour vous faire vivre une expérience culinaire authentique.
              </p>
              <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                De la cuisine à la salle, chaque membre de notre équipe partage la même passion pour la gastronomie vietnamienne et le sens de l'hospitalité.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                  <h4 className="font-bold text-stone-900 text-xl mb-2">Authenticité</h4>
                  <p className="text-stone-500">Des recettes transmises de génération en génération.</p>
                </div>
                <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                  <h4 className="font-bold text-stone-900 text-xl mb-2">Sourire</h4>
                  <p className="text-stone-500">Un service attentionné pour vous faire sentir comme chez vous.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="contact" className="py-24 bg-stone-900 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-10">Venez nous rendre visite</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-stone-800 p-3 rounded-full text-orange-500 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Adresse</h4>
                    <p className="text-stone-400 text-lg">{RESTAURANT_INFO.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-stone-800 p-3 rounded-full text-orange-500 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Téléphone</h4>
                    <p className="text-stone-400 text-lg">{RESTAURANT_INFO.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-stone-800 p-3 rounded-full text-orange-500 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="w-full">
                    <h4 className="text-white font-bold text-lg mb-3">Horaires d'ouverture</h4>
                    <div className="space-y-2">
                      {RESTAURANT_INFO.hours.map((h, idx) => (
                        <div key={idx} className="flex justify-between border-b border-stone-800 pb-2">
                          <span className={h.day === 'Dimanche' ? 'text-stone-500' : 'text-stone-300'}>{h.day}</span>
                          <span className={h.day === 'Dimanche' ? 'text-red-400 font-medium' : 'text-white'}>{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl relative">
              <img 
                src={IMAGES.restaurant2} 
                alt="Salle du restaurant Pho Antony" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent flex items-end p-8">
                <div className="flex gap-4">
                  <a 
                    href={RESTAURANT_INFO.facebookUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full text-white transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a 
                    href={RESTAURANT_INFO.instagramUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-4 rounded-full text-white transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 py-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Pho Antony Logo" className="h-8 w-auto rounded-full object-cover" />
            <span className="font-serif font-bold text-xl text-white">
              Pho Antony
            </span>
          </div>
          
          <p className="text-stone-500 text-sm text-center">
            &copy; {new Date().getFullYear()} Pho Antony. Tous droits réservés.
          </p>
          
          <button 
            onClick={() => setIsLegalModalOpen(true)}
            className="text-stone-500 hover:text-stone-300 text-sm flex items-center gap-1 transition-colors"
          >
            <Info className="w-4 h-4" />
            Mentions légales
          </button>
        </div>
      </footer>

      <LegalMentionsModal isOpen={isLegalModalOpen} onClose={() => setIsLegalModalOpen(false)} />
    </div>
  );
}
