import type { APIRoute } from 'astro';
import { list } from '@vercel/blob';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const { blobs } = await list({ prefix: 'submissions.json' });
    if (blobs.length === 0) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    // Use downloadUrl for private stores (includes auth token)
    const downloadUrl = blobs[0].downloadUrl;
    const res = await fetch(downloadUrl);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Submissions read error:', message);
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
