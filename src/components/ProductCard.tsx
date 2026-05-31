import { useState } from 'react';
import { 
  Palette, 
  Check, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Briefcase, 
  Mail, 
  CreditCard, 
  Share2, 
  Globe, 
  Database, 
  AppWindow, 
  Globe2, 
  Search, 
  Building2, 
  Layers, 
  Award, 
  Sparkles, 
  Settings,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { Product, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  key?: any;
  product: Product;
  onAddToCart: (cartItem: CartItem) => void;
  lang: 'ar' | 'en';
}

export function ProductCard({ product, onAddToCart, lang }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedFields, setSelectedFields] = useState<Record<string, string>>({});
  const [customRequirements, setCustomRequirements] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Apple pay animation state
  const [isApplePaySuccess, setIsApplePaySuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isAr = lang === 'ar';

  const localizedName = isAr ? (product.nameAr || product.name) : (product.nameEn || product.name);
  const localizedDesc = isAr ? (product.descriptionAr || product.description) : (product.descriptionEn || product.description);
  const localizedPriceText = isAr ? (product.priceTextAr || product.priceText) : (product.priceTextEn || product.priceText);
  const localizedFeatures = isAr ? (product.featuresAr || product.features) : (product.featuresEn || product.features);

  // Translation words
  const trans = {
    design: isAr ? 'تصميم' : 'Design',
    programming: isAr ? 'برمجة' : 'Code',
    sar: isAr ? 'ر.س' : 'SAR',
    cancel: isAr ? 'إلغاء التخصيص' : 'Cancel Edit',
    customize: isAr ? 'تخصيص الطلب' : 'Customize Order',
    features: isAr ? '📌 مميزات الخدمة:' : '📌 Service Features:',
    qty: isAr ? 'الكمية:' : 'Qty:',
    totalCost: isAr ? 'إجمالي التكلفة' : 'Subtotal',
    confirm: isAr ? 'تأكيد الإضافة' : 'Confirm Add',
    success: isAr ? 'تمت الإضافة بنجاح!' : 'Added successfully!',
    quickAdd: isAr ? 'إضافة سريعة للسلة' : 'Quick add to cart'
  };

  // Map icon name to Lucide Component
  const renderIcon = () => {
    switch (product.icon) {
      case 'Palette': return <Palette className="w-5 h-5 text-emerald-500" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-500" />;
      case 'Mail': return <Mail className="w-5 h-5 text-indigo-500" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-purple-500" />;
      case 'Share2': return <Share2 className="w-5 h-5 text-pink-500" />;
      case 'Globe': return <Globe className="w-5 h-5 text-sky-500" />;
      case 'Database': return <Database className="w-5 h-5 text-amber-500" />;
      case 'AppWindow': return <AppWindow className="w-5 h-5 text-teal-500" />;
      case 'Globe2': return <Globe2 className="w-5 h-5 text-cyan-500" />;
      case 'Search': return <Search className="w-5 h-5 text-rose-500" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-orange-500" />;
      case 'Layers': return <Layers className="w-5 h-5 text-emerald-400" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-400" />;
      case 'HelpCircle': return <HelpCircle className="w-5 h-5 text-indigo-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-violet-400 animate-pulse" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  const handleFieldChange = (label: string, value: string) => {
    setSelectedFields((prev) => ({
      ...prev,
      [label]: value,
    }));
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddClick = () => {
    const itemFields = { ...selectedFields };
    product.customFields?.forEach((field) => {
      const actualLabel = isAr ? (field.labelAr || field.label) : (field.labelEn || field.label);
      if (field.type === 'select' && !itemFields[actualLabel] && field.options?.length) {
        itemFields[actualLabel] = field.options[0];
      }
    });

    const finalPrice = product.price * quantity;

    const cartItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity,
      customRequirements,
      selectedFields: itemFields,
      finalPrice,
    };

    onAddToCart(cartItem);

    // Trigger Apple Pay elegant overlay morph
    setIsApplePaySuccess(true);
    setTimeout(() => {
      setIsApplePaySuccess(false);
      setQuantity(1);
      setSelectedFields({});
      setCustomRequirements('');
      setIsExpanded(false); // contract card on addition
    }, 2800);
  };

  const isDesign = product.type === 'design';

  // Make card a beautiful organic floating glass bubble
  const containerClass = isDesign
    ? 'bg-white border border-gray-100/90 shadow-[0_12px_36px_rgba(0,0,0,0.03)] hover:shadow-[0_18px_48px_rgba(0,0,0,0.05)] transition-all'
    : 'bg-[#101012] text-white border border-gray-800/85 shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:shadow-[0_20px_55px_rgba(0,0,0,0.35)] transition-all';

  const badgeClass = isDesign
    ? 'bg-gray-100 text-gray-700 border border-gray-200'
    : 'bg-gray-900 text-gray-300 border border-gray-800';

  const buttonClass = isDesign
    ? 'bg-gray-950 hover:bg-black text-white'
    : 'bg-white hover:bg-gray-100 text-black';

  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={isApplePaySuccess ? {
        scale: [1, 1.05, 1],
        rotate: [0, 2, -2, 0],
        y: 0
      } : isHovered ? {
        y: -6,
        scale: 1.03,
        rotate: 0,
      } : {
        y: 0,
        scale: 1,
        rotate: 0
      }}
      transition={isApplePaySuccess ? {
        scale: { duration: 0.5, ease: 'easeInOut' },
        rotate: { duration: 0.5, ease: 'easeInOut' },
        y: { type: 'spring', stiffness: 300, damping: 20 }
      } : {
        type: 'spring',
        stiffness: 260,
        damping: 22
      }}
      className={`relative flex flex-col justify-between overflow-hidden border transition-all ${containerClass} ${
        isExpanded 
          ? 'w-full rounded-[2.2rem] p-6 h-auto aspect-auto' 
          : 'w-[145px] h-[145px] sm:w-[165px] sm:h-[165px] rounded-full aspect-square p-3 sm:p-4 flex flex-col justify-center items-center text-center mx-auto shadow-sm'
      }`}
      style={{ 
        height: isExpanded ? 'auto' : undefined, 
        minHeight: isExpanded ? 'auto' : undefined 
      }}
    >
      <div className={`w-full flex flex-col ${isExpanded ? '' : 'items-center justify-center flex-grow'}`}>
        {/* Header Metadata */}
        <div className={`flex items-center ${isExpanded ? 'justify-between mb-3 w-full' : 'justify-center flex-col gap-0.5 mb-1'}`} id={`header-${product.id}`}>
          <div className="p-1 px-1.5 bg-gray-150/10 dark:bg-gray-950/40 rounded-full border border-gray-150/10 shrink-0">
            {renderIcon()}
          </div>
          {isExpanded && (
            <span className={`text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase ${badgeClass}`} id={`badge-${product.id}`}>
              {isDesign ? trans.design : trans.programming}
            </span>
          )}
        </div>

        {/* Title & Price - NO description */}
        <div className={`space-y-0.5 ${isExpanded ? 'mb-2' : 'text-center pb-0.5'}`} id={`details-${product.id}`}>
          <h3 className={`font-black tracking-tight leading-tight px-1 text-center ${isDesign ? 'text-gray-900' : 'text-white'} ${isExpanded ? 'text-sm' : 'text-[10px] sm:text-[11px]'}`} style={{ whiteSpace: 'normal', overflow: 'visible', wordBreak: 'break-word' }} id={`name-${product.id}`}>
            {localizedName}
          </h3>
          
          <div className="flex items-center justify-center gap-0.5" id={`price-display-${product.id}`}>
            {localizedPriceText ? (
              <span className={`font-black ${isDesign ? 'text-emerald-600' : 'text-emerald-450'} ${isExpanded ? 'text-xs' : 'text-[9px] sm:text-[10px]'}`} id={`price-amount-${product.id}`}>
                {localizedPriceText}
              </span>
            ) : (
              <div className="flex items-center gap-0.5 justify-center">
                <span className={`font-black ${isDesign ? 'text-gray-900' : 'text-white'} ${isExpanded ? 'text-sm' : 'text-[11px] sm:text-[12px]'}`} id={`price-amount-${product.id}`}>
                  {product.price}
                </span>
                <span className="text-[8px] font-bold text-gray-400 uppercase">{trans.sar}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Actions / Customization Toggle */}
      <div className={`shrink-0 w-full ${isExpanded ? 'mt-4 space-y-2' : 'mt-1'}`}>
        <div className={`flex items-center justify-center ${isExpanded ? 'gap-2' : 'gap-1'}`}>
          {/* Circular Toggle Button */}
          <button
            id={`btn-toggle-options-${product.id}`}
            onClick={() => setIsExpanded(!isExpanded)}
            className={`cursor-pointer transition-all flex items-center justify-center shrink-0 ${
              isExpanded 
                ? 'w-full text-[11px] font-extrabold py-2 px-3 rounded-full border bg-rose-500 border-rose-600 text-rose-50 gap-1' 
                : 'w-7.5 h-7.5 rounded-full border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-black dark:hover:text-white bg-transparent hover:bg-gray-150/10'
            }`}
          >
            <Settings className="w-3 h-3" />
            {isExpanded && <span>{trans.cancel}</span>}
          </button>

          {/* Quick Add bubble button */}
          {!isExpanded && (
            <button
              id={`btn-quick-add-${product.id}`}
              onClick={handleAddClick}
              className={`w-7.5 h-7.5 rounded-full cursor-pointer transition-all flex items-center justify-center shrink-0 ${buttonClass}`}
              title={trans.quickAdd}
            >
              <ShoppingBag className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Dynamic Extended Form & Feature section on state expansion */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={`pt-3 border-t border-dashed mt-3 space-y-4 border-gray-200 dark:border-gray-850 ${isAr ? 'text-right' : 'text-left'}`}
              id={`expanded-form-${product.id}`}
            >
              {/* Features List */}
              <div id={`features-${product.id}`} className="space-y-1.5 bg-gray-50/50 dark:bg-black/20 p-2.5 rounded-xl border border-gray-100 dark:border-gray-900">
                <span className="text-[10px] font-bold text-gray-450 block">{trans.features}</span>
                <ul className="space-y-1">
                  {localizedFeatures.slice(0, 3).map((feat: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-[10px] text-gray-400">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Selection custom field options */}
              {product.customFields && product.customFields.length > 0 && (
                <div className="space-y-3" id={`configurator-${product.id}`}>
                  {product.customFields.map((field, idx) => {
                    const actualLabel = isAr ? (field.labelAr || field.label) : (field.labelEn || field.label);
                    const actualPlaceholder = isAr ? (field.placeholderAr || field.placeholder) : (field.placeholderEn || field.placeholder);

                    return (
                      <div key={idx} className={`space-y-1 ${isAr ? 'text-right' : 'text-left'}`} id={`field-wrap-${product.id}-${idx}`}>
                        <label className="text-[10px] font-black text-gray-400">
                          {actualLabel}
                        </label>
                        
                        {field.type === 'select' ? (
                          <select
                            id={`field-select-${product.id}-${idx}`}
                            className={`w-full text-xs rounded-lg px-3 py-2 focus:outline-none transition-all ${
                              isDesign 
                                ? 'bg-gray-50 border border-gray-200 text-gray-800' 
                                : 'bg-[#121215] border border-gray-800 text-gray-200'
                            }`}
                            value={selectedFields[actualLabel] || ''}
                            onChange={(e) => handleFieldChange(actualLabel, e.target.value)}
                          >
                            {field.options?.map((opt, oIdx) => (
                              <option key={oIdx} value={opt} className="text-xs">
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            id={`field-textarea-${product.id}-${idx}`}
                            placeholder={actualPlaceholder}
                            rows={2}
                            className={`w-full text-xs rounded-lg px-3 py-2 focus:outline-none transition-all resize-none ${
                              isDesign 
                                ? 'bg-gray-50 border border-gray-200 text-gray-800' 
                                : 'bg-[#121215] border border-gray-800 text-gray-200'
                            }`}
                            value={selectedFields[actualLabel] || ''}
                            onChange={(e) => handleFieldChange(actualLabel, e.target.value)}
                          />
                        ) : (
                          <input
                            id={`field-input-${product.id}-${idx}`}
                            type="text"
                            placeholder={actualPlaceholder}
                            className={`w-full text-xs rounded-lg px-3 py-2 focus:outline-none transition-all ${
                              isDesign 
                                ? 'bg-gray-55 border border-gray-200 text-gray-800' 
                                : 'bg-[#121215] border border-gray-800 text-gray-200'
                            }`}
                            value={selectedFields[actualLabel] || ''}
                            onChange={(e) => handleFieldChange(actualLabel, e.target.value)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Quantity selectors */}
              <div className="flex items-center justify-between" id={`quantity-wrapper-${product.id}`}>
                <span className="text-[10px] font-bold text-gray-400">{trans.qty}</span>
                <div className="flex items-center rounded-lg p-0.5 border border-gray-200 dark:border-gray-800">
                  <button
                    type="button"
                    onClick={handleDecrement}
                    className="p-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded text-gray-500 text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-black">{quantity}</span>
                  <button
                    type="button"
                    onClick={handleIncrement}
                    className="p-1 px-2 hover:bg-gray-100 dark:hover:bg-gray-900 rounded text-gray-500 text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Subtotal & Confirm buttons */}
              <div className="flex items-center justify-between border-t border-gray-150 dark:border-gray-850 pt-3" id={`price-summary-${product.id}`}>
                <div className={isAr ? 'text-right' : 'text-left'}>
                  <span className="text-[9px] text-gray-450 block font-semibold">{trans.totalCost}</span>
                  <span className="text-xs font-black">
                    {localizedPriceText ? localizedPriceText : `${product.price * quantity} ${trans.sar}`}
                  </span>
                </div>
                <button
                  id={`btn-add-to-cart-${product.id}`}
                  onClick={handleAddClick}
                  className={`flex items-center gap-1.5 py-2 px-4 rounded-full text-xs font-black cursor-pointer transition-all ${buttonClass}`}
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{trans.confirm}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Spark / Apple Pay Success Overlay strictly following dynamic specifications */}
        <AnimatePresence>
          {isApplePaySuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className={`absolute inset-0 bg-gradient-to-br from-[#00D176] via-[#00C26D] to-[#01AB5F] text-white z-30 flex flex-col items-center justify-center p-4 text-center ${
                isExpanded ? 'rounded-[2.2rem]' : 'rounded-full'
              }`}
              id={`apple-pay-success-${product.id}`}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                {/* Genuine Apple Pay-style glowing circular drawing path */}
                <div className="relative w-16 h-16 flex items-center justify-center bg-white/10 rounded-full border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.15)] backdrop-blur-sm">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 52 52">
                    <motion.circle
                      cx="26"
                      cy="26"
                      r="23"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.45, ease: 'easeInOut' }}
                    />
                    <motion.path
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.1 27.2l7.1 7.2 16.7-16.8"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.4, duration: 0.35, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
                <div className="space-y-1 px-4">
                  <motion.h4
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    className="text-sm sm:text-base font-black tracking-tight"
                  >
                    {isAr ? 'تمت الإضافة للسلة' : 'Added to Cart'}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-[10px] font-medium text-white/90 leading-tight"
                  >
                    {isAr ? 'تمت الإضافة بنجاح للمنصة' : 'Added to Basket successfully'}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
