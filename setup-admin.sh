#!/bin/bash

echo "🚀 Setting up Admin Panel..."
echo ""

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "✅ .env.local already exists"
else
    echo "📝 Creating .env.local from example..."
    cp .env.example .env.local
    
    # Generate a random secret
    SECRET=$(openssl rand -base64 32)
    
    # Update the .env.local file
    sed -i "s/generate_a_random_secret/$SECRET/g" .env.local
    
    echo "⚠️  IMPORTANT: Edit .env.local and set your admin credentials!"
    echo "   Default username: admin"
    echo "   Default password: your_secure_password"
fi

echo ""
echo "📁 Checking directories..."

# Ensure data directory exists
if [ ! -d "data" ]; then
    echo "   Creating data directory..."
    mkdir -p data
fi

# Ensure portfolio.json exists
if [ ! -f "data/portfolio.json" ]; then
    echo "   Creating portfolio.json..."
    echo '{
  "resumes": [],
  "documents": [],
  "projects": [],
  "experiences": [],
  "skills": []
}' > data/portfolio.json
fi

# Ensure assets directories exist
if [ ! -d "public/assets/resumes" ]; then
    echo "   Creating resumes directory..."
    mkdir -p public/assets/resumes
    touch public/assets/resumes/.gitkeep
fi

if [ ! -d "public/assets/documents" ]; then
    echo "   Creating documents directory..."
    mkdir -p public/assets/documents
    touch public/assets/documents/.gitkeep
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env.local and set your admin credentials"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000/admin"
echo ""
echo "For more information, see ADMIN_GUIDE.md"
