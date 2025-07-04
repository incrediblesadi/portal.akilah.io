#!/bin/bash

# Documentation Validation Script
# This script validates documentation against the current implementation

set -e

echo "📋 Documentation Validation Report"
echo "=================================="
echo "Generated: $(date)"
echo ""

# Check if required files exist
echo "🔍 Checking documentation files..."

DOCS_DIR="."
REQUIRED_DOCS=(
    "README.md"
    "Projectinitialthoughts.md"
    "documentation_analysis_and_automation.md"
)

for doc in "${REQUIRED_DOCS[@]}"; do
    if [ -f "$DOCS_DIR/$doc" ]; then
        echo "✅ $doc exists"
    else
        echo "❌ $doc missing"
    fi
done

echo ""

# Check for documentation-code consistency
echo "🔍 Checking documentation-code consistency..."

# Check if README matches project type
if grep -q "Todo" README.md; then
    echo "⚠️  README.md still references Todo app (should be Business Portal)"
else
    echo "✅ README.md project type is consistent"
fi

# Check if documentation matches actual source structure
echo ""
echo "🔍 Comparing documented vs actual source structure..."

# Create temporary files for comparison
echo "Generating expected structure from documentation..."
cat > /tmp/expected_structure.txt << EOF
src/pages/BusinessManagementPages/SetupBusiness.tsx
src/pages/BusinessManagementPages/ViewBusinessInfo.tsx
src/pages/BusinessManagementPages/EditBusinessInfo.tsx
src/pages/MenuManagementPages/ConceptSetup/SetupConcept.tsx
src/pages/DisplayManagementPages/DisplaySetup/CreateDisplay.tsx
src/pages/KioskManagementPages/KioskSetup/RegisterKiosk.tsx
src/pages/KDCManagementPages/KDCSetup/RegisterKDC.tsx
src/pages/OrderManagementPages/ViewOrders.tsx
src/pages/ReportsManagementPages/SalesReport.tsx
src/pages/PaymentManagementPages/ViewTransactions.tsx
src/pages/UserManagementPages/UserSetup/RegisterUser.tsx
EOF

echo "Generating actual structure..."
find src -name "*.tsx" -o -name "*.ts" | sort > /tmp/actual_structure.txt

# Compare structures
echo ""
echo "📊 Structure Comparison Results:"
echo "Expected files not found:"
while read -r expected_file; do
    if [ -f "$expected_file" ]; then
        echo "✅ $expected_file"
    else
        echo "❌ $expected_file"
    fi
done < /tmp/expected_structure.txt

echo ""
echo "📈 Coverage Statistics:"
TOTAL_EXPECTED=$(wc -l < /tmp/expected_structure.txt)
FOUND_COUNT=0

while read -r expected_file; do
    if [ -f "$expected_file" ]; then
        ((FOUND_COUNT++))
    fi
done < /tmp/expected_structure.txt

COVERAGE_PERCENT=$((FOUND_COUNT * 100 / TOTAL_EXPECTED))
echo "Implementation Coverage: $FOUND_COUNT/$TOTAL_EXPECTED ($COVERAGE_PERCENT%)"

# Check build status
echo ""
echo "🔍 Checking build status..."
if npm run build &> /dev/null; then
    echo "✅ Build successful"
else
    echo "❌ Build failing - check TypeScript errors"
fi

# Check for common documentation issues
echo ""
echo "🔍 Checking for common documentation issues..."

# Check for broken internal links
echo "Checking for broken internal links..."
grep -r "\[.*\](./" *.md | while read -r line; do
    file=$(echo "$line" | cut -d: -f1)
    link=$(echo "$line" | sed 's/.*](\([^)]*\)).*/\1/')
    if [ ! -f "$link" ]; then
        echo "⚠️  Broken link in $file: $link"
    fi
done

# Check for outdated timestamps
echo "Checking for outdated content..."
if find . -name "*.md" -mtime +30 | grep -q .; then
    echo "⚠️  Some documentation files are older than 30 days"
    find . -name "*.md" -mtime +30 -exec basename {} \;
else
    echo "✅ All documentation files are recent"
fi

echo ""
echo "📋 Documentation Validation Complete"
echo "====================================="

# Cleanup
rm -f /tmp/expected_structure.txt /tmp/actual_structure.txt