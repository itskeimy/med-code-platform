@echo off
chcp 65001 >nul
echo 🚀 Установка зависимостей и запуск платформы...
echo.

echo 📦 Установка server зависимостей...
cd server
call npm install
if errorlevel 1 (
    echo ❌ Ошибка установки server зависимостей
    exit /b 1
)
cd ..

echo 📦 Установка client зависимостей...
cd client
call npm install
if errorlevel 1 (
    echo ❌ Ошибка установки client зависимостей
    exit /b 1
)
cd ..

echo.
echo ✅ Все зависимости установлены!
echo.
echo 🎯 Для запуска откройте 2 PowerShell окна:
echo.
echo    Окно 1 (Backend):
echo    cd server; npm run dev
echo.
echo    Окно 2 (Frontend):
echo    cd client; npm run dev
echo.
echo 📍 Frontend: http://localhost:3000
echo 📍 Backend: http://localhost:5000
echo.
pause
