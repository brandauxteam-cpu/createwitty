# CreateWitty — Complete Setup Guide (No coding, no software to install)

This guide takes you from **zero** to a **live website with a blog CMS**, using only free tools and your web browser. You will **not** install anything or use a terminal.

**You will use 4 things (all free except the domain you already own):**

| Tool | What it's for | Cost |
|---|---|---|
| **GitHub** | Stores your website code online | Free |
| **Netlify** | Builds & hosts the live website automatically | Free |
| **Supabase** | Database + logins for the blog/news CMS | Free |
| **GoDaddy** | Your domain name (you already have this) | Already paid |

⏱️ Total time: about **45–60 minutes**, one time.

> **Do I need GitHub?** For this easy no-install path, **yes** — Netlify reads your
> code from GitHub and rebuilds the site automatically whenever it changes. It's free
> and you only use the website (no commands).

---

## PART A — Get the project ready (5 min)

1. Download the file **`createwitty-react-project.zip`** I gave you.
2. **Unzip it** (right-click → Extract All on Windows, or double-click on Mac). You'll get a folder called **`createwitty-react`** containing all the website files. Keep this folder handy.

That's it for now — you don't open or edit any code.

---

## PART B — Create the database (Supabase) (15 min)

1. Go to **https://supabase.com** → click **Start your project** → sign up (Google or email — free).
2. Click **New project**.
   - **Name:** CreateWitty
   - **Database Password:** click *Generate a password* and **save it somewhere** (you rarely need it, but keep it).
   - **Region:** choose the one closest to you (e.g. *Mumbai / South Asia*).
   - Click **Create new project** and wait ~2 minutes while it sets up.
3. **Create the tables (copy-paste, one time):**
   - In the left menu click **SQL Editor** → **+ New query**.
   - Open the file `supabase/schema.sql` from your project folder (open it with Notepad/TextEdit), select **all** the text, copy it.
   - Paste it into the Supabase SQL box → click **Run** (bottom right). You should see *Success*.
4. **Get your 2 keys:**
   - Left menu → **Project Settings** (gear icon) → **API**.
   - Copy the **Project URL** (looks like `https://abcd1234.supabase.co`) — paste it into a notepad.
   - Copy the **anon public** key (a very long string) — paste it into the same notepad.
   - You'll need both in Part D.
5. **Create the CMS logins for your team:**
   - Left menu → **Authentication** → **Users** → **Add user** → **Create new user**.
   - Enter your **manager's email** + a password you choose. **Tick “Auto Confirm User.”** Click **Create user**.
   - Repeat for your **SEO person** (their email + a password).
   - 👉 These email+password pairs are the CMS logins you will share with them. They'll sign in at `yourdomain.com/admin/login`.

✅ Supabase is done.

---

## PART C — Put the code on GitHub (10 min)

1. Go to **https://github.com** → **Sign up** (free).
2. After signing in, click the **+** (top-right) → **New repository**.
   - **Repository name:** `createwitty`
   - Keep it **Public** (or Private — both work with Netlify).
   - **Do NOT** tick “Add a README”.
   - Click **Create repository**.
