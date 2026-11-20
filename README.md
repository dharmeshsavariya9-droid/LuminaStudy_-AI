# LuminaStudy AI

**LuminaStudy AI** is a responsive, beginner-friendly AI & multi-subject learning platform built with HTML, CSS, JavaScript, and Firebase Authentication, designed for free hosting on **GitHub Pages**.

## Included Files
- `index.html` — Main application shell (Authentication gate + SPA workspace)
- `styles.css` — Dark navy/purple & light theme responsive UI
- `firebase-config.js` — Your Firebase Web App configuration
- `courses-data.js` — 6-category course catalog, 5 complete flagship courses, quizzes, and glossary
- `app.js` — Firebase Auth, SPA navigation, global search, AI prompt builder, learning tools, market education, and local persistence
- `LICENSE` — MIT License

## Setup & Deployment (GitHub Pages)
1. **Add your Firebase Config:** Open `firebase-config.js` and paste your `firebaseConfig` values from **Firebase Console → Project Settings → Your apps**.
2. **Enable Firebase Authentication Providers:**
   - Go to **Firebase Console → Authentication → Sign-in method**.
   - Enable **Email/Password** and **Google**.
3. **Authorize your GitHub Pages Domain:**
   - Go to **Firebase Console → Authentication → Settings → Authorized domains**.
   - Add `<your-username>.github.io` (e.g., `username.github.io`).
4. **Upload to GitHub:**
   - Upload all files from this folder to the root of your GitHub repository (`main` branch).
   - In GitHub: **Settings → Pages → Source: Deploy from a branch (`main` / `root`) → Save**.

## Privacy & Data Notice
- **Authentication:** Handled by Firebase Authentication (Google Sign-In, Email/Password, Password Reset, Email Verification).
- **Local Storage:** Course progress, notes, bookmarks, flashcards, study plans, and preferences are stored locally in your browser's `localStorage`. They are not yet synced to a cloud database.
- **External APIs:** No paid AI, live news, or live market APIs are connected in this static frontend build. External AI shortcuts (ChatGPT & Gemini) generate ready-to-copy study prompts for you to open in those platforms.
