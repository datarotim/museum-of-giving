import type { APIRoute } from 'astro';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const prerender = false;

interface Submission {
  orgName: string;
  year: number;
  imageUrl: string;
  notable: string;
  submitterName: string;
  submitterEmail: string;
  submittedAt: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
const SUBMISSIONS_PATH = join(__dirname, '..', '..', 'data', 'submissions.json');

async function readSubmissions(): Promise<Submission[]> {
  try {
    const data = await readFile(SUBMISSIONS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeSubmissions(submissions: Submission[]): Promise<void> {
  await mkdir(dirname(SUBMISSIONS_PATH), { recursive: true });
  await writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2), 'utf-8');
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const { orgName, year, imageUrl, notable, submitterName, submitterEmail } = body;

    // Validate required fields
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

    const submission: Submission = {
      orgName: orgName.trim(),
      year,
      imageUrl: imageUrl.trim(),
      notable: notable.trim(),
      submitterName: submitterName.trim(),
      submitterEmail: submitterEmail.trim(),
      submittedAt: new Date().toISOString(),
    };

    const submissions = await readSubmissions();
    submissions.push(submission);
    await writeSubmissions(submissions);

    return new Response(
      JSON.stringify({ success: true, message: 'Submission received. Thank you!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, errors: ['Invalid request body'] }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
