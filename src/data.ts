import { Product } from './types';

export const productsList: Product[] = [
  // --- DESIGN SERVICES ---
  {
    id: 'logo-design',
    name: 'تصميم شعار',
    nameAr: 'تصميم شعار',
    nameEn: 'Logo Design',
    type: 'design',
    price: 50,
    description: 'تصميم شعار احترافي ومبتكر لهوية مشروعك.',
    descriptionAr: 'تصميم شعار احترافي ومبتكر لهوية مشروعك.',
    descriptionEn: 'Professional and creative logo design for your brand.',
    icon: 'Palette',
    features: [
      'تصميم شعار عصري وبخيارات متعددة',
      'تعديلات غير محدودة حتى الرضا الكامل',
      'تسليم الملفات المصدرية المفتوحة بالكامل'
    ],
    featuresAr: [
      'تصميم شعار عصري وبخيارات متعددة',
      'تعديلات غير محدودة حتى الرضا الكامل',
      'تسليم الملفات المصدرية المفتوحة بالكامل'
    ],
    featuresEn: [
      'Modern logo concepts and design variations',
      'Unlimited revisions until perfect satisfaction',
      'Delivery of standard industrial source files'
    ],
    customFields: [
      {
        label: 'اسم الشعار / النص المطلوب كتابته',
        labelAr: 'اسم الشعار / النص المطلوب كتابته',
        labelEn: 'Logo Name / Custom Text',
        placeholder: 'اكتب الاسم باللغة العربية أو الإنجليزية بدقة...',
        placeholderAr: 'اكتب الاسم باللغة العربية أو الإنجليزية بدقة...',
        placeholderEn: 'Type name in Arabic or English precisely...',
        type: 'text'
      },
      {
        label: 'ملاحظات وتفاصيل الفكرة والألوان المفضلة',
        labelAr: 'ملاحظات وتفاصيل الفكرة والألوان المفضلة',
        labelEn: 'Notes & Color Preferences',
        placeholder: 'ألوان هادئة، فكرة معينة...',
        placeholderAr: 'ألوان هادئة، فكرة معينة...',
        placeholderEn: 'Color themes, custom elements, style...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'profile-design',
    name: 'تصميم بروفايل شركة',
    nameAr: 'تصميم بروفايل شركة',
    nameEn: 'Company Profile',
    type: 'design',
    price: 100,
    description: 'تصميم بروفايل تعريفي متكامل يعرض خدماتك بأناقة.',
    descriptionAr: 'تصميم بروفايل تعريفي متكامل يعرض خدماتك بأناقة.',
    descriptionEn: 'Elegant corporate presentation profile showcasing your services.',
    icon: 'Briefcase',
    features: [
      'تصميم عصري وجذاب متوافق مع الهوية',
      'صياغة احترافية وترتيب رائع للنصوص',
      'تسليم ملف PDF تفاعلي بجودة فائقة'
    ],
    featuresAr: [
      'تصميم عصري وجذاب متوافق مع الهوية',
      'صياغة احترافية وترتيب رائع للنصوص',
      'تسليم ملف PDF تفاعلي بجودة فائقة'
    ],
    featuresEn: [
      'Modern layouts corresponding with company colors',
      'Engaging copywriting and structured navigation',
      'Delivery of highly polished PDF ready for WhatsApp'
    ],
    customFields: [
      {
        label: 'اسم الشركة والنشاط العام',
        labelAr: 'اسم الشركة والنشاط العام',
        labelEn: 'Company Name & Industry',
        placeholder: 'مثال: شركة نمو العقارية...',
        placeholderAr: 'مثال: شركة نمو العقارية...',
        placeholderEn: 'Example: growth real estate company...',
        type: 'text'
      },
      {
        label: 'محتويات البروفايل والأقسام',
        labelAr: 'محتويات البروفايل والأقسام',
        labelEn: 'Profile Context & Sections',
        placeholder: 'اكتب الرؤية والخدمات المراد صياغتها...',
        placeholderAr: 'اكتب الرؤية والخدمات المراد صياغتها...',
        placeholderEn: 'Describe vision, mission and services...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'invitation-design',
    name: 'تصميم دعوات',
    nameAr: 'تصميم دعوات',
    nameEn: 'Invitations',
    type: 'design',
    price: 25,
    description: 'تصميم كروت ودعوات المناسبات العصرية والأنيقة.',
    descriptionAr: 'تصميم كروت ودعوات المناسبات العصرية والأنيقة.',
    descriptionEn: 'Contemporary electronic and printed cards for all events.',
    icon: 'Mail',
    features: [
      'أفكار إبداعية حصرية لكل عميل',
      'ألوان متألقة ودقة جاهزة للطباعة',
      'تسليم سريع خلال ساعات معدودة'
    ],
    featuresAr: [
      'أفكار إبداعية حصرية لكل عميل',
      'ألوان متألقة ودقة جاهزة للطباعة',
      'تسليم سريع خلال ساعات معدودة'
    ],
    featuresEn: [
      'Bespoke visual ideas tailored just for you',
      'Luminous colors ready for direct print or sharing',
      'Delivery in less than 24 hours'
    ],
    customFields: [
      {
        label: 'محتوى وتفاصيل الدعوة والمناسبة',
        labelAr: 'محتوى وتفاصيل الدعوة والمناسبة',
        labelEn: 'Invitation & Event Details',
        placeholder: 'تفاصيل الزمان والمكان المطلوب كتابتهم...',
        placeholderAr: 'تفاصيل الزمان والمكان المطلوب كتابتهم...',
        placeholderEn: 'Specify event type, time, and address...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'card-design',
    name: 'تصميم كرت',
    nameAr: 'تصميم كرت',
    nameEn: 'Business Card',
    type: 'design',
    price: 25,
    description: 'تصميم بطاقة أعمال شخصية فريدة بوجهين جاهزة للطباعة.',
    descriptionAr: 'تصميم بطاقة أعمال شخصية فريدة بوجهين جاهزة للطباعة.',
    descriptionEn: 'Unique, high-quality double-sided personal business card.',
    icon: 'CreditCard',
    features: [
      'تصميم احترافي ثنائي الوجه وعصري',
      'تنظيم رائع للبيانات ورمز QR',
      'صيغ جاهزة للطباعة الفورية مباشرة'
    ],
    featuresAr: [
      'تصميم احترافي ثنائي الوجه وعصري',
      'تنظيم رائع للبيانات ورمز QR',
      'صيغ جاهزة للطباعة الفورية مباشرة'
    ],
    featuresEn: [
      'Professional twin-sided contemporary style',
      'Excellent details placement including custom QR code',
      'Includes original print-ready vector file'
    ],
    customFields: [
      {
        label: 'البيانات الشخصية على الكرت',
        labelAr: 'البيانات الشخصية على الكرت',
        labelEn: 'Contact Details on Card',
        placeholder: 'الاسم، الجوال، الإيميل، العنوان...',
        placeholderAr: 'الاسم، الجوال، الإيميل، العنوان...',
        placeholderEn: 'Name, phone, email, address...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'social-design',
    name: 'تصميم صفحات سوشل ميديا',
    nameAr: 'تصميم صفحات سوشل ميديا',
    nameEn: 'Social Media Posts',
    type: 'design',
    price: 50,
    description: 'تصميم أغلفة وبوسترات بمقاسات مثالية لمنصات التواصل.',
    descriptionAr: 'تصميم أغلفة وبوسترات بمقاسات مثالية لمنصات التواصل.',
    descriptionEn: 'Tailored covers, headers and graphic posts for networks.',
    icon: 'Share2',
    features: [
      'مقاسات معتمدة متوافقة مع شاشات الهواتف',
      'هوية بصرية متناسقة لعلامتك بالكامل',
      'تسليم ملفات العمل المفتوحة للتعديل'
    ],
    featuresAr: [
      'مقاسات معتمدة متوافقة مع شاشات الهواتف',
      'هوية بصرية متناسقة لعلامتك بالكامل',
      'تسليم ملفات العمل المفتوحة للتعديل'
    ],
    featuresEn: [
      'Compatible dimensions perfectly styled for mobile displays',
      'Uniform corporate visual stamp online',
      'Source files included for dynamic adjustments'
    ],
    customFields: [
      {
        label: 'المنصات المستهدفة',
        labelAr: 'المنصات المستهدفة',
        labelEn: 'Social Media Platforms',
        placeholder: 'تويتر، سناب، إنستقرام...',
        placeholderAr: 'تويتر، سناب، إنستقرام...',
        placeholderEn: 'X (Twitter), Instagram, Snapchat, TikTok...',
        type: 'text'
      },
      {
        label: 'النصوص والشعار المطلوب إضافتهم',
        labelAr: 'النصوص والشعار المطلوب إضافتهم',
        labelEn: 'Text & Assets to Display',
        placeholder: 'اكتب العبارات التسويقية والألوان المفضلة...',
        placeholderAr: 'اكتب العبارات التسويقية والألوان المفضلة...',
        placeholderEn: 'Marketing copy, logo files, preferred accents...',
        type: 'textarea'
      }
    ]
  },

  // --- PROGRAMMING SERVICES ---
  {
    id: 'static-web',
    name: 'برمجة موقع للعرض فقط',
    nameAr: 'برمجة موقع للعرض فقط',
    nameEn: 'Static Showcase Website',
    type: 'programming',
    price: 200,
    description: 'موقع ويب متجاوب لتعريف خدماتك مع ربط فوري بالواتساب.',
    descriptionAr: 'موقع ويب متجاوب لتعريف خدماتك مع ربط فوري بالواتساب.',
    descriptionEn: 'Responsive single-page showcase optimized to highlight services.',
    icon: 'Globe',
    features: [
      'برمجة سريعة خفيفة متجاوبة بالكامل',
      'روابط التواصل الاجتماعي وربط واتساب فوري',
      'الحصول على السورس كود الكامل للمشروع'
    ],
    featuresAr: [
      'برمجة سريعة خفيفة متجاوبة بالكامل',
      'روابط التواصل الاجتماعي وربط واتساب فوري',
      'الحصول على السورس كود الكامل للمشروع'
    ],
    featuresEn: [
      'Fast responsive frameworks customized for cellphones',
      'Social links integration and one-tap WhatsApp contact',
      'Fully standalone complete code transfer'
    ],
    customFields: [
      {
        label: 'رؤية وأقسام الموقع المفضلة',
        labelAr: 'رؤية وأقسام الموقع المفضلة',
        labelEn: 'Website Vision & Sections',
        placeholder: 'من نحن، خدماتنا، أهدافنا، ألوان مفضلة...',
        placeholderAr: 'من نحن، خدماتنا، أهدافنا، ألوان مفضلة...',
        placeholderEn: 'About us, services, goals, colors...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'dynamic-web',
    name: 'برمجة موقع مع سيرفر',
    nameAr: 'برمجة موقع مع سيرفر',
    nameEn: 'Full-Stack Dynamic Web App',
    type: 'programming',
    price: 0,
    priceText: 'السعر يتحدد واتس',
    priceTextAr: 'السعر يتحدد واتس',
    priceTextEn: 'Price Custom via WhatsApp',
    description: 'موقع ديناميكي متكامل يحتوي على لوحة تحكم وقاعدة بيانات آمنة.',
    descriptionAr: 'موقع ديناميكي متكامل يحتوي على لوحة تحكم وقاعدة بيانات آمنة.',
    descriptionEn: 'Dynamic database app with control dashboard and custom servers.',
    icon: 'Database',
    features: [
      'ربط بقاعدة بيانات آمنة وسيرفر مخصص',
      'لوحة تحكم (Dashboard) مرنة للمشرفين',
      'حماية فائقة وتهيئة تامة لمعايير الأمان'
    ],
    featuresAr: [
      'ربط بقاعدة بيانات آمنة وسيرفر مخصص',
      'لوحة تحكم (Dashboard) مرنة للمشرفين',
      'حماية فائقة وتهيئة تامة لمعايير الأمان'
    ],
    featuresEn: [
      'Secure backend databases and custom host infrastructure',
      'Intuitive admin dashboard to oversee inputs instantly',
      'Top speed, enhanced cybersecurity, and SEO configs'
    ],
    customFields: [
      {
        label: 'تفاصيل النظام وفكرته ومتطلباته',
        labelAr: 'تفاصيل النظام وفكرته ومتطلباته',
        labelEn: 'App Logic & Database Details',
        placeholder: 'نظام حجز مواعيد، متجر مخصص، تسجيل مستخدمين...',
        placeholderAr: 'نظام حجز مواعيد، متجر مخصص، تسجيل مستخدمين...',
        placeholderEn: 'Booking engine, user logins, e-commerce flow, invoicing...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'publish-play',
    name: 'نشر الموقع على قوقل بلاي',
    nameAr: 'نشر الموقع على قوقل بلاي',
    nameEn: 'Publish on Google Play',
    type: 'programming',
    price: 150,
    description: 'تحويل وتجهيز ونشر موقعك على متجر Google Play.',
    descriptionAr: 'تحويل وتجهيز ونشر موقعك على متجر Google Play.',
    descriptionEn: 'Pack and upload your showcase platform directly onto Play Store.',
    icon: 'AppWindow',
    features: [
      'تحويل الموقع لملف APK / AAB مجهز كلياً',
      'توفير الإشعارات والوضع الداكن بالتطبيق',
      'تجاوز المراجعة والتسجيل بقوقل كونسول'
    ],
    featuresAr: [
      'تحويل الموقع لملف APK / AAB مجهز كلياً',
      'توفير الإشعارات والوضع الداكن بالتطبيق',
      'تجاوز المراجعة والتسجيل بقوقل كونسول'
    ],
    featuresEn: [
      'Export website cleanly to APK / AAB formats',
      'Native-look wrapping, app notifications and dark theme support',
      'Resolve Play Console criteria and pass reviews'
    ],
    customFields: [
      {
        label: 'رابط الموقع أو فكرة التطبيق للرفع',
        labelAr: 'رابط الموقع أو فكرة التطبيق للرفع',
        labelEn: 'Website Link / App Details',
        placeholder: 'رابط الموقع المراد تحويله للتطبيق...',
        placeholderAr: 'رابط الموقع المراد تحويله للتطبيق...',
        placeholderEn: 'URL to convert or main idea of the application...',
        type: 'text'
      }
    ]
  },
  {
    id: 'publish-web',
    name: 'نشر الموقع على الويب',
    nameAr: 'نشر الموقع على الويب',
    nameEn: 'Host Website on Web',
    type: 'programming',
    price: 100,
    description: 'حجز الاستضافة والدومين الخاص بك ليكون متاحاً وسريعاً.',
    descriptionAr: 'حجز الاستضافة والدومين الخاص بك ليكون متاحاً وسريعاً.',
    descriptionEn: 'Buy custom domain, rapid cloud hosting, with secure SSL certificate.',
    icon: 'Globe2',
    features: [
      'شراء وربط النطاق/الدومين مخصص لقناتك',
      'حجز استضافة سريعة مشفرة بالكامل SSL',
      'تهيئة سرعة التصفح لضمان عدم تأخر الموقع'
    ],
    featuresAr: [
      'شراء وربط النطاق/الدومين مخصص لقناتك',
      'حجز استضافة سريعة مشفرة بالكامل SSL',
      'تهيئة سرعة التصفح لضمان عدم تأخر الموقع'
    ],
    featuresEn: [
      'Acquisition and secure binding of custom extension domains',
      'Fast Cloud hosting with comprehensive SSL encryption setup',
      'Speed optimization addressing Middle East visitors'
    ],
    customFields: [
      {
        label: 'الدومين المفضل المقترح للمشروع',
        labelAr: 'الدومين المفضل المقترح للمشروع',
        labelEn: 'Preferred Domain Name Suggestion',
        placeholder: 'example.com أو sa. لتأكيد الدومين...',
        placeholderAr: 'example.com أو sa. لتأكيد الدومين...',
        placeholderEn: 'Type name like companyname.com or domain.sa...',
        type: 'text'
      }
    ]
  },
  {
    id: 'seo-google',
    name: 'نشر الموقع ببحث قوقل',
    nameAr: 'نشر الموقع ببحث قوقل',
    nameEn: 'SEO Search Console Setup',
    type: 'programming',
    price: 100,
    description: 'تسجيل وأرشفة الموقع بقوقل للظهور بصدارة محرك البحث.',
    descriptionAr: 'تسجيل وأرشفة الموقع بقوقل للظهور بصدارة محرك البحث.',
    descriptionEn: 'Google Search Console registration with keyword optimization.',
    icon: 'Search',
    features: [
      'تقديم ملفات sitemap.xml لفهرسة جوجل',
      'ضبط الكلمات والوسومات المفتاحية SEO',
      'تسريع الأرشفة اليدوية لضمان ظهور سريع'
    ],
    featuresAr: [
      'تقديم ملفات sitemap.xml لفهرسة جوجل',
      'ضبط الكلمات والوسومات المفتاحية SEO',
      'تسريع الأرشفة اليدوية لضمان ظهور سريع'
    ],
    featuresEn: [
      'Submit sitemap.xml directly to Google robots',
      'Embed rich Meta description keywords on elements',
      'Trigger manual rapid indexations for swift results'
    ],
    customFields: [
      {
        label: 'الاسم الكلمات المفتاحية المستهدفة',
        labelAr: 'الاسم الكلمات المفتاحية المستهدفة',
        labelEn: 'Target Keywords for SEO',
        placeholder: 'كلمات يرغب بظهور موقعك في جوجل بها...',
        placeholderAr: 'كلمات يرغب بظهور موقعك في جوجل بها...',
        placeholderEn: 'Words you want your business to rank for...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'add-custom-domain',
    name: 'إضافة دومين مخصص',
    nameAr: 'إضافة دومين مخصص',
    nameEn: 'Add Custom Domain',
    type: 'programming',
    price: 50,
    description: 'ربط دومين مخصص احترافي بمشروعك (مثال: .com أو .sa) لتعزيز موثوقية علامتك.',
    descriptionAr: 'ربط دومين مخصص احترافي بمشروعك (مثال: .com أو .sa) لتعزيز موثوقية علامتك.',
    descriptionEn: 'Bind a professional custom domain to your project (example: .com or .sa) to increase brand equity.',
    icon: 'Globe',
    features: [
      'ربط الدومين المخصص بالموقع أو المتجر بشكل فوري وسليم',
      'توفير شهادة الأمان والحماية SSL المشفرة مجاناً',
      'توجيه النطاقات وحل مشاكل الـ DNS للمشروع'
    ],
    featuresAr: [
      'ربط الدومين المخصص بالموقع أو المتجر بشكل فوري وسليم',
      'توفير شهادة الأمان والحماية SSL المشفرة مجاناً',
      'توجيه النطاقات وحل مشاكل الـ DNS للمشروع'
    ],
    featuresEn: [
      'Instant precise setup of custom domains with your web app',
      'Complimentary provisioning of secure HTTPS/SSL details',
      'Handle comprehensive DNS and modern route configurations'
    ],
    customFields: [
      {
        label: 'اسم الدومين المراد ربطه',
        labelAr: 'اسم الدومين المراد ربطه',
        labelEn: 'Domain Name to Connect',
        placeholder: 'مثال: mybrand.com...',
        placeholderAr: 'مثال: mybrand.com...',
        placeholderEn: 'Example: mybrand.com...',
        type: 'text'
      }
    ]
  },

  // --- BUNDLES / PACKAGES ---
  {
    id: 'package-corporate',
    name: 'باقة الشركات (شعار + موقع + بروفايل)',
    nameAr: 'باقة الشركات (شعار + موقع + بروفايل)',
    nameEn: 'Corporate Business Package',
    type: 'programming',
    price: 300,
    isPackage: true,
    description: 'الحل الشامل للتأسيس: نصمم الشعار والبروفايل مع برمجة موقع متميز.',
    descriptionAr: 'الحل الشامل للتأسيس: نصمم الشعار والبروفايل مع برمجة موقع متميز.',
    descriptionEn: 'Start cleanly: custom design logo and profile, with showcase website.',
    icon: 'Building2',
    features: [
      'شعار ابتكاري غني بخيارات وتناسق',
      'بروفايل تعريفي فخم بملف تفاعلي متميز',
      'موقع إلكتروني ذكي وسريع مترافق بالجاذبية'
    ],
    featuresAr: [
      'شعار ابتكاري غني بخيارات وتناسق',
      'بروفايل تعريفي فخم بملف تفاعلي متميز',
      'موقع إلكتروني ذكي وسريع مترافق بالجاذبية'
    ],
    featuresEn: [
      'Unique logo concepts styled masterfully',
      'Luxury PDF presentation profile ready to share',
      'Responsive, lightning-fast static presentation website'
    ],
    customFields: [
      {
        label: 'اسم الشركة والنشاط والمتطلبات الخاصة بك',
        labelAr: 'اسم الشركة والنشاط والمتطلبات الخاصة بك',
        labelEn: 'Company Identity & Brief Requirements',
        placeholder: 'اكتب اسم مشروعك وتفاصيله المبدئية...',
        placeholderAr: 'اكتب اسم مشروعك وتفاصيله المبدئية...',
        placeholderEn: 'Provide name, business sector and general preferences...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'package-logos-web',
    name: 'باقة ٢ شعار وموقع',
    nameAr: 'باقة ٢ شعار وموقع',
    nameEn: 'Dual Logo & Website Package',
    type: 'programming',
    price: 200,
    isPackage: true,
    description: 'باقة ممتازة: نموذج شعار بخيارين رائعين مع برمجة موقع ويب سريع.',
    descriptionAr: 'باقة ممتازة: نموذج شعار بخيارين رائعين مع برمجة موقع ويب سريع.',
    descriptionEn: 'Dual corporate logo mockups alongside a swift responsive showcase website.',
    icon: 'Layers',
    features: [
      'تقديم نموذجين مختلفين لشعارك',
      'برمجة موقع ويب تعريفي سريع ومنظم',
      'تسليم الملفات المصدرية المفتوحة بالكامل'
    ],
    featuresAr: [
      'تقديم نموذجين مختلفين لشعارك',
      'برمجة موقع ويب تعريفي سريع ومنظم',
      'تسليم الملفات المصدرية المفتوحة بالكامل'
    ],
    featuresEn: [
      'Two different distinct creative logo concepts',
      'Speedy presentation website custom programmed',
      'Source files transfer for designs and codes'
    ],
    customFields: [
      {
        label: 'الأفكار والمسميات وباقي التفاصيل المطلوبة',
        labelAr: 'الأفكار والمسميات وباقي التفاصيل المطلوبة',
        labelEn: 'Detailed Ideas & Naming Specifications',
        placeholder: 'اسم الشعار المفضل، تفاصيل الموقع والنشاط...',
        placeholderAr: 'اسم الشعار المفضل، تفاصيل الموقع والنشاط...',
        placeholderEn: 'Specify logo names and website pages priorities...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'package-web-profile',
    name: 'باقة موقع إلكتروني وبروفايل',
    nameAr: 'باقة موقع إلكتروني وبروفايل',
    nameEn: 'Showcase Web & Company Profile Package',
    type: 'programming',
    price: 250,
    isPackage: true,
    description: 'تصميم بروفايل شركة تسويقي متكامل مع برمجة موقع ويب فائق الأداء.',
    descriptionAr: 'تصميم بروفايل شركة تسويقي متكامل مع برمجة موقع ويب فائق الأداء.',
    descriptionEn: 'High-performance website development with premium company profile brochure.',
    icon: 'Briefcase',
    features: [
      'موقع ويب متطور وجذاب متجاوب بالهواتف',
      'بروفايل شركة تسويقي مفصل ومقنع للعملاء',
      'دعم وصيانة مجانية لمدة شهر كامل كهدية'
    ],
    featuresAr: [
      'موقع ويب متطور وجذاب متجاوب بالهواتف',
      'بروفايل شركة تسويقي مفصل ومقنع للعملاء',
      'دعم وصيانة مجانية لمدة شهر كامل كهدية'
    ],
    featuresEn: [
      'Advanced presentation website responsive on screen bounds',
      'Highly persuasive corporate brochure driving decisions',
      'One-month of complimentary code maintenance included'
    ],
    customFields: [
      {
        label: 'محتويات وبروفايل والشركة والألوان المقترحة',
        labelAr: 'محتويات وبروفايل والشركة والألوان المقترحة',
        labelEn: 'Corporate Details & Style Guideline',
        placeholder: 'اكتب الأقسام المفضلة والتفاصيل لتبويب العرض...',
        placeholderAr: 'اكتب الأقسام المفضلة والتفاصيل لتبويب العرض...',
        placeholderEn: 'Define sections list and visual requirements...',
        type: 'textarea'
      }
    ]
  },
  {
    id: 'package-premium',
    name: 'باقة بريميوم (٣ تصاميم + موقع + نشر بالبحث)',
    nameAr: 'باقة بريميوم (٣ تصاميم + موقع + نشر بالبحث)',
    nameEn: 'Premium Trio, Web & SEO Super Package',
    type: 'programming',
    price: 550,
    isPackage: true,
    description: 'الباقة الكبرى والأقوى للسيطرة والانتشار: ٣ تصاميم، موقع الكتروني، وأرشفة محركات بحث.',
    descriptionAr: 'الباقة الكبرى والأقوى للسيطرة والانتشار: ٣ تصاميم، موقع الكتروني، وأرشفة محركات بحث.',
    descriptionEn: 'Maximize online reach: 3 custom designs, showcase website, Google indexing.',
    icon: 'Award',
    features: [
      'ثلاثة تصاميم إبداعية مخصصة بالكامل تختارها',
      'برمجة موقع ويب عصري جداً وقوي الأداء',
      'أرشفة كاملة وضبط التهيئة للتصدر بقوقل'
    ],
    featuresAr: [
      'ثلاثة تصاميم إبداعية مخصصة بالكامل تختارها',
      'برمجة موقع ويب عصري جداً وقوي الأداء',
      'أرشفة كاملة وضبط التهيئة للتصدر بقوقل'
    ],
    featuresEn: [
      '3 exquisite customized graphic arts of your preference',
      'Cutting-edge showcase website coded with excellence',
      'Full SEO Search Console setup and index acceleration'
    ],
    customFields: [
      {
        label: 'الأقسام والتصاميم المحددة المطلوبة لديك',
        labelAr: 'الأقسام والتصاميم المحددة المطلوبة لديك',
        labelEn: 'Chosen 3 Design Items & Web Guidlines',
        placeholder: 'مثل: كرت، سوشل ميديا، شعار، وتفاصيل الأرشفة والويب...',
        placeholderAr: 'مثل: كرت، سوشل ميديا، شعار، وتفاصيل الأرشفة والويب...',
        placeholderEn: 'Specify designs selected (logo, cards, posts) & web themes...',
        type: 'textarea'
      }
    ]
  }
];
