import { useState, type FormEvent } from 'react';

interface FormData {
  orgName: string;
  year: string;
  imageUrl: string;
  notable: string;
  submitterName: string;
  submitterEmail: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const initialForm: FormData = {
  orgName: '',
  year: '',
  imageUrl: '',
  notable: '',
  submitterName: '',
  submitterEmail: '',
};

export default function SubmitForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<string[]>([]);

  function validate(): string[] {
    const errs: string[] = [];
    if (!form.orgName.trim()) errs.push('Organization name is required.');
    if (!form.year.trim()) errs.push('Year is required.');
    else if (isNaN(Number(form.year)) || Number(form.year) < 1800 || Number(form.year) > new Date().getFullYear() + 1) {
      errs.push('Please enter a valid year.');
    }
    if (!form.imageUrl.trim()) errs.push('Image URL is required.');
    if (!form.notable.trim()) errs.push('Please describe what makes this notable.');
    if (!form.submitterName.trim()) errs.push('Your name is required.');
    if (!form.submitterEmail.trim()) errs.push('Your email is required.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.submitterEmail)) {
      errs.push('Please enter a valid email address.');
    }
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');
    setErrors([]);

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orgName: form.orgName.trim(),
          year: Number(form.year),
          imageUrl: form.imageUrl.trim(),
          notable: form.notable.trim(),
          submitterName: form.submitterName.trim(),
          submitterEmail: form.submitterEmail.trim(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
        setErrors(data.errors || ['Something went wrong.']);
      }
    } catch {
      setStatus('error');
      setErrors(['Network error. Please try again.']);
    }
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors.length > 0) setErrors([]);
    if (status === 'error') setStatus('idle');
  }

  if (status === 'success') {
    return (
      <div className="border border-museum-border rounded-sm p-10 text-center">
        <h2
          className="text-2xl font-semibold mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Thank you
        </h2>
        <p className="text-museum-muted mb-6">
          Your artifact has been submitted. We will review it and add it to the museum.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-sm text-museum-accent hover:underline cursor-pointer"
        >
          Submit another
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 border border-museum-border rounded-sm text-sm bg-white text-museum-text placeholder:text-museum-muted/50 focus:outline-none focus:border-museum-text transition-colors';
  const labelClass = 'block text-sm font-medium mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.length > 0 && (
        <div className="border border-red-200 bg-red-50 rounded-sm p-4">
          {errors.map((err, i) => (
            <p key={i} className="text-sm text-red-700">
              {err}
            </p>
          ))}
        </div>
      )}

      <div>
        <label htmlFor="orgName" className={labelClass}>
          Organization name
        </label>
        <input
          id="orgName"
          type="text"
          value={form.orgName}
          onChange={(e) => handleChange('orgName', e.target.value)}
          placeholder="e.g. American Red Cross"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="year" className={labelClass}>
          Year
        </label>
        <input
          id="year"
          type="number"
          value={form.year}
          onChange={(e) => handleChange('year', e.target.value)}
          placeholder="e.g. 1998"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className={labelClass}>
          Image URL
        </label>
        <input
          id="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
        <p className="text-xs text-museum-muted mt-1.5">
          Link to a screenshot or scan of the artifact. Use Imgur, Wayback Machine, or similar.
        </p>
      </div>

      <div>
        <label htmlFor="notable" className={labelClass}>
          What makes this notable?
        </label>
        <textarea
          id="notable"
          value={form.notable}
          onChange={(e) => handleChange('notable', e.target.value)}
          placeholder="Why is this artifact worth preserving?"
          rows={3}
          className={inputClass}
          style={{ resize: 'vertical' }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="submitterName" className={labelClass}>
            Your name
          </label>
          <input
            id="submitterName"
            type="text"
            value={form.submitterName}
            onChange={(e) => handleChange('submitterName', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="submitterEmail" className={labelClass}>
            Your email
          </label>
          <input
            id="submitterEmail"
            type="email"
            value={form.submitterEmail}
            onChange={(e) => handleChange('submitterEmail', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full px-6 py-3 bg-museum-text text-white text-sm font-medium tracking-wide rounded-sm hover:bg-museum-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      >
        {status === 'submitting' ? 'Submitting...' : 'Submit Artifact'}
      </button>
    </form>
  );
}
