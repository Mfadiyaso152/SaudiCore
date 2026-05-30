import { OrderDetails } from './types';

/**
 * Generates a unique, professional order number.
 * Pattern: TQ-YYYYMMDD-XXXX where XXXX is random numerical string.
 */
export function generateOrderNumber(): string {
  const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `TQ-${dateStr}-${randomNum}`;
}

/**
 * Encodes the order details into an elegant, highly structured message for WhatsApp.
 */
export function buildWhatsAppMessage(orderDetails: OrderDetails, lang: 'ar' | 'en' = 'ar'): string {
  const isAr = lang === 'ar';

  if (isAr) {
    let message = `*السلام عليكم ورحمة الله وبركاته*\n\n`;
    message += `أود طلب الخدمات التالية من منصتكم:\n`;
    message += `👤 *الاسم:* ${orderDetails.customerName}\n`;
    message += `📱 *الجوال:* ${orderDetails.customerPhone}\n\n`;
    
    message += `📦 *الخدمات المطلوبة:*\n`;
    orderDetails.items.forEach((item, index) => {
      const name = item.product.nameAr || item.product.name;
      message += `- *${name}* (الكمية: ${item.quantity})\n`;
      
      // Add custom questions if filled
      Object.entries(item.selectedFields).forEach(([label, value]) => {
        if (value && value.trim()) {
          message += `  • ${label}: ${value.trim()}\n`;
        }
      });
    });

    if (orderDetails.generalNotes && orderDetails.generalNotes.trim()) {
      message += `\n✍️ *ملاحظات إضافية:* ${orderDetails.generalNotes}\n`;
    }
    
    const hasDynamicPrice = orderDetails.items.some(item => item.product.priceText);
    message += `\n💵 *السعر الإجمالي:* *${orderDetails.totalPrice} ريال سعودي*`;
    if (hasDynamicPrice) {
      message += ` (يتحدد السعر النهائي بالواتساب)`;
    }

    return encodeURIComponent(message);
  } else {
    // English template
    let message = `*Hello,*\n\n`;
    message += `I would like to order the following services:\n`;
    message += `👤 *Name:* ${orderDetails.customerName}\n`;
    message += `📱 *Phone:* ${orderDetails.customerPhone}\n\n`;
    
    message += `📦 *Requested Services:*\n`;
    orderDetails.items.forEach((item, index) => {
      const name = item.product.nameEn || item.product.name;
      message += `- *${name}* (Qty: ${item.quantity})\n`;
      
      // Add custom questions if filled
      Object.entries(item.selectedFields).forEach(([label, value]) => {
        if (value && value.trim()) {
          message += `  • ${label}: ${value.trim()}\n`;
        }
      });
    });

    if (orderDetails.generalNotes && orderDetails.generalNotes.trim()) {
      message += `\n✍️ *Notes:* ${orderDetails.generalNotes}\n`;
    }
    
    const hasDynamicPrice = orderDetails.items.some(item => item.product.priceText);
    message += `\n💵 *Total Price:* *${orderDetails.totalPrice} SAR*`;
    if (hasDynamicPrice) {
      message += ` (Subject to custom quote on WhatsApp)`;
    }

    return encodeURIComponent(message);
  }
}

/**
 * Builds the complete WhatsApp link.
 * Number is provided: 0536894854 -> formatted to international code 966536894854
 */
export function getWhatsAppHref(orderDetails: OrderDetails, lang: 'ar' | 'en' = 'ar'): string {
  const phoneNumber = '966536894854';
  const encodedText = buildWhatsAppMessage(orderDetails, lang);
  return `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
}
