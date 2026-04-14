import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const NAV_ITEMS = [
  { to: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
  { to: '/admin/destinations', icon: '🗺️', label: 'Destinations' },
  { to: '/admin/packages', icon: '📦', label: 'Packages' },
  { to: '/admin/testimonials', icon: '⭐', label: 'Testimonials' },
  { to: '/admin/inquiries', icon: '💬', label: 'Inquiries' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) { navigate('/admin/login'); return; }
    fetch(`${API}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) { localStorage.removeItem('admin_token'); navigate('/admin/login'); }
        else setUser(data);
      })
      .catch(() => { localStorage.removeItem('admin_token'); navigate('/admin/login'); });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  if (!user) {
    return (
      <div style={{
        minHeight: '100vh', background: '#0f172a',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Inter', sans-serif", color: '#64748b', fontSize: '15px'
      }}>
        Authenticating…
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', minHeight: '100vh',
      background: '#0f172a', fontFamily: "'Inter', sans-serif",
    }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '240px' : '72px',
        minWidth: sidebarOpen ? '240px' : '72px',
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column',
        transition: 'width 0.3s ease, min-width 0.3s ease',
        overflow: 'hidden',
        zIndex: 50,
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '20px 16px', display: 'flex', alignItems: 'center',
          gap: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)',
          minHeight: '72px',
        }}>
          <div style={{
            width: '36px', height: '36px', minWidth: '36px',
            background: 'linear-gradient(135deg, #0077BE, #00b4d8)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px', flexShrink: 0,
          }}>✈️</div>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden' }}>
              <div style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '14px', whiteSpace: 'nowrap' }}>
                Infinity Travel
              </div>
              <div style={{ color: '#475569', fontSize: '11px', whiteSpace: 'nowrap' }}>Admin Panel</div>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(p => !p)}
            style={{
              marginLeft: 'auto', background: 'rgba(255,255,255,0.06)',
              border: 'none', borderRadius: '8px',
              width: '28px', height: '28px', cursor: 'pointer',
              color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}
          >{sidebarOpen ? '◀' : '▶'}</button>
        </div>

        {/* Nav Links */}
        <nav style={{ padding: '12px 8px', flex: 1 }}>
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 12px',
                borderRadius: '10px',
                marginBottom: '4px',
                textDecoration: 'none',
                fontSize: '14px', fontWeight: 500,
                whiteSpace: 'nowrap',
                background: isActive ? 'rgba(0,119,190,0.18)' : 'transparent',
                color: isActive ? '#38bdf8' : '#94a3b8',
                borderLeft: isActive ? '2px solid #0077BE' : '2px solid transparent',
                transition: 'all 0.15s',
              })}
            >
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
              {sidebarOpen && label}
            </NavLink>
          ))}
        </nav>

        {/* User info + logout */}
        <div style={{
          padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {sidebarOpen && (
            <div style={{ padding: '8px 12px', marginBottom: '8px' }}>
              <div style={{ color: '#f1f5f9', fontSize: '13px', fontWeight: 600 }}>{user.username}</div>
              <div style={{ color: '#475569', fontSize: '11px' }}>{user.role}</div>
            </div>
          )}
          <button
            onClick={handleLogout}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              width: '100%', padding: '10px 12px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.2)',
              borderRadius: '10px',
              color: '#f87171', fontSize: '14px', fontWeight: 500,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: '16px', flexShrink: 0 }}>🚪</span>
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main content area */}
      <main style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}
