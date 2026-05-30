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
  const divider = '━━━━━━━━━━━━━━━━━━━━━';

  if (isAr) {
    let message = `🌐 *منصة إرتقاء الرقمية* 🌐\n`;
    message += `*مرحباً بكم، أود تأكيد طلبي لبدء العمل المباشر* ✨\n\n`;
    message += `${divider}\n`;
    message += `📝 *تفاصيل العميل والطلب:* \n`;
    message += `${divider}\n`;
    message += `🆔 *رقم الطلب:* \`${orderDetails.orderNumber}\`\n`;
    message += `👤 *اسم العميل:* ${orderDetails.customerName}\n`;
    message += `📱 *جوال التواصل:* ${orderDetails.customerPhone}\n`;
    message += `📅 *تاريخ الطلب:* ${orderDetails.orderDate}\n\n`;
    
    message += `${divider}\n`;
    message += `📦 *الخدمات والمنتجات المطلوبة:* \n`;
    message += `${divider}\n`;
    
    orderDetails.items.forEach((item, index) => {
      const name = item.product.nameAr || item.product.name;
      const basePrice = item.product.priceTextAr || item.product.priceText || `${item.product.price} ريال`;
      message += `*${index + 1}. الخدمة: ${name}* (الكمية: ${item.quantity})\n`;
      message += `  • السعر الأساسي: ${basePrice}\n`;
      
      // Add custom questions if filled
      const customFieldEntries = Object.entries(item.selectedFields);
      if (customFieldEntries.length > 0) {
        customFieldEntries.forEach(([label, value]) => {
          if (value && value.trim()) {
            message += `  • *${label}:* _${value.trim()}_\n`;
          }
        });
      }
      message += `\n`;
    });

    if (orderDetails.generalNotes && orderDetails.generalNotes.trim()) {
      message += `${divider}\n`;
      message += `✍️ *ملاحظات إضافية:* \n`;
      message += `${orderDetails.generalNotes}\n\n`;
    }
    
    message += `${divider}\n`;
    message += `💰 *الخلاصة المالية والمحاسبية:* \n`;
    message += `${divider}\n`;
    message += `💵 *المجموع الفرعي:* ${orderDetails.totalPrice} ريال سعودي\n`;

    if (orderDetails.couponApplied) {
      const disc = orderDetails.discountAmount || 0;
      const finalPrice = orderDetails.finalPriceAfterDiscount ?? (orderDetails.totalPrice - disc);
      message += `🏷️ *كود الخصم المطبق:* \`${orderDetails.couponApplied}\` (خصم 5%)\n`;
      message += `📉 *قيمة الخصم المستقطعة:* -${disc} ريال سعودي\n`;
      message += `⭐ *صافي المبلغ النهائي المطلوب:* *${finalPrice} ريال سعودي*\n`;
    } else {
      message += `⭐ *صافي المبلغ النهائي المطلوب:* *${orderDetails.totalPrice} ريال سعودي*\n`;
    }

    const hasDynamicPrice = orderDetails.items.some(item => item.product.priceText);
    if (hasDynamicPrice) {
      message += `⚠️ _تنبيه: يتضمن الطلب خدمات يتحدد سعرها الدقيق عبر الوتس اب_\n`;
    }
    
    message += `\n✨ *يرجى مراجعة طلبي وإفادتي بمدة العمل والخطوات المتبقية لاعتماده وتأكيده وشكراً لكم!*`;

    return encodeURIComponent(message);
  } else {
    // English template
    let message = `🌐 *Irteqa Digital Platform* 🌐\n`;
    message += `*Hello, I would like to submit my order below:* ✨\n\n`;
    message += `${divider}\n`;
    message += `📝 *Client & Order Details:* \n`;
    message += `${divider}\n`;
    message += `🆔 *Order ID:* \`${orderDetails.orderNumber}\`\n`;
    message += `👤 *Customer Name:* ${orderDetails.customerName}\n`;
    message += `📱 *Primary Phone:* ${orderDetails.customerPhone}\n`;
    message += `📅 *Order Date:* ${orderDetails.orderDate}\n\n`;
    
    message += `${divider}\n`;
    message += `📦 *Requested Services:* \n`;
    message += `${divider}\n`;
    
    orderDetails.items.forEach((item, index) => {
      const name = item.product.nameEn || item.product.name;
      const basePrice = item.product.priceTextEn || item.product.priceText || `${item.product.price} SAR`;
      message += `*${index + 1}. ${name}* (Qty: ${item.quantity})\n`;
      message += `  • Price: ${basePrice}\n`;
      
      const customFieldEntries = Object.entries(item.selectedFields);
      if (customFieldEntries.length > 0) {
        customFieldEntries.forEach(([label, value]) => {
          if (value && value.trim()) {
            message += `  • *${label}:* _${value.trim()}_\n`;
          }
        });
      }
      message += `\n`;
    });

    if (orderDetails.generalNotes && orderDetails.generalNotes.trim()) {
      message += `${divider}\n`;
      message += `✍ *Notes:* \n`;
      message += `${orderDetails.generalNotes}\n\n`;
    }
    
    message += `${divider}\n`;
    message += `💰 *Pricing Summary:* \n`;
    message += `${divider}\n`;
    message += `💵 *Subtotal:* ${orderDetails.totalPrice} SAR\n`;

    if (orderDetails.couponApplied) {
      const disc = orderDetails.discountAmount || 0;
      const finalPrice = orderDetails.finalPriceAfterDiscount ?? (orderDetails.totalPrice - disc);
      message += `🏷️ *Applied Coupon:* \`${orderDetails.couponApplied}\` (5% Off)\n`;
      message += `📉 *Discount value:* -${disc} SAR\n`;
      message += `⭐ *Net Total Price:* *${finalPrice} SAR*\n`;
    } else {
      message += `⭐ *Net Total Price:* *${orderDetails.totalPrice} SAR*\n`;
    }

    const hasDynamicPrice = orderDetails.items.some(item => item.product.priceText);
    if (hasDynamicPrice) {
      message += `⚠️ _Note: Some customized quote requests require pending evaluation via chat_\n`;
    }
    
    message += `\n✨ *Please review my request and guide me on the next steps to start working. Thank you!*`;

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
