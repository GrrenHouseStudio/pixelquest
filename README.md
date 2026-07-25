# 🎮 PixelQuest — Gaming Wallpaper Website

PixelQuest is a responsive static gaming wallpaper website built with **HTML, CSS, JavaScript, and JSON**.

It is designed for GitHub Pages and includes:

- Dynamic wallpaper cards
- Featured wallpapers
- Trending game collections
- Search
- Category filters
- Sorting
- Load more
- Favourites using `localStorage`
- Wallpaper detail pages
- Related wallpapers
- Full-resolution downloads
- Google Analytics support
- Google AdSense support
- SEO metadata
- Sitemap and robots.txt
- ads.txt
- Custom 404 page
- Mobile navigation
- Responsive design

Live website:

**https://pixelquestwallpapers.com/**

---

## 📸 Project Overview

PixelQuest loads wallpaper information from one central file:

```text
wallpapers.json
```

JavaScript reads that file and automatically builds:

- Homepage wallpaper cards
- Featured wallpapers
- Trending game cards
- Search results
- Category pages
- Game pages
- Individual wallpaper detail pages
- Related wallpaper suggestions

This makes it easy to add new wallpapers without manually creating a new HTML page for each image.

---

## 🛠 Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- JSON
- GitHub Pages
- Google Analytics
- Google Search Console
- Bing Webmaster Tools
- Google AdSense

No framework, build tool, database, or server is required.

---

## 📁 Recommended Folder Structure

```text
pixelquest/
│
├── index.html
├── style.css
├── wallpapers.json
├── sitemap.xml
├── robots.txt
├── ads.txt
├── 404.html
│
├── images/
│   ├── favicon.png
│   ├── social-preview.jpg
│   │
│   ├── full/
│   │   ├── pubg/
│   │   ├── spiderman/
│   │   ├── ghostoftsushima/
│   │   ├── forza/
│   │   ├── crimson/
│   │   └── 007/
│   │
│   └── thumbnail/
│       ├── pubg/
│       ├── spiderman/
│       ├── ghostoftsushima/
│       ├── fz6/
│       ├── crimson/
│       └── 007/
│
├── js/
│   ├── utils.js
│   ├── script.js
│   ├── wallpaper.js
│   ├── game.js
│   ├── search.js
│   └── category.js
│
└── pages/
    ├── wallpaper.html
    ├── game.html
    ├── search.html
    ├── category.html
    ├── about.html
    ├── contact.html
    ├── privacy.html
    └── terms.html
```

Folder and file names are case-sensitive on GitHub Pages.

For example:

```text
images/full/pubg/pubg1.png
```

is different from:

```text
Images/Full/PUBG/pubg1.png
```

---

## 🚀 Run the Website Locally

### Option 1 — VS Code Live Server

1. Download or clone the project.
2. Open the project folder in VS Code.
3. Install the **Live Server** extension.
4. Right-click `index.html`.
5. Select **Open with Live Server**.

The site will usually open at:

```text
http://127.0.0.1:5500/index.html
```

Do not open `index.html` directly with a `file:///` URL because browsers may block `fetch()` from loading `wallpapers.json`.

---

## 📥 Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

Replace the repository URL with your own GitHub repository.

---

## 🖼 Add a New Wallpaper

Every wallpaper needs:

1. A full-resolution image
2. A WebP thumbnail
3. A new JSON object inside `wallpapers.json`

### Example image paths

```text
images/full/pubg/pubg3.png
images/thumbnail/pubg/pubg3.webp
```

### Example JSON entry

```json
{
  "id": 18,
  "title": "PUBG Mountain Battle",
  "game": "PUBG",
  "category": "Battle Royale",
  "description": "A cinematic PUBG battle scene featuring players moving through a dramatic mountain environment. The detailed landscape, action-focused composition and Full HD quality make this gaming wallpaper suitable for desktop, laptop and mobile screens.",
  "thumbnail": "images/thumbnail/pubg/pubg3.webp",
  "image": "images/full/pubg/pubg3.png",
  "resolution": "1920×1080",
  "downloads": 0,
  "views": 0,
  "featured": false,
  "date": "2026-07-25"
}
```

Add a comma after the previous object before inserting a new entry.

Do not add a comma after the final object in the array.

---

## 🧾 Wallpaper JSON Fields

