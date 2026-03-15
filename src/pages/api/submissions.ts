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
    const res = await fetch(blobs[0].url);
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
