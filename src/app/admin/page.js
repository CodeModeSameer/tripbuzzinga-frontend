"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import { useSiteData } from "@/context/SiteDataContext";
import {
  Plus, Trash2, Save, Edit3, X, GripVertical,
  Image as ImageIcon, Upload, ChevronDown, ChevronUp
} from "lucide-react";
import styles from "./admin.module.css";

const FLAG_OPTIONS = [
  { name: "India", flag: "🇮🇳" },
  { name: "UAE", flag: "🇦🇪" },
  { name: "Thailand", flag: "🇹🇭" },
  { name: "Indonesia", flag: "🇮🇩" },
  { name: "Maldives", flag: "🇲🇻" },
  { name: "Singapore", flag: "🇸🇬" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "Vietnam", flag: "🇻🇳" },
  { name: "Malaysia", flag: "🇲🇾" },
  { name: "Bhutan", flag: "🇧🇹" },
  { name: "Nepal", flag: "🇳🇵" },
  { name: "France", flag: "🇫🇷" },
  { name: "Switzerland", flag: "🇨🇭" },
  { name: "Italy", flag: "🇮🇹" },
  { name: "Japan", flag: "🇯🇵" },
  { name: "Iceland", flag: "🇮🇸" },
  { name: "United States", flag: "🇺🇸" },
  { name: "United Kingdom", flag: "🇬🇧" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Other", flag: "🏳️" },
];

export default function AdminDashboard() {
  const {
    hero, setHero,
    popularDestinations: popular, setPopularDestinations: setPopular,
    flyer, setFlyer,
    exploreInternational: exploreIntl, setExploreInternational: setExploreIntl,
    exploreDomestic: exploreDom, setExploreDomestic: setExploreDom,
    reviews, setReviews,
    faq, setFaq,
    blogs, setBlogs,
    itineraries, setItineraries,
    gallery, setGallery,
  } = useSiteData();

  const [activeSection, setActiveSection] = useState("hero");
  const [exploreTab, setExploreTab] = useState("international");
  const [editingItem, setEditingItem] = useState(null);
  const [editingItinIdx, setEditingItinIdx] = useState(null);
  const [savedMsg, setSavedMsg] = useState("");

  const showSaved = () => {
    setSavedMsg("Changes saved successfully!");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  /* ─── HERO PANEL ─── */
  const renderHeroPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Hero Section</h2>
        <p className={styles.panelDesc}>Manage the rotating destination names, background, stats, and hero reviews.</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Rotating Destinations</label>
        <p className={styles.fieldHint}>Names that rotate in &quot;Book Your Trip to ___&quot;</p>
        <div className={styles.tagList}>
          {hero.destinations.map((dest, i) => (
            <div key={i} className={styles.tag}>
              <input
                className={styles.tagInput}
                value={dest}
                onChange={(e) => {
                  const updated = [...hero.destinations];
                  updated[i] = e.target.value;
                  setHero({ ...hero, destinations: updated });
                }}
              />
              <button className={styles.tagRemove} onClick={() => {
                setHero({ ...hero, destinations: hero.destinations.filter((_, idx) => idx !== i) });
              }}><X size={12} /></button>
            </div>
          ))}
          <button className={styles.addSmallBtn} onClick={() => {
            setHero({ ...hero, destinations: [...hero.destinations, "New Place"] });
          }}>
            <Plus size={14} /> Add
          </button>
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Background Image URL</label>
        <input className={styles.textInput} value={hero.backgroundImage} onChange={(e) => setHero({ ...hero, backgroundImage: e.target.value })} />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Stats Bar</label>
        <div className={styles.statsGrid}>
          {hero.stats.map((stat, i) => (
            <div key={i} className={styles.statRow}>
              <input className={styles.textInputSmall} value={stat.value} placeholder="Value" onChange={(e) => {
                const updated = [...hero.stats];
                updated[i] = { ...updated[i], value: e.target.value };
                setHero({ ...hero, stats: updated });
              }} />
              <input className={styles.textInputSmall} value={stat.label} placeholder="Label" onChange={(e) => {
                const updated = [...hero.stats];
                updated[i] = { ...updated[i], label: e.target.value };
                setHero({ ...hero, stats: updated });
              }} />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fieldGroup}>
        <div className={styles.fieldLabelRow}>
          <label className={styles.fieldLabel}>Hero Reviews</label>
          <button className={styles.addSmallBtn} onClick={() => {
            setHero({ ...hero, reviews: [...hero.reviews, { id: Date.now(), name: "", image: "", text: "" }] });
          }}><Plus size={14} /> Add Review</button>
        </div>
        {hero.reviews.map((rev, i) => (
          <div key={rev.id} className={styles.listCard}>
            <div className={styles.listCardRow}>
              <input className={styles.textInputSmall} placeholder="Name" value={rev.name} onChange={(e) => {
                const updated = [...hero.reviews];
                updated[i] = { ...updated[i], name: e.target.value };
                setHero({ ...hero, reviews: updated });
              }} />
              <button className={styles.deleteBtn} onClick={() => {
                setHero({ ...hero, reviews: hero.reviews.filter((_, idx) => idx !== i) });
              }}><Trash2 size={14} /></button>
            </div>
            <textarea className={styles.textArea} rows={2} value={rev.text} onChange={(e) => {
              const updated = [...hero.reviews];
              updated[i] = { ...updated[i], text: e.target.value };
              setHero({ ...hero, reviews: updated });
            }} />
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── POPULAR DESTINATIONS PANEL ─── */
  const renderPopularPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Popular Destinations</h2>
        <p className={styles.panelDesc}>Manage the scrolling destination cards on the homepage.</p>
      </div>

      <button className={styles.addBtn} onClick={() => {
        setEditingItem({
          section: "popular",
          isNew: true,
          data: {
            id: Date.now(),
            type: "international",
            country: "",
            city: "",
            flag: "🏳️",
            duration: "5D / 4N",
            title: "",
            price: "₹",
            highlights: [""],
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
          }
        });
      }}><Plus size={16} /> Add Destination</button>

      <div className={styles.itemsList}>
        {popular.map((dest, i) => (
          <div key={dest.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <GripVertical size={16} className={styles.gripIcon} />
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{dest.title || "Untitled"}</strong>
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "popular", index: i, data: { ...dest, highlights: [...dest.highlights] } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { setPopular(popular.filter((_, idx) => idx !== i)); showSaved(); }}><Trash2 size={14} /></button>
              </div>
            </div>
            <div className={styles.itemCardMeta}>
              <span className={styles.tripTag} style={{ textTransform: 'capitalize' }}>{dest.type}</span>
              <span>{dest.flag} {dest.country} · {dest.city}</span>
              <span>{dest.duration}</span>
              <span className={styles.priceBadge}>{dest.price}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── FLYER PANEL ─── */
  const renderFlyerPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Flyer / Banner</h2>
        <p className={styles.panelDesc}>Manage the promotional banner that links to your offers page.</p>
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Badge Text</label>
        <input className={styles.textInput} value={flyer.badge} onChange={(e) => setFlyer({ ...flyer, badge: e.target.value })} />
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Title</label>
          <input className={styles.textInput} value={flyer.title} onChange={(e) => setFlyer({ ...flyer, title: e.target.value })} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Subtitle</label>
          <input className={styles.textInput} value={flyer.subtitle} onChange={(e) => setFlyer({ ...flyer, subtitle: e.target.value })} />
        </div>
      </div>
      <div className={styles.fieldRow}>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Discount Label</label>
          <input className={styles.textInput} value={flyer.discountLabel} onChange={(e) => setFlyer({ ...flyer, discountLabel: e.target.value })} />
        </div>
        <div className={styles.fieldGroup}>
          <label className={styles.fieldLabel}>Discount Amount</label>
          <input className={styles.textInput} value={flyer.discountAmount} onChange={(e) => setFlyer({ ...flyer, discountAmount: e.target.value })} />
        </div>
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Background Image URL</label>
        <input className={styles.textInput} value={flyer.image} onChange={(e) => setFlyer({ ...flyer, image: e.target.value })} />
      </div>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>Link URL</label>
        <input className={styles.textInput} value={flyer.linkUrl} onChange={(e) => setFlyer({ ...flyer, linkUrl: e.target.value })} />
      </div>
    </div>
  );

  /* ─── EXPLORE DESTINATIONS PANEL ─── */
  const renderExplorePanel = () => {
    const tab = exploreTab;
    const list = tab === "international" ? exploreIntl : exploreDom;
    const setList = tab === "international" ? setExploreIntl : setExploreDom;

    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Explore Destinations</h2>
          <p className={styles.panelDesc}>Manage the zigzag destinations showcase (Domestic & International).</p>
        </div>

        <div className={styles.tabBar}>
          <button className={`${styles.tabBtn} ${tab === "international" ? styles.tabActive : ""}`} onClick={() => setExploreTab("international")}>International</button>
          <button className={`${styles.tabBtn} ${tab === "domestic" ? styles.tabActive : ""}`} onClick={() => setExploreTab("domestic")}>Domestic</button>
        </div>

        <button className={styles.addBtn} onClick={() => {
          setEditingItem({
            section: "explore",
            tab: exploreTab,
            isNew: true,
            data: {
              id: Date.now(),
              name: "",
              desc: "",
              image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"
            }
          });
        }}><Plus size={16} /> Add Destination</button>

        <div className={styles.itemsList}>
          {list.map((dest, i) => (
            <div key={dest.id} className={styles.itemCard}>
              <div className={styles.itemCardHeader}>
                <div className={styles.itemCardTitle}>
                  <span className={styles.itemIndex}>{i + 1}</span>
                  <strong>{dest.name || "Untitled"}</strong>
                </div>
                <div className={styles.itemCardActions}>
                  <button className={styles.editBtn} onClick={() => setEditingItem({ section: "explore", tab, index: i, data: { ...dest } })}><Edit3 size={14} /></button>
                  <button className={styles.deleteBtn} onClick={() => { setList(list.filter((_, idx) => idx !== i)); showSaved(); }}><Trash2 size={14} /></button>
                </div>
              </div>
              <p className={styles.itemCardDesc}>{dest.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── REVIEWS PANEL ─── */
  const renderReviewsPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Reviews</h2>
        <p className={styles.panelDesc}>Manage the client review cards displayed on the homepage.</p>
      </div>

      <button className={styles.addBtn} onClick={() => {
        setEditingItem({
          section: "reviews",
          isNew: true,
          data: {
            id: Date.now(),
            name: "",
            avatarInitial: "?",
            avatarBg: "#6b7280",
            rating: 5,
            text: "",
            tripName: "",
            tripImage: "https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=200&auto=format&fit=crop",
            reviewLink: ""
          }
        });
      }}><Plus size={16} /> Add Review</button>

      <div className={styles.itemsList}>
        {reviews.map((rev, i) => (
          <div key={rev.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{rev.name || "Unnamed"}</strong>
                <span className={styles.ratingBadge}>★ {rev.rating}</span>
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "reviews", index: i, data: { ...rev } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { setReviews(reviews.filter((_, idx) => idx !== i)); showSaved(); }}><Trash2 size={14} /></button>
              </div>
            </div>
            <p className={styles.itemCardDesc}>{rev.text}</p>
            <span className={styles.tripTag}>{rev.tripName}</span>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── FAQ PANEL ─── */
  const renderFaqPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>FAQ</h2>
        <p className={styles.panelDesc}>Manage the frequently asked questions and answers.</p>
      </div>

      <button className={styles.addBtn} onClick={() => {
        setEditingItem({
          section: "faq",
          isNew: true,
          data: {
            id: Date.now(),
            question: "",
            answer: ""
          }
        });
      }}><Plus size={16} /> Add Question</button>

      <div className={styles.itemsList}>
        {faq.map((item, i) => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{item.question || "Untitled"}</strong>
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "faq", index: i, data: { ...item } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { setFaq(faq.filter((_, idx) => idx !== i)); showSaved(); }}><Trash2 size={14} /></button>
              </div>
            </div>
            <p className={styles.itemCardDesc}>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── GALLERY PANEL ─── */
  const renderGalleryPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Gallery</h2>
        <p className={styles.panelDesc}>Manage photos in the main visual diary and gallery page.</p>
      </div>

      <button className={styles.addBtn} onClick={() => {
        setEditingItem({
          section: "gallery",
          isNew: true,
          data: {
            id: Date.now(),
            url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
            location: "General",
            caption: "",
          }
        });
      }}><Plus size={16} /> Add Photo</button>

      <div className={styles.itemsList}>
        {gallery.map((item, i) => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{item.location || "General"}</strong>
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "gallery", index: i, data: { ...item } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { setGallery(gallery.filter((_, idx) => idx !== i)); showSaved(); }}><Trash2 size={14} /></button>
              </div>
            </div>
            <p className={styles.itemCardDesc}>{item.caption || "No caption"}</p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── BLOGS PANEL ─── */
  const renderBlogsPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Blogs</h2>
        <p className={styles.panelDesc}>Manage blog posts displayed on the homepage and the main blogs listing page.</p>
      </div>

      <button className={styles.addBtn} onClick={() => {
        setEditingItem({
          section: "blogs",
          isNew: true,
          data: {
            id: Date.now(),
            title: "",
            publishedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
            readingTime: "5 minutes read",
            author: "",
            category: "General",
            content: "",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
            isFeatured: false,
          }
        });
      }}><Plus size={16} /> Add Blog</button>

      <div className={styles.itemsList}>
        {blogs.map((item, i) => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{item.title || "Untitled"}</strong>
                {item.isFeatured && <span className={styles.ratingBadge}>Featured</span>}
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "blogs", index: i, data: { ...item } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { setBlogs(blogs.filter((_, idx) => idx !== i)); showSaved(); }}><Trash2 size={14} /></button>
              </div>
            </div>
            <p className={styles.itemCardDesc}>{item.category} · {item.publishedAt}</p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── ITINERARIES PANEL ─── */
  const allLocations = [
    ...new Set([
      ...exploreIntl.map((d) => d.name),
      ...exploreDom.map((d) => d.name),
    ]),
  ];
  const allCategories = ["Honeymoon", "Solo Travel", "Family Group", "Global Group", "International"];

  const renderItinerariesPanel = () => (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Itineraries</h2>
        <p className={styles.panelDesc}>Manage all itineraries centrally. Tag them with locations and categories to use across the site.</p>
      </div>

      <button className={styles.addBtn} onClick={() => {
        setEditingItem({
          section: "itineraries",
          isNew: true,
          data: {
            id: "itin-" + Date.now(),
            title: "",
            days: "5 Days 4 Nights",
            pickup: "Airport",
            transfers: "Included",
            budget: "₹20,000",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
            type: "domestic",
            locations: [],
            categories: [],
            description: "",
          }
        });
      }}><Plus size={16} /> Add Itinerary</button>

      <div className={styles.itemsList}>
        {itineraries.map((item, i) => (
          <div key={item.id} className={styles.itemCard}>
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{item.title || "Untitled"}</strong>
                <span className={styles.ratingBadge}>★ {item.rating}</span>
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "itineraries", index: i, data: { ...item, locations: [...item.locations], categories: [...item.categories] } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { setItineraries(itineraries.filter((_, idx) => idx !== i)); showSaved(); }}><Trash2 size={14} /></button>
              </div>
            </div>
            <div className={styles.itemCardMeta}>
              <span className={styles.tripTag} style={{ textTransform: 'capitalize' }}>{item.type}</span>
              <span>{item.days}</span>
              <span className={styles.priceBadge}>{item.budget}</span>
            </div>
            <p className={styles.itemCardDesc}>
              {item.locations.join(", ")} {item.categories.length > 0 && `· ${item.categories.join(", ")}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  /* ─── EDIT MODAL ─── */
  const renderEditModal = () => {
    if (!editingItem) return null;
    const { section, data } = editingItem;

    const updateField = (field, value) => {
      setEditingItem({ ...editingItem, data: { ...data, [field]: value } });
    };

    const saveEdit = () => {
      if (section === "popular") {
        const updated = [...popular];
        if (editingItem.isNew) updated.unshift(data); // Add to beginning
        else updated[editingItem.index] = data;
        setPopular(updated);
      } else if (section === "explore") {
        if (editingItem.tab === "international") {
          const updated = [...exploreIntl];
          if (editingItem.isNew) updated.unshift(data);
          else updated[editingItem.index] = data;
          setExploreIntl(updated);
        } else {
          const updated = [...exploreDom];
          if (editingItem.isNew) updated.unshift(data);
          else updated[editingItem.index] = data;
          setExploreDom(updated);
        }
      } else if (section === "reviews") {
        const updated = [...reviews];
        if (editingItem.isNew) updated.unshift(data);
        else updated[editingItem.index] = data;
        setReviews(updated);
      } else if (section === "faq") {
        const updated = [...faq];
        if (editingItem.isNew) updated.push(data);
        else updated[editingItem.index] = data;
        setFaq(updated);
      } else if (section === "blogs") {
        const updated = [...blogs];
        if (editingItem.isNew) updated.unshift(data);
        else updated[editingItem.index] = data;
        setBlogs(updated);
      } else if (section === "itineraries") {
        const updated = [...itineraries];
        if (editingItem.isNew) updated.unshift(data);
        else updated[editingItem.index] = data;
        setItineraries(updated);
      } else if (section === "gallery") {
        const updated = [...gallery];
        if (editingItem.isNew) updated.unshift(data);
        else updated[editingItem.index] = data;
        setGallery(updated);
      }
      setEditingItem(null);
      setEditingItinIdx(null);
      showSaved();
    };

    return (
      <div className={styles.modalOverlay} onClick={() => setEditingItem(null)}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h3>Edit {section === "popular" ? "Destination" : section === "explore" ? "Destination" : section === "reviews" ? "Review" : section === "blogs" ? "Blog" : section === "itineraries" ? "Itinerary" : section === "gallery" ? "Photo" : "FAQ"}</h3>
            <button className={styles.modalClose} onClick={() => setEditingItem(null)}><X size={18} /></button>
          </div>
          <div className={styles.modalBody}>
            {section === "popular" && (
              <>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Type</label>
                    <select className={styles.textInput} value={data.type || "international"} onChange={(e) => updateField("type", e.target.value)}>
                      <option value="international">International</option>
                      <option value="domestic">Domestic</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Country</label><input className={styles.textInput} value={data.country} onChange={(e) => updateField("country", e.target.value)} /></div>
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>City</label><input className={styles.textInput} value={data.city} onChange={(e) => updateField("city", e.target.value)} /></div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Flag Emoji</label>
                    <select className={styles.textInput} value={data.flag || "🏳️"} onChange={(e) => updateField("flag", e.target.value)}>
                      {FLAG_OPTIONS.map(opt => (
                        <option key={opt.name} value={opt.flag}>{opt.flag} {opt.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Duration</label><input className={styles.textInput} value={data.duration} onChange={(e) => updateField("duration", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Price</label><input className={styles.textInput} value={data.price} onChange={(e) => updateField("price", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={data.title} onChange={(e) => updateField("title", e.target.value)} /></div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Image URL</label><input className={styles.textInput} value={data.image} onChange={(e) => updateField("image", e.target.value)} /></div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Highlights</label>
                  {data.highlights.map((h, idx) => (
                    <div key={idx} className={styles.highlightRow}>
                      <input className={styles.textInput} value={h} onChange={(e) => {
                        const updated = [...data.highlights];
                        updated[idx] = e.target.value;
                        updateField("highlights", updated);
                      }} />
                      <button className={styles.deleteBtn} onClick={() => {
                        updateField("highlights", data.highlights.filter((_, hi) => hi !== idx));
                      }}><X size={12} /></button>
                    </div>
                  ))}
                  <button className={styles.addSmallBtn} onClick={() => updateField("highlights", [...data.highlights, ""])}><Plus size={14} /> Add</button>
                </div>
              </>
            )}
            {section === "explore" && (
              <>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Name</label><input className={styles.textInput} value={data.name} onChange={(e) => updateField("name", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Tagline</label><input className={styles.textInput} value={data.tagline || ""} onChange={(e) => updateField("tagline", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Description</label><textarea className={styles.textArea} rows={3} value={data.desc} onChange={(e) => updateField("desc", e.target.value)} /></div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Image URL</label><input className={styles.textInput} value={data.image} onChange={(e) => updateField("image", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Banner Gradient</label><input className={styles.textInput} value={data.bannerGradient || ""} onChange={(e) => updateField("bannerGradient", e.target.value)} /></div>
                </div>
                
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} style={{ marginTop: '16px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>Itineraries</label>
                  {(data.itineraries || []).map((itin, idx) => (
                    <div key={idx} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '12px', background: '#f9fafb' }}>
                      <div className={styles.fieldRow}>
                        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={itin.title} onChange={(e) => {
                          const updated = [...(data.itineraries || [])];
                          updated[idx] = { ...updated[idx], title: e.target.value };
                          updateField("itineraries", updated);
                        }} /></div>
                        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Days</label><input className={styles.textInput} value={itin.days} onChange={(e) => {
                          const updated = [...(data.itineraries || [])];
                          updated[idx] = { ...updated[idx], days: e.target.value };
                          updateField("itineraries", updated);
                        }} /></div>
                      </div>
                      <div className={styles.fieldRow}>
                        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Budget</label><input className={styles.textInput} value={itin.budget} onChange={(e) => {
                          const updated = [...(data.itineraries || [])];
                          updated[idx] = { ...updated[idx], budget: e.target.value };
                          updateField("itineraries", updated);
                        }} /></div>
                        <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Image Gradient</label><input className={styles.textInput} value={itin.imageGradient} onChange={(e) => {
                          const updated = [...(data.itineraries || [])];
                          updated[idx] = { ...updated[idx], imageGradient: e.target.value };
                          updateField("itineraries", updated);
                        }} /></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                        <button className={styles.deleteBtn} onClick={() => {
                          updateField("itineraries", (data.itineraries || []).filter((_, i) => i !== idx));
                        }}><Trash2 size={14} /> Remove Itinerary</button>
                      </div>
                    </div>
                  ))}
                  <button className={styles.addSmallBtn} onClick={() => {
                    updateField("itineraries", [...(data.itineraries || []), {
                      id: "new-" + Date.now(), title: "New Itinerary", days: "5 Days", pickup: "Airport", transfers: "Included", budget: "₹20,000", rating: 5, imageGradient: "linear-gradient(135deg, #eee, #ccc)"
                    }]);
                  }}><Plus size={14} /> Add Itinerary</button>
                </div>
              </>
            )}
            {section === "reviews" && (
              <>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Name</label><input className={styles.textInput} value={data.name} onChange={(e) => updateField("name", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Rating</label><input className={styles.textInput} type="number" min={1} max={5} value={data.rating} onChange={(e) => updateField("rating", parseInt(e.target.value) || 5)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Review Text</label><textarea className={styles.textArea} rows={4} value={data.text} onChange={(e) => updateField("text", e.target.value)} /></div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Trip Name</label><input className={styles.textInput} value={data.tripName} onChange={(e) => updateField("tripName", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Review Link (URL)</label><input className={styles.textInput} value={data.reviewLink || ""} placeholder="https://..." onChange={(e) => updateField("reviewLink", e.target.value)} /></div>
                </div>
              </>
            )}
            {section === "faq" && (
              <>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Question</label><input className={styles.textInput} value={data.question} onChange={(e) => updateField("question", e.target.value)} /></div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Answer</label><textarea className={styles.textArea} rows={4} value={data.answer} onChange={(e) => updateField("answer", e.target.value)} /></div>
              </>
            )}
            {section === "gallery" && (
              <>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Image URL</label><input className={styles.textInput} value={data.url} onChange={(e) => updateField("url", e.target.value)} /></div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Location Tag</label><input className={styles.textInput} value={data.location} onChange={(e) => updateField("location", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Caption (Optional)</label><input className={styles.textInput} value={data.caption} onChange={(e) => updateField("caption", e.target.value)} /></div>
              </>
            )}
            {section === "blogs" && (
              <>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={data.title} onChange={(e) => updateField("title", e.target.value)} /></div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Category</label><input className={styles.textInput} value={data.category} onChange={(e) => updateField("category", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Author</label><input className={styles.textInput} value={data.author} onChange={(e) => updateField("author", e.target.value)} /></div>
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Published At</label><input className={styles.textInput} value={data.publishedAt} onChange={(e) => updateField("publishedAt", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Reading Time</label><input className={styles.textInput} value={data.readingTime} onChange={(e) => updateField("readingTime", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Image URL</label><input className={styles.textInput} value={data.image} onChange={(e) => updateField("image", e.target.value)} /></div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Content</label><textarea className={styles.textArea} rows={6} value={data.content} onChange={(e) => updateField("content", e.target.value)} /></div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={data.isFeatured} onChange={(e) => updateField("isFeatured", e.target.checked)} style={{ width: '16px', height: '16px' }} />
                    Is Featured (Shows up as the large card)
                  </label>
                </div>
              </>
            )}
            {section === "itineraries" && (
              <>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={data.title} onChange={(e) => updateField("title", e.target.value)} /></div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Type</label>
                    <select className={styles.textInput} value={data.type} onChange={(e) => updateField("type", e.target.value)}>
                      <option value="international">International</option>
                      <option value="domestic">Domestic</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Days</label><input className={styles.textInput} value={data.days} onChange={(e) => updateField("days", e.target.value)} /></div>
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Budget</label><input className={styles.textInput} value={data.budget} onChange={(e) => updateField("budget", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Rating</label><input className={styles.textInput} type="number" min={1} max={5} value={data.rating} onChange={(e) => updateField("rating", parseInt(e.target.value) || 5)} /></div>
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Pickup</label><input className={styles.textInput} value={data.pickup} onChange={(e) => updateField("pickup", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Transfers</label><input className={styles.textInput} value={data.transfers} onChange={(e) => updateField("transfers", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Image URL</label><input className={styles.textInput} value={data.image} onChange={(e) => updateField("image", e.target.value)} /></div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Description</label><textarea className={styles.textArea} rows={3} value={data.description} onChange={(e) => updateField("description", e.target.value)} /></div>

                {/* Locations multi-select */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Locations (select all that apply)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {allLocations.map((loc) => {
                      const isSelected = (data.locations || []).includes(loc);
                      return (
                        <button
                          type="button"
                          key={loc}
                          onClick={() => {
                            if (isSelected) updateField("locations", data.locations.filter(l => l !== loc));
                            else updateField("locations", [...(data.locations || []), loc]);
                          }}
                          style={{
                            padding: '6px 14px', borderRadius: '20px', border: '1px solid',
                            borderColor: isSelected ? '#0b63e5' : '#d1d5db',
                            background: isSelected ? '#eff6ff' : 'white',
                            color: isSelected ? '#0b63e5' : '#6b7280',
                            fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {isSelected ? '✓ ' : ''}{loc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Categories multi-select */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Categories (select all that apply)</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {allCategories.map((cat) => {
                      const isSelected = (data.categories || []).includes(cat);
                      return (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => {
                            if (isSelected) updateField("categories", data.categories.filter(c => c !== cat));
                            else updateField("categories", [...(data.categories || []), cat]);
                          }}
                          style={{
                            padding: '6px 14px', borderRadius: '20px', border: '1px solid',
                            borderColor: isSelected ? '#10b981' : '#d1d5db',
                            background: isSelected ? '#ecfdf5' : 'white',
                            color: isSelected ? '#10b981' : '#6b7280',
                            fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          {isSelected ? '✓ ' : ''}{cat}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={styles.modalFooter}>
            <button className={styles.cancelBtn} onClick={() => setEditingItem(null)}>Cancel</button>
            <button className={styles.saveBtn} onClick={saveEdit}><Save size={16} /> Save</button>
          </div>
        </div>
      </div>
    );
  };

  /* ─── SECTION RENDERER ─── */
  const renderSection = () => {
    switch (activeSection) {
      case "hero": return renderHeroPanel();
      case "popular-destinations": return renderPopularPanel();
      case "flyer": return renderFlyerPanel();
      case "explore-destinations": return renderExplorePanel();
      case "reviews": return renderReviewsPanel();
      case "blogs": return renderBlogsPanel();
      case "itineraries": return renderItinerariesPanel();
      case "gallery": return renderGalleryPanel();
      case "faq": return renderFaqPanel();
      default: return renderHeroPanel();
    }
  };

  return (
    <div className={styles.adminLayout}>
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className={styles.mainContent}>
        {savedMsg && <div className={styles.toast}>{savedMsg}</div>}
        {renderSection()}
        {renderEditModal()}
      </main>
    </div>
  );
}
