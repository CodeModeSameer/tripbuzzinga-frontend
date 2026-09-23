"use client";

import { useState, useEffect, useRef } from "react";
import AdminSidebar from "@/components/AdminSidebar/AdminSidebar";
import NestedItineraryEditor from "@/components/Admin/NestedItineraryEditor";
import RichTextEditor from "@/components/Admin/RichTextEditor";
import { useSiteData } from "@/context/SiteDataContext";
import {
  Plus, Trash2, Save, Edit3, X, GripVertical,
  Image as ImageIcon, Upload, ChevronDown, ChevronUp,
  Lock, Eye, EyeOff
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

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "tripbuzzinga@2025";

export default function AdminDashboard() {
  // ─── ALL HOOKS MUST BE CALLED FIRST (Rules of Hooks) ───
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    hero, setHero,
    popularDestinations: popular, setPopularDestinations: setPopular,
    flyer, setFlyer,
    exploreInternational: exploreIntl, setExploreInternational: setExploreIntl,
    exploreDomestic: exploreDom, setExploreDomestic: setExploreDom,
    headerCategories, setHeaderCategories,
    tripCategories, setTripCategories,
    reviews, setReviews,
    faq, setFaq,
    blogs, setBlogs,
    itineraries, setItineraries,
    gallery, setGallery,
    publishSiteData,
  } = useSiteData();

  const [activeSection, setActiveSection] = useState("hero");
  const [exploreTab, setExploreTab] = useState("international");
  const [editingItem, setEditingItem] = useState(null);
  const [editingItinIdx, setEditingItinIdx] = useState(null);
  const [savedMsg, setSavedMsg] = useState("");
  const [galleryTab, setGalleryTab] = useState("All");
  const [customGalleryCategories, setCustomGalleryCategories] = useState([]);
  const [faqTab, setFaqTab] = useState("All");
  const [customFaqCategories, setCustomFaqCategories] = useState([]);
  const [blogTab, setBlogTab] = useState("All");
  const [customBlogCategories, setCustomBlogCategories] = useState([]);
  const [itinTab, setItinTab] = useState("All");
  const [customItinCategories, setCustomItinCategories] = useState([]);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = (list, setListFn) => {
    let _list = [...list];
    const draggedItemContent = _list.splice(dragItem.current, 1)[0];
    _list.splice(dragOverItem.current, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setListFn(_list);
    showSaved();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginUsername === ADMIN_USERNAME && loginPassword === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError("");
    } else {
      setLoginError("Invalid username or password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const showSaved = () => {
    setSavedMsg("Changes saved successfully!");
    setTimeout(() => setSavedMsg(""), 2500);
  };

  // ─── LOGIN GATE ───
  if (!isAuthenticated) {
    return (
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <div className={styles.loginIconWrap}>
              <Lock size={28} />
            </div>
            <h1 className={styles.loginTitle}>Admin Panel</h1>
            <p className={styles.loginSubtitle}>Sign in to manage Trip Buzzinga</p>
          </div>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <div className={styles.loginField}>
              <label className={styles.loginLabel}>Username</label>
              <input
                type="text"
                className={styles.loginInput}
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                placeholder="Enter username"
                autoFocus
              />
            </div>
            <div className={styles.loginField}>
              <label className={styles.loginLabel}>Password</label>
              <div className={styles.loginPasswordWrap}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.loginInput}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  className={styles.loginEyeBtn}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {loginError && <p className={styles.loginError}>{loginError}</p>}
            <button type="submit" className={styles.loginBtn}>Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED DASHBOARD ───

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
                if (window.confirm("Are you sure you want to delete this?")) {
                  setHero({ ...hero, destinations: hero.destinations.filter((_, idx) => idx !== i) });
                }
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
                if (window.confirm("Are you sure you want to delete this?")) {
                  setHero({ ...hero, reviews: hero.reviews.filter((_, idx) => idx !== i) });
                }
              }}><Trash2 size={14} /></button>
            </div>
            <RichTextEditor value={rev.text} onChange={(val) => {
              const updated = [...hero.reviews];
              updated[i] = { ...updated[i], text: val };
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
            city: "",
            flag: "🏳️",
            duration: "5D / 4N",
            title: "",
            price: "₹",
            highlights: [""],
            images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"]
          }
        });
      }}><Plus size={16} /> Add Destination</button>

      <div className={styles.itemsList}>
        {popular.map((dest, i) => (
          <div 
            key={dest.id} 
            className={styles.itemCard}
            draggable
            onDragStart={() => { dragItem.current = i; }}
            onDragEnter={() => { dragOverItem.current = i; }}
            onDragEnd={() => handleSort(popular, setPopular)}
            onDragOver={(e) => e.preventDefault()}
            style={{ cursor: "grab" }}
          >
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <GripVertical size={16} className={styles.gripIcon} />
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{dest.title || "Untitled"}</strong>
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "popular", index: i, data: { ...dest, highlights: [...dest.highlights] } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setPopular(popular.filter((_, idx) => idx !== i)); showSaved(); } }}><Trash2 size={14} /></button>
              </div>
            </div>
            <div className={styles.itemCardMeta}>
              <span className={styles.tripTag} style={{ textTransform: 'capitalize' }}>{dest.type}</span>
              <span>{dest.flag} {dest.city}</span>
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
        <p className={styles.panelDesc}>Manage the promotional banners that link to your offers page.</p>
      </div>

      <button className={styles.addBtn} onClick={() => {
        setEditingItem({
          section: "flyer",
          isNew: true,
          data: {
            id: Date.now(),
            title: "",
            subtitle: "",
            badge: "",
            discountLabel: "",
            discountAmount: "",
            images: ["https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop"],
            linkUrl: "",
          }
        });
      }}><Plus size={16} /> Add Banner</button>

      <div className={styles.itemsList}>
        {Array.isArray(flyer) && flyer.map((item, i) => (
          <div 
            key={item.id} 
            className={styles.itemCard}
            draggable
            onDragStart={() => { dragItem.current = i; }}
            onDragEnter={() => { dragOverItem.current = i; }}
            onDragEnd={() => handleSort(flyer, setFlyer)}
            onDragOver={(e) => e.preventDefault()}
            style={{ cursor: "grab" }}
          >
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{item.title || "Untitled"}</strong>
                {item.badge && <span className={styles.ratingBadge}>{item.badge}</span>}
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "flyer", index: i, data: { ...item } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this banner?")) { setFlyer(flyer.filter((_, idx) => idx !== i)); showSaved(); } }}><Trash2 size={14} /></button>
              </div>
            </div>
            <p className={styles.itemCardDesc}>{item.subtitle}</p>
            {item.discountAmount && <span className={styles.tripTag}>{item.discountAmount}</span>}
          </div>
        ))}
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
              images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"]
            }
          });
        }}><Plus size={16} /> Add Destination</button>

        <div className={styles.itemsList}>
          {list.map((dest, i) => (
            <div 
              key={dest.id} 
              className={styles.itemCard}
              draggable
              onDragStart={() => { dragItem.current = i; }}
              onDragEnter={() => { dragOverItem.current = i; }}
              onDragEnd={() => handleSort(list, exploreTab === "international" ? setExploreIntl : setExploreDomestic)}
              onDragOver={(e) => e.preventDefault()}
              style={{ cursor: "grab" }}
            >
              <div className={styles.itemCardHeader}>
                <div className={styles.itemCardTitle}>
                  <span className={styles.itemIndex}>{i + 1}</span>
                  <strong>{dest.name || "Untitled"}</strong>
                </div>
                <div className={styles.itemCardActions}>
                  <button className={styles.editBtn} onClick={() => setEditingItem({ section: "explore", tab, index: i, data: { ...dest } })}><Edit3 size={14} /></button>
                  <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setList(list.filter((_, idx) => idx !== i)); showSaved(); } }}><Trash2 size={14} /></button>
                </div>
              </div>
              <div 
                className={styles.itemCardDesc} 
                dangerouslySetInnerHTML={{ __html: (dest.desc || '').replace(/&nbsp;/g, ' ') }} 
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── TRIP CATEGORIES PANEL ─── */
  const renderHeaderCategoriesPanel = () => {
    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Header Section</h2>
          <p className={styles.panelDesc}>Manage the categories displayed in the website header.</p>
        </div>

        <button className={styles.addBtn} onClick={() => {
          setEditingItem({
            section: "header-categories",
            isNew: true,
            data: {
              id: Date.now(),
              slug: "",
              label: "New Category",
              tagline: "",
              desc: "",
              images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800"],
              itineraries: []
            }
          });
        }}><Plus size={16} /> Add Category</button>

        <div className={styles.itemsList}>
          {headerCategories.map((cat, i) => (
            <div 
              key={cat.id} 
              className={styles.itemCard}
              draggable
              onDragStart={() => { dragItem.current = i; }}
              onDragEnter={() => { dragOverItem.current = i; }}
              onDragEnd={() => handleSort(headerCategories, setHeaderCategories)}
              onDragOver={(e) => e.preventDefault()}
              style={{ cursor: "grab" }}
            >
              <div className={styles.itemCardHeader}>
                <div className={styles.itemCardTitle}>
                  <GripVertical size={16} className={styles.gripIcon} />
                  <span className={styles.itemIndex}>{i + 1}</span>
                  <strong>{cat.label || "Untitled"}</strong>
                </div>
                <div className={styles.itemCardActions}>
                  <button className={styles.editBtn} onClick={() => setEditingItem({ section: "header-categories", index: i, data: { ...cat } })}><Edit3 size={14} /></button>
                  <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setHeaderCategories(headerCategories.filter((_, idx) => idx !== i)); showSaved(); } }}><Trash2 size={14} /></button>
                </div>
              </div>
              <div 
                className={styles.itemCardDesc} 
                dangerouslySetInnerHTML={{ __html: (cat.desc || '').replace(/&nbsp;/g, ' ') }} 
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTripCategoriesPanel = () => {
    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Trip Categories</h2>
          <p className={styles.panelDesc}>Manage the trip categories section on the homepage.</p>
        </div>

        <button className={styles.addBtn} onClick={() => {
          setEditingItem({
            section: "trip-categories",
            isNew: true,
            data: {
              id: Date.now(),
              slug: "",
              label: "New Category",
              tagline: "",
              desc: "",
              images: ["https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800"],
              itineraries: []
            }
          });
        }}><Plus size={16} /> Add Category</button>

        <div className={styles.itemsList}>
          {tripCategories.map((cat, i) => (
            <div 
              key={cat.id} 
              className={styles.itemCard}
              draggable
              onDragStart={() => { dragItem.current = i; }}
              onDragEnter={() => { dragOverItem.current = i; }}
              onDragEnd={() => handleSort(tripCategories, setTripCategories)}
              onDragOver={(e) => e.preventDefault()}
              style={{ cursor: "grab" }}
            >
              <div className={styles.itemCardHeader}>
                <div className={styles.itemCardTitle}>
                  <GripVertical size={16} className={styles.gripIcon} />
                  <span className={styles.itemIndex}>{i + 1}</span>
                  <strong>{cat.label || "Untitled"}</strong>
                </div>
                <div className={styles.itemCardActions}>
                  <button className={styles.editBtn} onClick={() => setEditingItem({ section: "trip-categories", index: i, data: { ...cat } })}><Edit3 size={14} /></button>
                  <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setTripCategories(tripCategories.filter((_, idx) => idx !== i)); } }}><Trash2 size={14} /></button>
                </div>
              </div>
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
          <div 
            key={rev.id} 
            className={styles.itemCard}
            draggable
            onDragStart={() => { dragItem.current = i; }}
            onDragEnter={() => { dragOverItem.current = i; }}
            onDragEnd={() => handleSort(reviews, setReviews)}
            onDragOver={(e) => e.preventDefault()}
            style={{ cursor: "grab" }}
          >
            <div className={styles.itemCardHeader}>
              <div className={styles.itemCardTitle}>
                <span className={styles.itemIndex}>{i + 1}</span>
                <strong>{rev.name || "Unnamed"}</strong>
                <span className={styles.ratingBadge}>★ {rev.rating}</span>
              </div>
              <div className={styles.itemCardActions}>
                <button className={styles.editBtn} onClick={() => setEditingItem({ section: "reviews", index: i, data: { ...rev } })}><Edit3 size={14} /></button>
                <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setReviews(reviews.filter((_, idx) => idx !== i)); showSaved(); } }}><Trash2 size={14} /></button>
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
  const renderFaqPanel = () => {
    const uniqueCategories = Array.from(new Set(faq.map(i => i.category))).filter(Boolean);
    const allFaqTabs = ["All", ...Array.from(new Set([...uniqueCategories, ...customFaqCategories]))];
    const filteredFaq = faqTab === "All" ? faq : faq.filter(i => i.category === faqTab);

    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>FAQ</h2>
          <p className={styles.panelDesc}>Manage the frequently asked questions and answers.</p>
        </div>

        <div className={styles.tabBar} style={{ marginBottom: "20px", flexWrap: "nowrap", gap: "10px", display: "flex", overflowX: "auto", paddingBottom: "8px", maxWidth: "100%", scrollBehavior: "smooth" }}>
          {allFaqTabs.map(tab => (
            <button 
              key={tab} 
              className={`${styles.tabBtn} ${faqTab === tab ? styles.tabActive : ""}`}
              onClick={() => setFaqTab(tab)}
              style={{ flexShrink: 0, whiteSpace: "nowrap" }}
            >
              {tab}
            </button>
          ))}
          <button 
            className={styles.tabBtn}
            onClick={() => {
              const newCat = window.prompt("Enter new FAQ category name:");
              if (newCat && newCat.trim()) {
                setCustomFaqCategories([...customFaqCategories, newCat.trim()]);
                setFaqTab(newCat.trim());
              }
            }}
            style={{ flexShrink: 0, whiteSpace: "nowrap" }}
          >
            <Plus size={14} style={{ marginRight: 4 }} /> Add
          </button>
        </div>

        <button className={styles.addBtn} onClick={() => {
          setEditingItem({
            section: "faq",
            isNew: true,
            data: {
              id: Date.now(),
              question: "",
              answer: "",
              category: faqTab === "All" ? "General" : faqTab
            }
          });
        }}><Plus size={16} /> Add Question {faqTab !== "All" && `for ${faqTab}`}</button>

        <div className={styles.itemsList}>
          {filteredFaq.map((item, i) => (
            <div 
              key={`${item.id}-${i}`} 
              className={styles.itemCard}
              draggable
              onDragStart={() => { dragItem.current = i; }}
              onDragEnter={() => { dragOverItem.current = i; }}
              onDragEnd={() => {
                if (faqTab === "All") {
                  handleSort(faq, setFaq);
                } else {
                  let _full = [...faq];
                  const draggedItem = filteredFaq[dragItem.current];
                  const targetItem = filteredFaq[dragOverItem.current];
                  if (!draggedItem || !targetItem) return;
                  const fromIdx = _full.findIndex(x => x.id === draggedItem.id);
                  if (fromIdx === -1) return;
                  _full.splice(fromIdx, 1);
                  const toIdx = _full.findIndex(x => x.id === targetItem.id);
                  if (toIdx === -1) return;
                  _full.splice(toIdx, 0, draggedItem);
                  dragItem.current = null;
                  dragOverItem.current = null;
                  setFaq(_full);
                  showSaved();
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              style={{ cursor: "grab" }}
            >
              <div className={styles.itemCardHeader}>
                <div className={styles.itemCardTitle}>
                  <span className={styles.itemIndex}>{i + 1}</span>
                  <strong>{item.question || "Untitled"}</strong>
                </div>
                <div className={styles.itemCardActions}>
                  <button className={styles.editBtn} onClick={() => setEditingItem({ section: "faq", index: faq.findIndex(f => f.id === item.id), data: { ...item } })}><Edit3 size={14} /></button>
                  <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setFaq(faq.filter(f => f.id !== item.id)); showSaved(); } }}><Trash2 size={14} /></button>
                </div>
              </div>
              <p className={styles.itemCardDesc}>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── GALLERY PANEL ─── */
  const renderGalleryPanel = () => {
    const uniqueLocations = Array.from(new Set(gallery.map(i => i.location))).filter(Boolean);
    const allGalleryTabs = ["All", ...Array.from(new Set([...uniqueLocations, ...customGalleryCategories]))];
    const filteredGallery = galleryTab === "All" ? gallery : gallery.filter(i => i.location === galleryTab);

    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Gallery</h2>
          <p className={styles.panelDesc}>Manage photos in the main visual diary and gallery page.</p>
        </div>

        <div className={styles.tabBar} style={{ marginBottom: "20px", flexWrap: "nowrap", gap: "10px", display: "flex", overflowX: "auto", paddingBottom: "8px", maxWidth: "100%", scrollBehavior: "smooth" }}>
          {allGalleryTabs.map(tab => (
            <button 
              key={tab} 
              className={`${styles.tabBtn} ${galleryTab === tab ? styles.tabActive : ""}`}
              onClick={() => setGalleryTab(tab)}
              style={{ flexShrink: 0, whiteSpace: "nowrap" }}
            >
              {tab}
            </button>
          ))}
          <button 
            className={styles.tabBtn}
            onClick={() => {
              const newCat = window.prompt("Enter new destination category name:");
              if (newCat && newCat.trim()) {
                setCustomGalleryCategories([...customGalleryCategories, newCat.trim()]);
                setGalleryTab(newCat.trim());
              }
            }}
            style={{ flexShrink: 0, whiteSpace: "nowrap" }}
          >
            <Plus size={14} style={{ marginRight: 4 }} /> Add
          </button>
        </div>

        <button className={styles.addBtn} onClick={() => {
          setEditingItem({
            section: "gallery",
            isNew: true,
            data: {
              id: Date.now(),
              url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
              location: galleryTab === "All" ? "General" : galleryTab,
              caption: "",
            }
          });
        }}><Plus size={16} /> Add Photo {galleryTab !== "All" && `for ${galleryTab}`}</button>

        <div className={styles.itemsList}>
          {filteredGallery.map((item, i) => (
            <div 
              key={`${item.id}-${i}`} 
              className={styles.itemCard}
              draggable
              onDragStart={() => { dragItem.current = i; }}
              onDragEnter={() => { dragOverItem.current = i; }}
              onDragEnd={() => {
                if (galleryTab === "All") {
                  handleSort(gallery, setGallery);
                } else {
                  let _full = [...gallery];
                  const draggedItem = filteredGallery[dragItem.current];
                  const targetItem = filteredGallery[dragOverItem.current];
                  if (!draggedItem || !targetItem) return;
                  const fromIdx = _full.findIndex(x => x.id === draggedItem.id);
                  if (fromIdx === -1) return;
                  _full.splice(fromIdx, 1);
                  const toIdx = _full.findIndex(x => x.id === targetItem.id);
                  if (toIdx === -1) return;
                  _full.splice(toIdx, 0, draggedItem);
                  dragItem.current = null;
                  dragOverItem.current = null;
                  setGallery(_full);
                  showSaved();
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              style={{ cursor: "grab" }}
            >
              <div className={styles.itemCardHeader}>
                <div className={styles.itemCardTitle}>
                  <span className={styles.itemIndex}>{i + 1}</span>
                  <strong>{item.location || "General"}</strong>
                </div>
                <div className={styles.itemCardActions}>
                  <button className={styles.editBtn} onClick={() => setEditingItem({ section: "gallery", index: gallery.findIndex(g => g.id === item.id), data: { ...item } })}><Edit3 size={14} /></button>
                  <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setGallery(gallery.filter(g => g.id !== item.id)); showSaved(); } }}><Trash2 size={14} /></button>
                </div>
              </div>
              <p className={styles.itemCardDesc}>{item.caption || "No caption"}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── BLOGS PANEL ─── */
  const renderBlogsPanel = () => {
    const uniqueCategories = Array.from(new Set(blogs.map(i => i.category))).filter(Boolean);
    const allBlogTabs = ["All", ...Array.from(new Set([...uniqueCategories, ...customBlogCategories]))];
    const filteredBlogs = blogTab === "All" ? blogs : blogs.filter(i => i.category === blogTab);

    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Blogs</h2>
          <p className={styles.panelDesc}>Manage blog posts displayed on the homepage and the main blogs listing page.</p>
        </div>

        <div className={styles.tabBar} style={{ marginBottom: "20px", flexWrap: "nowrap", gap: "10px", display: "flex", overflowX: "auto", paddingBottom: "8px", maxWidth: "100%", scrollBehavior: "smooth" }}>
          {allBlogTabs.map(tab => (
            <button 
              key={tab} 
              className={`${styles.tabBtn} ${blogTab === tab ? styles.tabActive : ""}`}
              onClick={() => setBlogTab(tab)}
              style={{ flexShrink: 0, whiteSpace: "nowrap" }}
            >
              {tab}
            </button>
          ))}
          <button 
            className={styles.tabBtn}
            onClick={() => {
              const newCat = window.prompt("Enter new blog category name:");
              if (newCat && newCat.trim()) {
                setCustomBlogCategories([...customBlogCategories, newCat.trim()]);
                setBlogTab(newCat.trim());
              }
            }}
            style={{ flexShrink: 0, whiteSpace: "nowrap" }}
          >
            <Plus size={14} style={{ marginRight: 4 }} /> Add
          </button>
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
              category: blogTab === "All" ? "General" : blogTab,
              content: "",
              images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
              isFeatured: false,
            }
          });
        }}><Plus size={16} /> Add Blog {blogTab !== "All" && `for ${blogTab}`}</button>

        <div className={styles.itemsList}>
          {filteredBlogs.map((item, i) => (
            <div 
              key={`${item.id}-${i}`} 
              className={styles.itemCard}
              draggable
              onDragStart={() => { dragItem.current = i; }}
              onDragEnter={() => { dragOverItem.current = i; }}
              onDragEnd={() => {
                if (blogTab === "All") {
                  handleSort(blogs, setBlogs);
                } else {
                  let _full = [...blogs];
                  const draggedItem = filteredBlogs[dragItem.current];
                  const targetItem = filteredBlogs[dragOverItem.current];
                  if (!draggedItem || !targetItem) return;
                  const fromIdx = _full.findIndex(x => x.id === draggedItem.id);
                  if (fromIdx === -1) return;
                  _full.splice(fromIdx, 1);
                  const toIdx = _full.findIndex(x => x.id === targetItem.id);
                  if (toIdx === -1) return;
                  _full.splice(toIdx, 0, draggedItem);
                  dragItem.current = null;
                  dragOverItem.current = null;
                  setBlogs(_full);
                  showSaved();
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              style={{ cursor: "grab" }}
            >
              <div className={styles.itemCardHeader}>
                <div className={styles.itemCardTitle}>
                  <span className={styles.itemIndex}>{i + 1}</span>
                  <strong>{item.title || "Untitled"}</strong>
                  {item.isFeatured && <span className={styles.ratingBadge}>Featured</span>}
                </div>
                <div className={styles.itemCardActions}>
                  <button className={styles.editBtn} onClick={() => setEditingItem({ section: "blogs", index: blogs.findIndex(b => b.id === item.id), data: { ...item } })}><Edit3 size={14} /></button>
                  <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setBlogs(blogs.filter(b => b.id !== item.id)); showSaved(); } }}><Trash2 size={14} /></button>
                </div>
              </div>
              <p className={styles.itemCardDesc}>{item.category} · {item.publishedAt}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── ITINERARIES PANEL ─── */
  const allLocations = [
    ...new Set([
      ...exploreIntl.map((d) => d.name),
      ...exploreDom.map((d) => d.name),
    ]),
  ];
  
  const allCategories = Array.from(new Set([
    "Group Trips", "Customized Trips", "Corporate Trips", "Honeymoon", "Solo Travel", "Family Group", "Global Group", "International",
    ...itineraries.flatMap(i => i.categories || []),
    ...customItinCategories
  ])).filter(Boolean);

  const renderItinerariesPanel = () => {
    const allItinTabs = ["All", ...allCategories];
    const filteredItineraries = itinTab === "All" ? itineraries : itineraries.filter(i => (i.categories || []).includes(itinTab));

    return (
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2>Itineraries</h2>
          <p className={styles.panelDesc}>Manage all itineraries centrally. Tag them with locations and categories to use across the site.</p>
        </div>

        <div className={styles.tabBar} style={{ marginBottom: "20px", flexWrap: "nowrap", gap: "10px", display: "flex", overflowX: "auto", paddingBottom: "8px", maxWidth: "100%", scrollBehavior: "smooth" }}>
          {allItinTabs.map(tab => (
            <button 
              key={tab} 
              className={`${styles.tabBtn} ${itinTab === tab ? styles.tabActive : ""}`}
              onClick={() => setItinTab(tab)}
              style={{ flexShrink: 0, whiteSpace: "nowrap" }}
            >
              {tab}
            </button>
          ))}
          <button 
            className={styles.tabBtn}
            onClick={() => {
              const newCat = window.prompt("Enter new itinerary category name:");
              if (newCat && newCat.trim()) {
                setCustomItinCategories([...customItinCategories, newCat.trim()]);
                setItinTab(newCat.trim());
              }
            }}
            style={{ flexShrink: 0, whiteSpace: "nowrap" }}
          >
            <Plus size={14} style={{ marginRight: 4 }} /> Add
          </button>
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
              images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800"],
              type: "domestic",
              locations: [],
              categories: itinTab === "All" ? [] : [itinTab],
              description: "",
              detailedDays: [],
            }
          });
        }}><Plus size={16} /> Add Itinerary {itinTab !== "All" && `for ${itinTab}`}</button>

        <div className={styles.itemsList}>
          {filteredItineraries.map((item, i) => (
            <div 
              key={`${item.id}-${i}`} 
              className={styles.itemCard}
              draggable
              onDragStart={() => { dragItem.current = i; }}
              onDragEnter={() => { dragOverItem.current = i; }}
              onDragEnd={() => {
                if (itinTab === "All") {
                  handleSort(itineraries, setItineraries);
                } else {
                  let _full = [...itineraries];
                  const draggedItem = filteredItineraries[dragItem.current];
                  const targetItem = filteredItineraries[dragOverItem.current];
                  if (!draggedItem || !targetItem) return;
                  const fromIdx = _full.findIndex(x => x.id === draggedItem.id);
                  if (fromIdx === -1) return;
                  _full.splice(fromIdx, 1);
                  const toIdx = _full.findIndex(x => x.id === targetItem.id);
                  if (toIdx === -1) return;
                  _full.splice(toIdx, 0, draggedItem);
                  dragItem.current = null;
                  dragOverItem.current = null;
                  setItineraries(_full);
                  showSaved();
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              style={{ cursor: "grab" }}
            >
              <div className={styles.itemCardHeader}>
                <div className={styles.itemCardTitle}>
                  <span className={styles.itemIndex}>{i + 1}</span>
                  <strong>{item.title || "Untitled"}</strong>
                  <span className={styles.ratingBadge}>★ {item.rating}</span>
                </div>
                <div className={styles.itemCardActions}>
                  <button className={styles.editBtn} onClick={() => setEditingItem({ section: "itineraries", index: itineraries.findIndex(it => it.id === item.id), data: { ...item, locations: [...(item.locations || [])], categories: [...(item.categories || [])] } })}><Edit3 size={14} /></button>
                  <button className={styles.deleteBtn} onClick={() => { if(window.confirm("Are you sure you want to delete this?")) { setItineraries(itineraries.filter(it => it.id !== item.id)); showSaved(); } }}><Trash2 size={14} /></button>
                </div>
              </div>
              <div className={styles.itemCardMeta}>
                <span className={styles.tripTag} style={{ textTransform: 'capitalize' }}>{item.type}</span>
                <span>{item.days}</span>
                <span className={styles.priceBadge}>{item.budget}</span>
              </div>
              <p className={styles.itemCardDesc}>
                {(item.locations || []).join(", ")} {(item.categories || []).length > 0 && `· ${(item.categories || []).join(", ")}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  /* ─── EDIT MODAL ─── */
  const renderEditModal = () => {
    if (!editingItem) return null;
    const { section, data } = editingItem;

    const updateField = (field, value) => {
      setEditingItem({ ...editingItem, data: { ...data, [field]: value } });
    };

    const saveEdit = () => {
      const cleanData = { ...data };

      if (section === "popular") {
        const updated = [...popular];
        if (editingItem.isNew) updated.unshift(cleanData);
        else updated[editingItem.index] = cleanData;
        setPopular(updated);
      } else if (section === "header-categories") {
        const updated = [...headerCategories];
        if (editingItem.isNew) updated.unshift(cleanData);
        else updated[editingItem.index] = cleanData;
        setHeaderCategories(updated);
      } else if (section === "trip-categories") {
        const updated = [...tripCategories];
        if (editingItem.isNew) updated.unshift(cleanData);
        else updated[editingItem.index] = cleanData;
        setTripCategories(updated);
      } else if (section === "explore") {
        if (editingItem.tab === "international") {
          const updated = [...exploreIntl];
          if (editingItem.isNew) updated.unshift(cleanData);
          else updated[editingItem.index] = cleanData;
          setExploreIntl(updated);
        } else {
          const updated = [...exploreDom];
          if (editingItem.isNew) updated.unshift(cleanData);
          else updated[editingItem.index] = cleanData;
          setExploreDom(updated);
        }
      } else if (section === "reviews") {
        const updated = [...reviews];
        if (editingItem.isNew) updated.unshift(cleanData);
        else updated[editingItem.index] = cleanData;
        setReviews(updated);
      } else if (section === "faq") {
        const updated = [...faq];
        if (editingItem.isNew) updated.push(cleanData);
        else updated[editingItem.index] = cleanData;
        setFaq(updated);
      } else if (section === "blogs") {
        const updated = [...blogs];
        if (editingItem.isNew) updated.unshift(cleanData);
        else updated[editingItem.index] = cleanData;
        setBlogs(updated);
      } else if (section === "itineraries") {
        const updated = [...itineraries];
        if (editingItem.isNew) updated.unshift(cleanData);
        else updated[editingItem.index] = cleanData;
        setItineraries(updated);
      } else if (section === "gallery") {
        const updated = [...gallery];
        if (editingItem.isNew) updated.unshift(cleanData);
        else updated[editingItem.index] = cleanData;
        setGallery(updated);
      } else if (section === "flyer") {
        const updated = Array.isArray(flyer) ? [...flyer] : [];
        if (editingItem.isNew) updated.unshift(cleanData);
        else updated[editingItem.index] = cleanData;
        setFlyer(updated);
      }
      setEditingItem(null);
      setEditingItinIdx(null);
      showSaved();
    };

    return (
      <div className={styles.modalOverlay} onClick={() => setEditingItem(null)}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={styles.modalHeader}>
            <h3>Edit {section === "popular" ? "Destination" : section === "explore" ? "Destination" : section === "reviews" ? "Review" : section === "blogs" ? "Blog" : section === "itineraries" ? "Itinerary" : section === "gallery" ? "Photo" : section === "flyer" ? "Banner" : "FAQ"}</h3>
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
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={data.title} onChange={(e) => updateField("title", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Custom Route (Optional)</label><input className={styles.textInput} value={data.customRoute || ""} placeholder="/categories/some-category" onChange={(e) => updateField("customRoute", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Images</label>
                  {(() => {
                    const imgArray = Array.isArray(data.images) && data.images.length > 0 ? data.images : (data.image ? [data.image] : [""]);
                    return (
                      <>
                        {imgArray.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              className={styles.textInput} 
                              value={img} 
                              placeholder="Image URL"
                              onChange={(e) => {
                                const newImages = [...imgArray];
                                newImages[idx] = e.target.value;
                                updateField("images", newImages);
                              }} 
                            />
                            {imgArray.length > 1 && (
                              <button 
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => updateField("images", imgArray.filter((_, i) => i !== idx))}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className={styles.addSmallBtn} 
                          onClick={() => updateField("images", [...imgArray, ""])}
                        >
                          <Plus size={14} /> Add Image
                        </button>
                      </>
                    );
                  })()}
                </div>
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
                        if (window.confirm("Are you sure you want to delete this?")) {
                          updateField("highlights", data.highlights.filter((_, hi) => hi !== idx));
                        }
                      }}><X size={12} /></button>
                    </div>
                  ))}
                  <button className={styles.addSmallBtn} onClick={() => updateField("highlights", [...data.highlights, ""])}><Plus size={14} /> Add</button>
                </div>

              </>
            )}
            {(section === "trip-categories" || section === "header-categories") && (
              <>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Label</label><input className={styles.textInput} value={data.label} onChange={(e) => updateField("label", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Slug</label><input className={styles.textInput} value={data.slug} onChange={(e) => updateField("slug", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Tagline</label><input className={styles.textInput} value={data.tagline} onChange={(e) => updateField("tagline", e.target.value)} /></div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Description</label><RichTextEditor value={data.desc} onChange={(val) => updateField("desc", val)} /></div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Images</label>
                  {(() => {
                    const imgArray = Array.isArray(data.images) && data.images.length > 0 ? data.images : (data.image ? [data.image] : [""]);
                    return (
                      <>
                        {imgArray.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              className={styles.textInput} 
                              value={img} 
                              placeholder="Image URL"
                              onChange={(e) => {
                                const newImages = [...imgArray];
                                newImages[idx] = e.target.value;
                                updateField("images", newImages);
                              }} 
                            />
                            {imgArray.length > 1 && (
                              <button 
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => updateField("images", imgArray.filter((_, i) => i !== idx))}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className={styles.addSmallBtn} 
                          onClick={() => updateField("images", [...imgArray, ""])}
                        >
                          <Plus size={14} /> Add Image
                        </button>
                      </>
                    );
                  })()}
                </div>
                <NestedItineraryEditor itineraries={data.itineraries || []} onChange={(val) => updateField("itineraries", val)} />
              </>
            )}
            {section === "explore" && (
              <>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Name</label><input className={styles.textInput} value={data.name} onChange={(e) => updateField("name", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Tagline</label><input className={styles.textInput} value={data.tagline || ""} onChange={(e) => updateField("tagline", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Description</label><RichTextEditor value={data.desc} onChange={(val) => updateField("desc", val)} /></div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Images</label>
                  {(() => {
                    const imgArray = Array.isArray(data.images) && data.images.length > 0 ? data.images : (data.image ? [data.image] : [""]);
                    return (
                      <>
                        {imgArray.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              className={styles.textInput} 
                              value={img} 
                              placeholder="Image URL"
                              onChange={(e) => {
                                const newImages = [...imgArray];
                                newImages[idx] = e.target.value;
                                updateField("images", newImages);
                              }} 
                            />
                            {imgArray.length > 1 && (
                              <button 
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => updateField("images", imgArray.filter((_, i) => i !== idx))}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className={styles.addSmallBtn} 
                          onClick={() => updateField("images", [...imgArray, ""])}
                        >
                          <Plus size={14} /> Add Image
                        </button>
                      </>
                    );
                  })()}
                </div>

                <NestedItineraryEditor itineraries={data.itineraries || []} onChange={(val) => updateField("itineraries", val)} />
              </>
            )}
            {section === "reviews" && (
              <>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Name</label><input className={styles.textInput} value={data.name} onChange={(e) => updateField("name", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Rating</label><input className={styles.textInput} type="number" min={1} max={5} value={data.rating} onChange={(e) => updateField("rating", parseInt(e.target.value) || 5)} /></div>
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Review Text</label><RichTextEditor value={data.text} onChange={(val) => updateField("text", val)} /></div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Trip Name</label><input className={styles.textInput} value={data.tripName} onChange={(e) => updateField("tripName", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Review Link (URL)</label><input className={styles.textInput} value={data.reviewLink || ""} placeholder="https://..." onChange={(e) => updateField("reviewLink", e.target.value)} /></div>
                </div>
              </>
            )}
            {section === "faq" && (
              <>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Question</label><input className={styles.textInput} value={data.question} onChange={(e) => updateField("question", e.target.value)} /></div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Answer</label><RichTextEditor value={data.answer} onChange={(val) => updateField("answer", val)} /></div>
              </>
            )}
            {section === "gallery" && (
              <>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Image URL</label><input className={styles.textInput} value={data.url} onChange={(e) => updateField("url", e.target.value)} /></div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Caption (Optional)</label><input className={styles.textInput} value={data.caption} onChange={(e) => updateField("caption", e.target.value)} /></div>
              </>
            )}
            {section === "blogs" && (
              <>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={data.title} onChange={(e) => updateField("title", e.target.value)} /></div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Author</label><input className={styles.textInput} value={data.author} onChange={(e) => updateField("author", e.target.value)} /></div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Published At</label><input className={styles.textInput} value={data.publishedAt} onChange={(e) => updateField("publishedAt", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Reading Time</label><input className={styles.textInput} value={data.readingTime} onChange={(e) => updateField("readingTime", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Images</label>
                  {(() => {
                    const imgArray = Array.isArray(data.images) && data.images.length > 0 ? data.images : (data.image ? [data.image] : [""]);
                    return (
                      <>
                        {imgArray.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              className={styles.textInput} 
                              value={img} 
                              placeholder="Image URL"
                              onChange={(e) => {
                                const newImages = [...imgArray];
                                newImages[idx] = e.target.value;
                                updateField("images", newImages);
                              }} 
                            />
                            {imgArray.length > 1 && (
                              <button 
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => updateField("images", imgArray.filter((_, i) => i !== idx))}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className={styles.addSmallBtn} 
                          onClick={() => updateField("images", [...imgArray, ""])}
                        >
                          <Plus size={14} /> Add Image
                        </button>
                      </>
                    );
                  })()}
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Content</label><RichTextEditor value={data.content} onChange={(val) => updateField("content", val)} /></div>
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
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Images</label>
                  {(() => {
                    const imgArray = Array.isArray(data.images) && data.images.length > 0 ? data.images : (data.image ? [data.image] : [""]);
                    return (
                      <>
                        {imgArray.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              className={styles.textInput} 
                              value={img} 
                              placeholder="Image URL"
                              onChange={(e) => {
                                const newImages = [...imgArray];
                                newImages[idx] = e.target.value;
                                updateField("images", newImages);
                              }} 
                            />
                            {imgArray.length > 1 && (
                              <button 
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => updateField("images", imgArray.filter((_, i) => i !== idx))}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className={styles.addSmallBtn} 
                          onClick={() => updateField("images", [...imgArray, ""])}
                        >
                          <Plus size={14} /> Add Image
                        </button>
                      </>
                    );
                  })()}
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Overview</label><RichTextEditor value={data.overview || data.description} onChange={(val) => updateField("overview", val)} /></div>

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

                {/* Detailed Days Plan */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel} style={{ marginTop: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px' }}>Day-wise Plan</label>
                  {(data.detailedDays || []).map((day, idx) => (
                    <div key={idx} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px', marginBottom: '12px', background: '#f9fafb' }}>
                      <div className={styles.fieldRow}>
                        <div className={styles.fieldGroup} style={{ flex: 1 }}>
                          <label className={styles.fieldLabel}>Day Title</label>
                          <input className={styles.textInput} placeholder="e.g. Day 1: Arrival at Maldives" value={day.title || ""} onChange={(e) => {
                            const updated = [...(data.detailedDays || [])];
                            updated[idx] = { ...updated[idx], title: e.target.value };
                            updateField("detailedDays", updated);
                          }} />
                        </div>
                      </div>
                      <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Description</label>
                        <RichTextEditor placeholder="Describe the day's activities..." value={day.description || ""} onChange={(val) => {
                          const updated = [...(data.detailedDays || [])];
                          updated[idx] = { ...updated[idx], description: val };
                          updateField("detailedDays", updated);
                        }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                        <button className={styles.deleteBtn} onClick={() => {
                          if (window.confirm("Are you sure you want to delete this?")) {
                            updateField("detailedDays", (data.detailedDays || []).filter((_, i) => i !== idx));
                          }
                        }}><Trash2 size={14} /> Remove Day</button>
                      </div>
                    </div>
                  ))}
                  <button className={styles.addSmallBtn} onClick={() => {
                    updateField("detailedDays", [...(data.detailedDays || []), { title: "", description: "" }]);
                  }}><Plus size={14} /> Add Day</button>
                </div>
              </>
            )}
            {section === "flyer" && (
              <>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Badge Text</label><input className={styles.textInput} value={data.badge} onChange={(e) => updateField("badge", e.target.value)} /></div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Title</label><input className={styles.textInput} value={data.title} onChange={(e) => updateField("title", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Subtitle</label><input className={styles.textInput} value={data.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} /></div>
                </div>
                <div className={styles.fieldRow}>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Discount Label</label><input className={styles.textInput} value={data.discountLabel} onChange={(e) => updateField("discountLabel", e.target.value)} /></div>
                  <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Discount Amount</label><input className={styles.textInput} value={data.discountAmount} onChange={(e) => updateField("discountAmount", e.target.value)} /></div>
                </div>
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Background Images</label>
                  {(() => {
                    const imgArray = Array.isArray(data.images) && data.images.length > 0 ? data.images : (data.image ? [data.image] : [""]);
                    return (
                      <>
                        {imgArray.map((img, idx) => (
                          <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                            <input 
                              className={styles.textInput} 
                              value={img} 
                              placeholder="Image URL"
                              onChange={(e) => {
                                const newImages = [...imgArray];
                                newImages[idx] = e.target.value;
                                updateField("images", newImages);
                              }} 
                            />
                            {imgArray.length > 1 && (
                              <button 
                                type="button"
                                className={styles.deleteBtn}
                                onClick={() => updateField("images", imgArray.filter((_, i) => i !== idx))}
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        ))}
                        <button 
                          type="button" 
                          className={styles.addSmallBtn} 
                          onClick={() => updateField("images", [...imgArray, ""])}
                        >
                          <Plus size={14} /> Add Image
                        </button>
                      </>
                    );
                  })()}
                </div>
                <div className={styles.fieldGroup}><label className={styles.fieldLabel}>Link URL</label><input className={styles.textInput} value={data.linkUrl} onChange={(e) => updateField("linkUrl", e.target.value)} /></div>
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
      case "header-categories": return renderHeaderCategoriesPanel();
      case "trip-categories": return renderTripCategoriesPanel();
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
