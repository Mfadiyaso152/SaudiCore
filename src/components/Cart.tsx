import { useState, FormEvent } from 'react';
import { ShoppingBag, Trash2, ShieldCheck, HeartHandshake, Smile, MessageSquare, Plus, Minus } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';
import { generateOrderNumber, getWhatsAppHref } from '../utils';
import { motion, AnimatePresence } from 'motion/react';

interface CartProps {
  cartItems: CartItem[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQty: (itemId: string, newQty: number) => void;
  onClearCart: () => void;
  lang: 'ar' | 'en';
}

export function Cart({ cartItems, onRemoveItem, onUpdateQty, onClearCart, lang }: CartProps) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [generalNotes, setGeneralNotes] = useState('');
  
  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAr = lang === 'ar';

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  // Translation words dict
  const trans = {
    emptyTitle: isAr ? 'سلة المشتريات فارغة' : 'Your Shopping cart is empty',
    emptyDesc: isAr 
      ? 'تصفح خدمات التصميم والبرمجة بالأعلى، وقم بمواءمة طلبك ومواصفاته ثم أضفها إلى السلة لتأكيد العملية.' 
      : 'Browse design and coding services above, customize your specifications, and add items to your cart.',
    cartSelectedTitle: isAr ? 'سلة طلباتك المحددة' : 'Your Selected Order Cart',
    itemsAdded: isAr ? 'خدمات مضافة' : 'services selected',
    clearCart: isAr ? 'تفريغ السلة' : 'Clear Basket',
    total_lbl: isAr ? 'الإجمالي:' : 'Total:',
    sar: isAr ? 'ر.س' : 'SAR',
    total_cost_lbl: isAr ? 'تكلفة خدمات السلة:' : 'Cart Total Cost:',
    safe_redirect: isAr ? 'توجيه آمن ومباشر للواتساب' : 'Direct secure WhatsApp routing',
    whatsapp_quote_notice: isAr ? '+ يتطلب تسعير واتساب' : '+ WhatsApp custom quote required',
    form_title: isAr ? 'بيانات التواصل لبدء العمل والتحويل المباشر:' : 'Contact coordinates to start working:',
    name_lbl: isAr ? 'الاسم الكريم أو اسم المؤسسة' : 'Full Name or Organization Name',
    name_placeholder: isAr ? 'الاسم الثلاثي أو اسم شركتك' : 'Your full name / company brand',
    phone_lbl: isAr ? 'رقم التواصل (الواتساب الأساسي)' : 'Primary Contact (WhatsApp)',
    phone_placeholder: isAr ? 'مثال: 0536894854' : 'E.g., 0536894567',
    notes_lbl: isAr ? 'ملاحظات أو أسئلة إضافية تود تركها' : 'Additional requirements or project brief notes',
    notes_placeholder: isAr 
      ? 'أي ملاحظات خاصة بوقت التسليم، فكرة المشروع أو تفاصيل برمجية تعنيك...' 
      : 'E.g., preferred launch deadline, project concepts, general ideas...',
    submit_btn: isAr ? 'طلب الخدمات وبدء العمل عبر الواتس اب' : 'Order Services and Chat on WhatsApp',
    submitting_text: isAr ? 'جاري فتح محادثة الواتس اب الآمنة...' : 'Redirecting to secure WhatsApp screen...',
    footer_text: isAr 
      ? 'سنقوم بجرد متمتطلبات مشروعك فورا والرد عليك بجدول العمل.' 
      : 'We will inspect all specific product choices and reply with timeline.',
    error_name: isAr ? 'الرجاء إدخال اسمك الكريم لإتمام الطلب' : 'Please provide your name to complete the order',
    error_phone: isAr ? 'الرجاء إدخال رقم الجوال للتواصل عبر الواتساب' : 'Please provide a contact number for WhatsApp verification',
    error_phone_format: isAr ? 'الرجاء إدخال رقم جوال صحيح (مثال: 0536894854)' : 'Please enter a valid phone number (e.g. 0536894854)'
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) {
      newErrors.customerName = trans.error_name;
    }
    if (!customerPhone.trim()) {
      newErrors.customerPhone = trans.error_phone;
    } else {
      const cleanPhone = customerPhone.trim().replace(/\s/g, '');
      const phoneRegex = /^(05|5|\+9665|9665)[0-9]{8}$/;
      // Be permissive on formats if English is active to ease international formats, but enforce basic length
      if (isAr && !phoneRegex.test(cleanPhone)) {
        newErrors.customerPhone = trans.error_phone_format;
      } else if (!isAr && cleanPhone.length < 8) {
        newErrors.customerPhone = trans.error_phone_format;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Generate unique order number
    const orderNum = generateOrderNumber();

    const orderDetails: OrderDetails = {
      orderNumber: orderNum,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      items: cartItems,
      totalPrice,
      generalNotes: generalNotes.trim(),
      orderDate: new Date().toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Construct WhatsApp URL
    const whatsappUrl = getWhatsAppHref(orderDetails, lang);

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');
    }, 800);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white border border-gray-100 rounded-[32px] p-8 text-center shadow-[0_4px_30px_rgba(0,0,0,0.02)]" id="cart-empty-state">
        <div className="mx-auto w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4" id="empty-icon-wrap">
          <ShoppingBag className="w-5 h-5 text-gray-500" />
        </div>
        <h3 className="text-base font-black text-gray-950" id="empty-cart-title">{trans.emptyTitle}</h3>
        <p className="text-xs text-gray-400 mt-2 max-w-[260px] mx-auto leading-relaxed" id="empty-cart-desc">
          {trans.emptyDesc}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-[32px] shadow-[0_4px_30px_rgba(0,0,0,0.02)] overflow-hidden" id="active-cart-container">
      {/* Elegantly Spaced Minimalist Header */}
      <div className={`bg-white px-6 py-6 flex items-center justify-between border-b border-gray-100 ${isAr ? 'flex-row' : 'flex-row-reverse'}`} id="cart-header">
        <div className={`flex items-center gap-3 ${isAr ? 'flex-row text-right' : 'flex-row-reverse text-left'}`}>
          <div className="w-10 h-10 bg-gray-55/20 rounded-full flex items-center justify-center text-gray-950 border border-gray-100 shrink-0">
            <ShoppingBag className="w-4 h-4 text-gray-800" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-gray-950">{trans.cartSelectedTitle}</h3>
            <p className="text-[10px] text-gray-450 font-bold uppercase tracking-wider">{cartItems.length} {trans.itemsAdded}</p>
          </div>
        </div>
        <button
          id="btn-clear-cart"
          onClick={onClearCart}
          className="text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-50 px-3 py-1.5 rounded-full transition-all cursor-pointer"
        >
          {trans.clearCart}
        </button>
      </div>

      <div className="p-6 text-right" id="cart-content">
        {/* Scrollable Cart Items */}
        <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1 mb-6 scrollbar-thin" id="cart-items-list">
          <AnimatePresence initial={false}>
            {cartItems.map((item) => {
              const localizedItemName = isAr ? (item.product.nameAr || item.product.name) : (item.product.nameEn || item.product.name);
              const localizedPriceText = isAr ? (item.product.priceTextAr || item.product.priceText) : (item.product.priceTextEn || item.product.priceText);

              return (
                <motion.div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-gray-50 border border-gray-100 p-4 rounded-2xl relative"
                >
                  <button
                    id={`btn-remove-item-${item.id}`}
                    onClick={() => onRemoveItem(item.id)}
                    className={`absolute ${isAr ? 'left-3' : 'right-3'} top-3 p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all cursor-pointer`}
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className={`flex items-center gap-2 pb-2 mb-2 border-b border-gray-105 ${isAr ? 'flex-row pl-6 text-right' : 'flex-row-reverse pr-6 text-left'}`} id={`cart-item-head-${item.id}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${item.product.type === 'design' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    <h4 className="font-extrabold text-xs text-gray-800">{localizedItemName}</h4>
                  </div>

                  {/* Configurations parameters */}
                  {Object.keys(item.selectedFields).length > 0 && (
                    <div className="space-y-1 my-2 bg-white p-2.5 rounded-xl border border-gray-100" id={`cart-item-configs-${item.id}`}>
                      {Object.entries(item.selectedFields).map(([label, value], fieldIdx) => {
                        if (!value || !value.trim()) return null;
                        return (
                          <div key={fieldIdx} className={`text-[11px] text-gray-600 flex items-start gap-1 ${isAr ? 'justify-start text-right' : 'justify-end text-left'}`} id={`field-spec-${item.id}-${fieldIdx}`}>
                            <span className="font-extrabold text-gray-400 shrink-0">{label}:</span>
                            <span className="text-gray-700 break-words">{value}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Quantity adjustments and prices */}
                  <div className={`flex items-center justify-between mt-3 text-xs ${isAr ? 'flex-row' : 'flex-row-reverse'}`} id={`item-qty-and-price-${item.id}`}>
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5" id={`item-qty-ctl-${item.id}`}>
                      <button
                        id={`cart-qty-dec-${item.id}`}
                        onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                        className="p-1 px-2 hover:bg-gray-50 rounded transition-all text-gray-500 font-bold"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 text-[11px] font-black text-gray-800">{item.quantity}</span>
                      <button
                        id={`cart-qty-inc-${item.id}`}
                        onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                        className="p-1 px-2 hover:bg-gray-50 rounded transition-all text-gray-500 font-bold"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <div className={isAr ? 'text-left' : 'text-right'} id={`item-total-${item.id}`}>
                      <span className="text-gray-400 mr-2 text-[10px]">{trans.total_lbl}</span>
                      <span className="font-black text-gray-900 text-xs">
                        {localizedPriceText ? localizedPriceText : `${item.product.price * item.quantity} ${trans.sar}`}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Total Cost Display Badge */}
        <div className={`bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-6 flex justify-between items-center ${isAr ? 'flex-row' : 'flex-row-reverse'}`} id="total-summary-card">
          <div className={isAr ? 'text-right' : 'text-left'}>
            <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">{trans.total_cost_lbl}</span>
            <p className="text-[10px] text-gray-550 mt-1 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-555" />
              {trans.safe_redirect}
            </p>
          </div>
          <div className={`flex flex-col ${isAr ? 'text-left items-end' : 'text-right items-start'}`} id="total-price-badge">
            <div>
              <span className="text-4xl font-black text-black">{totalPrice}</span>
              <span className="text-xs font-bold text-gray-400 ml-1 uppercase">{trans.sar}</span>
            </div>
            {cartItems.some(item => item.product.priceText) && (
              <span className="text-[10px] text-gray-500 font-bold mt-1 block leading-tight">{trans.whatsapp_quote_notice}</span>
            )}
          </div>
        </div>

        {/* Customer Information Checkout Form */}
        <form onSubmit={handleCheckout} className="space-y-4 border-t border-gray-100 pt-5" id="checkout-data-form">
          <h4 className={`text-xs font-black text-gray-800 uppercase tracking-widest flex items-center gap-2 mb-3 ${isAr ? 'flex-row text-right' : 'flex-row-reverse text-left'}`} id="form-title">
            <Smile className="w-4 h-4 text-gray-800" />
            <span>{trans.form_title}</span>
          </h4>

          {/* Customer Name */}
          <div className={`space-y-1.5 ${isAr ? 'text-right' : 'text-left'}`} id="wrap-cust-name">
            <label className="text-xs font-bold text-gray-500 block">
              {trans.name_lbl} <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-customer-name"
              type="text"
              placeholder={trans.name_placeholder}
              className={`w-full text-sm bg-white border rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-transparent transition-all ${
                errors.customerName 
                  ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/10' 
                  : 'border-gray-200 focus:ring-gray-950'
              }`}
              value={customerName}
              onChange={(e) => {
                setCustomerName(e.target.value);
                if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
              }}
            />
            {errors.customerName && (
              <p className="text-[11px] text-rose-500 font-bold" id="err-cust-name">{errors.customerName}</p>
            )}
          </div>

          {/* Customer Phone */}
          <div className={`space-y-1.5 ${isAr ? 'text-right' : 'text-left'}`} id="wrap-cust-phone">
            <label className="text-xs font-bold text-gray-500 block">
              {trans.phone_lbl} <span className="text-rose-500">*</span>
            </label>
            <input
              id="input-customer-phone"
              type="text"
              placeholder={trans.phone_placeholder}
              className={`w-full text-sm bg-white border rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:border-transparent transition-all ${
                errors.customerPhone 
                  ? 'border-rose-300 focus:ring-rose-400 bg-rose-50/10' 
                  : 'border-gray-200 focus:ring-gray-950'
              }`}
              value={customerPhone}
              onChange={(e) => {
                setCustomerPhone(e.target.value);
                if (errors.customerPhone) setErrors((prev) => ({ ...prev, customerPhone: '' }));
              }}
            />
            {errors.customerPhone && (
              <p className="text-[11px] text-rose-500 font-bold" id="err-cust-phone">{errors.customerPhone}</p>
            )}
          </div>

          {/* General Notes */}
          <div className={`space-y-1.5 ${isAr ? 'text-right' : 'text-left'}`} id="wrap-cust-notes">
            <label className="text-xs font-bold text-gray-500 block">
              {trans.notes_lbl}
            </label>
            <textarea
              id="input-general-notes"
              placeholder={trans.notes_placeholder}
              rows={2}
              className="w-full text-sm bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-950 transition-all resize-none"
              value={generalNotes}
              onChange={(e) => setGeneralNotes(e.target.value)}
            />
          </div>

          {/* WhatsApp Direct Redirection submit button */}
          <button
            id="btn-checkout-submit"
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center gap-2 bg-gray-950 hover:bg-black text-white font-black py-4 px-6 rounded-full transition-all active:scale-95 cursor-pointer text-sm ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
                <span>{trans.submitting_text}</span>
              </>
            ) : (
              <>
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>{trans.submit_btn}</span>
              </>
            )}
          </button>
        </form>

        <div className={`mt-5 border-t border-gray-100 pt-4 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1.5 ${isAr ? 'flex-row' : 'flex-row-reverse'}`} id="cart-footer">
          <HeartHandshake className="w-3.5 h-3.5 text-gray-500" />
          <span>{trans.footer_text}</span>
        </div>
      </div>
    </div>
  );
}