| Field | Required | Description |
|---|---:|---|
| `id` | Yes | Unique numeric wallpaper ID |
| `title` | Yes | Wallpaper title |
| `game` | Yes | Game name |
| `category` | Yes | Wallpaper category |
| `description` | Recommended | Unique SEO-friendly wallpaper description |
| `thumbnail` | Yes | Optimized WebP preview path |
| `image` | Yes | Full-resolution image path |
| `resolution` | Yes | Example: `1920×1080` |
| `downloads` | Yes | Displayed download count |
| `views` | Yes | Displayed view count |
| `featured` | Yes | `true` or `false` |
| `date` | Yes | Date in `YYYY-MM-DD` format |
| `aspectRatio` | Optional | Example: `16:9` |
| `format` | Optional | Example: `PNG` |
| `bestFor` | Optional | Example: `Desktop, laptop and mobile screens` |

The wallpaper detail script can calculate fallback values for optional fields.

---

## ✍️ Writing Good Wallpaper Descriptions

Each wallpaper should have a unique description.

A useful description should mention:

- What is visible in the image
- The game name
- The visual mood or environment
- Resolution
- Suitable devices
- Relevant wallpaper keywords naturally

Example:

```json
"description": "A high-speed racing scene featuring a modified sports car crossing a snowy mountain landscape. The detailed vehicle, winter terrain and cinematic lighting create a clean Full HD gaming wallpaper for desktop, laptop and mobile screens."
```

Avoid:

- Copying the same description for every image
- Keyword stuffing
- Adding unrelated high-CPC keywords
- Claiming image ownership when you do not own it
- Misleading titles or descriptions

---

## ⭐ Featured Wallpapers

To show a wallpaper in the Featured section:

```json
"featured": true
```

To keep it out of the Featured section:

```json
"featured": false
```

The homepage displays a limited number of featured wallpapers.

---

## 🎮 Game Pages

Game pages are generated dynamically using the `game` value.

Example URL:

```text
pages/game.html?game=Crimson%20Desert
```

All wallpapers with this value:

```json
"game": "Crimson Desert"
```

will appear on that game page.

Keep game names written exactly the same in every relevant JSON entry.

---

## 🗂 Category Pages

Category pages are generated from the `category` value.

Example URL:

```text
pages/category.html?category=Racing
```

All wallpapers with this value:

```json
"category": "Racing"
```

will appear after selecting the Racing filter.

Keep category spelling consistent.

---

## 🔎 Search

The homepage search opens:

```text
pages/search.html?q=KEYWORD
```

Search matches wallpaper titles, game names, and categories.

Example:

```text
pages/search.html?q=PUBG
```

---

## ❤️ Favourites

Favourites are stored in the visitor's browser using:

```text
localStorage
```

Storage key:

```text
pixelquestFav
```

Important:

- Favourites are private to each browser
- They are not stored in an online database
- They do not create a public like count
- Clearing browser data removes saved favourites

A shared public like counter would require a backend such as Firebase or Supabase.

---

## ⬇ Downloads

Full-resolution images are downloaded from the `image` path in `wallpapers.json`.

Example:

```json
"image": "images/full/pubg/pubg1.png"
```

The thumbnail is only used as the optimized website preview.

Example:

```json
"thumbnail": "images/thumbnail/pubg/pubg1.webp"
```

---

## 📱 Responsive Design

The site includes responsive layouts for:

- Desktop
- Laptop
- Tablet
- Mobile

The mobile version includes:

- Hamburger navigation
- Single-column wallpaper cards
- Responsive search controls
- Stacked buttons
- Responsive hero content
- Mobile-friendly category filters

Test the site using both Chrome Device Mode and a real phone.

---

## 🌐 Deploy to GitHub Pages

### 1. Create a GitHub repository

Create a new public repository and upload all project files.

### 2. Enable GitHub Pages

Open:

```text
Repository → Settings → Pages
```

Under **Build and deployment**:

- Source: `Deploy from a branch`
- Branch: `main`
- Folder: `/root`

Click **Save**.

GitHub will publish the site at a URL similar to:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

---

## 🌍 Connect a Custom Domain

In GitHub:

```text
Repository → Settings → Pages → Custom domain
```

Enter your domain:

```text
pixelquestwallpapers.com
```

GitHub creates or updates a `CNAME` file.

At your domain registrar, configure the DNS records recommended by GitHub Pages.

Typical apex-domain records:

