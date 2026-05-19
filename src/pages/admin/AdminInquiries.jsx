import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
});

export default function AdminInquiries() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showArchived, setShowArchived] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = (archived = false) => {
    setLoading(true);
    fetch(`${API}/api/admin/inquiries?archived=${archived}`, { headers: authHeader() })
      .then(r => r.json()).then(d => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(showArchived); }, [showArchived]);

  const markRead = async (id) => {
    await fetch(`${API}/api/admin/inquiries/${id}/read`, { method: 'PUT', headers: authHeader() });
    load(showArchived);
  };

  const archive = async (id) => {
    await fetch(`${API}/api/admin/inquiries/${id}/archive`, { method: 'PUT', headers: authHeader() });
    showToast('Archived.'); load(showArchived);
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    const res = await fetch(`${API}/api/admin/inquiries/${id}`, { method: 'DELETE', headers: authHeader() });
    if (res.ok) { showToast('Deleted.'); load(showArchived); }
  };

  const toggle = (id) => {
    setExpanded(p => p === id ? null : id);
    // auto mark as read when expanding
    const item = items.find(i => i._id === id);
    if (item && !item.isRead) markRead(id);
  };

  const formatDate = (d) => {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto', width: '100%', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif" }}>
      {toast && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 9999, background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '14px 20px', color: '#f1f5f9', fontSize: '14px', boxShadow: '0 8px 30px rgba(0,0,0,0.4)' }}>
          {toast}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 700, margin: 0 }}>Inquiries</h1>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>
            {items.length} {showArchived ? 'archived' : 'active'} — {items.filter(i => !i.isRead).length} unread
          </p>
        </div>
        <button
          onClick={() => setShowArchived(p => !p)}
          style={{
            background: showArchived ? 'rgba(27,94,150,0.2)' : 'rgba(255,255,255,0.06)',
            border: `1px solid ${showArchived ? '#1B5E96' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '10px', padding: '9px 18px',
            color: showArchived ? '#38bdf8' : '#94a3b8',
            fontSize: '13px', fontWeight: 500, cursor: 'pointer',
          }}
        >{showArchived ? '← Active Inquiries' : '📁 View Archived'}</button>
      </div>

      {loading ? <div style={{ color: '#64748b' }}>Loading…</div> : items.length === 0 ? (
        <div style={{ color: '#475569', textAlign: 'center', padding: '48px 0', fontSize: '15px' }}>
          No {showArchived ? 'archived' : 'active'} inquiries.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '10px' }}>
          {items.map(item => (
            <div key={item._id} style={{
              background: item.isRead ? 'rgba(255,255,255,0.03)' : 'rgba(27,94,150,0.07)',
              border: `1px solid ${item.isRead ? 'rgba(255,255,255,0.07)' : 'rgba(27,94,150,0.25)'}`,
              borderRadius: '14px', overflow: 'hidden',
            }}>
              {/* Header row */}
              <div
                onClick={() => toggle(item._id)}
                style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
              >
                <div style={{
                  width: '10px', height: '10px', minWidth: '10px', borderRadius: '50%',
                  background: item.isRead ? '#334155' : '#1B5E96',
                  boxShadow: item.isRead ? 'none' : '0 0 8px #1B5E96',
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2px' }}>
                    <span style={{ color: '#f1f5f9', fontWeight: item.isRead ? 500 : 700, fontSize: '15px' }}>{item.name}</span>
                    <span style={{ color: '#64748b', fontSize: '12px' }}>{item.email}</span>
                    {item.phone && <span style={{ color: '#64748b', fontSize: '12px' }}>· {item.phone}</span>}
                  </div>
                  <div style={{ color: '#64748b', fontSize: '12px' }}>{formatDate(item.createdAt)}</div>
                </div>
                <span style={{ color: '#475569', fontSize: '12px' }}>{expanded === item._id ? '▲' : '▼'}</span>
              </div>

              {/* Expanded content */}
              {expanded === item._id && (
                <div style={{ padding: '0 20px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  {item.subject && (
                    <div style={{ padding: '12px 0 8px' }}>
                      <span style={{ color: '#64748b', fontSize: '12px' }}>Subject: </span>
                      <span style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 600 }}>{item.subject}</span>
                    </div>
                  )}
                  <div style={{
                    background: 'rgba(255,255,255,0.04)', borderRadius: '10px',
                    padding: '14px 16px', marginBottom: '14px', marginTop: item.subject ? 0 : '12px',
                    color: '#94a3b8', fontSize: '14px', lineHeight: '1.7',
                  }}>
                    {item.message}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {!item.isRead && (
                      <button onClick={() => markRead(item._id)} style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '8px', padding: '7px 14px', color: '#34d399', fontSize: '13px', cursor: 'pointer' }}>
                        ✓ Mark Read
                      </button>
                    )}
                    {!showArchived && (
                      <button onClick={() => archive(item._id)} style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px', padding: '7px 14px', color: '#fbbf24', fontSize: '13px', cursor: 'pointer' }}>
                        📁 Archive
                      </button>
                    )}
                    <a href={`mailto:${item.email}`} style={{ background: 'rgba(27,94,150,0.12)', border: '1px solid rgba(27,94,150,0.25)', borderRadius: '8px', padding: '7px 14px', color: '#38bdf8', fontSize: '13px', textDecoration: 'none', display: 'inline-block' }}>
                      ✉ Reply
                    </a>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '8px', padding: '7px 14px', color: '#34d399', fontSize: '13px', textDecoration: 'none', display: 'inline-block' }}>
                        📞 Call
                      </a>
                    )}
                    <button onClick={() => deleteInquiry(item._id)} style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '7px 14px', color: '#f87171', fontSize: '13px', cursor: 'pointer', marginLeft: 'auto' }}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
