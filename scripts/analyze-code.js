#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

class CodeAnalyzer {
  constructor(rootPath) {
    this.rootPath = rootPath;
    this.stats = {
      files: 0,
      totalLines: 0,
      components: 0,
      services: 0,
      utilities: 0,
      pages: 0,
      fileTypes: {},
      largestFiles: [],
      dependencies: {}
    };
  }

  analyze() {
    console.log('🔍 Starting Code Analysis...\n');
    
    // Analyze frontend
    this.analyzeDirectory(path.join(this.rootPath, 'frontend/src'), 'Frontend');
    
    // Analyze backend
    this.analyzeDirectory(path.join(this.rootPath, 'backend/src'), 'Backend');
    
    // Analyze dependencies
    this.analyzeDependencies();
    
    this.generateReport();
  }

  analyzeDirectory(dirPath, section) {
    if (!fs.existsSync(dirPath)) return;
    
    console.log(`📁 Analyzing ${section}: ${dirPath}`);
    
    const files = this.getFilesRecursively(dirPath);
    
    files.forEach(file => {
      const ext = path.extname(file);
      const relativePath = path.relative(this.rootPath, file);
      
      // Count file types
      this.stats.fileTypes[ext] = (this.stats.fileTypes[ext] || 0) + 1;
      this.stats.files++;
      
      // Analyze file content
      try {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n').length;
        this.stats.totalLines += lines;
        
        // Track largest files
        this.stats.largestFiles.push({ file: relativePath, lines, size: content.length });
        
        // Categorize files
        this.categorizeFile(relativePath, content);
        
      } catch (error) {
        console.warn(`⚠️  Could not read file: ${file}`);
      }
    });
  }

  getFilesRecursively(dir) {
    let files = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
          files = files.concat(this.getFilesRecursively(fullPath));
        } else if (stat.isFile() && this.isCodeFile(item)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not read directory: ${dir}`);
    }
    
    return files;
  }

  isCodeFile(filename) {
    const codeExtensions = ['.js', '.jsx', '.ts', '.tsx', '.vue', '.py', '.java', '.css', '.scss', '.json'];
    return codeExtensions.some(ext => filename.endsWith(ext));
  }

  categorizeFile(filePath, content) {
    const lowerPath = filePath.toLowerCase();
    
    // React Components
    if ((lowerPath.includes('component') || lowerPath.includes('pages')) && 
        (content.includes('export default') || content.includes('function') || content.includes('const'))) {
      if (lowerPath.includes('pages')) {
        this.stats.pages++;
      } else {
        this.stats.components++;
      }
    }
    
    // Services
    if (lowerPath.includes('service') || lowerPath.includes('api')) {
      this.stats.services++;
    }
    
    // Utilities
    if (lowerPath.includes('util') || lowerPath.includes('helper')) {
      this.stats.utilities++;
    }
  }

  analyzeDependencies() {
    // Frontend dependencies
    try {
      const frontendPkg = JSON.parse(fs.readFileSync(path.join(this.rootPath, 'frontend/package.json'), 'utf8'));
      this.stats.dependencies.frontend = {
        dependencies: Object.keys(frontendPkg.dependencies || {}),
        devDependencies: Object.keys(frontendPkg.devDependencies || {}),
        total: Object.keys({...frontendPkg.dependencies, ...frontendPkg.devDependencies}).length
      };
    } catch (error) {
      console.warn('⚠️  Could not read frontend package.json');
    }

    // Backend dependencies
    try {
      const backendPkg = JSON.parse(fs.readFileSync(path.join(this.rootPath, 'backend/package.json'), 'utf8'));
      this.stats.dependencies.backend = {
        dependencies: Object.keys(backendPkg.dependencies || {}),
        devDependencies: Object.keys(backendPkg.devDependencies || {}),
        total: Object.keys({...backendPkg.dependencies, ...backendPkg.devDependencies}).length
      };
    } catch (error) {
      console.warn('⚠️  Could not read backend package.json');
    }
  }

  generateReport() {
    console.log('\n📊 CODE ANALYSIS REPORT');
    console.log('========================\n');
    
    // Overall Stats
    console.log('📈 OVERALL STATISTICS:');
    console.log(`   Total Files: ${this.stats.files}`);
    console.log(`   Total Lines: ${this.stats.totalLines.toLocaleString()}`);
    console.log(`   Components: ${this.stats.components}`);
    console.log(`   Pages: ${this.stats.pages}`);
    console.log(`   Services: ${this.stats.services}`);
    console.log(`   Utilities: ${this.stats.utilities}\n`);
    
    // File Types
    console.log('📁 FILE TYPES:');
    Object.entries(this.stats.fileTypes)
      .sort(([,a], [,b]) => b - a)
      .forEach(([ext, count]) => {
        console.log(`   ${ext || 'no extension'}: ${count} files`);
      });
    console.log('');
    
    // Largest Files
    console.log('📏 LARGEST FILES (Top 10):');
    this.stats.largestFiles
      .sort((a, b) => b.lines - a.lines)
      .slice(0, 10)
      .forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.file} (${file.lines} lines, ${(file.size / 1024).toFixed(2)}KB)`);
      });
    console.log('');
    
    // Dependencies
    if (this.stats.dependencies.frontend) {
      console.log('📦 FRONTEND DEPENDENCIES:');
      console.log(`   Production: ${this.stats.dependencies.frontend.dependencies.length}`);
      console.log(`   Development: ${this.stats.dependencies.frontend.devDependencies.length}`);
      console.log(`   Total: ${this.stats.dependencies.frontend.total}\n`);
    }
    
    if (this.stats.dependencies.backend) {
      console.log('🔧 BACKEND DEPENDENCIES:');
      console.log(`   Production: ${this.stats.dependencies.backend.dependencies.length}`);
      console.log(`   Development: ${this.stats.dependencies.backend.devDependencies.length}`);
      console.log(`   Total: ${this.stats.dependencies.backend.total}\n`);
    }
    
    // Recommendations
    this.generateRecommendations();
  }

  generateRecommendations() {
    console.log('💡 CHUNKING RECOMMENDATIONS:');
    console.log('=============================\n');
    
    const largeFiles = this.stats.largestFiles.filter(f => f.lines > 200);
    if (largeFiles.length > 0) {
      console.log('🔴 LARGE FILES TO CONSIDER SPLITTING:');
      largeFiles.slice(0, 5).forEach(file => {
        console.log(`   - ${file.file} (${file.lines} lines)`);
      });
      console.log('');
    }
    
    if (this.stats.components > 10) {
      console.log('🟡 COMPONENT ORGANIZATION:');
      console.log('   - Consider grouping components by feature/domain');
      console.log('   - Implement lazy loading for page components');
      console.log('   - Create a design system for reusable components\n');
    }
    
    if (this.stats.dependencies.frontend?.total > 30) {
      console.log('🟠 DEPENDENCY OPTIMIZATION:');
      console.log('   - Consider tree-shaking to reduce bundle size');
      console.log('   - Evaluate if all dependencies are necessary');
      console.log('   - Use dynamic imports for heavy libraries\n');
    }
    
    console.log('✅ SUGGESTED CHUNKING STRATEGIES:');
    console.log('   1. Route-based code splitting');
    console.log('   2. Component lazy loading');
    console.log('   3. Vendor chunk separation');
    console.log('   4. Feature-based module organization');
    console.log('   5. Service worker for caching\n');
  }
}

// Run the analyzer
const analyzer = new CodeAnalyzer(process.cwd());
analyzer.analyze(); 