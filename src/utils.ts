import { OrderDetails } from './types';

/**
 * Generates a unique, professional order number.
 * Pattern: or-XXXX where XXXX is a 4-digit random number.
 */
export function generateOrderNumber(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit random number
  return `or-${randomNum}`;
}

/**
 * Encodes the order details into an elegant, highly structured message for WhatsApp.
 */
export function buildWhatsAppMessage(orderDetails: OrderDetails, lang: 'ar' | 'en' = 'ar'): string {
  const isAr = lang === 'ar';

  if (isAr) {
    let message = `السلام عليكم\n`;
    message += `الطلب رقم : ${orderDetails.orderNumber}\n`;
    message += `الخدمات:\n`;
    
    orderDetails.items.forEach((item) => {
      const name = item.product.nameAr || item.product.name;
      message += `- ${name}\n`;
      
      // Add custom questions answers if filled
      const customFieldEntries = Object.entries(item.selectedFields);
      if (customFieldEntries.length > 0) {
        customFieldEntries.forEach(([label, value]) => {
          if (value && value.trim()) {
            message += `  * ${label}: ${value.trim()}\n`;
          }
        });
      }
    });

    if (orderDetails.generalNotes && orderDetails.generalNotes.trim()) {
      message += `ملاحظات: ${orderDetails.generalNotes}\n`;
    }

    const finalPrice = orderDetails.finalPriceAfterDiscount !== undefined 
      ? orderDetails.finalPriceAfterDiscount 
      : orderDetails.totalPrice;

    message += `السعر النهائي ${finalPrice} ريال`;

    return encodeURIComponent(message);
  } else {
    // English template in similar minimal structure
    let message = `Hello\n`;
    message += `Order Number : ${orderDetails.orderNumber}\n`;
    message += `Services:\n`;
    
    orderDetails.items.forEach((item) => {
      const name = item.product.nameEn || item.product.name;
      message += `- ${name}\n`;
      
      const customFieldEntries = Object.entries(item.selectedFields);
      if (customFieldEntries.length > 0) {
        customFieldEntries.forEach(([label, value]) => {
          if (value && value.trim()) {
            message += `  * ${label}: ${value.trim()}\n`;
          }
        });
      }
    });

    if (orderDetails.generalNotes && orderDetails.generalNotes.trim()) {
      message += `Notes: ${orderDetails.generalNotes}\n`;
    }

    const finalPrice = orderDetails.finalPriceAfterDiscount !== undefined 
      ? orderDetails.finalPriceAfterDiscount 
      : orderDetails.totalPrice;

    message += `Final Price ${finalPrice} SAR`;

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
