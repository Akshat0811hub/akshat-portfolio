import React, { useState, useEffect } from 'react';
import { Lock, ArrowLeft, RefreshCw, Trash2, Mail, Phone, CheckCircle2 } from 'lucide-react';

export default function AdminDashboard({ onBack }) {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchLeads = async (pwd = password) => {
    setLoading(true);
    setError('');
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/admin/leads`, {
        headers: {
          Authorization: `Bearer ${pwd}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Invalid admin password');
      }
      setLeads(data.leads || []);
      setAuthenticated(true);
    } catch (err) {
      // Check if user is using default password in static/offline preview
      if (pwd === 'akshat-studio-admin-2026' && err.message.includes('Failed to fetch')) {
        const local = JSON.parse(localStorage.getItem('akshat_offline_leads') || '[]');
        setLeads(local);
        setAuthenticated(true);
      } else {
        setError(err.message || 'Authentication failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetchLeads(password);
  };

  const handleStatusChange = async (id, status) => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiBase}/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setLeads((prev) => prev.map((l) => (l._id === id ? { ...l, status } : l)));
      }
    } catch {
      // Update offline lead fallback
      const updated = leads.map((l) => (l._id === id ? { ...l, status } : l));
      setLeads(updated);
      localStorage.setItem('akshat_offline_leads', JSON.stringify(updated));
    }
  };

  const handleDelete = async (id) => {
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      await fetch(`${apiBase}/api/admin/leads/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${password}` },
      });
    } catch {
      // ignore
    }
    const filtered = leads.filter((l) => l._id !== id);
    setLeads(filtered);
    localStorage.setItem('akshat_offline_leads', JSON.stringify(filtered));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <section className="min-h-screen bg-bg-primary pt-28 pb-20 px-4 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-secondary px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text-primary hover:border-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </button>
          <span className="font-mono text-xs text-accent">// LEAD MANAGEMENT CONSOLE</span>
        </div>

        {!authenticated ? (
          <div className="mx-auto max-w-md rounded-3xl border border-border-subtle bg-bg-secondary p-8 shadow-2xl mt-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent mb-4">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl font-bold text-text-primary">
              Studio Admin Access
            </h1>
            <p className="mt-2 text-xs text-text-secondary">
              Enter your <code className="text-accent">ADMIN_PASSWORD</code> from{' '}
              <code>backend/.env</code> (Default dev password:{' '}
              <code className="text-text-primary">akshat-studio-admin-2026</code>)
            </p>

            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <input
                type="password"
                required
                placeholder="Enter admin password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-border-subtle bg-bg-primary px-4 py-3 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {error && <p className="text-xs text-rose-400">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-accent py-3 text-xs font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent-hover"
              >
                {loading ? 'Verifying...' : 'Unlock Leads Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-border-subtle bg-bg-secondary p-6">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                  Captured Project Inquiries ({leads.length})
                </h1>
                <p className="font-mono text-xs text-text-secondary mt-1">
                  Synced with MongoDB Atlas / Local Persistent Store
                </p>
              </div>
              <button
                type="button"
                onClick={() => fetchLeads(password)}
                className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-bg-primary px-4 py-2 font-mono text-xs text-text-primary hover:border-accent"
              >
                <RefreshCw className="h-3.5 w-3.5 text-accent" />
                <span>Refresh</span>
              </button>
            </div>

            {leads.length === 0 ? (
              <div className="rounded-3xl border border-border-subtle bg-bg-secondary p-12 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-accent mb-3" />
                <h2 className="font-display text-xl font-bold text-text-primary">
                  No leads submitted yet
                </h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Submit a test inquiry in the Contact form to see it appear here in real time.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {leads.map((lead) => (
                  <div
                    key={lead._id}
                    className="rounded-3xl border border-border-subtle bg-bg-secondary p-6 transition hover:border-accent/50"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border-subtle pb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="font-display text-xl font-bold text-text-primary">
                            {lead.name}
                          </h3>
                          <span className="rounded-full bg-accent/15 px-3 py-0.5 font-mono text-xs font-semibold text-accent">
                            {lead.budget}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-4 font-mono text-xs text-text-secondary">
                          <a
                            href={`mailto:${lead.email}`}
                            className="inline-flex items-center gap-1 hover:text-accent"
                          >
                            <Mail className="h-3.5 w-3.5" />
                            {lead.email}
                          </a>
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="inline-flex items-center gap-1 hover:text-accent"
                            >
                              <Phone className="h-3.5 w-3.5" />
                              {lead.phone}
                            </a>
                          )}
                          {lead.company && <span>Company: {lead.company}</span>}
                          <span>
                            {new Date(lead.createdAt).toLocaleString('en-IN', {
                              timeZone: 'Asia/Kolkata',
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          aria-label="Lead Status"
                          value={lead.status || 'new'}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          className="rounded-xl border border-border-subtle bg-bg-primary px-3 py-1.5 font-mono text-xs text-text-primary"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in-discussion">In Discussion</option>
                          <option value="archived">Archived</option>
                        </select>
                        <button
                          type="button"
                          onClick={() => handleDelete(lead._id)}
                          aria-label="Delete lead"
                          className="flex h-8 w-8 items-center justify-center rounded-xl border border-border-subtle bg-bg-primary text-rose-400 hover:border-rose-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {(lead.services || []).map((srv) => (
                        <span
                          key={srv}
                          className="rounded-lg border border-border-subtle bg-bg-primary px-2.5 py-1 font-mono text-[11px] text-accent"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>

                    <p className="mt-4 rounded-2xl bg-bg-primary p-4 text-sm text-text-primary whitespace-pre-wrap">
                      {lead.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
