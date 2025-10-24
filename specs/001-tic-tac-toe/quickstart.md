# Quickstart: Run and Build

## Prerequisites
- Node.js 18+

## Setup
```bash
# create app
npm create vite@latest frontend -- --template react-ts
cd frontend

# install deps
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# tailwind config (tailwind.config.js)
# content: ["./index.html","./src/**/*.{ts,tsx}"]

# add base styles (src/index.css or styles/globals.css)
@tailwind base;
@tailwind components;
@tailwind utilities;

# optional: shadcn/ui
npx shadcn@latest init -d
npx shadcn@latest add button

# run
npm run dev
# build
npm run build
```

## Deploy (static hosting)
- GitHub Pages, Netlify, or Vercel. Output in `frontend/dist`.
