# GitHub Repo Setup — factiv-website

## Create the repo in agenticapps-eu organisation

Run these commands in your terminal (requires gh CLI or GitHub PAT):

### Option A — GitHub CLI (recommended)
```bash
# Install gh CLI if needed: brew install gh
gh auth login
gh repo create agenticapps-eu/factiv-website \
  --public \
  --description "Factiv company website — factiv.eu" \
  --homepage "https://factiv.eu"
```

### Option B — GitHub API (curl)
```bash
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/orgs/agenticapps-eu/repos \
  -d '{
    "name": "factiv-website",
    "description": "Factiv company website — factiv.eu",
    "homepage": "https://factiv.eu",
    "private": false,
    "auto_init": false
  }'
```

### Option C — GitHub UI
1. Go to github.com/agenticapps-eu
2. Click **New repository**
3. Name: `factiv-website`
4. Description: `Factiv company website — factiv.eu`
5. Public ✓
6. Do NOT initialise with README (we'll push our own)

---

## Initial push

```bash
cd factiv-website   # the folder with index.html
git init
git add .
git commit -m "feat: initial Factiv website

- One-page landing with animated particle background
- Sections: hero, services, manifesto, metrics, process, about, contact
- Dark charcoal + gold brand palette
- Bebas Neue + Open Sans typography
- Canvas particle network animation
- Scroll reveal with IntersectionObserver
- Custom cursor
- Fully responsive"

git branch -M main
git remote add origin git@github.com:agenticapps-eu/factiv-website.git
git push -u origin main
```

---

## Recommended repo structure

```
factiv-website/
├── index.html          ← single-file site (current)
├── assets/
│   ├── logo/
│   │   ├── factiv-logo-primary.svg
│   │   ├── factiv-logo-white.svg
│   │   ├── factiv-logo-black.svg
│   │   └── factiv-mark.svg
│   └── favicon/
│       ├── favicon.ico
│       ├── favicon-32.png
│       └── favicon-64.png
├── DESIGN-BRIEF.md     ← design reference
├── LINKEDIN.md         ← LinkedIn setup guide
└── README.md           ← this file
```

---

## GitHub Pages deployment (free hosting)

Once the repo exists:
1. Go to repo **Settings → Pages**
2. Source: Deploy from branch → `main` → `/ (root)`
3. Save
4. Site will be live at: `agenticapps-eu.github.io/factiv-website`

Then point `factiv.eu` DNS to GitHub Pages:
- In IONOS DNS, add a CNAME record: `www` → `agenticapps-eu.github.io`
- For the apex domain (`factiv.eu`), add four A records:
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- In repo Settings → Pages → Custom domain: enter `factiv.eu`
- Check "Enforce HTTPS" once DNS propagates (24–48h for .de)

---

## Topics to add to repo (for discoverability)

In repo Settings → Topics, add:
`agentic-ai`, `ai`, `germany`, `consultancy`, `landing-page`
