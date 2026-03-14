export interface Channel {
  slug: string;
  label: string;
  icon: string;
  description: string;
}

export const channels: Channel[] = [
  {
    slug: 'print',
    label: 'Print',
    icon: 'print',
    description: 'Posters, newspaper ads, direct mail, and printed appeals.',
  },
  {
    slug: 'broadcast',
    label: 'Broadcast',
    icon: 'broadcast',
    description: 'Television spots, telethons, and live events.',
  },
  {
    slug: 'web',
    label: 'Web',
    icon: 'web',
    description: 'Donation pages, online forms, and web campaigns.',
  },
  {
    slug: 'mobile',
    label: 'Mobile',
    icon: 'mobile',
    description: 'Text-to-give, mobile apps, and tap-to-pay.',
  },
  {
    slug: 'social',
    label: 'Social',
    icon: 'social',
    description: 'Peer-to-peer campaigns, viral challenges, and social fundraising.',
  },
];

export function getChannelBySlug(slug: string): Channel | undefined {
  return channels.find((c) => c.slug === slug);
}
