@echo off
echo ==============================
echo STOPPING PROJECT
echo ==============================

:: Kill processes Node (Vite)
taskkill /IM node.exe /F >nul 2>&1

:: Stop Sail
cd /d "%~dp0server"
call vendor\bin\sail down

echo ==============================
echo ALL SERVICES STOPPED
echo ==============================
pause
