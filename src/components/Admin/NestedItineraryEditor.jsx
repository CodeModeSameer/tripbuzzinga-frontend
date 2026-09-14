import { useState } from "react";
import { Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import styles from "../../app/admin/admin.module.css";

export default function NestedItineraryEditor({ itineraries, onChange }) {
  const [expandedItin, setExpandedItin] = useState(null);

  const updateItin = (idx, field, value) => {
    const updated = [...itineraries];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  const removeItin = (idx) => {
    onChange(itineraries.filter((_, i) => i !== idx));
  };

  const addItin = () => {
    onChange([...itineraries, {
      id: "new-" + Date.now(),
      title: "New Itinerary",
      days: "5 Days 4 Nights",
      pickup: "Airport",
      transfers: "Included",
      budget: "₹20,000",
      rating: 5,
      imageGradient: "linear-gradient(135deg, #eee, #ccc)",
      images: [],
      dayPlan: []
    }]);
  };

  const updateDayPlan = (itinIdx, dayIdx, field, value) => {
    const updated = [...itineraries];
    const updatedDayPlan = [...(updated[itinIdx].dayPlan || [])];
    updatedDayPlan[dayIdx] = { ...updatedDayPlan[dayIdx], [field]: value };
    updated[itinIdx] = { ...updated[itinIdx], dayPlan: updatedDayPlan };
    onChange(updated);
  };

  const removeDayPlan = (itinIdx, dayIdx) => {
    const updated = [...itineraries];
    updated[itinIdx].dayPlan = (updated[itinIdx].dayPlan || []).filter((_, i) => i !== dayIdx);
    onChange(updated);
  };

  const addDayPlan = (itinIdx) => {
    const updated = [...itineraries];
    const currentDayPlan = updated[itinIdx].dayPlan || [];
    updated[itinIdx].dayPlan = [...currentDayPlan, {
      day: currentDayPlan.length + 1,
      title: "New Day",
      desc: "Activities for the day..."
    }];
    onChange(updated);
  };

  return (
    <div className={styles.fieldGroup}>
      <label className={styles.fieldLabel} style={{ marginTop: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>
        Itineraries & Day Plans
      </label>
      {itineraries.map((itin, idx) => {
        const isExpanded = expandedItin === idx;
        return (
          <div key={idx} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '12px', background: '#f9fafb' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', cursor: 'pointer' }} onClick={() => setExpandedItin(isExpanded ? null : idx)}>
              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{itin.title || "Untitled Itinerary"}</h4>
              <div>
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {isExpanded && (
              <div style={{ marginTop: '16px' }}>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={itin.title} onChange={(e) => updateItin(idx, "title", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Days</label><input className={styles.textInput} value={itin.days} onChange={(e) => updateItin(idx, "days", e.target.value)} /></div>
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Budget</label><input className={styles.textInput} value={itin.budget} onChange={(e) => updateItin(idx, "budget", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Image Gradient</label><input className={styles.textInput} value={itin.imageGradient || ""} onChange={(e) => updateItin(idx, "imageGradient", e.target.value)} /></div>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Image URLs (One per line)</label>
                  <textarea
                    className={styles.textArea}
                    value={itin._imagesText !== undefined ? itin._imagesText : ((itin.images && itin.images.length > 0) ? itin.images.join("\n") : (itin.image || ""))}
                    onChange={(e) => {
                      const text = e.target.value;
                      const updated = [...itineraries];
                      updated[idx] = { 
                        ...updated[idx], 
                        _imagesText: text,
                        images: text.split('\n').map(url => url.trim()).filter(Boolean)
                      };
                      onChange(updated);
                    }}
                    placeholder="Paste image URLs here, one per line"
                    rows={3}
                  />
                </div>
                
                <div className={styles.fieldGroup} style={{ marginTop: '16px' }}>
                  <label className={styles.fieldLabel} style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '4px' }}>Day-wise Plan</label>
                  {(itin.dayPlan || []).map((day, dIdx) => (
                    <div key={dIdx} style={{ padding: '12px', border: '1px dashed #cbd5e1', borderRadius: '6px', marginBottom: '8px', background: '#fff' }}>
                      <div className={styles.fieldRow}>
                        <div className={styles.fieldGroup} style={{ flex: '0 0 80px' }}><label className={styles.fieldLabel}>Day</label><input className={styles.textInput} type="number" value={day.day} onChange={(e) => updateDayPlan(idx, dIdx, "day", parseInt(e.target.value) || dIdx + 1)} /></div>
                        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={day.title} onChange={(e) => updateDayPlan(idx, dIdx, "title", e.target.value)} /></div>
                      </div>
                      <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Description</label><textarea className={styles.textArea} rows={2} value={day.desc} onChange={(e) => updateDayPlan(idx, dIdx, "desc", e.target.value)} /></div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button className={styles.deleteBtn} onClick={() => removeDayPlan(idx, dIdx)}><Trash2 size={12} /> Remove Day</button>
                      </div>
                    </div>
                  ))}
                  <button className={styles.addSmallBtn} onClick={() => addDayPlan(idx)}><Plus size={14} /> Add Day Plan</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                  <button className={styles.deleteBtn} onClick={(e) => { e.stopPropagation(); removeItin(idx); }}><Trash2 size={14} /> Delete Entire Itinerary</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
      <button className={styles.addSmallBtn} onClick={addItin}><Plus size={14} /> Add New Itinerary</button>
    </div>
  );
}