```text
A     @     185.199.108.153
A     @     185.199.109.153
A     @     185.199.110.153
A     @     185.199.111.153
```

Typical `www` record:

```text
CNAME     www     YOUR-USERNAME.github.io
```

DNS changes can take time to propagate.

After the domain works, enable:

```text
Enforce HTTPS
```

---

## 📊 Google Analytics

The project uses Google Analytics 4.

Replace this measurement ID in every public page:

```text
G-TD5LSX45Y0
```

Example:

```html
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-TD5LSX45Y0">
</script>

<script>
  window.dataLayer = window.dataLayer || [];

  function gtag() {
    dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", "G-TD5LSX45Y0");
</script>
```

Verify tracking in:

```text
Google Analytics → Reports → Realtime
```

---

## 💰 Google AdSense

Replace the publisher ID with your own AdSense publisher ID.

Example:

```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5871455052425075"
  crossorigin="anonymous">
</script>
```

Place it inside `<head>` on every public HTML page.

Do not copy another publisher's ID.

Do not click your own ads or ask other people to click them.

The site must be approved before ads can serve normally.

---

## 📄 ads.txt

Create this file in the repository root:

```text
ads.txt
```

Example:

```text
google.com, pub-5871455052425075, DIRECT, f08c47fec0942fa0
```

Replace the publisher ID with your own.

The public file should open at:

```text
https://yourdomain.com/ads.txt
```

Use `pub-...`, not `ca-pub-...`, inside `ads.txt`.

---

## 🤖 robots.txt

Example:

```text
User-agent: *
Allow: /

Sitemap: https://pixelquestwallpapers.com/sitemap.xml
```

Replace the domain if you use this project on another website.

---

## 🗺 sitemap.xml

The sitemap should include:

- Homepage
- About page
- Contact page
- Privacy page
- Terms page
- Category pages
- Game pages
- Every wallpaper detail URL

Example wallpaper URL:

```xml
<url>
    <loc>https://pixelquestwallpapers.com/pages/wallpaper.html?id=18</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
```

When adding a new wallpaper ID, also add its detail URL to `sitemap.xml`.

Submit the sitemap to:

- Google Search Console
- Bing Webmaster Tools

---

## 🔍 Google Search Console

Recommended setup:

1. Add and verify the custom domain.
2. Submit:

```text
https://yourdomain.com/sitemap.xml
```

3. Use URL Inspection for important updated pages.
4. Click **Test Live URL**.
5. Request indexing only after meaningful changes.

Indexing and rankings are not immediate.

---

## 🔎 Bing Webmaster Tools

Recommended setup:

1. Import the site from Google Search Console or verify it manually.
2. Submit the sitemap.
3. Submit the homepage once using URL Submission.
4. Run a Site Scan.
5. Fix errors before warnings and notices.

---

## 🖼 Social Sharing Image

The project uses:

```text
images/social-preview.jpg
```

Recommended size:

```text
1200 × 630 pixels
```

Example Open Graph tags:

```html
<meta
  property="og:image"
  content="https://yourdomain.com/images/social-preview.jpg">
```

Test previews with social-sharing debugger tools.

---

## ❌ Custom 404 Page

The root-level file:

```text
404.html
```

is used by GitHub Pages when a visitor opens a missing URL.

Test it with a fake address:

```text
https://yourdomain.com/this-page-does-not-exist
```

---

## ⚡ Cache Busting

Browsers may continue loading old CSS or JavaScript after an update.

Use a version query:

```html
<link rel="stylesheet" href="style.css?v=14">
```

```html
<script src="../js/wallpaper.js?v=6" defer></script>
```

Increase the version number after important updates.

You can also refresh with:

```text
Ctrl + F5
```

---

## 🧰 Common Problems

### Wallpapers do not load

Check:

- `wallpapers.json` is valid JSON
- The JSON starts with `[` and ends with `]`
- JavaScript paths are correct
- `script.js` is loading
- The site is running through a web server
- Browser console errors

Correct homepage script path:

```html
<script src="js/script.js" defer></script>
```

Correct page script path:

```html
<script src="../js/wallpaper.js" defer></script>
```

---

### Images show 404

Check:

- Folder spelling
- Filename spelling
- File extension
- Uppercase and lowercase letters
- JSON paths

Example:

```text
ghostoftsushima
```

must not accidentally become:

```text
ghostoftusima
```

