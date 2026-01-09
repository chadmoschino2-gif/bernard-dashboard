# 🚀 Deploy to Netlify - Quick Guide

## Your Netlify Site is Already Configured!

**Site ID:** `e1d5ff16-d966-4506-9dd3-c918e08236a3`

## Deployment Options

### Option 1: Deploy via Netlify CLI (Recommended)

```bash
cd bernard-dashboard
npm install -g netlify-cli
netlify deploy --prod
```

### Option 2: Deploy via Netlify Dashboard

1. Go to [Netlify Dashboard](https://app.netlify.com)
2. Find your site (ID: `e1d5ff16-d966-4506-9dd3-c918e08236a3`)
3. Go to **Site settings** → **Build & deploy**
4. Verify settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
5. Click **Trigger deploy** → **Deploy site**

### Option 3: Git Integration (Automatic)

If your repo is connected to Netlify:
- Push to your main branch
- Netlify will automatically deploy

## ⚙️ Required Environment Variable

**IMPORTANT:** Set this in Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add new variable:
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** Your backend URL (e.g., `https://your-backend.railway.app`)

## ✅ Pre-Deployment Checklist

- [x] Netlify site configured
- [x] Build command set: `npm run build`
- [x] Publish directory set: `out`
- [x] Headers configured for security
- [x] Static files ready in `out/` directory
- [ ] Environment variable `NEXT_PUBLIC_API_URL` set in Netlify
- [ ] Backend deployed and accessible

## 🔍 Verify Deployment

After deployment, check:
1. Site loads without errors
2. Dashboard shows backend connection status
3. Can trigger API calls (status check works)
4. All pages load correctly (/, /settings, /operations, /instructions)

## 📝 Notes

- The site is configured for static export (no server-side rendering)
- All API calls go directly from browser to your backend
- Make sure your backend has CORS enabled for your Netlify domain
