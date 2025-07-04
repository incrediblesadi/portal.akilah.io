#!/bin/bash

# Update Implementation Status Script
# This script generates an updated status report based on current implementation

# set -e  # Allow script to continue on errors for reporting

echo "📊 Implementation Status Report"
echo "=============================="
echo "Generated: $(date)"
echo ""

# Create output file
OUTPUT_FILE="implementation_status_report.md"

cat > "$OUTPUT_FILE" << 'EOF'
# Implementation Status Report

*Auto-generated report - Do not edit manually*

## Build Status

EOF

# Check build status
echo "🔍 Checking build status..."
if npm run build &> /dev/null; then
    echo "✅ **BUILD PASSING**" >> "$OUTPUT_FILE"
    echo "Build is currently passing all checks." >> "$OUTPUT_FILE"
else
    echo "❌ **BUILD FAILING**" >> "$OUTPUT_FILE"
    echo "Build is currently failing. See errors below:" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
    npm run build 2>&1 | head -20 >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"

# Check linting status
echo "🔍 Checking linting status..."
echo "## Linting Status" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

if npm run lint &> /dev/null; then
    echo "✅ **LINTING PASSING**" >> "$OUTPUT_FILE"
else
    echo "⚠️ **LINTING ISSUES**" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
    npm run lint 2>&1 | head -10 >> "$OUTPUT_FILE"
    echo "\`\`\`" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"

# File structure analysis
echo "🔍 Analyzing file structure..."
echo "## File Structure Analysis" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Count files by type
echo "### File Count by Type" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "| Type | Count |" >> "$OUTPUT_FILE"
echo "|------|-------|" >> "$OUTPUT_FILE"
echo "| TypeScript (*.ts) | $(find src -name "*.ts" | wc -l) |" >> "$OUTPUT_FILE"
echo "| React Components (*.tsx) | $(find src -name "*.tsx" | wc -l) |" >> "$OUTPUT_FILE"
echo "| JavaScript (*.js) | $(find src -name "*.js" | wc -l) |" >> "$OUTPUT_FILE"
echo "| React Components (*.jsx) | $(find src -name "*.jsx" | wc -l) |" >> "$OUTPUT_FILE"
echo "| Markdown (*.md) | $(find . -name "*.md" | wc -l) |" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Page structure analysis
echo "### Page Structure Status" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

declare -A EXPECTED_PAGES=(
    ["BusinessManagementPages"]="SetupBusiness.tsx ViewBusinessInfo.tsx EditBusinessInfo.tsx"
    ["MenuManagementPages"]="ConceptSetup/SetupConcept.tsx"
    ["DisplayManagementPages"]="DisplaySetup/CreateDisplay.tsx"
    ["KioskManagementPages"]="KioskSetup/RegisterKiosk.tsx"
    ["KDCManagementPages"]="KDCSetup/RegisterKDC.tsx"
    ["OrderManagementPages"]="ViewOrders.tsx ViewOrderDetails.tsx"
    ["ReportsManagementPages"]="SalesReport.tsx ItemPerformanceReport.tsx"
    ["PaymentManagementPages"]="ViewTransactions.tsx PaymentSettings.tsx"
    ["UserManagementPages"]="UserSetup/RegisterUser.tsx"
)

for section in "${!EXPECTED_PAGES[@]}"; do
    echo "#### $section" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    if [ -d "src/pages/$section" ]; then
        echo "📁 Directory exists" >> "$OUTPUT_FILE"
        
        # Check for expected files
        files_expected=0
        files_found=0
        
        for file in ${EXPECTED_PAGES[$section]}; do
            ((files_expected++))
            if [ -f "src/pages/$section/$file" ]; then
                ((files_found++))
                echo "✅ $file" >> "$OUTPUT_FILE"
            else
                echo "❌ $file" >> "$OUTPUT_FILE"
            fi
        done
        
        completion_percent=$((files_found * 100 / files_expected))
        echo "" >> "$OUTPUT_FILE"
        echo "**Completion: $files_found/$files_expected ($completion_percent%)**" >> "$OUTPUT_FILE"
    else
        echo "❌ Directory missing" >> "$OUTPUT_FILE"
    fi
    echo "" >> "$OUTPUT_FILE"
done

# Git analysis
echo "🔍 Analyzing Git history..."
echo "## Recent Changes" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "### Recent Commits" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
git log --oneline -5 | while read -r commit; do
    echo "- $commit" >> "$OUTPUT_FILE"
done

echo "" >> "$OUTPUT_FILE"

# Dependencies analysis
echo "🔍 Analyzing dependencies..."
echo "## Dependencies Status" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

if [ -f "package.json" ]; then
    echo "### Package Information" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE"
    
    PACKAGE_NAME=$(grep '"name"' package.json | sed 's/.*"name": *"\([^"]*\)".*/\1/')
    PACKAGE_VERSION=$(grep '"version"' package.json | sed 's/.*"version": *"\([^"]*\)".*/\1/')
    
    echo "- **Name:** $PACKAGE_NAME" >> "$OUTPUT_FILE"
    echo "- **Version:** $PACKAGE_VERSION" >> "$OUTPUT_FILE"
    echo "- **Dependencies:** $(jq '.dependencies | keys | length' package.json)" >> "$OUTPUT_FILE"
    echo "- **Dev Dependencies:** $(jq '.devDependencies | keys | length' package.json)" >> "$OUTPUT_FILE"
fi

echo "" >> "$OUTPUT_FILE"

# Documentation analysis
echo "🔍 Analyzing documentation..."
echo "## Documentation Status" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

echo "### Documentation Files" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

find . -name "*.md" -maxdepth 1 | sort | while read -r file; do
    filename=$(basename "$file")
    lines=$(wc -l < "$file")
    modified=$(date -r "$file" "+%Y-%m-%d")
    echo "- **$filename** ($lines lines, modified: $modified)" >> "$OUTPUT_FILE"
done

echo "" >> "$OUTPUT_FILE"

# Add footer
echo "---" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "*Report generated on $(date) by implementation status script*" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "**Next scheduled update:** $(date -d '+1 week' '+%Y-%m-%d')" >> "$OUTPUT_FILE"

echo "✅ Status report generated: $OUTPUT_FILE"
echo ""
echo "📋 Summary:"
echo "- Report saved to: $OUTPUT_FILE"
echo "- Analysis completed at: $(date)"
echo "- Next update recommended: $(date -d '+1 week' '+%Y-%m-%d')"