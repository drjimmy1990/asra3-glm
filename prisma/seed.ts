import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  console.log('🧹 Clearing existing data...');
  await db.service.deleteMany();
  await db.project.deleteMany();
  await db.testimonial.deleteMany();
  await db.fAQ.deleteMany();
  await db.siteSetting.deleteMany();

  // ═══════════════════════════════════════════════
  // SITE SETTINGS
  // ═══════════════════════════════════════════════
  console.log('⚙️  Seeding site settings...');
  const settings = [
    { key: 'site_name', value: 'asra3.com' },
    { key: 'site_tagline', value: 'AI Automation & SaaS Solutions' },
    { key: 'site_tagline_ar', value: 'حلول الأتمتة الذكية و SaaS' },
    { key: 'hero_title', value: 'I Build AI-Powered Bots, SaaS Products & Automation Systems' },
    { key: 'hero_title_ar', value: 'أبني بوتات ذكية، منتجات SaaS و أنظمة أتمتة متكاملة' },
    { key: 'hero_subtitle', value: 'From intelligent chatbots on WhatsApp, Facebook & Instagram to full-scale SaaS platforms and workflow automation — I help businesses automate operations, boost sales, and scale faster with AI-driven solutions.' },
    { key: 'hero_subtitle_ar', value: 'من بوتات الذكاء الاصطناعي على واتساب وفيسبوك وإنستجرام إلى منصات SaaS كاملة وأنظمة أتمتة — أساعد الشركات في أتمتة عملياتها وزيادة المبيعات والتوسع بشكل أسرع بحلول مدعومة بالذكاء الاصطناعي.' },
    { key: 'hero_stat_1_value', value: '50+' },
    { key: 'hero_stat_1_label', value: 'Projects Delivered' },
    { key: 'hero_stat_1_label_ar', value: 'مشروع تم تسليمه' },
    { key: 'hero_stat_2_value', value: '98%' },
    { key: 'hero_stat_2_label', value: 'Client Satisfaction' },
    { key: 'hero_stat_2_label_ar', value: 'رضا العملاء' },
    { key: 'hero_stat_3_value', value: '10x' },
    { key: 'hero_stat_3_label', value: 'Efficiency Boost' },
    { key: 'hero_stat_3_label_ar', value: 'زيادة في الكفاءة' },
    { key: 'hero_stat_4_value', value: '24/7' },
    { key: 'hero_stat_4_label', value: 'Bot Uptime' },
    { key: 'hero_stat_4_label_ar', value: 'عمل البوتات بدون توقف' },
    { key: 'contact_email', value: 'hello@asra3.com' },
    { key: 'admin_password', value: 'admin123' },
  ];

  for (const s of settings) {
    await db.siteSetting.create({ data: s });
  }

  // ═══════════════════════════════════════════════
  // SERVICES
  // ═══════════════════════════════════════════════
  console.log('🛠️  Seeding services...');
  await db.service.createMany({
    data: [
      {
        iconName: 'Bot',
        title: 'AI Chatbots',
        title_en: 'AI Chatbots',
        title_ar: 'بوتات الذكاء الاصطناعي',
        description: 'Smart AI-powered chatbots for WhatsApp, Facebook Messenger & Instagram. Whether it\'s sales automation, customer support, lead generation, or promotional campaigns — I build bots that work 24/7 and convert.',
        description_en: 'Smart AI-powered chatbots for WhatsApp, Facebook Messenger & Instagram. Whether it\'s sales automation, customer support, lead generation, or promotional campaigns — I build bots that work 24/7 and convert.',
        description_ar: 'بوتات ذكاء اصطناعي متقدمة لواتساب وفيسبوك ماسنجر وإنستجرام. سواء للمبيعات أو الدعم الفني أو جمع العملاء المحتملين أو الحملات الدعائية — أبني بوتات تعمل ٢٤/٧ وتحقق نتائج.',
        features: JSON.stringify(['WhatsApp Business API', 'Facebook Messenger', 'Instagram DM Automation', 'AI-Powered Responses', 'Lead Qualification', 'Sales Funnels', 'Multi-language Support', 'Analytics Dashboard']),
        features_en: JSON.stringify(['WhatsApp Business API', 'Facebook Messenger', 'Instagram DM Automation', 'AI-Powered Responses', 'Lead Qualification', 'Sales Funnels', 'Multi-language Support', 'Analytics Dashboard']),
        features_ar: JSON.stringify(['واتساب بيزنس API', 'فيسبوك ماسنجر', 'أتمتة رسائل إنستجرام', 'ردود مدعومة بالذكاء الاصطناعي', 'تأهيل العملاء المحتملين', 'قمع مبيعات', 'دعم متعدد اللغات', 'لوحة تحليلات']),
        order: 1,
        active: true,
      },
      {
        iconName: 'Workflow',
        title: 'Workflow Automation',
        title_en: 'Workflow Automation',
        title_ar: 'أتمتة العمليات',
        description: 'End-to-end workflow automation using n8n and custom integrations. I eliminate repetitive tasks, connect your tools, and build intelligent pipelines that save your team hundreds of hours every month.',
        description_en: 'End-to-end workflow automation using n8n and custom integrations. I eliminate repetitive tasks, connect your tools, and build intelligent pipelines that save your team hundreds of hours every month.',
        description_ar: 'أتمتة شاملة للعمليات باستخدام n8n وتكاملات مخصصة. أزيل المهام المتكررة، أربط أدواتك، وأبني خطوط أنابيب ذكية توفر على فريقك مئات الساعات كل شهر.',
        features: JSON.stringify(['n8n Expert Workflows', 'Custom API Integrations', 'Data Sync & ETL', 'CRM Automation', 'Email & Notification Flows', 'Scheduled Tasks', 'Error Handling & Monitoring', 'Multi-platform Connectivity']),
        features_en: JSON.stringify(['n8n Expert Workflows', 'Custom API Integrations', 'Data Sync & ETL', 'CRM Automation', 'Email & Notification Flows', 'Scheduled Tasks', 'Error Handling & Monitoring', 'Multi-platform Connectivity']),
        features_ar: JSON.stringify(['سيناريوهات n8n احترافية', 'تكاملات API مخصصة', 'مزامنة البيانات و ETL', 'أتمتة CRM', 'إشعارات وتدفقات بريد إلكتروني', 'مهام مجدولة', 'معالجة الأخطاء والمراقبة', 'ربط منصات متعددة']),
        order: 2,
        active: true,
      },
      {
        iconName: 'Code2',
        title: 'SaaS Development',
        title_en: 'SaaS Development',
        title_ar: 'تطوير منصات SaaS',
        description: 'Full-stack SaaS platforms built from scratch — authentication, billing, dashboards, APIs, and more. I\'ve built service platforms, sales systems, booking engines, and custom business tools used by real companies.',
        description_en: 'Full-stack SaaS platforms built from scratch — authentication, billing, dashboards, APIs, and more. I\'ve built service platforms, sales systems, booking engines, and custom business tools used by real companies.',
        description_ar: 'منصات SaaS كاملة من الصفر — مصادقة، فوترة، لوحات تحكم، APIs، والمزيد. بنيت منصات خدمية، أنظمة مبيعات، محركات حجوزات، وأدوات عمل مخصصة تستخدمها شركات حقيقية.',
        features: JSON.stringify(['Full-Stack Development', 'Auth & User Management', 'Payment Integration', 'Admin Dashboards', 'REST & GraphQL APIs', 'Multi-tenant Architecture', 'Real-time Features', 'Production Deployment']),
        features_en: JSON.stringify(['Full-Stack Development', 'Auth & User Management', 'Payment Integration', 'Admin Dashboards', 'REST & GraphQL APIs', 'Multi-tenant Architecture', 'Real-time Features', 'Production Deployment']),
        features_ar: JSON.stringify(['تطوير Full-Stack', 'مصادقة وإدارة مستخدمين', 'تكامل الدفع', 'لوحات تحكم إدارية', 'REST و GraphQL APIs', 'بنية متعددة المستأجرين', 'ميزات الوقت الحقيقي', 'نشر إنتاجي']),
        order: 3,
        active: true,
      },
      {
        iconName: 'Brain',
        title: 'AI Integration & Consulting',
        title_en: 'AI Integration & Consulting',
        title_ar: 'دمج واستشارات الذكاء الاصطناعي',
        description: 'I integrate AI into your existing systems and provide expert consulting on how to leverage AI for your business. From GPT-powered features to custom AI agents — I make AI work for your specific use case.',
        description_en: 'I integrate AI into your existing systems and provide expert consulting on how to leverage AI for your business. From GPT-powered features to custom AI agents — I make AI work for your specific use case.',
        description_ar: 'أدمج الذكاء الاصطناعي في أنظمتك الحالية وأقدم استشارات متخصصة حول كيفية الاستفادة من AI لعملك. من ميزات GPT إلى وكلاء AI مخصصين — أجعل الذكاء الاصطناعي يعمل لصالح حالتك.',
        features: JSON.stringify(['GPT & LLM Integration', 'Custom AI Agents', 'AI Strategy Consulting', 'Prompt Engineering', 'RAG Systems', 'Voice AI Assistants', 'AI-Powered Analytics', 'Model Fine-tuning']),
        features_en: JSON.stringify(['GPT & LLM Integration', 'Custom AI Agents', 'AI Strategy Consulting', 'Prompt Engineering', 'RAG Systems', 'Voice AI Assistants', 'AI-Powered Analytics', 'Model Fine-tuning']),
        features_ar: JSON.stringify(['دمج GPT و LLM', 'وكلاء AI مخصصين', 'استشارات استراتيجية AI', 'هندسة البرومبت', 'أنظمة RAG', 'مساعدين صوتيين AI', 'تحليلات مدعومة بالـ AI', 'ضبط دقيق للنماذج']),
        order: 4,
        active: true,
      },
      {
        iconName: 'LayoutDashboard',
        title: 'Custom Dashboards',
        title_en: 'Custom Dashboards',
        title_ar: 'لوحات تحكم مخصصة',
        description: 'Tailored admin dashboards and business panels for clients who need full control over their operations, orders, analytics, and team management — built exactly around their workflow.',
        description_en: 'Tailored admin dashboards and business panels for clients who need full control over their operations, orders, analytics, and team management — built exactly around their workflow.',
        description_ar: 'لوحات تحكم ولوحات أعمال مخصصة للعملاء الذين يحتاجون تحكم كامل في عملياتهم وطلباتهم وتحليلاتهم وإدارة فريقهم — مبنية بالضبط حول سير عملهم.',
        features: JSON.stringify(['Custom Admin Panels', 'Order Management', 'Real-time Analytics', 'Team & Role Management', 'Data Visualization', 'Export & Reporting', 'Mobile Responsive', 'Multi-language UI']),
        features_en: JSON.stringify(['Custom Admin Panels', 'Order Management', 'Real-time Analytics', 'Team & Role Management', 'Data Visualization', 'Export & Reporting', 'Mobile Responsive', 'Multi-language UI']),
        features_ar: JSON.stringify(['لوحات إدارة مخصصة', 'إدارة الطلبات', 'تحليلات الوقت الحقيقي', 'إدارة الفريق والأدوار', 'تصور البيانات', 'تصدير وتقارير', 'متجاوب مع الموبايل', 'واجهة متعددة اللغات']),
        order: 5,
        active: true,
      },
      {
        iconName: 'Server',
        title: 'Server & Infrastructure',
        title_en: 'Server & Infrastructure',
        title_ar: 'السيرفرات والبنية التحتية',
        description: 'Our team handles complete server setup — VPS configuration, Docker containers, mail servers, n8n hosting, SSL, and any infrastructure you need. We set up everything so you can focus on your business.',
        description_en: 'Our team handles complete server setup — VPS configuration, Docker containers, mail servers, n8n hosting, SSL, and any infrastructure you need. We set up everything so you can focus on your business.',
        description_ar: 'فريقنا يتولى إعداد السيرفرات بالكامل — تهيئة VPS، حاويات Docker، سيرفرات البريد، استضافة n8n، SSL، وأي بنية تحتية تحتاجها. نجهز كل شيء حتى تركز على عملك.',
        features: JSON.stringify(['VPS Setup & Management', 'Docker Containers', 'Mail Server Configuration', 'n8n Self-hosting', 'SSL & Security', 'CI/CD Pipelines', 'Database Management', 'Monitoring & Backups']),
        features_en: JSON.stringify(['VPS Setup & Management', 'Docker Containers', 'Mail Server Configuration', 'n8n Self-hosting', 'SSL & Security', 'CI/CD Pipelines', 'Database Management', 'Monitoring & Backups']),
        features_ar: JSON.stringify(['إعداد وإدارة VPS', 'حاويات Docker', 'تهيئة سيرفر البريد', 'استضافة n8n ذاتية', 'SSL والأمان', 'خطوط CI/CD', 'إدارة قواعد البيانات', 'مراقبة ونسخ احتياطي']),
        order: 6,
        active: true,
      },
    ],
  });

  // ═══════════════════════════════════════════════
  // PROJECTS (Portfolio)
  // ═══════════════════════════════════════════════
  console.log('📁 Seeding projects...');
  await db.project.createMany({
    data: [
      {
        title: 'AI Sales Bot — Nutrition Brand',
        title_en: 'AI Sales Bot — Nutrition Brand',
        title_ar: 'بوت مبيعات ذكي — براند تغذية',
        category: 'AI Chatbot',
        category_en: 'AI Chatbot',
        category_ar: 'بوت ذكاء اصطناعي',
        description: 'Built a sophisticated AI sales persona for a nutrition brand on Facebook Messenger. The bot handles product recommendations, pricing negotiations, health safety checks, and closes sales autonomously — replacing a team of 3 sales agents.',
        description_en: 'Built a sophisticated AI sales persona for a nutrition brand on Facebook Messenger. The bot handles product recommendations, pricing negotiations, health safety checks, and closes sales autonomously — replacing a team of 3 sales agents.',
        description_ar: 'بنيت شخصية مبيعات AI متقدمة لبراند تغذية على فيسبوك ماسنجر. البوت بيتعامل مع ترشيحات المنتجات، التفاوض على الأسعار، فحوصات السلامة الصحية، وبيقفل المبيعات بشكل مستقل — بدل فريق من ٣ مندوبين.',
        metrics: JSON.stringify([
          { icon: 'TrendingUp', value: '3x', label: 'Sales Increase' },
          { icon: 'Clock', value: '24/7', label: 'Always Active' },
          { icon: 'Users', value: '5000+', label: 'Conversations/mo' },
        ]),
        tags: JSON.stringify(['AI', 'Chatbot', 'Sales', 'Facebook']),
        tags_en: JSON.stringify(['AI', 'Chatbot', 'Sales', 'Facebook']),
        tags_ar: JSON.stringify(['ذكاء اصطناعي', 'بوت', 'مبيعات', 'فيسبوك']),
        color: 'from-violet-500/20 to-purple-500/20',
        featured: true,
        order: 1,
        active: true,
      },
      {
        title: 'Restaurant Ordering Platform',
        title_en: 'Restaurant Ordering Platform',
        title_ar: 'منصة طلبات المطاعم',
        category: 'SaaS Platform',
        category_en: 'SaaS Platform',
        category_ar: 'منصة SaaS',
        description: 'A full multi-branch restaurant platform with online ordering, kitchen display system, menu management with variations & options, multi-language support, and real-time order tracking. Serving thousands of orders monthly.',
        description_en: 'A full multi-branch restaurant platform with online ordering, kitchen display system, menu management with variations & options, multi-language support, and real-time order tracking. Serving thousands of orders monthly.',
        description_ar: 'منصة مطاعم متعددة الفروع كاملة مع طلبات أونلاين، نظام عرض المطبخ، إدارة قوائم الطعام مع التنويعات والخيارات، دعم متعدد اللغات، وتتبع الطلبات بالوقت الحقيقي. تخدم آلاف الطلبات شهرياً.',
        metrics: JSON.stringify([
          { icon: 'ShoppingCart', value: '5000+', label: 'Orders/month' },
          { icon: 'Store', value: 'Multi', label: 'Branch Support' },
          { icon: 'Languages', value: '3', label: 'Languages' },
        ]),
        tags: JSON.stringify(['SaaS', 'Restaurant', 'E-commerce', 'Real-time']),
        tags_en: JSON.stringify(['SaaS', 'Restaurant', 'E-commerce', 'Real-time']),
        tags_ar: JSON.stringify(['SaaS', 'مطاعم', 'تجارة إلكترونية', 'وقت حقيقي']),
        color: 'from-orange-500/20 to-amber-500/20',
        featured: true,
        order: 2,
        active: true,
      },
      {
        title: 'Recruitment & HR Platform',
        title_en: 'Recruitment & HR Platform',
        title_ar: 'منصة التوظيف والموارد البشرية',
        category: 'SaaS Platform',
        category_en: 'SaaS Platform',
        category_ar: 'منصة SaaS',
        description: 'A two-sided recruitment marketplace with AI-powered CV optimization, consultation booking system, payment integration, and admin dashboard. Connects job seekers with opportunities through intelligent matching.',
        description_en: 'A two-sided recruitment marketplace with AI-powered CV optimization, consultation booking system, payment integration, and admin dashboard. Connects job seekers with opportunities through intelligent matching.',
        description_ar: 'سوق توظيف ثنائي مع تحسين السيرة الذاتية بالذكاء الاصطناعي، نظام حجز استشارات، تكامل دفع، ولوحة تحكم إدارية. يربط الباحثين عن عمل بالفرص من خلال مطابقة ذكية.',
        metrics: JSON.stringify([
          { icon: 'Users', value: '2000+', label: 'Users' },
          { icon: 'FileText', value: 'AI', label: 'CV Optimizer' },
          { icon: 'CreditCard', value: 'Integrated', label: 'Payments' },
        ]),
        tags: JSON.stringify(['SaaS', 'HR', 'AI', 'Marketplace']),
        tags_en: JSON.stringify(['SaaS', 'HR', 'AI', 'Marketplace']),
        tags_ar: JSON.stringify(['SaaS', 'موارد بشرية', 'ذكاء اصطناعي', 'سوق']),
        color: 'from-blue-500/20 to-indigo-500/20',
        featured: true,
        order: 3,
        active: true,
      },
      {
        title: 'Apartment Booking Automation',
        title_en: 'Apartment Booking Automation',
        title_ar: 'أتمتة حجوزات الشقق',
        category: 'Automation',
        category_en: 'Automation',
        category_ar: 'أتمتة',
        description: 'Complete hospitality automation system with AI WhatsApp chatbot for booking inquiries, smart availability checking, automated booking lifecycle management, and admin dashboard — all powered by n8n workflows.',
        description_en: 'Complete hospitality automation system with AI WhatsApp chatbot for booking inquiries, smart availability checking, automated booking lifecycle management, and admin dashboard — all powered by n8n workflows.',
        description_ar: 'نظام أتمتة ضيافة كامل مع بوت واتساب ذكي لاستفسارات الحجز، فحص التوفر الذكي، إدارة دورة حياة الحجز تلقائياً، ولوحة تحكم إدارية — كله مدعوم بسيناريوهات n8n.',
        metrics: JSON.stringify([
          { icon: 'Bot', value: 'AI', label: 'WhatsApp Bot' },
          { icon: 'Calendar', value: 'Auto', label: 'Booking Management' },
          { icon: 'Clock', value: '0', label: 'Manual Work' },
        ]),
        tags: JSON.stringify(['n8n', 'WhatsApp', 'AI', 'Automation']),
        tags_en: JSON.stringify(['n8n', 'WhatsApp', 'AI', 'Automation']),
        tags_ar: JSON.stringify(['n8n', 'واتساب', 'ذكاء اصطناعي', 'أتمتة']),
        color: 'from-emerald-500/20 to-teal-500/20',
        featured: true,
        order: 4,
        active: true,
      },
      {
        title: 'SEO Analysis Engine',
        title_en: 'SEO Analysis Engine',
        title_ar: 'محرك تحليل SEO',
        category: 'SaaS Product',
        category_en: 'SaaS Product',
        category_ar: 'منتج SaaS',
        description: 'An autonomous SEO analysis platform that crawls websites, applies 16+ modular SEO rules, and provides live optimization injection. Features a multi-tenant SaaS architecture with AI-powered recommendations.',
        description_en: 'An autonomous SEO analysis platform that crawls websites, applies 16+ modular SEO rules, and provides live optimization injection. Features a multi-tenant SaaS architecture with AI-powered recommendations.',
        description_ar: 'منصة تحليل SEO مستقلة تفحص المواقع، تطبق ١٦+ قاعدة SEO مودولارية، وتقدم حقن تحسينات مباشر. تتميز ببنية SaaS متعددة المستأجرين مع توصيات مدعومة بالذكاء الاصطناعي.',
        metrics: JSON.stringify([
          { icon: 'Search', value: '16+', label: 'SEO Rules' },
          { icon: 'Zap', value: 'Live', label: 'Injection' },
          { icon: 'BarChart3', value: 'AI', label: 'Recommendations' },
        ]),
        tags: JSON.stringify(['SaaS', 'SEO', 'AI', 'Analytics']),
        tags_en: JSON.stringify(['SaaS', 'SEO', 'AI', 'Analytics']),
        tags_ar: JSON.stringify(['SaaS', 'SEO', 'ذكاء اصطناعي', 'تحليلات']),
        color: 'from-cyan-500/20 to-sky-500/20',
        featured: false,
        order: 5,
        active: true,
      },
      {
        title: 'Lead Generation & CRM Automation',
        title_en: 'Lead Generation & CRM Automation',
        title_ar: 'أتمتة جمع العملاء و CRM',
        category: 'Automation',
        category_en: 'Automation',
        category_ar: 'أتمتة',
        description: 'Multi-channel lead capture system that collects leads from Facebook ads, WhatsApp, website forms, and Instagram — then automatically scores, routes, and nurtures them through personalized sequences via n8n automations.',
        description_en: 'Multi-channel lead capture system that collects leads from Facebook ads, WhatsApp, website forms, and Instagram — then automatically scores, routes, and nurtures them through personalized sequences via n8n automations.',
        description_ar: 'نظام جمع عملاء متعدد القنوات يجمع العملاء المحتملين من إعلانات فيسبوك، واتساب، نماذج المواقع، وإنستجرام — ثم يصنفهم ويوجههم ويرعاهم تلقائياً من خلال تسلسلات مخصصة عبر أتمتة n8n.',
        metrics: JSON.stringify([
          { icon: 'Users', value: '80%', label: 'More Leads' },
          { icon: 'Clock', value: '40hrs', label: 'Saved/month' },
          { icon: 'TrendingUp', value: '3x', label: 'Conversion' },
        ]),
        tags: JSON.stringify(['n8n', 'CRM', 'Lead Gen', 'Automation']),
        tags_en: JSON.stringify(['n8n', 'CRM', 'Lead Gen', 'Automation']),
        tags_ar: JSON.stringify(['n8n', 'CRM', 'جمع عملاء', 'أتمتة']),
        color: 'from-rose-500/20 to-pink-500/20',
        featured: false,
        order: 6,
        active: true,
      },
    ],
  });

  // ═══════════════════════════════════════════════
  // TESTIMONIALS
  // ═══════════════════════════════════════════════
  console.log('💬 Seeding testimonials...');
  await db.testimonial.createMany({
    data: [
      {
        name: 'Ahmed Al-Rashidi',
        name_en: 'Ahmed Al-Rashidi',
        name_ar: 'أحمد الرشيدي',
        role: 'CEO, Lipo Fit Nutrition',
        role_en: 'CEO, Lipo Fit Nutrition',
        role_ar: 'الرئيس التنفيذي، ليبو فيت للتغذية',
        content: 'The AI sales bot transformed our business completely. It handles thousands of conversations daily, qualifies leads, and closes sales — all without human intervention. Our revenue tripled in the first quarter after deployment.',
        content_en: 'The AI sales bot transformed our business completely. It handles thousands of conversations daily, qualifies leads, and closes sales — all without human intervention. Our revenue tripled in the first quarter after deployment.',
        content_ar: 'بوت المبيعات الذكي غيّر شغلنا تماماً. بيتعامل مع آلاف المحادثات يومياً، بيأهل العملاء المحتملين، وبيقفل المبيعات — كل ده من غير تدخل بشري. إيراداتنا اتضاعفت ٣ مرات في أول ربع بعد التطبيق.',
        rating: 5,
        order: 1,
        active: true,
      },
      {
        name: 'Omar Hassan',
        name_en: 'Omar Hassan',
        name_ar: 'عمر حسن',
        role: 'Founder, NaqlFlow Logistics',
        role_en: 'Founder, NaqlFlow Logistics',
        role_ar: 'مؤسس، نقل فلو للوجستيات',
        content: 'They built our entire restaurant ordering platform from scratch — multi-branch support, kitchen display, online ordering, and delivery tracking. The system handles thousands of orders monthly without any issues. Exceptional work.',
        content_en: 'They built our entire restaurant ordering platform from scratch — multi-branch support, kitchen display, online ordering, and delivery tracking. The system handles thousands of orders monthly without any issues. Exceptional work.',
        content_ar: 'بنوا منصة طلبات المطعم بتاعتنا بالكامل من الصفر — دعم متعدد الفروع، شاشة المطبخ، طلبات أونلاين، وتتبع التوصيل. النظام بيتعامل مع آلاف الطلبات شهرياً بدون أي مشاكل. شغل استثنائي.',
        rating: 5,
        order: 2,
        active: true,
      },
      {
        name: 'Sara Al-Balushi',
        name_en: 'Sara Al-Balushi',
        name_ar: 'سارة البلوشي',
        role: 'Owner, Gloria Apartments',
        role_en: 'Owner, Gloria Apartments',
        role_ar: 'مالكة، شقق جلوريا',
        content: 'The WhatsApp booking bot and automation system saved us from hiring extra staff. Guests can check availability, book, and get confirmations automatically. The admin dashboard gives us complete control. Truly impressive.',
        content_en: 'The WhatsApp booking bot and automation system saved us from hiring extra staff. Guests can check availability, book, and get confirmations automatically. The admin dashboard gives us complete control. Truly impressive.',
        content_ar: 'بوت الواتساب للحجوزات ونظام الأتمتة وفرلنا توظيف موظفين إضافيين. الضيوف يقدروا يتحققوا من التوفر ويحجزوا ويحصلوا على تأكيدات تلقائياً. لوحة التحكم بتدينا سيطرة كاملة. شغل مبهر فعلاً.',
        rating: 5,
        order: 3,
        active: true,
      },
      {
        name: 'Khaled Mostafa',
        name_en: 'Khaled Mostafa',
        name_ar: 'خالد مصطفى',
        role: 'CTO, GrowthNexus',
        role_en: 'CTO, GrowthNexus',
        role_ar: 'مدير التكنولوجيا، جروث نيكسس',
        content: 'We needed a recruitment platform with AI-powered CV optimization, and they delivered beyond expectations. The multi-language support, payment integration, and admin tools are all production-grade. Communication was excellent throughout the entire project.',
        content_en: 'We needed a recruitment platform with AI-powered CV optimization, and they delivered beyond expectations. The multi-language support, payment integration, and admin tools are all production-grade. Communication was excellent throughout the entire project.',
        content_ar: 'كنا محتاجين منصة توظيف مع تحسين السيرة الذاتية بالـ AI، وسلّموا أكتر من المتوقع. الدعم متعدد اللغات، تكامل الدفع، وأدوات الإدارة كلها بمستوى إنتاجي. التواصل كان ممتاز طوال المشروع.',
        rating: 5,
        order: 4,
        active: true,
      },
      {
        name: 'Youssef Adel',
        name_en: 'Youssef Adel',
        name_ar: 'يوسف عادل',
        role: 'Operations Manager, E-commerce Brand',
        role_en: 'Operations Manager, E-commerce Brand',
        role_ar: 'مدير العمليات، براند تجارة إلكترونية',
        content: 'The n8n automation workflows they built saved our operations team over 40 hours per week. From lead routing to data sync across our CRM and accounting tools — everything runs seamlessly. The server setup and Docker configurations were also handled perfectly.',
        content_en: 'The n8n automation workflows they built saved our operations team over 40 hours per week. From lead routing to data sync across our CRM and accounting tools — everything runs seamlessly. The server setup and Docker configurations were also handled perfectly.',
        content_ar: 'سيناريوهات الأتمتة اللي بنوها باستخدام n8n وفرت على فريق العمليات بتاعنا أكتر من ٤٠ ساعة في الأسبوع. من توجيه العملاء المحتملين لمزامنة البيانات عبر CRM وأدوات المحاسبة — كل حاجة بتشتغل بسلاسة. وكمان إعداد السيرفر وتهيئة الدوكر اتعملوا بشكل مثالي.',
        rating: 5,
        order: 5,
        active: true,
      },
      {
        name: 'Nour El-Din',
        name_en: 'Nour El-Din',
        name_ar: 'نور الدين',
        role: 'Founder, Digital Agency',
        role_en: 'Founder, Digital Agency',
        role_ar: 'مؤسس، وكالة رقمية',
        content: 'I needed a custom dashboard for my clients, a mail server, and complete VPS setup. Their team handled everything professionally — from Docker containers to n8n hosting to SSL certificates. They\'re not just developers, they\'re a full tech partner.',
        content_en: 'I needed a custom dashboard for my clients, a mail server, and complete VPS setup. Their team handled everything professionally — from Docker containers to n8n hosting to SSL certificates. They\'re not just developers, they\'re a full tech partner.',
        content_ar: 'كنت محتاج داشبورد مخصص لعملائي، سيرفر بريد، وإعداد VPS كامل. فريقهم تعامل مع كل حاجة باحترافية — من حاويات Docker لاستضافة n8n لشهادات SSL. مش مجرد مطورين، دول شريك تقني كامل.',
        rating: 5,
        order: 6,
        active: true,
      },
    ],
  });

  // ═══════════════════════════════════════════════
  // FAQs
  // ═══════════════════════════════════════════════
  console.log('❓ Seeding FAQs...');
  await db.fAQ.createMany({
    data: [
      {
        question: 'What types of chatbots do you build?',
        question_en: 'What types of chatbots do you build?',
        question_ar: 'إيه أنواع البوتات اللي بتبنوها؟',
        answer: 'I build AI-powered chatbots for WhatsApp, Facebook Messenger, and Instagram. These include sales bots that close deals autonomously, customer support bots, lead generation bots, booking bots, and promotional campaign bots. Each bot is custom-built with AI capabilities tailored to your specific business needs.',
        answer_en: 'I build AI-powered chatbots for WhatsApp, Facebook Messenger, and Instagram. These include sales bots that close deals autonomously, customer support bots, lead generation bots, booking bots, and promotional campaign bots. Each bot is custom-built with AI capabilities tailored to your specific business needs.',
        answer_ar: 'ببني بوتات ذكاء اصطناعي لواتساب وفيسبوك ماسنجر وإنستجرام. دول بيشملوا بوتات مبيعات بتقفل صفقات بشكل مستقل، بوتات دعم فني، بوتات جمع عملاء محتملين، بوتات حجوزات، وبوتات حملات دعائية. كل بوت مبني مخصوص بإمكانيات AI مصممة لاحتياجات عملك.',
        order: 1,
        active: true,
      },
      {
        question: 'What is n8n and how do you use it?',
        question_en: 'What is n8n and how do you use it?',
        question_ar: 'إيه هو n8n وإزاي بتستخدموه؟',
        answer: 'n8n is a powerful open-source workflow automation platform. I\'m an expert n8n developer and use it to build complex automation workflows that connect your tools, sync data, trigger actions, and eliminate manual tasks. From CRM automation to data pipelines to notification systems — n8n is my go-to tool for building reliable, scalable automations.',
        answer_en: 'n8n is a powerful open-source workflow automation platform. I\'m an expert n8n developer and use it to build complex automation workflows that connect your tools, sync data, trigger actions, and eliminate manual tasks. From CRM automation to data pipelines to notification systems — n8n is my go-to tool for building reliable, scalable automations.',
        answer_ar: 'n8n هي منصة أتمتة سير العمل مفتوحة المصدر وقوية جداً. أنا خبير في تطوير n8n وبستخدمها لبناء سيناريوهات أتمتة معقدة بتربط أدواتك، بتزامن البيانات، بتشغل إجراءات، وبتلغي المهام اليدوية. من أتمتة CRM لخطوط أنابيب البيانات لأنظمة الإشعارات — n8n هي أداتي الأساسية لبناء أتمتة موثوقة وقابلة للتوسع.',
        order: 2,
        active: true,
      },
      {
        question: 'What is your typical project timeline?',
        question_en: 'What is your typical project timeline?',
        question_ar: 'إيه الجدول الزمني المعتاد للمشاريع؟',
        answer: 'Timelines depend on scope. A chatbot or simple automation can be delivered in 1-2 weeks. A custom dashboard or API integration takes 2-4 weeks. A full SaaS platform or complex multi-system automation typically takes 4-8 weeks. I always provide a detailed timeline before we start.',
        answer_en: 'Timelines depend on scope. A chatbot or simple automation can be delivered in 1-2 weeks. A custom dashboard or API integration takes 2-4 weeks. A full SaaS platform or complex multi-system automation typically takes 4-8 weeks. I always provide a detailed timeline before we start.',
        answer_ar: 'الجداول الزمنية بتعتمد على النطاق. بوت أو أتمتة بسيطة ممكن تتسلم في ١-٢ أسبوع. داشبورد مخصص أو تكامل API بياخد ٢-٤ أسابيع. منصة SaaS كاملة أو أتمتة معقدة متعددة الأنظمة عادة بتاخد ٤-٨ أسابيع. دايماً بقدم جدول زمني مفصل قبل ما نبدأ.',
        order: 3,
        active: true,
      },
      {
        question: 'Do you offer server setup and hosting?',
        question_en: 'Do you offer server setup and hosting?',
        question_ar: 'بتقدموا إعداد سيرفرات واستضافة؟',
        answer: 'Yes! My team handles complete server infrastructure — VPS setup, Docker containers, mail servers, n8n self-hosting, SSL certificates, database management, backups, and monitoring. We can set up any server environment you need, whether it\'s for hosting your n8n instance, deploying your SaaS, or running your business tools.',
        answer_en: 'Yes! My team handles complete server infrastructure — VPS setup, Docker containers, mail servers, n8n self-hosting, SSL certificates, database management, backups, and monitoring. We can set up any server environment you need, whether it\'s for hosting your n8n instance, deploying your SaaS, or running your business tools.',
        answer_ar: 'أيوا! فريقي بيتولى البنية التحتية للسيرفرات بالكامل — إعداد VPS، حاويات Docker، سيرفرات البريد، استضافة n8n ذاتية، شهادات SSL، إدارة قواعد البيانات، نسخ احتياطي، ومراقبة. نقدر نجهز أي بيئة سيرفر تحتاجها، سواء لاستضافة n8n أو نشر SaaS أو تشغيل أدوات عملك.',
        order: 4,
        active: true,
      },
      {
        question: 'How does your AI consulting work?',
        question_en: 'How does your AI consulting work?',
        question_ar: 'إزاي استشارات الـ AI بتشتغل؟',
        answer: 'I offer AI strategy consulting where we analyze your business processes and identify where AI can add the most value. This includes recommending the right AI tools, designing integration architectures, and implementing solutions like GPT-powered features, custom AI agents, RAG systems, and intelligent automation.',
        answer_en: 'I offer AI strategy consulting where we analyze your business processes and identify where AI can add the most value. This includes recommending the right AI tools, designing integration architectures, and implementing solutions like GPT-powered features, custom AI agents, RAG systems, and intelligent automation.',
        answer_ar: 'بقدم استشارات استراتيجية AI حيث بنحلل عمليات عملك ونحدد فين الذكاء الاصطناعي يقدر يضيف أكبر قيمة. ده بيشمل ترشيح أدوات AI المناسبة، تصميم معماريات التكامل، وتنفيذ حلول زي ميزات GPT، وكلاء AI مخصصين، أنظمة RAG، وأتمتة ذكية.',
        order: 5,
        active: true,
      },
      {
        question: 'Do you provide post-launch support?',
        question_en: 'Do you provide post-launch support?',
        question_ar: 'بتقدموا دعم بعد الإطلاق؟',
        answer: 'Absolutely. All projects include post-launch support. Quick solutions include 1 week of support, full builds include 30 days, and enterprise projects include ongoing maintenance. I also offer retainer packages for continuous development and support.',
        answer_en: 'Absolutely. All projects include post-launch support. Quick solutions include 1 week of support, full builds include 30 days, and enterprise projects include ongoing maintenance. I also offer retainer packages for continuous development and support.',
        answer_ar: 'طبعاً. كل المشاريع بتشمل دعم بعد الإطلاق. الحلول السريعة بتشمل أسبوع دعم، البناء الكامل بيشمل ٣٠ يوم، والمشاريع المؤسسية بتشمل صيانة مستمرة. كمان بقدم باقات للتطوير والدعم المستمر.',
        order: 6,
        active: true,
      },
      {
        question: 'How do payments work?',
        question_en: 'How do payments work?',
        question_ar: 'إزاي نظام الدفع بيشتغل؟',
        answer: 'After the discovery call and project scoping, I provide a detailed proposal with clear deliverables, timeline, and pricing. Payment is structured in milestones — typically 30% upfront, 40% at midpoint, and 30% upon delivery. I accept bank transfers and various payment methods.',
        answer_en: 'After the discovery call and project scoping, I provide a detailed proposal with clear deliverables, timeline, and pricing. Payment is structured in milestones — typically 30% upfront, 40% at midpoint, and 30% upon delivery. I accept bank transfers and various payment methods.',
        answer_ar: 'بعد مكالمة الاستكشاف وتحديد نطاق المشروع، بقدم عرض مفصل بتسليمات واضحة، جدول زمني، وتسعير. الدفع منظم على مراحل — عادة ٣٠٪ مقدم، ٤٠٪ في المنتصف، و٣٠٪ عند التسليم. بقبل تحويلات بنكية وطرق دفع مختلفة.',
        order: 7,
        active: true,
      },
    ],
  });

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
