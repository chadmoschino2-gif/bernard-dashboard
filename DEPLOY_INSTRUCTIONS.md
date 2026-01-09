# 🚀 Deploy to Netlify - Step by Step

## ✅ Everything is Configured!

Your Netlify site is ready:
- **Site ID:** `e1d5ff16-d966-4506-9dd3-c918e08236a3`
- **Build output:** Ready in `out/` directory
- **Configuration:** `netlify.toml` is set up correctly

## 🎯 Quick Deploy (Choose One Method)

### Method 1: Netlify Dashboard (Easiest - Recommended)

1. **Go to Netlify Dashboard:**
   - Visit: https://app.netlify.com
   - Find your site (ID: `e1d5ff16-d966-4506-9dd3-c918e08236a3`)

2. **Deploy:**
   - Click on your site
   - Go to **"Deploys"** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Or drag & drop the `out/` folder to the deploy area

3. **Set Environment Variable (IMPORTANT):**
   - Go to **Site settings** → **Environment variables**
   - Click **"Add variable"**
   - **Key:** `NEXT_PUBLIC_API_URL`
   - **Value:** Your backend URL (e.g., `https://your-backend.railway.app`)
   - Click **"Save"**
   - **Redeploy** after adding the variable

### Method 2: Fix Netlify CLI & Deploy

If you want to use CLI, first fix the dependency issue:

```bash
# Reinstall Netlify CLI
npm uninstall -g netlify-cli
npm install -g netlify-cli@latest

# Then deploy
cd bernard-dashboard
netlify deploy --prod --dir=out
```

### Method 3: Git Push (If Connected)

If your repo is connected to Netlify:
```bash
git add .
git commit -m "Deploy to Netlify"
git push
```
Netlify will automatically deploy!

## ⚙️ Post-Deployment Checklist

After deployment:

- [ ] Site loads at your Netlify URL
- [ ] Environment variable `NEXT_PUBLIC_API_URL` is set
- [ ] Dashboard shows backend connection status
- [ ] Can trigger API calls (test status check)
- [ ] All pages work: `/`, `/settings`, `/operations`, `/instructions`

## 🔗 Your Site URL

After deployment, your site will be available at:
- **Production:** `https://[your-site-name].netlify.app`
- Or your custom domain if configured

## 📝 Notes

- The build output is already in `out/` directory
- You can deploy directly without rebuilding
- Make sure to set `NEXT_PUBLIC_API_URL` before testing API calls
- Backend must be deployed separately and accessible via HTTPS

## 🆘 Troubleshooting

**If deployment fails:**
1. Check Netlify build logs in dashboard
2. Verify `out/` directory exists and has files
3. Ensure `netlify.toml` is in the root of `bernard-dashboard`

**If site loads but API doesn't work:**
1. Verify `NEXT_PUBLIC_API_URL` is set in Netlify
2. Check backend is running and accessible
3. Verify CORS is enabled on backend for your Netlify domain
