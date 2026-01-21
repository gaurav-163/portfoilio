#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "🔍 Admin Panel Status Check"
echo "=========================="
echo ""

# Check .env.local
if [ -f .env.local ]; then
    echo -e "${GREEN}✓${NC} .env.local exists"
    
    # Check if default password is still being used
    if grep -q "your_secure_password" .env.local; then
        echo -e "${YELLOW}⚠${NC}  Warning: Default password detected in .env.local"
        echo "   Please change ADMIN_PASSWORD to a secure password"
    else
        echo -e "${GREEN}✓${NC} Custom password set"
    fi
    
    # Check if NEXTAUTH_SECRET is set
    if grep -q "generate_a_random_secret" .env.local; then
        echo -e "${YELLOW}⚠${NC}  Warning: NEXTAUTH_SECRET not generated"
        echo "   Run: openssl rand -base64 32"
    else
        echo -e "${GREEN}✓${NC} NEXTAUTH_SECRET configured"
    fi
else
    echo -e "${RED}✗${NC} .env.local not found"
    echo "   Run: ./setup-admin.sh"
fi

echo ""

# Check directories
echo "📁 Checking directories..."
if [ -d "data" ]; then
    echo -e "${GREEN}✓${NC} data/ directory exists"
else
    echo -e "${RED}✗${NC} data/ directory missing"
fi

if [ -f "data/portfolio.json" ]; then
    echo -e "${GREEN}✓${NC} data/portfolio.json exists"
    
    # Count items
    RESUME_COUNT=$(jq '.resumes | length' data/portfolio.json 2>/dev/null || echo "?")
    DOC_COUNT=$(jq '.documents | length' data/portfolio.json 2>/dev/null || echo "?")
    
    echo "   📄 Resumes: $RESUME_COUNT"
    echo "   📄 Documents: $DOC_COUNT"
else
    echo -e "${RED}✗${NC} data/portfolio.json missing"
fi

if [ -d "public/assets/resumes" ]; then
    echo -e "${GREEN}✓${NC} public/assets/resumes/ exists"
    FILE_COUNT=$(find public/assets/resumes -name "*.pdf" 2>/dev/null | wc -l)
    echo "   📎 PDF files: $FILE_COUNT"
else
    echo -e "${RED}✗${NC} public/assets/resumes/ missing"
fi

if [ -d "public/assets/documents" ]; then
    echo -e "${GREEN}✓${NC} public/assets/documents/ exists"
    FILE_COUNT=$(find public/assets/documents -type f ! -name ".gitkeep" 2>/dev/null | wc -l)
    echo "   📎 Files: $FILE_COUNT"
else
    echo -e "${RED}✗${NC} public/assets/documents/ missing"
fi

echo ""

# Check API routes
echo "🔌 Checking API routes..."
API_ROUTES=(
    "app/api/auth/login/route.ts"
    "app/api/auth/logout/route.ts"
    "app/api/auth/check/route.ts"
    "app/api/resumes/route.ts"
    "app/api/documents/route.ts"
    "app/api/upload/resume/route.ts"
    "app/api/upload/document/route.ts"
    "app/api/resume/active/route.ts"
)

MISSING_ROUTES=0
for route in "${API_ROUTES[@]}"; do
    if [ -f "$route" ]; then
        echo -e "${GREEN}✓${NC} $route"
    else
        echo -e "${RED}✗${NC} $route"
        MISSING_ROUTES=$((MISSING_ROUTES + 1))
    fi
done

echo ""

# Check components
echo "🎨 Checking components..."
if [ -f "app/admin/page.tsx" ]; then
    echo -e "${GREEN}✓${NC} Admin panel UI"
else
    echo -e "${RED}✗${NC} Admin panel UI missing"
fi

if [ -f "app/components/ResumeDownloadButton.tsx" ]; then
    echo -e "${GREEN}✓${NC} Resume download button"
else
    echo -e "${RED}✗${NC} Resume download button missing"
fi

if [ -f "lib/data.ts" ]; then
    echo -e "${GREEN}✓${NC} Data management library"
else
    echo -e "${RED}✗${NC} Data management library missing"
fi

echo ""

# Check documentation
echo "📚 Checking documentation..."
DOCS=("ADMIN_GUIDE.md" "ADMIN_QUICK_REF.md" "ADMIN_SETUP_COMPLETE.md")
for doc in "${DOCS[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✓${NC} $doc"
    else
        echo -e "${YELLOW}⚠${NC}  $doc missing"
    fi
done

echo ""
echo "=========================="

# Summary
if [ ! -f .env.local ]; then
    echo -e "${RED}❌ Setup incomplete${NC}"
    echo "Run: ./setup-admin.sh"
elif grep -q "your_secure_password" .env.local || grep -q "generate_a_random_secret" .env.local; then
    echo -e "${YELLOW}⚠️  Setup incomplete${NC}"
    echo "Edit .env.local and set secure credentials"
elif [ $MISSING_ROUTES -gt 0 ]; then
    echo -e "${RED}❌ Missing $MISSING_ROUTES API routes${NC}"
else
    echo -e "${GREEN}✅ All systems operational!${NC}"
    echo ""
    echo "Admin panel ready at: http://localhost:3000/admin"
    echo "Run: npm run dev"
fi
