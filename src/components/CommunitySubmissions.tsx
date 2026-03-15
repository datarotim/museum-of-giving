import { useState, useEffect } from 'react';

interface Submission {
  orgName: string;
  year: number;
  imageUrl: string;
  notable: string;
  submitterName: string;
  submittedAt: string;
}

export default function CommunitySubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/submissions')
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <p className="text-sm" style={{ color: 'var(--color-museum-muted)' }}>Loading submissions...</p>
      </div>
    );
  }

  if (submissions.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-16">
      {submissions.map((sub, i) => (
        <article key={i} className="border rounded-sm overflow-hidden" style={{ borderColor: 'var(--color-museum-border)' }}>
          <div className="aspect-video overflow-hidden bg-gray-100">
            <img
              src={sub.imageUrl}
              alt={`${sub.orgName}, ${sub.year}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
          <div className="p-4">
            <div className="flex items-baseline justify-between gap-2 mb-2">
              <span className="text-sm font-semibold" style={{ color: 'var(--color-museum-text)' }}>
                {sub.orgName}
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--color-museum-muted)' }}>
                {sub.year}
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-museum-muted)' }}>
              {sub.notable}
            </p>
            <p className="text-xs" style={{ color: 'var(--color-museum-muted)', opacity: 0.6 }}>
              Submitted by {sub.submitterName}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
