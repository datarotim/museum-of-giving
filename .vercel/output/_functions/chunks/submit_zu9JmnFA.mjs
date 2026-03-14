import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const prerender = false;
const __dirname$1 = dirname(fileURLToPath(import.meta.url));
const SUBMISSIONS_PATH = join(__dirname$1, "..", "..", "data", "submissions.json");
async function readSubmissions() {
  try {
    const data = await readFile(SUBMISSIONS_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}
async function writeSubmissions(submissions) {
  await mkdir(dirname(SUBMISSIONS_PATH), { recursive: true });
  await writeFile(SUBMISSIONS_PATH, JSON.stringify(submissions, null, 2), "utf-8");
}
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const { orgName, year, imageUrl, notable, submitterName, submitterEmail } = body;
    const errors = [];
    if (!orgName || typeof orgName !== "string") errors.push("orgName is required");
    if (!year || typeof year !== "number") errors.push("year is required and must be a number");
    if (!imageUrl || typeof imageUrl !== "string") errors.push("imageUrl is required");
    if (!notable || typeof notable !== "string") errors.push("notable is required");
    if (!submitterName || typeof submitterName !== "string") errors.push("submitterName is required");
    if (!submitterEmail || typeof submitterEmail !== "string") errors.push("submitterEmail is required");
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ success: false, errors }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const submission = {
      orgName: orgName.trim(),
      year,
      imageUrl: imageUrl.trim(),
      notable: notable.trim(),
      submitterName: submitterName.trim(),
      submitterEmail: submitterEmail.trim(),
      submittedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const submissions = await readSubmissions();
    submissions.push(submission);
    await writeSubmissions(submissions);
    return new Response(
      JSON.stringify({ success: true, message: "Submission received. Thank you!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ success: false, errors: ["Invalid request body"] }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
