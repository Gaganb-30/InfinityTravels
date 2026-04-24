import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const authHeader = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
});

const EMPTY = {
  name: '', slug: '', location: '', description: '',
  duration: '', days: '', nights: '',
  'priceRange.min': '', 'priceRange.max': '',
  image: '', badge: '', tags: '',
  type: 'Coastal', destination: '',
  inclusions: '', exclusions: '',
  rating: '', reviewCount: '',
  isPopular: false, isFeatured: false, isActive: true,
  itinerary: [],
};

const EMPTY_DAY = { day: '', title: '', description: '', tags: '' };

const inputStyle = {
  width: '100%', boxSizing: 'border-box',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px', padding: '10px 14px',
  color: '#f1f5f9', fontSize: '14px', outline: 'none',
};
const labelStyle = { display: 'block', color: '#94a3b8', fontSize: '12px', fontWeight: 500, marginBottom: '6px' };
const smallInputStyle = { ...inputStyle, padding: '8px 10px', fontSize: '13px' };

export default function AdminPackages() {
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
      fetch(`${API}/api/admin/packages`, { headers: authHeader() }).then(r => r.json()),
      fetch(`${API}/api/admin/destinations`, { headers: authHeader() }).then(r => r.json()),
    ]).then(([pkgs, dests]) => {
      setItems(pkgs); setDestinations(dests); setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm({ ...EMPTY, itinerary: [] }); setEditId(null); setModal('create'); };
  const openEdit = (item) => {
    setForm({
      name: item.name || '', slug: item.slug || '',
      location: item.location || '', description: item.description || '',
      duration: item.duration || '', days: item.days || '', nights: item.nights || '',
      'priceRange.min': item.priceRange?.min || '',
      'priceRange.max': item.priceRange?.max || '',
      image: item.image || '', badge: item.badge || '',
      tags: (item.tags || []).join(', '),
      type: item.type || 'Coastal',
      destination: item.destination?._id || item.destination || '',
      inclusions: (item.inclusions || []).join('\n'),
      exclusions: (item.exclusions || []).join('\n'),
      rating: item.rating || '', reviewCount: item.reviewCount || '',
      isPopular: item.isPopular || false,
      isFeatured: item.isFeatured || false,
      isActive: item.isActive !== false,
      itinerary: (item.itinerary || []).map(d => ({
        day: d.day || '',
        title: d.title || '',
        description: d.description || '',
        tags: (d.tags || []).join(', '),
      })),
    });
    setEditId(item._id); setModal('edit');
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    const payload = {
      name: form.name, slug: form.slug, location: form.location,
      description: form.description, duration: form.duration,
      days: Number(form.days) || undefined, nights: Number(form.nights) || undefined,
      priceRange: {
        min: Number(form['priceRange.min']),
        max: Number(form['priceRange.max']),
        currency: '₹',
      },
      image: form.image, badge: form.badge || undefined,
      tags: form.tags ? form.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
      type: form.type,
      destination: form.destination || undefined,
      inclusions: form.inclusions ? form.inclusions.split('\n').map(s => s.trim()).filter(Boolean) : [],
      exclusions: form.exclusions ? form.exclusions.split('\n').map(s => s.trim()).filter(Boolean) : [],
      itinerary: form.itinerary
        .filter(d => d.title) // only include days with a title
        .map(d => ({
          day: Number(d.day) || 1,
          title: d.title,
          description: d.description || '',
          tags: d.tags ? d.tags.split(',').map(s => s.trim()).filter(Boolean) : [],
        })),
      rating: Number(form.rating) || 0,
      reviewCount: Number(form.reviewCount) || 0,
      isPopular: form.isPopular, isFeatured: form.isFeatured, isActive: form.isActive,
    };
    try {
      const url = editId ? `${API}/api/admin/packages/${editId}` : `${API}/api/admin/packages`;
      const method = editId ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeader(), body: JSON.stringify(payload) });
      if (!res.ok) { const e = await res.json(); throw new Error(e.error); }
      showToast(editId ? 'Package updated!' : 'Package created!');
      setModal(null); load();
    } catch (err) { showToast('Error: ' + err.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    const res = await fetch(`${API}/api/admin/packages/${id}`, { method: 'DELETE', headers: authHeader() });
    if (res.ok) { showToast('Deleted.'); load(); }
    else showToast('Delete failed.');
  };

  const f = (key, val) => setForm(p => ({ ...p, [key]: val }));

  // Itinerary helpers
  const addItineraryDay = () => {
    const nextDay = form.itinerary.length + 1;
    setForm(p => ({ ...p, itinerary: [...p.itinerary, { ...EMPTY_DAY, day: nextDay }] }));
  };
  const removeItineraryDay = (index) => {
    setForm(p => ({
      ...p,
      itinerary: p.itinerary.filter((_, i) => i !== index).map((d, i) => ({ ...d, day: i + 1 })),
    }));
  };
  const updateItineraryDay = (index, key, val) => {
    setForm(p => ({
      ...p,
      itinerary: p.itinerary.map((d, i) => i === index ? { ...d, [key]: val } : d),
    }));
  };

  const TYPES = ['Coastal', 'Mountain', 'Urban', 'Desert', 'Forest', 'Cultural', 'Adventure', 'Island', 'Heritage'];
  const BADGES = ['', 'Best Seller', 'New', 'Trending'];

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
          <h1 style={{ color: '#f1f5f9', fontSize: '24px', fontWeight: 700, margin: 0 }}>Packages</h1>
          <p style={{ color: '#64748b', fontSize: '13px', margin: '4px 0 0' }}>{items.length} packages</p>
        </div>
        <button onClick={openCreate} style={{ background: 'linear-gradient(135deg, #1B5E96, #154A78)', border: 'none', borderRadius: '10px', padding: '10px 20px', color: '#fff', fontSize: '14px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 14px rgba(27,94,150,0.4)' }}>
          + New Package
        </button>
      </div>

      {loading ? <div style={{ color: '#64748b' }}>Loading…</div> : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {items.map(item => (
            <div key={item._id} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '14px', padding: '18px 24px',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              {item.image && <img src={item.image} alt={item.name} style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover', flexShrink: 0 }} />}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ color: '#f1f5f9', fontWeight: 600, fontSize: '15px' }}>{item.name}</span>
                  {item.badge && <span style={{ background: '#1B5E9620', color: '#38bdf8', borderRadius: '6px', padding: '2px 8px', fontSize: '11px' }}>{item.badge}</span>}
                  {item.isFeatured && <span style={{ background: '#f59e0b20', color: '#fbbf24', borderRadius: '6px', padding: '2px 8px', fontSize: '11px' }}>Featured</span>}
                  {!item.isActive && <span style={{ background: '#ef444420', color: '#f87171', borderRadius: '6px', padding: '2px 8px', fontSize: '11px' }}>Inactive</span>}
                </div>
                <div style={{ color: '#64748b', fontSize: '13px' }}>
                  {item.destination?.name || 'No destination'} · {item.duration || '—'} · ₹{item.priceRange?.min?.toLocaleString('en-IN')} – ₹{item.priceRange?.max?.toLocaleString('en-IN')}
                  {item.itinerary?.length > 0 && ` · ${item.itinerary.length} days`}
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
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '24px' }}>
          <div style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '32px', width: '100%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 32px 80px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ color: '#f1f5f9', fontSize: '18px', fontWeight: 700, margin: 0 }}>
                {modal === 'create' ? 'New Package' : 'Edit Package'}
              </h2>
              <button onClick={() => setModal(null)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: '8px', width: '32px', height: '32px', color: '#94a3b8', cursor: 'pointer', fontSize: '16px' }}>✕</button>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Name *</label><input value={form.name} onChange={e => f('name', e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Slug</label><input value={form.slug} onChange={e => f('slug', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Location</label><input value={form.location} onChange={e => f('location', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Duration (e.g. 8D/7N)</label><input value={form.duration} onChange={e => f('duration', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Days</label><input type="number" value={form.days} onChange={e => f('days', e.target.value)} style={inputStyle} /></div>
                <div><label style={labelStyle}>Price Min (₹) *</label><input type="number" value={form['priceRange.min']} onChange={e => f('priceRange.min', e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Price Max (₹) *</label><input type="number" value={form['priceRange.max']} onChange={e => f('priceRange.max', e.target.value)} required style={inputStyle} /></div>
                <div><label style={labelStyle}>Type</label>
                  <select value={form.type} onChange={e => f('type', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>Badge</label>
                  <select value={form.badge} onChange={e => f('badge', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    {BADGES.map(b => <option key={b} value={b}>{b || '— None —'}</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>Destination</label>
                  <select value={form.destination} onChange={e => f('destination', e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                    <option value="">— None —</option>
                    {destinations.map(d => <option key={d._id} value={d._id}>{d.name} ({d.category})</option>)}
                  </select>
                </div>
                <div><label style={labelStyle}>Rating</label><input type="number" min="0" max="5" step="0.1" value={form.rating} onChange={e => f('rating', e.target.value)} style={inputStyle} /></div>
                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Image URL</label><input value={form.image} onChange={e => f('image', e.target.value)} style={inputStyle} /></div>

                {/* Tags input */}
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={labelStyle}>Tags (comma-separated)</label>
                  <input value={form.tags} onChange={e => f('tags', e.target.value)} style={inputStyle} placeholder="e.g. Beach, Adventure, Honeymoon, Luxury" />
                  {form.tags && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {form.tags.split(',').map(t => t.trim()).filter(Boolean).map((tag, i) => (
                        <span key={i} style={{ background: '#0ea5e920', color: '#38bdf8', borderRadius: '12px', padding: '3px 10px', fontSize: '11px', fontWeight: 500 }}>{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Description</label><textarea value={form.description} onChange={e => f('description', e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} /></div>
                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Inclusions (one per line)</label><textarea value={form.inclusions} onChange={e => f('inclusions', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} /></div>
                <div style={{ gridColumn: 'span 2' }}><label style={labelStyle}>Exclusions (one per line)</label><textarea value={form.exclusions} onChange={e => f('exclusions', e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical' }} /></div>

                {/* ──── Itinerary Builder ──── */}
                <div style={{ gridColumn: 'span 2', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <label style={{ ...labelStyle, marginBottom: 0, fontSize: '14px', fontWeight: 600 }}>
                      Itinerary ({form.itinerary.length} days)
                    </label>
                    <button type="button" onClick={addItineraryDay} style={{ background: 'rgba(27,94,150,0.15)', border: '1px solid rgba(27,94,150,0.3)', borderRadius: '8px', padding: '6px 14px', color: '#38bdf8', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}>
                      + Add Day
                    </button>
                  </div>

                  {form.itinerary.length === 0 && (
                    <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '12px', padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
                      No itinerary days added yet. Click "Add Day" to start building.
                    </div>
                  )}

                  <div style={{ display: 'grid', gap: '12px' }}>
                    {form.itinerary.map((day, i) => (
                      <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                          <span style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 700 }}>Day {day.day || i + 1}</span>
                          <button type="button" onClick={() => removeItineraryDay(i)} style={{ background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '6px', padding: '4px 10px', color: '#f87171', fontSize: '11px', cursor: 'pointer' }}>Remove</button>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                          <input
                            placeholder="Day title (e.g. Arrival in Delhi)"
                            value={day.title}
                            onChange={e => updateItineraryDay(i, 'title', e.target.value)}
                            style={smallInputStyle}
                          />
                          <textarea
                            placeholder="Description of the day..."
                            value={day.description}
                            onChange={e => updateItineraryDay(i, 'description', e.target.value)}
                            rows={2}
                            style={{ ...smallInputStyle, resize: 'vertical' }}
                          />
                          <input
                            placeholder="Day tags (comma-separated, e.g. Transfer, Heritage, Nature)"
                            value={day.tags}
                            onChange={e => updateItineraryDay(i, 'tags', e.target.value)}
                            style={smallInputStyle}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '20px', gridColumn: 'span 2', flexWrap: 'wrap' }}>
                  {[['isPopular', 'Popular'], ['isFeatured', 'Featured'], ['isActive', 'Active']].map(([key, label]) => (
                    <label key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', fontSize: '13px', cursor: 'pointer' }}>
                      <input type="checkbox" checked={form[key]} onChange={e => f(key, e.target.checked)} />
                      {label}
                    </label>
                  ))}
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
