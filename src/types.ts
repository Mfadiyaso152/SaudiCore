export type ServiceType = 'design' | 'programming';

export interface ProductOption {
  label: string;
  priceModifier: number;
}

export interface CustomField {
  label: string;
  labelAr?: string;
  labelEn?: string;
  placeholder: string;
  placeholderAr?: string;
  placeholderEn?: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  optionsEn?: string[];
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  nameEn?: string;
  type: ServiceType;
  price: number;
  priceText?: string;
  priceTextAr?: string;
  priceTextEn?: string;
  isPackage?: boolean;
  description: string;
  descriptionAr?: string;
  descriptionEn?: string;
  icon: string;
  features: string[];
  featuresAr?: string[];
  featuresEn?: string[];
  customFields?: CustomField[];
}

export interface CartItem {
  id: string; // unique cart item id (product.id + timestamp/hash if configured with options)
  product: Product;
  quantity: number;
  customRequirements: string;
  selectedFields: Record<string, string>;
  finalPrice: number;
}

export interface OrderDetails {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  totalPrice: number;
  generalNotes?: string;
  orderDate: string;
}
