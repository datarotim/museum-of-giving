export interface Room {
  slug: string;
  title: string;
  era: string;
  description: string;
  order: number;
}

export const rooms: Room[] = [
  {
    slug: 'posters-and-appeals',
    title: 'Posters & Appeals',
    era: '1900–1949',
    description: 'From war bonds to charity cards — when giving meant answering a public call.',
    order: 1,
  },
  {
    slug: 'direct-mail',
    title: 'Direct Mail Revolution',
    era: '1950–1979',
    description: 'The letter that changed everything. Personalized asks arrived in your mailbox.',
    order: 2,
  },
  {
    slug: 'screens-and-satellites',
    title: 'Screens & Satellites',
    era: '1980–1995',
    description: 'Television turned compassion into prime-time entertainment.',
    order: 3,
  },
  {
    slug: 'the-first-click',
    title: 'The First Click',
    era: '1996–2005',
    description: 'In 1996, the Red Cross put a donation form on the internet. It looked like an e-commerce checkout. Many still do.',
    order: 4,
  },
  {
    slug: 'social-and-viral',
    title: 'Social & Viral',
    era: '2006–2015',
    description: 'Giving went social. Ice buckets, birthday fundraisers, and the share button.',
    order: 5,
  },
  {
    slug: 'the-intelligent-form',
    title: 'The Intelligent Form',
    era: '2016–Present',
    description: 'AI-optimized asks, crypto donations, and forms that know you before you type.',
    order: 6,
  },
];

export function getRoomBySlug(slug: string): Room | undefined {
  return rooms.find((r) => r.slug === slug);
}
