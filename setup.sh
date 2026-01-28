#!/bin/bash

echo "🚀 Установка зависимостей и запуск платформы..."
echo ""

# Установка server
echo "📦 Установка server зависимостей..."
cd server
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки server зависимостей"
    exit 1
fi
cd ..

# Установка client
echo "📦 Установка client зависимостей..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Ошибка установки client зависимостей"
    exit 1
fi
cd ..

echo ""
echo "✅ Все зависимости установлены!"
echo ""
echo "🎯 Для запуска откройте 2 терминала:"
echo ""
echo "   Терминал 1 (Backend):"
echo "   cd server && npm run dev"
echo ""
echo "   Терминал 2 (Frontend):"
echo "   cd client && npm run dev"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend: http://localhost:5000"
echo ""
