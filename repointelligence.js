name: Comprehensive Repository Mapper

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:
  schedule:
    - cron: '0 0 * * 0'

jobs:
  map-repository:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      
      - name: Create Repository Mapper Script
        run: |
          mkdir -p .github/scripts
          cat > .github/scripts/generate-comprehensive-repo-map.js << 'EOL'
          const fs = require('fs');
          const path = require('path');
          
          // Configuration
          const IGNORE_DIRS = ['node_modules', '.git', '.github/workflows', 'dist', 'build'];
          const IGNORE_FILES = ['.DS_Store', 'repo-map.json', 'repo-analysis.md'];
          const MAX_FILE_SIZE = 1024 * 500; // 500KB max file size to read
          const OUTPUT_FILE = 'repo-analysis.md';
          
          // Get current date in UTC with the specified format
          function getCurrentDateTime() {
            const now = new Date();
            return now.toISOString().replace('T', ' ').slice(0, 19);
          }
          
          // Repository analysis data structure
          const repoData = {
            metadata: {
              timestamp: getCurrentDateTime(),
              user: process.env.GITHUB_ACTOR || 'auto-generated',
              repository: process.env.GITHUB_REPOSITORY || 'unknown',
              codeGuidelines: {
                language: "JavaScript/TypeScript", // Default values
                pattern: "React Component Pattern",
                goal: "Maintainability and Performance"
              }
            },
            statistics: {
              totalDirectories: 0,
              totalFiles: 0,
              totalLines: 0,
              totalSize: 0,
              languageBreakdown: {},
              largestFiles: []
            },
            structure: {}
          };
          
          // Function to check if path should be ignored
          function shouldIgnore(itemPath) {
            const basename = path.basename(itemPath);
            if (IGNORE_FILES.includes(basename)) return true;
            
            for (const ignoreDir of IGNORE_DIRS) {
              if (itemPath.includes(`/${ignoreDir}/`) || itemPath === ignoreDir) return true;
            }
            
            return false;
          }
          
          // Function to determine language from file extension
          function getLanguageFromExt(ext) {
            const mapping = {
              js: 'JavaScript',
              jsx: 'JavaScript (React)',
              ts: 'TypeScript',
              tsx: 'TypeScript (React)',
              py: 'Python',
              rb: 'Ruby',
              java: 'Java',
              php: 'PHP',
              html: 'HTML',
              css: 'CSS',
              scss: 'SCSS',
              less: 'LESS',
              json: 'JSON',
              md: 'Markdown',
              yml: 'YAML',
              yaml: 'YAML',
              sh: 'Shell',
              bat: 'Batch',
              c: 'C',
              cpp: 'C++',
              cs: 'C#',
              go: 'Go',
              rs: 'Rust',
              swift: 'Swift',
              kt: 'Kotlin'
            };
            
            return mapping[ext] || 'Other';
          }
          
          // Function to analyze a directory and build structure
          function analyzeDirectory(dirPath, basePath = '') {
            const fullPath = path.join(process.cwd(), basePath, dirPath);
            const relativePath = path.join(basePath, dirPath);
            
            if (shouldIgnore(relativePath)) {
              return null;
            }
            
            const result = {
              type: 'directory',
              name: path.basename(dirPath),
              path: relativePath,
              children: []
            };
            
            repoData.statistics.totalDirectories++;
            
            try {
              const items = fs.readdirSync(fullPath);
              
              // Process directories first, then files (for cleaner tree)
              const dirs = [];
              const files = [];
              
              for (const item of items) {
                const itemPath = path.join(fullPath, item);
                const itemRelativePath = path.join(relativePath, item);
                
                if (shouldIgnore(itemRelativePath)) continue;
                
                const stats = fs.statSync(itemPath);
                if (stats.isDirectory()) {
                  dirs.push(item);
                } else {
                  files.push(item);
                }
              }
              
              // Process directories
              for (const dir of dirs) {
                const childDir = analyzeDirectory(dir, relativePath);
                if (childDir) result.children.push(childDir);
              }
              
              // Process files
              for (const file of files) {
                const itemPath = path.join(fullPath, file);
                const itemRelativePath = path.join(relativePath, file);
                const stats = fs.statSync(itemPath);
                
                repoData.statistics.totalFiles++;
                repoData.statistics.totalSize += stats.size;
                
                let fileContent = '';
                let fileDesc = '';
                let lineCount = 0;
                const fileExt = path.extname(file).slice(1).toLowerCase();
                const language = getLanguageFromExt(fileExt);
                
                // Update language breakdown
                repoData.statistics.languageBreakdown[language] = 
                  (repoData.statistics.languageBreakdown[language] || 0) + 1;
                
                if (stats.size <= MAX_FILE_SIZE) {
                  try {
                    fileContent = fs.readFileSync(itemPath, 'utf8');
                    lineCount = fileContent.split('\n').length;
                    repoData.statistics.totalLines += lineCount;
                    
                    // Try to extract description from file content
                    const firstLines = fileContent.split('\n').slice(0, 5).join('\n');
                    
                    if (firstLines.includes('@description')) {
                      const descLine = fileContent.split('\n')
                        .find(line => line.includes('@description'));
                      if (descLine) {
                        fileDesc = descLine.split('@description')[1].trim();
                      }
                    } else if (['js', 'jsx', 'ts', 'tsx'].includes(fileExt) && firstLines.includes('//')) {
                      // Look for first comment
                      const commentLine = fileContent.split('\n')
                        .find(line => line.trim().startsWith('//'));
                      if (commentLine) {
                        fileDesc = commentLine.replace('//', '').trim();
                      }
                    } else if (fileExt === 'md' || fileExt === 'txt') {
                      fileDesc = fileContent.split('\n')[0].trim();
                    }
                  } catch (err) {
                    fileContent = `Error reading file: ${err.message}`;
                  }
                } else {
                  fileContent = `File too large to display (${(stats.size / 1024).toFixed(2)} KB)`;
                }
                
                // Track largest files
                if (repoData.statistics.largestFiles.length < 10 || 
                    stats.size > repoData.statistics.largestFiles[9].size) {
                  
                  const fileInfo = {
                    name: file,
                    path: itemRelativePath,
                    size: stats.size,
                    formattedSize: `${(stats.size / 1024).toFixed(2)} KB`
                  };
                  
                  repoData.statistics.largestFiles.push(fileInfo);
                  repoData.statistics.largestFiles.sort((a, b) => b.size - a.size);
                  
                  if (repoData.statistics.largestFiles.length > 10) {
                    repoData.statistics.largestFiles.pop();
                  }
                }
                
                result.children.push({
                  type: 'file',
                  name: file,
                  path: itemRelativePath,
                  extension: fileExt || 'N/A',
                  language: language,
                  size: stats.size,
                  formattedSize: `${(stats.size / 1024).toFixed(2)} KB`,
                  lines: lineCount,
                  description: fileDesc || 'No description available',
                  content: fileContent
                });
              }
              
              return result;
            } catch (err) {
              console.error(`Error analyzing directory ${fullPath}:`, err);
              return {
                type: 'directory',
                name: path.basename(dirPath),
                path: relativePath,
                error: err.message,
                children: []
              };
            }
          }
          
          // Get top-level directories
          const rootDir = process.cwd();
          const rootItems = fs.readdirSync(rootDir);
          
          for (const item of rootItems) {
            const itemPath = path.join(rootDir, item);
            const stats = fs.statSync(itemPath);
            
            if (stats.isDirectory() && !shouldIgnore(item)) {
              const dirStructure = analyzeDirectory(item);
              if (dirStructure) {
                repoData.structure[item] = dirStructure;
              }
            }
          }
          
          // Convert bytes to human readable format
          function formatBytes(bytes) {
            if (bytes < 1024) return bytes + ' B';
            const kb = bytes / 1024;
            if (kb < 1024) return kb.toFixed(2) + ' KB';
            const mb = kb / 1024;
            return mb.toFixed(2) + ' MB';
          }
          
          // Generate repository intelligence
          function generateRepoIntelligence() {
            const intelligence = {
              recommendations: [],
              potentialIssues: [],
              bestPractices: []
            };
            
            // Check for standard repository files
            const hasReadme = fs.existsSync(path.join(process.cwd(), 'README.md'));
            const hasLicense = fs.existsSync(path.join(process.cwd(), 'LICENSE'));
            const hasGitignore = fs.existsSync(path.join(process.cwd(), '.gitignore'));
            
            if (!hasReadme) {
              intelligence.recommendations.push('Add a README.md file to provide project documentation');
            }
            
            if (!hasLicense) {
              intelligence.recommendations.push('Consider adding a LICENSE file to specify how the code can be used');
            }
            
            if (!hasGitignore) {
              intelligence.recommendations.push('Add a .gitignore file to avoid committing unnecessary files');
            }
            
            // Check package.json if it exists (for Node.js projects)
            const packageJsonPath = path.join(process.cwd(), 'package.json');
            if (fs.existsSync(packageJsonPath)) {
              try {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                
                if (!packageJson.description || packageJson.description === '') {
                  intelligence.potentialIssues.push('package.json is missing a description');
                }
                
                if (!packageJson.repository) {
                  intelligence.potentialIssues.push('package.json is missing repository information');
                }
                
                // Check for dev dependencies
                if (!packageJson.devDependencies || Object.keys(packageJson.devDependencies).length === 0) {
                  intelligence.potentialIssues.push('No development dependencies found in package.json');
                }
                
                // Check for testing framework
                const hasTestFramework = packageJson.devDependencies && 
                  Object.keys(packageJson.devDependencies).some(dep => 
                    ['jest', 'mocha', 'chai', 'karma', 'jasmine', 'ava', 'tap', 'cypress'].includes(dep.toLowerCase())
                  );
                
                if (!hasTestFramework) {
                  intelligence.recommendations.push('Consider adding a testing framework to your project');
                }
              } catch (err) {
                intelligence.potentialIssues.push(`Error parsing package.json: ${err.message}`);
              }
            }
            
            // Check for code quality tools
            const hasEslint = fs.existsSync(path.join(process.cwd(), '.eslintrc')) || 
                              fs.existsSync(path.join(process.cwd(), '.eslintrc.js')) ||
                              fs.existsSync(path.join(process.cwd(), '.eslintrc.json'));
            
            if (!hasEslint && Object.keys(repoData.statistics.languageBreakdown).some(lang => 
                ['JavaScript', 'JavaScript (React)', 'TypeScript', 'TypeScript (React)'].includes(lang))) {
              intelligence.recommendations.push('Add ESLint for consistent code quality');
            }
            
            // Check for CI/CD configuration
            const hasGithubActions = fs.existsSync(path.join(process.cwd(), '.github/workflows'));
            const hasTravis = fs.existsSync(path.join(process.cwd(), '.travis.yml'));
            
            if (!hasGithubActions && !hasTravis) {
              intelligence.recommendations.push('Consider setting up CI/CD using GitHub Actions or other tools');
            }
            
            // Add best practices
            intelligence.bestPractices = [
              'Use semantic versioning for releases',
              'Write unit tests for all new features',
              'Document public APIs',
              'Use a consistent code style',
              'Keep dependencies up to date'
            ];
            
            return intelligence;
          }
          
          const repoIntelligence = generateRepoIntelligence();
          
          // Generate comprehensive markdown report
          let markdownContent = `# Repository Analysis\n\n`;
          
          // Table of Contents (Index)
          markdownContent += `## Table of Contents\n\n`;
          markdownContent += `1. [Repository Overview](#repository-overview)\n`;
          markdownContent += `2. [Repository Statistics](#repository-statistics)\n`;
          markdownContent += `3. [Language Breakdown](#language-breakdown)\n`;
          markdownContent += `4. [Largest Files](#largest-files)\n`;
          markdownContent += `5. [Repository Intelligence](#repository-intelligence)\n`;
          markdownContent += `6. [Directory Structure](#directory-structure)\n`;
          markdownContent += `7. [File Contents](#file-contents)\n\n`;
          
          // Repository Overview
          markdownContent += `## Repository Overview\n\n`;
          markdownContent += `- **Generated:** ${repoData.metadata.timestamp}\n`;
          markdownContent += `- **Repository:** ${repoData.metadata.repository}\n`;
          markdownContent += `- **Generated by:** ${repoData.metadata.user}\n\n`;
          markdownContent += `**Code Guidelines:**\n`;
          markdownContent += `- Language: ${repoData.metadata.codeGuidelines.language}\n`;
          markdownContent += `- Pattern: ${repoData.metadata.codeGuidelines.pattern}\n`;
          markdownContent += `- Goal: ${repoData.metadata.codeGuidelines.goal}\n\n`;
          
          // Repository Statistics
          markdownContent += `## Repository Statistics\n\n`;
          markdownContent += `- **Total Directories:** ${repoData.statistics.totalDirectories}\n`;
          markdownContent += `- **Total Files:** ${repoData.statistics.totalFiles}\n`;
          markdownContent += `- **Total Lines of Code:** ${repoData.statistics.totalLines}\n`;
          markdownContent += `- **Total Size:** ${formatBytes(repoData.statistics.totalSize)}\n\n`;
          
          // Language Breakdown
          markdownContent += `## Language Breakdown\n\n`;
          markdownContent += `| Language | File Count | Percentage |\n`;
          markdownContent += `|---------|------------|------------|\n`;
          
          const languageEntries = Object.entries(repoData.statistics.languageBreakdown);
          languageEntries.sort((a, b) => b[1] - a[1]);
          
          languageEntries.forEach(([language, count]) => {
            const percentage = ((count / repoData.statistics.totalFiles) * 100).toFixed(2);
            markdownContent += `| ${language} | ${count} | ${percentage}% |\n`;
          });
          
          markdownContent += `\n`;
          
          // Largest Files
          markdownContent += `## Largest Files\n\n`;
          markdownContent += `| File | Path | Size |\n`;
          markdownContent += `|------|------|------|\n`;
          
          repoData.statistics.largestFiles.forEach(file => {
            markdownContent += `| ${file.name} | ${file.path} | ${file.formattedSize} |\n`;
          });
          
          markdownContent += `\n`;
          
          // Repository Intelligence
          markdownContent += `## Repository Intelligence\n\n`;
          
          if (repoIntelligence.recommendations.length > 0) {
            markdownContent += `### Recommendations\n\n`;
            repoIntelligence.recommendations.forEach(rec => {
              markdownContent += `- ✅ ${rec}\n`;
            });
            markdownContent += `\n`;
          }
          
          if (repoIntelligence.potentialIssues.length > 0) {
            markdownContent += `### Potential Issues\n\n`;
            repoIntelligence.potentialIssues.forEach(issue => {
              markdownContent += `- ⚠️ ${issue}\n`;
            });
            markdownContent += `\n`;
          }
          
          if (repoIntelligence.bestPractices.length > 0) {
            markdownContent += `### Best Practices\n\n`;
            repoIntelligence.bestPractices.forEach(practice => {
              markdownContent += `- 💡 ${practice}\n`;
            });
            markdownContent += `\n`;
          }
          
          // Directory Structure (Tree View)
          markdownContent += `## Directory Structure\n\n`;
          markdownContent += `\`\`\`\n`;
          
          function buildTreeText(node, prefix = '') {
            let treeText = '';
            
            if (node.type === 'directory') {
              treeText += `${prefix}📁 ${node.name}/\n`;
              
              if (node.children && node.children.length > 0) {
                const childrenCount = node.children.length;
                
                node.children.forEach((child, index) => {
                  const isLast = index === childrenCount - 1;
                  const newPrefix = prefix + (isLast ? '    ' : '│   ');
                  const childPrefix = prefix + (isLast ? '└── ' : '├── ');
                  
                  if (child.type === 'directory') {
                    treeText += childPrefix + child.name + '/\n';
                    treeText += buildTreeText(child, newPrefix);
                  } else {
                    treeText += childPrefix + child.name + ` (${child.formattedSize})\n`;
                  }
                });
              }
            }
            
            return treeText;
          }
          
          Object.values(repoData.structure).forEach(dir => {
            markdownContent += buildTreeText(dir);
          });
          
          markdownContent += `\`\`\`\n\n`;
          
          // File Contents
          markdownContent += `## File Contents\n\n`;
          
          function addFileContents(node) {
            let content = '';
            
            if (node.type === 'directory' && node.children) {
              content += `### Directory: ${node.path || node.name}\n\n`;
              
              node.children.forEach(child => {
                content += addFileContents(child);
              });
            } else if (node.type === 'file') {
              content += `#### ${node.path}\n\n`;
              content += `- **Size:** ${node.formattedSize}\n`;
              content += `- **Lines:** ${node.lines}\n`;
              
              if (node.description && node.description !== 'No description available') {
                content += `- **Description:** ${node.description}\n`;
              }
              
              content += `\n\`\`\`${node.extension}\n${node.content}\n\`\`\`\n\n`;
            }
            
            return content;
          }
          
          Object.values(repoData.structure).forEach(dir => {
            markdownContent += addFileContents(dir);
          });
          
          // Write to file
          fs.writeFileSync(OUTPUT_FILE, markdownContent);
          console.log(`Repository analysis generated at ${OUTPUT_FILE}`);
          
          // Also save raw data as JSON
          fs.writeFileSync('repo-map.json', JSON.stringify(repoData, null, 2));
          console.log(`Repository map JSON generated at repo-map.json`);
          EOL
      
      - name: Generate Comprehensive Repository Map
        run: node .github/scripts/generate-comprehensive-repo-map.js
      
      - name: Create Auto-Map Watcher
        run: |
          cat > .github/scripts/auto-map-watcher.js << 'EOL'
          const fs = require('fs');
          const path = require('path');
          
          // Set up pre-commit hook to update repository analysis
          const gitHooksDir = '.git/hooks';
          const preCommitHookPath = path.join(gitHooksDir, 'pre-commit');
          
          if (!fs.existsSync(gitHooksDir)) {
            fs.mkdirSync(gitHooksDir, { recursive: true });
          }
          
          const preCommitScript = `#!/bin/sh
          # Auto-generated pre-commit hook for repository mapping
          echo "Updating repository analysis..."
          node .github/scripts/generate-comprehensive-repo-map.js
          git add repo-analysis.md repo-map.json
          `;
          
          fs.writeFileSync(preCommitHookPath, preCommitScript);
          fs.chmodSync(preCommitHookPath, '755');
          
          console.log('Auto-map watcher hook installed.');
          EOL
      
      - name: Install Auto-Map Watcher
        run: node .github/scripts/auto-map-watcher.js
      
      - name: Commit and Push Updated Repository Map
        run: |
          git config --global user.name "GitHub Action"
          git config --global user.email "action@github.com"
          git add repo-analysis.md repo-map.json .github/scripts/
          git commit -m "Update repository analysis [skip ci]" || echo "No changes to commit"
          git push