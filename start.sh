#!/bin/bash

# Kill any existing processes on the required ports
echo "🔪 Killing existing processes on ports 5000, 5173, 3000, 3001..."
npx kill-port 5000 5173 3000 3001

# Install dependencies only if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
else
    echo "📦 Frontend dependencies already installed"
fi

if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd server && npm install
    cd ..
else
    echo "📦 Backend dependencies already installed"
    cd server
fi

# Start backend server
echo "🚀 Starting backend server..."
PORT=5000 npm run dev &

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 3

# Start frontend server
echo "🌐 Starting frontend server..."
cd .. && npm run dev &

echo "✨ Both servers are starting..."
echo "📡 Backend URL: http://localhost:5000/api"
echo "🌐 Frontend URL: http://localhost:5173"
echo "💡 Tip: Press Ctrl+C to stop both servers"

# Keep the script running
wait