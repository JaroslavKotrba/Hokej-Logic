#!/bin/bash

echo "🚀 Building React app..."

cd ui
echo "📦 Installing React dependencies..."
npm install

echo "🔨 Building React app with Vite..."
npm run build

echo "📋 Checking build output..."
if [ -f "dist/index.html" ]; then
    echo "✅ React build successful!"
    ls -la dist/
else
    echo "❌ React build failed!"
    echo "📋 Build directory contents:"
    ls -la dist/ 2>/dev/null || echo "dist/ directory does not exist"
fi

cd ..
echo "✅ Build completed!" 