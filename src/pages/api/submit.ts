import type { APIRoute } from 'astro';
import { put } from '@vercel/blob';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { orgName, year, imageUrl, notable, submitterName, submitterEmail } = body;

    const errors: string[] = [];
    if (!orgName || typeof orgName !== 'string') errors.push('orgName is required');
    if (!year || typeof year !== 'number') errors.push('year is required and must be a number');
    if (!imageUrl || typeof imageUrl !== 'string') errors.push('imageUrl is required');
    if (!notable || typeof notable !== 'string') errors.push('notable is required');
    if (!submitterName || typeof submitterName !== 'string') errors.push('submitterName is required');
    if (!submitterEmail || typeof submitterEmail !== 'string') errors.push('submitterEmail is required');

    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ success: false, errors }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const submission = {
      orgName: orgName.trim(),
      year,
      imageUrl: imageUrl.trim(),
      notable: notable.trim(),
      submitterName: submitterName.trim(),
      submitterEmail: submitterEmail.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Store each submission as its own blob with a unique name
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    await put(`submissions/${id}.json`, JSON.stringify(submission), {
      access: 'private',
      addRandomSuffix: false,
    });

    return new Response(
      JSON.stringify({ success: true, message: 'Submission received. Thank you!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Submit API error:', message);
    return new Response(
      JSON.stringify({ success: false, errors: [message] }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
