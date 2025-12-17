@echo off
:: Acces to Server folder and start up
cd ./server
npm install
npm run dev &
./vendor/bin/sail up -d

:: Acces to Client folder and start up
cd ../client
npm install
npm run dev &

