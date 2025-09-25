#!/bin/bash

# Deploy Script for Staging Environment
echo "🚀 Deploying to Staging Environment..."

# Check if we're on staging branch
if [ "$(git branch --show-current)" != "staging" ]; then
    echo "❌ Error: Must be on staging branch to deploy to staging"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run tests
echo "🧪 Running tests..."
npm run test

# Build for staging
echo "🔨 Building for staging..."
NODE_ENV=staging npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Staging environment ready at: http://localhost:3000"
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Staging deployment complete!"



