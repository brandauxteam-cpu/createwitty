# CreateWitty — React website + Supabase CMS

A production React (Vite) website for CreateWitty with:

- Full marketing site (Home, Contact, Blog, News) converted from the original design
- A **login-protected CMS** at `/admin` for your manager & SEO person to publish **blog** and **news** posts
- Per-post **meta title, meta description, canonical URL**, cover image + **alt text**, and a rich body editor (H1/H2/H3 headings, bold, links, bullet lists, **image upload**, **video embed**)
- SEO best practices site-wide: `react-helmet-async` per-page tags, Open Graph/Twitter, JSON-LD structured data, `robots.txt`, sitemap generator
- Enrollment + contact forms that email you via FormSubmit (no backend)
- Free database & auth via **Supabase**
- Deploys to **GoDaddy** shared hosting as static files

---

## 0) What you need (one-time accounts)

1. A free **Supabase** account → https://supabase.com
2. Your **GoDaddy** hosting (cPanel) — which you already have
3. **Node.js 18+** on your computer to build the site → https://nodejs.org

---

## 1) Create the Supabase project (database + logins)

1. Go to https://supabase.com → **New project**. Pick a name, a strong DB password, and a region near India (e.g. Mumbai). Wait ~2 minutes for it to provision.
2. Open **SQL Editor → New query**, paste the entire contents of `supabase/schema.sql` from this project, and click **Run**. This creates the `posts` table, security rules, and the `blog-images` storage bucket.
3. Get your API keys: **Project Settings → API**. Copy:
   - **Project URL** (looks like `https://abcd1234.supabase.co`)
   - **anon public** key (a long token — this is safe for the browser)
4. Create the CMS logins for your team: **Authentication → Users → Add user**.
   - Enter the manager's email + a password, tick **Auto Confirm User**, Save.
   - Repeat for the SEO person.
   - These are the logins you share. They sign in at `https://yourdomain.com/admin/login`.
   - To add/remove access later, add or delete users here. (No code changes needed.)

---

## 2) Configure the project

1. In this project folder, copy the example env file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in:
   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-PUBLIC-ANON-KEY
   VITE_FORM_EMAIL=pranith.gorityala49@gmail.com
   VITE_SITE_URL=https://www.createwitty.com
   ```
   - `VITE_FORM_EMAIL` — where enrollment/contact form submissions are emailed.
   - `VITE_SITE_URL` — your final live URL (used for canonical tags & sitemap). No trailing slash.
3. (Optional) Update placeholder phone/WhatsApp numbers in `src/lib/site.js`.

---

## 3) Run it locally (to preview)

```bash
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

- Public site: `/`, `/contact`, `/blog`, `/news`
- CMS: `/admin/login` → sign in with a Supabase user you created

> The site also runs **before** Supabase is configured — blog/news simply show an
> empty state until you add your keys and publish posts.

---

## 4) Build for production

```bash
npm run build
```

This creates a **`dist/`** folder containing the entire static website (HTML, CSS, JS, images, `.htaccess`, `robots.txt`). That `dist` folder is what you upload to GoDaddy.

Optional — generate a sitemap first (pulls your published posts from Supabase):
```bash
npm run sitemap   # writes public/sitemap.xml
npm run build
```

---

## 5) Deploy to GoDaddy (cPanel shared hosting)

Your React app compiles to plain static files, so it runs on standard GoDaddy hosting. Supabase (database/auth) runs in the cloud and is called from the browser — nothing to install on GoDaddy.

1. Log in to GoDaddy → **My Products → Web Hosting → Manage → cPanel**.
2. Open **File Manager → `public_html`**. (If this domain lives in a subfolder/add-on domain, use that folder instead.)
3. Delete any old default files (e.g. a placeholder `index.html`), if present.
4. Upload the **contents of the `dist/` folder** (not the folder itself) into `public_html`:
   - Easiest: on your computer, zip everything **inside** `dist` into `site.zip`, upload `site.zip` via File Manager, then **Extract** it in `public_html`.
   - Make sure the hidden **`.htaccess`** file is included. In File Manager enable **Settings → Show Hidden Files (dotfiles)** so you can see it. This file makes `/blog`, `/news`, `/admin` work on refresh — without it those URLs 404.
