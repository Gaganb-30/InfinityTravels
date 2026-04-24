import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
});

const EMPTY = {
  name: '', slug: '', country: '', continent: '', category: 'Domestic', tier: 'Premium',
  tagline: '', description: '', type: 'Beach',
  heroImage: '', galleryImages: '', seasons: '', isFeatured: false, isActive: true,
};

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', padding: '10px 14px',
  color: '#f1f5f9', fontSize: '14px', outline: 'none',
};
const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '6px' };

export default function AdminDestinations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'create' | 'edit'
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const load = () => {
    setLoading(true);
    fetch(`${API}/api/admin/destinations`, { headers: authHeader() })
      .then(r => r.json()).then(d => { setItems(d); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setModal('create'); };
  const openEdit = (item) => {
    setForm({
      ...item,
      seasons: (item.seasons || []).join(', '),
      galleryImages: (item.galleryImages || []).join('\n'),
    });
    setEditId(item._id);
    setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const payload = {
      ...form,
      seasons: form.seasons ? form.seasons.split(',').map(s => s.trim()).filter(Boolean) : [],
      galleryImages: form.galleryImages ? form.galleryImages.split('\n').map(s => s.trim()).filter(Boolean) : [],
    };
    try {
      const url = editId
        ? `${API}/api/admin/destinations/${editId}`
        : `${API}/api/admin/destinations`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify(payload) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
      showToast(editId ? 'Destination updated!' : 'Destination created!');
      setModal(null); load();
    } catch (err) { showToast('Error: ' + err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    const res = await fetch(`${API}/api/admin/destinations/${id}`, { method: 'DELETE', headers: authHeader() });
    if (res.ok) { showToast('Deleted.'); load(); }
    else showToast('Delete failed.');
  };

  const f = (key, val) => setForm(p => ({ ...p, [key]: val }));

  return (
    <div style={{ padding: '32px', maxWidth: '1200px', margin: '0 auto', width: '100%', boxSizing: 'border-box', fontFamily: "'Inter', sans-serif" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 9999,
          background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px', padding: '14px 20px',
          color: '#f1f5f9', fontSize: '14px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          animation: 'fadeIn 0.2s',
        }}>{toast}</div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 700, margin: 0 }}>Destinations</h1>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>{items.length} destinations</p>
        </div>
        <button
          onClick={openCreate}
          style={{
            background: 'linear-gradient(135deg, #1B5E96, #154A78)',
            border: 'none', borderRadius: '10px',
            padding: '10px 20px', color: '#fff', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(27,94,150,0.4)',
          }}
        >+ New Destination</button>
      </div>

      {loading ? <div style={{ color: '#64748b' }}>Loading…</div> : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {items.map(item => (
            <div key={item._id} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '18px 24px',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              {item.heroImage && (
                <img src={item.heroImage} alt={item.name}
                  style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '15px' }}>{item.name}</span>
                  <span style={{ background: item.category === 'Domestic' ? '#10b98120' : '#3b82f620', color: item.category === 'Domestic' ? '#34d399' : '#60a5fa', borderRadius: '6px', padding: '2px 8px', fontSize: '11px' }}>{item.category}</span>
                  {item.isFeatured && <span style={{ background: '#f59e0b20', color: '#fbbf24', borderRadius: '6px', padding: '2px 8px', fontSize: '11px' }}>Featured</span>}
                  {!item.isActive && <span style={{ background: '#ef444420', color: '#f87171', borderRadius: '6px', padding: '2px 8px', fontSize: '11px' }}>Inactive</span>}
                </div>
                <div style={{ color: '#64748b', fontSize: '13px' }}>
                  {item.country} · {item.continent} · {item.tier} · {item.type}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => openEdit(item)} style={{ background: 'rgba(27,94,150,0.12)', border: '1px solid rgba(27,94,150,0.25)', borderRadius: '8px', padding: '7px 14px', color: '#38bdf8', fontSize: '13px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(item._id, item.name)} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '7px 14px', color: '#f87171', fontSize: '13px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px',
        }}>
          <div style={{
            background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '600px',
            maxHeight: '85vh', overflowY: 'auto',
            boxShadow: '0 32px 80px rgba(0,0,0,0.6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 700, margin: 0 }}>
                {modal === 'create' ? 'New Destination' : 'Edit Destination'}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', width: '32px', height: '32px', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { key: 'name', label: 'Name *', span: 2 },
                  { key: 'slug', label: 'Slug' },
                  { key: 'country', label: 'Country *' },
                  { key: 'continent', label: 'Continent *' },
                  { key: 'tagline', label: 'Tagline', span: 2 },
                  { key: 'heroImage', label: 'Hero Image URL', span: 2 },
                  { key: 'seasons', label: 'Seasons (comma-separated)', span: 2 },
                ].map(({ key, label, span }) => (
                  <div key={key} style={{ gridColumn: span ? `span ${span}` : 'auto' }}>
                    <label style={labelStyle}>{label}</label>
                    <input value={form[key] || ''} onChange={e => f(key, e.target.value)} style={inputStyle} />
                  </div>
                ))}

                {/* Category */}
                <div>
                  <label style={labelStyle}>Category *</label>
                  <select value={form.category} onChange={e => f('category', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {['Domestic', 'International'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Tier</label>
                  <select value={form.tier} onChange={e => f('tier', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {['Luxury', 'Premium', 'Value'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Type</label>
                  <select value={form.type} onChange={e => f('type', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {['Beach', 'Mountain', 'Adventure', 'Nature', 'Urban', 'Cultural', 'Desert', 'Coastal', 'Island', 'Heritage'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Gallery Images (one URL per line)</label>
                  <textarea value={form.galleryImages || ''} onChange={e => f('galleryImages', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Paste one image URL per line..." />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Description</label>
                  <textarea value={form.description || ''} onChange={e => f('description', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: '20px', gridColumn: 'span 2' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isFeatured} onChange={e => f('isFeatured', e.target.checked)} />
                    Featured
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.isActive} onChange={e => f('isActive', e.target.checked)} />
                    Active
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setModal(null)} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', padding: '10px 20px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ background: 'linear-gradient(135deg, #1B5E96, #154A78)', border: 'none', borderRadius: '10px', padding: '10px 24px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
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
