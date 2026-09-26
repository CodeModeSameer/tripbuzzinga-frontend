# TripBuzzinga Frontend - AI Handover Document

Welcome! If you are an AI assistant in another IDE picking up this project, this document contains the essential context you need to understand the architecture, database schema, and recent major changes.

## 1. Project Overview
TripBuzzinga is a modern travel agency website built with **Next.js (App Router)** and **React**. It features a live customer-facing website and a custom Admin Dashboard (`/admin`) to manage content (destinations, itineraries, blogs, FAQs, etc.).

## 2. Recent Major Architectural Change (The Database Migration)
Previously, the site relied on a fragile system where the Admin Panel saved all drafts to the browser's `localStorage` and then pushed a giant JSON blob to a single `site_data` table in Supabase. This caused severe data loss issues.

**We recently completed a massive database redesign to fix this:**
*   The system now uses **9 individual Supabase tables** as the single source of truth for the Admin Panel.
*   **The "Draft" Workflow:** When an admin edits data and clicks "Save" in the Admin Panel, it saves directly to these individual tables. It does *not* go live immediately.
*   **The "Publish" Workflow:** When the admin clicks "Publish to Live Site", the system aggregates all data from the 9 individual tables and pushes it as a JSON snapshot to the `site_data` table. The customer-facing website reads strictly from this `site_data` snapshot to maximize speed.

## 3. Database Schema (Supabase)
The database contains the following tables (all use `uuid` primary keys except `hero_settings`):

1.  **`site_data`**: The live snapshot table. Contains a single row (`id: 1`) with a `data` column (JSONB) holding the entire live website content.
2.  **`hero_settings`**: Contains a single row (`id: 1`) with a `data` column (JSONB) for the hero section background, stats, and rotating text.
3.  **`destinations`**: Stores both Popular, Explore International, and Explore Domestic destinations. Differentiated by the `dest_type` column (`popular`, `international`, `domestic`).
4.  **`itineraries`**: Stores all detailed trip itineraries (days, budget, pickup, detailed day-by-day plans, inclusions/exclusions).
5.  **`categories`**: Stores trip and header categories, differentiated by the `cat_type` column (`header`, `trip`).
6.  **`blogs`**: Stores blog posts.
7.  **`reviews`**: Stores customer reviews.
8.  **`faqs`**: Stores frequently asked questions.
9.  **`gallery`**: Stores gallery images.
10. **`flyers`**: Stores promotional banners/flyers.

*Note: All tables include a `sort_order` integer column to handle drag-and-drop reordering.*

## 4. Key API Routes
All API routes are located in `src/app/api/admin/`:
*   `/api/admin/load`: (GET) Fetches all data from the individual tables and formats it for the Admin Panel state.
*   `/api/admin/save`: (POST) Upserts a single item into its respective individual table.
*   `/api/admin/save-order`: (POST) Updates the `sort_order` for an array of items (used for drag-and-drop).
*   `/api/admin/delete`: (POST) Deletes an item from its respective table by UUID.
*   `/api/admin/publish`: (POST) Aggregates all data from the individual tables and overwrites the `site_data` table snapshot.

## 5. State Management
*   **`SiteDataContext.js`**: The global context provider. 
    *   On the *Live Site*, it fetches the `site_data` snapshot once on mount.
    *   On the *Admin Panel*, it exposes functions like `loadAdminData()`, `saveItemToDb()`, `deleteItemFromDb()`, and `publishSiteData()`.

## 6. Styling & UI
*   **CSS**: Uses standard CSS Modules (`.module.css`).
*   **Icons**: `lucide-react`.
*   **Drag & Drop**: Native HTML5 Drag and Drop API implemented in `admin/page.js` (`handleSort`).
*   **Rich Text**: Custom `RichTextEditor` using `react-quill`. Output is rendered dangerously using `__html`. We recently added `white-space: pre-wrap; word-wrap: break-word;` globally to handle text layout properly.

## 7. Current Status
All known bugs regarding drag-and-drop sorting, deleting items, and layout distortions have been resolved. The platform is stable and uses robust database persistence.