5. Visit `https://yourdomain.com` — the site is live.
6. Your team logs in at `https://yourdomain.com/admin/login`.

**To publish updates later:** run `npm run build` again and re-upload the new `dist` contents (overwrite). Blog/news content does **not** require a rebuild — that's stored in Supabase and updates instantly when your team publishes from `/admin`.

---

## 6) How the CMS works (for your manager / SEO person)

1. Go to `https://yourdomain.com/admin/login` and sign in.
2. **Dashboard** lists all posts. Click **+ New Post**.
3. Fill in:
   - **Title (H1)** — the main heading; the URL slug auto-fills (editable).
   - **Excerpt** — short summary for cards & search snippets.
   - **Body** — rich editor: headings (H1/H2/H3), bold/italic, links, bullet/numbered lists, **images** (uploaded to Supabase), and **video** (click the video button and paste a YouTube/Vimeo URL).
   - **Type** — Blog or News.
   - **SEO settings** — Meta title (≈60 chars), Meta description (≈155 chars), Canonical URL (optional).
   - **Cover image** + **alt text** (for SEO/accessibility).
4. **Save draft** (hidden) or **Publish** (goes live immediately at `/blog/your-slug` or `/news/your-slug`).

Only the blog & news posts are editable in the CMS. The main marketing pages (Home, Contact) have their SEO baked into the code — no login needed for those, exactly as requested.

---

## 7) SEO checklist (already built in)

- Unique `<title>`, meta description & canonical on every page (`src/components/Seo.jsx`)
- Open Graph + Twitter card tags for social sharing
- JSON-LD structured data: Organization + Courses + FAQ (Home), Article/NewsArticle (posts)
- Semantic HTML, single `<h1>` per page, descriptive image `alt` text
- `robots.txt` (blocks `/admin`) and a sitemap generator (`npm run sitemap`)

After deploying, submit `https://yourdomain.com/sitemap.xml` in **Google Search Console**.

### Note on SEO for a single-page app
This app is a client-rendered SPA (required for GoDaddy shared hosting, which can't run Node/SSR). Google renders JavaScript and will index the meta tags set by react-helmet. If later you want **server-side rendering** for the strongest possible SEO and instant social previews, you can deploy the same codebase to **Vercel/Netlify (free)** with a Next.js migration — ask and it can be done. For GoDaddy, the current setup is the correct approach.

---

## Project structure

```
createwitty-react/
├─ public/               # static assets copied as-is (.htaccess, robots.txt, favicon)
├─ supabase/schema.sql   # run once in Supabase SQL editor
├─ scripts/              # sitemap + verification helpers
├─ src/
│  ├─ components/        # Navbar, Footer, Seo, modals, Reveal, RichContent, ...
│  ├─ context/           # AuthContext (login), EnrollContext (global form)
│  ├─ data/courses.js    # course package content
│  ├─ lib/               # supabaseClient, posts (CRUD), site constants
│  ├─ pages/             # Home, Contact, Blog, News, ThankYou, 404
│  │  └─ admin/          # Login, Dashboard, PostEditor (the CMS)
│  ├─ App.jsx            # routes
│  └─ main.jsx           # app entry
├─ .env.example
└─ package.json
```

## Handy commands

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Local preview server |
| `npm run build` | Build the `dist/` folder to upload |
| `npm run preview` | Preview the production build locally |
| `npm run sitemap` | Regenerate `public/sitemap.xml` from published posts |
| `node scripts/verify.mjs` | Static check: parses all files + resolves imports |
