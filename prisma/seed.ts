import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  console.log('🌱 Seeding database...');

  // Clean existing data
  await prisma.project.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.service.deleteMany();
  await prisma.fAQ.deleteMany();
  await prisma.siteSetting.deleteMany();

  // Site Settings
  const settings = [
    { key: 'site_name', value: 'asra3.com' },
    { key: 'site_tagline', value: 'SaaS & Automation Solutions' },
    { key: 'hero_title', value: 'I Build SaaS Products & Automation That Scale' },
    { key: 'hero_subtitle', value: 'From idea to launch — I help startups and businesses ship production-ready SaaS applications and intelligent workflow automations that save hundreds of hours and drive real revenue growth.' },
    { key: 'hero_stat_1_value', value: '50+' },
    { key: 'hero_stat_1_label', value: 'Projects Delivered' },
    { key: 'hero_stat_2_value', value: '98%' },
    { key: 'hero_stat_2_label', value: 'Client Satisfaction' },
    { key: 'hero_stat_3_value', value: '3x' },
    { key: 'hero_stat_3_label', value: 'Faster Time-to-Market' },
    { key: 'hero_stat_4_value', value: '$2M+' },
    { key: 'hero_stat_4_label', value: 'Revenue Generated' },
    { key: 'contact_email', value: 'hello@asra3.com' },
    { key: 'admin_password', value: 'admin123' },
  ];

  await prisma.siteSetting.createMany({ data: settings });

  // Services
  const services = [
    {
      iconName: 'Code2',
      title: 'SaaS Development',
      description: 'Full-stack SaaS applications built from scratch — auth, billing, dashboards, APIs, and more. I handle the entire lifecycle from MVP to production-scale, so you can focus on your business.',
      features: JSON.stringify(['Multi-tenant Architecture', 'Subscription Billing', 'Admin Dashboards', 'API Development']),
      order: 1,
    },
    {
      iconName: 'Workflow',
      title: 'Workflow Automation',
      description: 'Intelligent automations that eliminate repetitive tasks and streamline your operations. From lead capture pipelines to data synchronization — I connect your tools and build seamless workflows.',
      features: JSON.stringify(['Process Automation', 'Data Sync & Migration', 'Email Sequences', 'Webhook Integrations']),
      order: 2,
    },
    {
      iconName: 'Puzzle',
      title: 'API Integrations',
      description: 'Connect any tools in your stack with custom API integrations. I work with REST, GraphQL, and webhook-based APIs to build reliable, secure data flows between your favorite platforms.',
      features: JSON.stringify(['REST & GraphQL APIs', 'Third-party Connectors', 'Custom Webhooks', 'Rate Limiting & Security']),
      order: 3,
    },
    {
      iconName: 'Rocket',
      title: 'MVP & Product Launch',
      description: 'Rapid prototyping and MVP development for startups. I help you validate ideas fast with lean, scalable codebases that are ready for growth from day one — no technical debt included.',
      features: JSON.stringify(['Rapid Prototyping', 'Lean Architecture', 'Launch Strategy', 'Iterative Development']),
      order: 4,
    },
  ];

  for (const s of services) {
    await prisma.service.create({ data: s });
  }

  // Projects
  const projects = [
    {
      title: 'SubscriptionFlow',
      category: 'SaaS Platform',
      description: 'A complete subscription management platform with multi-tenant architecture, Stripe billing, usage analytics, and a customer portal. Built for a fintech startup from MVP to production.',
      imageUrl: '',
      metrics: JSON.stringify([
        { icon: 'Users', value: '10K+', label: 'Active Users' },
        { icon: 'DollarSign', value: '$50K/mo', label: 'MRR' },
        { icon: 'Clock', value: '8 weeks', label: 'Build Time' },
      ]),
      tags: JSON.stringify(['Next.js', 'PostgreSQL', 'Stripe', 'AWS']),
      color: 'from-emerald-500/20 to-teal-500/20',
      featured: true,
      order: 1,
    },
    {
      title: 'AutoPilot CRM',
      category: 'Automation System',
      description: 'Intelligent CRM automation that captures leads from multiple channels, scores them with AI, and triggers personalized outreach sequences. Reduced manual work by 80%.',
      imageUrl: '',
      metrics: JSON.stringify([
        { icon: 'Clock', value: '80%', label: 'Time Saved' },
        { icon: 'BarChart3', value: '3x', label: 'Conversion Rate' },
        { icon: 'Users', value: '25+', label: 'Teams Using' },
      ]),
      tags: JSON.stringify(['Node.js', 'Make', 'SendGrid', 'MongoDB']),
      color: 'from-teal-500/20 to-cyan-500/20',
      featured: true,
      order: 2,
    },
    {
      title: 'DataSync Hub',
      category: 'API Integration',
      description: 'A real-time data synchronization platform connecting Shopify, HubSpot, and QuickBooks. Automated inventory, customer, and financial data sync across all platforms.',
      imageUrl: '',
      metrics: JSON.stringify([
        { icon: 'Clock', value: '40hrs/mo', label: 'Manual Work Saved' },
        { icon: 'BarChart3', value: '99.9%', label: 'Uptime' },
        { icon: 'DollarSign', value: '$15K/yr', label: 'Cost Reduction' },
      ]),
      tags: JSON.stringify(['Python', 'REST APIs', 'Webhooks', 'Redis']),
      color: 'from-emerald-600/20 to-green-500/20',
      featured: true,
      order: 3,
    },
  ];

  for (const p of projects) {
    await prisma.project.create({ data: p });
  }

  // Testimonials
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'CEO, TechForward',
      content: 'Working with this developer was a game-changer for our startup. They built our entire SaaS platform from scratch in just 8 weeks — authentication, billing, dashboards, everything. The code quality is exceptional and the architecture is scalable enough for our next phase of growth.',
      rating: 5,
      order: 1,
    },
    {
      name: 'James Rodriguez',
      role: 'COO, ScaleOps',
      content: 'The automation workflows they built saved our operations team over 40 hours per week. From lead routing to data sync across our CRM and accounting tools, everything runs seamlessly now. The ROI was visible within the first month.',
      rating: 5,
      order: 2,
    },
    {
      name: 'Emily Chen',
      role: 'Founder, GrowthLab',
      content: 'We needed a custom API integration between Shopify, HubSpot, and our internal systems. The solution was delivered ahead of schedule, with thorough documentation and clean, maintainable code. Communication was excellent throughout.',
      rating: 5,
      order: 3,
    },
    {
      name: 'Michael Foster',
      role: 'CTO, DataPipe',
      content: "I've worked with many freelancers over the years, and this developer stands out. Their technical expertise is deep, their communication is clear, and they deliver on time every single sprint. They built our data pipeline automation that processes millions of records daily.",
      rating: 5,
      order: 4,
    },
    {
      name: 'Lisa Park',
      role: 'VP Product, NovaPay',
      content: 'From the initial discovery call to the final launch, the process was smooth and transparent. They took our messy requirements and turned them into a clear, well-structured project plan. The MVP they delivered exceeded our expectations.',
      rating: 5,
      order: 5,
    },
    {
      name: 'David Kim',
      role: 'Founder, AutomateHQ',
      content: 'They built a complete workflow automation platform for our agency that handles client onboarding, project tracking, invoicing, and reporting. It replaced 5 different tools we were using. This is not just a coder — this is a true technology partner.',
      rating: 5,
      order: 6,
    },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({ data: t });
  }

  // FAQs
  const faqs = [
    {
      question: 'What types of SaaS projects do you work on?',
      answer: 'I work on a wide range of SaaS projects, from early-stage MVPs for startups to scaling production applications. This includes subscription-based platforms, marketplace applications, analytics dashboards, internal tools, and B2B/B2C products.',
      order: 1,
    },
    {
      question: 'How do your automation projects work?',
      answer: 'My automation projects typically start with a thorough analysis of your current workflows to identify bottlenecks and repetitive tasks. I then design and implement automated solutions using tools like Make, Zapier, custom scripts, and API integrations.',
      order: 2,
    },
    {
      question: 'What is your typical project timeline?',
      answer: 'Timelines vary based on project scope. A simple automation workflow can be delivered in 1-2 weeks. An MVP SaaS product typically takes 4-8 weeks. Larger, more complex projects can take 8-16 weeks.',
      order: 3,
    },
    {
      question: 'Do you provide ongoing support after launch?',
      answer: 'Yes, absolutely. All my projects come with post-launch support. The Starter package includes 1 week of support, Growth includes 30 days, and Enterprise includes ongoing maintenance as part of the retainer.',
      order: 4,
    },
    {
      question: 'How do payments and contracts work?',
      answer: 'I work with a simple, transparent process. After our discovery call and project scoping, I provide a detailed proposal with clear deliverables, timeline, and cost breakdown. Payment is typically structured in milestones.',
      order: 5,
    },
    {
      question: 'Can you work with my existing tech stack?',
      answer: 'In most cases, yes. I am proficient in a wide range of technologies and frameworks including React, Next.js, Node.js, Python, PostgreSQL, MongoDB, AWS, Google Cloud, and more.',
      order: 6,
    },
    {
      question: 'What does the discovery call include?',
      answer: 'The discovery call is a free 30-minute consultation where we discuss your business goals, project requirements, and technical needs. By the end of the call, you will have a clear understanding of how I can help.',
      order: 7,
    },
    {
      question: 'Do you sign NDAs?',
      answer: 'Yes, I am happy to sign NDAs and any other confidentiality agreements before we discuss your project details. I take data security and client confidentiality very seriously.',
      order: 8,
    },
  ];

  for (const f of faqs) {
    await prisma.fAQ.create({ data: f });
  }

  console.log('✅ Seed completed!');
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
