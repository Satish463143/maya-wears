#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class DeploymentPreparer {
  constructor() {
    this.rootPath = process.cwd();
    this.deployPath = path.join(this.rootPath, 'deploy');
  }

  prepare() {
    console.log('🚀 Preparing for Production Deployment...\n');

    // Create deploy directory
    this.createDeployDirectory();
    
    // Prepare frontend files
    this.prepareFrontend();
    
    // Prepare backend files
    this.prepareBackend();
    
    // Create deployment guide
    this.createDeploymentGuide();
    
    console.log('✅ Deployment preparation complete!\n');
    console.log('📁 Check the "deploy" folder for organized files');
    console.log('📖 Read deploy/DEPLOYMENT_GUIDE.md for cPanel instructions');
  }

  createDeployDirectory() {
    if (fs.existsSync(this.deployPath)) {
      fs.rmSync(this.deployPath, { recursive: true, force: true });
    }
    fs.mkdirSync(this.deployPath, { recursive: true });
    
    // Create subdirectories
    fs.mkdirSync(path.join(this.deployPath, 'public_html'), { recursive: true });
    fs.mkdirSync(path.join(this.deployPath, 'backend'), { recursive: true });
    
    console.log('📁 Created deployment directories');
  }

  prepareFrontend() {
    const frontendBuildPath = path.join(this.rootPath, 'frontend', 'dist');
    const publicHtmlPath = path.join(this.deployPath, 'public_html');
    
    if (!fs.existsSync(frontendBuildPath)) {
      console.error('❌ Frontend build not found. Run "npm run frontend:build" first');
      return;
    }
    
    // Copy frontend build files
    this.copyDirectory(frontendBuildPath, publicHtmlPath);
    console.log('✅ Frontend files copied to public_html/');
    
    // Create .htaccess for React Router
    this.createHtaccess(publicHtmlPath);
  }

  prepareBackend() {
    const backendSrcPath = path.join(this.rootPath, 'backend');
    const deployBackendPath = path.join(this.deployPath, 'backend');
    
    // Copy backend source files (excluding node_modules)
    this.copyBackendFiles(backendSrcPath, deployBackendPath);
    console.log('✅ Backend files prepared');
    
    // Create production package.json
    this.createProductionPackageJson(deployBackendPath);
  }

  copyDirectory(src, dest) {
    const items = fs.readdirSync(src);
    
    for (const item of items) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        this.copyDirectory(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  copyBackendFiles(src, dest) {
    const items = fs.readdirSync(src);
    
    for (const item of items) {
      // Skip node_modules and other dev files
      if (['node_modules', '.git', 'dist', '.env.local'].includes(item)) {
        continue;
      }
      
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);
      const stat = fs.statSync(srcPath);
      
      if (stat.isDirectory()) {
        fs.mkdirSync(destPath, { recursive: true });
        this.copyBackendFiles(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }

  createHtaccess(publicHtmlPath) {
    const htaccessContent = `
# React Router Support
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/css
  AddOutputFilterByType DEFLATE application/javascript
  AddOutputFilterByType DEFLATE application/json
  AddOutputFilterByType DEFLATE text/html
</IfModule>

# Cache Control
<IfModule mod_expires.c>
  ExpiresActive on
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
`.trim();

    fs.writeFileSync(path.join(publicHtmlPath, '.htaccess'), htaccessContent);
    console.log('✅ .htaccess created for React Router and optimization');
  }

  createProductionPackageJson(backendPath) {
    const originalPkg = JSON.parse(
      fs.readFileSync(path.join(this.rootPath, 'backend', 'package.json'), 'utf8')
    );
    
    // Remove dev dependencies for production
    const productionPkg = {
      ...originalPkg,
      scripts: {
        start: originalPkg.scripts.start || "node index.js",
        "start:prod": "NODE_ENV=production node index.js"
      }
    };
    
    // Remove devDependencies
    delete productionPkg.devDependencies;
    
    fs.writeFileSync(
      path.join(backendPath, 'package.json'), 
      JSON.stringify(productionPkg, null, 2)
    );
    console.log('✅ Production package.json created');
  }

  createDeploymentGuide() {
    const guideContent = `# 🚀 cPanel Deployment Guide

## 📂 File Structure for cPanel

Upload files as follows:

### 1. Frontend (React App)
- Upload ALL files from \`deploy/public_html/\` to your domain's \`public_html/\` folder
- This includes: index.html, assets/, .htaccess

### 2. Backend (Node.js API)
- Upload ALL files from \`deploy/backend/\` to a folder OUTSIDE public_html
- Recommended location: \`/home/yourusername/backend/\` or \`/backend/\`

## 🔧 cPanel Setup Steps

### Step 1: Upload Frontend
1. Go to cPanel → File Manager
2. Navigate to \`public_html/\`
3. Upload all files from \`deploy/public_html/\`
4. Extract if uploaded as zip

### Step 2: Upload Backend
1. Create folder: \`/home/yourusername/backend/\` (outside public_html)
2. Upload all files from \`deploy/backend/\`
3. Extract if uploaded as zip

### Step 3: Install Backend Dependencies
1. Go to cPanel → Terminal (or SSH)
2. Navigate to backend folder:
   \`\`\`bash
   cd /home/yourusername/backend
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install --production
   \`\`\`

### Step 4: Setup Node.js App (cPanel)
1. Go to cPanel → Node.js Apps
2. Click "Create Application"
3. Set:
   - Node.js Version: Latest LTS
   - Application Mode: Production
   - Application Root: \`backend\`
   - Application URL: \`api.yourdomain.com\` or \`yourdomain.com/api\`
   - Application Startup File: \`index.js\`

### Step 5: Environment Variables
1. In Node.js App settings, add environment variables:
   \`\`\`
   NODE_ENV=production
   PORT=3000
   DATABASE_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   \`\`\`

### Step 6: Update Frontend API URLs
If your backend runs on a subdomain or different port, update your frontend API calls.

## 🌐 Domain Configuration

### Option A: Subdomain for API
- Frontend: \`https://yourdomain.com\`
- Backend: \`https://api.yourdomain.com\`

### Option B: Same domain with path
- Frontend: \`https://yourdomain.com\`
- Backend: \`https://yourdomain.com/api\`

## 🔍 Testing Deployment

1. **Frontend Test**: Visit your domain, check if React app loads
2. **Backend Test**: Visit your API endpoint (e.g., \`/api/health\`)
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
1. Run: \`npm run deploy:prepare\`
2. Upload new files to cPanel
3. Restart Node.js app if backend changed

---

**Bundle Sizes After Optimization:**
- vendor.js: 141KB (React, React-DOM)
- forms.js: 67KB (Form handling)
- utils.js: 122KB (Utilities)
- ui.js: 371KB (UI components)
- Total optimized build!
`;

    fs.writeFileSync(path.join(this.deployPath, 'DEPLOYMENT_GUIDE.md'), guideContent);
    console.log('✅ Deployment guide created');
  }
}

// Run the deployment preparer
const preparer = new DeploymentPreparer();
preparer.prepare(); 