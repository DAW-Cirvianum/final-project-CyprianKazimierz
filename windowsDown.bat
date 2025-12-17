@echo off
:: Acces to Server folder and start up
cd ./server
pkill -f vite || echo "No Vite process"
./vendor/bin/sail down

:: Acces to Client folder and start up
cd ../client
pkill -f vite || echo "No Vite process"

