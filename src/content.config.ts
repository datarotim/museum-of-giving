import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const exhibits = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/exhibits' }),
  schema: z.object({
    title: z.string(),
    org: z.string(),
    year: z.number(),
    month: z.number().optional(),
    room: z.enum([
      'posters-and-appeals',
      'direct-mail',
      'screens-and-satellites',
      'the-first-click',
      'social-and-viral',
      'the-intelligent-form',
    ]),
    channels: z.array(
      z.enum(['print', 'broadcast', 'web', 'mobile', 'social'])
    ),
    frameStyle: z.enum([
      'ornate',
      'newsprint',
      'envelope',
      'crt-tv',
      'netscape',
      'ie',
      'firefox',
      'chrome',
      'iphone',
      'sms-bubble',
      'modern',
    ]),
    image: z.string().optional(),
    videoId: z.string().optional(),
    notable: z.string(),
    sourceUrl: z.string().optional(),
    sourceAttribution: z.string().optional(),
    country: z.string().default('US'),
    tags: z.array(z.string()).optional(),
    community: z.boolean().default(false),
  }),
});

export const collections = { exhibits };
