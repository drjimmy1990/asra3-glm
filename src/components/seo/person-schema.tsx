const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://asra3.com';

/**
 * Person schema for the homepage.
 * Tells Google this site belongs to a specific person with defined skills.
 * Enables Knowledge Panel eligibility and improves E-E-A-T signals.
 */
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'asra3.com',
    url: BASE_URL,
    jobTitle: 'SaaS Developer & Automation Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'asra3.com',
      url: BASE_URL,
    },
    knowsAbout: [
      'SaaS Development',
      'Business Automation',
      'AI Integration',
      'Full-Stack Web Development',
      'API Development',
      'Workflow Automation',
      'MVP Development',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Developer',
      occupationLocation: {
        '@type': 'Country',
        name: 'Saudi Arabia',
      },
      description: 'Building high-performance SaaS products and intelligent automation solutions.',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
