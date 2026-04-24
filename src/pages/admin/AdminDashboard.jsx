import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
});

function StatCard({ icon, label, value, color, sub }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      padding: '24px',
      display: 'flex', flexDirection: 'column', gap: '8px',
      boxShadow: `0 4px 20px ${color}10`,
    }}>
      <div style={{
        width: '44px', height: '44px',
        background: `${color}20`,
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px',
      }}>{icon}</div>
      <div style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 500 }}>{label}</div>
      <div style={{ color: '#f1f5f9', fontSize: '32px', fontWeight: 700, lineHeight: 1 }}>{value ?? '—'}</div>
      {sub && <div style={{ color: '#64748b', fontSize: '12px' }}>{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const { user } = useOutletContext();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/admin/stats`, { headers: authHeader() })
      .then(r => r.json())
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ color: '#f1f5f9', fontSize: '26px', fontWeight: 700, margin: 0 }}>
          Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '14px', margin: '6px 0 0' }}>
          Welcome back, <span style={{ color: '#38bdf8' }}>{user?.username}</span>. Here's what's happening.
        </p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div style={{ color: '#64748b', fontSize: '15px' }}>Loading stats…</div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '40px',
        }}>
          <StatCard icon="🗺️" label="Destinations" value={stats?.destinations} color="#1B5E96" />
          <StatCard icon="📦" label="Packages" value={stats?.packages} color="#0096c7" />
          <StatCard icon="⭐" label="Testimonials" value={stats?.testimonials} color="#f59e0b" />
          <StatCard icon="💬" label="Active Inquiries" value={stats?.inquiries} color="#10b981"
            sub={stats?.unreadInquiries ? `${stats.unreadInquiries} unread` : 'All read'} />
          <StatCard icon="🔔" label="Unread Inquiries" value={stats?.unreadInquiries} color="#ef4444" />
        </div>
      )}

      {/* Quick Links */}
      <div>
        <h2 style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            { href: '/admin/destinations', label: '+ Add Destination', color: '#1B5E96' },
            { href: '/admin/packages', label: '+ Add Package', color: '#0096c7' },
            { href: '/admin/testimonials', label: '+ Add Testimonial', color: '#f59e0b' },
            { href: '/admin/inquiries', label: 'View Inquiries', color: '#10b981' },
          ].map(({ href, label, color }) => (
            <a
              key={href}
              href={href}
              style={{
                display: 'inline-block',
                background: `${color}18`,
                border: `1px solid ${color}40`,
                color,
                borderRadius: '10px',
                padding: '10px 20px',
                fontSize: '14px', fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${color}30`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${color}18`; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
