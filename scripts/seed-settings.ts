import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const defaultSettings = [
  // Trusted By (Tech Stack)
  { key: 'trusted_heading_en', value: 'Technologies I work with' },
  { key: 'trusted_heading_ar', value: 'التقنيات التي أعمل بها' },
  { 
    key: 'trusted_tools_json', 
    value: JSON.stringify([
      { name: 'Next.js', icon: '⚡' },
      { name: 'React', icon: '⚛️' },
      { name: 'TypeScript', icon: '📘' },
      { name: 'Node.js', icon: '🟢' },
      { name: 'Python', icon: '🐍' },
      { name: 'n8n', icon: '🔗' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'Supabase', icon: '🔥' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'Redis', icon: '🔴' },
      { name: 'Prisma', icon: '💎' },
      { name: 'OpenAI', icon: '🤖' },
      { name: 'Stripe', icon: '💳' },
      { name: 'Make', icon: '🔧' },
      { name: 'Zapier', icon: '⚡' },
      { name: 'AWS', icon: '☁️' },
      { name: 'Vercel', icon: '▲' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Tailwind CSS', icon: '🎨' },
      { name: 'Framer Motion', icon: '🎞️' },
      { name: 'Figma', icon: '🖌️' },
      { name: 'GitHub', icon: '🐙' }
    ])
  },

  // Advantages (Why Me)
  { key: 'adv_sub_en', value: 'What You Get' },
  { key: 'adv_sub_ar', value: 'ما ستحصل عليه' },
  { key: 'adv_heading_en', value: 'Every Project Comes With' },
  { key: 'adv_heading_ar', value: 'كل مشروع يأتي مع' },
  { key: 'adv_heading_highlight_en', value: 'Real Value' },
  { key: 'adv_heading_highlight_ar', value: 'قيمة حقيقية' },
  { key: 'adv_desc_en', value: 'From quick automations to full-scale product builds \u2014 here\'s what\'s included in every engagement, tailored to the scope and complexity of your project.' },
  { key: 'adv_desc_ar', value: 'من الأتمتات السريعة إلى بناء المنتجات الكاملة \u2014 إليك ما يتضمنه كل تعاون، مصمم حسب نطاق وتعقيد مشروعك.' },

  // Advantage Tier 1 (Quick Solutions)
  { key: 'adv_tier1_name_en', value: 'Quick Solutions' },
  { key: 'adv_tier1_name_ar', value: 'حلول سريعة' },
  { key: 'adv_tier1_desc_en', value: 'For small automations and quick fixes' },
  { key: 'adv_tier1_desc_ar', value: 'للأتمتات البسيطة والإصلاحات السريعة' },
  { key: 'adv_tier1_features_en', value: 'Single automation workflow\nUp to 3 tool integrations\nBasic documentation\n1 round of revisions\nEmail support\n2-week delivery' },
  { key: 'adv_tier1_features_ar', value: 'أتمتة واحدة\nحتى ٣ تكاملات أدوات\nتوثيق أساسي\nجولة واحدة من المراجعات\nدعم بالبريد الإلكتروني\nتسليم خلال أسبوعين' },

  // Advantage Tier 2 (Full Build)
  { key: 'adv_tier2_name_en', value: 'Full Build' },
  { key: 'adv_tier2_name_ar', value: 'بناء كامل' },
  { key: 'adv_tier2_desc_en', value: 'For MVPs and multi-step automations' },
  { key: 'adv_tier2_desc_ar', value: 'لمنتجات MVP والأتمتات متعددة الخطوات' },
  { key: 'adv_tier2_features_en', value: 'Complete SaaS MVP or automation suite\nUp to 10 tool integrations\nFull API development\nAuthentication & billing setup\n3 rounds of revisions\nPriority Slack support\n4-6 week delivery\n30-day post-launch support' },
  { key: 'adv_tier2_features_ar', value: 'منتج SaaS MVP أو حزمة أتمتة كاملة\nحتى ١٠ تكاملات أدوات\nتطوير API كامل\nإعداد المصادقة والفوترة\n٣ جولات من المراجعات\nدعم Slack ذو أولوية\nتسليم خلال ٤-٦ أسابيع\nدعم ما بعد الإطلاق لمدة ٣٠ يوماً' },

  // Advantage Tier 3 (Enterprise Scale)
  { key: 'adv_tier3_name_en', value: 'Enterprise Scale' },
  { key: 'adv_tier3_name_ar', value: 'مقياس المؤسسات' },
  { key: 'adv_tier3_desc_en', value: 'Full-scale product development' },
  { key: 'adv_tier3_desc_ar', value: 'تطوير منتجات كامل' },
  { key: 'adv_tier3_features_en', value: 'Full product development\nUnlimited integrations\nCustom architecture design\nCI/CD pipeline setup\nPerformance optimization\nDedicated Slack channel\nWeekly strategy calls\nOngoing maintenance & support' },
  { key: 'adv_tier3_features_ar', value: 'تطوير منتج كامل\nتكاملات غير محدودة\nتصميم معمارية مخصص\nإعداد CI/CD\nتحسين الأداء\nقناة Slack مخصصة\nمكالمات استراتيجية أسبوعية\nصيانة ودعم مستمر' }
];

async function main() {
  console.log('Seeding missing SiteSettings...');
  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: {}, // Don't overwrite existing user changes
      create: { key: setting.key, value: setting.value },
    });
  }
  console.log('Done seeding!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
