# Blank White Page Fix - Deployment Troubleshooting

## Issue Description
Website shows blank white page when published to production (Netlify/Vercel)

## Root Causes & Solutions

### 1. **Build Configuration Issue** ✅

The output directory must be correctly set to `dist/spa`

**Check vite.config.ts:**
```typescript
build: {
  outDir: "dist/spa",  // MUST be this path
}
```

### 2. **Missing HTML File**

Ensure `index.html` is in the root directory with:
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SDC</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/client/App.tsx"></script>
  </body>
</html>
```

### 3. **Incorrect Route Configuration**

**Check client/App.tsx:**
```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin-resources" element={<AdminResources />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

### 4. **Missing Global CSS**

Ensure global.css is imported in App.tsx:
```typescript
import "./global.css";
```

---

## Deployment Fixes

### For Netlify:

1. **Create `netlify.toml`** in root:
```toml
[build]
  command = "pnpm build"
  publish = "dist/spa"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[dev]
  command = "pnpm dev"
  port = 8080
```

2. **Deploy:**
```bash
pnpm build
netlify deploy --prod --dir=dist/spa
```

### For Vercel:

1. **Create `vercel.json`:**
```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/spa",
  "devCommand": "pnpm dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

2. **Deploy:**
```bash
pnpm build
vercel deploy --prod
```

### For Docker:

1. **Create `Dockerfile`:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install
COPY . .
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "start"]
```

2. **Build & Run:**
```bash
docker build -t sdc-app .
docker run -p 3000:8080 sdc-app
```

---

## Quick Checklist

- [ ] `vite.config.ts` has `outDir: "dist/spa"`
- [ ] `index.html` has `<div id="root"></div>`
- [ ] `client/App.tsx` imports `./global.css`
- [ ] All route files exist and export default component
- [ ] No console errors in browser DevTools
- [ ] Network tab shows HTML loading (not 404)
- [ ] `dist/spa/index.html` exists after build

---

## Debugging Steps

### 1. Check Build Output:
```bash
pnpm build
ls -la dist/spa/
# Should show: index.html, js/, css/ folders
```

### 2. Check Local Build:
```bash
pnpm build
pnpm start
# Should work at http://localhost:3000
```

### 3. Check Browser Console (F12):
- Look for red errors
- Check Network tab
- Verify index.html loads
- Check that JS bundles load

### 4. Check Deployment Logs:
- Netlify: Deployments tab → View logs
- Vercel: Deployments tab → View build logs
- Look for build errors or failed modules

---

## Common Error Messages & Fixes

### "Cannot find module '@/lib/auth'"
- **Fix:** Ensure `@` alias in vite.config.ts points to `./client`

### "React is not defined"
- **Fix:** Add `import React from 'react'` at top of file (for old React)
- Or remove it (React 18+ doesn't need it)

### "window is not defined"
- **Fix:** Wrap in `useEffect` or check `typeof window !== 'undefined'`

### "Module parse failed"
- **Fix:** Ensure `.ts` and `.tsx` files are in src (or client) directory
- Check file extensions match

---

## Performance Optimizations

1. **Enable Compression:**
```bash
pnpm add -D vite-plugin-compression
```

2. **Add Caching Headers:**
Create `.htaccess` (Apache) or configure CDN caching

3. **Minify CSS/JS:**
Already done by Vite in production build

4. **Lazy Load Routes:**
```typescript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));

<Suspense fallback={<div>Loading...</div>}>
  <Dashboard />
</Suspense>
```

---

## Final Verification

After deployment, visit your site and:
1. ✅ Homepage loads (not blank)
2. ✅ Navigation works
3. ✅ Login page accessible
4. ✅ All links work
5. ✅ No console errors
6. ✅ Responsive on mobile

---

## Contact Deployment Support

If still seeing blank page:

1. **Check browser console** (F12) for errors
2. **Check deployment logs** for build failures
3. **Run locally first:**
   ```bash
   pnpm build
   pnpm start
   ```
4. **Clear browser cache:**
   - Ctrl+Shift+Del → Clear all → Hard refresh (Ctrl+F5)

---

## Success Indicators

✅ Site is live and showing homepage
✅ All pages load without errors
✅ Responsive design works
✅ Login functionality intact
✅ Admin panel accessible

**If you see these, deployment is successful!**