3. On the next page, click the link **“uploading an existing file”** (in the line *“…or push an existing repository”* there's also **“upload an existing file”**).
4. **Open your unzipped `createwitty-react` folder** on your computer. Select **everything inside it** (all files and subfolders — Ctrl+A / Cmd+A), and **drag them** into the GitHub upload area in your browser.
   - Wait for all files to finish uploading (you'll see them listed).
   - ⚠️ There is no `node_modules` folder in the zip — that's correct, Netlify creates it. Don't worry if you don't see one.
5. Scroll down → in **“Commit changes”** type `first upload` → click **Commit changes**.

✅ Your code is now on GitHub.

---

## PART D — Connect Netlify & go live (15 min)

1. Go to **https://netlify.com** → **Sign up** → choose **“Sign up with GitHub”** (easiest — it links the two).
2. Click **Add new site** → **Import an existing project** → **Deploy with GitHub**.
   - Authorize Netlify if asked → pick your **`createwitty`** repository.
3. Netlify auto-detects the settings from `netlify.toml`. Confirm they read:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - (If they're blank, type them in exactly as above.)
4. **BEFORE deploying, add your keys** — click **“Add environment variables”** (or *Show advanced* → *New variable*) and add these **four**:

   | Key | Value |
   |---|---|
   | `VITE_SUPABASE_URL` | *(paste your Supabase Project URL)* |
   | `VITE_SUPABASE_ANON_KEY` | *(paste your Supabase anon public key)* |
   | `VITE_FORM_EMAIL` | `pranith.gorityala49@gmail.com` |
   | `VITE_SITE_URL` | `https://www.createwitty.com` *(your real domain)* |

5. Click **Deploy site**. Netlify installs everything and builds your site in the cloud (~2 min). When it's done you'll get a temporary address like `https://random-name.netlify.app` — click it, your site is **live**! 🎉
6. Test the CMS: open `https://your-netlify-address.netlify.app/admin/login` and sign in with a Supabase user you created in Part B.

---

## PART E — Use your GoDaddy domain (10 min)

Right now the site is on a `netlify.app` address. Let's put it on **your** GoDaddy domain.

1. In Netlify: **Site configuration → Domain management → Add a domain** → type your domain (e.g. `createwitty.com`) → **Verify** → **Add domain**.
2. Netlify will show you DNS records to set. The simplest method:
   - Netlify usually offers **“Set up Netlify DNS”** and gives you **4 nameservers** (like `dns1.p01.nsone.net`).
3. In a new tab, log in to **GoDaddy → My Products → Domains → your domain → Manage DNS → Nameservers → Change → Enter my own nameservers** → paste the 4 Netlify nameservers → **Save**.
   - *(Alternative without changing nameservers: in GoDaddy DNS add an **A record** `@ → 75.2.60.5` and a **CNAME** `www → your-netlify-address.netlify.app`, following whatever Netlify shows.)*
4. Wait for it to take effect (usually 15 min – a few hours, sometimes up to 24h). Netlify automatically adds **free HTTPS (the padlock)** once the domain connects.

✅ Your site is now live at your own domain, e.g. `https://www.createwitty.com`.

---

## PART F — Turn on the contact/enrollment emails (2 min)

The forms send to your email through a free service called **FormSubmit** — it just needs a one-time confirmation.

1. On your live site, open the **Contact** page and submit the form once (use your own details).
2. Check the inbox of `pranith.gorityala49@gmail.com` for an email from **FormSubmit** → click the **confirmation link** once.
3. From then on, every enrollment/contact/appointment submission arrives in that inbox automatically.

---

## PART G — How your team publishes blogs/news (share this with them)

1. Go to **`yourdomain.com/admin/login`** and sign in with the email + password you created in Supabase.
2. Click **+ New Post**. Fill in:
   - **Title** (the H1), **Excerpt** (short summary).
   - **Body** — use the toolbar for headings, bold, links, bullet lists, **images** (upload) and **video** (click the video button, paste a YouTube link).
   - **Type:** Blog or News.
   - **SEO settings:** Meta title, Meta description, Canonical URL.
   - **Cover image** + **Alt text**.
3. Click **Publish** — it appears instantly at `yourdomain.com/blog/...` or `/news/...`.

No developer needed. The main pages (Home, Contact) don't need a login — their SEO is already built in.

---

## Updating things later

- **New blog/news posts:** just publish in the CMS — **instant**, nothing else to do.
- **Changing text on the main pages, prices, phone number, etc.:** those are in the code. Tell me what to change and I'll give you updated files; you upload them to GitHub the same way (Part C step 3–5), and Netlify rebuilds the site automatically in ~2 minutes.

---

## Quick answers

- **Do I need to install Node / VS Code / a terminal?** No. Netlify builds everything in the cloud.
- **Is GitHub required?** For this easy path, yes — it's the bridge that lets Netlify auto-build. It's free and browser-only.
- **Is Netlify really free?** Yes, the free plan is plenty for this site.
- **Can I still use my GoDaddy hosting instead?** You can, but it requires installing Node and building on your PC — more technical. The GoDaddy *domain* is used either way; here we just host the files on Netlify (free) and point your domain to it.
- **Where do form submissions go?** To the email in `VITE_FORM_EMAIL` (after the one-time FormSubmit confirmation in Part F).

---

### If you get stuck
Tell me exactly which Part and step number you're on and what you see on screen, and I'll walk you through it.