---

### JSON loads but images do not

Open the image URL directly in the browser.

Example:

```text
https://yourdomain.com/images/thumbnail/pubg/pubg1.webp
```

If it shows 404, the path or filename is wrong.

---

### Website still shows old design

Update the version number:

```html
<link rel="stylesheet" href="style.css?v=15">
```

Then use:

```text
Ctrl + F5
```

---

### White background around the heart icon

Make sure both possible classes are styled:

```css
.fav-btn,
.favorite-btn {
    appearance: none;
    -webkit-appearance: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
}
```

---

### GitHub Pages deployment is delayed

Check:

```text
Repository → Actions
```

or:

```text
Repository → Deployments
```

Wait for a successful green deployment before testing changes.

---

## 🔐 Security and Privacy Notes

This is a static website.

It does not require:

- A database
- User accounts
- Password storage
- Server-side code

However:

- Do not commit private keys
- Do not commit service-account credentials
- Do not expose secret API keys
- Do not use private data inside `wallpapers.json`

Google Analytics and AdSense may require appropriate privacy and consent disclosures depending on the visitor's region.

---

## ⚖ Copyright Notice

Game names, characters, artwork, trademarks, and logos may belong to their respective owners.

Before publishing or monetizing images, make sure you:

- Created or captured the images yourself
- Have permission to use them
- Have an appropriate license
- Follow the game publisher's content policy
- Respond to valid copyright complaints

A disclaimer does not automatically give permission to use copyrighted content.

---

## ✅ Publishing Checklist

Before publishing:

- [ ] All image paths work
- [ ] `wallpapers.json` is valid
- [ ] Every wallpaper has a unique ID
- [ ] Every wallpaper has a unique description
- [ ] Homepage loads dynamic content
- [ ] Search works
- [ ] Category filters work
- [ ] Game pages work
- [ ] Wallpaper detail pages work
- [ ] Downloads work
- [ ] Favourites persist
- [ ] Mobile menu works
- [ ] Legal pages open
- [ ] Custom 404 works
- [ ] `robots.txt` works
- [ ] `sitemap.xml` works
- [ ] `ads.txt` works
- [ ] Analytics records visits
- [ ] Social preview image loads
- [ ] GitHub Pages deployment succeeds
- [ ] Custom domain uses HTTPS

---

## 🔄 Suggested Workflow for New Wallpapers

1. Prepare the full-resolution image.
2. Create a WebP thumbnail.
3. Add both files to the correct folders.
4. Add the new object to `wallpapers.json`.
5. Write a unique description.
6. Test the homepage card.
7. Test the detail page.
8. Test the download button.
9. Add the new detail URL to `sitemap.xml`.
10. Commit and deploy.
11. Confirm the live site works.
12. Allow search engines time to recrawl.

---

## 🧪 Validate JSON

You can validate `wallpapers.json` using any trusted JSON validator.

Common JSON mistakes:

- Missing comma
- Extra comma
- Missing quote
- Duplicate property
- Broken path
- Duplicate ID

---

## 📈 Growth Recommendations

To grow the website:

- Add original wallpapers consistently
- Focus on trending and upcoming games
- Use accurate titles
- Write unique descriptions
- Create game-specific collections
- Optimize thumbnails
- Keep full images high quality
- Improve internal links
- Update the sitemap
- Avoid copied or low-value content
- Monitor Google Search Console
- Monitor Bing Webmaster Tools
- Track performance in Google Analytics

Traffic growth is not guaranteed and usually takes time.

---

## 🤝 Contributing

Contributions can include:

- Bug fixes
- Accessibility improvements
- Performance improvements
- New layout ideas
- Better mobile support
- Improved documentation

Before submitting changes:

1. Test locally.
2. Confirm JSON remains valid.
3. Check image paths.
4. Test desktop and mobile layouts.
5. Avoid adding copyrighted images without permission.

---

## 📜 License

No open-source license is included by default.

Without a license, others may view the source code but do not automatically receive permission to copy, modify, or redistribute it.

Add a suitable `LICENSE` file before inviting public reuse.

Common choices include:

- MIT License
- Apache License 2.0
- GNU GPL v3

Image licenses may be different from the website code license.

---

## 👤 Project

**PixelQuest**

A static gaming wallpaper website built from scratch and deployed with GitHub Pages.

Live site:

**https://pixelquestwallpapers.com/**
