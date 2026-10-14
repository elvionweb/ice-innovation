# ICE Innovation Multi Global Concept — Biggest Trade Fair landing page

React + Vite + Tailwind + framer-motion.

## Run
    npm install
    npm run dev       # local preview
    npm run build     # outputs ./dist  -> upload to Netlify / Vercel

## Edit
Everything is in `src/App.jsx`.
- CONFIG block (top): WhatsApp number, phone, venue, TikTok link, event start/end dates, map query.
- `EXHIBITORS`: name, category, tagline, item list, flyer file (flyers live in `public/flyers`).
- To add an exhibitor: drop a .webp flyer into `public/flyers`, add its width/height to `src/flyers.json`, and add an entry to `EXHIBITORS`.
