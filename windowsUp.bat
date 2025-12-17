@echo off
echo ==============================
echo STARTING PROJECT
echo ==============================

:: --- SERVER ---
cd /d "%~dp0server"

:: Install all dependences if is needed
call npm install

:: Vite server 
start /B npm run dev

:: Laravel Sail
call vendor\bin\sail up -d

:: --- CLIENT ---
cd /d "%~dp0client"

call npm install

:: Vite client 
start /B npm run dev

echo ==============================
echo ALL SERVICES STARTED
echo ==============================
echo Press CTRL+C to stop everything
pause
