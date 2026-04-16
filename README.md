# My Plan 🌸

Your personal workout + meal plan app.

---

## Deploy to Vercel via GitHub (step by step)

### Step 1 — Create a GitHub repo

1. Go to [github.com](https://github.com) and sign in (or create a free account)
2. Click the **+** icon (top right) → **New repository**
3. Name it `my-plan`, set it to **Private**, click **Create repository**

### Step 2 — Push this project to GitHub

Open your terminal in this folder and run:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-plan.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your GitHub username.

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New → Project**
3. Find and import your `my-plan` repo
4. Leave all settings as default — Vercel auto-detects Vite
5. Click **Deploy**

That's it! Vercel gives you a live URL like `https://my-plan-abc123.vercel.app`.

Every time you push a change to GitHub, Vercel redeploys automatically.

---

## Install as a phone app (no app store needed)

Once it's live on Vercel:

- **iPhone**: Open the URL in Safari → Share button → **Add to Home Screen**
- **Android**: Open in Chrome → three-dot menu → **Add to Home Screen**

It will appear on your home screen like a native app.

---

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).
