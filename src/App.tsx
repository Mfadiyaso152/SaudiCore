import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  X,
  MessageSquare,
  Globe,
  Settings,
  Mail,
  Instagram
} from 'lucide-react';
import { productsList } from './data';
import { CartItem } from './types';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lang, setLang] = useState<'ar' | 'en'>('ar');
  const [islandExpanded, setIslandExpanded] = useState(false);

  const isAr = lang === 'ar';

  // Throttled high-performance scroll handling that doesn't cause recursive re-renders or freezes
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 80) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          // Compress the island smoothly when scrolled to adjust perfectly to mob/desktop movement
          setIslandExpanded(false);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load cart from localStorage if present
  useEffect(() => {
    const savedCart = localStorage.getItem('tamkeen_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage', e);
      }
    }
  }, []);

  // Save cart to localStorage on modify
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('tamkeen_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (newItem: CartItem) => {
    const existingIndex = cart.findIndex(
      (item) => 
        item.product.id === newItem.product.id && 
        JSON.stringify(item.selectedFields) === JSON.stringify(newItem.selectedFields)
    );

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += newItem.quantity;
      updatedCart[existingIndex].finalPrice = 
        updatedCart[existingIndex].product.price * updatedCart[existingIndex].quantity;
      saveCart(updatedCart);
    } else {
      saveCart([...cart, newItem]);
    }
  };

  const handleRemoveItem = (itemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    saveCart(updatedCart);
  };

  const handleUpdateQty = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: newQty,
          finalPrice: item.product.price * newQty,
        };
      }
      return item;
    });
    saveCart(updatedCart);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Core Landing page translation dictionary
  const transDict = {
    ar: {
      platformName: 'إرتقاء',
      platformSub: 'للخدمات الرقمية',
      heroPill: 'تميز وجودة رقمية وتصاميم حديثة تنبض بالإبداع والابتكار',
      heroHeadlineStart: 'اصنع تواجدك الرقمي الفريد بـ ',
      heroHeadlineDesignUrl: 'تصاميم إبداعية',
      heroAnd: ' و ',
      heroHeadlineCodeUrl: 'برمجة متكاملة',
      heroSubtext: 'منصة إرتقاء الرقمية تُمكّنك من الحصول على أفضل خدمات التصميم الاحترافي، وحلول البرمجة والنشر المتطورة بأسعار منافسة ومدروسة. حدد متطلباتك وسجل فكرتك ثم اطلب للتحول مباشرة للواتساب وبدء العمل فوراً.',
      heroCta: '🚀 استكشف معرض المنتجات واطلب الآن',
      benefit1Title: 'جودة فنية متقنة',
      benefit1Desc: 'نلتزم بالمعايير القياسية والواجهات المعاصرة.',
      benefit2Title: 'سرعة قياسية للتسليم',
      benefit2Desc: 'نقدّر قيمة وقتكم ونسلم الأعمال بمهل وجيزة.',
      benefit3Title: 'دعم وتعديل مرن',
      benefit3Desc: 'نقوم بمواءمة التصاميم والموقع حتى قمة الرضا.',
      benefit4Title: 'توجيه آمن للواتساب',
      benefit4Desc: 'نعمل على توليد رسالة منظمة وحفظ وقتكم الثمين.',
      catalogTitle: 'استكشف الخدمات الرقمية المتاحة',
      footerRights: 'حقوق الموقع محفوظة للمبرمج محمد © 2026',
      drawerTitle: 'سلة طلباتك المحددة',
      drawerSubTitle: 'خدمات إضافية بانتظارك',
      optionsTitle: 'قائمة التحكم بالمنصة',
      langTitle: 'أو اختر لغة العرض:',
      closeLabel: 'إغلاق',
      contactTitle: 'وسائل الاتصال المباشرة:',
      whatsApp: 'الواتساب الرسمي لحجز المشاريع',
      tiktok: 'تيك توك',
      email: 'البريد الإلكتروني'
    },
    en: {
      platformName: 'Irteqa',
      platformSub: 'Digital Services',
      heroPill: 'Elite digital quality and ultra-modern designs bursting with innovation',
      heroHeadlineStart: 'Shape Your Unique Digital Footprint with ',
      heroHeadlineDesignUrl: 'Creative Designs',
      heroAnd: ' & ',
      heroHeadlineCodeUrl: 'Pristine Development',
      heroSubtext: 'Irteqa Platform is your premier destination for professional graphic design, reliable software engineering, and search optimization services. Craft your ideal package, define custom fields, and route your order directly to WhatsApp in one tap.',
      heroCta: '🚀 Browse Catalog & Get Started Now',
      benefit1Title: 'Premium Quality',
      benefit1Desc: 'We commit premium layouts matching international standards.',
      benefit2Title: 'Rapid Turnaround',
      benefit2Desc: 'We value your schedule and launch layouts ahead of milestones.',
      benefit3Title: 'Adaptive Revisions',
      benefit3Desc: 'Dynamic custom edits until the project satisfies you completely.',
      benefit4Title: 'Quick WhatsApp Checkout',
      benefit4Desc: 'Generate direct formatted messages, cutting checkout time in half.',
      catalogTitle: 'Explore Available Digital Services',
      footerRights: 'Created with excellence by Programmer Mohammed. All rights reserved © 2026',
      drawerTitle: 'Your Shopping Basket',
      drawerSubTitle: 'Extra options pending',
      optionsTitle: 'Control Center Settings',
      langTitle: 'Select display language:',
      closeLabel: 'Close',
      contactTitle: 'Direct Communication Channels:',
      whatsApp: 'Official Booking WhatsApp Representative',
      tiktok: 'TikTok Handle',
      email: 'Official Support Address'
    }
  };

  const currentTrans = transDict[lang];

  // Dynamic Island popup translations menu panel
  const menuTranslations = {
    ar: {
      title: 'قائمة التواصل والإعدادات',
      langTitle: 'اختر لغة العرض',
      arBtn: 'العربية (افتراضي)',
      enBtn: 'English',
      contactTitle: 'قنوات التواصل والشبكات الاجتماعية',
      tiktok: 'تيك توك',
      phone: 'الواتساب وجوال حجز المشاريع',
      email: 'البريد الإلكتروني للإفادة',
      closeBtn: 'إغلاق النافذة'
    },
    en: {
      title: 'Contact Channels & Settings',
      langTitle: 'Display Language Options',
      arBtn: 'العربية',
      enBtn: 'English (Default)',
      contactTitle: 'Direct Communications & Social Coordinates',
      tiktok: 'TikTok Profile',
      phone: 'WhatsApp Direct Helpline',
      email: 'Developer Inbox Address',
      closeBtn: 'Close Panel'
    }
  };

  return (
    <div className={`min-h-screen flex flex-col bg-[#FAFAFA] text-gray-900 antialiased relative overflow-x-hidden ${isAr ? 'font-sans' : 'font-sans'}`} id="main-app-shell">
      
      {/* 
        PREMIUM GLOWING AMBIENT WATERMARKS (Website Effects)
        We place ultra-smooth, lightweight CSS circles with large blurs to elevate the visual backdrop.
      */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[650px] bg-gradient-to-tr from-emerald-500/8 via-teal-400/4 to-transparent rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[25%] right-[-10%] w-[50vw] h-[50vw] max-w-[550px] bg-gradient-to-bl from-indigo-500/8 via-purple-400/3 to-transparent rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '12s' }} />
      <div className="absolute bottom-[10%] left-[-5%] w-[45vw] h-[45vw] max-w-[500px] bg-gradient-to-tr from-blue-400/5 via-cyan-400/3 to-transparent rounded-full blur-[110px] pointer-events-none z-0" />

      {/* 
        ELITE FLOATING IPHONE DYNAMIC ISLAND 
        Designed purely as a fixed element overlay so that its appearance is completely 
        non-disruptive to the DOM flow, resolving scroll jitter and mouse lags instantly.
      */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            key="dynamic-island"
            id="dynamic-island-navbar"
            layout
            initial={{ y: -50, x: '-50%', scale: 0.8, opacity: 0 }}
            animate={islandExpanded ? {
              y: 0,
              x: '-50%',
              scale: 1,
              opacity: 1,
              width: '240px',
              height: '46px',
              borderRadius: '23px',
              backgroundColor: '#050505',
              boxShadow: '0 20px 50px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.08)'
            } : {
              y: 0,
              x: '-50%',
              scale: 1,
              opacity: 1,
              width: '135px',
              height: '40px',
              borderRadius: '20px',
              backgroundColor: '#000000',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)'
            }}
            exit={{ y: -50, x: '-50%', scale: 0.8, opacity: 0 }}
            whileHover={{ 
              scale: 1.05, 
              y: -1,
              boxShadow: islandExpanded 
                ? '0 25px 55px rgba(0,0,0,0.7), 0 0 0 1.5px rgba(255,255,255,0.12)' 
                : '0 15px 45px rgba(0,0,0,0.55), 0 0 0 1.5px rgba(255,255,255,0.1)'
            }}
            whileTap={{ scale: 0.96, y: 1 }}
            transition={{ 
              type: 'spring', 
              stiffness: 280, 
              damping: 20, 
              mass: 0.75,
              layout: { 
                type: 'spring', 
                stiffness: 230, 
                damping: 17, 
                mass: 0.7
              }
            }}
            className="fixed top-3 left-1/2 z-50 text-white flex items-center justify-between overflow-hidden cursor-pointer select-none transition-shadow duration-300"
            onClick={() => setIslandExpanded(!islandExpanded)}
          >
            {/* If Island is NOT expanded (Default micro Dynamic Island state resembling Apple's capsule) */}
            {!islandExpanded && (
              <motion.div 
                className="w-full h-full flex items-center justify-between px-3.5"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                {/* Shopping bag visual trigger indicator */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCartOpen(true);
                  }}
                  className="relative flex items-center justify-center p-1.5 rounded-full text-white cursor-pointer hover:bg-white/10 active:scale-90 transition-all"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-gray-200" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black shadow-sm ring-1 ring-black">
                      {totalCartCount}
                    </span>
                  )}
                </button>
 
                {/* iPhone trademark active camera/recording indicators (Green camera dot + Orange mic dot with premium pulsing animations) */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-[pulse_1.5s_infinite]" title="Camera" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 animate-[pulse_2s_infinite]" title="Mic" />
                </div>
              </motion.div>
            )}
 
            {/* If Island IS expanded (Expanded basket status state) */}
            {islandExpanded && (
              <motion.div 
                className="w-full h-full flex items-center justify-center px-2"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsCartOpen(true);
                    setIslandExpanded(false);
                  }}
                  className="w-full h-full flex items-center justify-center gap-2 text-[11px] font-black hover:bg-white/10 active:scale-95 transition-all cursor-pointer text-gray-100 hover:text-white"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  <span className="tracking-tight">{isAr ? `فتح السلة (${totalCartCount})` : `Open Basket (${totalCartCount})`}</span>
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standard Desktop Header Navigation - Slides out of sight beautifully when Dynamic Island is active */}
      <header 
        className={`bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled 
            ? 'opacity-0 -translate-y-full pointer-events-none' 
            : 'opacity-100 translate-y-0'
        }`}
        id="main-navbar"
      >
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
          
          {/* Logo & title brand markup */}
          <div className={`flex items-center gap-3 cursor-pointer ${isAr ? 'flex-row text-right' : 'flex-row-reverse text-left'}`} onClick={() => scrollToSection('home-hero')}>
            <div className="w-10 h-10 bg-gray-950 rounded-xl flex items-center justify-center text-white border border-gray-800 shadow-sm shrink-0">
              <Sparkles className="w-5 h-5 text-gray-200" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-black text-gray-905 tracking-tight flex items-center gap-1 leading-none">
                {isAr ? (
                  <>منصّة <span className="text-gray-950 font-black">{currentTrans.platformName}</span></>
                ) : (
                  <><span className="text-gray-950 font-black">{currentTrans.platformName}</span> Platform</>
                )}
              </h1>
              <p className="text-[9px] text-gray-400 font-extrabold mt-1 uppercase tracking-widest leading-none">{currentTrans.platformSub}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* Minimalist Language Switcher */}
            <button
              id="header-lang-switcher"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="text-xs font-bold px-3 py-1.5 rounded-full border border-gray-150 hover:border-gray-300 transition-colors cursor-pointer text-gray-700 hover:text-black bg-white/50 backdrop-blur-sm"
            >
              {lang === 'ar' ? 'English' : 'العربية'}
            </button>

            <button
              id="header-cart-trigger"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center bg-gray-950 hover:bg-black text-white w-10 h-10 rounded-full transition-all active:scale-95 cursor-pointer border border-gray-850 shadow-sm"
              title={isAr ? 'سلة الطلبات' : 'Cart view'}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {totalCartCount > 0 ? (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-extrabold shadow-md animate-pulse">
                  {totalCartCount}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 bg-gray-200 text-gray-600 text-[8px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold border border-white">0</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-grow">
        
        {/* Interactive Centered Hero Intro section */}
        <section id="home-hero" className="relative py-16 md:py-24 overflow-hidden bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 text-gray-600 px-4 py-2 rounded-full text-[11px] md:text-xs font-semibold mx-auto" id="hero-announcement-pill">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse shrink-0" />
              <span>{currentTrans.heroPill}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-950 leading-[1.2] tracking-tight" id="hero-headline">
              {currentTrans.heroHeadlineStart}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-indigo-600 underline decoration-emerald-200 decoration-3">
                {currentTrans.heroHeadlineDesignUrl}
              </span>
              {currentTrans.heroAnd}
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 underline decoration-blue-200 decoration-3">
                {currentTrans.heroHeadlineCodeUrl}
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed" id="hero-subtext">
              {currentTrans.heroSubtext}
            </p>

            {/* Centered CTA button */}
            <div className="flex justify-center pt-2" id="hero-cta-buttons">
              <button
                onClick={() => scrollToSection('catalog-section')}
                className="flex items-center justify-center gap-2 bg-gray-950 hover:bg-black text-white font-extrabold py-3.5 px-7 rounded-full transition-all active:scale-95 cursor-pointer text-xs md:text-sm shadow-xl"
              >
                {currentTrans.heroCta}
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Cards Section */}
        <section id="benefits-section" className="py-10 bg-white border-b border-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className={`flex flex-col items-center p-4 rounded-2xl hover:bg-gray-55 transition-colors border border-transparent hover:border-gray-100 text-center ${isAr ? 'direction-rtl' : 'direction-ltr'}`}>
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-black text-xs text-gray-900">{currentTrans.benefit1Title}</h3>
                <p className="text-[10px] text-gray-400 mt-1 leading-normal max-w-[150px]">{currentTrans.benefit1Desc}</p>
              </div>

              <div className={`flex flex-col items-center p-4 rounded-2xl hover:bg-gray-55 transition-colors border border-transparent hover:border-gray-100 text-center ${isAr ? 'direction-rtl' : 'direction-ltr'}`}>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-black text-xs text-gray-900">{currentTrans.benefit2Title}</h3>
                <p className="text-[10px] text-gray-400 mt-1 leading-normal max-w-[150px]">{currentTrans.benefit2Desc}</p>
              </div>

              <div className={`flex flex-col items-center p-4 rounded-2xl hover:bg-gray-55 transition-colors border border-transparent hover:border-gray-100 text-center ${isAr ? 'direction-rtl' : 'direction-ltr'}`}>
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mb-2">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-black text-xs text-gray-900">{currentTrans.benefit3Title}</h3>
                <p className="text-[10px] text-gray-400 mt-1 leading-normal max-w-[150px]">{currentTrans.benefit3Desc}</p>
              </div>

              <div className={`flex flex-col items-center p-4 rounded-2xl hover:bg-gray-55 transition-colors border border-transparent hover:border-gray-100 text-center ${isAr ? 'direction-rtl' : 'direction-ltr'}`}>
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mb-2">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="font-black text-xs text-gray-900">{currentTrans.benefit4Title}</h3>
                <p className="text-[10px] text-gray-400 mt-1 leading-normal max-w-[150px]">{currentTrans.benefit4Desc}</p>
              </div>

            </div>
          </div>
        </section>

        {/* Catalog Store Style Grid */}
        <section id="catalog-section" className="py-12 bg-gray-50/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className={`flex items-center justify-between pb-2 border-b border-gray-105 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
              <h2 className="text-sm md:text-base font-black tracking-tight text-gray-900 uppercase">
                🎯 {currentTrans.catalogTitle}
              </h2>
              <span className="text-[10px] font-black text-gray-400 font-mono">({productsList.length} ITEMS)</span>
            </div>

            {/* Squared Products Grid - side-by-side on all screens for an elite bento shop grid layout */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5" id="products-catalog-grid">
              {productsList.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  lang={lang}
                />
              ))}
            </div>

          </div>
        </section>
      </main>

      {/* 
        PREMIUM BOX-STYLED FOOTER (as requested)
        Designed with soft rounded corners, soft edges, containing ONLY contact avenues 
        and the developer copyrights attribution for programmer "محمد" in clear, minimalist layout.
      */}
      <div className="px-4 sm:px-6 lg:px-8 w-full shrink-0">
        <footer 
          className="mx-auto my-8 max-w-5xl bg-gray-950 text-gray-400 p-6 sm:p-8 rounded-3xl border border-gray-850 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
          id="main-footer"
        >
          {/* Copyright description & Social media handles */}
          <div className={`text-center md:text-right space-y-2 ${isAr ? 'md:order-1' : 'md:order-3'}`}>
            <div>
              <span className="text-[10px] text-gray-500 font-extrabold tracking-widest block uppercase font-mono">{lang === 'ar' ? 'منصة إرتقاء' : 'Irteqa Digital'}</span>
              <p className="text-xs font-bold text-gray-300">
                {lang === 'ar' ? 'حقوق الموقع محفوظة للمبرمج محمد © 2026' : 'Created & Designed by Programmer Mohammed © 2026'}
              </p>
            </div>
            
            {/* Added Social media handles next to copyrights */}
            <div className={`flex flex-wrap items-center justify-center ${isAr ? 'md:justify-start' : 'md:justify-end'} gap-4 pt-1.5 border-t border-gray-800/40`}>
              <a 
                href="https://instagram.com/km.7mo" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1 text-xs text-gray-400 hover:text-pink-400 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-500" />
                <span className="font-mono font-bold text-[11px]">km.7mo</span>
              </a>
              <a 
                href="https://www.tiktok.com/@1..99.6" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-slate-100 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.09-1.47-.77-.56-1.44-1.27-1.92-2.1v9.99c.02 3.51-2.16 6.94-5.63 7.84-3.41.97-7.29-.62-8.79-3.83-1.63-3.32-.43-7.79 2.76-9.57 1.95-1.12 4.41-1.3 6.54-.53v4.27c-1.3-.64-2.92-.55-4.07.36-.93.71-1.44 1.88-1.34 3.05.08 1.34.99 2.58 2.29 2.94 1.32.39 2.87-.1 3.53-1.25.32-.54.43-1.18.41-1.802V.02Z"/>
                </svg>
                <span className="font-mono font-bold text-[11px]">1..99.6</span>
              </a>
            </div>
          </div>

          {/* Social Channels List */}
          <div className="flex items-center justify-center gap-3 md:order-2">
            {/* WhatsApp */}
            <a 
              href="https://wa.me/966536894854" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 bg-gray-900 border border-gray-800 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center transition-all"
              title="Official WhatsApp"
            >
              <MessageSquare className="w-4.5 h-4.5" />
            </a>

            {/* TikTok Link */}
            <a 
              href="https://www.tiktok.com/@1..99.6" 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 bg-gray-900 border border-gray-800 hover:border-pink-500/50 hover:bg-pink-500/10 text-white rounded-full flex items-center justify-center transition-all"
              title="TikTok"
            >
              <Instagram className="w-4.5 h-4.5" />
            </a>

            {/* Email Contact (Custom updated to mfb-15@hotmail.com) */}
            <a 
              href="mailto:mfb-15@hotmail.com"
              className="w-10 h-10 bg-gray-900 border border-gray-800 hover:border-blue-500/50 hover:bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center transition-all"
              title="Email support"
            >
              <Mail className="w-4.5 h-4.5" />
            </a>
          </div>
        </footer>
      </div>

      {/* Sidebar Drawer Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Dark blur backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity cursor-pointer"
              id="cart-drawer-backdrop"
            />

            {/* Sliding Right Drawer container */}
            <motion.div
              initial={{ x: isAr ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isAr ? '100%' : '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              className={`fixed inset-y-0 ${isAr ? 'right-0' : 'left-0'} w-full max-w-md bg-white z-50 shadow-2xl flex flex-col h-full border-l border-gray-100`}
              id="cart-drawer-container"
            >
              {/* Close Button & Header */}
              <div className={`p-5 border-b border-gray-100 bg-white flex items-center justify-between shrink-0 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex items-center gap-2 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                  <ShoppingBag className="w-5 h-5 text-gray-900" />
                  <span className="text-base font-black text-gray-900">{currentTrans.drawerTitle}</span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-black transition-all flex items-center justify-center cursor-pointer border border-gray-200"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Cart Component body container */}
              <div className="flex-grow overflow-y-auto p-4 md:p-6 bg-gray-50/40">
                <Cart
                  cartItems={cart}
                  onRemoveItem={handleRemoveItem}
                  onUpdateQty={handleUpdateQty}
                  onClearCart={handleClearCart}
                  lang={lang}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Control overlay modal for Settings and Lang */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dark blur backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity cursor-pointer"
              id="menu-overlay-backdrop"
            />

            {/* Glassmorphic Modal Options container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.35 }}
              className={`fixed inset-x-4 top-1/2 -smart-centering md:mx-auto max-w-sm bg-white rounded-3xl z-50 p-6 shadow-2xl border border-gray-100 flex flex-col space-y-5 ${isAr ? 'text-right' : 'text-left'}`}
              style={{ transform: 'translateY(-50%)', margin: '0 auto' }}
              id="menu-overlay-panel"
            >
              {/* Header Title with Custom language badge */}
              <div className={`flex items-center justify-between border-b border-gray-100 pb-3.5 ${isAr ? 'flex-row' : 'flex-row-reverse'}`}>
                <h3 className="text-xs font-black text-gray-950 flex items-center gap-1.5 uppercase tracking-wide">
                  <Sparkles className="w-4 h-4 text-gray-805" />
                  <span>{currentTrans.optionsTitle}</span>
                </h3>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full bg-gray-50 hover:bg-gray-100 border border-gray-250 text-gray-400 hover:text-black cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Language Switch */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-gray-400 uppercase block tracking-wider">{currentTrans.langTitle}</span>
                <div className="grid grid-cols-2 gap-1.5 bg-gray-50 p-1 rounded-xl border border-gray-150">
                  <button 
                    onClick={() => setLang('ar')}
                    className={`text-xs py-2 px-3 rounded-lg font-black transition-all cursor-pointer ${
                      lang === 'ar' 
                        ? 'bg-gray-950 text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    العربية
                  </button>
                  <button 
                    onClick={() => setLang('en')}
                    className={`text-xs py-2 px-3 rounded-lg font-black transition-all cursor-pointer ${
                      lang === 'en' 
                        ? 'bg-gray-950 text-white shadow-sm' 
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Direct Contacts Info */}
              <div className="space-y-3">
                <span className="text-[10px] font-black text-gray-400 block tracking-wider uppercase">{menuTranslations[lang].contactTitle}</span>
                
                <div className="space-y-2">
                  {/* WhatsApp Line */}
                  <a 
                    href="https://wa.me/966536894854" 
                    target="_blank" 
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl bg-emerald-50/40 hover:bg-emerald-50/70 border border-emerald-100/50 text-emerald-950 transition-colors font-bold group ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`flex items-center gap-2.5 ${isAr ? 'flex-row text-right' : 'flex-row-reverse text-left'}`}>
                      <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        💬
                      </div>
                      <div>
                        <span className="text-[9px] text-emerald-600 block leading-none font-bold">{menuTranslations[lang].phone}</span>
                        <span className="text-xs font-black font-mono">0536894854</span>
                      </div>
                    </div>
                  </a>

                  {/* TikTok Line */}
                  <a 
                    href="https://www.tiktok.com/@1..99.6" 
                    target="_blank" 
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-150 text-gray-900 transition-colors font-bold group ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`flex items-center gap-2.5 ${isAr ? 'flex-row text-right' : 'flex-row-reverse text-left'}`}>
                      <div className="w-7 h-7 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        🎵
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 block leading-none font-bold">{menuTranslations[lang].tiktok}</span>
                        <span className="text-xs font-black font-mono">1..99.6</span>
                      </div>
                    </div>
                  </a>

                  {/* Mail Line (mfb-15@hotmail.com updated) */}
                  <a 
                    href="mailto:mfb-15@hotmail.com"
                    className={`flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/80 border border-gray-150 text-gray-950 transition-colors font-bold group ${isAr ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`flex items-center gap-2.5 ${isAr ? 'flex-row text-right' : 'flex-row-reverse text-left'}`}>
                      <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                        ✉️
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-400 block leading-none font-bold">{menuTranslations[lang].email}</span>
                        <span className="text-xs font-black font-mono">mfb-15@hotmail.com</span>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-gray-950 hover:bg-black text-white text-xs font-black cursor-pointer transition-colors text-center"
              >
                {currentTrans.closeLabel}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
