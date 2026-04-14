import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
});

const EMPTY = {
  name: '', location: '', avatar: '', quote: '',
  rating: 5, travelDate: '', destination: '', isActive: true,
};

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', padding: '10px 14px',
  color: '#f1f5f9', fontSize: '14px', outline: 'none',
};
const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '6px' };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = () => {
    setLoading(true);
    Promise.all([
      fetch(`${API}/api/admin/testimonials`, { headers: authHeader() }).then(r => r.json()),
      fetch(`${API}/api/admin/destinations`, { headers: authHeader() }).then(r => r.json()),
    ]).then(([tests, dests]) => {
      setItems(tests); setDestinations(dests); setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setModal('create'); };
  const openEdit = (item) => {
    setForm({
      name: item.name || '', location: item.location || '',
      avatar: item.avatar || '', quote: item.quote || '',
      rating: item.rating || 5, travelDate: item.travelDate || '',
      destination: item.destination?._id || item.destination || '',
      isActive: item.isActive !== false,
    });
    setEditId(item._id); setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const payload = { ...form, rating: Number(form.rating), destination: form.destination || undefined };
    try {
      const url = editId ? `${API}/api/admin/testimonials/${editId}` : `${API}/api/admin/testimonials`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify(payload) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
      showToast(editId ? 'Testimonial updated!' : 'Testimonial created!');
      setModal(null); load();
    } catch (err) { showToast('Error: ' + err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return;
    const res = await fetch(`${API}/api/admin/testimonials/${id}`, { method: 'DELETE', headers: authHeader() });
    if (res.ok) { showToast('Deleted.'); load(); }
    else showToast('Delete failed.');
  };

  const f = (key, val) => setForm(p => ({ ...p, [key]: val }));

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif" }}>
      {toast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px', padding: '14px 20px', color: '#f1f5f9', fontSize: '14px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
        }}>{toast}</div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 700, margin: 0 }}>Testimonials</h1>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>{items.length} testimonials</p>
        </div>
        <button onClick={openCreate} style={{ background: 'linear-gradient(135deg, #0077BE, #0096c7)', border: 'none', borderRadius: '10px', padding: '10px 20px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,119,190,0.4)' }}>
          + New Testimonial
        </button>
      </div>

      {loading ? <div style={{ color: '#64748b' }}>Loading…</div> : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {items.map(item => (
            <div key={item._id} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '18px 24px',
              display: 'flex', alignItems: 'flex-start', gap: '16px',
            }}>
              <div style={{ width: '44px', height: '44px', minWidth: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #0077BE, #0096c7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', color: '#fff', fontWeight: 700 }}>
                {item.avatar ? <img src={item.avatar} alt={item.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }} /> : item.name?.[0]}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '15px' }}>{item.name}</span>
                  <span style={{ color: '#f59e0b', fontSize: '12px' }}>{'★'.repeat(item.rating)}</span>
                  {!item.isActive && <span style={{ background: '#ef444420', color: '#f87171', borderRadius: '6px', padding: '2px 8px', fontSize: '11px' }}>Inactive</span>}
                </div>
                <div style={{ color: '#64748b', fontSize: '13px', marginBottom: '4px' }}>
                  {item.location} {item.destination?.name ? `· ${item.destination.name}` : ''} {item.travelDate ? `· ${item.travelDate}` : ''}
                </div>
                <div style={{ color: '#94a3b8', fontSize: '13px', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  "{item.quote}"
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => openEdit(item)} style={{ background: 'rgba(0,119,190,0.12)', border: '1px solid rgba(0,119,190,0.25)', borderRadius: '8px', padding: '7px 14px', color: '#38bdf8', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(item._id, item.name)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '7px 14px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '560px', maxHeight: '85vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 700, margin: 0 }}>
                {modal === 'create' ? 'New Testimonial' : 'Edit Testimonial'}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', width: '32px', height: '32px', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div><label style={labelStyle}>Name *</label><input value={form.name} onChange={e => f('name', e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Location</label><input value={form.location} onChange={e => f('location', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Avatar URL</label><input value={form.avatar} onChange={e => f('avatar', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Travel Date</label><input value={form.travelDate} onChange={e => f('travelDate', e.target.value)} placeholder="e.g. March 2024" style={inputStyle} /></div>
                <div>
                  <label style={labelStyle}>Rating</label>
                  <select value={form.rating} onChange={e => f('rating', Number(e.target.value))} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} ★</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Destination</label>
                  <select value={form.destination} onChange={e => f('destination', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">— None —</option>
                    {destinations.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                  </select>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Quote *</label>
                  <textarea value={form.quote} onChange={e => f('quote', e.target.value)} required rows={4} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isActive} onChange={e => f('isActive', e.target.checked)} /> Active
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 20px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ background: 'linear-gradient(135deg, #0077BE, #0096c7)', border: 'none', borderRadius: '10px', padding: '10px 24px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
