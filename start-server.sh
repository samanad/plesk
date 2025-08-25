#!/bin/bash

# Plesk Template Server Startup Script
# This script provides multiple options for starting the server

echo "🚀 Plesk Template Server Startup"
echo "================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Function to start server with custom port
start_with_port() {
    local port=$1
    echo "🌐 Starting server on port $port..."
    PORT=$port npm start
}

# Function to start server in production mode
start_production() {
    echo "🏭 Starting server in production mode..."
    npm run start:prod
}

# Function to start server in development mode
start_development() {
    echo "🔧 Starting server in development mode..."
    npm run start:dev
}

# Function to start with nodemon for development
start_dev() {
    echo "🔄 Starting server with nodemon (auto-restart on changes)..."
    npm run dev
}

# Main menu
echo ""
echo "Choose an option:"
echo "1) Start server (default port 3000)"
echo "2) Start server with custom port"
echo "3) Start in production mode"
echo "4) Start in development mode"
echo "5) Start with nodemon (development)"
echo "6) Exit"
echo ""

read -p "Enter your choice (1-6): " choice

case $choice in
    1)
        echo "🚀 Starting server on default port 3000..."
        npm start
        ;;
    2)
        read -p "Enter port number: " port
        start_with_port $port
        ;;
    3)
        start_production
        ;;
    4)
        start_development
        ;;
    5)
        start_dev
        ;;
    6)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Exiting..."
        exit 1
        ;;
esac
