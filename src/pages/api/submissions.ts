import type { APIRoute } from 'astro';
import { list } from '@vercel/blob';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const { blobs } = await list({ prefix: 'submissions/' });
    if (blobs.length === 0) {
      return new Response(JSON.stringify([]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch each individual submission blob
    const submissions = await Promise.all(
      blobs.map(async (blob) => {
        const res = await fetch(blob.downloadUrl);
        return res.json();
      })
    );

    // Sort newest first
    submissions.sort((a, b) =>
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return new Response(JSON.stringify(submissions), {
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
