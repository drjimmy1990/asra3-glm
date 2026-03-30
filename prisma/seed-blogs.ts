import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  console.log('🧹 Clearing existing blog posts...');
  await db.blogPost.deleteMany();

  console.log('🔍 Fetching projects...');
  const projects = await db.project.findMany();

  const getProjectByTitle = (title: string) => projects.find((p) => p.title_en === title);

  console.log('✍️  Seeding specialized case-study blog posts for projects...');
  const blogPosts = [
    // 1. AI Sales Bot
    {
      slug: 'how-we-built-an-ai-sales-bot-that-tripled-nutrition-brand-revenue',
      title_en: 'How We Built an AI Sales Bot That Tripled a Nutrition Brand\'s Revenue',
      title_ar: 'كيف بنينا روبوت مبيعات ذكاء اصطناعي ضاعف إيرادات علامة تجارية للتغذية 3 مرات',
      excerpt_en: 'Discover the exact strategy, prompts, and n8n architecture we used to construct a fully autonomous Meta Messenger sales bot handling 5,000+ chats/month.',
      excerpt_ar: 'اكتشف الاستراتيجية الدقيقة والهيكلية التي استخدمناها لبناء روبوت مبيعات مستقل تمامًا على ماسنجر يتعامل مع أكثر من 5000 محادثة شهريًا.',
      content_en: `
# Transforming E-Commerce with Conversational AI

In today's fast-paced digital market, replying to customers within minutes—not hours—is the difference between a bounced visitor and a loyal buyer. We collaborated with a leading Nutrition Brand to solve their biggest bottleneck: a human sales team overwhelmed by thousands of repetitive DMs.

## The Challenge

The client was receiving over 5,000 messages a month on Facebook Messenger and Instagram. Their manual sales team was taking an average of 45 minutes to respond. As a result, lead fatigue was high, and conversion rates were dropping. They needed a system that could not only answer FAQs but actively **sell, negotiate, and qualify leads** based on strict health protocols.

## The AI Solution Architecture

We constructed a highly specialized AI Sales Persona using **OpenAI's GPT-4o** combined with **n8n** for seamless Meta API integration. 

### Key Features Implemented:
1. **Dynamic Health Triage:** The bot asks required medical history questions before recommending supplements.
2. **Objection Handling:** Trained on the top 50 customer objections, the AI navigates price resistance flawlessly.
3. **Automated Checkout:** Direct integration with their Shopify backend generated personalized checkout links instantly in chat.

![AI Sales Funnel Architecture|800x400](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)

## The Results

Within 30 days of deployment:
* **Response Time:** Dropped from 45 minutes to < 3 seconds.
* **Conversion Rate:** Increased by 315%.
* **Operational Cost:** The bot replaced the need to hire 3 additional night-shift agents, running 24/7 without taking a break.

If your e-commerce brand is struggling with DM volume, conversational AI isn't just an upgrade—it's a requirement to stay competitive.
      `,
      content_ar: `
# تحويل التجارة الإلكترونية عبر الذكاء الاصطناعي الحواري

في السوق الرقمي السريع اليوم، الرد على العملاء في دقائق—وليس ساعات—هو الفارق بين زائر عابر ومشترٍ دائم. تعاونا مع إحدى العلامات التجارية الرائدة في مجال التغذية لحل أكبر عقبة تواجههم: فريق مبيعات بشري مثقل بآلاف الرسائل المتكررة.

## التحدي

كان العميل يواجه أكثر من 5000 رسالة شهرياً على فيسبوك ماسنجر وإنستجرام. كان فريق المبيعات اليدوي يستغرق في المتوسط 45 دقيقة للرد. ونتيجة لذلك، انخفضت معدلات التحويل. كانوا بحاجة إلى نظام لا يقتصر على الإجابة على الأسئلة الشائعة فحسب، بل يمكنه **البيع والتفاوض وتأهيل العملاء** بناءً على بروتوكولات صحية صارمة.

## هيكل حلول الذكاء الاصطناعي

قمنا ببناء شخصية مبيعات ذكية متخصصة باستخدام **OpenAI GPT-4o** مدمجة مع **n8n** للربط السلس مع واجهة Meta البرمجية.

### الميزات الرئيسية المنفذة:
1. **الفرز الصحي الديناميكي:** يطرح البوت أسئلة طبية مطلوبة قبل التوصية بالمكملات.
2. **التعامل مع الاعتراضات:** مُدرَّب على أبرز 50 اعتراضاً للعملاء، ويتنقل ببراعة لتجاوز مقاومة الأسعار.
3. **الدفع الآلي:** دمج مباشر مع نظام الخادم لتوليد روابط دفع مخصصة فوراً في المحادثة.

![AI Sales Funnel Architecture|800x400](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)

## النتائج

خلال 30 يوماً من التشغيل:
* **وقت الاستجابة:** انخفض من 45 دقيقة إلى أقل من 3 ثوانٍ.
* **معدل التحويل:** زاد بنسبة 315%.
* **التكاليف التشغيلية:** وفّر البوت الحاجة إلى توظيف 3 وكلاء للوردية الليلية، حيث يعمل 24/7 بدون توقف.
      `,
      coverImage: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?auto=format&fit=crop&q=80&w=1200',
      projectId: getProjectByTitle('AI Sales Bot — Nutrition Brand')?.id,
      tags: JSON.stringify(['AI', 'E-commerce', 'Automation', 'Case Study']),
      published: true,
      order: 1
    },

    // 2. Restaurant Ordering Platform
    {
      slug: 'scaling-multi-branch-restaurants-with-modern-saas-architecture',
      title_en: 'Scaling Multi-Branch Restaurants with Modern SaaS Architecture',
      title_ar: 'توسيع نطاق مطاعم متعددة الفروع باستخدام بنية SaaS الحديثة',
      excerpt_en: 'How we engineered a highly scalable ordering platform dealing with complex menu variations and kitchen display systems in real-time.',
      excerpt_ar: 'كيف قمنا بهندسة منصة طلبات قابلة للتوسع تتعامل مع تنويعات القوائم المعقدة وأنظمة عرض المطبخ في الوقت الفعلي.',
      content_en: `
# Modernizing The Restaurant Stack

The restaurant industry is notoriously difficult to digitize. Beyond a simple digital menu, true operational efficiency requires synchronizing the front-of-house (customers) directly with the back-of-house (kitchen). 

When our client asked us to build a custom SaaS ordering platform for their expanding multi-branch restaurant, we knew off-the-shelf solutions wouldn't cut it.

## The Complexities of Menu Variations

One of the largest hurdles was structuring the database to handle infinite menu variations. A simple burger isn't just a burger—it has sizes, crust types, add-ons (with independent pricing), and exclusions. 

We designed a **recursive JSON schema in PostgreSQL (via Prisma)** that allowed the admin dashboard to generate highly nested product options on the fly. 

![Dashboard UI|800x400](https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200)

## Real-time Kitchen Display Systems (KDS)

Receiving the order is only step one. We utilized **WebSockets and Supabase Realtime** to broadcast orders instantly to the respective branch's Kitchen Display System. 
1. **Color-coded urgency:** Orders flashing red after 20 minutes.
2. **Station splitting:** Drinks routed to the bar tablet, food to the grill tablet.
3. **Driver integration:** Alerting logistics when the plate is marked "Ready."

By owning their entire digital stack, the restaurant dodged 30% aggregation fees from delivery apps, allowing them to fund their expansion into three new cities within a year.
      `,
      content_ar: `
# تحديث البنية التكنولوجية للمطاعم

مجال المطاعم من المجالات التي يصعب رقمنتها بشكل كامل. فبعيداً عن مجرد عرض قائمة طعام رقمية، الكفاءة التشغيلية الحقيقية تتطلب مزامنة واجهة العملاء بشكل مباشر مع المطبخ الداخلي.

عندما طلب منا عميلنا بناء منصة SaaS مخصصة للطلبات لمطعمهم المتوسع متعدد الفروع، أدركنا أن الحلول الجاهزة لن تفي بالغرض.

## تعقيدات تنويعات القوائم

أحد أكبر العقبات كان هيكلة قاعدة البيانات للتعامل مع خيارات غير محدودة للأصناف. الساندويتش ليس مجرد ساندويتش—بل له أحجام، إضافات (بأسعار مستقلة)، واستثناءات.

صممنا **هيكل JSON تفاعلي** سمح للوحة التحكم الإدارية بإنشاء خيارات منتجات متداخلة ومتشعبة بسهولة.

![Dashboard UI|800x400](https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200)

## أنظمة شاشات المطبخ في الوقت الفعلي (KDS)

استلام الطلب هو الخطوة الأولى فقط. استخدمنا تقنيات **WebSockets و Supabase Realtime** لبث الطلبات فورياً لشاشة مطبخ الفرع المعني.
1. **تنبيهات ملونة:** تومض الطلبات باللون الأحمر بعد 20 دقيقة.
2. **تقسيم المحطات:** المشروبات تُرسل لشاشة البار، والطعام لشاشة الشواية.
3. **دمج السائقين:** تنبيه قسم التوصيل فور تحديد الطلب بأنه "جاهز".

من خلال امتلاكهم لبرمجياتهم الخاصة، تجنب المطعم رسوم تطبيقات التوصيل التي تصل لـ 30%، مما مكّنهم من تمويل توسعهم في ثلاث مدن جديدة خلال عام.
      `,
      coverImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1200',
      projectId: getProjectByTitle('Restaurant Ordering Platform')?.id,
      tags: JSON.stringify(['SaaS', 'Restaurant', 'Next.js', 'Case Study']),
      published: true,
      order: 2
    },

    // 3. Recruitment Platform
    {
      slug: 'ai-powered-cv-optimization-in-recruitment-saas',
      title_en: 'AI-Powered CV Optimization in Recruitment SaaS',
      title_ar: 'تحسين السير الذاتية بالذكاء الاصطناعي في منصات التوظيف',
      excerpt_en: 'A deep dive into how we integrated Large Language Models to automatically parse, score, and optimize resumes for a leading HR marketplace.',
      excerpt_ar: 'نظرة متعمقة على كيفية دمج نماذج اللغات الكبيرة لتحليل وتقييم وتحسين السير الذاتية تلقائياً لمنصة موارد بشرية رائدة.',
      content_en: `
# The Death of the Traditional Resume 

The modern job market receives millions of applications daily. For HR professionals, screening CVs is a massive bottleneck. We built a holistic two-sided marketplace designed to level the playing field for candidates while supercharging recruiters.

## Integrating the AI CV Optimizer

The core value proposition of the platform is its "Smart Match" algorithm. Instead of doing simple keyword matching, we deployed a RAG (Retrieval-Augmented Generation) pipeline over a vector database containing thousands of industry-standard job descriptions.

When a user uploads a PDF resume:
1. **Document Parsing:** We extract plain text accurately regardless of the PDF format.
2. **Semantic Scoring:** The LLM compares candidate experience against the target role.
3. **Actionable Rewriting:** The AI highlights weak bullet points and suggests action-verb-driven alternatives in real-time.

![CV Parsing|800x400](https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200)

## The Business Impact

Candidates using the optimizer saw a **40% higher callback rate**, while recruiters reported spending 60% less time screening irrelevant applications. By successfully monetizing this optimization as a premium feature tier (integrated cleanly with Stripe/Paymob), the platform achieved profitability in its second month of launch.
      `,
      content_ar: `
# نهاية السيرة الذاتية التقليدية

يستقبل سوق العمل الحديث ملايين الطلبات يومياً. بالنسبة لمحترفي الموارد البشرية، تصفية السير الذاتية تُمثل عقبة هائلة. بنينا منصة توظيف تفاعلية مصممة لخلق تكافؤ فرص للمرشحين مع تزويد مسؤولي التوظيف بأدوات فائقة.

## دمج محسن السيرة الذاتية (AI)

القيمة الأساسية للمنصة تكمن في خوارزمية "المطابقة الذكية". بدلاً من الاعتماد على الكلمات المفتاحية البسيطة، نشرنا سلسلة RAG متقدمة تعمل بالتوازي مع قواعد بيانات ضخمة للوصف الوظيفي.

عندما يرفع المستخدم سيرته الذاتية (PDF):
1. **تحليل المستندات:** نستخرج النص بدقة بغض النظر عن تنسيق الملف.
2. **تقييم دلالي:** يقارن نموذج الذكاء الاصطناعي خبرة المرشح مع الدور المستهدف.
3. **إعادة كتابة تفاعلية:** يبرز النظام النقاط الضعيفة ويقترح بدائل عملية قوية في الوقت الفعلي.

![CV Parsing|800x400](https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200)

## الأثر التجاري

شهد المرشحون الذين استخدموا المحسّن **معدل استدعاء أعلى بنسبة 40%**، بينما أفاد مسؤولو التوظيف بتقليص وقت فحص الطلبات غير ذات الصلة بنسبة 60%. ومن خـلال تفعيل هذه الخاصية كباقة مدفوعة، حققت المنصة أرباحها في شهرها الثاني فقط.
      `,
      coverImage: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
      projectId: getProjectByTitle('Recruitment & HR Platform')?.id,
      tags: JSON.stringify(['HR Tech', 'AI', 'Marketplace', 'Next.js']),
      published: true,
      order: 3
    },

    // Add 3 General High-Quality Blog Posts
    {
      slug: 'why-n8n-is-the-future-of-workflow-automation',
      title_en: 'Why n8n is the Future of Enterprise Workflow Automation',
      title_ar: 'لماذا n8n هو مستقبل أتمتة تدفقات العمل للمؤسسات',
      excerpt_en: 'Move over Zapier. Here is why serious engineering teams and scaling businesses are migrating to self-hosted n8n for workflow automation.',
      excerpt_ar: 'إليك الأسباب التي تجعل الفرق الهندسية والشركات المتنامية تنتقل إلى الاستضافة الذاتية لمنصة n8n لأتمتة أعمالها.',
      content_en: `
# Moving Beyond Basic Triggers

For years, platforms like Zapier and Make have dominated the no-code automation landscape. They're fantastic for simple "If This Then That" logic. But what happens when your business logic gets complex?

What happens when you need to run custom Javascript loops, query your proprietary PostgreSQL database securely, or manipulate massive JSON arrays on the fly? You hit a wall.

## Enter n8n: Node-Based Automation

n8n bridges the gap between no-code convenience and pro-code flexibility. Because it's "fair-code"/source-available, you can self-host it on your own VPS.

### 1. Cost Predictability
With traditional SaaS automation, you pay per "task" or "execution." If you have a workflow syncing 50,000 CRM contacts, your monthly bill could skyrocket to thousands of dollars overnight. 

With a self-hosted n8n instance on an $8/month DigitalOcean droplet, you can execute **millions of tasks** at zero additional cost. 

### 2. Unrestricted Code
In n8n, the "Code Node" lets you write vanilla JavaScript. You can parse complex responses, handle conditional branching based on deeply nested objects, and fetch external NPM libraries directly in your workflow.

### 3. Ultimate Data Privacy
By self-hosting, your customer data never leaves your server ecosystem to be processed by a third party. This is an absolute gamechanger for Healthcare (HIPAA), Finance, and European (GDPR) clients.

![n8n Nodes|800x400](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200)

At *Asra3*, n8n is our secret weapon. It allows us to build Enterprise-grade connective tissue between our custom SaaS apps and AI agents in hours rather than weeks.
      `,
      content_ar: `
# تجاوز حدود الأتمتة البسيطة

لسنوات، سيطرت منصات مثل Zapier و Make على مشهد الأتمتة (No-Code). إنها رائعة لمهام بسيطة تعتمد على مبدأ "إذا حدث هذا فافعل ذلك". لكن ماذا لو تعقدت قواعد عملك؟

ماذا لو كنت بحاجة إلى تشغيل دوال برمجية مخصصة، أو استدعاء بيانات من قاعدة بيانات PostgreSQL مشفرة، أو معالجة مصفوفات JSON ضخمة في لحظات؟ ستصطدم بحائط مسدود.

## دخول n8n: أتمتة تعتمد على الكود المفتوح

n8n يسد الفجوة بين سهولة عدم كتابة كود، ومرونة كتابته كاملاً. بفضل إمكانية استضافته ذاتياً على الخوادم، فإنه يوفر مزايا خيالية:

### 1. تكلفة متوقعة وثابتة
في منصات الأتمتة العادية، تدفع مقابل كل "مهمة". إذا كان لديك تسلسل يزامن 50 ألف جهة اتصال في نظام الـ CRM، قد ترتفع فاتورتك لآلاف الدولارات في ليلة واحدة. مع خادم n8n باستضافة مدفوعة (مثلاً بـ 8$/شهر)، يمكنك تنفيذ **ملايين المهام** دون تكلفة إضافية واحدة.

### 2. مرونة برمجية غير محدودة
من خلال Node مخصص لكتابة الكود في n8n، يمكنك معالجة الشروط المعقدة، والتلاعب بالبيانات، بل واستيراد مكتبات NPM للقيام بمهام برمجية بحتة داخـل سير العمل الخاص بك.

### 3. أمن البيانات بشكل مطلق
الأهم من ذلك، باستضافة الأداة محلياً، بيانات عملائك لا تُغادر سيرفراتك أبداً لتُعالج في طرف ثالث، مما يحقق توافقاً تاماً مع قوانين الخصوصية العالمية!
      `,
      coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
      projectId: null,
      tags: JSON.stringify(['n8n', 'Automation', 'Engineering', 'Cost Savings']),
      published: true,
      order: 4
    },
    {
      slug: 'the-roi-of-custom-admin-dashboards',
      title_en: 'The Hidden ROI of Building Custom Admin Dashboards',
      title_ar: 'المنفعة الاستثمارية المخفية وراء بناء لوحات تحكم إدارية مخصصة',
      excerpt_en: 'Stop trying to force your unique business operations into rigid third-party CRMs. Why custom admin panels save hundreds of hours.',
      excerpt_ar: 'توقف عن محاولة حشر عمليات أعمالك المميزة داخل أنظمة CRM خارجية معقدة. تعرّف لماذا تبني لوحات التحكم المخصصة توفيراً هائلاً.',
      content_en: `
# Breaking Out of the UI Prison

Every growing business eventually reaches a breaking point where Google Sheets isn't enough, but Salesforce is way too complicated and expensive. This "awkward middle phase" is where operational agility dies.

## The Pain of Generic CRMs

Off-the-shelf software is built for the lowest common denominator. To appeal to millions of businesses, it includes thousands of features you will *never* use, hidden behind nested menus. 

When your customer support rep has to click 8 times, switch between 3 tabs, and manually copy-paste an ID to process a single refund, your operational overhead is bleeding profit.

![Analytics Dashboard|800x400](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)

## The Custom Dashboard Advantage

When we build specialized Admin Panels at Asra3, we adopt a **Workflow-First** design methodology.
* **Aggregated Views:** If an agent needs a user's purchase history, active support tickets, and shipping tracker, we put them precisely on one screen. 
* **One-Click Actions:** Complex workflows (e.g., "Cancel booking, issue 50% refund, email customer, notify warehouse") are compressed into a single shiny button.
* **Role-Based Clarity:** The junior content editor only sees what they need to edit content. Complete cognitive focus.

A well-architected Next.js dashboard backed by a solid UI library saves employees roughly 10-15 hours a week in "UI friction." Calculate that across a team of 10, and a custom dashboard pays for its entire development cost within two months.
      `,
      content_ar: `
# الخروج من سجن الواجهات الجاهزة

تصل كل شركة نامية عاجلاً أم آجلاً لنقطة انهيار: جداول جوجل (Google Sheets) لم تعد تكفي، وأنظمة مثل (Salesforce) معقدة ومكلفة جداً. هذه المنطقة الرمادية هي مقبرة "المرونة التشغيلية".

## أزمة أنظمة إدارة العلاقات (CRMs) التقليدية

البرمجيات الجاهزة مصممة لتُرضي أكبر كم من المستخدمين، لذلك تتضمن آلاف الخواص التي لن تراها أو تستعملها أبداً. 

عندما يضطر موظف الدعم الفني لديك للنقر 8 مرات، والتنقل بين 3 نوافذ، ونسخ بيانات يدوياً لعمل استرجاع طلب واحد مالي، فأنت تفقد أموال ووقت شركتك بسرعة صاروخية.

![Analytics Dashboard|800x400](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200)

## ميزات اللوحات الإدارية المخصصة 

عندما نبني لوحات تحكم في (Asra3)، نعتمد على استراتيجية **البناء حول العملية**:
* **شاشات موحدة:** إذا كان الموظف يحتاج لسجل شراء الزبون، والشكاوي، وتتبع الشحنة، نضعهم في شاشة واحدة فورية.
* **إجراءات بنقرة واحدة:** عمليات معقدة (مثل تعليق حساب العميل، إلغاء الاشتراك، واسترجاع الدفعة، وإرسال ايميل) تُضغط في زر واحد مريح!
* **صلاحيات صافية الذهن:** يرى المحررون فقد شاشة مريحة بسيطة لكتابة المقالات، بدون أي إزعاج أو عناصر قوائم معقدة.

بناء لوحة تحكم مخصصة بتقنية حديثة يوفر مئات الساعات لموظفيك، ويُسدد تكلفة إنشائه بالكامل خلال أول شهرين من توفير الوقت والمال.
      `,
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
      projectId: null,
      tags: JSON.stringify(['SaaS', 'Admin', 'Productivity', 'UX/UI']),
      published: true,
      order: 5
    }
  ];

  console.log('📝 Creating blog posts...');
  for (const post of blogPosts) {
    await db.blogPost.create({ data: post });
  }

  console.log('✅ Blog seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
