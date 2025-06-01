# 🚀 cPanel Deployment Guide

## 📂 File Structure for cPanel

Upload files as follows:

### 1. Frontend (React App)
- Upload ALL files from `deploy/public_html/` to your domain's `public_html/` folder
- This includes: index.html, assets/, .htaccess

### 2. Backend (Node.js API)
- Upload ALL files from `deploy/backend/` to a folder OUTSIDE public_html
- Recommended location: `/home/yourusername/backend/` or `/backend/`

## 🔧 cPanel Setup Steps

### Step 1: Upload Frontend
1. Go to cPanel → File Manager
2. Navigate to `public_html/`
3. Upload all files from `deploy/public_html/`
4. Extract if uploaded as zip

### Step 2: Upload Backend
1. Create folder: `/home/yourusername/backend/` (outside public_html)
2. Upload all files from `deploy/backend/`
3. Extract if uploaded as zip

### Step 3: Install Backend Dependencies
1. Go to cPanel → Terminal (or SSH)
2. Navigate to backend folder:
   ```bash
   cd /home/yourusername/backend
   ```
3. Install dependencies:
   ```bash
   npm install --production
   ```

### Step 4: Setup Node.js App (cPanel)
1. Go to cPanel → Node.js Apps
2. Click "Create Application"
3. Set:
   - Node.js Version: Latest LTS
   - Application Mode: Production
   - Application Root: `backend`
   - Application URL: `api.yourdomain.com` or `yourdomain.com/api`
   - Application Startup File: `index.js`

### Step 5: Environment Variables
1. In Node.js App settings, add environment variables:
   ```
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   ```

### Step 6: Update Frontend API URLs
If your backend runs on a subdomain or different port, update your frontend API calls.

## 🌐 Domain Configuration

### Option A: Subdomain for API
- Frontend: `https://yourdomain.com`
- Backend: `https://api.yourdomain.com`

### Option B: Same domain with path
- Frontend: `https://yourdomain.com`
- Backend: `https://yourdomain.com/api`

## 🔍 Testing Deployment

1. **Frontend Test**: Visit your domain, check if React app loads
2. **Backend Test**: Visit your API endpoint (e.g., `/api/health`)
3. **Integration Test**: Test frontend → backend communication

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /" error
**Solution**: Ensure .htaccess is uploaded and mod_rewrite is enabled

### Issue: API not connecting
**Solution**: 
- Check CORS settings in backend
- Verify API URLs in frontend
- Check Node.js app is running

### Issue: 500 Internal Server Error
**Solution**:
- Check error logs in cPanel
- Verify all dependencies installed
- Check file permissions

## 📊 Performance Optimization

Your build is already optimized with:
- ✅ Code splitting (vendor, ui, forms, utils chunks)
- ✅ Gzip compression (.htaccess)
- ✅ Asset caching
- ✅ Minified bundles

## 🔄 Future Deployments

For updates:
1. Run: `npm run deploy:prepare`
2. Upload new files to cPanel
3. Restart Node.js app if backend changed

---

**Bundle Sizes After Optimization:**
- vendor.js: 141KB (React, React-DOM)
- forms.js: 67KB (Form handling)
- utils.js: 122KB (Utilities)
- ui.js: 371KB (UI components)
- Total optimized build!
